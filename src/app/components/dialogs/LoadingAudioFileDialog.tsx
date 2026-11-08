import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSoundbox } from "../../context/SoundboxContext";
import { useAudioEditor } from "@eliastik/simple-sound-studio-components";

const LoadingAudioFileDialog = () => {
    const { t } = useTranslation();
    const loadingPrincipalBuffer = useAudioEditor(state => state.loadingPrincipalBuffer);
    const loadingOneAudio = useSoundbox(state => state.loadingOneAudio);
        
    const loadingBufferModalCheckbox = useMemo(() => {
        if (loadingPrincipalBuffer || loadingOneAudio) {
            return <input type="checkbox" id="loadingBufferModal" className="modal-toggle" defaultChecked={true} />;
        } else {
            return <></>
        }
    }, [loadingPrincipalBuffer, loadingOneAudio]);
    
    return (
        <>
            {loadingBufferModalCheckbox}
            <dialog className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{t("dialogs.loadingAudioFile.title")}</h3>
                    <p className="py-4 flex items-center"><span className="loading loading-spinner loading-lg mr-4 text-primary"></span> {t("dialogs.pleaseWait")}</p>
                </div>
            </dialog>
        </>
    );
};

export default LoadingAudioFileDialog;
