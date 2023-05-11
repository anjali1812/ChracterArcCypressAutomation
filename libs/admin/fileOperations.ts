const fs = require("fs");
const path = require('path')
const pdf = require('pdf-parse');

function think(Sec: number) {
    return new Promise(resolve => setTimeout(resolve, Sec * 1000));
}

export const waitForMultipleFilesToDownload = async function waitForMultipleFilesToDownload(dirPath: string){
    await think(5)

    console.log("Files Download path is : " + dirPath)
    console.log(new Date().getMinutes() + ":" + new Date().getSeconds() + "=>" + fs.readdirSync(dirPath))

    let seconds = 0
    let dl_wait = true
    while (dl_wait && seconds < 200) {
        await think(2)
        dl_wait = false

        console.log(new Date().getMinutes() + ":" + new Date().getSeconds() + "=>" + fs.readdirSync(dirPath))

        for (let fname of fs.readdirSync(dirPath)){
            if (fname.endsWith('.crdownload')){
                dl_wait = true
            }
        }

        seconds += 1
    }

    console.log( (fs.readdirSync(dirPath)).length +" downloaded in : " + ((seconds*2)+5) + " seconds")

    await think(2)
    
    return (fs.readdirSync(dirPath)).length
}


export const waitForFileToDownload = async function waitForFileToDownload(filPath: string){

    let dir= filPath.split("\\")
    let dirPath=""
    for (let i = 0; i < dir.length -1; i++) {
        dirPath = dirPath + dir[i] + "\\"
    }

    console.log("Downloading file : " + dir[dir.length-1])

    await think(5)

    console.log("File Download path is : " + dirPath)
    // console.log(new Date().getMinutes() + ":" + new Date().getSeconds() + "=>" + fs.readdirSync(dirPath))

    let seconds = 0
    let dl_wait = true
    while (dl_wait && seconds < 50) {
        await think(2)
        dl_wait = false

        // console.log(new Date().getMinutes() + ":" + new Date().getSeconds() + "=>" + fs.readdirSync(dirPath))

        for (let fname of fs.readdirSync(dirPath)){
            if (fname.endsWith('.crdownload') && !fs.existsSync(filPath)){
                dl_wait = true
            }
        }

        seconds += 1
    }

    console.log("File " + dir[dir.length-1] +" Downloaded in : " + ((seconds*2)+5) + " seconds." )  

    await think(2)
    
    return null
}

export const pdf_file_read = (filPath: string) =>{

    return new Promise((resolve, reject) => {
    let dataBuffer = fs.readFileSync( filPath );
    pdf(dataBuffer).then(function ({text} : any) {
        if(text!= null)
            resolve(text)
        else
            resolve("File Data is NULL")

        // resolve(text)

    })
    .catch( function(err:any){
        reject(err.message)
    });

    })
}

// pdf_file_read("C:\\AnjaliParmar\\AnjaliMacData\\Anjali_Resume_QA.pdf")
