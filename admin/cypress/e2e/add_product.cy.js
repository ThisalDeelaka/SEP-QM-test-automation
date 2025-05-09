describe('Add Product Flow', () => {

  before(() => {
    // Log in and store token
    cy.visit('/')

    cy.get('input[type="email"]').type('admin@gmail.com')
    cy.get('input[type="password"]').type('admin')
    cy.get('button[type="submit"]').click()

    // Wait for redirect or dashboard
    cy.url().should('include', '/')
  })

  it('should successfully add a new product', () => {
    cy.visit('/add')
    cy.contains('Upload Image', { timeout: 10000 }).should('be.visible') // or a unique form element


    // Upload images (assumes upload_area images are replaced)
    const imagePath = 'testImages/Slider-Background.jpg'
    cy.get('#image1').selectFile(`cypress/fixtures/${imagePath}`, { force: true })
    cy.get('#image2').selectFile(`cypress/fixtures/${imagePath}`, { force: true })

    // Fill in product details
    cy.get('input[placeholder="Type here"]').type('Test T-Shirt')
    cy.get('textarea[placeholder="Write content here"]').type('This is a test product.')

    cy.get('select').eq(0).select('Men') // Category
    cy.get('select').eq(1).select('Topwear') // Sub Category

    cy.get('input[type="Number"]').type('39.99')

    // Select sizes
    cy.contains('S').click()


    // Check bestseller
    cy.get('#bestseller').check()

    // Submit form
    cy.contains('button', 'ADD').click()

    // Confirm success toast
    cy.contains('Product Added', { timeout: 20000 }).should('be.visible')
  })
})
