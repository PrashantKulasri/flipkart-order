import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly closeButton: Locator;
  readonly searchBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.closeButton = page.getByText('✕', { exact: true });
    this.searchBox = page.getByRole('textbox', { name: 'Search for Products, Brands' });
  }

  async goto() {
    await this.page.goto('https://www.flipkart.com/');
  }

  async closeLoginPopupIfVisible() {
    if (await this.closeButton.isVisible().catch(() => false)) {
      await this.closeButton.click();
    }
  }

  async searchForProduct(productName: string) {
    await this.searchBox.fill(productName);
    await this.searchBox.press('Enter');
  }
}