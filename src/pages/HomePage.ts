import {Page, expect} from '@playwright/test';
import logger from '../utils/LoggerUtil';
import ContactPage from './ContactPage';

export default class HomePage {

private readonly serviceTitleLocator = 'Service';
private readonly contactsBtn = 'Contacts';

constructor( private page: Page) {
}

async expectServiceTitleToBeVisible() {
    await expect (this.page.getByTitle(this.serviceTitleLocator)).toBeVisible({
        timeout: 15000
    }).catch((error) => {
        logger.error(`Error clicking login button: ${error}}`);
        throw error;//rethrow the error if needed
    }).then(() => 
         // Log a message indicating that the login button was clicked successfully
        logger.info("Service title is visible"));   
}

async navigateToContactTab(): Promise<any>{
    await expect(this.page.getByTitle(this.contactsBtn)).toBeVisible();
    logger.info('Contacts tab is visible');
    await this.page.getByTitle(this.contactsBtn).click();
    logger.info('Contacts Tab is clicked');
    return new ContactPage(this.page);
}
}
