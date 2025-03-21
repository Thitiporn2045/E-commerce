import { test, expect } from '@playwright/test';
import { DisplayProductPage } from '../pages/display-products-page';
import { CartPage } from '../pages/display-cart-page';

const BASE_URL = 'http://localhost:3000'

const toastMsg = (prodcutName: string): string =>
  `Added ${prodcutName} to`

const canColdProductName = 'กระป๋องเก็บความเย็น'
const poloProductName = 'เสื้อโปโล'

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


test('TC04', async ({ page }) => {
    await page.locator('button:nth-child(3)').first().click();
    await page.locator('button:nth-child(3)').first().click();
    await page.locator('.w-full').first().click();
    await expect(page.getByText('Added กระป๋องเก็บความเย็น to')).toBeVisible();
    await page.locator('div:nth-child(2) > .p-6 > .mt-6 > .w-full').click();
    await expect(page.getByText('Added เสื้อโปโล to your')).toBeVisible();
    await page.getByRole('link', { name: 'Cart' }).click();
    await page.getByRole('heading', { name: 'Your Collection' }).click();
});

test.describe(`Add ${canColdProductName} and ${poloProductName} to cart success`, () => {
  test(`Add ${canColdProductName} 99 to cart and ${poloProductName} 50`, async ({ page }) => {
    await page.goto(BASE_URL)
    await page.locator('#quantity-1').click()
    await page.locator('#quantity-1').fill('99')
    await expect(page.locator('#quantity-1')).toHaveValue('99')
    await page.locator('.w-full').first().click() // click add to cart

    await expect(page.getByText(toastMsg(canColdProductName))).toBeVisible()

    const n = 50
    for (let i = 0; i < n - 1; i++) {
      await page
        .locator(
          'div:nth-child(2) > .p-6 > .mt-6 > div > div > button:nth-child(3)'
        )
        .click()
    }
    await expect(page.locator('#quantity-2')).toHaveValue(`${n}`)
    await page.locator('div:nth-child(2) > .p-6 > .mt-6 > .w-full').click() // click add to cart
    await expect(page.getByText(toastMsg(poloProductName))).toBeVisible()

    await page.getByRole('link', { name: 'Cart' }).click()
    await expect(
      page.getByRole('heading', { name: 'Your Collection' })
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: canColdProductName })
    ).toBeVisible()
    await expect(
      page.getByRole('cell', { name: '− 99 +' }).getByRole('spinbutton')
    ).toBeVisible()

    await expect(
      page.getByRole('heading', { name: poloProductName })
    ).toBeVisible()
    await expect(
      page.getByRole('cell', { name: `− ${n} +` }).getByRole('spinbutton')
    ).toBeVisible()
    
  })
})

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
