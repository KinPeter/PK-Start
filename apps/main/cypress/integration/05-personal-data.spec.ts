import { personalDataPo as po } from '../support/page-objects/personalData.po'
import { confirmationDialogPo } from '../support/page-objects/confirmation-dialog.po'
import { appBarPo } from '../support/page-objects/main-layout.po'

describe('Personal data', () => {
  beforeEach(() => {
    cy.login()
    appBarPo.personalDataBtn().click()
    po.box().should('be.visible')
  })

  it('Should be able to search and find personal data', () => {
    po.cards().should('not.exist')
    po.actions().should('have.length', 2)
    po.box().should('contain', 'Personal Data')
    po.searchInput().should('be.visible').type('id')
    po.searchBtn().click()
    po.cards().should('have.length', 1)
    po.card.card(0).should('be.visible')
    po.card.title(0).should('contain', 'ID card')
    po.card.content(0).should('contain', '123456HE').should('contain', 'Expires: 2026.09.16')
    po.searchInput().clear()
    po.searchBtn().click()
    po.cards().should('not.exist')
    po.searchInput().type('address')
    po.searchBtn().click()
    po.cards().should('have.length', 1)
    po.card.card(0).should('be.visible')
    po.card.title(0).should('contain', 'Address card')
    po.card.content(0).should('contain', '654321YL')
    po.searchInput().clear()
    po.searchBtn().click()
    po.cards().should('not.exist')
    po.searchInput().type('all')
    po.searchBtn().click()
    po.cards().should('have.length', 2)
  })

  it('Should be possible to edit a personal data entry', () => {
    po.searchInput().type('id')
    po.searchBtn().click()
    po.card.editBtn(0).click()
    po.personalDataDialog.dialog().should('be.visible')
    po.personalDataDialog.title().should('contain', 'Edit ID card')
    po.personalDataDialog.nameInput().clear().type('Updated card')
    po.personalDataDialog.identifierInput().clear().type('123456')
    po.personalDataDialog.saveBtn().should('not.be.disabled').click().wait(500)
    po.searchInput().type('updated')
    po.searchBtn().click()
    po.cards().should('have.length', 1)
    po.card.title(0).should('contain', 'Updated card')
    po.card.content(0).should('contain', '123456')
    po.card.editBtn(0).click()
    po.personalDataDialog.nameInput().clear().type('ID card')
    po.personalDataDialog.identifierInput().clear().type('123456HE')
    po.personalDataDialog.saveBtn().should('not.be.disabled').click().wait(500)
    po.searchInput().type('id')
    po.searchBtn().click()
    po.cards().should('have.length', 1)
    po.card.title(0).should('contain', 'ID card')
    po.card.content(0).should('contain', '123456HE')
  })

  it('Should get error snackbar and notification if new personal data entry save fails', () => {
    po.addNewBtn().click()
    po.personalDataDialog.dialog().should('be.visible')
    po.personalDataDialog.title().should('contain', 'Add new document')
    po.personalDataDialog.nameInput().type('New document')
    po.personalDataDialog.identifierInput().type('AX554433')
    po.personalDataDialog.expiryInput().type('2022.01.12')
    po.personalDataDialog.saveBtn().click().wait(500)
    appBarPo
      .snackbar()
      .should('be.visible')
      .should('have.class', 'error')
      .should('contain', 'Could not create document. INVALID_DATE')
    appBarPo.snackbarCloseBtn().should('be.visible').click()
    appBarPo.snackbar().should('not.exist')
    appBarPo.notificationsBtn().should('be.visible').click()
    appBarPo.notificationsMenu().should('be.visible')
    appBarPo
      .notificationItem()
      .should('have.length.at.least', 1)
      .should('contain', 'Could not create document. INVALID_DATE')
    appBarPo.notificationsClearBtn().should('be.visible').click()
    appBarPo.notificationsBtn().should('not.exist')
  })

  it('Should be possible to add a new personal data entry', () => {
    po.addNewBtn().click()
    po.personalDataDialog.dialog().should('be.visible')
    po.personalDataDialog.title().should('contain', 'Add new document')
    po.personalDataDialog.nameInput().type('New document')
    po.personalDataDialog.identifierInput().type('AX554433')
    po.personalDataDialog.expiryInput().type('2022-01-12')
    po.personalDataDialog.saveBtn().click().wait(500)
    po.searchInput().type('new')
    po.searchBtn().click()
    po.card.title(0).should('contain', 'New document')
    po.card.content(0).should('contain', 'AX554433').should('contain', 'Expires: 2022.01.12')
    po.searchInput().clear().type('all')
    po.cards().should('have.length', 3)
  })

  it('Should be possible to delete a personal data entry', () => {
    po.searchInput().type('new')
    po.searchBtn().click()
    po.card.deleteBtn(0).click()
    confirmationDialogPo
      .dialog()
      .should('be.visible')
      .should('contain', 'Do you really want to delete the document "New document"?')
    confirmationDialogPo.okBtn().click().wait(500)
    po.searchInput().clear().type('new')
    po.searchBtn().click()
    po.cards().should('not.exist')
    po.searchInput().clear().type('all')
    po.searchBtn().click()
    po.cards().should('have.length', 2)
  })
})
