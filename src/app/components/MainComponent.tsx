"use client";

import { useEffect } from "react";
import { ErrorProcessingAudio, ErrorDownloadingBufferDialog, ErrorLoadingAudioDialog, useAudioEditor } from "@eliastik/simple-sound-studio-components";
import LoadingAppDialog from "./dialogs/LoadingAppDialog";
import LoadingAudioFileDialog from "./dialogs/LoadingAudioFileDialog";
import SoundboxMain from "./soundbox/SoundboxMain";
import ErrorLoadingConfigDialog from "./dialogs/ErrorLoadingConfigDialog";
import ErrorLoadingDataDialog from "./dialogs/ErrorLoadingDataDialog";
import LoadingImageDialog from "./dialogs/LoadingImageDialog";
import { useSoundbox } from "../context/SoundboxContext";

const MainComponent = ({ memeName }: { memeName: string }) => {
    const { setup, loadingAudio, loadingImages } = useSoundbox();
    const { downloadingInitialData } = useAudioEditor();

    useEffect(() => {
        setup(memeName);
    }, [setup, memeName]);
    
    return (
        <>
            {!downloadingInitialData && !loadingAudio && !loadingImages && <SoundboxMain></SoundboxMain>}
            <LoadingAppDialog></LoadingAppDialog>
            <LoadingAudioFileDialog></LoadingAudioFileDialog>
            <LoadingImageDialog></LoadingImageDialog>
            <ErrorLoadingAudioDialog></ErrorLoadingAudioDialog>
            <ErrorDownloadingBufferDialog></ErrorDownloadingBufferDialog>
            <ErrorProcessingAudio></ErrorProcessingAudio>
            <ErrorLoadingDataDialog></ErrorLoadingDataDialog>
            <ErrorLoadingConfigDialog></ErrorLoadingConfigDialog>
        </>
    );
};

export default MainComponent;
