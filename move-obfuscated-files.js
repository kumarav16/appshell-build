// *******************************************************************************
//  * BH [Highly] Confidential
//  * [Unpublished] Copyright 2020.  Baker Hughes
//  * 
//  * NOTICE:  All information contained herein is, and remains the property of Baker Hughes, and/or
//  * its affiliates. The intellectual and technical concepts contained herein are proprietary to Baker Hughes
//  * and/or its affiliates and may be covered by patents, copyrights, and/or trade secrets.  Dissemination of this information or 
//  * reproduction of this material is strictly forbidden unless prior written permission is obtained from Baker Hughes.
// ****************************************************************************** 

const fs = require('fs'), fs_extra = require('fs-extra');

function moveFiles(dir, old_path, new_path){
    try {
        fs.rmdirSync(dir, { recursive: true });
        console.log("1. Static files removed from client build.");
    } catch (err) {
        console.error(`Error while deleting ${dir}.`);
    }
//     fs.rmdirSync("jsdefender.config.json", { recursive: true });
//     console.log("2. jsdefender config removed");
    fs_extra.move(old_path, new_path, err => {
        if(err) return console.error(err);
        console.log('3. Obfuscated files moved to build.');
        fs.rmdirSync("obfuscateclient", { recursive: true });
        console.log("4. Original obfuscated directory removed");
    });
}
moveFiles("client/build/static/js", "obfuscateclient/build/static/js", "client/build/static/js");
