import { useTranslation } from "react-i18next";
import { useSoundbox } from "@/app/context/SoundboxContext";
import { useApplicationConfig } from "@/app/context/ApplicationConfigContext";

const SoundInfoDialog = () => {
    const { t } = useTranslation();
    const { currentLanguageValue } = useApplicationConfig();
    const { currentSound } = useSoundbox();

    return (
        <dialog id="modalSoundInfos" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{t("soundInfos.title")}</h3>
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                {currentSound && (
                    <>
                        {currentSound.soundDescription && (
                            <div className="flex flex-col">
                                <div className="mt-3">
                                    <div className="font-light text-md flex flex-col md:flex-row gap-3 md:items-center justify-between">
                                        <div className="w-full">
                                            <span>{currentSound.soundDescription[currentLanguageValue] || currentSound.soundDescription["en"]}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {currentSound.sourceURL && (
                            <div className="flex flex-col">
                                <div className="mt-3">
                                    <div className="font-normal text-base flex flex-col md:flex-row gap-3 md:items-center justify-between">
                                        <div className="md:w-4/6">
                                            <label>{t("soundInfos.sourceLink")}</label>
                                        </div>
                                        <a href={currentSound.sourceURL} className="link link-primary hover:no-underline" target="_blank">{currentSound.sourceURL}</a>
                                    </div>
                                </div>
                            </div>
                        )}
                        {currentSound.animationSize && (
                            <div className="flex flex-col">
                                <div className="mt-3">
                                    <div className="font-light text-md flex flex-col md:flex-row gap-3 md:items-center justify-between">
                                        <div className="md:w-4/6">
                                            <span>{t("soundInfos.animationSize")}</span>
                                        </div>
                                        <div>{(currentSound.animationSize / 1000000).toFixed(2).replace(".", ",")} {t("megabyte")}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {!currentSound.soundDescription && !currentSound.sourceURL && (
                            <div className="flex flex-col">
                                <div className="mt-3">
                                    <div className="font-light text-md flex flex-col md:flex-row gap-3 md:items-center justify-between">
                                        <div className="w-full">
                                            <span>{t("soundInfos.noMoreInfos")}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">{t("close")}</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default SoundInfoDialog;
