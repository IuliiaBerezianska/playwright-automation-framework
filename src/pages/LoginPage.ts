import { Page } from '@playwright/test';
import HomePage from './HomePage'
import logger from '../utils/LoggerUtil';

export default class LoginPage {
    readonly page: Page;
    readonly userNameInput: string;
    readonly passwordInput: string;
    readonly loginBtn: string;

    constructor(page: Page) {
        this.page = page;
        this.userNameInput = '#username';
        this.passwordInput = '#password';
        this.loginBtn = '#Login';
    }

    async navigateToLoginPage(){
        await this.page.goto('/');
    }   
    
    async enterUserName(username: string){
    await this.page.fill(this.userNameInput, username);
    logger.info('Filled username');
    }
    
    async enterPassword(password: string){
    await this.page.fill(this.passwordInput, password)
    logger.info('Filled password');
    }
    
    async clickEnterBtn(){
    await this.page.click(this.loginBtn).catch((error) => {
        logger.error(`Error clicking login button: ${error}`);
        throw error;//rethrow the error if needed
    }).then(()=> 
         // Log a message indicating that the login button was clicked successfully
        logger.info("Clicked login button"));

    const homePage = new HomePage(this.page);
    return homePage;
    }
}