describe('Usability - Keyboard Navigation login page', () => {
    it('tabs through inputs and button', () => {
      cy.visit('/login');
  
      // directly focus on email input
      cy.get('input[type="email"]').focus();
      cy.focused().should('have.attr', 'type', 'email');
  
      cy.tab(); 
      cy.focused().should('have.attr', 'type', 'password');
  
      cy.tab(); 
      cy.focused().should('match', 'button');
    });
  });
  