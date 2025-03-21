import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/'); // ตรวจสอบให้แน่ใจว่า URL ถูกต้อง
    await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
    });
    await page.reload();
});


test('TS02', async ({ page }) => {
    await page.locator('button:nth-child(3)').first().click();
    await page.locator('button:nth-child(3)').first().click();
    await page.locator('.w-full').first().click();
    await expect(page.getByText('Added กระป๋องเก็บความเย็น to')).toBeVisible();
    await page.getByRole('link', { name: 'Cart' }).click();
    await page.getByRole('heading', { name: 'Your Collection' }).click();

});

test('TS04', async ({ page }) => {
    await page.locator('button:nth-child(3)').first().click();
    await page.locator('button:nth-child(3)').first().click();
    await page.locator('.w-full').first().click();
    await expect(page.getByText('Added กระป๋องเก็บความเย็น to')).toBeVisible();
    await page.locator('div:nth-child(2) > .p-6 > .mt-6 > .w-full').click();
    await page.getByRole('link', { name: 'Cart' }).click();
    await expect(page.getByText('Added เสื้อโปโล to your')).toBeVisible();
    await page.getByRole('heading', { name: 'Your Collection' }).click();
});
