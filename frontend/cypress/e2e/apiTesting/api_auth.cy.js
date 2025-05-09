describe('API Tests - Auth', () => {
  const backendUrl = 'http://localhost:4000';

  const generateRandomEmail = () => `testuser_${Date.now()}@example.com`;

  it('should register a new user successfully', () => {
    const email = generateRandomEmail();

    cy.request('POST', `${backendUrl}/api/user/register`, {
      name: 'Test User',
      email,
      password: 'password123'
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.success).to.be.true;
      expect(res.body).to.have.property('token');
    });
  });

  it('should fail to register with existing email', () => {
    const email = generateRandomEmail();

    // First register
    cy.request('POST', `${backendUrl}/api/user/register`, {
      name: 'Test User',
      email,
      password: 'password123'
    });

    // Try registering again with same email
    cy.request({
      method: 'POST',
      url: `${backendUrl}/api/user/register`,
      failOnStatusCode: false,
      body: {
        name: 'Test User',
        email,
        password: 'password123'
      }
    }).then((res) => {
      // still 200 but success:false
        expect(res.status).to.eq(200);
        expect(res.body.success).to.be.false;
        expect(res.body.message).to.eq('User already exists');
    });
  });

  it('should log in successfully with valid credentials', () => {
    const email = generateRandomEmail();

    // Register user
    cy.request('POST', `${backendUrl}/api/user/register`, {
      name: 'Test User',
      email,
      password: 'password123'
    });

    // Login
    cy.request('POST', `${backendUrl}/api/user/login`, {
      email,
      password: 'password123'
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.success).to.be.true;
      expect(res.body).to.have.property('token');
    });
  });

  it('should fail login with wrong credentials', () => {
    cy.request({
      method: 'POST',
      url: `${backendUrl}/api/user/login`,
      failOnStatusCode: false,
      body: {
        email: 'notfound@example.com',
        password: 'wrongpass'
      }
    }).then((res) => {
      expect(res.status).to.eq(200); // or whatever your backend returns
      expect(res.body.success).to.be.false;
      expect(res.body.message).to.eq("User doesn't exists");
    });
  });
});
