describe('Anonymous tests', () => {
  beforeEach(() => {});

  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Variety of silly Recipes');
    cy.get('div[class=card]').should('exist');
    cy.percySnapshot();
  });

  it('Visits the login page', () => {
    cy.visit('/login');
    cy.contains('Sign in').should('exist');
    cy.percySnapshot();
  });

  it('Changes language to Lithuanian and back to english', () => {
    cy.visit('/');
    cy.contains('Variety of silly Recipes');
    cy.get('[aria-label="Language menu trigger"]').click();
    cy.get('button').contains('LT').click();
    cy.percySnapshot();
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
    cy.percySnapshot();
  });

  it('Redirects to 404', () => {
    cy.visit('/someroutethatdefinitelydoesnotexist');
    cy.contains(404).should('exist');
    cy.url().should('include', '/404');
    cy.percySnapshot();
    cy.contains('Go back home').click();
    cy.url().should('include', '/recipes');
  });

  it('Does not let anonymous user comment, edit, create or delete', () => {
    cy.visit('/');
    cy.get('.navbar__links a')
      .contains('Share your own recipe!')
      .should('not.exist');
    cy.get('.card').first().click();
    cy.get('[aria-label="Recipe options menu button"]').should('not.exist');
    cy.contains('Submit').should('not.exist');
    cy.contains('You must Sign in in order to comment!');
    cy.percySnapshot();
  });
});
