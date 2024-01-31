import { useSoundbox } from "@/app/context/SoundboxContext";
import { DaisyUIModal } from "@eliastik/simple-sound-studio-components";
import { useTranslation } from "react-i18next";

const SoundboxButtons = () => {
    const { toggleAudioEdit } = useSoundbox();
    const { t } = useTranslation();

    return (
        <div className="flex justify-center mb-2 md:mb-6 btn-group gap-x-2">
            <button className="btn btn-primary" onClick={() => toggleAudioEdit()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
                {t("soundbox.editSound")}
            </button>
            <button className="btn btn-secondary" onClick={() => (document.getElementById("modalSoundInfos")! as DaisyUIModal).showModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
            </button>
        </div>
    );
};

export default SoundboxButtons;
