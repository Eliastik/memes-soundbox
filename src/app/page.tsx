"use client";

import MainComponent from "./components/MainComponent";
import Constants from "./model/Constants";

const Home = () => {
    return <MainComponent memeName={Constants.DEFAULT_MEME_NAME}></MainComponent>;
};

export default Home;
