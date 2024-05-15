import { expect, Page, Locator} from "@playwright/test";
import logger from "../utils/LoggerUtil";
import CasePage from "./CasePage";
export default class ContactPage {
    readonly newCaseBtn: Locator;
    readonly newButtonLocator: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly saveBtn: string;
    readonly contactNameLabel: string;
    readonly modalTitle: Locator;
    readonly contactsLink: string;

    constructor( private page: Page){
    this.newCaseBtn = page.locator("//button[@name = 'NewCase']");
    this.contactsLink = 'Contacts';
    this.newButtonLocator = 'New';
    this.firstName = 'First Name';
    this.lastName = 'Last Name';
    this.saveBtn = 'Save';
    this.contactNameLabel = 'sfa-output-name-with-hierarchy-icon-wrapper';
    this.modalTitle = page.locator('.slds-modal__title');
    }

    async createContact(fname: string, lname: string): Promise <void> {
        await this.page.getByRole('link', { name: this.contactsLink }).click();
        await this.page.waitForURL('https://dwu000003pipz2aq-dev-ed.develop.lightning.force.com/lightning/o/Contact/home');
        await this.page.getByRole('button', { name: this.newButtonLocator }).click();
        logger.info("New button is clicked");
        await this.page.getByPlaceholder(this.firstName).click();
        await this.page.getByPlaceholder(this.lastName).fill(fname);
        logger.info(`First name is filled as ${fname}`)
        await this.page.getByPlaceholder(this.firstName).press('Tab');
        await this.page.getByPlaceholder(this.lastName).fill(lname);
        logger.info(`Last name is filled as ${lname}`)
        await this.page.getByRole('button', { name: this.saveBtn, exact: true }).click().catch((error) => {
          logger.error(`Error clicking Save button: ${error}`);
          throw error; // rethrow the error if needed
        }).then(()=>logger.info("Save Button is clicked"));
        
    }

    async expectNewContactIsCreated(fname: string, lname:string): Promise<void>{
        expect (this.page.locator(this.contactNameLabel)).toContainText(`${fname} ${lname}`).catch((error) => {
            logger.error(`Error on displaying New Contact: ${error}`);
            throw error;
            }).then(() => {
                logger.info(`Contact ${fname} ${lname} is visible`);
            });
    }

    async clickNewCaseBtn(): Promise <object> {
        await this.newCaseBtn.waitFor();
        await this.newCaseBtn.click().catch(error => {
            logger.error(`Error on clicking New Btn: ${error}`);
            throw error;
        }).then(() =>{
            logger.info('New Btn is clicked');
         });
        return new CasePage(this.page);
    }

}