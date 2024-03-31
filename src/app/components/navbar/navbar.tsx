/* eslint-disable @next/next/no-img-element */
import { DaisyUIModal } from "@eliastik/simple-sound-studio-components";
import AppConfigDialog from "../dialogs/AppConfigDialog";
import AppInfoDialog from "../dialogs/AppInfoDialog";
import { useApplicationConfig } from "@/app/context/ApplicationConfigContext";
import Constants from "@/app/model/Constants";
import { useSoundbox } from "@/app/context/SoundboxContext";
import SoundboxConfig from "@/app/model/SoundboxConfig";

const Navbar = ({
    config
}: { config?: SoundboxConfig }) => {
    const { updateData, currentLanguageValue } = useApplicationConfig();
    const { soundboxLinks, soundboxConfig } = useSoundbox();

    return (
        <>
            <div className="navbar bg-primary text-white fixed z-40">
                <div className="flex-1">
                    <details className="dropdown max-h-12">
                        <summary className="btn btn-ghost normal-case sm:text-xl text-base text-left overflow-hidden md:pl-2 md:pr-2 pl-1 pr-1 border-none">
                            <div className="flex flex-row justify-center max-h-12">
                                {config && config.icon && <img src={config.icon} alt="App icon" className="w-11 h-11" />}
                                <div className="flex flex-col h-full justify-center ml-2">
                                    <span className="inline-block">{(config && config.appTitle[currentLanguageValue]) || (soundboxConfig && soundboxConfig.appTitle[currentLanguageValue]) || Constants.APP_NAME}</span>
                                    <span className="font-light text-xs inline-block">{Constants.APP_BY}</span>
                                </div>
                                <span className="font-light text-xs flex justify-center items-center ml-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </span>
                            </div>
                        </summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                            {soundboxLinks.map(soundbox => <li key={soundbox.url}><a href={soundbox.url}>{soundbox.labels[currentLanguageValue] || soundbox.labels["en"]}</a></li>)}
                        </ul>
                    </details>
                </div>
                <div className="flex-none">
                    <button className="btn btn-square btn-ghost" onClick={() => (document.getElementById("modalSettings")! as DaisyUIModal).showModal()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                    <button className="btn btn-square btn-ghost" onClick={() => (document.getElementById("modalInfos")! as DaisyUIModal).showModal()}>
                        <div className="indicator">
                            {updateData && updateData.hasUpdate && <span className="indicator-item badge badge-error badge-xs"></span>}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
            <AppConfigDialog></AppConfigDialog>
            <AppInfoDialog></AppInfoDialog>
        </>
    );
};

export default Navbar;
