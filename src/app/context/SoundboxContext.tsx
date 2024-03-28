"use client";

import { createContext, useContext, useState, ReactNode, FC, useEffect, useRef, useCallback } from "react";
import { useAudioEditor, useAudioPlayer } from "@eliastik/simple-sound-studio-components";
import Sound from "../model/Sound";
import SoundboxContextProps from "../model/contextProps/SoundboxContextProps";
import SoundboxLoaderService from "../services/SoundboxLoader";
import { SoundboxLink } from "../model/SoundboxLink";
import SoundboxNameProvider from "../services/SoundboxNameProvider";
import SoundboxConfig from "../model/SoundboxConfig";
import { SaveBufferOptions } from "@eliastik/simple-sound-studio-lib";

const SoundboxContext = createContext<SoundboxContextProps | undefined>(undefined);

export const useSoundbox = (): SoundboxContextProps => {
    const context = useContext(SoundboxContext);
    if (!context) {
        throw new Error("useSoundbox must be used inside an SoundboxProvider");
    }
    return context;
};

interface SoundboxProviderProps {
    children: ReactNode;
}

let isReady = false;

export const SoundboxProvider: FC<SoundboxProviderProps> = ({ children }) => {
    const { loadAudioPrincipalBuffer, downloadAudio, changeFilterSettings } = useAudioEditor();
    const { playAudioBufferDirect, isCompatibilityModeEnabled, stopAudioBuffer } = useAudioPlayer();

    // State: animation ref
    const animationRef = useRef(null);
    // The loader service
    const [loaderService, setLoaderService] = useState<SoundboxLoaderService | null>(null);
    // State: all sounds
    const [allSounds, setAllSounds] = useState<Sound[]>([]);
    // State: current sound
    const [currentSound, setCurrentSound] = useState<Sound | null>(null);
    // State: soundbox config
    const [soundboxConfig, setSoundboxConfig] = useState<SoundboxConfig | null>(null);
    // State: soundbox name
    const [soundboxName, setSoundboxName] = useState<string>("");
    // State:editing sound?
    const [editingSound, setEditingSound] = useState(false);
    // State: error playing audio?
    const [errorPlayingAudio, setErrorPlayingAudio] = useState(false);
    // State: loading images?
    const [loadingImages, setLoadingImages] = useState(false);
    // State: error loading config
    const [loadingConfig, setLoadingConfig] = useState(false);
    // State: loading one image?
    const [loadingOneImage, setLoadingOneImage] = useState(false);
    // State: loading audio?
    const [loadingAudio, setLoadingAudio] = useState(false);
    // State: number of loaded audio files
    const [loadedAudioCount, setLoadedAudioCount] = useState(0);
    // State: the total audio count
    const [totalAudioCount, setTotalAudioCount] = useState(0);
    // State: error loading something
    const [loadingError, setLoadingError] = useState(false);
    // State: error loading config
    const [loadingConfigError, setLoadingConfigError] = useState(false);
    // State: soundbox links
    const [soundboxLinks, setSoundboxLinks] = useState<SoundboxLink[]>([]);
    // State: error loading something
    const [initialLoadingFinished, setInitialLoadingFinished] = useState(false);

    const setup = (soundboxName: string) => {
        if (isReady) {
            return;
        }

        const soundboxNameProvider = new SoundboxNameProvider(soundboxName);
        const soundboxLoaderService = new SoundboxLoaderService(soundboxNameProvider);

        soundboxLoaderService.onAudioLoaded((data) => {
            if (data && data.loaded) {
                setLoadedAudioCount(data.loaded);
            }
        });

        soundboxLoaderService.onErrorLoadingAudio(() => setLoadingError(true));
        soundboxLoaderService.onErrorLoadingImage(() => setLoadingError(true));
        soundboxLoaderService.onErrorLoadingConfig(() => setLoadingConfigError(true));

        setSoundboxName(soundboxName);
        setLoaderService(soundboxLoaderService);

        isReady = true;
    };

    useEffect(() => {
        if (loaderService) {
            loadApp();
        }
    }, [loaderService]);

    const loadApp = async () => {
        if (!loaderService) {
            throw new Error("No SoundboxLoader is available");
        }

        // Loading config
        setLoadingConfig(true);
        await loaderService.loadConfig();
        await loaderService.loadLinkList();
        setLoadingConfig(false);

        setSoundboxLinks(await loaderService.getLinkList());

        const config = await loaderService.getConfig();

        if (config) {
            const sounds = config.sounds;

            setSoundboxConfig(config);
            setAllSounds(sounds);
            setTotalAudioCount(sounds.length);

            try {
                // Loading audio files
                setLoadingAudio(true);
                await loaderService.loadSounds(sounds);
                setLoadingAudio(false);

                // Loading first animation
                setLoadingImages(true);
                await loaderService.loadImages(sounds && sounds[0].animationURL ? [sounds[0].animationURL] : []);
                setLoadingImages(false);

                setInitialLoadingFinished(true);
            } catch (e) {
                setLoadingAudio(false);
                setLoadingImages(false);
                console.error(e);
            }

            setCurrentSound(sounds[0]);
            playSound(sounds[0]);
        }
    };

    const retryLoadingApp = async () => {
        setLoadingError(false);
        setLoadingConfigError(false);
        setInitialLoadingFinished(false);
        setLoadedAudioCount(0);

        loadApp();
    };

    const closeErrorLoading = () => {
        setLoadingError(false);
    };

    /**
     * Change sound
     * @param name The sound name
     */
    const setSoundByName = async (name: string) => {
        if (!loaderService) {
            throw new Error("No SoundboxLoader is available");
        }

        const sound = allSounds.find(sound => sound.animationURL === name);

        if (sound) {
            setInitialLoadingFinished(true);

            try {
                setLoadingOneImage(true);
                await loaderService.loadImages(sound.animationURL ? [sound.animationURL] : []);
                setLoadingOneImage(false);

                if (editingSound) {
                    await setupAudioEditor(sound);
                }

                setCurrentSound(sound);
                playSound(sound);
            } catch (e) {
                setLoadingOneImage(false);
                console.error(e);
            }
        }
    };

    /**
     * Reload the GIF animation
     * @param sound The sound
     */
    const reloadAnimation = useCallback((newSound?: Sound) => {
        const sound = newSound || currentSound;

        if (sound && loaderService) {
            loaderService.getImageBlobURL(sound.animationURL).then((url) => {
                const element = animationRef.current;

                if (element) {
                    const imageElement = element as HTMLImageElement;
                    imageElement.src = "#";
                    imageElement.src = url || "";
                }
            });
        }
    }, [currentSound, loaderService]);

    useEffect(() => {
        reloadAnimation();
    }, [animationRef, reloadAnimation]);

    /**
     * Play a sound
     * @param sound  The sound
     */
    const playSound = async (sound: Sound) => {
        if (!loaderService) {
            throw new Error("No SoundboxLoader is available");
        }

        if (!editingSound) {
            if (sound.soundURL) {
                try {
                    const audio = await loaderService.getAudioByUrl(sound.soundURL);

                    if (audio) {
                        const audioCloned = audio.cloneNode() as HTMLAudioElement;
                        audioCloned.addEventListener("ended", () => audioCloned.remove());
                        audioCloned.play()
                            .then(() => setErrorPlayingAudio(false))
                            .catch(() => setErrorPlayingAudio(true));
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        } else {
            setErrorPlayingAudio(false);
            playAudioBufferDirect();
        }

        reloadAnimation(sound);
    };

    const setupAudioEditor = async (sound: Sound) => {
        if (!loaderService) {
            throw new Error("No SoundboxLoader is available");
        }

        if (sound.soundURL) {
            const blob = await loaderService.getAudioBlob(sound.soundURL);

            await changeFilterSettings("limiter", { lookAheadTime: 0.05 });

            if (blob) {
                await loadAudioPrincipalBuffer(new File([blob], "audioFile"));
            }
        }
    };

    const toggleAudioEdit = async () => {
        if (currentSound) {
            if (!editingSound) {
                await setupAudioEditor(currentSound);
            }

            setEditingSound(!editingSound);
        }
    };

    const downloadSound = async (options?: SaveBufferOptions) => {
        if (currentSound) {
            if (isCompatibilityModeEnabled) {
                reloadAnimation();
                stopAudioBuffer();
            }

            downloadAudio(options);
        }
    };

    return (
        <SoundboxContext.Provider value={{
            setup, currentSound, allSounds,
            setSoundByName, playSound,
            loadedAudioCount, totalAudioCount,
            loadingImages, loadingAudio,
            loadingError, loadingConfig,
            loadingConfigError, retryLoadingApp,
            closeErrorLoading, loadingOneImage,
            soundboxConfig, toggleAudioEdit,
            editingSound, downloadSound,
            errorPlayingAudio, soundboxLinks,
            initialLoadingFinished, soundboxName,
            animationRef
        }}>
            {children}
        </SoundboxContext.Provider>
    );
};
