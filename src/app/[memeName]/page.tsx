import { SoundboxLink } from "@/app/model/SoundboxLink";
import MainComponent from "../components/SoundboxMainComponent";
import Constants from "../model/Constants";
import SoundboxConfig from "../model/SoundboxConfig";
import type { Metadata } from "next";

export async function generateStaticParams() {
    const memes: SoundboxLink[] = await fetch(Constants.LINK_LIST_URI).then((res) => res.json());

    return memes.map((meme) => ({
        memeName: meme.code,
    }));
}

async function getConfigForPage(memeName: string) {
    const config: SoundboxConfig = await fetch(Constants.CONFIG_URI.replace(Constants.MEME_NAME_PLACEHOLDER, memeName))
        .then((res) => res.json());

    return config;
}
 
export async function generateMetadata({ params }: { params: { memeName: string, sounboxConfig: SoundboxConfig } }): Promise<Metadata> {
    const { memeName } = params;
    const sounboxConfig = await getConfigForPage(memeName);

    const config: Metadata = {
        title: sounboxConfig.windowTitle[Constants.DEFAULT_LANGUAGE],
        description: sounboxConfig.soundboxDescription && sounboxConfig.soundboxDescription[Constants.DEFAULT_LANGUAGE],
        manifest: Constants.MANIFEST_URI.replace(Constants.MEME_NAME_PLACEHOLDER, memeName)
    };

    if (sounboxConfig.favicon) {
        config.icons = { icon: sounboxConfig.favicon };
    }

    if (sounboxConfig.primaryColor && sounboxConfig.primaryColor.normal) {
        config.themeColor = sounboxConfig.primaryColor.normal.light;
    }

    return config;
};

const MemePage = async ({ params }: { params: { memeName: string, sounboxConfig: SoundboxConfig } }) => {
    const { memeName } = params;
    const sounboxConfig = await getConfigForPage(memeName);

    return <MainComponent memeName={memeName} sounboxConfig={sounboxConfig}></MainComponent>;
};

export default MemePage;
