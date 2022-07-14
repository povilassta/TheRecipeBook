describe('Authenticated tests', () => {
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
    // Intercept login request
    cy.fixture('login.json').then((res) => {
      cy.intercept('post', '/api/login', res);
    });

    cy.visit('/login');

    cy.get('[type=email]').type('test@test.ts');
    cy.get('[type=password]').type('password');
    cy.get('button').contains('Sign in').click();

    cy.url().should('include', '/recipes');
  });

  it('creates a comment', () => {
    cy.fixture('recipes.json').then((res) => {
      cy.intercept('get', '/api/recipes/**', res.recipes[0]);
    });
    cy.intercept('post', '/api/recipes/**/comments', {});

    cy.get('div[class=card]').first().click();
    cy.contains('Submit').should('be.disabled');
    cy.get('textarea').type('Test comment');
    cy.contains('Submit').should('not.be.disabled').click();
  });

  it('creates a recipe', () => {
    cy.intercept('post', '/api/recipes/create', {});
    cy.get('.navbar__links a').contains('Share your own recipe!').click();
    cy.url().should('include', '/create');
    cy.contains('Submit').should('be.disabled');
    // Input data
    cy.get('[formcontrolname=title]').type('TITLE');
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

  it('signs out', () => {
    cy.get('.navbar__links a')
      .contains('Share your own recipe!')
      .should('exist');

    cy.get('button').contains('test').click();
    cy.get('button').contains('Sign out').click();
    cy.contains('Sign in').should('exist');
  });
});
