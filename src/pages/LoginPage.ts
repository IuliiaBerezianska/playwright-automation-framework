import { Page } from '@playwright/test';
import HomePage from './HomePage'

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
    }
    
    async enterPassword(password: string){
    await this.page.fill(this.passwordInput, password)
    }
    
    async clickEnterBtn(){
    await this.page.click(this.loginBtn).catch((error) => {
        console.error(`Error clicking login button: ${error}`);
        throw error;
    });

    const homePage = new HomePage(this.page);
    return homePage;
    }
}