describe('Request API tests', () => {
	let product = require('../../fixtures/testapi')
	it('Tester musique', () => {
		cy.product(product[0].q, product[0].type, product[0].info, product[0].limit)
		
	})
	it('tester film', () => {
		cy.product(product[1].q, product[1].type, product[1].info, product[1].limit)
    })
    it('tester info', () => {
		cy.product(product[2].q, product[2].type, product[2].info, product[2].limit)
    })
    it('tester limit', () => {
		cy.product(product[3].q, product[3].type, product[3].info, product[3].limit)
    })
    it('tester q', () => {
		cy.product(product[4].q, product[4].type, product[4].info, product[4].limit)
	})
})