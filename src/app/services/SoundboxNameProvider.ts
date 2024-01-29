import SoundboxNameProviderInterface from "../interfaces/SoundboxNameProviderInterface";

export default class SoundboxNameProvider implements SoundboxNameProviderInterface {

    getSoundboxName(): string {
        return "risitas";
    }
}
