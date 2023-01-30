const obfuscate = require('@bh-ent-tech/bh-obfuscation-adapter'),
fs = require('fs'),
obfuscateConfigobj ={
	"appFolderPath": "server/src",
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