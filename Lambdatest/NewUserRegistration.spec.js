import { test, expect } from '@playwright/test';
const baseUrl = 'https://ecommerce-playground.lambdatest.io';
const testData = {
    firstName: 'Teemo',
    lastName: 'Yordle',
    email: 'teemoscout6@abc.com',
    telephone: '1234567890',
    password: 'TL$3mTf8*',};

    function registerAccount(page) {
        return {
            firstNameField: page.locator('#input-firstname'),
            lastNameField: page.locator('#input-lastname'),
            emailField: page.locator('#input-email'),
            telephoneField: page.locator('#input-telephone'),
            passwordField: page.locator('#input-password'),
            confirmPasswordField: page.locator('#input-confirm'),
            agreeCheckbox: page.locator('label[for="input-agree"]'),
            continueButton: page.locator('input[type="submit"][value="Continue"]'),
            myAccount: page.locator('a.nav-link.dropdown-toggle:has-text("My account")'),
            registerLink: page.locator('a.dropdown-item:has-text("Register")'),
        };
    }
test.only('New user registration test', async ({ page }) => {
  console.log('Running new user registration test');
  await page.goto(baseUrl);
  await registerAccount(page).myAccount.hover();
  await registerAccount(page).registerLink.click();
  await expect(page).toHaveURL(
    'https://ecommerce-playground.lambdatest.io/index.php?route=account/register'
  );
  await registerAccount(page).firstNameField.fill(testData.firstName);
  await registerAccount(page).lastNameField.fill(testData.lastName);
  await registerAccount(page).emailField.fill(testData.email);
  await registerAccount(page).telephoneField.fill(testData.telephone);
  await registerAccount(page).passwordField.fill(testData.password);
  await registerAccount(page).confirmPasswordField.fill(testData.password);
  await registerAccount(page).agreeCheckbox.check();
  await registerAccount(page).continueButton.click();
  await expect(page).toHaveURL(
    'https://ecommerce-playground.lambdatest.io/index.php?route=account/success'
  );
  await expect(page.locator('#content h1.page-title')).toContainText('Account Has Been Created');  
  await page.getByRole('link', { name: 'Continue' }).click();
  await expect(page).toHaveURL(
    'https://ecommerce-playground.lambdatest.io/index.php?route=account/account');

});
