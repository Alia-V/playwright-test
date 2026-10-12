import { Page } from '@playwright/test';
import { CartLocators } from '../locators/cart.locators';

export class CartPage {
  readonly page: Page;
  readonly locators: CartLocators;

  constructor(page: Page) {
    this.page = page;
    this.locators = new CartLocators(page);
  }

  async checkout() {
    await this.locators.checkoutButton.click();
  }

  async remove(slug: string) {
    await this.locators.removeButton(slug).click();
  }

  async continueShopping() {
    await this.locators.continueShoppingButton.click();
  }
}
