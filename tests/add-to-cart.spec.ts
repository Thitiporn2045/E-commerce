import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:3000/xkntjozjqfl/confirm-order');
    // await page.locator('.w-full').first().click();
    await page.getByRole('link', { name: 'Cart' }).click();
    await page.getByRole('heading', { name: 'Your Collection' }).click();
});
