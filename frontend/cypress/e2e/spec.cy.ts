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

  it('Logs in and logs out', () => {
    // Intercept login request
    cy.fixture('login.json').then((res) => {
      cy.intercept('post', '/api/login', res);
    });
    cy.visit('/');
    cy.get('.navbar__links a')
      .contains('Share your own recipe!')
      .should('not.exist');

    cy.contains('Sign in').click();

    cy.url().should('include', '/login');
    cy.get('[type=email]').type('test@test.ts');
    cy.get('[type=password]').type('password');
    cy.get('button').contains('Sign in').click();

    cy.url().should('include', '/recipes');
    cy.get('.navbar__links a')
      .contains('Share your own recipe!')
      .should('exist');

    cy.get('button').contains('test').click();
    cy.get('button').contains('Sign out').click();
    cy.contains('Sign in').should('exist');
  });

  it('Logs in and leaves a comment for a recipe', () => {
    // Intercept requests
    cy.fixture('login.json').then((res) => {
      cy.intercept('post', '/api/login', res);
    });
    cy.fixture('recipes.json').then((res) => {
      cy.intercept('get', '/api/recipes/**', res.recipes[0]);
    });
    cy.intercept('post', '/api/recipes/**/comments', {});

    cy.visit('/');
    cy.contains('Sign in').click();

    cy.url().should('include', '/login');
    cy.get('[type=email]').type('test@test.ts');
    cy.get('[type=password]').type('password');
    cy.get('button').contains('Sign in').click();

    cy.get('div[class=card]').first().click();
    cy.get('textarea').type('Test comment');
    cy.contains('Submit').click();
  });

  it('Changes language to Lithuanian', () => {
    cy.visit('/');
    cy.contains('Variety of silly Recipes');
    cy.get('[aria-label="Language menu trigger"]').click();
    cy.get('button').contains('LT').click();
    cy.contains('Smagių receptų įvairovė');
  });
  it('Log in and create recipe', () => {
    // Intercept login request
    cy.fixture('login.json').then((res) => {
      cy.intercept('post', '/api/login', res);
    });
    cy.intercept('post', '/api/recipes/create', {});
    cy.visit('/');
    cy.contains('Sign in').click();

    cy.url().should('include', '/login');
    cy.get('[type=email]').type('test@test.ts');
    cy.get('[type=password]').type('password');
    cy.get('button').contains('Sign in').click();

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
});
