"use client";

import { AudioEditorDialogs, AudioEditorNotifications } from "@eliastik/simple-sound-studio-components";
import { useSoundbox } from "@/app/context/SoundboxContext";
import SoundboxAnimation from "./SoundboxAnimation";
import SoundboxButtons from "./SoundboxButtons";
import SoundboxChoice from "./SoundboxChoice";
import SoundboxAudioEditor from "./SoundboxAudioEditor";

const SoundboxMain = () => {
    const { editingSound } = useSoundbox();

    return (
        <>
            <AudioEditorNotifications></AudioEditorNotifications>
            <div className="flex flex-grow items-center flex-col md:gap-4 gap-2 pt-20 justify-center overflow-hidden md:overflow-visible">
                <div className="flex flex-col items-center md:gap-4 gap-2 md:h-auto w-full">
                    <SoundboxChoice></SoundboxChoice>
                    <SoundboxAnimation></SoundboxAnimation>
                    {!editingSound && <SoundboxButtons></SoundboxButtons>}
                </div>
                {editingSound && (
                    <div className="flex-grow md:flex-initial h-2/4 w-full md:h-auto overflow-auto md:overflow-visible">
                        <SoundboxButtons></SoundboxButtons>
                        <SoundboxAudioEditor></SoundboxAudioEditor>
                    </div>
                )}
            </div>
            <AudioEditorDialogs></AudioEditorDialogs>
        </>
    );
};

export default SoundboxMain;
