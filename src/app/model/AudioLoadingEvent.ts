export default interface AudioLoadingEvent {
    loaded?: number,
    total?: number,
    url?: string,

    percent?: number;
    size?: number;
    speed?: string[];
    time?: number;
}