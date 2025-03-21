import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/'); // ตรวจสอบให้แน่ใจว่า URL ถูกต้อง
    await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
    });
    await page.reload();
    await page.evaluate(() => {
        fetch('/clear-cart', { method: 'POST' });
    });
});

test.describe("User add product to cart success", () => {
    test('user ต้องการเพิ่มสินค้าชื่อ กระป๋องเก็บความเย็น จำนวน 3 ชิ้น', async ({ page }) => {
        await page.locator('button:nth-child(3)').first().click();
        await page.locator('button:nth-child(3)').first().click();
        await page.locator('.w-full').first().click();
        await expect(page.getByText('Added กระป๋องเก็บความเย็น to')).toBeVisible();
        await page.getByRole('link', { name: 'Cart' }).click();
        await expect(page.getByRole('heading', { name: 'Your Collection' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'กระป๋องเก็บความเย็น' })).toBeVisible();
        await expect(page.getByRole('cell', { name: '− 3 +' }).getByRole('spinbutton')).toBeVisible();
    });
    
    test('user ต้องการเพิ่มสินค้าชื่อ กระป๋องเก็บความเย็น จำนวน 3 ชิ้น และเพิ่มสินค้าชื่อ เสื้อโปโล จำนวน 1 ชิ้น', async ({ page }) => {
        await page.locator('button:nth-child(3)').first().click();
        await page.locator('button:nth-child(3)').first().click();
        await page.locator('.w-full').first().click();
        await expect(page.getByText('Added กระป๋องเก็บความเย็น to')).toBeVisible();
        await page.locator('div:nth-child(2) > .p-6 > .mt-6 > .w-full').click();
        await expect(page.getByText('Added เสื้อโปโล to your')).toBeVisible();
        await page.getByRole('link', { name: 'Cart' }).click();
        await expect(page.getByRole('heading', { name: 'Your Collection' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'กระป๋องเก็บความเย็น' })).toBeVisible();
        await expect(page.getByRole('cell', { name: '− 3 +' }).getByRole('spinbutton')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'เสื้อโปโล' })).toBeVisible();
        await expect(page.getByRole('cell', { name: '− 1 +' }).getByRole('spinbutton')).toBeVisible();
    });


})


