describe("Rest API", function(){
    it("Get Call", function(){
        cy.request({
            method: "GET",
            url : "https://gorest.co.in/public/v2/posts",
            headers : {
                "Authorization" : "Bearer 02d6354a267117606049840b3b275aba2fb1c539270544e627861855e89b8379"
            }
        }).then(function(response){
            cy.log(JSON.stringify(response.body))
            expect(response.status).to.eq(200)
        })
    })

    it("Get Call For Particular User", function(){
        cy.request({
            method: "GET",
            url : "https://gorest.co.in/public/v2/posts/26088",
            headers : {
                "Authorization" : "Bearer 02d6354a267117606049840b3b275aba2fb1c539270544e627861855e89b8379"
            }
        }).then(function(response){
            cy.log(JSON.stringify(response.body.id))
            expect(response.body.id).to.eq(26088)
            expect(response.status).to.eq(200)
        })
    })

    it("Post Call", function(){
        cy.request({
            method: "POST",
            url: "https://gorest.co.in/public/v2/users",
            headers : {
                "Authorization" : "Bearer 02d6354a267117606049840b3b275aba2fb1c539270544e627861855e89b8379"
            },
            body :
            {
                "id":1211,
                "name":"Vaishnavi Pillai",
                "email":"pillai_vaishnavi1103@collier.example",
                "gender":"female",
                "status":"inactive"
            }
        }).then( function(response){
            cy.log(JSON.stringify(response.body))
        })
    })

    
})