import { test, expect, Page} from '@playwright/test';

const baseUrl = 'https://ecommerce-playground.lambdatest.io';
const testData = {
emailAddress: 'teemoscout1@abc.com',
password: 'G7k@z!pQ',
wrongEmail: 'test123@abc.com',
blockedUser: 'LuxCrownguard1@abc.com',
wrongPassword: (i: number) => `wrongpassword${i}`,};

function getLoginElements(page: Page) {
  return {
    emailField: page.locator('#input-email'),
    passwordField: page.locator('#input-password'),
    loginButton: page.locator('input[type="submit"][value="Login"]'),
    myAccount: page.locator('a.nav-link.dropdown-toggle:has-text("My account")'),
    loginLink: page.locator('a.dropdown-item:has-text("Login")')};}

  test('Test 1: Login Positive - email', async ({ page }) => {
  console.log('Running Login Positive - email test');
  await page.goto(baseUrl);
  const { myAccount} = getLoginElements(page);
  await myAccount.hover();
  const { loginLink} = getLoginElements(page);
  await loginLink.click();
  const { emailField, passwordField, loginButton} = getLoginElements(page);
  await emailField.fill(testData.emailAddress);
  await passwordField.fill(testData.password);
  await loginButton.click();
  await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=account/account');});

  test('Test 2: Login Negative - wrong email', async ({ page }) => {
  console.log('Running Login Negative - wrong email test');
  await page.goto(baseUrl);
  const { myAccount} = getLoginElements(page);
  await myAccount.hover();
  const { loginLink} = getLoginElements(page);
  await loginLink.click();
  const { emailField, passwordField, loginButton} = getLoginElements(page);
  await emailField.fill(testData.wrongEmail);
  await passwordField.fill(testData.password);
  await loginButton.click();
  await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');
  await expect(page.getByText('No match for E-Mail Address and/or Password.', { exact: false })).toBeVisible();});

  test('Test 3: Login Negative - 5 x wrong password', async ({ page }) => {
  console.log('Running Login Negative - 5 x wrong password test');
  await page.goto(baseUrl);
  const { myAccount} = getLoginElements(page);
  await myAccount.hover();
  const { loginLink} = getLoginElements(page);
  await loginLink.click();
  const { emailField, passwordField, loginButton} = getLoginElements(page);
  for (let i = 1; i <= 6; i++) {
  await emailField.fill(testData.blockedUser);
  await passwordField.fill(testData.wrongPassword(i));
  await loginButton.click();
  if (i<6){
  await expect(page.getByText('No match for E-Mail Address and/or Password.', { exact: false })).toBeVisible()
  console.log(`Login attempt #${i} failed`);}
  else {
  await expect(page.getByText('Your account has exceeded allowed number of login attempts.', { exact: false })).toBeVisible();
  console.log(`Login attempt #${i} failed - account temporarily blocked`);}}});
