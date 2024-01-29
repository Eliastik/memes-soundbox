"use client";

import { createContext, useContext, useState, ReactNode, FC, useEffect } from "react";
import { ApplicationObjectsSingleton, SettingFormTypeEnum, useAudioEditor, useAudioPlayer } from "@eliastik/simple-sound-studio-components";
import { Constants } from "@eliastik/simple-sound-studio-lib";
import Sound from "../model/Sound";
import SoundboxContextProps from "../model/contextProps/SoundboxContextProps";
import SoundboxLoaderService from "../services/SoundboxLoader";
import { useApplicationConfig } from "./ApplicationConfigContext";
import { SoundboxLink } from "../model/SoundboxLink";

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

const loaderService = new SoundboxLoaderService();

let isReady = false;

const getFilterService = () => {
    return ApplicationObjectsSingleton.getFilterServiceInstance();
};

export const SoundboxProvider: FC<SoundboxProviderProps> = ({ children }) => {
    const { loadAudioPrincipalBuffer, downloadAudio } = useAudioEditor();
    const { playAudioBufferDirect } = useAudioPlayer();
    const { isCompatibilityModeEnabled } = useApplicationConfig();

    // State: all sounds
    const [allSounds, setAllSounds] = useState<Sound[]>([]);
    // State: current sound
    const [currentSound, setCurrentSound] = useState<Sound | null>(null);
    // State: current animation URL
    const [currentAnimationURL, setCurrentAnimationURL] = useState<string>("");
    // State: soundbox name
    const [soundboxName, setSoundboxName] = useState<{ [key: string]: string }>({});
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

    useEffect(() => {
        if (isReady) {
            return;
        }

        loaderService.onAudioLoaded((data) => {
            if (data && data.loaded) {
                setLoadedAudioCount(data.loaded);
            }
        });

        loaderService.onErrorLoadingAudio(() => setLoadingError(true));
        loaderService.onErrorLoadingImage(() => setLoadingError(true));
        loaderService.onErrorLoadingConfig(() => setLoadingConfigError(true));

        loadApp();

        isReady = true;
    }, []);

    const loadApp = async () => {
        // Loading config
        setLoadingConfig(true);
        await loaderService.loadConfig();
        await loaderService.loadLinkList();
        setLoadingConfig(false);

        setSoundboxLinks(await loaderService.getLinkList());

        const config = await loaderService.getConfig();

        if (config) {
            const sounds = config.sounds;

            setAllSounds(sounds);
            setSoundboxName(config.appTitle);
            setTotalAudioCount(sounds.length);

            try {
                // Loading audio files
                setLoadingAudio(true);
                await loaderService.loadSounds(sounds);
                setLoadingAudio(false);

                // Loading first animation
                setLoadingImages(true);
                await loaderService.loadImages(sounds[5].animationURL ? [sounds[5].animationURL] : []);
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
    const reloadAnimation = (sound: Sound) => {
        if (sound) {
            const animationURL = sound.animationURL;

            setCurrentAnimationURL("#");

            setTimeout(() => {
                setCurrentAnimationURL(animationURL || "");
            }, 1);
        }
    };

    /**
     * Play a sound
     * @param sound  The sound
     */
    const playSound = async (sound: Sound) => {
        if (!editingSound) {
            if (sound.soundURL) {
                try {
                    const audio = await loaderService.getAudioByUrl(sound.soundURL);

                    if (audio) {
                        try {
                            const audioCloned = audio.cloneNode() as HTMLAudioElement;
                            audioCloned.addEventListener("ended", () => audioCloned.remove());
                            await audioCloned.play();
                            setErrorPlayingAudio(false);
                        } catch (e) {
                            setErrorPlayingAudio(true);
                            console.error(e);
                        }
                    }
                } catch(e) {
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
        if (sound.soundURL) {
            const blob = await loaderService.getBlobByUrl(sound.soundURL);

            if (blob) {
                await loadAudioPrincipalBuffer(new File([blob], "audioFile"));
            }

            // Setup Reverb Filter
            const reverbFilterForm = getFilterService()?.getFilter(Constants.FILTERS_NAMES.REVERB);

            if (reverbFilterForm && reverbFilterForm.settingsForm) {
                reverbFilterForm.settingsForm[1] = {
                    settingId: "reverbEnvironment",
                    settingTitle: "filters.reverb.settings.environment",
                    settingType: SettingFormTypeEnum.SelectField,
                    selectValues: [
                        {
                            name: Constants.DEFAULT_REVERB_ENVIRONMENT.name,
                            value: Constants.DEFAULT_REVERB_ENVIRONMENT.url,
                            additionalData: {
                                size: Constants.DEFAULT_REVERB_ENVIRONMENT.size,
                                link: Constants.DEFAULT_REVERB_ENVIRONMENT.link,
                                addDuration: Constants.DEFAULT_REVERB_ENVIRONMENT.addDuration,
                            }
                        },
                        {
                            name: "filters.reverb.settings.customEnvironment",
                            value: "custom",
                            additionalData: {}
                        }
                    ]
                };

                getFilterService()?.updateFilter(Constants.FILTERS_NAMES.REVERB, {
                    settingsForm: reverbFilterForm.settingsForm
                });
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

    const downloadSound = async () => {
        if (currentSound) {
            downloadAudio();

            if (isCompatibilityModeEnabled) {
                reloadAnimation(currentSound);
            }
        }
    };

    return (
        <SoundboxContext.Provider value={{
            currentSound, allSounds,
            setSoundByName, playSound,
            loadedAudioCount, totalAudioCount,
            loadingImages, loadingAudio,
            loadingError, loadingConfig,
            loadingConfigError, retryLoadingApp,
            closeErrorLoading, loadingOneImage,
            soundboxName, toggleAudioEdit,
            editingSound, currentAnimationURL,
            downloadSound, errorPlayingAudio,
            soundboxLinks, initialLoadingFinished
        }}>
            {children}
        </SoundboxContext.Provider>
    );
};
