"use client";

import { useEffect } from "react";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar/navbar";
import { useApplicationConfig } from "./context/ApplicationConfigContext";
// i18next imports (local and from the library)
import "./i18n";
import PWA from "./pwa";
import Constants from "./model/Constants";
import { ApplicationObjectsSingleton, AudioEditorProvider, AudioPlayerProvider } from "@eliastik/simple-sound-studio-components";
import { SoundboxProvider } from "./context/SoundboxContext";
import ApplicationConfigSingleton from "./context/ApplicationConfigSingleton";

const inter = Inter({ subsets: ["latin"] });

// Configure audio editor
if (typeof(window) !== "undefined") {
    ApplicationObjectsSingleton.initializeApplicationObjects(ApplicationConfigSingleton.getConfigServiceInstance(), Constants.AUDIO_BUFFERS_TO_FETCH);
}

const LayoutChild = ({
    children,
}: { children: React.ReactNode }) => {
    const { updateCurrentTheme } = useApplicationConfig();
    const { currentTheme, setupLanguage, currentLanguageValue } = useApplicationConfig();

    useEffect(() => {
        setupLanguage();
    });

    useEffect(() => {
        const handleThemeChange = () => updateCurrentTheme();
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", handleThemeChange);

        return () => {
            window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", handleThemeChange);
        };
    }, [updateCurrentTheme]);

    return (
        <AudioPlayerProvider>
            <AudioEditorProvider>
                <SoundboxProvider>
                    <html data-theme={currentTheme ? currentTheme : Constants.THEMES.DARK} className="h-full" lang={currentLanguageValue}>
                        <head>
                            <link rel="manifest" href={Constants.MANIFEST_URI.replace(Constants.MEME_NAME_PLACEHOLDER, "risitas")} />
                            <meta name="theme-color" content={currentTheme == Constants.THEMES.LIGHT ? "#61A6FA" : "#3884FF"} />
                        </head>
                        <body className={`${inter.className} h-full flex flex-col overflow-x-hidden`}>
                            <Navbar></Navbar>
                            {children}
                            <PWA></PWA>
                        </body>
                    </html>
                </SoundboxProvider>
            </AudioEditorProvider>
        </AudioPlayerProvider>
    );
};

export default LayoutChild;
