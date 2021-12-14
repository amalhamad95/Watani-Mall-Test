import { monitorsPage, orderByPriceDec } from "../../../integration/watanimall/app/app_constants"

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
        return cy.get("select[name='orderby']")
        // return cy.get('.jcf-list-content ul li')
            // .contains(orderByPriceDec)
    }

    getOrderByText() {
        return cy.get('.jcf-select-text > span')
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

    getProductsPriceList(){
        return cy.get('div.products-row div.product-col div.product-price').children().not('del').find('bdi')
    }

}