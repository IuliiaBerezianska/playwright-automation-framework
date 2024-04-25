import { expect, Page, Locator } from "@playwright/test";
import HomePage from "./HomePage";
import logger from "../utils/LoggerUtil";
import { error } from "console";


export default class ContactPage {
    readonly newBtn = 'New';
    readonly firstName = 'First Name';
    readonly lastName = 'Last Name';
    readonly saveBtn = 'Save';
    readonly contactNameLabel = 'sfa-output-name-with-hierarchy-icon-wrapper';

    constructor( private page: Page){
    }
    async createContact(fname: string, lname: string): Promise <any> {
        await this.page.getByText(this.newBtn).click();
        await expect (this.page.getByLabel(this.firstName)).toBeVisible();
        await expect (this.page.getByPlaceholder(this.lastName)).toBeVisible();
        await this.page.getByPlaceholder(this.firstName).fill(fname);
        logger.info(`First name is filled as ${fname}`);
        await this.page.getByPlaceholder(this.lastName).fill(lname);
        logger.info(`Last name is filled as ${lname}`);
        await this.page.waitForTimeout(3000);
        await this.page.getByText(this.saveBtn).nth(1).click().catch((error) => {
        logger.info(`Error on clicking Save Btn: ${error}`);
        throw error; // rethrow the error if needed
    }   ).then(() => {
        logger.info('Save Btn is clicked')});
    }

    async expectNewContactIsCreated(fname: string, lname:string): Promise<void>{
        expect (this.page.locator(this.contactNameLabel)).toContainText(`${fname} ${lname}`).catch((error) => {
            logger.error(`Error on displaying New Contact: ${error}`);
            throw error;
            }).then(() => {
                logger.info(`Contact ${fname} ${lname} is visible`);
            });
    }

}