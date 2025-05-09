describe('Login Page - Valid and Invalid Scenarios', () => {
    const validUser = {
      email: 'malishasandeepa0000@gmail.com',
      password: 'Ms6023142'
    };
  
    const invalidUser = {
      email: 'wronguser@example.com',
      password: 'wrongpassword'
    };
  
    beforeEach(() => {
      cy.visit('/login');
    });
  
    it('should successfully login with valid credentials', () => {
      cy.get('input[type="email"]').type(validUser.email);
      cy.get('input[type="password"]').type(validUser.password);
      cy.contains('Sign In').click();
  
      cy.url().should('eq', 'http://localhost:5173/');
      cy.contains('Logout').should('exist');
    });
  
    it('should show error for invalid credentials', () => {
      cy.get('input[type="email"]').type(invalidUser.email);
      cy.get('input[type="password"]').type(invalidUser.password);
      cy.contains('Sign In').click();
  
      cy.contains("User doesn't exists").should('exist');
    });
  
    it('should show error when email is empty', () => {
      cy.get('input[type="password"]').type(validUser.password);
      cy.contains('Sign In').click();
  
      cy.contains('Email is required').should('exist');
    });
  
    it('should show error when password is empty', () => {
      cy.get('input[type="email"]').type(validUser.email);
      cy.contains('Sign In').click();
  
      cy.contains('Password is required').should('exist');
    });
  
    // it('should show error for invalid email format', () => {
    //   cy.get('input[type="email"]').type('invalid-email');
    //   cy.get('input[type="password"]').type('somepassword');
    //   cy.contains('Sign In').click();
  
    //   cy.contains('Enter a valid email').should('exist');
    // });
  });
  