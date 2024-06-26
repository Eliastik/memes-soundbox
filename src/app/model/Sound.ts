export interface SoundLabels {
    [key: string]: string;
}

export interface SoundDescriptions {
    [key: string]: string;
}

export default interface Sound {
    labels: SoundLabels;
    soundURL: string;
    animationURL: string;
    animationSize?: number;
    sourceURL?: string;
    soundDescription?: SoundDescriptions;
}
