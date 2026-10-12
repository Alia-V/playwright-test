import { Page, Locator } from '@playwright/test';

export class LoginLocators {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly menuButton: Locator;
  readonly logoutButton: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('[data-test="error"]');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutButton = page.locator('[data-test="logout-sidebar-link"]');
    this.pageTitle = page.locator('[data-test="title"]');
  }
}
