import test, { Page } from "@playwright/test";

export async function openMemePage(page: Page, memeName: string) {
    await page.goto(`http://localhost:3000/${memeName}`);

    const loadingModal = page.locator("#loadingDataModal +div");

    await loadingModal.waitFor({ state: "attached", timeout: 5000 });

    await loadingModal.waitFor({ state: "detached", timeout: 15000 });
}

export async function getAnimationURL(page: Page) {
    return await page.evaluate(async () => {
        const animation = document.getElementById("soundboxAnimation");
        return (animation as HTMLImageElement).src;
    });
}

export async function switchSound(page: Page, index: number) {
    const soundSelect = page.locator("#selectSound");

    await soundSelect.waitFor({ state: "visible", timeout: 2000 });

    soundSelect.selectOption({ index });
    
    const loadingModal = page.locator("#loadingImageDataModal +div");

    await loadingModal.waitFor({ state: "attached", timeout: 5000 });

    await loadingModal.waitFor({ state: "detached", timeout: 30000 });
}

export async function editVoice(page: Page) {
    const editVoiceButton = page.locator("button", { hasText: "Edit voice" });

    editVoiceButton.click();

    const loadingPopup = page.locator("#loadingAudioProcessing");

    await loadingPopup.waitFor({ state: "attached", timeout: 5000 });

    await loadingPopup.waitFor({ state: "detached", timeout: 5000 });
}

export function muteAudio() {
    test.use({
        launchOptions: {
            args: ["--mute-audio"]
        }
    });

    test.use({
        browserName: "firefox",
        launchOptions: {
            firefoxUserPrefs: {
                "media.volume_scale": "0.0"
            }
        }
    });
}
