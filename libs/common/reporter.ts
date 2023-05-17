const addContext = require('mochawesome/addContext');
// const dateformat = require("dateformat")
import dateformat from "dateformat";

export let contextMessages : any[]=[]
let now= new Date()

export function clearContext() {
    contextMessages = []
}

export async function info(value: string,screenShot: boolean) {
    let contMsg : any= {}

    contMsg.text= value

    if(screenShot)
        contMsg.img= await takeScreenShot()
    else
        contMsg.img=null

    contextMessages.push(contMsg)
    return;
 }
 
 export async function pass(value: string,  screenShot? : boolean) {
  
    let contMsg : any= {}

    contMsg.text= value

    if(screenShot)
        contMsg.img= await takeScreenShot()
    else
        contMsg.img=null

    contextMessages.push(contMsg)

    // console.log(">>> " + value)
    // console.log("LENGHT : " + contextMessages.length)

    // console.log("PASS >>>>>>>> " + contMsg.text + " <<<<<<<<< " + contMsg.img)

    return;
 }
 
 export async function fail(value: string, screenShot? : boolean) {
    let contMsg : any= {}

    contMsg.text= value
    if(screenShot)
        contMsg.img= await takeScreenShot()
    else
        contMsg.img=null

    contextMessages.push(contMsg)

    throw new Error("Failed : " + value)
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

 
export async function takeScreenShot(){
    const runDate = new Date();

    let ss_name :string =  runDate.getHours() + "-" + runDate.getMinutes() + "-" + runDate.getSeconds() + "-" + runDate.getMilliseconds()
    let ss_path= String( Cypress.config("screenshotsFolder") + "\\" + Cypress.spec.name + "\\" + ss_name + ".png")

    cy.screenshot(ss_name).then(()=>{ cy.wait(2000)})
    return ss_path
 }

 export async function addToContext() {
    
    // console.log( ">>>>>>>>>>" + contextMessages.length)

    Cypress.on('test:after:run', (test) => {
        
    if(test.final){
        contextMessages.forEach( function(msg){
            addContext({ test }, {
            title: msg.text ,
            value: msg.img
        })
        
        } )

        contextMessages= []
    }
        
        
    });    
 }