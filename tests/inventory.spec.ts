import { test, expect } from '@playwright/test';
import { InventoryPage } from './pages/inventory.page';
import { CartPage } from './pages/cart.page';

test.describe('Inventory', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await page.goto('/inventory.html');
  });

  test('sort by price low to high', async () => {
    await inventoryPage.sortBy('lohi');

    const prices = await inventoryPage.getPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('remove product from cart', async ({ page }) => {
    await inventoryPage.addToCart('sauce-labs-bike-light');
    await inventoryPage.openCart();
    await expect(cartPage.locators.cartItems).toHaveCount(1);

    await cartPage.remove('sauce-labs-bike-light');
    await expect(cartPage.locators.cartItems).toHaveCount(0);
    await expect(inventoryPage.locators.cartBadge).toBeHidden();

    await cartPage.continueShopping();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('open About page', async ({ page }) => {
    await inventoryPage.openAbout();

    await expect(page).toHaveURL(/saucelabs\.com/);
  });
});
