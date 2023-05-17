import * as reporter from "../common/reporter";
// var fs = require('fs');
import fs from "fs"
import pdfParser from 'pdf-parse'

export async function launchUrl(url : string){
    cy.visit(url);
    reporter.pass("Launched " + url, true)
}

export async function login(username: string, password: string, buttonText: string){
    setInInputText("Email",username);
    setInInputText("Password", password)

    clickButton(buttonText)

    reporter.pass(username + " logged in successfully", true)
}

export async function clickElementWithXpath(xpath: string){
    cy.xpath(xpath)
    .click()
    .then(
        function(){
            cy.wait(2000)
        }
    )

    reporter.pass("Clicked on xpath" + xpath, true)
}

export async function verifyReadOnlyText(text : string){
    cy.xpath("//*[normalize-space(text())='"+text+"' or normalize-space()='"+text+"']").should("be.visible")
    reporter.pass("Text [ " + text + " ] is visible", true)
}

export async function assertElementUsingLocator(locator:string){

    if( locator.includes("//") )
        cy.xpath(locator).should("be.visible")
    else
        cy.get(locator).should("be.visible")
    reporter.pass("Found element with xpath [ " + locator + " ]", true)
}

export async function assertElementNotPresentUsingLocator(locator:string){

    if( locator.includes("//") )
        cy.xpath(locator).should("not.be.visible")
    else
        cy.get(locator).should("not.be.visible")
    reporter.pass("Not Found element with xpath [ " + locator + " ] as expected", true)
}

export async function setInInputText(label : string,text: string){
    cy.xpath("//label[contains(text(),'"+label+"')]//following::input[1]").clear().then(()=>{ cy.wait(500) })

    cy.xpath("//label[contains(text(),'"+label+"')]//following::input[1]").type(text).then(()=>{ cy.wait(100) })
    reporter.pass("Value " + text + " entered in " + label + " inputbox", true)
}

export async function setInputUsingPlaceHolder(label: string, text: string){
    cy.xpath("//input[@placeholder='"+label+"']").clear().then(()=>{ cy.wait(500) })

    cy.xpath("//input[@placeholder='"+label+"']").type(text).then(()=>{ cy.wait(100) })
    reporter.pass("Value " + text + " entered in " + label + " inputbox", true)
}

export async function verifyMultipleFilesDownload(studentIds: string){

    reporter.info("Downloading Reports of multiple students" , true)

    let studentID= studentIds.split(";")

    // for (let i = 0; i < studentID.length; i++) {
    //     cy.xpath("//p[text()='"+studentID[i]+"']/..//following-sibling::button[@title='Download']").click()   
    // }

    let i=0
    const max=10
    cy.xpath("//button[@title='Download']")
    .each( async function($elem, index) {

        if (i === max) return false;

        cy.wrap($elem).click()
        
        i++
        return;
        
    }).then(
        function(){
            cy.task("waitForMultipleFilesToDownload", i , {timeout : 1000000}).then( function(timeTakenToCompleteDownload){
                reporter.pass(i + " Number of files in downloads folder is downloaded in : " + timeTakenToCompleteDownload + " seconds", false)
            } )
        }
    )
}

export async function verifyFileDownload(studentId: string){

    clickElementWithXpath("//a//p[text()='Character Skill Assesment Score']")
    cy.wait(5000)

    reporter.pass("Downloading Report of StudentID : " + studentId, true)

    setInputUsingPlaceHolder("Student ID Search...",studentId)
    cy.wait(10000)
    clickButton("Download")

    cy.task("waitForFileToDownload", String(Cypress.config("downloadsFolder") + "\\"+studentId+"_Character_Arc.pdf"), {timeout: 100000}).then( (fileDetails : any)=>{
        cy.wait(1000)

        if(String(fileDetails.fileDownloaded).includes(studentId+"_Character_Arc.pdf")){

            reporter.pass("File " + studentId+"_Character_Arc.pdf downloaded in " + fileDetails.timeTakenToDownload + " seconds", true)

            cy.task("pdf_file_read", String(Cypress.config("downloadsFolder") + "\\"+studentId+"_Character_Arc.pdf")).then( (fileContent)=>{    
                if(String(fileContent).toLowerCase() === "" || String(fileContent).toLowerCase() != null)
                    reporter.info("File Content is null")
                else
                    cy.log(String(fileContent))
            } )
        }else{
            reporter.fail("File " + studentId+"_Character_Arc.pdf not downloaded", false)
        }
        
    })
    


}

export async function clickButton(buttonText:string){
    cy.xpath("//button[text()='"+buttonText+"' or @title='"+buttonText+"']")
    .click()
    .then( ()=>{
        cy.wait(2000)
    } )

    reporter.pass("Clicked on " + buttonText, true)
}

export async function clickLink(linkName: string){
    cy.xpath("//a[.='"+linkName+"']")
    .click()
    .then( ()=>{
        cy.wait(500)
    } )

    reporter.pass("Clicked on " + linkName, true)
}

export async function verifyToastMessage(textToBeVerified: string){

    var toastFoundAt = -1;
   cy.get(".Toastify", { timeout: 5000 })
      .each(function ($ele, index) {
         const toastMsg = $ele.text();
         cy.log("Toast Text : " + toastMsg);
         if (toastMsg.toLowerCase().includes(textToBeVerified.toLowerCase())) {
            toastFoundAt = index;
            return false;
         }
         return;
      })
      .then(function () {
         if (toastFoundAt != -1) {
            reporter.pass("Toast message [ " + textToBeVerified + " ] verified successfully.", true);
         } else {
            reporter.fail("Toast message [ " + textToBeVerified + " ] not verified successfully.");
         }
         return;
      });

}

export async function logout(){
    clickLink("Logout")

    reporter.pass("Logged out successfully", true)
}

export async function moveToLastInPagination(){
    cy.xpath("//ul[@class='custom-pagination']/li[not(contains(@class,'previous-pagination')) and not(contains(@class,'next-pagination'))]")
    .should("be.visible")
    .should("have.length", 4)
    .each( function($elem, index){
        cy.wrap($elem)
        .click()
        .then( ()=>{ cy.wait(500) } )
    } )
    // .then(
    //     function(){
    //         reporter.pass(">>>>>>>>>>>>>>>>>", true)
    //     }
    // )

    reporter.pass("Moved to last page", true)
}

export async function verifyRowValueExistsInTable(values: string, section?: string){
    let colValue: string[] = values.split(";")

    let foundAtRow= -1
    let valuesFound=0
    let tableRows

    if(section){
        tableRows= cy.xpath("//*[text()='"+section+"']/..//table//tbody//tr")
    }
    else {
        tableRows= cy.xpath("//table//tbody//tr")
    }

    tableRows
    .should("be.visible")
    .each( function($elem, index){
        let rowtext= $elem.text()

        cy.log("Text of row : " + index + " is => " + rowtext )

        for(let i=0; i< colValue.length; i++){
            if(rowtext.toLowerCase().includes(colValue[i].toLowerCase()))
                valuesFound++
        }

        if(colValue.length===valuesFound){
            foundAtRow= index
            return false;
        }
        else{
            valuesFound=0
            return
        }
    } ).then( function(){
        if (foundAtRow != -1) {
            // let rowSelector = "table tbody tr:nth-child(" + Number(foundAtRow+ 1 ) + ")";
            // cy.log(rowSelector)
            // cy.get(rowSelector).scrollTo('bottom');
            cy.xpath("(//table//tbody//tr)[" + Number(foundAtRow+ 1 ) + "]").scrollIntoView()
            if(section)
                reporter.pass("[ " + colValue + " ] found in row " + Number(foundAtRow+ 1 ) + ". in section " + section);
            else
                reporter.pass("[ " + colValue + " ] found in row " + Number(foundAtRow+ 1 ) + ".");
            return;
        } else {
            if(section)
                reporter.fail("[ " + colValue + " ] not found in any row. in section " + section);
            else
                reporter.fail("[ " + colValue + " ] not found in any row.");
            return;
        }
    })
    
}

export async function verifyInDivisionTable(values:string, rowNumber: string, section: string){
    let colValue: string[] = values.split(";")
    let valuesFound=0

    cy.xpath("//*[text()='"+section+"']/..//div[@class='table']//div[@class='table-skill-container']["+rowNumber+"]")
    .should("be.visible")
    .each( ($elem)=>{
        let divText= $elem.text()

        cy.log("Divison Text : " + divText)
        for (let i = 0; i < colValue.length; i++) {
            if(divText.toLowerCase().includes(colValue[i].toLowerCase())){
                valuesFound++
            }
        }

        if(colValue.length===valuesFound){
            return false;
        }else{
            valuesFound=0
        }

    } ).then( ()=>{
        if(colValue.length===valuesFound){
            reporter.pass("Values : " + colValue + " found in section " + section + " at given row number " + rowNumber)
        }else{
            reporter.pass("Values : " + colValue + " NOT found in section " + section + " at given row number " + rowNumber)
        }
    } )

}
