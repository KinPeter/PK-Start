import po from '../support/page-objects/auth.po'

describe('Auth page', () => {
  it('Should redirect to auth', () => {
    cy.visit('/')
    cy.url().should('contain', '/auth')
  })

  it('Should contain the elements for login', () => {
    cy.visit('/')
    po.logo().should('be.visible')
    po.emailInput().should('be.visible').should('not.be.disabled')
    po.getLoginCodeButton().should('be.visible').should('be.disabled')
    po.haveLoginCodeLink().should('not.exist')
    po.loginCodeInput().should('not.exist')
    po.needLoginCodeLink().should('not.exist')
    po.loginButton().should('not.exist')
    po.emailInput().type('main@test.com')
    po.getLoginCodeButton().should('be.enabled').click()
    po.emailInput().should('not.exist')
    po.getLoginCodeButton().should('not.exist')
    po.haveLoginCodeLink().should('not.exist')
    po.loginCodeInput().should('be.visible').should('not.be.disabled')
    po.loginButton().should('be.visible').should('be.disabled')
    po.needLoginCodeLink().should('be.visible').click()
    po.haveLoginCodeLink().should('be.visible').click()
    po.loginCodeInput().should('be.visible').should('not.be.disabled')
  })
})
