import { environment } from '../../src/environments/environment';
import { LoginResponse } from '../../src/app/models/loginResponse.model';
import * as moment from 'moment';

const apiUrl = environment.baseUrl;

describe('Authenticated tests', () => {
  beforeEach(() => {
    // Set aliases for request
    cy.intercept('post', '/api/recipes').as('getRecipes');
    cy.intercept('get', '/api/recipes/*').as('getRecipe');
    cy.intercept('get', '/api/recipes/*/comments').as('getComments');
    cy.intercept('get', '/api/categories').as('getCategories');

    // Login
    cy.request('post', `${apiUrl}/login`, {
      email: 'test@test.com',
      password: 'test',
    })
      .its('body')
      .then((body: LoginResponse) => {
        window.localStorage.setItem('token', body.token);
        window.localStorage.setItem('user', JSON.stringify(body.user));
        window.localStorage.setItem(
          'expiresAt',
          JSON.stringify(moment().add(1, 'h').valueOf())
        );
      });

    // Visit Homepage
    cy.visit('/');
  });

  it('creates a recipe', () => {
    cy.get('.navbar__links a').contains('Share your own recipe!').click();
    cy.url().should('include', '/create');
    cy.wait(3000); // WAIT FOR SNAPSHOT
    cy.percySnapshot('Create recipe form'); // SNAPSHOT
    cy.contains('Submit').should('be.disabled');
    // Input data
    cy.get('[formcontrolname=title]').type('RECIPE USED IN E2E TESTING');
    // Open select box and select first category
    cy.get('[formcontrolname=categories]').click();
    cy.get('mat-option').first().click();
    // Close select box
    cy.get(
      '[class="cdk-overlay-backdrop cdk-overlay-transparent-backdrop cdk-overlay-backdrop-showing"]'
    ).click();
    cy.get('[formcontrolname=currentInstruction]').type('INSTRUCTION');
    cy.get('#addIns').click();
    cy.get('[formcontrolname=currentIngredient]').type('INGREDIENT');
    cy.get('#addIng').click();
    // Select image
    cy.fixture('images/test.jpg')
      .then((file) => {
        return Cypress.Blob.base64StringToBlob(file);
      })
      .then((fileBlob) => {
        cy.get('input[type=file]').attachFile({
          fileContent: fileBlob,
          fileName: 'test.jpg',
          mimeType: 'image/jpg',
        });
      });
    cy.contains('Submit').should('not.be.disabled').click();
    cy.url().should('include', '/recipes');
  });

  it('creates a comment', () => {
    cy.contains('RECIPE USED IN E2E TESTING').first().click();
    cy.contains('Submit').should('be.disabled');
    cy.get('textarea').type('TEST COMMENT USED IN E2E TESTING');
    cy.contains('Submit').should('not.be.disabled').click();
    cy.wait('@getComments');
    cy.contains('TEST COMMENT USED IN E2E TESTING').should('exist');
    cy.wait(3000); // WAIT FOR SNAPSHOT
    cy.percySnapshot("Recipe page (Owner's POV)"); // SNAPSHOT
  });

  it('edits a recipe', () => {
    cy.contains('RECIPE USED IN E2E TESTING').first().click();
    cy.get('[aria-label="Recipe options menu button"]').click();
    cy.get('a').contains('Edit').click();
    cy.url().should('include', 'edit');
    cy.wait(3000); // WAIT FOR SNAPSHOT
    cy.percySnapshot('Edit recipe form'); // SNAPSHOT
    cy.get('[formcontrolname=title]').type(' EDITED');
    cy.contains('Submit').should('not.be.disabled').click();
    cy.contains('RECIPE USED IN E2E TESTING EDITED').should('exist');
  });

  it('deletes a recipe', () => {
    cy.intercept('delete', '/api/recipes/**').as('deleteRecipe');
    cy.contains('RECIPE USED IN E2E TESTING EDITED').first().click();
    cy.get('[aria-label="Recipe options menu button"]').click();
    cy.get('button').contains('Delete').click();
    cy.wait(3000); // WAIT FOR SNAPSHOT
    cy.percySnapshot('Recipe delete dialog'); // SNAPSHOT
    cy.get('button').contains('Yes').click();
    cy.wait('@deleteRecipe');
    cy.url().should('include', '/recipes');
    cy.contains('RECIPE USED IN E2E TESTING EDITED').should('not.exist');
  });

  it('signs out', () => {
    cy.get('.navbar__links a')
      .contains('Share your own recipe!')
      .should('exist');
    cy.wait(3000); // WAIT FOR SNAPSHOT
    cy.percySnapshot("Authenticated user's homepage"); // SNAPSHOT
    cy.get('button').contains('janedoe39').click();
    cy.get('button').contains('Sign out').click();
    cy.contains('Sign in').should('exist');
  });
});
