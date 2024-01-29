import SoundboxNameProviderInterface from "../interfaces/SoundboxNameProviderInterface";

export default class SoundboxNameProvider implements SoundboxNameProviderInterface {

    getSoundboxName(): string {
        return "macron-part-2";
    }
}
