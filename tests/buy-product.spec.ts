import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { InventoryPage } from './pages/inventory.page';
import { CartPage } from './pages/cart.page';
import { CheckoutPage } from './pages/checkout.page';

const USERNAME = process.env.SAUCE_USERNAME!;
const PASSWORD = process.env.SAUCE_PASSWORD!;

test.describe('Buy products', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.open();
    await loginPage.login(USERNAME, PASSWORD);
  });

  test('buy products', async ({ page }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.addToCart('sauce-labs-bike-light');
    await expect(inventoryPage.locators.cartBadge).toHaveText('2');

    await inventoryPage.openCart();
    await expect(cartPage.locators.itemNames).toHaveText([
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
    ]);

    await cartPage.checkout();
    await checkoutPage.fillInfo('test', 'lastname', '1234567');

    await expect(checkoutPage.locators.cartItems).toHaveCount(2);
    await expect(checkoutPage.locators.subtotal).toHaveText('Item total: $39.98');

    await checkoutPage.finish();
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(checkoutPage.locators.completeHeader).toHaveText('Thank you for your order!');
  });

  test('download order PDF', async () => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInfo('test', 'lastname', '1234567');
    await checkoutPage.finish();

    const download = await checkoutPage.downloadPdf();
    expect(download.suggestedFilename()).toMatch(/\.pdf$/);
  });
});
