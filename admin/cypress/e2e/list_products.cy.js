describe('List Products', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/list')
  })

  it('should display product list', () => {
    cy.get('p').contains('All Products List').should('be.visible')
    cy.get('.grid-cols-[1fr_3fr_1fr_1fr_1fr]').should('exist')
    cy.get('img.w-12').should('have.length.at.least', 1)
  })

  it('should remove a product', () => {
    cy.get('p.text-right.md\\:text-center.cursor-pointer').first().click()
    cy.get('.Toastify__toast--success').should('be.visible').contains('Product removed successfully')
  })
})