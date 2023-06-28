import user from '../../fixtures/users.json';
chai.use(require("chai-sorted"));

describe('this test logs in and verifies content on the home page', () => {

  beforeEach(() => {
    // this command logs in using the standard user username and password
    cy.logIn(user.standard_user, user.password);
  
  })
  
  it('tests homepage content', () => {

    // verifying the URL to ensure we are on the right page
    cy.url().should('include', '/inventory');

    // adding an item to the cart. This should really be randomized for better e2e testing
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()

    // verifying cart badge is visible. 
    cy.get('.shopping_cart_badge').should('be.visible');

    // once an item is added to the cart, you can't add it again. Ensuring the add to cart option is no longer available for this item 
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').should('not.exist');

    // naving to cart page and verifying quantity of cart
    cy.get('.shopping_cart_link').click();

    cy.get('.cart_quantity').should(($div) => {
      expect($div).to.have.length(1)
    });

    // verifying price of item
    cy.get('.inventory_item_price').should('contain', 9.99);

    // clicking on checkout button
    cy.get('[data-test="checkout"]').click();

    // filling out user field
    cy.get('[data-test="firstName"]').type(user.firstName);
    cy.get('[data-test="lastName"]').type(user.lastName);
    cy.get('[data-test="postalCode"]').type(user.postalCode);

    // clicking on continue button
    cy.get('[data-test="continue"]').click();
    
    // verifying item. This will find the element that contains this text. You can, however, chain .contains after a cy.get, and specify 
    // the element with a unique selector first, as I do in verifying the success message below. 
    cy.contains('Sauce Labs Bike Light');
    cy.contains('9.99');

    // completing purchase
    cy.get('[data-test="finish"]').click();

    // verifying success message
    cy.get('.complete-header').contains('Thank you for your order!');


  });
    
})

