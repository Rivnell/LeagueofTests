import { test, expect, Page} from '@playwright/test';

const baseUrl = 'https://ecommerce-playground.lambdatest.io';
const testData = {
emailAddress: 'teemoscout1@abc.com',
password: 'G7k@z!pQ',
wrongEmail: 'wronguser1@abc.com',
blockedUser: 'LuxCrownguard1@abc.com',
wrongPassword: (i: number) => `wrongpassword${i}`,};

function getLoginElements(page: Page) {
  return {
    emailField: page.locator('#input-email'),
    passwordField: page.locator('#input-password'),
    submitButton: page.locator('button[type="submit"]'),};}

  test('Test 1: Login Positive - email', async ({ page }) => {
  console.log('Running Login Positive - email test');
  await page.goto(baseUrl);
  const { emailField, passwordField, submitButton} = getLoginElements(page);
  await emailField.fill(testData.emailAddress);
  await passwordField.fill(testData.password);
  await submitButton.click();
  await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=account/account');});

  test('Test 2: Login Negative - wrong email', async ({ page }) => {
  console.log('Running Login Negative - wrong email test');
  await page.goto(baseUrl);
  const { emailField, passwordField, submitButton} = getLoginElements(page);
  await emailField.fill(testData.wrongEmail);
  await passwordField.fill(testData.password);
  await submitButton.click();
  await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');
  await expect(page.getByText('No match for E-Mail Address and/or Password.', { exact: false })).toBeVisible();});

  test('Test 3: Login Negative - 5 x wrong password', async ({ page }) => {
  console.log('Running Login Negative - 5 x wrong password test');
  await page.goto(baseUrl);
  const { emailField, passwordField, submitButton} = getLoginElements(page);
  for (let i = 1; i <= 5; i++) {
  await emailField.fill(testData.blockedUser);
  await passwordField.fill(testData.wrongPassword(i));
  await submitButton.click();
  if (i<5){
  await expect(page.getByText('No match for E-Mail Address and/or Password.', { exact: false })).toBeVisible()
  console.log(`Login attempt #${i} failed`);}
  else {
  await expect(page.getByText('Your account has exceeded allowed number of login attempts.', { exact: false })).toBeVisible();
  console.log(`Login attempt #${i} failed - account temporarily blocked`);}}});
