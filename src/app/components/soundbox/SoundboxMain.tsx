"use client";

import { AudioEditorDialogs, AudioEditorNotifications } from "@eliastik/simple-sound-studio-components";
import { useSoundbox } from "@/app/context/SoundboxContext";
import SoundboxAnimation from "./SoundboxAnimation";
import SoundboxButtons from "./SoundboxButtons";
import SoundboxChoice from "./SoundboxChoice";
import SoundboxAudioEditor from "./SoundboxAudioEditor";
import SoundInfoDialog from "../dialogs/SoundInfoDialog";

const SoundboxMain = () => {
    const editingSound = useSoundbox(state => state.editingSound);

    return (
        <>
            <AudioEditorNotifications></AudioEditorNotifications>
            <div className="flex grow justify-center items-center mt-16 h-auto w-full">
                <div className="flex flex-col md:gap-4 gap-1 w-full">
                    <div className="flex flex-col w-full items-center md:gap-4 gap-1 sticky top-16 pt-2 z-10 bg-base-100/85 backdrop-blur-xs">
                        <SoundboxChoice></SoundboxChoice>
                        <SoundboxAnimation></SoundboxAnimation>
                        {!editingSound && <SoundboxButtons></SoundboxButtons>}
                    </div>
                    {editingSound && (
                        <div className="flex flex-col md:flex-initial w-full overflow-visible">
                            <SoundboxButtons></SoundboxButtons>
                            <SoundboxAudioEditor></SoundboxAudioEditor>
                        </div>
                    )}
                </div>
            </div>
            <AudioEditorDialogs></AudioEditorDialogs>
            <SoundInfoDialog></SoundInfoDialog>
        </>
    );
};

export default SoundboxMain;
