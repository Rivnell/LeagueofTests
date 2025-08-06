import { test, expect, Page} from '@playwright/test';

const telemediUrl = 'https://testyautomatyczne.telemedi.com/pl';
const testData = {
userName: 'telemedi1@abc.com',
password: 'G7k@z!pQ',
userPESEL: '98010112345',
wrongUserName: 'wrongtelemedi@abc.com',
expectedUserName: 'Teemo Scout',
blockedUser: 'telemedi1@abc.com',
wrongPassword: (i: number) => `wrongpassword${i}`,
};

function getLoginElements(page: Page) {
  return {
    userNameField: page.locator('#username'),
    passwordField: page.locator('#password'),
    submitButton: page.locator('button[type="submit"]'),
    loggedUser: page.locator('p.MuiTypography-body2'),};}

  test('Test 1: Login Positive - email', async ({ page }) => {
  console.log('Running Login Positive - email test');
  await page.goto(telemediUrl);
  const { userNameField, passwordField, submitButton, loggedUser } = getLoginElements(page);
  await userNameField.fill(testData.userName);
  await passwordField.fill(testData.password);
  await submitButton.click();
  await expect(page).toHaveURL(telemediUrl);
  await expect(loggedUser).toHaveText(testData.expectedUserName);});

  test('Test 2: Login Positive - PESEL', async ({ page }) => {
  console.log('Running Login Positive - PESEL test');
  await page.goto(telemediUrl);
  const { userNameField, passwordField, submitButton, loggedUser } = getLoginElements(page);
  await userNameField.fill(testData.userPESEL);
  await passwordField.fill(testData.password);
  await submitButton.click();
  await expect(page).toHaveURL(telemediUrl);
  await expect(loggedUser).toHaveText(testData.expectedUserName);});

  test('Test 3: Login Negative - wrong email', async ({ page }) => {
  console.log('Running Login Negative - wrong email test');
  await page.goto(telemediUrl);
  const { userNameField, passwordField, submitButton} = getLoginElements(page);
  await userNameField.fill(testData.wrongUserName);
  await passwordField.fill(testData.password);
  await submitButton.click();
  await expect(page).toHaveURL('https://testyautomatyczne.telemedi.com/pl/login');
  await expect(page.getByText('Nieprawidłowe dane logowania.', { exact: false })).toBeVisible();});

  test('Test 4: Login Negative - 5 x wrong password', async ({ page }) => {
  console.log('Running Login Negative - 5 x wrong password test');
  await page.goto(telemediUrl);
  const { userNameField, passwordField, submitButton} = getLoginElements(page);
  for (let i = 1; i <= 5; i++) {
  await userNameField.fill(testData.blockedUser);
  await passwordField.fill(testData.wrongPassword(i));
  await submitButton.click();
  if (i<5){
  await expect(page.getByText('Nieprawidłowe dane logowania.', { exact: false })).toBeVisible()
  console.log(`Login attempt #${i} failed`);}
  else {
  await expect(page.getByText('Wystąpiło więcej niż 5 nieudanych prób logowania', { exact: false })).toBeVisible();
  console.log(`Login attempt #${i} failed - account temporarily blocked`);}}});