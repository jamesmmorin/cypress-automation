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

    // adding the backpack to the checkout cart
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // verifying cart badge is visible. The be.visible is technically not necessary, however it makes the test very readable
    cy.get('.shopping_cart_badge').should('be.visible');

    // removing the item from the cart with remove button from main page
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();

    // verifying that the cart badge is now gone
    cy.get('.shopping_cart_badge').should('not.exist');

    // adding an item to the cart, and navigating to the cart page with an item in it
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_link').click();

    // verifying quantity of cart
    cy.get('.cart_quantity').should(($div) => {
      expect($div).to.have.length(1)
    })

    // removing the item from the cart. The selector for the remove button is specific to the item in the cart, which would work fine. 
    // However, if you just wanted to click ont he remove button regardless of what is in the cart, this is one way to do it. 
    cy.get('button').contains('Remove').click();

    // naving back to homepage
    cy.get('[data-test="continue-shopping"]').click();

    // verifying the URL to ensure we are on the right page
    cy.url().should('include', '/inventory');


  });
    
})

