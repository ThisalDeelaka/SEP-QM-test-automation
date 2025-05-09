describe('Orders Management', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/orders')
  })

  it('should display orders list', () => {
    cy.get('h3').contains('Order Page').should('be.visible')
    cy.get('.grid-cols-1.sm\\:grid-cols-\\[0\\.5fr_2fr_1fr\\]').should('exist')
  })

  it('should update order status', () => {
    cy.get('select').first().select('Shipped')
    cy.get('.Toastify__toast--success').should('be.visible').contains('Order status updated')
    cy.get('select').first().should('have.value', 'Shipped')
  })
})