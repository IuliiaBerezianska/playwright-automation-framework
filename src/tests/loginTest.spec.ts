import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
//import { log } from 'console';
//import { encode } from 'querystring';
import { encrypt, decrypt } from '../utils/CryptojsUtil';
import { encryptEnvFile } from '../utils/EncryptEnvFile';
import logger from '../utils/LoggerUtil';

const authFile = 'src/config/auth.json'

test.skip('Test login', async ({page}) =>{
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    const login = process.env.userId!;
    console.log(login);
    const decreptedLogin = decrypt(process.env.userId!);
    console.log(decreptedLogin);
    //await loginPage.enterUserName('julia.berezyanska@gmail.com');
    //await loginPage.enterPassword('02091981Salesforce');
    await loginPage.enterUserName(decrypt(process.env.userId!));
    await loginPage.enterPassword(decrypt(process.env.password!));
    const homePage = await loginPage.clickEnterBtn();
    await homePage.expectServiceTitleToBeVisible();
    logger.info('Test for login is completed');
    await page.context().storageState({path: authFile});
})

test.skip('Sample env test', async ({page}) => {
    const plainText = 'Hello Iullia!';
    const encryptedText = encrypt(plainText);
    console.log('SALT:', process.env.SALT);
    console.log('Encrypted:', encryptedText);
    const decreptedText = decrypt(encryptedText);
    console.log('Decrypted:', decreptedText);
    encryptEnvFile();
});

test('Login with auth file', async ({browser}) => {
    const context = await browser.newContext({storageState: authFile});
    const page = await context.newPage();
    await page.goto('https://dwu000003pipz2aq-dev-ed.develop.lightning.force.com/lightning/page/home');
    await expect(page.getByTitle('Service'),
    'Service page shoul be visible'
).toBeVisible();
})