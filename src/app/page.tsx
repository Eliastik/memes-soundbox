"use client";

import { useEffect } from "react";
import MainComponent from "./components/MainComponent";
import { ApplicationObjectsSingleton, useAudioEditor } from "@eliastik/simple-sound-studio-components";
import { useApplicationConfig } from "./context/ApplicationConfigContext";
import ApplicationConfigSingleton from "./context/ApplicationConfigSingleton";
import Constants from "./model/Constants";

const Home = () => {
    const { pauseAudioEditor } = useAudioEditor();
    const { updateCurrentTheme } = useApplicationConfig();

    useEffect(() => {
        // Initialize ApplicationObjectsSingleton
        ApplicationObjectsSingleton.initializeApplicationObjects(ApplicationConfigSingleton.getConfigServiceInstance(), Constants.AUDIO_BUFFERS_TO_FETCH);
    }, []);

    useEffect(() => {
        const handleThemeChange = () => updateCurrentTheme();
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", handleThemeChange);

        return () => {
            window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", handleThemeChange);
        };
    }, [pauseAudioEditor, updateCurrentTheme]);

    return <MainComponent></MainComponent>;
};

export default Home;
