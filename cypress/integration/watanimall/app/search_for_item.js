import { verifyButtonClick, verifyPageUrlAndTitle, verifyTextInputField } from "./methods"

export function searchForItem(page,pageUrl , searchText , searchInputSelector , searchButtonSelector) {
    describe(`Verify \"${searchText}\" found in \"${page}\"`, () => {
        it(`Verify loading \"${page}\"`, () => {
            verifyPageUrlAndTitle(pageUrl, page)
        })

        it('Verify filling "Search" field', () => {
            verifyTextInputField(searchInputSelector, searchText)
        })

        it('Verify clicking on "Seach" button', () => {
            verifyButtonClick(searchButtonSelector)
        })

        it(`Verify \"${searchText}\" found in search results`, () => {
            cy.get('.dataTables_empty')
                .should('not.exist')

            // cy.get('#categories-grid_info')
            cy.get('.dataTables_scrollBody table')
                .contains('td', searchText)
                .should('be.visible');
        })
    })

}