describe('Login Functionality', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display login form', () => {
    cy.get('h1').contains('Admin Panel').should('be.visible')
    cy.get('input[placeholder="your@email.com"]').should('be.visible')
    cy.get('input[placeholder="Enter your password"]').should('be.visible')
    cy.get('button[type="submit"]').contains('Login').should('be.visible')
  })

  it('should login successfully with valid credentials', () => {
    cy.login()
    cy.get('.Toastify__toast--success').should('be.visible').contains('Login successful')
    cy.get('img[alt=""]').should('have.attr', 'src').and('include', 'logo')
    cy.get('button').contains('Logout').should('be.visible')
  })

  it('should show error for invalid credentials', () => {
    cy.get('input[placeholder="your@email.com"]').type('wrong@example.com')
    cy.get('input[placeholder="Enter your password"]').type('wrongpassword')
    cy.get('button[type="submit"]').contains('Login').click()
    cy.get('.Toastify__toast--error').should('be.visible').contains('Invalid credentials')
  })
})