import { MonitorsItems } from "./items"

export class MonitorsActions {

    constructor() {
        this.items = new MonitorsItems()
    }

    clickMonitors() {
        this.items.getMonitors().click()
    }

    clickASUS() {
        this.items.getASUS().click()
    }

    openOrderByFilter() {
        this.items.getOrderByList().click()
    }

    selectOrderByPriceDecFilter() {
        this.items.getOrderByPriceDecFilter().click()
    }

    interceptOrderByRequest() {
        let url = 'https://watanimall.com/product-category/monitors?orderby=price&_manufacturer=asus';
        return cy.intercept('POST', url)
    }

}