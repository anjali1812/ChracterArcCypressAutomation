import * as uihelper from "../../../libs/admin/uihelper";
import * as reporter from "../../../libs/common/reporter";

describe("User4 doenload report", function(){

    this.beforeEach(function(){
        reporter.clearContext()        
    })

    this.afterEach(function(){
        console.log("AFTER EACH")
        reporter.addToContext()
    })

    it("1. Download report", function(){
        uihelper.launchUrl("https://svadhi.globalvoxprojects.com/")
        uihelper.login("svadhi@admin.com", "Admin@1234", "Login")
        uihelper.verifyFileDownload("55")

    })
})