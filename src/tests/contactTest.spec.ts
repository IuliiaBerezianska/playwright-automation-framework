import { test, Page } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import {decrypt} from '../utils/CryptojsUtil';
import logger from '../utils/LoggerUtil';
import contacts from '../testData/contacts.json'
import { convertCsvFileToJsonFile } from '../utils/CsvToJsonUtility';
import { exportToCSV, exportToJson, generateTestData } from '../utils/FakerDataUtil';

/*let loginPage: any;
let homePage: any;

test.beforeEach(async ({page})=> {
loginPage = new LoginPage(page);

test.step('Sign in with user credentials', async () => {
logger.info('Test for contact creation is started...');
console.log(loginPage);
await loginPage.navigateToLoginPage();
await loginPage.enterUserName(decrypt(process.env.userId!));
await loginPage.enterPassword(decrypt(process.env.userId!));
homePage = await loginPage.loginBtn.click();
await homePage.expectServiceTitleToBeVisible();
});
});*/


for (const contact of contacts) {
    test(`Advanced DD test with ${contact.firstName} ${contact.lastName}`, async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.enterUserName(decrypt(process.env.userId!));
        await loginPage.enterPassword(decrypt(process.env.password!));
        await page.waitForTimeout(3000);
        const homePage = await loginPage.clickEnterBtn();
        await homePage.expectServiceTitleToBeVisible();
        const contactPage = await homePage.navigateToContactTab();
        await contactPage.createContact(contact.firstName, contact.lastName);
        await contactPage.expectNewContactIsCreated(contact.firstName, contact.lastName);
        await page.waitForTimeout(3000);
        logger.info('Test for contact creation is completed.');
    })
}

test.skip('csv to json', async () => {
    convertCsvFileToJsonFile('data.csv', 'covertedToJason.json');
});

test('Fake data generation', async () => {
    const data = generateTestData(2);
    
    exportToJson(data, 'testData_en.json');
    exportToCSV(data, 'testData_en.csv');
})