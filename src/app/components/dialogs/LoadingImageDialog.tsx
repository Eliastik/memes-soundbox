import { useSoundbox } from "@/app/context/SoundboxContext";
import { useTranslation } from "react-i18next";

const LoadingImageDialog = () => {
    const { t } = useTranslation();
    const { loadingOneImage, loadingState } = useSoundbox();

    return (
        <>
            {loadingOneImage && <input type="checkbox" id="loadingImageDataModal" className="modal-toggle" defaultChecked={true} />}
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{t("dialogs.loadingOneImage.title")}</h3>
                    <p className="py-4 flex items-center"><span className="loading loading-spinner loading-lg mr-4 text-primary"></span> {t("dialogs.pleaseWait")}</p>
                    {loadingState && (
                        <p className="flex items-center justify-around pb-0 gap-x-2 w-full">
                            <progress className="progress progress-primary w-full" value={Math.round(loadingState.percent || 0)} max="100"></progress>
                            <span className="min-w-8 text-right">{Math.round(loadingState.percent || 0)}%</span>
                        </p>
                    )}
                    {loadingState && (
                        <p className="py-4 flex items-center pb-0">
                            {t("dialogs.loadingOneImage.remaining")}
                            &nbsp;
                            {(
                                <>{("0" + Math.trunc((loadingState.time || 0) / 60)).slice(-2) + ":" + ("0" + Math.trunc((loadingState.time || 0) % 60)).slice(-2)} ({((loadingState.speed && loadingState.speed[0]) || "0")} {t(loadingState.speed && loadingState.speed[1] || "megabyteSec")}) – {loadingState.size && (loadingState.size / 1000000).toFixed(2).replace(".", ",")} {t("megabyte")}</>
                            )}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default LoadingImageDialog;
