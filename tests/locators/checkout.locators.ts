import { Page, Locator } from '@playwright/test';

export class CheckoutLocators {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly cartItems: Locator;
  readonly subtotal: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;
  readonly generatePdfButton: Locator;

  constructor(page: Page) {
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.subtotal = page.locator('[data-test="subtotal-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.generatePdfButton = page.locator('[data-test="generate-pdf-order"]');
  }
}
