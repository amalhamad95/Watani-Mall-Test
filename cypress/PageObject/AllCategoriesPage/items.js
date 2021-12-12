import { monitorsPage } from "../../integration/watanimall/app/app_constants"

export class CategoryItems {

    constructor() { }

    getHomeNavItem() {
        return cy.get('.primary-menu a[href="https://watanimall.com/"]')
    }

    getAllCategoriesNavItem() {
        return cy.get('.primary-menu a[href$="all-categories"]')
    }

}