import user from '../../fixtures/users.json';
chai.use(require("chai-sorted"));

describe('this test logs in and verifies content on the home page', () => {

  beforeEach(() => {
    // this command logs in using the standard user username and password
    cy.logIn(user.standard_user, user.password);
  
  })
  
  it('tests homepage content', () => {

    // verifying the URL to ensure we are on the right page
    cy.url().should('include', '/inventory')

    // expecting the class inventory item to be on the page 6 times
    cy.get('.inventory_item').should('have.length', 6);

    // a cy.get actually performs an assertion, so if you are just looking for an item on a page, a cy.get will certify that it's there
    // if your developers are writing the app in REACT, class names and IDs are often dynamically generated, so getting a more reliable 
    // selector, like a data-cy, or a data-id of some kind is often a good decision
    cy.get('#item_4_title_link');

    // if you are having trouble finding a selector with CSS, you can use xpath if you install the cypress-xpath libray
    cy.xpath('//div[contains(text(), "Sauce Labs Bike Light")]');

    // another way to find a unique element with cypress is using .contains to locate text on that element
    cy.get('.inventory_item_name').contains('Sauce Labs Bolt T-Shirt');

    // if using .contains a .should('exist') is somewhat repetitve. However, I do find that using exist is a helpful visual cue for new testers
    cy.get('.inventory_item_name').contains('Sauce Labs Fleece Jacket').should('exist');

    // when using visible, if the element really isn't visible on the page, this call can fail when an exist would pass
    cy.get('.inventory_item_name').contains('Sauce Labs Onesie').should('be.visible');

    // the title of this item is a little wonky, so I used part of the description to locate it
    // since this item is furthest down the page, I opted to just use the exist
    cy.get('.inventory_item_desc').contains('This classic Sauce Labs t-shirt').should('exist');
    
  });
    
})

