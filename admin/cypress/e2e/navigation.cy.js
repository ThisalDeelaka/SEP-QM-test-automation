describe('Navigation', () => {
  beforeEach(() => {
    cy.login()
  })

  it('should navigate to Add Items page', () => {
    cy.get('.flex.items-center.gap-3').contains('Add Items').click()
    cy.url().should('include', '/add')
    cy.get('p').contains('Upload Image').should('be.visible')
  })

  it('should navigate to List Items page', () => {
    cy.get('.flex.items-center.gap-3').contains('List Items').click()
    cy.url().should('include', '/list')
    cy.get('p').contains('All Products List').should('be.visible')
  })

  it('should navigate to Orders page', () => {
    cy.get('.flex.items-center.gap-3').contains('Orders').click()
    cy.url().should('include', '/orders')
    cy.get('h3').contains('Order Page').should('be.visible')
  })

  it('should logout successfully', () => {
    cy.logout()
  })
})