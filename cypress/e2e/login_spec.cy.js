describe('Login spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/auth')
    cy.get('#email').type('test@test.com')
    cy.get('#password').type('123456')
    cy.get("#btn1").click()
  })
})