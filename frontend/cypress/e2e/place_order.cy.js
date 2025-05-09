describe('E-commerce Checkout Flow', () => {
    before(() => {
        // Log in before testing cart
        cy.visit('/login');
        cy.get('input[placeholder="Email"]').type('malishasandeepa0000@gmail.com');
        cy.get('input[placeholder="Password"]').type('Ms6023142');
        cy.contains('Sign In').click();
    
        // Confirm successful login
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });

    beforeEach(() => {
  cy.session('user-session', () => {
    cy.visit('/login');
    cy.get('input[placeholder="Email"]').type('malishasandeepa0000@gmail.com');
    cy.get('input[placeholder="Password"]').type('Ms6023142');
    cy.contains('Sign In').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});


    it('should show error when first name is empty', () => {
        // Visit Cart Page
        cy.visit('/cart');
      
        // Confirm cart has items
        cy.get('[data-testid="cart-item"]').should('have.length.greaterThan', 0);
      
        // Proceed to Checkout
        cy.contains('PROCEED TO CHECKOUT').click();
      
        // Fill all fields except first name
        cy.get('input[name="lastName"]').type('Doe');
        cy.get('input[name="email"]').type('john@example.com');
        cy.get('input[name="street"]').type('123 Main St');
        cy.get('input[name="city"]').type('New York');
        cy.get('input[name="state"]').type('NY');
        cy.get('input[name="zipcode"]').type('10001');
        cy.get('input[name="country"]').type('USA');
        cy.get('input[name="phone"]').type('1234567890');
      
        // Click place order
        cy.contains('PLACE ORDER').click();
      
        // Ensure validation appears
        cy.contains('First name is required').should('exist');
      
        // // Ensure order was NOT placed (still on placeorder page)
        // cy.url().should('include', '/placeorder');
      
        // // Confirm NOT redirected
        // cy.url().should('not.include', '/orders');
      });
      
  
    it('should proceed to checkout and place an order with COD', () => {
      // 1. Visit Cart Page
      cy.visit('/cart');
  
      // 2. Confirm that items are listed in the cart
      cy.get('[data-testid="cart-item"]').should('have.length.greaterThan', 0);
  
      // 3. Proceed to Checkout
      cy.contains('PROCEED TO CHECKOUT').click();
  
      // 4. Fill Delivery Information
      cy.get('input[name="firstName"]').type('John');
      cy.get('input[name="lastName"]').type('Doe');
      cy.get('input[name="email"]').type('john@example.com');
      cy.get('input[name="street"]').type('123 Main St');
      cy.get('input[name="city"]').type('New York');
      cy.get('input[name="state"]').type('NY');
      cy.get('input[name="zipcode"]').type('10001');
      cy.get('input[name="country"]').type('USA');
      cy.get('input[name="phone"]').type('1234567890');
  
      // 5. Select Payment Method (COD)
      cy.contains('CASH ON DELIVERY').click();
  
      // 6. Submit the form
      cy.contains('PLACE ORDER').click();
  
      // 7. Wait and assert redirection to orders page
      cy.url().should('include', '/orders');
  
      // 8. Confirm that latest order appears
      cy.get('[data-testid="order-item"]').should('have.length.greaterThan', 0);
    });    
      
  });
  