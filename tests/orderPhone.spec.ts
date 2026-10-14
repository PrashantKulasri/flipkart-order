import { test } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { ProductPage } from '../pages/productPage';

test('Ordering a phone', async ({ page }) => {
  const homePage = new HomePage(page);

  // 1. Go to Flipkart and handle initial popup
  await homePage.goto();
  await homePage.closeLoginPopupIfVisible();

  // 2. Search for the product
  await homePage.searchForProduct('Oppo Phone');

  // 3. Click the product and handle the new tab popup
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'OPPO K14x 5G (Prism Violet, 64 GB) Add to Compare OPPO K14x 5G (Prism Violet,' }).click();
  const page1 = await page1Promise;

  // 4. Interact with the new product page using its Page Object
  const productPage = new ProductPage(page1);
  await productPage.addProductToCart();
  await productPage.goToCart();

  // 5. Short wait to verify the cart
  await page.waitForTimeout(3000);
});