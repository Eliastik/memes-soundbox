/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useApplicationConfig } from "@/app/context/ApplicationConfigContext";
import { useSoundbox } from "@/app/context/SoundboxContext";
import { useTranslation } from "react-i18next";

const SoundboxAnimation = () => {
    const { currentLanguageValue } = useApplicationConfig();
    const { currentSound, currentSoundIndex, playSound, errorPlayingAudio, animationRef, editingSound, setSoundByIndex } = useSoundbox();
    const { t } = useTranslation();
    const [imageHeight, setImageHeight] = useState(-1);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollYPercent = window.scrollY / window.innerHeight;

            let maxHeight = 250;

            if (window.innerWidth <= 768) {
                maxHeight = 224;
            }
            
            if (editingSound && currentScrollYPercent > 0 && window.innerWidth <= 1920) {
                setImageHeight(Math.trunc(Math.max(100, maxHeight * (1 - currentScrollYPercent))));
            } else {
                setImageHeight(-1);
            }
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [editingSound]);

    return (
        <>
            {currentSound && (
                <div className="flex flex-row items-center">
                    <button className="btn btn-ghost rounded-full lg:w-20 lg:h-20 md:w-16 md:h-16 w-8 h-8 md:p-1 p-0" onClick={() => setSoundByIndex(currentSoundIndex - 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <div className={errorPlayingAudio ? "tooltip tooltip-open tooltip-top" : ""} data-tip={t("soundbox.clickHere")}>
                        <div className="p-1 md:p-2">
                            <img
                                src={currentSound.animationURL}
                                id="soundboxAnimation"
                                alt={currentSound.labels[currentLanguageValue] || currentSound.labels["en"]}
                                onClick={() => playSound(currentSound)}
                                className="lg:h-96 md:h-96 max-h-56 md:max-h-60 lg:max-h-64 xl:max-h-68 2xl:max-h-72 3xl:max-h-96 w-auto rounded-xl cursor-pointer transition-all duration-50"
                                style={imageHeight > -1 ? {height: imageHeight + "px"} : {}}
                                ref={animationRef}
                            />
                        </div>
                    </div>
                    <button className="btn btn-ghost rounded-full lg:w-20 lg:h-20 md:w-16 md:h-16 w-8 h-8 md:p-1 p-0" onClick={() => setSoundByIndex(currentSoundIndex + 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            )}
        </>
    );
};

export default SoundboxAnimation;
