/// <reference types="cypress" />

import { CategoryActions } from "../../PageObject/AllCategoriesPage/actions";
import { MonitorsActions } from "../../PageObject/AllCategoriesPage/MonitorsPage/actions";
import { MonitorsTests } from "../../PageObject/AllCategoriesPage/MonitorsPage/tests";
import { CategoryTests } from "../../PageObject/AllCategoriesPage/tests";
import { categoriesPage, homePage, monitorsPage, orderByPriceDec, watanimall_baseurl } from "../watanimall/app/app_constants";

describe('Main Test', () => {

    before(() => {
        cy.visit(watanimall_baseurl)

        // cy.fixture('AppConstants').as('AppConstants')
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

    context(`"${categoriesPage}" Page`, () => {

        describe(`Open "${categoriesPage}" Page`, () => {
            let mActions = new CategoryActions()
            let mTests = new CategoryTests()

            it(`Verify loading "${homePage}" page`, () => {
                mTests.checkHomePageLoading()
            })

            it(`Verify clicking on "${categoriesPage}" menu item`, () => {
                mActions.clickAllCategory()
                mTests.checkAllCategoryNavItemSelected()
            })

            it(`Verify loading "${categoriesPage}" page`, () => {
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

            it(`Verify open OrderBy list`, () => {
                mActions.openOrderByFilter()
                mTests.checkOrderByListOpened()
            })

            it(`Verify selecting "${orderByPriceDec}" form OrderBy list`, () => {
                mActions.orderByPriceDec()
                mTests.checkOrderByPriceDecSelected()
            })

            it(`Verify "${orderByPriceDec}" and "ASUS" is selected`, () => {
                cy.checkPageUrl(monitors_filter_url, monitorsPage)
            })

            it('Verify product list is sorted correctly', function () {
                cy.get('div.products-row div.product-col div.product-price').children().not('del').find('bdi').then(ele => {
                    const unsortedItems = ele.map((index, el) => Cypress.$(el).text().substr(1).trim().replace(/,/g, '')).get();
                    const sortedItems = unsortedItems.slice().sort((a, b) => parseFloat(a) - parseFloat(b));
                    expect(sortedItems, 'Items are sorted').to.deep.equal(unsortedItems);
                });
            });
        })
    })



})