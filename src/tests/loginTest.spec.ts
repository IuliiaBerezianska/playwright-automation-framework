import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import { log } from 'console';

test('Test login', async ({page}) =>{
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.enterUserName('julia.berezyanska@gmail.com');
    await loginPage.enterPassword('02091981Salesforce');

    const homePage = await loginPage.clickEnterBtn();
    await homePage.expectServiceTitleToBeVisible();
})