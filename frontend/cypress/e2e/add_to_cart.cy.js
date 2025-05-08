describe('Add to Cart Flow', () => {

    before(() => {
      // Log in before testing cart
      cy.visit('/login');
      cy.get('input[placeholder="Email"]').type('malishasandeepa0000@gmail.com');
      cy.get('input[placeholder="Password"]').type('Ms6023142');
      cy.contains('Sign In').click();
  
      // Confirm successful login
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
  
    it('should add a product to the cart and verify it', () => {
      // Navigate to a specific product page (replace with actual product ID)
      cy.visit('/product/66e076ce3f6e85fd222a630f'); // replace 'abc123' with a valid product ID
  
      // Select a size (pick the first available button)
      cy.get('button').contains(/S|M|L|XL/).first().click();
  
      // Click "Add to Cart"
      cy.contains('ADD TO CART').click();
  
      // Go to cart
      cy.visit('/cart');
  
      // Validate product is in cart
      cy.get('.text-xs, .text-lg').invoke('text').then((text) => {
        expect(text.trim().length).to.be.greaterThan(0); // Ensures product name exists
      });
      
      cy.get('input[type="number"]').should('have.value', '1');
    });
  });
  