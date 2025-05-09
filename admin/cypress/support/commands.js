Cypress.Commands.add('login', (email = 'admin@example.com', password = 'password123') => {
  cy.visit('/')
  cy.get('input[placeholder="your@email.com"]').type(email)
  cy.get('input[placeholder="Enter your password"]').type(password)
  cy.get('button[type="submit"]').contains('Login').click()
  cy.url().should('include', '/add') // Assuming add is the default route after login
})

Cypress.Commands.add('logout', () => {
  cy.get('button').contains('Logout').click()
  cy.get('h1').contains('Admin Panel').should('be.visible')
})