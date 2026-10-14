import { test, expect } from '@playwright/test';

test('Ordering a phone', async ({ page }) => {



  //1.  Go to Flipkart Website  
  await page.goto('https://www.flipkart.com/');



  //2. If a pop appears saying, 'Sigin or Signup please' then we will handle that pop up and close it
  const closeButton = page.getByText('✕', { exact: true });
  if (await closeButton.isVisible().catch(() => false)) {
    await closeButton.click();
  }



  //3. Now we will select the search bar and type the name of our item to search and hit enter
  const searchBox = page.getByRole('textbox', {name: 'Search for Products, Brands'});
  await searchBox.fill('Oppo Phone');
  await searchBox.press('Enter');



  //4. After hitting the enter a new tab or page will open and we will handle that page 
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'OPPO K14x 5G (Prism Violet, 64 GB) Add to Compare OPPO K14x 5G (Prism Violet,' }).click();
  const page1 = await page1Promise;



  //5. 
  await page1.waitForLoadState('networkidle').catch(() => {});
  const cartBtn = page1.locator('._1psv1zeb9._1psv1ze0._7dzyg20._1psv1ze9l > div').first();
 
  await expect(async () => {
    await cartBtn.click();
    await expect
      .poll(async () =>
        page1.url().includes('viewcart') ||
        (await page1.getByText(/go to cart|added to cart/i).count()) > 0,
      { timeout: 3000 })
      .toBe(true);
  }).toPass({ timeout: 20_000 });



  //6. Now we will see what product we have added in our cart
  await page1.getByRole('link', { name: 'Cart' }).click();


  //7. We will just wait to see if either we have added or product or not since playwright will execute everything very fast
  await page.waitForTimeout(3000);
  
});