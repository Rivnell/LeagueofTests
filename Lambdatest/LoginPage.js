import {test, expect} from '@playwright/test';
class LoginPage {  
  constructor(page) {
    this.page = page;
   // this.utils = new Utils();
    this.baseUrl = 'https://ecommerce-playground.lambdatest.io/';
    this.myAccount = page.locator('a.nav-link.dropdown-toggle:has-text("My account")'),
    this.loginLink = page.locator('a.dropdown-item:has-text("Login")'),
    this.registerLink = page.locator('a.dropdown-item:has-text("Register")'),
    this.emailField = page.locator('#input-email');
    this.passwordField = page.locator('#input-password');
    this.loginButton = page.locator('input[type="submit"][value="Login"]');
  }

async loginToApp(email, password) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click();
    }

 async goToCart(){
  await this.cartLink.click();
   }
}

module.exports = {LoginPage};