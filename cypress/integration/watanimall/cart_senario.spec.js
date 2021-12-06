/// <reference types="cypress" />

import { all_categories_url, cartPage, categoriesPage, firstProduct, monitorsPage, monitors_filter_url, monitors_url, orderByPriceDec, productDetailsPage, secondProduct, watanimall_baseurl } from "./app/app_constants"
import { verifyCheckBoxField, verifyPageUrlAndTitle, verifySelectListItem } from "./app/methods"

context('WataniMall Cart Senario', () => {

    before(() => {
        cy.visit(watanimall_baseurl)

        // cy.fixture('products').then((products) => {
        //     cy.wrap(products[0]).as('firstProduct')
        //     cy.wrap(products[1]).as('secondProduct')
        // })
    })

    beforeEach(() => {
        // Save Cookies to prevent Login everytime
        Cypress.Cookies.defaults({
            preserve: (cookie) => {
                return true;
            }
        })
    });

    // afterEach(() => {
    //     cy.wait(1 * 1000)
    // })

    //*********Pages tests*********// 
    context(`"${categoriesPage}" Page`, () => {

        describe(`Open "${categoriesPage}" Page`, () => {
            it(`Verify clicking on "${categoriesPage}" menu item`, () => {
                cy.get('.primary-menu a[href$="all-categories"]').click()

                //Check item is selected style
                cy.get('.primary-menu a[href$="all-categories"]')
                    .parent()
                    .should('have.class', 'current-menu-item')
            })

            it(`Verify loading "${categoriesPage}" page`, () => {
                verifyPageUrlAndTitle(all_categories_url, categoriesPage)
            })
        })

        describe(`Open "${monitorsPage}" Page`, () => {
            it(`Verify clicking on "${monitorsPage}" sub category item`, () => {
                cy.get('span.category-name').contains(monitorsPage).click()
            })

            it(`Verify loading "${monitorsPage}" page`, () => {
                verifyPageUrlAndTitle(monitors_url, monitorsPage)
            })

            it('Verify checking "ASUS" in "Manufacturer" list', () => {
                cy.get('[data-name="manufacturer"] [data-value="asus"]')
                    .should('not.have.class', 'checked')
                    .click()
                    .should('have.class', 'checked')

                cy.get('.product-item')
                    .should('have.length', 13)
            })

            it(`Verify open OrderBy list`, () => {
                cy.get('span.jcf-select-orderby')
                    .click()
                    .should('have.class', 'jcf-drop-active')
            })

            it(`Verify selecting "${orderByPriceDec}" form OrderBy list`, () => {
                cy.get('.jcf-list-content ul li')
                    .contains(orderByPriceDec)
                    .click()

                cy.get('span.jcf-select-text')
                    .should('have.text', orderByPriceDec)

                verifyPageUrlAndTitle(monitors_filter_url, monitorsPage)
            })
        })


    })

})
