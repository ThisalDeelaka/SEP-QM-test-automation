describe('Login Page', () => {
    const testUser = {
      email: 'malishasandeepa0000@gmail.com',
      password: 'Ms6023142'
    };
  
    it('should successfully login with valid credentials', () => {
      cy.visit('/login');
  
      // Enter email
      cy.get('input[type="email"]')
        .type(testUser.email);
  
      // Enter password
      cy.get('input[type="password"]')
        .type(testUser.password);
  
      // Click Login button
      cy.contains('Sign In').click();
  
      // Expect redirection or success indicator
      cy.url().should('eq', 'http://localhost:5173/');
  
      // Optionally check for an element only visible to logged-in users
      cy.contains('Logout').should('exist'); // if applicable
    });
  });
  