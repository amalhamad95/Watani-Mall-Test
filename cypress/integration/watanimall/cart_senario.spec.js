/// <reference types="cypress" />

import { all_categories_url, cartPage, categoriesPage, firstProduct, monitorsPage, monitors_filter_url, monitors_url, orderByPriceDec, productDetailsPage, secondProduct, watanimall_baseurl } from "./app/app_constants"
import { verifyPageUrlAndTitle } from "./app/methods"

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

        describe(`Adding Items to Cart`, () => {

            describe(`Adding "${firstProduct}" to Cart`, () => {

                // it(`Verify product data`, () => {

                //     // cy.get('div.products-row.facetwp-template > div:nth-child(1) a.btn-add-cart')
                //     //     .click({ force: true })

                //     cy.get('.product-item')
                //         .contains(firstProduct)
                //         .closest('div')
                //         .then((product) => {
                //             expect(product).to.contain(firstProduct)
                //             expect(product).to.contain('940.00')
                //             // cy.wrap(product)
                //             //     .find('.product-name')
                //             //     .should('contain', firstProduct)

                //             // cy.wrap(product)
                //             //     .find('.product-price')
                //             //     .should('contain', '940.00')
                //         })
                // })


                it(`Verify clicking on "Add to the cart" button`, () => {
                    cy.get('.product-item')
                        .contains(firstProduct)
                        .closest('div')
                        // .trigger('mouseover')
                        .find('a.btn-add-cart')
                        .click({ force: true })
                })


                it(`Verify Cart items count increased`, () => {
                    cy.get('.btn-cart span.counter')
                        .should('have.text', '1')
                })

            })


            describe(`Adding "${secondProduct}" to Cart`, () => {

                it(`Verify clicking on Product`, () => {
                    cy.get('.product-item')
                        .contains(secondProduct)
                        .closest('div')
                        .click()
                    // cy.get('div.products-row.facetwp-template > div:nth-child(2)').click()
                })

                // it(`Verify loading "${productDetailsPage}" page`, () => {
                //     cy.url().should('include',
                //      secondProduct.toLowerCase().replace(' ', '-'))
                // })

                it(`Verify Page show correct product details`, () => {
                    cy.get('.product_title').should('have.text', secondProduct.replace('"', "″"))
                    cy.get('.summary > .product-price > .woocommerce-Price-amount > bdi').should('have.text', '₪1,170.00')
                })


                it(`Verify clicking on "+" amount button`, () => {
                    cy.get('.single-product-detail .jcf-btn-inc').click()
                    // cy.get('[id*="quantity"]').should('have.text', '2')
                })

                it(`Verify clicking on "Add to Cart" button`, () => {
                    cy.get('.single_add_to_cart_button').click()
                    // cy.get('[id*="quantity"]').should('have.text', '2')
                })

                it(`Verify Cart items count increased`, () => {
                    cy.get('.btn-cart span.counter')
                        .should('have.text', '3')
                })
            })

        })

    })

    context(`"${cartPage}" Page`, () => {

        it(`Verify MiniCart show correct added items`, () => {
            cy.fixture('products')
                .then(function (products) {
                    for (let i = 0; i < products.length; i++) {
                        let product = products[i]
                        cy.get('.cart-item:nth-child(' + (i + 1) + ')').as('productItem')

                        // cy.get('@productItem')
                        //     .find('.product-name').invoke('text')
                        //     .should('contain', (product.name))
                        // .contains(product.name)

                        cy.get('@productItem')
                            .find('bdi')
                            .should('contain', product.price)

                        cy.get('@productItem')
                            .find('[id*="qty"]')
                            .should('have.attr', 'value', product.qty)
                    }
                })
        })

        it(`Verify Cart Total price is correct`, () => {
            cy.get('div.cart-sub-total bdi')
                .should('have.text', '₪3,310.00')
        })

        it(`Verify deleting first cart item`, () => {
            cy.get(':nth-child(1) > .cart-remove').click()
        })

        it(`Verify Cart Total price is change after delete item`, () => {
            cy.get('.sub-total-amount')
                .should('have.text', '2340')
        })
    })
})
