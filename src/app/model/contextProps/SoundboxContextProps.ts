import Sound from "../Sound";

export default interface SoundboxContextProps {
    currentSound: Sound,
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
    soundboxName: string | null,
    toggleAudioEdit: () => void,
    editingSound: boolean,
    currentAnimationURL: string,
    downloadSound: () => void,
    errorPlayingAudio: boolean
}
