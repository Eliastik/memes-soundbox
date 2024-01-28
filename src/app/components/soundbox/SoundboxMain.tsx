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
            <div className="flex flex-grow items-center flex-col md:gap-10 gap-4 justify-center pt-20 pb-4">
                <SoundboxChoice></SoundboxChoice>
                <div className="flex flex-col items-center md:gap-8 gap-4">
                    <SoundboxAnimation></SoundboxAnimation>
                    <SoundboxButtons></SoundboxButtons>
                    {editingSound && <SoundboxAudioEditor></SoundboxAudioEditor>}
                </div>
            </div>
            <AudioEditorDialogs></AudioEditorDialogs>
        </>
    );
};

export default SoundboxMain;
