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

  it('should clear the cart before starting the test', () => {
    cy.visit('/cart');

    // Wait for cart items to load
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="cart-item"]').length > 0) {
        cy.get('[data-testid="cart-item"]').each(() => {
          cy.get('[data-testid="cart-item"] img[src*="bin_icon"]').first().click();
        });
      }
    });

    // Verify cart is empty after deletion (allow for re-render delay)
    cy.wait(500);
    cy.get('[data-testid="cart-item"]').should('not.exist');
  });

// it('should add a product to the cart and verify it', () => {
//   cy.visit('/product/66e076ce3f6e85fd222a630f');

//   // Confirm product name exists (basic check page loaded)
//   cy.get('h1, h2, h3').should('exist');

//   // Select a size button
//   cy.get('button')
//     .contains(/S|M|L|XL/)
//     .should('be.visible')
//     .first()
//     .click();

//   // Click ADD TO CART
//   cy.contains('ADD TO CART').click();

//   // Wait for cart update (adjust if your app uses toast or delay)
//   cy.wait(1000);

//   // Visit cart page
//   cy.visit('/cart');

//   // Wait for cart items to load
//   cy.get('[data-testid="cart-item"]', { timeout: 10000 }).should('exist');

//   // Verify at least one item is in cart
//   cy.get('[data-testid="cart-item"]').its('length').should('be.greaterThan', 0);

//   // Check quantity is 1
//   cy.get('input[type="number"]').should('have.value', '1');
// });


});
