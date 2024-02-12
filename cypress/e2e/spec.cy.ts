describe('Homepage', () => {
  it('should open the home page by default', () => {
    cy.visit('/');

    cy.contains('Demo Application');
    cy.get('h1').should('contain', 'Demo Application');
    cy.url().should('contain', '/home');
  });
});
