/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useApplicationConfig } from "@/app/context/ApplicationConfigContext";
import { useSoundbox } from "@/app/context/SoundboxContext";
import { useTranslation } from "react-i18next";

const SoundboxAnimation = () => {
    const { currentLanguageValue } = useApplicationConfig();
    const { currentSound, playSound, errorPlayingAudio, animationRef } = useSoundbox();
    const { t } = useTranslation();
    const [imageHeight, setImageHeight] = useState(-1);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY / window.innerHeight;
            
            if (currentScrollY > 0 && window.innerWidth <= 1920) {
                setImageHeight(Math.round(Math.max(100, 250 * (1 - currentScrollY))));
            } else {
                setImageHeight(-1);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            {currentSound && (
                <div className={errorPlayingAudio ? "tooltip tooltip-open tooltip-top" : ""} data-tip={t("soundbox.clickHere")}>
                    <div className="p-1 md:p-2">
                        <img
                            src={currentSound.animationURL}
                            alt={currentSound.labels[currentLanguageValue] || currentSound.labels["en"]}
                            onClick={() => playSound(currentSound)}
                            className="lg:h-96 md:h-96 max-h-56 md:max-h-60 lg:max-h-64 xl:max-h-68 2xl:max-h-72 3xl:max-h-96 w-auto rounded-xl cursor-pointer transition-all duration-75"
                            style={imageHeight > -1 ? {height: imageHeight + "px"} : {}}
                            ref={animationRef}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default SoundboxAnimation;
