import { ProductItems } from "./items"

export class ProductTests {

    constructor() {
        this.items = new ProductItems()
    }

    checkCartCount(count) {
        this.items.getCartCount()
            .should('have.text', count)
    }

    checkProductTitle(title) {
        this.items.getProductTitle()
            .should('have.text', title)
    }

    checkProductPrice(price) {
        this.items.getProductPrice()
            .should('have.text', price)
    }
    
}