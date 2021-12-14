import { ProductItems } from "../ProductDetails/items";

export class ProductActions {

    constructor() {
        this.items = new ProductItems()
    }

    clickFirstProductAddCartButton() {
        this.items.getFirstProductAddCartButton()
            .click({ force: true })
    }

    clickSecondProduct() {
        this.items.getSecondProduct()
            .click()
    }


    clickPlusQtnButton() {
        this.items.getProductPlusAmountButton()
            .click()
    }

    clickProductAddToCartButton() {
        this.items.getProductAddToCartButton()
            .click()
    }

}