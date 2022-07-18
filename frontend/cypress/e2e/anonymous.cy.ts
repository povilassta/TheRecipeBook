describe('Anonymous tests', () => {
  beforeEach(() => {
    // Set aliases for request
    cy.intercept('post', '/api/recipes').as('getRecipes');
    cy.intercept('get', '/api/recipes/**').as('getRecipe');
    cy.intercept('get', '/api/recipes/**/comments').as('getComments');
  });

  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Variety of silly Recipes');
    cy.get('div[class=card]').should('exist');
    cy.wait('@getRecipes');
    cy.percySnapshot("Unauthenticated user's homepage"); // SNAPSHOT
  });

  it('Visits the login page and logs in', () => {
    cy.visit('/login');
    cy.contains('Sign in').should('exist');
    cy.percySnapshot('Sign in page'); // SNAPSHOT

    cy.get('[type=email]').type('test@test.com');
    cy.get('[type=password]').type('test');
    cy.get('button').contains('Sign in').click();
    cy.url().should('include', '/recipes');
  });

  it('Changes language to Lithuanian and back to english', () => {
    cy.visit('/');
    cy.wait('@getRecipes');
    cy.contains('Variety of silly Recipes');
    cy.get('[aria-label="Language menu trigger"]').click();
    cy.get('button').contains('LT').click();
    cy.contains('Smagių receptų įvairovė').should('exist');
    cy.wait(1000); // WAIT FOR SNAPSHOT
    cy.percySnapshot('Lithuanian homepage'); // SNAPSHOT
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
    cy.percySnapshot('Something went wrong homepage'); // SNAPSHOT
  });

  it('Redirects to 404', () => {
    cy.visit('/someroutethatdefinitelydoesnotexist');
    cy.contains(404).should('exist');
    cy.url().should('include', '/404');
    cy.percySnapshot('404 page'); // SNAPSHOT
    cy.contains('Go back home').click();
    cy.url().should('include', '/recipes');
  });

  it('Does not let anonymous user comment, edit, create or delete', () => {
    cy.visit('/');
    cy.get('.navbar__links a')
      .contains('Share your own recipe!')
      .should('not.exist');
    cy.get('.card').first().click();
    cy.wait('@getRecipe');
    cy.wait('@getComments');
    cy.get('[aria-label="Recipe options menu button"]').should('not.exist');
    cy.contains('Submit').should('not.exist');
    cy.contains('You must Sign in in order to comment!');
    cy.percySnapshot('Recipe page (Unauth POV)'); // SNAPSHOT
  });
});
