import { watanimall_baseurl } from "./app/app_constants"

context('WataniMall Cart Senario', () => {

    before(() => {
        cy.visit(watanimall_baseurl)
    })

    // beforeEach(() => {
    //     // Save Cookies to prevent Login everytime
    //     Cypress.Cookies.defaults({
    //         preserve: (cookie) => {
    //             return true;
    //         }
    //     })
    // });

    // afterEach(() => {
    //     cy.wait(1 * 1000)
    // })

    //*********Pages tests*********// 
})
