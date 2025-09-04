import { test, expect } from '@playwright/test';
const {POManager} = require('../pageobjects/POManager');

test("E2E - Placing an order as registered user", async ({ page }) => {
const poManager = new POManager(page);
const homePage = poManager.getHomePage();
const loginPage = poManager.getLoginPage();
const checkout = poManager.getCheckoutPage();
//const utils = poManager.getUtils();
const testData = poManager.cfgE2E;

console.log('Running E2E test - Placing an order as registered user');

await homePage.openLoginPage();
await loginPage.loginToApp(
    testData.email,
    testData.password);
console.log('Login successful');
await homePage.goToHomeTab();
await homePage.goToBestSeller();
const slider = page.locator('#mz-product-listing-39218404');
const product = slider.getByRole('img', { name: 'HP LP3065' }).first();
await expect(product).toBeVisible();
await product.click();
console.log('Product from Best Seller category is selected');
await expect(page.locator('#entry_216816 h1.h3')).toHaveText('HP LP3065');
await page.getByRole('button', { name: 'Add to Cart' }).click();
await page.getByRole('link', { name: 'View Cart' }).click();
await page.getByRole('link', { name: 'Checkout' }).click();
//await checkout.fillBillingAddress(
//     testData.firstName,
//     testData.lastName,
//     testData.address1,  
//     testData.city,  
//     testData.postcode,  
//     testData.country,
//     testData.region,);
// console.log('Billing address filled');
await checkout.confirmAddress();
await page.pause();
await checkout.checkTerms();  
await checkout.clickContinue();
await checkout.clickConfirm();
await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=checkout/success');
console.log('Order placed successfully');
});