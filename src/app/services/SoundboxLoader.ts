import SoundboxLoaderInterface from "../interfaces/SoundboxLoaderInterface";
import SoundboxNameProviderInterface from "../interfaces/SoundboxNameProviderInterface";
import Constants from "../model/Constants";
import { EventTypes } from "../model/EventTypes";
import Sound from "../model/Sound";
import SoundboxConfig from "../model/SoundboxConfig";
import { SoundboxLink } from "../model/SoundboxLink";
import { EventEmitter, EventEmitterCallback } from "./EventEmitter";

export default class SoundboxLoaderService implements SoundboxLoaderInterface {

    private soundboxConfig: SoundboxConfig | undefined = undefined;
    private soundboxLinks: SoundboxLink[] = [];
    private mapAudio: Map<string, HTMLAudioElement> = new Map();
    private mapImages: Map<string, HTMLImageElement> = new Map();
    private eventEmitter: EventEmitter = new EventEmitter();
    private soundboxNameProvider: SoundboxNameProviderInterface | null = null;
    private totalImageSize: number = 0;
    private totalImageLoadTime: number = 0;
    private averageImageLoadSpeed: number | null = null;
    private intervalSendLoadingState: number | null = null;

    constructor(soundboxNameProvider: SoundboxNameProviderInterface) {
        this.soundboxNameProvider = soundboxNameProvider;
    }

    async loadConfig(): Promise<void> {
        if (!this.soundboxNameProvider) {
            console.error("No SoundboxNameProvider is available");
            return;
        }

        const url = Constants.CONFIG_URI.replace(Constants.MEME_NAME_PLACEHOLDER, this.soundboxNameProvider.getSoundboxName());

        try {
            const config = await fetch(url);
            this.soundboxConfig = await config.json();
            this.eventEmitter.emit(EventTypes.LOADED_CONFIG);
        } catch(error) {
            this.eventEmitter.emit(EventTypes.ERROR_LOADING_CONFIG);
            throw new Error(`Error loading config at ${url}: ${error}`);
        }
    }

    async getConfig(): Promise<SoundboxConfig | undefined> {
        if (!this.soundboxConfig) {
            await this.loadConfig();
        }

        return this.soundboxConfig;
    }

    async loadLinkList(): Promise<void> {
        try {
            const config = await fetch(Constants.LINK_LIST_URI);
            this.soundboxLinks = await config.json();
        } catch(error) {
            console.error("Error loading link list:", error);
        }
    }

    async getLinkList(): Promise<SoundboxLink[]> {
        if (!this.soundboxLinks) {
            await this.loadConfig();
        }

        return this.soundboxLinks;
    }

    async loadSounds(sounds: Sound[]): Promise<void> {
        const totalSounds = sounds.length;
        let loadedSounds = 0;

        for (const sound of sounds) {
            if (sound.soundURL && !this.mapAudio.has(sound.soundURL)) {
                try {
                    const audio = await this.loadAudio(sound.soundURL);
                    loadedSounds++;
                    this.mapAudio.set(sound.soundURL, audio);
                    this.eventEmitter.emit(EventTypes.LOADED_AUDIO, { loaded: loadedSounds, total: totalSounds, url: sound.soundURL });
                } catch (error) {
                    this.eventEmitter.emit(EventTypes.ERROR_LOADING_AUDIO, { url: sound.soundURL });
                    throw new Error(`Error loading audio at ${sound.soundURL}: ${error}`);
                }
            }
        }

        this.eventEmitter.emit(EventTypes.LOADED_ALL_AUDIO);
    }

    private async loadAudio(url: string): Promise<HTMLAudioElement> {
        const audio = await fetch(url);
        const audioBlob = await audio.blob();
        return new Audio(URL.createObjectURL(audioBlob));
    }

    async loadImages(sounds: Sound[]): Promise<void> {
        const totalImages = sounds.length;
        let loadedImages = 0;

        for (const sound of sounds) {
            const url = sound.animationURL;
            const size = sound.animationSize;

            if (!this.mapImages.has(url)) {
                try {
                    const image = await this.loadImage(url, size);
                    this.mapImages.set(url, image);

                    loadedImages++;
                    
                    this.eventEmitter.emit(EventTypes.LOADED_IMAGE, { loaded: loadedImages, total: totalImages, url });
                } catch (error) {
                    this.eventEmitter.emit(EventTypes.ERROR_LOADING_IMAGE, { url });

                    if (this.intervalSendLoadingState) {
                        clearInterval(this.intervalSendLoadingState);
                    }

                    throw new Error(`Error loading audio at ${url}: ${error}`);
                }
            }
        }

        this.eventEmitter.emit(EventTypes.LOADED_ALL_IMAGES);
    }

    private async loadImage(url: string, size?: number): Promise<HTMLImageElement> {
        const startTime = performance.now();
        let currentTime = 0;

        await this.sendCurrentLoadingState(currentTime, size);

        this.intervalSendLoadingState = window.setInterval(async () => {
            currentTime += 1000;
            await this.sendCurrentLoadingState(currentTime, size);
        }, 1000);

        const audio = await fetch(url);
        const audioBlob = await audio.blob();
        const image = new Image();
        image.src = URL.createObjectURL(audioBlob);

        const endTime = performance.now();
        const loadTime = endTime - startTime;

        this.totalImageSize += size || 0;
        this.totalImageLoadTime += loadTime;
        
        this.averageImageLoadSpeed = this.totalImageSize / this.totalImageLoadTime;

        clearInterval(this.intervalSendLoadingState);

        return image;
    }

    private async sendCurrentLoadingState(currentTime: number, size: number | undefined) {
        const estimatedLoadTime = await this.estimateImageLoadTime(size);
        const percentLoaded = Math.min(currentTime / estimatedLoadTime, 1); // Limiter le pourcentage à 1

        this.eventEmitter.emit(EventTypes.LOADING_STATE, {
            speed: this.autoConvertByte((this.averageImageLoadSpeed || 0) * 1000),
            percent: percentLoaded * 100,
            size,
            time: Math.max(0, (estimatedLoadTime - currentTime) / 1000)
        });
    }

    private autoConvertByte(speed: number | undefined): string[] {
        if (!speed) {
            return ["0", "byteSec"];
        }

        if(speed >= 1e9) {
            return [(speed / 1e9).toFixed(2).replace(".", ","), "gigabyteSec"];
        } else if(speed >= 1e6) {
            return [(speed / 1e6).toFixed(2).replace(".", ","), "megabyteSec"];
        } else if(speed >= 1e3) {
            return [(speed / 1e3).toFixed(2).replace(".", ","), "kilobyteSec"];
        } else {
            return ["" + speed, "byteSec"];
        }
    }

    async estimateImageLoadTime(size?: number): Promise<number> {
        if (this.averageImageLoadSpeed === null) {
            return 0; // Le débit moyen n'a pas encore été calculé
        }

        const estimatedLoadTime = (size || 0) / this.averageImageLoadSpeed;
        return estimatedLoadTime;
    }

    async getAudioByUrl(url: string): Promise<HTMLAudioElement | undefined> {
        let audioElement = this.mapAudio.get(url);

        if (!audioElement) {
            try {
                audioElement = await this.loadAudio(url);
                this.mapAudio.set(url, audioElement);
            } catch (error) {
                console.error(`Error loading audio at ${url}:`, error);
                this.eventEmitter.emit(EventTypes.ERROR_LOADING_AUDIO, { url });
                return undefined;
            }
        }

        return audioElement;
    }

    async getAudioBlob(url: string): Promise<Blob | undefined> {
        const audioElement = this.mapAudio.get(url);

        if (audioElement) {
            const data = await fetch(audioElement.src);
            return await data.blob();
        }

        return undefined;
    }

    async getImageBlobURL(url: string): Promise<string | undefined> {
        const imageElement = this.mapImages.get(url);

        if (imageElement) {
            return imageElement.src;
        }

        return undefined;
    }

    onAudioLoaded(callback: EventEmitterCallback): void {
        this.eventEmitter.on(EventTypes.LOADED_AUDIO, callback);
    }

    onAllAudioLoaded(callback: EventEmitterCallback): void {
        this.eventEmitter.on(EventTypes.LOADED_ALL_AUDIO, callback);
    }

    onErrorLoadingAudio(callback: EventEmitterCallback): void {
        this.eventEmitter.on(EventTypes.ERROR_LOADING_AUDIO, callback);
    }

    onImageLoaded(callback: EventEmitterCallback): void {
        this.eventEmitter.on(EventTypes.LOADED_IMAGE, callback);
    }

    onErrorLoadingImage(callback: EventEmitterCallback): void {
        this.eventEmitter.on(EventTypes.ERROR_LOADING_IMAGE, callback);
    }

    onLoadedAllImages(callback: EventEmitterCallback): void {
        this.eventEmitter.on(EventTypes.LOADED_ALL_IMAGES, callback);
    }

    onErrorLoadingConfig(callback: EventEmitterCallback): void {
        this.eventEmitter.on(EventTypes.ERROR_LOADING_CONFIG, callback);
    }

    onLoadedConfig(callback: EventEmitterCallback): void {
        this.eventEmitter.on(EventTypes.LOADED_CONFIG, callback);
    }

    onLoadingState(callback: EventEmitterCallback): void {
        this.eventEmitter.on(EventTypes.LOADING_STATE, callback);
    }
}
