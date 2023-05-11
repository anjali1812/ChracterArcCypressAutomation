import * as uihelper from "../../libs/admin/uihelper";
let studentData= require("../fixtures/StudentReports.json")

describe("Student Reports test suite", function(){
    it("1. Verify Student Reports Are Shown", function(){
        uihelper.launchUrl(studentData.url)
        uihelper.login(studentData.login.email, studentData.login.password, studentData.login.loginButtonText)
        uihelper.clickElementWithXpath("//a//p[text()='"+studentData.studentReport.CSAS+"']")
        uihelper.verifyReadOnlyText("Student Report")
        uihelper.assertElementUsingLocator("//div[contains(@class,'user_card')]")
    })

    it("2. Verify Pagination Division", function(){
        uihelper.launchUrl(studentData.url)
        uihelper.login(studentData.login.email, studentData.login.password, studentData.login.loginButtonText)
        uihelper.clickElementWithXpath("//a//p[text()='"+studentData.studentReport.CSAS+"']")
        uihelper.assertElementUsingLocator(".custom-pagination")
    })

    it("3. Verify Particular Page is selected in Pagination and only that page is active", function(){
        uihelper.launchUrl(studentData.url)
        uihelper.login(studentData.login.email, studentData.login.password, studentData.login.loginButtonText)
        uihelper.clickElementWithXpath("//a//p[text()='"+studentData.studentReport.CSAS+"']")
        uihelper.clickLink("3")
        uihelper.assertElementUsingLocator("//a[@aria-label='Page 3 is your current page']")
    })

    it("4. Verify Next Should take exactly to next page in pagination", function(){
        uihelper.launchUrl(studentData.url)
        uihelper.login(studentData.login.email, studentData.login.password, studentData.login.loginButtonText)
        uihelper.clickElementWithXpath("//a//p[text()='"+studentData.studentReport.CSAS+"']")
        uihelper.clickLink("1")
        uihelper.clickElementWithXpath("//li[@class='next-pagination']")
        uihelper.assertElementUsingLocator("//a[@aria-label='Page 2 is your current page']")
    })

    it("5. Verify Previous Should take exactly to previous page in pagination", function(){
        uihelper.launchUrl(studentData.url)
        uihelper.login(studentData.login.email, studentData.login.password, studentData.login.loginButtonText)
        uihelper.clickElementWithXpath("//a//p[text()='"+studentData.studentReport.CSAS+"']")
        uihelper.clickLink("2")
        uihelper.clickElementWithXpath("//li[@class='previous-pagination']")
        uihelper.assertElementUsingLocator("//a[@aria-label='Page 1 is your current page']")
    })

    it("6. Verify Previous is not displayed if on first page", function(){
        uihelper.launchUrl(studentData.url)
        uihelper.login(studentData.login.email, studentData.login.password, studentData.login.loginButtonText)
        uihelper.clickElementWithXpath("//a//p[text()='"+studentData.studentReport.CSAS+"']")
        uihelper.clickLink("1")
        uihelper.assertElementNotPresentUsingLocator("//li[@class='previous-pagination disable-pagination']")
    })

    it("7. Verify Next is not displayed if on last page", function(){
        uihelper.launchUrl(studentData.url)
        uihelper.login(studentData.login.email, studentData.login.password, studentData.login.loginButtonText)
        uihelper.clickElementWithXpath("//a//p[text()='"+studentData.studentReport.CSAS+"']")
        uihelper.clickLink("1")
        uihelper.moveToLastInPagination()
        uihelper.assertElementNotPresentUsingLocator("//li[@class='next-pagination disable-pagination']")
    })

    it("8. Verify Searched Student Not present", function(){
        uihelper.launchUrl(studentData.url)
        uihelper.login(studentData.login.email, studentData.login.password, studentData.login.loginButtonText)
        uihelper.clickElementWithXpath("//a//p[text()='"+studentData.studentReport.CSAS+"']")
        cy.wait(5000)
        uihelper.setInputUsingPlaceHolder(studentData.studentReport.searchbox,"121")
        cy.wait(2000)
        uihelper.verifyToastMessage("student Identification Key 121 Not Found")
        uihelper.verifyReadOnlyText("No students found")
    })

    it("9. Verify Exactly Searched Student present", function(){
        uihelper.launchUrl(studentData.url)
        uihelper.login(studentData.login.email, studentData.login.password, studentData.login.loginButtonText)
        uihelper.clickElementWithXpath("//a//p[text()='"+studentData.studentReport.CSAS+"']")
        cy.wait(5000)
        uihelper.setInputUsingPlaceHolder(studentData.studentReport.searchbox,"145")
        cy.wait(2000)
        uihelper.assertElementUsingLocator("//div[contains(@class,'user_card')]//p[text()='145']")
    })

    it("10. Verify partial Searched Student present", function(){
        uihelper.launchUrl(studentData.url)
        uihelper.login(studentData.login.email, studentData.login.password, studentData.login.loginButtonText)
        uihelper.clickElementWithXpath("//a//p[text()='"+studentData.studentReport.CSAS+"']")
        cy.wait(5000)
        uihelper.setInputUsingPlaceHolder(studentData.studentReport.searchbox,"12")
        cy.wait(2000)
        uihelper.assertElementUsingLocator("//div[contains(@class,'user_card')]//p[contains(text(),'12')]")
    })

    it("11. Download report of Searched Student", function(){
        uihelper.launchUrl("https://svadhi.globalvoxprojects.com/")
        uihelper.login("svadhi@admin.com", "Admin@1234", "Login")
        uihelper.clickElementWithXpath("//a//p[text()='Character Skill Assesment Score']")
        cy.wait(5000)
        uihelper.setInputUsingPlaceHolder("Student ID Search...","434")
        cy.wait(10000)
        uihelper.clickButton("Download")

        cy.task("waitForFileToDownload", String(Cypress.config("downloadsFolder") + "\\434_Character_Arc.pdf"))
        cy.task("pdf_file_read", String(Cypress.config("downloadsFolder") + "\\434_Character_Arc.pdf")).then( (fileContent)=>{

        // cy.task("readFileMaybe", "C:\\AnjaliParmar\\DemoCypress\\results\\D_2023-5-5_T_8-57-23\\donwloads\\145_Character_Arc.pdf").then( (fileContent)=>{

        // cy.task("readFileMaybe", "C:\\AnjaliParmar\\AnjaliMacData\\Anjali_Resume_QA.pdf").then( (fileContent)=>{
            // cy.log(  ">>>>>>>>>>>>>>"+String(fileContent) +"<<<<<<<<<<<<<<<<<<")

            if(String(fileContent).toLowerCase() === "" || String(fileContent).toLowerCase() != null)
                cy.log("FAILED")
            else
                cy.log(String(fileContent))
        } )

        // uihelper.setInputUsingPlaceHolder("Student ID Search...","494")
        // cy.wait(10000)
        // uihelper.clickButton("Download")

        // cy.task("waitForFileToDownload", String(Cypress.config("downloadsFolder") + "\\494_Character_Arc.pdf"))

        // cy.task("log","This is console log")
    })

    it.only("12. Download report of Multiple students", function(){
        uihelper.launchUrl("https://svadhi.globalvoxprojects.com/")
        uihelper.login("svadhi@admin.com", "Admin@1234", "Login")
        uihelper.clickElementWithXpath("//a//p[text()='Character Skill Assesment Score']")
        cy.wait(5000)
      
        uihelper.verifyMultipleFilesDownload("239;362;20;102;0;494")
        // uihelper.verifyMultipleFilesDownload("434;359;128;102;189")
    })
})