import { useEffect } from "react";
import { Inter } from "next/font/google";
import { useApplicationConfig } from "../context/ApplicationConfigContext";
import Constants from "../model/Constants";
import Navbar from "./navbar/navbar";
import PWA from "../pwa";
import SoundboxConfig from "../model/SoundboxConfig";

const inter = Inter({ subsets: ["latin"] });

const SoundboxLayout = ({
    children,
    soundboxConfig
}: { children: React.ReactNode, soundboxConfig?: SoundboxConfig }) => {
    const { currentTheme, currentLanguageValue } = useApplicationConfig();

    // Configure colors based on configuration
    useEffect(() => {
        const metaThemeColor = document.querySelector("meta[name=\"theme-color\"]");

        // Primary color - normal
        if (soundboxConfig && soundboxConfig.primaryColor && soundboxConfig.primaryColor.normal) {
            const color = currentTheme === Constants.THEMES.DARK ? soundboxConfig.primaryColor.normal.dark : soundboxConfig.primaryColor.normal.light;
            document.body.style.setProperty("--fallback-p", color);
            document.body.style.setProperty("--primary-color", color);

            if (metaThemeColor) {
                metaThemeColor.setAttribute("content", color);
            }
        } else {
            const color = currentTheme == Constants.THEMES.LIGHT ? Constants.DEFAULT_THEME.PRIMARY_COLOR.LIGHT : Constants.DEFAULT_THEME.PRIMARY_COLOR.DARK;

            document.body.style.setProperty("--fallback-p", color);
            document.body.style.setProperty("--primary-color", color);

            if (metaThemeColor) {
                metaThemeColor.setAttribute("content", color);
            }
        }

        // Secondary color - normal
        if (soundboxConfig && soundboxConfig.secondaryColor && soundboxConfig.secondaryColor.normal) {
            const color = currentTheme === Constants.THEMES.DARK ? soundboxConfig.secondaryColor.normal.dark : soundboxConfig.secondaryColor.normal.light;
            document.body.style.setProperty("--secondary-color", color);
        }

        // Primary color - hover
        if (soundboxConfig && soundboxConfig.primaryColor && soundboxConfig.primaryColor.hover) {
            const color = currentTheme === Constants.THEMES.DARK ? soundboxConfig.primaryColor.hover.dark : soundboxConfig.primaryColor.hover.light;
            document.body.style.setProperty("--primary-color-hover", color);
        }

        // Secondary color - hover
        if (soundboxConfig && soundboxConfig.secondaryColor && soundboxConfig.secondaryColor.normal) {
            const color = currentTheme === Constants.THEMES.DARK ? soundboxConfig.secondaryColor.hover.dark : soundboxConfig.secondaryColor.hover.light;
            document.body.style.setProperty("--secondary-color-hover", color);
        }
    }, [soundboxConfig, currentTheme]);

    useEffect(() => {
        if (soundboxConfig && soundboxConfig.windowTitle) {
            document.title = soundboxConfig.windowTitle[currentLanguageValue] || soundboxConfig.windowTitle["en"];
        }
    }, [soundboxConfig, currentLanguageValue]);
    
    return (
        <html data-theme={currentTheme ? currentTheme : Constants.THEMES.DARK} className="h-full" lang={currentLanguageValue}>
            <body className={`${inter.className} h-full flex flex-col overflow-x-hidden`}>
                <Navbar config={soundboxConfig}></Navbar>
                {children}
                <PWA></PWA>
            </body>
        </html>
    );
};

export default SoundboxLayout;
