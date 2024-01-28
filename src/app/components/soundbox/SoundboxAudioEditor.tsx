"use client";

import { AudioEditorActionButtons, FilterButtonList } from "@eliastik/simple-sound-studio-components";
import { useApplicationConfig } from "@/app/context/ApplicationConfigContext";
import { useSoundbox } from "@/app/context/SoundboxContext";
import { useTranslation } from "react-i18next";

const SoundboxAudioEditor = () => {
    const { currentSound, playSound, downloadSound } = useSoundbox();
    const { isCompatibilityModeEnabled, toggleCompatibilityMode } = useApplicationConfig();
    const { t } = useTranslation();
    
    return (
        <>
            <div className="flex justify-center items-center flex-grow gap-6 flex-col">
                <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 md:gap-4 gap-2 place-content-center p-2 md:p-0">
                    <FilterButtonList></FilterButtonList>
                </div>
                <div className="font-normal text-base flex flex-row gap-3 items-center justify-between pl-2 pr-2">
                    <div className="flex flex-row gap-x-2 justify-center md:justify-items-end">
                        <input type="checkbox" className="toggle" id="compatibilityMode" checked={isCompatibilityModeEnabled} onChange={(e) => toggleCompatibilityMode(e.target.checked)} />
                    </div>
                    <div className="flex items-center gap-x-4">
                        <label htmlFor="compatibilityMode">{t("appSettings.compatibilityMode")}</label>
                        <div className="tooltip tooltip-top tooltip-compatibility-mode md:tooltip-compatibility-mode-md" data-tip={t("appSettings.compatibilityModeInfos")}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row md:gap-x-3 gap-x-1 sticky bottom-4 max-w-full flex-wrap justify-center gap-y-1">
                    <AudioEditorActionButtons onSettingsValidated={() => playSound(currentSound)}></AudioEditorActionButtons>
                    <button className="btn btn-secondary opacity-80" onClick={() => downloadSound()}>{t("soundbox.downloadAudio")}</button>
                </div>
            </div>
        </>
    );
};

export default SoundboxAudioEditor;
