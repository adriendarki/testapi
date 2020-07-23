// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add("product", (q, type, info, limit) => { 
    cy.request({
        url: 'https://tastedive.com/api/similar',
        methode: 'GET',
        qs: {
            q: q,
            type: type,
            limit: limit,
            info: info,
            k: '375546-Personne-3HDDMZ4L'
        }
    }).then(response => {
        cy.log(JSON.stringify(response.body))

       //connexion ok avec code status 200
        expect(response).to.be.ok

       
        //Test sur q(paraametre de recherche) 
         if(q !== undefined) {
            expect(response.body.Similar.Info[0].Name).to.equal(q);
        }else{
            //expect(response.code).to.be.oneOf([200, 302]);
            expect(response.body.Similar.Info[0].Name).to.equal('!!!');
        }                          
        
        
        //Test sur type      
         if(type !== undefined){
             //expect(response.body.Similar.Info[0].Type).eql(type)
             expect(response.body.Similar.Info[0].Type).to.equal(response.body.Similar.Results[0].Type)
        }else{
              expect(response.body.Similar.Results).to.be.empty
            }
        
         //test sur info
        if(info == 1){
            
            expect(response.body.Similar.Info[0]).to.have.all.keys('wTeaser', 'yID', 'yUrl','wUrl','Name', 'Type')
            
        }else{
            
            expect(response.body.Similar.Info[0]).to.not.have.all.keys('wTeaser', 'yID', 'yUrl','wUrl','Name', 'Type')
            
        }
        // Test limit
        if(limit !== undefined){
            //expect(response.body.Similar.Results).lengthOf(limit)
            expect(response.body.Similar.Results.length).to.equal(limit)
            
        }else{
            expect(response.body.Similar.Results.length).to.equal(20)
        }

        
    })
 })