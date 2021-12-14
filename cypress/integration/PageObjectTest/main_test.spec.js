/// <reference types="cypress" />

import { CategoryActions } from "../../PageObject/AllCategoriesPage/actions";
import { MonitorsActions } from "../../PageObject/AllCategoriesPage/MonitorsPage/actions";
import { MonitorsTests } from "../../PageObject/AllCategoriesPage/MonitorsPage/tests";
import { CategoryTests } from "../../PageObject/AllCategoriesPage/tests";
import { ProductActions } from "../../PageObject/ProductDetails/actions";
import { ProductTests } from "../../PageObject/ProductDetails/tests";
import {  firstProduct, homePage, monitorsPage, monitors_filter_url, orderByPriceDec, secondProduct, watanimall_baseurl } from "../watanimall/app/app_constants";

describe('Main Test', () => {

    before(() => {
        cy.visit(watanimall_baseurl)

        cy.fixture('AppConstants').then((AppConstants)=>{
            cy.wrap(AppConstants.watanimall_baseurl).as('watanimall_baseurl')
            cy.wrap(AppConstants.categoriesPage).as('categoriesPage')
        })
    })

    beforeEach(() => {
        // Save Cookies to prevent Login everytime
        Cypress.Cookies.defaults({
            preserve: (cookie) => {
                return true;
            }
        })
    });

    context(`"${this.categoriesPage}" Page`, () => {

        describe(`Open "${this.categoriesPage}" Page`, () => {
            let mActions = new CategoryActions()
            let mTests = new CategoryTests()

            it(`Verify loading "${homePage}" page`, () => {
                mTests.checkHomePageLoading()
            })

            it(`Verify clicking on "${this.categoriesPage}" menu item`, () => {
                mActions.clickAllCategory()
                mTests.checkAllCategoryNavItemSelected()
            })

            it(`Verify loading "${this.categoriesPage}" page`, () => {
                mTests.checkAllCategoriesPageLoading()
            })
        })


        describe(`Open "${monitorsPage}" Page`, () => {
            let mActions = new MonitorsActions()
            let mTests = new MonitorsTests()


            it(`Verify clicking on "${monitorsPage}" sub category item`, () => {
                mActions.clickMonitors()
            })

            it(`Verify loading "${monitorsPage}" page`, () => {
                mTests.checkMonitorsPageLoading()
            })

            it('Verify checking "ASUS" in "Manufacturer" list', () => {
                mActions.clickASUS()
                mTests.checkASUS_Selected()

                mTests.checkProductListSize(13)
            })

            it(`Verify selecting "${orderByPriceDec}" form OrderBy list`, () => {
                let url = 'https://watanimall.com/product-category/monitors?orderby=price&_manufacturer=asus';
                cy.intercept('POST', url).as('asusRequest');

                mActions.selectOrderByPriceDecFilter()
                mTests.checkOrderByPriceDecSelected()

                cy.wait('@asusRequest');
            })

            it(`Verify "${orderByPriceDec}" and "ASUS" is selected`, () => {
                cy.checkPageUrl(monitors_filter_url, monitorsPage)
            })

            it('Verify product list is sorted correctly', function () {
                mTests.checkProductsListSortedByFilters()
            });
        })

        describe(`Adding Items to Cart`, () => {
            let mActions = new ProductActions()
            let mTests = new ProductTests()

            describe(`Adding "${firstProduct}" to Cart`, () => {
                it(`Verify clicking on "Add to the cart" button`, () => {
                    mActions.clickFirstProductAddCartButton()
                })

                it(`Verify Cart items count increased`, () => {
                    mTests.checkCartCount('1')
                })
            })

            describe(`Adding "${secondProduct}" to Cart`, () => {

                it(`Verify clicking on Product`, () => {
                    mActions.clickSecondProduct()
                })

                // it(`Verify loading "${productDetailsPage}" page`, () => {
                //     cy.url().should('include',
                //      secondProduct.toLowerCase().replace(/ /g, '-'))
                // })

                it(`Verify Page show correct product details`, () => {
                    mTests.checkProductTitle(secondProduct.replace('"', "″"))
                    mTests.checkProductPrice('₪1,170.00')
                })


                it(`Verify clicking on "+" amount button`, () => {
                    mActions.clickPlusQtnButton()
                    // cy.get('[id*="quantity"]').should('have.text', '2')
                })

                it(`Verify clicking on "Add to Cart" button`, () => {
                    mActions.clickProductAddToCartButton()
                })

                it(`Verify Cart items count increased`, () => {
                    mTests.checkCartCount('3')
                })
            })
        })
    })



})