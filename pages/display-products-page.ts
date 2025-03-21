import { expect, Locator, Page } from "@playwright/test";

export class DisplayProductPage{
    readonly page: Page;
    readonly plusButton: Locator;
    readonly addToCartButton: Locator;
    readonly alertTextCanCold: Locator;
    readonly cartButton: Locator;
    readonly addPolo: Locator;
    readonly alertTextPolo: Locator;

    constructor(page: Page) {
        this.page = page;
        this.plusButton = this.page.locator('button:nth-child(3)');
        this.addToCartButton = this.page.locator('.w-full');
        this.alertTextCanCold = this.page.getByText('Added กระป๋องเก็บความเย็น to');
        this.cartButton = this.page.getByRole('link', { name: 'Cart' });
        this.addPolo = this.page.locator('div:nth-child(2) > .p-6 > .mt-6 > .w-full');
        this.alertTextPolo = this.page.getByText('Added เสื้อโปโล to your');
        // this.tocList = page.locator('article div.markdown ul > li > a');
    }


    async gotoDisplayProduct() {
        await this.page.goto('http://localhost:3000/');
    }

    async addProduct(){
        await this.plusButton.first().click();
        await this.plusButton.first().click();
        await this.addToCartButton.first().click();
    }

    async displayCanColdSuccess() {
        await expect(this.alertTextCanCold).toBeVisible();
    }

    async gotoDisplayCart() {
        await this.cartButton.click();
    }

    async addPoloToCart() {
        await this.addPolo.click();
        await expect(this.alertTextPolo).toBeVisible();
    }
}