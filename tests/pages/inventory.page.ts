import { Page } from '@playwright/test';
import { InventoryLocators } from '../locators/inventory.locators';

export class InventoryPage {
  readonly page: Page;
  readonly locators: InventoryLocators;

  constructor(page: Page) {
    this.page = page;
    this.locators = new InventoryLocators(page);
  }

  async addToCart(slug: string) {
    await this.locators.addToCartButton(slug).click();
  }

  async openCart() {
    await this.locators.cartLink.click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.locators.sortSelect.selectOption(option);
  }

  async getPrices(): Promise<number[]> {
    const texts = await this.locators.itemPrices.allTextContents();
    return texts.map((text) => Number(text.replace('$', '')));
  }

  async openAbout() {
    await this.locators.menuButton.click();
    await this.locators.aboutLink.click();
  }
}
