// *******************************************************************************
//  * BH [Highly] Confidential
//  * [Unpublished] Copyright 2020.  Baker Hughes
//  * 
//  * NOTICE:  All information contained herein is, and remains the property of Baker Hughes, and/or
//  * its affiliates. The intellectual and technical concepts contained herein are proprietary to Baker Hughes
//  * and/or its affiliates and may be covered by patents, copyrights, and/or trade secrets.  Dissemination of this information or 
//  * reproduction of this material is strictly forbidden unless prior written permission is obtained from Baker Hughes.
// ****************************************************************************** 
var fs = require('fs');
const path = require('path');

/*
function safeCodeOnlyForLocal(moveFrom,moveTo){
  fs.mkdir(path.join(moveFrom, 'copy'), (err) => {
    if (err) {
        return console.error(err);
    }
    fs.readdirSync(moveFrom).forEach(function (file, index) {
      var fromPath = moveFrom + "/" + file;
      var toPath = moveTo + "/" + file;
      fs.rename(fromPath, toPath, function (err) {
        if (err) throw err
        console.log('Successfully renamed - AKA moved!')
      })
    });
    
  });
}
*/
function writeFolder(moveFrom, moveTo) {
 
  if (fs.existsSync(moveFrom) && fs.lstatSync(moveFrom).isDirectory()) {
    fs.readdirSync(moveFrom).forEach(function (file, index) {
      var fromPath = moveFrom + "/" + file;
      var toPath = moveTo + "/" + file;
      if (fs.lstatSync(fromPath).isDirectory()) { 
        writeFolder(fromPath, toPath);
      } else if (file.endsWith(".js")) { 
        replaceContents(toPath, fromPath, err => {
          if (err) {
            throw err;
          }
          console.log('done');
        });
        replaceContentsSync(fromPath, toPath);
      }
    });
  }
};

function replaceContents(file, replacement, cb) {
  fs.readFile(replacement, (err, contents) => {
    if (err) return cb(err);
    fs.writeFile(file, contents, cb);
  });

}

function replaceContentsSync(file, replacement) {
  var contents = fs.readFileSync(replacement);
  fs.writeFileSync(file, contents);

}
function deleteFolderRecursive(path) {
  if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
    fs.readdirSync(path).forEach(function (file, index) {
      var curPath = path + "/" + file;

      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else { 
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

//safeCodeOnlyForLocal("server/src","server/src/copy");

writeFolder("server/build/src", "protected");

// deleteFolderRecursive("obfuscateServer"); 