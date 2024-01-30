import { SoundboxLink } from "@/app/model/SoundboxLink";
import MainComponent from "../components/MainComponent";
import Constants from "../model/Constants";

export async function generateStaticParams() {
    const memes: SoundboxLink[] = await fetch(Constants.LINK_LIST_URI).then((res) => res.json());
   
    return memes.map((meme) => ({
        memeName: meme.code,
    }));
}

const MemePage = ({ params }: { params: { memeName: string } }) => {
    const { memeName } = params;

    return <MainComponent memeName={memeName}></MainComponent>;
};

export default MemePage;
