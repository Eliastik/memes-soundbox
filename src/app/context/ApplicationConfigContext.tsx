"use client";

import { createContext, useContext, useState, ReactNode, FC, useEffect } from "react";
import { AudioEditor, EventType } from "@eliastik/simple-sound-studio-lib";
import { ApplicationObjectsSingleton } from "@eliastik/simple-sound-studio-components";
import i18n from "@eliastik/simple-sound-studio-components/lib/i18n";
import i18next from "i18next";
import ApplicationConfigContextProps from "../model/contextProps/ApplicationConfigContextProps";
import ApplicationConfigService from "./ApplicationConfigService";
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
    return ApplicationObjectsSingleton.getAudioEditorInstance()!;
};

let isReady = false;

export const ApplicationConfigProvider: FC<ApplicationConfigProviderProps> = ({ children }) => {
    // State: current theme (light/dark)
    const [currentTheme, setCurrentTheme] = useState("dark");
    // State: theme setting (auto/dark/light)
    const [currentThemeValue, setCurrentThemeValue] = useState("auto");
    // State: current language
    const [currentLanguageValue, setCurrentLanguageValue] = useState("en");
    // State: update data
    const [updateData, setUpdateData] = useState<UpdateData | null>(null);
    // State: true if the user already used the time one time
    const [alreadyUsed, setAlreadyUsed] = useState(false);
    // State: true if compatibility/direct mode is enabled
    const [isCompatibilityModeEnabled, setCompatibilityModeEnabled] = useState(false);

    useEffect(() => {
        if (isReady) {
            return;
        }

        setCurrentTheme(getService().getCurrentTheme());
        setCurrentThemeValue(getService().getCurrentThemePreference());
        setAlreadyUsed(getService().hasAlreadyUsedApp());
        setCompatibilityModeEnabled(getService().isCompatibilityModeEnabled());
        getAudioEditor().on(EventType.COMPATIBILITY_MODE_AUTO_ENABLED, () => setCompatibilityModeEnabled(true));

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

    const closeFirstLaunchModal = () => {
        getService().setAlreadyUsedApp();
        setAlreadyUsed(true);
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
            updateData, alreadyUsed, closeFirstLaunchModal, updateCurrentTheme, isCompatibilityModeEnabled,
            toggleCompatibilityMode
        }}>
            {children}
        </ApplicationConfigContext.Provider>
    );
};
