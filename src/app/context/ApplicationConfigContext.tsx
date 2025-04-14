"use client";

import { create } from "zustand";
import { EventEmitter, EventType } from "@eliastik/simple-sound-studio-lib";
import { SoundStudioApplicationFactory } from "@eliastik/simple-sound-studio-components";
import i18n from "@eliastik/simple-sound-studio-components/lib/i18n";
import i18next from "i18next";
import ApplicationConfigService from "../services/ApplicationConfigService";
import ApplicationConfigSingleton from "./ApplicationConfigSingleton";
import ApplicationConfigContextProps from "../model/contextProps/ApplicationConfigContextProps";

const getService = (): ApplicationConfigService | undefined => ApplicationConfigSingleton.getConfigServiceInstance();

const getEventEmitter = (): EventEmitter | null => SoundStudioApplicationFactory.getEventEmitterInstance();

export const useApplicationConfig = create<ApplicationConfigContextProps>((set, get) => {
    const initializeStore = () => {
        if (get().isInitialized) {
            return;
        }

        const service = getService();
        const eventEmitter = getEventEmitter();

        if (service && eventEmitter) {
            set({
                currentTheme: service.getCurrentTheme(),
                currentThemeValue: service.getCurrentThemePreference(),
                isCompatibilityModeEnabled: service.isCompatibilityModeEnabled(),
            });
    
            eventEmitter.on(EventType.COMPATIBILITY_MODE_AUTO_ENABLED, () => {
                set({ isCompatibilityModeEnabled: true });
            });
    
            service.checkAppUpdate().then(result => set({ updateData: result }));
    
            set({ isInitialized: false });
        } else {
            console.error("Config service or Event emitter is not available!");
        }
    };
    
    return {
        isInitialized: false,
        currentTheme: "dark",
        currentThemeValue: "auto",
        currentLanguageValue: "fr",
        updateData: null,
        isCompatibilityModeEnabled: false,
        setTheme: (theme) => {
            const service = getService();

            if (service) {
                service.setCurrentTheme(theme);

                set({
                    currentTheme: service.getCurrentTheme(),
                    currentThemeValue: service.getCurrentThemePreference(),
                });
            }
        },
        setupLanguage: () => {
            const service = getService();

            if (service) {
                const lng = service.getCurrentLanguagePreference();
                i18next.changeLanguage(lng);
                i18n.i18next.changeLanguage(lng);
    
                set({ currentLanguageValue: lng });
            }
        },
        setLanguage: (lng) => {
            const service = getService();

            if (service) {
                service.setCurrentLanguage(lng);
                get().setupLanguage();
            }
        },
        updateCurrentTheme: () => {
            if (get().currentThemeValue === "auto") {
                set({ currentTheme: getService()?.getCurrentTheme() });
            }
        },
        toggleCompatibilityMode: (enabled) => {
            const service = getService();

            if (service) {
                if (enabled) {
                    service.enableCompatibilityMode();
                } else {
                    service.disableCompatibilityMode();
                }

                set({ isCompatibilityModeEnabled: enabled });
            }
        },
        initializeStore
    };
});
