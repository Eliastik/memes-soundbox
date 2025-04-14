"use client";

import { useEffect } from "react";
import { useApplicationConfig } from "./context/ApplicationConfigContext";
// i18next imports (local and from the library)
import "./i18n";
import Constants from "./model/Constants";
import { SoundStudioApplicationFactory } from "@eliastik/simple-sound-studio-components";
import ApplicationConfigSingleton from "./context/ApplicationConfigSingleton";
import i18next from "i18next";
import i18n from "@eliastik/simple-sound-studio-components/lib/i18n";

// Configure audio editor
if (typeof(window) !== "undefined") {
    SoundStudioApplicationFactory.initializeApplication(ApplicationConfigSingleton.getConfigServiceInstance(), Constants.AUDIO_BUFFERS_TO_FETCH);
}

// Setup default language
i18next.changeLanguage(Constants.DEFAULT_LANGUAGE);
i18n.i18next.changeLanguage(Constants.DEFAULT_LANGUAGE);

const LayoutChild = ({
    children,
}: { children: React.ReactNode }) => {
    const { setupLanguage, updateCurrentTheme, initializeStore } = useApplicationConfig();

    useEffect(() => {
        // Initialize contexts
        initializeStore();
    }, []);

    useEffect(() => {
        setupLanguage();
    }, [setupLanguage]);

    useEffect(() => {
        const handleThemeChange = () => updateCurrentTheme();
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", handleThemeChange);

        return () => {
            window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", handleThemeChange);
        };
    }, [updateCurrentTheme]);

    return children;
};

export default LayoutChild;
