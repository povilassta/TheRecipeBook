describe('My First Test', () => {
  beforeEach(() => {
    // Intercept requests and return mock data
    cy.fixture('recipes.json').then((res) => {
      cy.intercept('POST', '/api/recipes', res);
    });
    cy.fixture('categories.json').then((res) => {
      cy.intercept('GET', '/api/categories', res);
    });
    cy.fixture('images/gb.svg').then((img) => {
      cy.intercept('GET', '/icons/gb.svg', img);
    });
    cy.fixture('images/lt.svg').then((img) => {
      cy.intercept('GET', '/icons/lt.svg', img);
    });
  });

  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Variety of silly Recipes');
    cy.get('div[class=card]').should('exist');
  });

  it('Changes language to Lithuanian and back to english', () => {
    cy.visit('/');
    cy.contains('Variety of silly Recipes');
    cy.get('[aria-label="Language menu trigger"]').click();
    cy.get('button').contains('LT').click();
    cy.contains('Smagių receptų įvairovė').should('exist');
    cy.get('[aria-label="Language menu trigger"]').click();
    cy.get('button').contains('EN').click();
    cy.contains('Variety of silly Recipes').should('exist');
  });

  it('Displays popup when request fails', () => {
    cy.intercept('post', '/api/recipes', {
      statusCode: 500,
    });
    cy.visit('/');
    cy.contains('Something went wrong').should('exist');
  });

  it('Redirects to 404', () => {
    cy.visit('/someroutethatdefinitelydoesnotexist');
    cy.contains(404).should('exist');
    cy.url().should('include', '/404');
    cy.contains('Go back home').click();
    cy.url().should('include', '/recipes');
  });
});
