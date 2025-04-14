"use client";

import { create } from "zustand";
import { useAudioEditor, useAudioPlayer } from "@eliastik/simple-sound-studio-components";
import Sound from "../model/Sound";
import SoundboxLoaderService from "../services/SoundboxLoader";
import SoundboxNameProvider from "../services/SoundboxNameProvider";
import { SaveBufferOptions } from "@eliastik/simple-sound-studio-lib";
import SoundboxContextProps from "../model/contextProps/SoundboxContextProps";

export const useSoundbox = create<SoundboxContextProps>((set, get) => {
    const animationRef = { current: null };

    const reloadAnimation = async (newSound?: Sound) => {
        const { loaderService, currentSound } = get();
        const sound = newSound || currentSound;
        if (!sound || !loaderService) return;

        const url = await loaderService.getImageBlobURL(sound.animationURL);
        const element = animationRef.current as HTMLImageElement | null;

        if (element) {
            element.src = "#";
            element.src = url || "";
        }
    };

    const setupAudioEditor = async (sound: Sound) => {
        const { loaderService } = get();
        const { loadAudioPrincipalBuffer, changeFilterSettings } = useAudioEditor.getState();

        if (!loaderService) throw new Error("No SoundboxLoader is available");

        if (sound.soundURL) {

            const blob = await loaderService.getAudioBlob(sound.soundURL);
            await changeFilterSettings("limiter", { lookAheadTime: 0.05 });

            if (blob) {
                await loadAudioPrincipalBuffer(new File([blob], "audioFile"));
            }
        }
    };

    const playSound = async (sound: Sound) => {
        const { loaderService, editingSound } = get();
        const { playAudioBufferDirect } = useAudioPlayer.getState();

        if (!loaderService) throw new Error("No SoundboxLoader is available");

        if (!editingSound && sound.soundURL) {
            try {
            const audio = await loaderService.getAudioByUrl(sound.soundURL);
            if (audio) {
                const audioCloned = audio.cloneNode() as HTMLAudioElement;
                audioCloned.addEventListener("ended", () => audioCloned.remove());
                await audioCloned.play();
                set({ errorPlayingAudio: false });
            }
            } catch (e) {
            console.error(e);
            set({ errorPlayingAudio: true });
            }
        } else {
            set({ errorPlayingAudio: false });
            playAudioBufferDirect();
        }

        await reloadAnimation(sound);
    };

    const loadApp = async () => {
        const { loaderService } = get();
        if (!loaderService) throw new Error("No SoundboxLoader is available");

        set({ loadingConfig: true });
        await loaderService.loadConfig();
        await loaderService.loadLinkList();

        set({
            loadingConfig: false,
            soundboxLinks: await loaderService.getLinkList(),
        });

        const config = await loaderService.getConfig();
        if (!config) return;

        const sounds = config.sounds;

        set({
            soundboxConfig: config,
            allSounds: sounds,
            totalAudioCount: sounds.length,
            loadingAudio: true,
        });

        try {
            await loaderService.loadSounds(sounds);
            set({ loadingAudio: false, loadingImages: true });
            await loaderService.loadImages(sounds.length ? [sounds[0]] : []);
            set({ loadingImages: false, initialLoadingFinished: true });
        } catch (e) {
            console.error(e);
            set({ loadingAudio: false, loadingImages: false });
        }

        set({ currentSound: sounds[0] });
        await playSound(sounds[0]);
    };

    const setup = (soundboxName: string) => {
        if (get().isInitialized) {
            return;
        }

        console.log("ok");

        const soundboxNameProvider = new SoundboxNameProvider(soundboxName);
        const soundboxLoaderService = new SoundboxLoaderService(soundboxNameProvider);

        soundboxLoaderService.onAudioLoaded(data => {
            if (data !== undefined) set({ loadedAudioCount: data.loaded });
        });

        soundboxLoaderService.onErrorLoadingAudio(() => set({ loadingError: true }));
        soundboxLoaderService.onErrorLoadingImage(() => set({ loadingError: true }));
        soundboxLoaderService.onErrorLoadingConfig(() => set({ loadingConfigError: true }));
        soundboxLoaderService.onLoadingState(event => set({ loadingState: event }));

        set({ soundboxName, loaderService: soundboxLoaderService, isInitialized: true });
    };

    const retryLoadingApp = async () => {
        set({
            loadingError: false,
            loadingConfigError: false,
            initialLoadingFinished: false,
            loadedAudioCount: 0,
        });

        await loadApp();
    };

    const closeErrorLoading = () => set({ loadingError: false });

    const setSound = async (soundIndex: number) => {
        const { allSounds, loaderService, editingSound } = get();
        if (!loaderService) throw new Error("No SoundboxLoader is available");

        const sound = allSounds[soundIndex];
        if (!sound) return;

        set({ initialLoadingFinished: true, loadingOneImage: true });

        try {
            await loaderService.loadImages([sound]);
            if (editingSound) await setupAudioEditor(sound);

            set({
            currentSound: sound,
            currentSoundIndex: soundIndex,
            loadingOneImage: false,
            });

            await playSound(sound);
        } catch (e) {
            console.error(e);
            set({ loadingOneImage: false });
        }
    };

    const setSoundByName = async (name: string) => {
        const { allSounds } = get();
        const index = allSounds.findIndex(sound => sound.animationURL === name);
        await setSound(index);
    };

    const setSoundByIndex = async (index: number) => {
        await setSound(index);
    };

    const toggleAudioEdit = async () => {
        const { currentSound, editingSound } = get();
        if (!currentSound) return;

        if (!editingSound) await setupAudioEditor(currentSound);
        set({ editingSound: !editingSound });
    };

    const downloadSound = async (options?: SaveBufferOptions) => {
        const { currentSound } = get();
        const { downloadAudio } = useAudioEditor.getState();
        const { isCompatibilityModeEnabled, stopAudioBuffer } = useAudioPlayer.getState();

        if (!currentSound) return;

        if (isCompatibilityModeEnabled) {
            await reloadAnimation();
            stopAudioBuffer();
        }

        setTimeout(() => {
            downloadAudio(options);
        }, 1);
    };

    return {
        isInitialized: false,
        animationRef,
        loaderService: null,
        allSounds: [],
        currentSound: null,
        currentSoundIndex: 0,
        soundboxConfig: null,
        soundboxName: "",
        editingSound: false,
        errorPlayingAudio: false,
        loadingImages: false,
        loadingConfig: false,
        loadingOneImage: false,
        loadingAudio: false,
        loadedAudioCount: 0,
        totalAudioCount: 0,
        loadingError: false,
        loadingConfigError: false,
        soundboxLinks: [],
        initialLoadingFinished: false,
        loadingState: undefined,

        setup,
        loadApp,
        retryLoadingApp,
        closeErrorLoading,
        setSoundByName,
        setSoundByIndex,
        playSound,
        toggleAudioEdit,
        downloadSound,
    };
});
