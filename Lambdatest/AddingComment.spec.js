import { test, expect } from '@playwright/test';

test('Adding Comment in the newest article', async ({ page }) => {
  await page.goto('https://ecommerce-playground.lambdatest.io/');
  //Clicling first article in the "From the Blog" section
  await page.locator('#entry_218342 .tab-content img').first().click();
  await page.locator('#input-name').fill('Teemo');
  await page.locator('#input-email').fill('Teemo@abc.com');
  await page.locator('#input-comment').fill('This is a test comment for the newest article.');
  await page.locator('#button-comment').click();
  //Validation of the comment submission
  await expect(page.locator('.alert.alert-success')).toContainText('Thank you for your comment');
});
