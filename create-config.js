// *******************************************************************************
//  * BH [Highly] Confidential
//  * [Unpublished] Copyright 2020.  Baker Hughes
//  * 
//  * NOTICE:  All information contained herein is, and remains the property of Baker Hughes, and/or
//  * its affiliates. The intellectual and technical concepts contained herein are proprietary to Baker Hughes
//  * and/or its affiliates and may be covered by patents, copyrights, and/or trade secrets.  Dissemination of this information or 
//  * reproduction of this material is strictly forbidden unless prior written permission is obtained from Baker Hughes.
// ****************************************************************************** 

const obfuscate = require('@bh-ent-tech/bh-obfuscation-adapter'),
fs = require('fs'),
obfuscateConfigobj ={
	"appFolderPath": "client/build/static/js",
	"settings": {
        "localDeclarations": {
            "nameMangling": "sequential"
        },
        "stringLiterals": false,
    }
},
obfuscateConfig = new obfuscate(obfuscateConfigobj);
obfuscateConfig.createConfigFile();
console.log("New jsdefender config created");

// var fs = require('fs');

// var config = {
//     "inputs": [],
//     "mapFile": "lexical-map.json",
//     "settings": {
//         "localDeclarations": {
//             "nameMangling": "sequential"
//         },
//         "stringLiterals": false,
//     }
// };

// function AddFilestoConfig(moveFrom, moveTo) {
//     if (fs.existsSync(moveFrom) && fs.lstatSync(moveFrom).isDirectory()) {
//       fs.readdirSync(moveFrom).forEach(function (file, index) {
//         var fromPath = moveFrom + "/" + file;
//         var toPath = moveTo + "/" + file;

//         if (fs.lstatSync(fromPath).isDirectory()) {
//             AddFilestoConfig(fromPath, toPath);
//         } else if (file.endsWith(".js")) {
//             config.inputs.push({ "in": fromPath, "out": toPath })
//         }
//       });
//     }
//     return config;
//   };
//   fs.writeFileSync('jsdefender.config.json', JSON.stringify(AddFilestoConfig("server/src", "protected")));