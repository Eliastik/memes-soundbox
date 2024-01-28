"use client";

import { useSoundbox } from "@/app/context/SoundboxContext";
import { AudioEditorActionButtons, FilterButtonList } from "@eliastik/simple-sound-studio-components";
import { useTranslation } from "react-i18next";

const SoundboxAudioEditor = () => {
    const { downloadSound } = useSoundbox();
    const { t } = useTranslation();
    
    return (
        <>
            <div className="flex justify-center items-center flex-grow gap-6 flex-col">
                <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 md:gap-4 gap-2 place-content-center p-2 md:p-0">
                    <FilterButtonList></FilterButtonList>
                </div>
                <div className="flex flex-row md:gap-x-3 gap-x-1 sticky bottom-4 max-w-full flex-wrap justify-center gap-y-1">
                    <AudioEditorActionButtons></AudioEditorActionButtons>
                    <button className="btn btn-secondary opacity-80" onClick={() => downloadSound()}>{t("soundbox.downloadAudio")}</button>
                </div>
            </div>
        </>
    );
};

export default SoundboxAudioEditor;
