
Cypress.Commands.add('checkPageUrl', (url, title) => {
    cy.log('Check page url')
    cy.url().should('include', url)
    cy.log('Check page title')
    cy.get('[class$="container"] h1').contains(title).should('be.visible')
})