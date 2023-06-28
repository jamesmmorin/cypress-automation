import user from '../../fixtures/users.json';
chai.use(require("chai-sorted"));

describe('this test logs in and verifies content on the home page', () => {

  beforeEach(() => {
    // this command logs in using the standard user username and password
    cy.logIn(user.standard_user, user.password);
  
  })

  it('verifies sort functionality', () => {
    const itemsList = [];

    // .select() sorts select elements by default with cypress.  
    // in this case we are sorting these items alphabetically from z to a
    cy.get('[data-test="product_sort_container"]').select('Name (Z to A)');

    // verifies that the first item that has the inventory_item_name class contains the below text
    cy.get('.inventory_item_name').eq(0).should('contain.text', 'Test.allTheThings() T-Shirt (Red)')

    // sortig items on page by price low to high  
    cy.get('[data-test="product_sort_container"]').select('Price (low to high)');

    // verifies that the first item has the expected price
    cy.get('.inventory_item_price').eq(0).should('contain.text', '7.99')

    // sortig items on page by price high to low  
    cy.get('[data-test="product_sort_container"]').select('Price (high to low)');

    // verifies that the first item has the expected price
    cy.get('.inventory_item_price').eq(0).should('contain.text', '49.99')

    // sorting items z to a
    cy.get('[data-test="product_sort_container"]').select('Name (Z to A)');

    // this sets the array at the top of the test, itemsList, equal to all of the elements that are returned with .inventory_item_name
    cy.get('.inventory_item_name').each(($el) => {
      itemsList.push($el.text());
    })

    // this creates an additional array, unsorted items, of the same elements, and compares them to the separate array, itemsList, to ensure they equal each other
    // in this way we can verify an entire list against an entire list, not just the first element of the list
    cy.get('.inventory_item_name')
    .then(items => {
      const unsortedItems = items.map((index, html) => Cypress.$(html).text()).get();
      const sortedItems = itemsList;
      expect(unsortedItems, 'Items are sorted').to.deep.equal(sortedItems);

    });
    
  })

})