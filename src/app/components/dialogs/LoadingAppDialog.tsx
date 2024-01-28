import { useSoundbox } from "@/app/context/SoundboxContext";
import { useAudioEditor } from "@eliastik/simple-sound-studio-components";
import { useTranslation } from "react-i18next";

const LoadingAppDialog = () => {
    const { t } = useTranslation();
    const { downloadingInitialData } = useAudioEditor();
    const { loadedAudioCount, totalAudioCount, loadingAudio, loadingImages, loadingConfig } = useSoundbox();

    return (
        <>
            <input type="checkbox" id="loadingDataModal" className="modal-toggle" checked={downloadingInitialData || loadingAudio || loadingImages || loadingConfig} readOnly />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{t("dialogs.loadingApp.title")}</h3>
                    <p className="py-4 flex items-center"><span className="loading loading-spinner loading-lg mr-4 text-info"></span> {t("dialogs.pleaseWait")} {loadingConfig && (
                        <><br />{t("dialogs.gettingConfig")}</>
                    )}</p>
                    {(loadingAudio || loadingImages) && <progress className="progress progress-info w-full" value={loadedAudioCount + (downloadingInitialData ? 0 : 1) + (loadingImages ? 0 : 1)} max={totalAudioCount + 2}></progress>}
                </div>
            </div>
        </>
    );
};

export default LoadingAppDialog;
