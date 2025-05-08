describe('Login Performance', () => {
    it('loads under 2 seconds', () => {
      const start = Date.now();
      cy.visit('/login');
      cy.window().then(() => {
        expect(Date.now() - start).to.be.lt(2000);
      });
    });
  });
