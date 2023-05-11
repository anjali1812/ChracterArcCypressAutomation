import * as uihelper from "../../libs/admin/uihelper";

describe("Login Test Suite", function(){
    it("1. Login with correct username and password", function(){
        uihelper.launchUrl("https://svadhi.globalvoxprojects.com/")
        uihelper.login("svadhi@admin.com","Admin@1234","Login")
        uihelper.logout()
    })

    it("2. Login with correct username and password and verify TOAST and Home Page Url", function(){
        uihelper.launchUrl("https://svadhi.globalvoxprojects.com/")
        uihelper.login("svadhi@admin.com","Admin@1234","Login")
        uihelper.verifyToastMessage("user login successfully")
        uihelper.logout()
    })

    it("3. Login with incorrect username and password and verify login failure TOAST Message", function(){
        uihelper.launchUrl("https://svadhi.globalvoxprojects.com/")
        uihelper.login("svadhi@admin.com","Admin@123","Login")
        uihelper.verifyToastMessage("login wrong credentials")
    })

    it("4. Verify Email is required", function(){
        uihelper.launchUrl("https://svadhi.globalvoxprojects.com/")
        uihelper.clickElementWithXpath("//label[contains(text(),'Email')]//following::input[1]")
        cy.xpath("//label[contains(text(),'Email')]//following::input[1]").tab()
        uihelper.assertElementUsingLocator("//*[normalize-space(text())='Required' or normalize-space()='Required']")
    })

    it("5. Verify Password is required", function(){
        uihelper.launchUrl("https://svadhi.globalvoxprojects.com/")
        uihelper.clickElementWithXpath("//label[contains(text(),'Password')]//following::input[1]")
        cy.xpath("//label[contains(text(),'Password')]//following::input[1]").tab()
        uihelper.assertElementUsingLocator("//*[normalize-space(text())='Required' or normalize-space()='Required']")  
    })

    it("6. Verify Email is valid Email Id", function(){
        uihelper.launchUrl("https://svadhi.globalvoxprojects.com/")
        uihelper.setInInputText("Email", "svadhi")
        cy.xpath("//label[contains(text(),'Email')]//following::input[1]").tab()
        uihelper.assertElementUsingLocator("//*[normalize-space(text())='Must be a valid email' or normalize-space()='Must be a valid email']")
    })

    it("7. Password must be hidden", function(){
        uihelper.launchUrl("https://svadhi.globalvoxprojects.com/")
        uihelper.setInInputText("Password", "Admin@1234")
        uihelper.assertElementUsingLocator("//input[@name='password' and @type='password']")
    })

    it("8. Password unhidden after click on Unhide", function(){
        uihelper.launchUrl("https://svadhi.globalvoxprojects.com/")
        uihelper.setInInputText("Password", "Admin@1234")
        uihelper.clickElementWithXpath("//button/*[@data-testid='VisibilityIcon']")
        uihelper.assertElementUsingLocator("//input[@name='password' and @type='text']")        
    })

    it("9. Logging without Email and Password . Verify Required on Email and Password", function(){
        uihelper.launchUrl("https://svadhi.globalvoxprojects.com/")
        uihelper.clickButton("Login")
        uihelper.clickButton("Login")
        uihelper.assertElementUsingLocator("//label[text()='Email']//../p[text()='Required']")

        uihelper.setInInputText("Email","svadhi@admin.com")
        uihelper.clickButton("Login")
        uihelper.clickButton("Login")
        uihelper.assertElementUsingLocator("//label[text()='Password']//../p[text()='Required']")
    })

    it("10. Verify Password Constraints", function(){
        uihelper.launchUrl("https://svadhi.globalvoxprojects.com/")
        uihelper.setInInputText("Password", "anjali")
        uihelper.clickButton("Login")
        uihelper.assertElementUsingLocator("//*[normalize-space(text())='Minimum 8 Characters, at least 1 Uppercase letter, at least 1 Lowercase letter, at least 1 Number and at least 1 Special Character' or normalize-space()='Minimum 8 Characters, at least 1 Uppercase letter, at least 1 Lowercase letter, at least 1 Number and at least 1 Special Character']")
        cy.reload() 
        
        uihelper.launchUrl("https://svadhi.globalvoxprojects.com/")
        uihelper.setInInputText("Password", "Anjali")
        uihelper.clickButton("Login")
        uihelper.assertElementUsingLocator("//*[normalize-space(text())='Minimum 8 Characters, at least 1 Uppercase letter, at least 1 Lowercase letter, at least 1 Number and at least 1 Special Character' or normalize-space()='Minimum 8 Characters, at least 1 Uppercase letter, at least 1 Lowercase letter, at least 1 Number and at least 1 Special Character']")
        cy.reload() 

        uihelper.launchUrl("https://svadhi.globalvoxprojects.com/")
        uihelper.setInInputText("Password", "Anj@li")
        uihelper.clickButton("Login")
        uihelper.assertElementUsingLocator("//*[normalize-space(text())='Minimum 8 Characters, at least 1 Uppercase letter, at least 1 Lowercase letter, at least 1 Number and at least 1 Special Character' or normalize-space()='Minimum 8 Characters, at least 1 Uppercase letter, at least 1 Lowercase letter, at least 1 Number and at least 1 Special Character']")
        cy.reload() 

        uihelper.launchUrl("https://svadhi.globalvoxprojects.com/")
        uihelper.setInInputText("Password", "Anj@li1")
        uihelper.clickButton("Login")
        uihelper.assertElementUsingLocator("//*[normalize-space(text())='Minimum 8 Characters, at least 1 Uppercase letter, at least 1 Lowercase letter, at least 1 Number and at least 1 Special Character' or normalize-space()='Minimum 8 Characters, at least 1 Uppercase letter, at least 1 Lowercase letter, at least 1 Number and at least 1 Special Character']")
    })
})