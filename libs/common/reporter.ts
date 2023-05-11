export async function info(value: string) {
    cy.addTestContext("Info : " + value);
    cy.log("Info : " + value);
    return;
 }
 
 export async function pass(value: string,  screenShot? : boolean) {
    cy.addTestContext("Pass : " + value);
    cy.log("Pass : " + value);
    return;
 }
 
 export async function fail(value: string) {
    cy.addTestContext({
       title: "Error",
       value: value,
    });
    cy.log("Error : " + value);
    cy.get("Error : Please check last error in the log for reference...").should("not.be.ok");
 }
 