import Sound from "../Sound";
import { SoundboxLink } from "../SoundboxLink";

export default interface SoundboxContextProps {
    currentSound: Sound | null,
    allSounds: Sound[],
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
    soundboxName: {[key: string]: string},
    toggleAudioEdit: () => void,
    editingSound: boolean,
    currentAnimationURL: string,
    downloadSound: () => void,
    errorPlayingAudio: boolean,
    soundboxLinks: SoundboxLink[],
    initialLoadingFinished: boolean
}
