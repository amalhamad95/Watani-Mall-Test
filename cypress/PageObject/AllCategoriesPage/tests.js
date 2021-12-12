/// <reference types="cypress" />
import { all_categories_url, categoriesPage, watanimall_baseurl } from "../../integration/watanimall/app/app_constants";
import { CategoryItems } from "./items";

export class CategoryTests {

    constructor() {
        this.items = new CategoryItems();
    }

    checkHomePageLoading() {
        cy.url().should('include', watanimall_baseurl)
    }

    checkAllCategoryNavItemSelected() {
        this.items.getAllCategoriesNavItem()
            .parent()
            .should('have.class', 'current-menu-item')
    }

    checkAllCategoriesPageLoading() {
        cy.checkPageUrl(all_categories_url, categoriesPage)
    }

}