import { orderByPriceDec } from "../../../integration/watanimall/app/app_constants"

export class MonitorsItems {
    constructor() { }

    getMonitors() {
        return cy.get('span.category-name').contains(monitorsPage)
    }

    getASUS() {
        return cy.get('[data-name="manufacturer"] [data-value="asus"]')
    }

    getOrderByList() {
        return cy.get('span.jcf-select-orderby')
    }

    getOrderByPriceDecFilter() {
        return cy.get('.jcf-list-content ul li')
            .contains(orderByPriceDec)
    }

    getOrderByText() {
        return cy.get('.jcf-list-content ul li')
    }

    getAllProducts() {
        return cy.get('.product-item')
    }
    
    getFirstProduct() {
        return cy.get('span.category-name').contains(monitorsPage)
    }

    getSecondProduct() {
        return cy.get('span.category-name').contains(monitorsPage)
    }

}