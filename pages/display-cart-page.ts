import { expect, Locator, Page } from "@playwright/test";

export class CartPage{
    readonly page: Page;
    readonly checkCartDisPlay: Locator;
    readonly checkCanColdName: Locator;
    readonly check3Item: Locator;
    readonly checkPoloName: Locator;
    readonly check1Item: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkCartDisPlay = this.page.getByRole('heading', { name: 'Your Collection' });
        this.checkCanColdName = this.page.getByRole('heading', { name: 'กระป๋องเก็บความเย็น' });
        this.check3Item = this.page.getByRole('cell', { name: '− 3 +' }).getByRole('spinbutton');
        this.checkPoloName = this.page.getByRole('heading', { name: 'เสื้อโปโล' });
        this.check1Item = this.page.getByRole('cell', { name: '− 1 +' }).getByRole('spinbutton');
    }


    async checkQuantity() {
        await expect(this.checkCartDisPlay).toBeVisible();
        await expect(this.checkCanColdName).toBeVisible();
        await expect(this.check3Item).toBeVisible();
    }

    async checkQuantityPolo() {
        await expect(this.checkPoloName).toBeVisible();
        await expect(this.check1Item).toBeVisible();
    }
    
    


}