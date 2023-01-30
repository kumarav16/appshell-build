const transpiler = require('../multi-transpiler');
const sinon = require('sinon');
const fs = require('fs');
const assert = require('chai').assert;
const expect=require('chai').expect;

describe('test multitranspiler', () => {
  var foreachmethod;
    beforeEach((done) => {
    // foreachmethod=sinon.spy(Array.prototype, "forEach");
     done();
    });
    afterEach((done) => {
      sinon.restore();
    //  foreachmethod.restore();
      done();
    });
	
    it('read all files inside design folder ', async () => {
      const client =  sinon.stub().callsFake((key, callback) => callback(null, 'elsa'));
      var spy1 = sinon.spy(transpiler, 'generateFile'); 
      const readadddir = sinon.stub(fs, 'readdir').returns([]);
      transpiler.readAllDesignJsons();
      sinon.assert.called(readadddir);
     
   
    });

    it('read hometemlate and pass result to create componenet ', async () => {
      const client =  sinon.stub().callsFake((key, callback) => callback(null, 'elsa'));
     
    
      const readfilestub = sinon.stub(fs, 'readFile').returns(client);
      const clientdirectorypath='../client/src/templates/';
      transpiler.generateFile('default.json',clientdirectorypath);
     
      //sinon.assert.called(readfilestub);
      sinon.assert.calledOnce(readfilestub)
   
    });
  
   
    it('writefile called to create react component ', async () => {
      const client =  sinon.stub().callsFake((key, callback) => callback(null, 'elsa'));
     
    
      const writeFilestub = sinon.stub(fs, 'writeFile').returns(client);
      const clientdirectorypath='../client/src/templates/';
      transpiler.createComponents(clientdirectorypath,'deafult',"created");
      sinon.assert.calledOnce(writeFilestub);
    
    });
  
  
   
  });
/*
  describe('test multitranspiler', () => {
    var foreachmethod;
      beforeEach(() => {
    
      });
      afterEach(() => {
        sinon.restore();
      
      });
  it('readfile folder ', async () => {
    const client =  sinon.stub().callsFake((key, callback) => callback(null, 'elsa'));
   
  
    const readfilestub = sinon.stub(fs, 'readFile').returns(client);
    const clientdirectorypath='../client/src/templates/';
    transpiler.generateFile('default.json',clientdirectorypath);
   
    //sinon.assert.called(readfilestub);
    sinon.assert.calledOnce(readfilestub)
 
  });

  
});
describe('test multitranspiler', () => {
  var foreachmethod;
    beforeEach(() => {
  
    });
    afterEach(() => {
      sinon.restore();
    
    });
it('writefile called to create react component ', async () => {
  const client =  sinon.stub().callsFake((key, callback) => callback(null, 'elsa'));
 

  const writeFilestub = sinon.stub(fs, 'writeFile').returns(client);
  const clientdirectorypath='../client/src/templates/';
  transpiler.createComponents(clientdirectorypath,'deafult',"created");
  sinon.assert.calledOnce(writeFilestub);

});
});*/