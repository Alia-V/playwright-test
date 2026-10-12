import { Page } from '@playwright/test';
import { CheckoutLocators } from '../locators/checkout.locators';

export class CheckoutPage {
  readonly page: Page;
  readonly locators: CheckoutLocators;

  constructor(page: Page) {
    this.page = page;
    this.locators = new CheckoutLocators(page);
  }

  async fillInfo(firstName: string, lastName: string, postalCode: string) {
    await this.locators.firstName.fill(firstName);
    await this.locators.lastName.fill(lastName);
    await this.locators.postalCode.fill(postalCode);
    await this.locators.continueButton.click();
  }

  async finish() {
    await this.locators.finishButton.click();
  }

  async downloadPdf() {
    const downloadPromise = this.page.waitForEvent('download');
    await this.locators.generatePdfButton.click();
    return downloadPromise;
  }
}
