import Sound from "../model/Sound";
import SoundboxConfig from "../model/SoundboxConfig";
import { EventEmitterCallback } from "../services/EventEmitter";

export default interface SoundboxLoaderInterface {

    loadConfig(): Promise<void>;

    getConfig(): Promise<SoundboxConfig | undefined>;

    loadSounds(sounds: Sound[]): Promise<void>;

    loadImages(imageURLs: string[]): Promise<void>;

    getAudioByUrl(url: string): Promise<HTMLAudioElement | undefined>;

    onAudioLoaded(callback: EventEmitterCallback): void;

    onAllAudioLoaded(callback: EventEmitterCallback): void;

    onErrorLoadingAudio(callback: EventEmitterCallback): void;

    onImageLoaded(callback: EventEmitterCallback): void;

    onErrorLoadingImage(callback: EventEmitterCallback): void;

    onLoadedAllImages(callback: EventEmitterCallback): void;

    onErrorLoadingConfig(callback: EventEmitterCallback): void;

    onLoadedConfig(callback: EventEmitterCallback): void;
}
