"use client";

import { AudioEditorActionButtons, FilterButtonList } from "@eliastik/simple-sound-studio-components";
import { useApplicationConfig } from "@/app/context/ApplicationConfigContext";
import { useSoundbox } from "@/app/context/SoundboxContext";
import { useTranslation } from "react-i18next";
import Constants from "@/app/model/Constants";

const SoundboxAudioEditor = () => {
    const { currentSound, playSound, downloadSound } = useSoundbox();
    const { isCompatibilityModeEnabled, toggleCompatibilityMode } = useApplicationConfig();
    const { t } = useTranslation();

    const removeOpenAttribute = () => {
        document.querySelector("#dropdownDownloadAudio")?.removeAttribute("open");
        return true;
    };
    
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
                    <div className="flex items-center gap-x-2 md:gap-x-4 text-sm">
                        <label htmlFor="compatibilityMode">{t("appSettings.compatibilityMode")}</label>
                        <div className="tooltip tooltip-top tooltip-compatibility-mode md:tooltip-compatibility-mode-md" data-tip={t("appSettings.compatibilityModeInfos")}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="flex items-center text-xs">
                    <span>{t("audioEditor.poweredBy")} <a href={Constants.OFFICIAL_SIMPLE_VOICE_CHANGER_WEBSITE} target="_blank" className="link link-primary hover:no-underline">Simple Voice Changer</a></span>
                </div>
                <div className="flex flex-row md:gap-x-3 gap-x-1 sticky bottom-1 max-w-full flex-wrap justify-center gap-y-1 btn-group">
                    <AudioEditorActionButtons onSettingsValidated={(result: boolean) => result && currentSound && playSound(currentSound)}></AudioEditorActionButtons>
                    <details className="dropdown dropdown-top" id="dropdownDownloadAudio">
                        <summary role="button" className="btn btn-secondary opacity-80">{t("soundbox.downloadAudio")}</summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                            <li onClick={() => removeOpenAttribute() && downloadSound({ format: "mp3" })}><a>{t("soundbox.saveToMp3")}</a></li>
                            <li onClick={() => removeOpenAttribute() && downloadSound({ format: "wav" })}><a>{t("soundbox.saveToWav")}</a></li>
                        </ul>
                    </details>
                </div>
            </div>
        </>
    );
};

export default SoundboxAudioEditor;
