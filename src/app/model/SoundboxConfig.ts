import Sound from "./Sound";

export interface AppTitle {
    [key: string]: string;
}

export default interface SoundboxConfig {
    appTitle: AppTitle,
    favicon: string,
    icon: string,
    sounds: Sound[]
}
