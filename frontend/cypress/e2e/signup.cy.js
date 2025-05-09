describe('Sign Up Form', () => {
  const baseUrl = 'http://localhost:5173'; // adjust if different

  beforeEach(() => {
    cy.visit(`${baseUrl}/login`);
    cy.contains('Create account').click(); // switch to Sign Up mode
  });

  it('should show validation errors for empty fields', () => {
    cy.get('button').contains('Sign Up').click();

    cy.contains('Name is required').should('exist');
    cy.contains('Email is required').should('exist');
    cy.contains('Password is required').should('exist');
  });

  it('should show error for short password', () => {
    cy.get('input[placeholder="Name"]').type('Test User');
    cy.get('input[placeholder="Email"]').type('user@example.com');
    cy.get('input[placeholder="Password"]').type('123');
    cy.get('button').contains('Sign Up').click();

    cy.contains('Password must be at least 6 characters').should('exist');
  });

  it('should successfully sign up with valid credentials', () => {
    const randomEmail = `testuser${Date.now()}@example.com`;

    cy.get('input[placeholder="Name"]').type('Test User');
    cy.get('input[placeholder="Email"]').type(randomEmail);
    cy.get('input[placeholder="Password"]').type('password123');
    cy.get('button').contains('Sign Up').click();

    // wait for navigation or success logic
    cy.url().should('eq', `${baseUrl}/`);
    cy.window().then(win => {
      expect(win.localStorage.getItem('token')).to.exist;
    });
  });
});
