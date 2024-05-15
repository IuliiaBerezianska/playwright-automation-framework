import { Locator, Page, expect } from "@playwright/test"; 
import ContactPage from "./ContactPage";
import logger from "../utils/LoggerUtil";
import testdata from "../testData/contactCaseFlow.json"


export default class CasePage {

    readonly caseModal: Locator;
    readonly modalTitle: Locator;
    readonly caseOriginDropDown: Locator;
    readonly dropdownOption: string;
    readonly saveBtn: string;

    constructor (private page: Page){
        this.caseModal = page.locator(".modal-container ");
        this.modalTitle = page.locator(".slds-modal__title");
        this.caseOriginDropDown = page.locator('#combobox-button-1214');
        this.dropdownOption = 'Phone';
        this.saveBtn = "Save & New";
    }

async createNewCase(): Promise <object>{
    await expect(this.caseModal).toBeVisible();
    expect(this.modalTitle.innerText()).toContain('New Case');
    await this.caseOriginDropDown.scrollIntoViewIfNeeded();
    await this.caseOriginDropDown.click();
    await this.page.getByTitle(testdata.caseOrigin).click();
    await this.page.getByText(this.saveBtn).click().catch((error) =>{
        logger.info(`Error on clicking 'Save & New' btn: ${error}`);
        throw error;
    }).then(()=>{
        logger.info('Save & New button is clicked')
});
    return new ContactPage(this.page);
}

}