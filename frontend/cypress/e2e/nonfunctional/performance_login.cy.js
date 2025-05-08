describe('Login Performance', () => {
    it('loads under 5 seconds', () => {
      const start = Date.now();
      cy.visit('/login');
      cy.window().then(() => {
        expect(Date.now() - start).to.be.lt(5000);
      });
    });
  });
