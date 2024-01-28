const Constants = {
    APP_NAME: "Memes Soundbox",
    APP_BY: "By Eliastik's Softs",
    DEFAULT_LANGUAGE: "en",
    APP_VERSION: "1.0.0",
    APP_VERSION_DATE: "12/31/2023",
    CONFIG_URI: process.env.NEXT_PUBLIC_CONFIG_URI || "https://www.eliastiksofts.com/memes/{memeName}/config.json",
    MANIFEST_URI: process.env.NEXT_PUBLIC_MANIFEST_URI || "https://www.eliastiksofts.com/memes/{memeName}/manifest.json",
    UPDATER_URI: process.env.NEXT_PUBLIC_UPDATER_URI || "https://www.eliastiksofts.com/memes/update.json",
    OFFICIAL_WEBSITE: "https://www.eliastiksofts.com/memes/",
    SOURCE_CODE: "https://github.com/Eliastik/memes-soundbox",
    APP_LICENSE: "GNU GPL v3",
    RELEASE_LINK: "https://github.com/Eliastik/memes-soundbox/releases/tag/1.0",
    AUDIO_BUFFERS_TO_FETCH: ["static/sounds/impulse_response.wav","static/sounds/modulator.mp3"],
    SERVICE_WORKER_SCOPE: process.env.NEXT_PUBLIC_BASE_PATH,
    PREFERENCES_KEYS: {
        CURRENT_THEME: "current-theme",
        CURRENT_LANGUAGE: "current-language",
        ALREADY_USED: "already-used",
        PREFIX: "todo-" // TODO
    },
    THEMES: {
        AUTO: "auto",
        DARK: "dark",
        LIGHT: "light"
    },
    MEME_NAME_PLACEHOLDER: "{memeName}"
};

export default Constants;
