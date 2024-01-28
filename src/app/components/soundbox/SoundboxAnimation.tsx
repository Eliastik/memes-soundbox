/* eslint-disable @next/next/no-img-element */
import { useSoundbox } from "@/app/context/SoundboxContext";
import { useTranslation } from "react-i18next";

const SoundboxAnimation = () => {
    const { currentSound, currentAnimationURL, playSound, errorPlayingAudio } = useSoundbox();
    const { t } = useTranslation();

    return (
        <>
            {currentSound && (
                <div className={errorPlayingAudio ? "tooltip tooltip-open tooltip-top" : ""} data-tip={t("soundbox.clickHere")}>
                    <div className="p-1 md:p-2">
                        <img
                            src={currentAnimationURL}
                            alt={currentSound.name || ""}
                            onClick={() => playSound(currentSound)}
                            className="lg:h-96 md:h-80 max-h-56 md:max-h-80 lg:max-h-96 w-full rounded-xl cursor-pointer"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default SoundboxAnimation;
