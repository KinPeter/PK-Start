import { notesPo as po } from '../support/page-objects/notes.po'
import { confirmationDialogPo } from '../support/page-objects/confirmation-dialog.po'

describe('Notes', () => {
  beforeEach(() => {
    cy.login()
  })

  it('Should have the initial notes', () => {
    po.box().should('be.visible')
    po.header().should('contain', 'Notes')
    po.actions().should('have.length', 2)
    po.addNoteBtn().should('be.visible').should('not.be.disabled')
    po.noteCards().should('have.length', 4)
    po.noteCard(0).should('contain', 'This is a pinned note').should('have.class', 'pinned')
    po.archiveBtn(0).should('be.disabled')
    po.noteCard(1).should('contain', 'This is the latest note with links')
    po.noteLinks(1).should('have.length', 2)
    po.noteCard(2).should('contain', 'Only a link')
    po.noteLinks(2).should('have.length', 1)
    po.noteCard(3).should('contain', 'This is an archived note').should('have.class', 'archived')
    po.pinBtn(3).should('be.disabled')
  })

  it('Should be possible to pin and archive notes', () => {
    po.pinBtn(1).click()
    po.noteCard(0).should('have.class', 'pinned')
    po.noteCard(1).should('have.class', 'pinned')
    po.noteCard(2).should('not.have.class', 'pinned')
    po.pinBtn(0).click()
    po.noteCard(0).should('have.class', 'pinned')
    po.noteCard(1).should('not.have.class', 'pinned')
    po.archiveBtn(2).click()
    po.noteCard(1).should('not.have.class', 'archived')
    po.noteCard(2).should('have.class', 'archived')
    po.noteCard(3).should('have.class', 'archived')
    po.archiveBtn(2).click()
    po.noteCard(2).should('not.have.class', 'archived')
    po.noteCard(3).should('have.class', 'archived')
  })

  it('Should be possible to edit a note', () => {
    po.editBtn(0).click()
    po.noteDialog.dialog().should('be.visible')
    po.noteDialog.closeBtn().click()
    po.noteDialog.dialog().should('not.exist')
    po.editBtn(0).click()
    po.noteDialog.title().should('contain', 'Edit note')
    po.noteDialog.textField().clear().type('Updated note')
    po.noteDialog.saveBtn().should('not.be.disabled').click().wait(500)
    po.noteCard(0).should('not.contain', 'This is a pinned note').should('contain', 'Updated note')
    po.editBtn(0).click()
    po.noteDialog.textField().clear().type('This is a pinned note')
    po.noteDialog.saveBtn().should('not.be.disabled').click().wait(500)
    po.noteCard(0).should('not.contain', 'Updated note').should('contain', 'This is a pinned note')
  })

  it('Should be possible to add a new note', () => {
    po.addNoteBtn().click()
    po.noteDialog.dialog().should('be.visible')
    po.noteDialog.title().should('contain', 'Add new note')
    po.noteDialog.textField().type('This is a new note')
    po.noteDialog.linkNameInput().should('not.exist')
    po.noteDialog.linkUrlInput().should('not.exist')
    po.noteDialog.addLinkBtn().click()
    po.noteDialog.linkNameInput().should('be.visible').type('New link')
    po.noteDialog.saveBtn().should('be.disabled')
    po.noteDialog.linkUrlInput().should('be.visible').type('https://www.p-kin.com')
    po.noteDialog.saveBtn().should('not.be.disabled').click().wait(500)
    po.noteCards().should('have.length', 5)
    po.noteCard(1).should('contain', 'This is a new note')
    po.noteLinks(1).should('have.length', 1)
  })

  it('Should be possible to delete a note', () => {
    po.noteCards().should('have.length', 5)
    po.noteCard(1).should('contain', 'This is a new note')
    po.noteCard(2).should('contain', 'This is the latest note')
    po.deleteBtn(1).click()
    confirmationDialogPo
      .dialog()
      .should('be.visible')
      .should('contain', 'Do you really want to delete this note?')
    confirmationDialogPo.cancelBtn().click()
    confirmationDialogPo.dialog().should('not.exist')
    po.noteCards().should('have.length', 5)
    po.deleteBtn(1).click()
    confirmationDialogPo
      .dialog()
      .should('be.visible')
      .should('contain', 'Do you really want to delete this note?')
    confirmationDialogPo.okBtn().click().wait(500)
    po.noteCards().should('have.length', 4)
    po.noteCard(1).should('contain', 'This is the latest note')
  })
})
