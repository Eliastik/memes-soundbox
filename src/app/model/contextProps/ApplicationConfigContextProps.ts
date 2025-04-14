import { UpdateData } from "../UpdateData";

export default interface ApplicationConfigContextProps {
    isInitialized: boolean,
    currentTheme: string,
    currentThemeValue: string,
    setTheme: (theme: string) => void,
    setupLanguage: () => void,
    currentLanguageValue: string,
    setLanguage: (lng: string) => void,
    updateData: UpdateData | null,
    updateCurrentTheme: () => void,
    isCompatibilityModeEnabled: boolean,
    toggleCompatibilityMode: (enabled: boolean) => void,
    initializeStore: () => void
};
