import { MutableRefObject } from "react";
import { SaveBufferOptions } from "@eliastik/simple-sound-studio-lib";
import Sound from "../Sound";
import SoundboxConfig from "../SoundboxConfig";
import { SoundboxLink } from "../SoundboxLink";

export default interface SoundboxContextProps {
    setup: (soundboxName: string) => void,
    currentSound: Sound | null,
    allSounds: Sound[],
    soundboxConfig: SoundboxConfig | null,
    setSoundByName: (name: string) => void,
    playSound: (sound: Sound) => void,
    retryLoadingApp: () => void,
    closeErrorLoading: () => void,
    loadedAudioCount: number,
    totalAudioCount: number,
    loadingImages: boolean,
    loadingAudio: boolean,
    loadingError: boolean,
    loadingConfig: boolean,
    loadingConfigError: boolean,
    loadingOneImage: boolean,
    toggleAudioEdit: () => void,
    editingSound: boolean,
    downloadSound: (options?: SaveBufferOptions) => void,
    errorPlayingAudio: boolean,
    soundboxLinks: SoundboxLink[],
    initialLoadingFinished: boolean,
    soundboxName: string,
    animationRef: MutableRefObject<HTMLImageElement | null>
}
