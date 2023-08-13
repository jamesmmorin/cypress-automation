/// <reference types="cypress" />

describe('GET api tests', () =>{

it('cy.request()', () => {
    cy.request({
        method: 'GET',
        url: 'https://automationexercise.com/api/productsList',
        body: {
        },
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('products');
        cy.log(response.body.products);
    });
});

it('cy.request() part 2', () => {
    cy.request('GET', 'https://automationexercise.com/api/productsList').as('productList')

    cy.get('@productList').should((response) => {
      expect(response.status).to.eq(200)
});

});

});