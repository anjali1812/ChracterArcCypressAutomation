import * as uihelper from "../../../libs/admin/uihelper";
let studentData= require("../../fixtures/StudentReports.json")
import * as reporter from "../../../libs/common/reporter"

describe("Particular Student Reports test suite ", function(){

    this.beforeEach(function(){
        reporter.clearContext()        
    })

    this.afterEach(function(){
        console.log("AFTER EACH")
        reporter.addToContext()
    })

    it("1. Verify Searched Student Report is opened", function(){
        uihelper.launchUrl(studentData.url)
        uihelper.login(studentData.login.email, studentData.login.password, studentData.login.loginButtonText)
        uihelper.clickElementWithXpath("//a//p[text()='"+studentData.studentReport.CSAS+"']")
        cy.wait(5000)
        uihelper.setInputUsingPlaceHolder(studentData.studentReport.searchbox,"145")
        cy.wait(2000)
        uihelper.clickElementWithXpath("//div[contains(@class,'user_card')]//p[text()='145']")
        uihelper.assertElementUsingLocator("//*[normalize-space(text())='Student Id: 145' or normalize-space()='Student Id: 145']")
    })

    it("2. Verify All the tabs", function(){
        uihelper.launchUrl(studentData.url)
        uihelper.login(studentData.login.email, studentData.login.password, studentData.login.loginButtonText)
        uihelper.clickElementWithXpath("//a//p[text()='"+studentData.studentReport.CSAS+"']")
        cy.wait(5000)
        uihelper.setInputUsingPlaceHolder(studentData.studentReport.searchbox,"434")
        cy.wait(2000)
        uihelper.clickElementWithXpath("//div[contains(@class,'user_card')]//p[text()='434']")

        uihelper.clickButton("Student Info")
        uihelper.assertElementUsingLocator("//button[(text()='Student Info' or @title='Student Info') and @aria-selected='true']")

        uihelper.clickButton("Academic Achivements")
        uihelper.assertElementUsingLocator("//button[(text()='Academic Achivements' or @title='Academic Achivements') and @aria-selected='true']")

        uihelper.clickButton("Holistic Development")
        uihelper.assertElementUsingLocator("//button[(text()='Holistic Development' or @title='Holistic Development') and @aria-selected='true']")

        uihelper.clickButton("Understanding your skills")
        uihelper.assertElementUsingLocator("//button[(text()='Understanding your skills' or @title='Understanding your skills') and @aria-selected='true']")

        uihelper.clickButton("Interpreting your skills")
        uihelper.assertElementUsingLocator("//button[(text()='Interpreting your skills' or @title='Interpreting your skills') and @aria-selected='true']")
    })

    it("3. Verify values in Student Info table", function(){
        uihelper.launchUrl(studentData.url)
        uihelper.login(studentData.login.email, studentData.login.password, studentData.login.loginButtonText)
        uihelper.clickElementWithXpath("//a//p[text()='"+studentData.studentReport.CSAS+"']")
        cy.wait(5000)
        uihelper.setInputUsingPlaceHolder(studentData.studentReport.searchbox,"434")
        cy.wait(2000)
        uihelper.clickElementWithXpath("//div[contains(@class,'user_card')]//p[text()='434']")

        uihelper.clickButton("Student Info")
        uihelper.verifyRowValueExistsInTable("Gende;Male")
    })

    it("4. Verify values in Academic Achivements>Performance Skills table", function(){
        uihelper.launchUrl(studentData.url)
        uihelper.login(studentData.login.email, studentData.login.password, studentData.login.loginButtonText)
        uihelper.clickElementWithXpath("//a//p[text()='"+studentData.studentReport.CSAS+"']")
        cy.wait(5000)
        uihelper.setInputUsingPlaceHolder(studentData.studentReport.searchbox,"434")
        cy.wait(2000)
        uihelper.clickElementWithXpath("//div[contains(@class,'user_card')]//p[text()='434']")

        uihelper.clickButton("Academic Achivements")
        uihelper.verifyRowValueExistsInTable("Grit;2.159")

    })

    it("5. Verify values in Academic Achivements>Performance Skills Divison Table", function(){
        uihelper.launchUrl(studentData.url)
        uihelper.login(studentData.login.email, studentData.login.password, studentData.login.loginButtonText)
        uihelper.clickElementWithXpath("//a//p[text()='"+studentData.studentReport.CSAS+"']")
        cy.wait(5000)
        uihelper.setInputUsingPlaceHolder(studentData.studentReport.searchbox,"434")
        cy.wait(2000)
        uihelper.clickElementWithXpath("//div[contains(@class,'user_card')]//p[text()='434']")

        uihelper.clickButton("Academic Achivements")
        uihelper.verifyInDivisionTable(" Grit,2.159,7.893","1","Performance Skills")

    })

    it("6. Verify values in Academic Achivements>Intellectual Skills table", function(){
        uihelper.launchUrl(studentData.url)
        uihelper.login(studentData.login.email, studentData.login.password, studentData.login.loginButtonText)
        uihelper.clickElementWithXpath("//a//p[text()='"+studentData.studentReport.CSAS+"']")
        cy.wait(5000)
        uihelper.setInputUsingPlaceHolder(studentData.studentReport.searchbox,"434")
        cy.wait(2000)
        uihelper.clickElementWithXpath("//div[contains(@class,'user_card')]//p[text()='434']")

        uihelper.clickButton("Academic Achivements")
        uihelper.verifyRowValueExistsInTable("Metacognition;0.624")
    })

    it("7. Verify values in Academic Achivements>Intellectual Skills Divison Table", function(){
        uihelper.launchUrl(studentData.url)
        uihelper.login(studentData.login.email, studentData.login.password, studentData.login.loginButtonText)
        uihelper.clickElementWithXpath("//a//p[text()='"+studentData.studentReport.CSAS+"']")
        cy.wait(5000)
        uihelper.setInputUsingPlaceHolder(studentData.studentReport.searchbox,"434")
        cy.wait(2000)
        uihelper.clickElementWithXpath("//div[contains(@class,'user_card')]//p[text()='434']")

        uihelper.clickButton("Academic Achivements")
        uihelper.verifyInDivisionTable("Metacognition,0.624,6.75","1","Intellectual Skills")

    })

})