"use client";

import { createContext, useContext, useState, ReactNode, FC, useEffect } from "react";
import { AudioEditor, EventEmitter, EventType } from "@eliastik/simple-sound-studio-lib";
import { SoundStudioApplicationFactory } from "@eliastik/simple-sound-studio-components";
import i18n from "@eliastik/simple-sound-studio-components/lib/i18n";
import i18next from "i18next";
import ApplicationConfigContextProps from "../model/contextProps/ApplicationConfigContextProps";
import ApplicationConfigService from "../services/ApplicationConfigService";
import { UpdateData } from "../model/UpdateData";
import ApplicationConfigSingleton from "./ApplicationConfigSingleton";

const ApplicationConfigContext = createContext<ApplicationConfigContextProps | undefined>(undefined);

export const useApplicationConfig = (): ApplicationConfigContextProps => {
    const context = useContext(ApplicationConfigContext);
    if (!context) {
        throw new Error("useApplicationConfig must be used inside an ApplicationConfigProvider");
    }
    return context;
};

interface ApplicationConfigProviderProps {
    children: ReactNode;
}

const getService = (): ApplicationConfigService => {
    return ApplicationConfigSingleton.getConfigServiceInstance()!;
};

const getAudioEditor = (): AudioEditor => {
    return SoundStudioApplicationFactory.getAudioEditorInstance()!;
};

const getEventEmitter = (): EventEmitter => {
    return SoundStudioApplicationFactory.getEventEmitterInstance()!;
};

let isReady = false;

export const ApplicationConfigProvider: FC<ApplicationConfigProviderProps> = ({ children }) => {
    // State: current theme (light/dark)
    const [currentTheme, setCurrentTheme] = useState("dark");
    // State: theme setting (auto/dark/light)
    const [currentThemeValue, setCurrentThemeValue] = useState("auto");
    // State: current language
    const [currentLanguageValue, setCurrentLanguageValue] = useState("fr");
    // State: update data
    const [updateData, setUpdateData] = useState<UpdateData | null>(null);
    // State: true if compatibility/direct mode is enabled
    const [isCompatibilityModeEnabled, setCompatibilityModeEnabled] = useState(false);

    useEffect(() => {
        if (isReady) {
            return;
        }

        setCurrentTheme(getService().getCurrentTheme());
        setCurrentThemeValue(getService().getCurrentThemePreference());
        setCompatibilityModeEnabled(getService().isCompatibilityModeEnabled());
        getEventEmitter().on(EventType.COMPATIBILITY_MODE_AUTO_ENABLED, () => setCompatibilityModeEnabled(true));

        getService().checkAppUpdate().then(result => setUpdateData(result));

        isReady = true;
    }, []);

    const setTheme = (theme: string) => {
        getService().setCurrentTheme(theme);
        setCurrentTheme(getService().getCurrentTheme());
        setCurrentThemeValue(getService().getCurrentThemePreference());
    };

    const setupLanguage = () => {
        const lng = getService().getCurrentLanguagePreference();
        i18next.changeLanguage(lng);
        i18n.i18next.changeLanguage(lng);
        setCurrentLanguageValue(lng);
    };

    const setLanguage = (lng: string) => {
        getService().setCurrentLanguage(lng);
        setupLanguage();
    };

    const updateCurrentTheme = () => {
        if (currentThemeValue === "auto") {
            setCurrentTheme(getService().getCurrentTheme());
        }
    };

    const toggleCompatibilityMode = (enabled: boolean) => {
        if (enabled) {
            getService().enableCompatibilityMode();
        } else {
            getService().disableCompatibilityMode();
        }

        setCompatibilityModeEnabled(enabled);
    };

    return (
        <ApplicationConfigContext.Provider value={{
            currentTheme, currentThemeValue, setTheme, setupLanguage, currentLanguageValue, setLanguage,
            updateData, updateCurrentTheme, isCompatibilityModeEnabled,
            toggleCompatibilityMode
        }}>
            {children}
        </ApplicationConfigContext.Provider>
    );
};
