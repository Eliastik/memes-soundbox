import Sound from "./Sound";

export interface AppTitle {
    [key: string]: string;
}

export interface SoundboxDescription {
    [key: string]: string;
}

export interface PrimaryColor {
    light: string,
    dark: string
}

export default interface SoundboxConfig {
    appTitle: AppTitle,
    favicon: string,
    icon: string,
    soundboxDescription: SoundboxDescription,
    primaryColor: PrimaryColor,
    sounds: Sound[]
}
