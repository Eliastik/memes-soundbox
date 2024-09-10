const Constants = {
    APP_NAME: "Memes Soundbox",
    APP_BY: "By Eliastik's Softs",
    DEFAULT_LANGUAGE: "fr",
    APP_VERSION: "1.1.2",
    APP_VERSION_DATE: "9/10/2024",
    CONFIG_URI: process.env.NEXT_PUBLIC_CONFIG_URI || "https://www.eliastiksofts.com/memes/config/{memeName}.json",
    MANIFEST_URI: process.env.NEXT_PUBLIC_MANIFEST_URI || "https://www.eliastiksofts.com/memes/manifest/{memeName}.json",
    UPDATER_URI: process.env.NEXT_PUBLIC_UPDATER_URI || "https://www.eliastiksofts.com/memes/config/update.json",
    LINK_LIST_URI: process.env.NEXT_PUBLIC_LINK_LIST_URI || "https://www.eliastiksofts.com/memes/config/list.json",
    OFFICIAL_WEBSITE: "https://www.eliastiksofts.com/memes/",
    OFFICIAL_SIMPLE_VOICE_CHANGER_WEBSITE: "https://www.eliastiksofts.com/simple-voice-changer",
    SOURCE_CODE: "https://github.com/Eliastik/memes-soundbox",
    APP_LICENSE: "GNU GPL v3",
    RELEASE_LINK: "https://github.com/Eliastik/memes-soundbox/releases/tag/1.1.2",
    AUDIO_BUFFERS_TO_FETCH: ["impulse_response.wav","modulator.mp3"],
    SERVICE_WORKER_SCOPE: process.env.NEXT_PUBLIC_BASE_PATH || "",
    PREFERENCES_KEYS: {
        CURRENT_THEME: "current-theme",
        CURRENT_LANGUAGE: "current-language",
        ALREADY_USED: "already-used",
        PREFIX: "memes-soundbox-"
    },
    THEMES: {
        AUTO: "auto",
        DARK: "dark",
        LIGHT: "light"
    },
    MEME_NAME_PLACEHOLDER: "{memeName}",
    DEFAULT_MEME_NAME: "ah",
    DEFAULT_THEME: {
        PRIMARY_COLOR: {
            LIGHT: "#61A6FA",
            DARK: "#3884FF"
        }
    }
};

export default Constants;
