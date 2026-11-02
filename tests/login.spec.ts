/*saucedemo.com
автоматизируй 3 кейса
successful login
invalid login
logout
*/

import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';

const USERNAME = process.env.sauce_username!;
const PASSWORD = process.env.sauce_password!;

test.describe('Login', () => {
  test.use({ storageState: { cookies: [], origins: [] } }); // чистый браузер, без сессии

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('successful login', async ({ page }) => {
    await loginPage.login(USERNAME, PASSWORD);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(loginPage.locators.pageTitle).toHaveText('Products');
  });

  test('invalid login', async () => {
    await loginPage.login('user', PASSWORD);

    await expect(loginPage.locators.errorMessage).toHaveText(
      'Epic sadface: Username and password do not match any user in this service',
    );
  });

  test('logout', async ({ page }) => {
    await loginPage.login(USERNAME, PASSWORD);
    await loginPage.logout();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.locators.loginButton).toBeVisible();
  });
});
