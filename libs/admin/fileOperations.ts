const fs = require("fs");
const path = require('path')
const pdf = require('pdf-parse');

import * as config from "../../cypress.config"

function think(Sec: number) {
    return new Promise(resolve => setTimeout(resolve, Sec * 1000));
}

export const waitForMultipleFilesToDownload = async function waitForMultipleFilesToDownload(downloadFilesNum : number){
    let seconds = 0
    await think(5)
    seconds+=5

    let dirPath= config.default.downloadsFolder
    console.log("Files Download path is : " + dirPath)
    
    if( (fs.readdirSync(dirPath)).length <= 0 )
    {
        await think(10)
        seconds +=10
    }

    console.log(new Date().getMinutes() + ":" + new Date().getSeconds() + "=>" + fs.readdirSync(dirPath))
    
    let dl_wait = true
    while (dl_wait && seconds < 200) {
        await think(2)
        dl_wait = false

        console.log(new Date().getMinutes() + ":" + new Date().getSeconds() + "=>" + fs.readdirSync(dirPath))
        
        for (let fname of fs.readdirSync(dirPath)){
            if (fname.endsWith('.crdownload') || (fs.readdirSync(dirPath)).length<downloadFilesNum){
                dl_wait = true
            }
        }

        seconds += 2
    }

    console.log( (fs.readdirSync(dirPath)).length +" downloaded in : " + (seconds) + " seconds")

    await think(2)
    
    return (seconds)
}


export const waitForFileToDownload = async function waitForFileToDownload(filPath: string){

    let dir= filPath.split("\\")
    let dirPath=""
    for (let i = 0; i < dir.length -1; i++) {
        dirPath = dirPath + dir[i] + "\\"
    }

    console.log("Downloading file : " + dir[dir.length-1])
    console.log("File Download path is : " + dirPath)
    
    let seconds = 0
    // await think(5)
    // seconds+=5

    if( (fs.readdirSync(dirPath)).length <= 0 )
    {
        await think(5)
        seconds +=5
    }

    // console.log(new Date().getMinutes() + ":" + new Date().getSeconds() + "=>" + fs.readdirSync(dirPath))

    let dl_wait = true
    while (dl_wait && seconds < 50) {
        await think(2)
        dl_wait = false

        console.log(new Date().getMinutes() + ":" + new Date().getSeconds() + "=>" + fs.readdirSync(dirPath))

        for (let fname of fs.readdirSync(dirPath)){
            if (fname.endsWith('.crdownload') || !fs.existsSync(filPath)){
                dl_wait = true
            }
        }

        seconds += 2
    }

    console.log("File " + fs.readdirSync(dirPath) +" Downloaded in : " + (seconds) + " seconds." )  

    await think(2)
    
    let fileObj:Object = {
        "timeTakenToDownload" : seconds,
        "fileDownloaded" : fs.readdirSync(dirPath)
    }

    return fileObj
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
