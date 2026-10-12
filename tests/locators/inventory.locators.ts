import { Page, Locator } from '@playwright/test';

export class InventoryLocators {
  readonly page: Page;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortSelect: Locator;
  readonly itemPrices: Locator;
  readonly menuButton: Locator;
  readonly aboutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.aboutLink = page.locator('[data-test="about-sidebar-link"]');
  }

  addToCartButton(slug: string): Locator {
    return this.page.locator(`[data-test="add-to-cart-${slug}"]`);
  }
}
