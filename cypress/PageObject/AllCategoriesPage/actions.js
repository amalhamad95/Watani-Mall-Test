import { CategoryItems } from "./items";

export class CategoryActions {

    constructor() {
        this.items = new CategoryItems()
    }

    clickAllCategory() {
        this.items.getAllCategoriesNavItem().click()
    }

}

