const addContext = require('mochawesome/addContext');
// const dateformat = require("dateformat")
import dateformat from "dateformat";

export let contextMessages : any[]=[]
let now= new Date()

export async function info(value: string) {
   //  cy.addTestContext("Info : " + value);
   //  cy.log("Info : " + value);
    return;
 }
 
 export async function pass(value: string,  screenShot? : boolean) {
  
    let contMsg : any= {}

    contMsg.text= value
    contMsg.img= takeScreenShot(value)

    contextMessages.push(contMsg)

    console.log("LENGHT : " + contextMessages.length)

    // console.log("PASS >>>>>>>> " + contMsg.text + " <<<<<<<<< " + contMsg.img)

    return;
 }
 
 export async function fail(value: string) {
    let contMsg : any= {}

    contMsg.text= value
    contMsg.img= takeScreenShot(value)

    contextMessages.push(contMsg)
    console.log("LENGHT : " + contextMessages.length)
    return;

 }

 export function getTimestamp(format?: string) {

  try {
      if (format) {
          return dateformat(now,format)
      } else {
          return dateformat(now,"yymmddHMsl")
      }
  } catch (error) {
      console.log("Error")
  }

  return ""
}

 
  function takeScreenShot(value : string){
    const runDate = new Date();

    let ss_name :string =  runDate.getHours() + "-" + runDate.getMinutes() + "-" + runDate.getSeconds() + "_" + runDate.getMilliseconds()
    let ss_path= String( Cypress.config("screenshotsFolder") + "\\" + Cypress.spec.name + "\\" + ss_name + ".png")

    cy.screenshot(ss_name).then(()=>{ cy.wait(500)})
    return ss_path
 }

 export async function addToContext(textContext : any) {
    
    console.log( ">>>>>>>>>>" + contextMessages.length)

    contextMessages.forEach( function(msg){
        console.log(" <<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>> ")
        console.log(msg.text)
        addContext({test}, msg.text)
        addContext({test}, msg.img)
    } )

    // if (test.state === 'failed') {
    //     contextMessages.forEach( function( msg ){
    //         addContext({test}, msg.text)
    //         addContext({test}, msg.img)
    //     } )
    // }
    // else{
    //   addContext({ test }, "Context text Passed")
    // }
 }