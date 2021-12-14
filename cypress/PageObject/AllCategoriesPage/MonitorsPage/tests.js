import { monitorsPage, monitors_url, orderByPriceDec } from "../../../integration/watanimall/app/app_constants"
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
            .should('have.class', 'jcf-drop-active')
    }

    checkOrderByPriceDecSelected() {
        this.items.getOrderByText()
            .should('have.text', orderByPriceDec)
    }

    checkProductsListSortedByFilters() {
        this.items.getProductsPriceList()
            .then(ele => {
                const unsortedItems = ele.map((index, el) => Cypress.$(el).text().substr(1).trim().replace(/,/g, '')).get();
                const sortedItems = unsortedItems.slice().sort((a, b) => parseFloat(a) - parseFloat(b));
                expect(sortedItems, 'Items are sorted').to.deep.equal(unsortedItems);
            });
    }

}