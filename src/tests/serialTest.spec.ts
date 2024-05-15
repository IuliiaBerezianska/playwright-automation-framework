import {test, Page} from '@playwright/test'
import LoginPage from '../pages/LoginPage';
import { decrypt } from '../utils/CryptojsUtil';
import logger from '../utils/LoggerUtil';
import ContactPage from '../pages/ContactPage';
import testData from '../testData/contactCaseFlow.json'
import CasePage from '../pages/CasePage';

let page: Page;
let contactPage: ContactPage;

test.describe.configure({mode: 'serial'});

// Define a beforeAll hook to set up the browser context
test.beforeAll(async ({browser}) => {
page = await browser.newPage();
const loginPage = new LoginPage(page);
const homePage = await loginPage.quickLogin(decrypt(process.env.userId!), decrypt(process.env.password!));
await homePage.expectServiceTitleToBeVisible();
logger.info('Login is completed');
await homePage.navigateToContactTab();
});

test('Create Contact and Open', async () => {
    test.step('Create a new contact', async ()=> {
        contactPage = new ContactPage(page);
        await contactPage.createContact(testData.contactFName, testData.contactLName);
        await contactPage.expectNewContactIsCreated(testData.contactFName, testData.contactLName);
    });
    });
test('Create a Case', async () => {
    await contactPage.clickNewCaseBtn();
    const casePage = new CasePage(page);
    await casePage.createNewCase();
});

test.afterAll(async () => {
    await page.close();
});

//https://playwright.dev/docs/test-retries#reuse-single-page-between-tests