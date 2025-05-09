import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent test failures from uncaught exceptions
  return false
})