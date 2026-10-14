import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly cartBtn: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBtn = page.locator('._1psv1zeb9._1psv1ze0._7dzyg20._1psv1ze9l > div').first();
    this.cartLink = page.getByRole('link', { name: 'Cart' });
  }

  async addProductToCart() {
    await this.page.waitForLoadState('networkidle').catch(() => {});

    await expect(async () => {
      await this.cartBtn.click();
      await expect
        .poll(async () =>
          this.page.url().includes('viewcart') ||
          (await this.page.getByText(/go to cart|added to cart/i).count()) > 0,
        { timeout: 3000 })
        .toBe(true);
    }).toPass({ timeout: 20_000 });
  }

  async goToCart() {
    await this.cartLink.click();
  }
}