import { test, expect } from "@playwright/test";
import { editVoice, getAnimationURL, muteAudio, openMemePage, switchSound } from "./testsutils";

muteAudio();

test.beforeEach(async ({ page }) => {
    await openMemePage(page, "ah");
});

test("changing sound should work", async ({ page }) => {
    const soundboxAnimation = page.locator("#soundboxAnimation");

    await soundboxAnimation.waitFor({ state: "visible", timeout: 2000 });

    const previousURL = await getAnimationURL(page);

    await switchSound(page, 1);

    expect(await getAnimationURL(page)).not.toBe(previousURL);
});

test("changing sound when editing should work", async ({ page }) => {
    const soundboxAnimation = page.locator("#soundboxAnimation");

    await soundboxAnimation.waitFor({ state: "visible", timeout: 2000 });

    await editVoice(page);

    await switchSound(page, 1);

    const loadingPopup = page.locator("#loadingAudioProcessing");

    expect(loadingPopup).toHaveCount(1);
});
