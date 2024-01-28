import { useSoundbox } from "@/app/context/SoundboxContext";
import { useTranslation } from "react-i18next";

const SoundboxChoice = () => {
    const { allSounds, setSoundByName, currentSound } = useSoundbox();
    const { t } = useTranslation();

    return (
        <>
            {currentSound && allSounds.length > 0 && (
                <div className="flex flex-row justify-center items-center w-full">
                    <label htmlFor="selectSound" className="flex flex-row justify-center items-center mr-4 text-xs md:text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
                        </svg>
                        <span className="font-semibold ml-2 select-none">{t("soundbox.sound")}</span>
                    </label>
                    <select
                        className="select select-bordered sm:w-96 w-64 h-10 min-h-10 md:h-12 md:min-h-12 text-xs md:text-sm"
                        onChange={e => setSoundByName(e.target.value)}
                        value={currentSound.name}
                        id="selectSound"
                    >
                        {allSounds.map(sound => <option value={sound.name} key={sound.name}>{sound.name}</option>)}
                    </select>
                </div>
            )}
        </>
    );
};

export default SoundboxChoice;
