describe('Performance Home page', () => {
  it('loads within 5 seconds', () => {
    const start = Date.now();
    cy.visit('/');
    cy.window().then(() => {
      const duration = Date.now() - start;
      expect(duration).to.be.lessThan(5000); 
    });
  });
});