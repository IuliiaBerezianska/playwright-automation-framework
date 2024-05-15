import { Page } from '@playwright/test';
import HomePage from './HomePage'
import logger from '../utils/LoggerUtil';

export default class LoginPage {
    private readonly userNameInput = '#username';
    private readonly password = '#password';
    private readonly loginBtn = '#Login';

    constructor(private page: Page) {
    }

    async navigateToLoginPage(){
        await this.page.goto('/');
        const url = this.page.url();
        console.log(url);
        await this.page.waitForLoadState();
    }   
    
    async enterUserName(username: string){
    await this.page.fill(this.userNameInput, username);
    logger.info('Filled username');
    }
    
    async enterPassword(password: string){
    await this.page.fill(this.password, password)
    logger.info('Filled password');
    }
    
    async clickEnterBtn(){
    await this.page.click(this.loginBtn).catch((error) => {
        logger.error(`Error clicking login button: ${error}`);
        throw error;//rethrow the error if needed
    }).then(()=> 
         // Log a message indicating that the login button was clicked successfully
        logger.info("Clicked login button"));
    await this.page.waitForLoadState();
    const homePage = new HomePage(this.page);
    return homePage;
    }

    async quickLogin(username: string, password: string){
        await this.navigateToLoginPage();
        await this.enterUserName(username);
        await this.enterPassword(password);
        await this.clickEnterBtn();
        const homePage = new HomePage(this.page);
        return homePage;
    }
}