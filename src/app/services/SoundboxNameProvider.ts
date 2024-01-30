import SoundboxNameProviderInterface from "../interfaces/SoundboxNameProviderInterface";

export default class SoundboxNameProvider implements SoundboxNameProviderInterface {

    private soundboxName: string = "";

    constructor(soundboxName: string) {
        this.soundboxName = soundboxName;
    }

    getSoundboxName(): string {
        return this.soundboxName;
    }
}
