import { firstProduct, secondProduct } from "../../integration/watanimall/app/app_constants"

export class ProductItems {

    constructor() { }

    getFirstProduct() {
        return cy.get('.product-item')
            .contains(firstProduct)
            .closest('div')
        // .trigger('mouseover')
    }

    getFirstProductAddCartButton() {
        return cy.get('.product-item')
            .contains(firstProduct)
            .closest('div')
            .find('a.btn-add-cart')
    }

    getSecondProduct() {
        return cy.get('.product-item')
            .contains(secondProduct)
            .closest('div')
    }

    getCartCount() {
        return cy.get('.btn-cart span.counter')
    }

    getProductTitle() {
        return cy.get('.product_title')
    }

    getProductManufacturer() {

    }

    getProductPrice() {
        return cy.get('.summary > .product-price > .woocommerce-Price-amount > bdi')
    }

    getProductQtn() {

    }

    getProductPlusAmountButton() {
        return cy.get('.single-product-detail .jcf-btn-inc')
    }

    getProductAddToCartButton() {
        return cy.get('.single_add_to_cart_button')
    }


}