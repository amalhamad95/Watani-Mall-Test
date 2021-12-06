
export function verifyPageUrlAndTitle(url, title) {
    cy.log('Check page url')
    cy.url().should('include', url)
    cy.log('Check page title')
    cy.get('[class$="container"] h1').contains(title).should('be.visible')
}

export function verifyButtonClick(selector) {
    cy.get(selector)
        // .should('be.visible')
        // .and('be.enabled')
        .click()
}

export function verifyTextInputField(selector, textValue) {
    cy.get(selector)
        // .should('be.visible')
        // .and('be.enabled')
        .clear()
        .should('have.value', '')
        .type(textValue)
        .should('be.focused')
        .and('have.value', textValue)
}
export function verifyIframe(selector, body) {
    // cy.frameLoaded('#Description_ifr');
    // cy.iframe().clear().type(object.description)
    const iframe = cy.get(selector)
        // $0 returns the most recently selected element which is iFrame
        //The contentDocument returns the document object that the iframe generates
        .its('0.contentDocument.body')
        .should('be.visible')
        .then(cy.wrap);
    iframe.clear()
        .type(body)
    iframe.should('include.text', body)
}

export function verifyCheckBoxField(selector) {
    cy.get(selector)
        // .should('be.visible')
        // .and('be.enabled')
        // .uncheck()
        // .should('not.be.checked')
        .check()
        .should('be.checked')
}

export function verifySelectListItem(selector, selectedItemText, selectedItemValue) {
    cy.get(selector)
        // .should('be.visible')
        // .and('be.enabled')
        .select(selectedItemText, { force: true })
        .should('have.value', selectedItemValue)
}

export function verifyAlert(message) {
    // cy.on('window:alert', (text) => {
    // expect(text).to.contains(message);
    // });
    cy.get(".alert")
        .should("be.visible")
        .and("include.text", message);
}

export function openCards(...selectors) {
    selectors.forEach(element => {
        cy.get(element)
            .invoke('css', 'display', 'block')
        // .should('have.css', 'display', 'block')
        // .invoke('attr', 'style', 'display: block;')
    });
}