describe('Add Product', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/add')
  })

  it('should add a new product successfully', () => {
    // Upload image
    cy.get('input[type="file"]#image1').selectFile('cypress/fixtures/sample-image.jpg')
    
    // Fill form
    cy.get('input[placeholder="Type here"]').type('Test Product')
    cy.get('textarea[placeholder="Write content here"]').type('Test Description')
    cy.get('select').first().select('Men')
    cy.get('select').eq(1).select('Topwear')
    cy.get('input[placeholder="25"]').type('99.99')
    
    // Select sizes
    cy.get('p').contains('S').click()
    cy.get('p').contains('M').click()
    
    // Check bestseller
    cy.get('input#bestseller').check()
    
    // Submit
    cy.get('button[type="submit"]').contains('ADD').click()
    
    cy.get('.Toastify__toast--success').should('be.visible').contains('Product added successfully')
  })

  it('should show error for incomplete form', () => {
    cy.get('button[type="submit"]').contains('ADD').click()
    cy.get('.Toastify__toast--error').should('be.visible').contains('Please fill all required fields')
  })
})