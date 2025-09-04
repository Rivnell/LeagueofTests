const {HomePage} = require('./HomePage');
const {LoginPage} = require('./LoginPage');
const {Checkout} = require('./Checkout');
const {Utils}= require('./Utils');
const {cfgE2E} = require('./E2Econfigs/cfgE2E');

class POManager {
constructor(page) {
this.page = page;
this.homePage = new HomePage(page);
this.loginPage = new LoginPage(page);
this.checkout = new Checkout(page);
this.utils = new Utils(page); 
this.cfgE2E = new cfgE2E();
}

getHomePage() {return this.homePage;}
getLoginPage() {return this.loginPage;}
getUtils() {return this.utils;}
getCheckoutPage() {return this.checkout;}
   
}
module.exports = {POManager};
