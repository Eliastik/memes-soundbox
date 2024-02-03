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
    memeName,
    soundboxConfig
}: { children: React.ReactNode, memeName: string, soundboxConfig?: SoundboxConfig }) => {
    const { currentTheme, currentLanguageValue } = useApplicationConfig();

    useEffect(() => {
        if (soundboxConfig && soundboxConfig.primaryColor) {
            const color = currentTheme === Constants.THEMES.DARK ? soundboxConfig.primaryColor.dark : soundboxConfig.primaryColor.light;
            document.body.style.setProperty("--fallback-p", color);
        }
    }, [soundboxConfig, currentTheme]);
    
    return (
        <html data-theme={currentTheme ? currentTheme : Constants.THEMES.DARK} className="h-full" lang={currentLanguageValue}>
            <head>
                <link rel="manifest" href={Constants.MANIFEST_URI.replace(Constants.MEME_NAME_PLACEHOLDER, memeName)} />
                <meta name="theme-color" content={currentTheme == Constants.THEMES.LIGHT ? "#61A6FA" : "#3884FF"} />
                {soundboxConfig && soundboxConfig.soundboxDescription && <meta name="description" content={soundboxConfig.soundboxDescription[currentLanguageValue] || soundboxConfig.soundboxDescription["en"]} />}
                {soundboxConfig && soundboxConfig.appTitle && <title>{soundboxConfig.appTitle[currentLanguageValue] || soundboxConfig.appTitle["en"]}</title>}
            </head>
            <body className={`${inter.className} h-full flex flex-col overflow-x-hidden`}>
                <Navbar soundboxConfig={soundboxConfig}></Navbar>
                {children}
                <PWA></PWA>
            </body>
        </html>
    );
};

export default SoundboxLayout;
