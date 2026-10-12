import { Page } from '@playwright/test';
import { LoginLocators } from '../locators/login.locators';

export class LoginPage {
  readonly page: Page;
  readonly locators: LoginLocators;

  constructor(page: Page) {
    this.page = page;
    this.locators = new LoginLocators(page);
  }

  async open() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.locators.usernameInput.fill(username);
    await this.locators.passwordInput.fill(password);
    await this.locators.loginButton.click();
  }

  async logout() {
    await this.locators.menuButton.click();
    await this.locators.logoutButton.click();
  }
}
