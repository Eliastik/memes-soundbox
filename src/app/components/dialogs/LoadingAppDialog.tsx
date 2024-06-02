import { useEffect, useState } from "react";
import { useAudioEditor } from "@eliastik/simple-sound-studio-components";
import { useSoundbox } from "@/app/context/SoundboxContext";
import { useTranslation } from "react-i18next";

const LoadingAppDialog = () => {
    const { t } = useTranslation();
    const { downloadingInitialData } = useAudioEditor();
    const { loadedAudioCount, totalAudioCount, loadingAudio, loadingImages, loadingConfig } = useSoundbox();

    const [displayed, setDisplayed] = useState(true);
    const [progressValue, setProgessValue] = useState(0);

    useEffect(() => {
        setDisplayed(downloadingInitialData || loadingAudio || loadingImages || loadingConfig);
        setProgessValue(loadedAudioCount + (downloadingInitialData ? 0 : 1) + (loadingImages ? 0 : 1));
    }, [downloadingInitialData, loadingAudio, loadingImages, loadingConfig, loadedAudioCount]);

    return (
        <>
            {displayed && <input type="checkbox" id="loadingDataModal" className="modal-toggle" defaultChecked={true} />}
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{t("dialogs.loadingApp.title")}</h3>
                    <div className="py-4 flex flex-row items-center gap-x-4">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                        <p className="flex flex-col">
                            <span>{t("dialogs.pleaseWait")}</span>
                            {loadingConfig && (
                                <span className="mt-2">{t("dialogs.gettingConfig")}</span>
                            )}
                        </p>
                    </div>
                    {(loadingAudio || loadingImages) && (
                        <p className="flex items-center justify-around pb-0 gap-x-2 w-full">
                            <progress className="progress progress-primary w-full" value={progressValue} max={totalAudioCount + 2}></progress>
                            <span className="min-w-8 text-right">{Math.round((progressValue / (totalAudioCount + 2)) * 100)}%</span>
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default LoadingAppDialog;
