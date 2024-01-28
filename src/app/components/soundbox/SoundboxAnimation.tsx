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
                    <img
                        src={currentAnimationURL}
                        alt={currentSound.name || ""}
                        onClick={() => playSound(currentSound)}
                        className="lg:h-96 md:h-80 h-72 w-auto rounded-xl cursor-pointer"
                    />
                </div>
            )}
        </>
    );
};

export default SoundboxAnimation;
