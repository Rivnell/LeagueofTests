import {test, expect} from '@playwright/test';
const {Utils} = require('./Utils'); 
class HomePage {  
  constructor(page) {
    this.page = page;
   // this.utils = new Utils();
    this.baseUrl = 'https://ecommerce-playground.lambdatest.io/';
    this.myAccount = page.locator('a.nav-link.dropdown-toggle:has-text("My account")');
    this.loginLink = page.locator('a.dropdown-item:has-text("Login")');
    this.registerLink = page.locator('a.dropdown-item:has-text("Register")');
    this.cartLink = page.locator('a.cart');
    this.homeTab =  page.getByRole('link', { name: /^Home$/ });
    this.bestSeller = page.locator('a:has-text("Best seller")');
  }
async openLoginPage(){
    await this.page.goto(this.baseUrl);
    await this.myAccount.hover();
    await this.loginLink.click();
}
async goToBestSeller(){
    await this.bestSeller.click();
     }
 async goToCart(){
  await this.cartLink.click();
   }

async goToHomeTab() {
  await this.homeTab.click();
   }
}

module.exports = {HomePage};
