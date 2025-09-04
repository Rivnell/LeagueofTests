import {test, expect} from '@playwright/test';
class Checkout {  
  constructor(page) {
    this.page = page;
   // this.utils = new Utils();
    this.checkoutUrl = 'https://ecommerce-playground.lambdatest.io/index.php?route=checkout/checkout';
    this.firstNameField = page.locator('#input-payment-firstname');
    this.lastNameField = page.locator('#input-payment-lastname');
    this.address1Field= page.locator('#input-payment-address-1');
    this.cityField = page.locator('#input-payment-city');
    this.postcodeField = page.locator('#input-payment-postcode');
    this.countryDropdown = page.locator('#input-payment-country');
    this.regionDropdown = page.locator('#input-payment-zone');
    this.continueButton = page.locator('#button-save');
    this.confirmButton = page.locator('#button-confirm');
    this.sameAddress = page.getByRole('checkbox', { name: /My delivery and billing/i });
    this.termsConditions = page.locator('label[for="input-agree"]');
  }

async fillBillingAddress(firstName, lastName, address1, city, postcode, country, region) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.address1Field.fill(address1);
    await this.cityField.fill(city);
    await this.postcodeField.fill(postcode);
    await this.countryDropdown.selectOption({label: country});
    await this.regionDropdown.selectOption({label: region});
    }
async confirmAddress(){
    await this.sameAddress.check();}

async checkTerms(){
  await this.termsConditions.check();
  await expect(this.termsConditions).toBeChecked();
   }

async clickContinue(){
    await this.continueButton.click();
}

async clickConfirm(){
    await this.confirmButton.click();   
} }
module.exports = {Checkout};
