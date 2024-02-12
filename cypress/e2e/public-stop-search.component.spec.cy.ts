describe('Public Stop Search', () => {
  beforeEach(() => {
    cy.visit('/stops');
  });

  it('should display search results', () => {
    cy.get('h1').should('contain', 'Search stops');
    cy.url().should('contain', '/stops/search-public-stops');

    cy.get('h2').should('contain', 'Search Criteria');

    cy.intercept(
      'GET',
      'https://start.vag.de/dm/api/v1/haltestellen.json/vgn?name=TestName',
      { fixture: 'public-stops.json' }
    ).as('searchHttpRequest');
    cy.intercept('GET', 'http://localhost:8080/favorite-stops', {
      fixture: 'favorite-stops.json',
    }).as('favoritesHttpRequest');

    cy.get('input[id=name]').clear().type('TestName');

    cy.get('button[type=submit]').contains('Search').as('searchButton').click();

    cy.wait('@searchHttpRequest').its('response.statusCode').should('eq', 200);

    cy.get('nd-public-stop-list-item').should('have.lengthOf', '2');

    cy.get('nd-public-stop-list-item mat-card-title')
      .eq(0)
      .should('contain', 'Haltestelle1 (Stadt1)');

    cy.get('nd-public-stop-list-item').eq(0).get('mat-icon').should('exist');

    cy.get('nd-public-stop-list-item mat-card-title')
      .eq(1)
      .should('contain', 'Haltestelle2 (Stadt2)');
  });

  it('should display no results in case of server error', () => {
    cy.intercept(
      'GET',
      'https://start.vag.de/dm/api/v1/haltestellen.json/vgn?name=TestName',
      { statusCode: 500, body: '500 Internal Server Error' }
    ).as('searchHttpRequest');

    cy.get('input[id=name]').clear().type('TestName');

    cy.get('button[type=submit]').contains('Search').as('searchButton').click();

    cy.wait('@searchHttpRequest');

    cy.get('nd-public-stop-list-item').should('not.exist');

    cy.get('.public-stop-list > div').should('contain', 'No stops found');
  });

  it('should display an error message and disable the search button if no criteria are given', () => {
    // touch an input
    cy.get('input[id=name]').clear().type('some text').clear();

    // switch to another input
    cy.get('input[id=lon]').focus();

    cy.get('button[type=submit]').should('be.disabled');

    cy.get('nd-form-errors mat-error').should('contain', 'must be given');
  });
});
