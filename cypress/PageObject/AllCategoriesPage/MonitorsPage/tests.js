import { monitorsPage, monitors_url } from "../../../integration/watanimall/app/app_constants"
import { MonitorsItems } from "./items"

export class MonitorsTests {

    constructor() {
        this.items = new MonitorsItems()
    }

    checkMonitorsPageLoading() {
        cy.checkPageUrl(monitors_url, monitorsPage)
    }

    checkASUS_Selected() {
        this.items.getASUS()
            .should('have.class', 'checked')
    }

    checkProductListSize(lenght) {
        this.items.getAllProducts()
            .should('have.length', lenght)
    }

    checkOrderByListOpened() {
        this.items.getOrderByList()
            .click()
            .should('have.class', 'jcf-drop-active')
    }

    checkOrderByPriceDecSelected() {
        this.items.getOrderByText()
            .should('have.text', orderByPriceDec)

    }

}