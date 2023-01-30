/* 
 *  *************************************************
 *   BH [Highly] Confidential
 *   [Unpublished] Copyright 2020.  Baker Hughes
 *  
 *   NOTICE:  All information contained herein is, and remains the property of Baker Hughes, and/or
 *   its affiliates.  The intellectual and technical concepts contained herein are proprietary to Baker Hughes
 *   and/or its affiliates and may be covered by patents, copyrights, and/or trade secrets.  Dissemination of this information or
 *   reproduction of this material is strictly forbidden unless prior written permission is obtained from Baker Hughes.
 *  **************************************************
 *  
 */
//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname, 'designs');
//passsing directoryPath and callback function
function generateFile(file,clientdirectorypath){
    const componentfile=file.split('.')[0];
    const HomeDefault=`../client/src/HomeTemplate.js`;
    const layout_file=require(`./designs/${file}`);
    let jsonData = JSON.stringify(layout_file);
    const header_comp='`../components/header/${designJSON.header.componentName}`';
    
    let header_import=`
     designJSON=${jsonData};\n
    HeaderSubComponent=lazy(() => import(${header_comp}));`;

    let codeStr = `
        const { classes, theme } = this.props;
        let {name,type,StylingAttributes}=designJSON.Container.mainSection;
     
        
        return (
          <div className={classes.root}>
            <CssBaseline />
            
            <Suspense 
            fallback={<div style={{opacity:"0",backgroundColor:"#05322B"}}>
            Loading...</div>}>
            <HeaderSubComponent
            handleDrawerOpen={this.handleDrawerOpen} 
            history={this.props.history}
            handleDrawerClose={this.handleDrawerClose}
            open={this.state.open}
            location={this.props.location}
            fetchUserMangtData={this.fetchUserMangtData}
            userInfo={this.state.userInfo}
            designJSON={designJSON}
            />
             </Suspense>
        
           
           
     
            <div>
            <Container style={designJSON.Container.StylingAttributes} classname={designJSON.Container.classname} >
          {
            JSON.parse(window.localStorage.getItem('navigation')).length!==0 ? 
            (
              this.checkForPermittedApps() ?
               null:
               (
                 designJSON.Container.CommonSection.length?
                 (
                   designJSON.Container.CommonSection.map(
                   commonapp=>{
                     return this.checkForPermittedCommonApp(commonapp)?<CommonComponent mainAppId={name} {...commonapp} commonappImpacted={this.getVisibility(commonapp.containerName)} />:null
                   }
                     )
                     ):null
               )
               
             ):null
          }
          {
            type==="App"?
            <MainComponent 
            open={this.state.open}   
            location={this.props.location} 
            history={this.props.history}
            classname={name}
            style={StylingAttributes}
            />:null
          }
            
            </Container>
            </div>

           
          </div>
        );`;
    
      
    fs.readFile(HomeDefault, 'utf8', function (err,data) {
      var data1=data.replace(/{{HeaderImports}}/g, header_import);
        var result = data1.replace(/{{DesignUI}}/g, codeStr);
      

       createComponents(clientdirectorypath,componentfile,result);
       console.log("Home Updated file was saved!");
      });
};
function createComponents(clientdirectorypath,componentfile,result){
  fs.writeFile(`${clientdirectorypath}${componentfile}.js`, result, 'utf8', function (err) {
    /* istanbul ignore if */
    if (err) return console.log(err);
 });
}
function readAllDesignJsons(){
  fs.readdir(directoryPath, function (err, files) {
    //handling error
    /* istanbul ignore if */
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    const clientdirectorypath='../client/src/templates/';
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        generateFile(file,clientdirectorypath);
    });
});
}
readAllDesignJsons();

module.exports = {
  readAllDesignJsons: readAllDesignJsons,
  generateFile:generateFile,
  createComponents:createComponents
};
