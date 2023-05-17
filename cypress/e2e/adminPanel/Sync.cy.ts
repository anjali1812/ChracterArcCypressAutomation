import * as uihelper from "../../../libs/admin/uihelper";
let studentData= require("../../fixtures/StudentReports.json")
import * as reporter from "../../../libs/common/reporter"

describe("Sync test suite", function(){

    this.beforeEach(function(){
        reporter.clearContext()        
    })

    this.afterEach(function(){
        console.log("AFTER EACH")
        reporter.addToContext()
    })

    it("1. Sync Inproccess TOAST", function(){
        uihelper.launchUrl(studentData.url)
        uihelper.login(studentData.login.email, studentData.login.password, studentData.login.loginButtonText)
        uihelper.clickButton("Sync")
        uihelper.verifyToastMessage("Please wait while we fetching data")
    })

    it("2. Sync In Progress Button", function(){
        uihelper.launchUrl(studentData.url)
        uihelper.login(studentData.login.email, studentData.login.password, studentData.login.loginButtonText)
        uihelper.clickButton("Sync")
        uihelper.assertElementUsingLocator("//button[@disabled and text()='Syncing...']")
    })

    it("3. Sync Proccessed TOAST", function(){
        uihelper.launchUrl(studentData.url)
        uihelper.login(studentData.login.email, studentData.login.password, studentData.login.loginButtonText)
        uihelper.clickButton("Sync")
        cy.wait(7000)
        uihelper.verifyToastMessage("Scored generated")
    })
})