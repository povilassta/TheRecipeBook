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
    cy.contains('Smagių receptų įvairovė');
    cy.get('[aria-label="Language menu trigger"]').click();
    cy.get('button').contains('EN').click();
    cy.contains('Variety of silly Recipes');
  });
});
