import AudioLoadingEvent from "../model/AudioLoadingEvent";

export type EventEmitterCallback = (data?: AudioLoadingEvent) => void;

interface Events {
    [key: string]: EventEmitterCallback[]
};

export class EventEmitter {
    private listeners: Events = {};
    
    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: EventEmitterCallback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    emit(event: string, data?: AudioLoadingEvent) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => {
                callback(data);
            });
        }
    }

    off(event: string, callback: EventEmitterCallback) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
        }
    }
}
