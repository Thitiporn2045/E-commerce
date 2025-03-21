import { test, expect } from '@playwright/test';
import { DisplayProductPage } from '../pages/display-products-page';
import { CartPage } from '../pages/display-cart-page';

test.beforeEach(async ({ page }) => {
    const displayProductPage = new DisplayProductPage(page);
    await displayProductPage.gotoDisplayProduct();

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
    test('check 16 items', async ({ page }) => {
        const items = await page.locator('text=/฿Quantity−\+Add|฿Quantity−\+Add to Cart|฿/').count();
        expect(items).toBe(16);
    });

    test('user ต้องการเพิ่มสินค้าชื่อ กระป๋องเก็บความเย็น จำนวน 3 ชิ้น', async ({ page }) => {
        const addProductPage = new DisplayProductPage(page);
        const cartPage = new CartPage(page);

        await addProductPage.addProduct();
        await addProductPage.displayCanColdSuccess();
        await addProductPage.gotoDisplayCart();
        await cartPage.checkQuantity();
    });
    
    test('user ต้องการเพิ่มสินค้าชื่อ กระป๋องเก็บความเย็น จำนวน 3 ชิ้น และเพิ่มสินค้าชื่อ เสื้อโปโล จำนวน 1 ชิ้น', async ({ page }) => {
        const addProductPage = new DisplayProductPage(page);
        const cartPage = new CartPage(page);

        await addProductPage.addProduct();
        await addProductPage.displayCanColdSuccess();
        await addProductPage.addPoloToCart();
        await addProductPage.gotoDisplayCart();
        await cartPage.checkQuantity();
        await cartPage.checkQuantityPolo();
        
    });


})


