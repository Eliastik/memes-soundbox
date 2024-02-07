"use client";

import { useEffect } from "react";
import { ErrorProcessingAudio, ErrorDownloadingBufferDialog, ErrorLoadingAudioDialog, useAudioEditor } from "@eliastik/simple-sound-studio-components";
import { useSoundbox } from "../context/SoundboxContext";
import LoadingAppDialog from "./dialogs/LoadingAppDialog";
import LoadingAudioFileDialog from "./dialogs/LoadingAudioFileDialog";
import SoundboxMain from "./soundbox/SoundboxMain";
import ErrorLoadingConfigDialog from "./dialogs/ErrorLoadingConfigDialog";
import ErrorLoadingDataDialog from "./dialogs/ErrorLoadingDataDialog";
import LoadingImageDialog from "./dialogs/LoadingImageDialog";
import PWA from "../pwa";
import MainLayout from "./SoundboxLayout";
import SoundboxConfig from "../model/SoundboxConfig";

const SoundboxMainComponent = ({ memeName, sounboxConfig }: { memeName: string, sounboxConfig?: SoundboxConfig }) => {
    const { setup, loadingAudio, loadingImages } = useSoundbox();
    const { downloadingInitialData } = useAudioEditor();

    useEffect(() => {
        setup(memeName);
    }, [setup, memeName]);
    
    return (
        <MainLayout soundboxConfig={sounboxConfig}>
            {!downloadingInitialData && !loadingAudio && !loadingImages && <SoundboxMain></SoundboxMain>}
            <LoadingAppDialog></LoadingAppDialog>
            <LoadingAudioFileDialog></LoadingAudioFileDialog>
            <LoadingImageDialog></LoadingImageDialog>
            <ErrorLoadingAudioDialog></ErrorLoadingAudioDialog>
            {!downloadingInitialData && !loadingAudio && !loadingImages && <ErrorDownloadingBufferDialog></ErrorDownloadingBufferDialog>}
            <ErrorProcessingAudio></ErrorProcessingAudio>
            <ErrorLoadingDataDialog></ErrorLoadingDataDialog>
            <ErrorLoadingConfigDialog></ErrorLoadingConfigDialog>
            <PWA></PWA>
        </MainLayout>
    );
};

export default SoundboxMainComponent;
