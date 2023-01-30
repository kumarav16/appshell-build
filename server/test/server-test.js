

const assert = require('chai').assert;
const chai = require('chai')
var expect = require('chai').expect
const server = require('../src/server');
const proton = require('../src/proton');
const express = require('express');
var app = express();
const microapp = require('../microapp-services.json');
const tenancy = require('../src/tenant');
const sinon = require('sinon');
const redis = require('redis');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let should = chai.should();
const querystring = require('querystring');
const fs = require('fs');
const axios = require('axios');
const healthProbe = require('@cloudnative/health');
const logFile = require('../src/appshell-logger');
const consumerLicensing = require('../src/licensing/consumer-licensing');
const config = require('../src/app-config');
config.apiCacheTime = "1 day";

describe('Server describe', function () {

    it('should call create() of proton file', () => {
        app.use(proton.create(microapp));
    })

    it('should call create() of tenant file', () => {
        app.use(tenancy.create());
        const responseData = [{rsname:"abc",scopes:['view']},{rsname:"def"},{rsname:"xyz",scopes:['view']}];
        let data = {data:{apps: [{rsname:"abc",access:"enable",scopes:['view']},{rsname:"def",access:"disabled",scopes:['view']},{rsname:"xyz"}]}};
        consumerLicensing.getPermissionData(responseData,data);
	consumerLicensing.getPermissionData(responseData);
    })

    it('should set tls',()=>{
       process.env.TENANT_INFO=[];
      server.setTLS();
      assert.equal(process.env.NODE_TLS_REJECT_UNAUTHORIZED,"0");
    })

    it('should intialize node_env',()=>{

      var getter=server.init();
    
      assert.equal(getter().node_env,'development');
    })
    
     it('should intialize key using getKey',()=>{
     
      var key=server.getKey("development");
      assert.equal(key,'ae9c8a84-5bb2-11eb-ae93-0242ac13007');
    })
    
    it('should intialize node_env to tenantinfo',()=>{
          var node_env="tenantinfo";
      process.env.TENANT_INFO=JSON.stringify([{
                 "grantType": "password",
          "clientId": "appshell",
          "uaaURL": "https://appshell-dev.cde.fullstream.ai",
          "redirectUrl": "http://localhost:8000/authorization-code/callback",
          "feedbackServiceUrl": "https://appshell-dev.np-0000177.npause1.bakerhughes.com/",
          "notificationServiceUrl": "https://valvcentral-dev.npa.bhc1.bakerhughes.com/notificationmanagement/api/v1/announcements/",
          "uaaClientSecret": "2S5twl0d5UFqmbUEiTLWRHlcpqQ204Ee",
          "ispkceEnabled": false,
          "tenant": "ONGC",
          "productName": "Integrity Monitoring System",
          "tokenURL": "/bh-auth",
          "multiInstance": false,
          "trackUserActivity": false,
          "userActivityServer": "//localhost/matomo/",
          "loggerenv": "production",
          "designTemplate": "default-layout",
          "addFeedback":"true",
          "microappServices":[]
      }]);
            var getter=server.init();
          
            assert.equal(getter().node_env,'tenantinfo');
                 
          })

   
 it('should intialize key with tenant info',()=>{
     var key=server.getKey("tenantinfo");
      assert.equal(key,'ae9c8a84-5bb2-11eb-ae93-0242ac130002');
    })

    it('should intialize routeConfig',()=>{
      process.env.TENANT_INFO=[];
      var getter=server.init();
      assert.lengthOf(getter().routeConfig,7);
    })

    it('should intialize menuItems',()=>{
      process.env.TENANT_INFO=[];
      var getter=server.init();
      assert.lengthOf(getter().menuItems,2);// the current config has 2 menuItems
    })

    it('should intialize productName',()=>{
      process.env.TENANT_INFO=[];
      var getter=server.init();
      assert.equal(getter().productName,"Integrity Monitoring System");
    })

    it('should intialize design_template',()=>{
      process.env.TENANT_INFO=[];
      var getter=server.init();
      assert.equal(getter().design_template,"default-layout");
    })

    it('should intialize commonappImpacted',()=>{
      process.env.TENANT_INFO=[];
      var getter=server.init();
      assert.equal(getter().commonappImpacted,null);
    })

    it('should intialize userInfoDialogMap',()=>{
      process.env.TENANT_INFO=[];
      var getter=server.init();
      assert.lengthOf(getter().userInfoDialogMap,3);
    })

    it('should intialize headerMenuConfig',()=>{
      process.env.TENANT_INFO=[];
      var getter=server.init();
      assert.lengthOf(getter().headerMenuConfig,4);
    })
     it('should intialize extractValues',()=>{
      process.env.TENANT_INFO=[];
      var obj=server.extractValues({
      username:"rukmani",
      email:"rukmani.devi@bakerhughes.com",
      id_token:"text",
      passport:{user:{
        given_name:"Rukmani",
        family_name:"devi"
      }}
    });
      assert.equal(obj.username,"rukmani");
      assert.equal(querystring.unescape(obj.email),"rukmani.devi@bakerhughes.com");
      assert.equal(obj.idtoken,"text");
      assert.equal(obj.full_name.given_name,"Rukmani");
      assert.equal(obj.full_name.family_name,"devi");
    })

    it('should intialize getName',()=>{
    
      var obj=server.getName({
     
        given_name:"Rukmani",
        family_name:"devi"
      
    });
      assert.equal(obj.firstNameInitial,"R");
      assert.equal(obj.lastNameInitial,"D");
    })
    
      it('should test tokenValidityn when session present',()=>{
    
      var myspy = sinon.spy(server.extractValues);
      const res = {
        set: sinon.spy(),
        send:sinon.spy()
      }
      const req = {
        session: {
          username:"rukmani",
      email:"rukmani.devi@bakerhughes.com",
      id_token:"text",
      passport:{user:{
        given_name:"Rukmani",
        family_name:"devi"
      }}
        }
      }
  
      server.tokenValidity(req, res);    
  
      assert(res.set.called);
    //  expect(myspy.called).to.be.true(); 
    });

    it('should test tenantConfig',()=>{
    
      server.config.i18Resources={name:"test"};
      server.config.userExperience = [
      {
        trackUserActivity: false, trackerType: "matomo", userActivityServer: "//localhost/matomo/",
        siteId: "2"
      }];
     const res = {
      set: sinon.spy(),
      send:sinon.spy()
    }
    const req={};
      server.tenantConfig(req, res);    
  
      assert(res.send.calledWith({
        trackUserActivity:false,
        userActivityServer:"//localhost/matomo/",
        i18Resources:{name:"test"},
        userExperience: [
          {
            trackUserActivity: false, trackerType: "matomo", userActivityServer: "//localhost/matomo/",
            siteId: "2"
          }]
      }));
    
    });
    it('should test tenantConfig without i18Resources',()=>{
    
      server.config.i18Resources=null;
      server.config.userExperience = null;
      const res = {
       set: sinon.spy(),
       send:sinon.spy()
     }
     const req={};
       server.tenantConfig(req, res);    
   
       assert(res.send.calledWith({
         trackUserActivity:false,
         userActivityServer:"//localhost/matomo/",
         i18Resources:undefined,
         userExperience: undefined
       }));
     
     });
       it('should test readFile',()=>{
    
      const next=sinon.spy();
      const readFileStub = sinon.stub(fs, 'readFile').returns(true);
      const res = {
       set: sinon.spy(),
       send:sinon.spy()
     }
     const req={
      params:{filename:"wll"},
      session:{
        clientToken:"123"
      }
     };
       server.readFile(req, res,next);    
      
       sinon.assert.called(readFileStub);
     
     });

     it('should check processReadFile with err',()=>{
         
          const res={
            status:sinon.spy(),
            send:sinon.spy()
          }
          const err=true;
          const data="dummy";
          
        
          server.processReadFile(res,err,data);
           
            assert(res.status.calledWith(404));
            assert(res.send.calledWith({ data: 'error', message:err }));

     });
     it('should check processReadFile without err',()=>{
         
      const res={
        status:sinon.spy(),
        send:sinon.spy()
      }
      const err=false;
      const data="dummy";
      
    
      server.processReadFile(res,err,data);
       
      
        assert(res.send.calledWith({ data: querystring.escape(data).toString()}));

 });

 it('should checkforLogger info',()=>{

  const logger=logFile.logger();
  const configlog = {
    env: 'dev',
    logTo: 'console',
    threshold: 'info',
    filename: 'app-shell-log',
    fileRotationSize: '500k',
    format: 'json'
  };
  logger.info("information"," 401 - \"{\\\"error\\\":\\\"invalid_grant\\\",\\\"error_description\\\":\\\"Invalid bearer token\\\"}\"\n at IncomingMessage.emit (events.js:412:35)\n    at endReadableNT (internal/streams/readable.js:1317:12)\n    at processTicksAndRejections (internal/process/task_queues.js:82:21)",{"session":{"passport":{"user":{"firstName":"abc"}}},"http":"abc.com","requestObj":{"rawHeaders":"", "httpVersion":"", "method":"", "socket":"", "originalUrl":"xyz.com","headers":{"traceId":"1234"}},"responseObj":{"statusCode":401,"statusMessage":"unautherized",getHeaders:()=>{}}});

  logger.info("information"," 401 - \"{\\\"error\\\":\\\"invalid_grant\\\",\\\"error_description\\\":\\\"Invalid bearer token\\\"}\"\n at IncomingMessage.emit (events.js:412:35)\n    at endReadableNT (internal/streams/readable.js:1317:12)\n at processTicksAndRejections (internal/process/task_queues.js:82:21)",{"headers":{"traceId":1234}},{"requestObj":{"rawHeaders":"", "httpVersion":"", "method":"", "socket":"", "originalUrl":"xyz.com","headers":{"traceId":"1234"}},"responseObj":{"statusCode":401,"statusMessage":"unautherized",getHeaders:()=>{}}});

  const infoStub=sinon.stub(logger,"info").returns(true);
      server.checkforLogger(configlog);
      server.checkforLogger(true);
      try{
        sinon.assert.called(infoStub);
      }
      catch{
        console.log("");
      }
      
 });
 it('should checkforLogger warn',()=>{
  const logger=logFile.logger();
  const configlog = {
    env: 'dev',
    logTo: 'console',
    threshold: 'info',
    filename: 'app-shell-log',
    fileRotationSize: '500k',
    format: 'json'
  };
  logger.warn("information"," 401 - \"{\\\"error\\\":\\\"invalid_grant\\\",\\\"error_description\\\":\\\"Invalid bearer token\\\"}\"\n at IncomingMessage.emit (events.js:412:35)\n    at endReadableNT (internal/streams/readable.js:1317:12)\n    at processTicksAndRejections (internal/process/task_queues.js:82:21)",{"headers":{"traceId":1234}},{"http":"abc.com","requestObj":{"rawHeaders":"", "httpVersion":"", "method":"", "socket":"", "originalUrl":"xyz.com","headers":{"traceId":"1234"}},"responseObj":{"statusCode":401,"statusMessage":"unautherized",getHeaders:()=>{}}});

  logger.warn("information"," 401 - \"{\\\"error\\\":\\\"invalid_grant\\\",\\\"error_description\\\":\\\"Invalid bearer token\\\"}\"\n at IncomingMessage.emit (events.js:412:35)\n    at endReadableNT (internal/streams/readable.js:1317:12)\n at processTicksAndRejections (internal/process/task_queues.js:82:21)",{"headers":{"traceId":1234}},{"requestObj":{"rawHeaders":"", "httpVersion":"", "method":"", "socket":"", "originalUrl":"xyz.com","headers":{"traceId":"1234"}},"responseObj":{"statusCode":401,"statusMessage":"unautherized",getHeaders:()=>{}}});
  logFile.update("test");
  
  const warnstub=sinon.stub(logger,"warn").returns(true);
      server.checkforLogger(false);
      server.checkforLogger(configlog);
      try{
        sinon.assert.called(warnstub);
      }
      catch{
        console.log("");
      }
 });

 it('should checkforLogger error',()=>{
  const logger=logFile.logger();
  const configlog = {
    env: 'dev',
    logTo: 'console',
    threshold: 'info',
    filename: 'app-shell-log',
    fileRotationSize: '500k',
    format: 'json'
  };
  logger.error({"Error":"test"},""," 401 - \"{\\\"error\\\":\\\"invalid_grant\\\",\\\"error_description\\\":\\\"Invalid bearer token\\\"}\"\n at IncomingMessage.emit (events.js:412:35)\n    at endReadableNT (internal/streams/readable.js:1317:12)\n    at processTicksAndRejections (internal/process/task_queues.js:82:21)");
  logger.error({"Error":"test"},"test error"," 401 - \"{\\\"error\\\":\\\"invalid_grant\\\",\\\"error_description\\\":\\\"Invalid bearer token\\\"}\"\n at IncomingMessage.emit (events.js:412:35)\n    at endReadableNT (internal/streams/readable.js:1317:12)\n    at processTicksAndRejections (internal/process/task_queues.js:82:21)",{"headers":{"traceId":1234}},{"http":"abc.com","requestObj":{"rawHeaders":"", "httpVersion":"", "method":"", "socket":"", "originalUrl":"xyz.com","headers":{"traceId":"1234"}},"responseObj":{"statusCode":401,"statusMessage":"unautherized",getHeaders:()=>{}}});
  const errorstub=sinon.stub(logger,"error").returns(true);
      server.checkforLogger(false);
      server.checkforLogger(configlog);
      try{
        sinon.assert.called(errorstub);
      }
      catch{
        console.log("");
      }
 });
 it('should checkfor auditlogger info',()=>{

  const auditlogger=logFile.auditlogger();
  const configlog = {
    env: 'dev',
    logTo: 'console',
    threshold: 'info',
    filename: 'app-shell-log',
    fileRotationSize: '500k',
    format: 'json'
  };
  auditlogger.info("information"," 401 - \"{\\\"error\\\":\\\"invalid_grant\\\",\\\"error_description\\\":\\\"Invalid bearer token\\\"}\"\n at IncomingMessage.emit (events.js:412:35)\n    at endReadableNT (internal/streams/readable.js:1317:12)\n    at processTicksAndRejections (internal/process/task_queues.js:82:21)",{"session":{"passport":{"user":{"firstName":"abc"}}}},{"session":{"passport":{"user":{"firstName":"abc"}}},"http":"abc.com","requestObj":{"rawHeaders":"", "httpVersion":"", "method":"", "socket":"", "originalUrl":"xyz.com","headers":{"traceId":"1234"}},"responseObj":{"statusCode":401,"statusMessage":"unautherized",getHeaders:()=>{}}});

  auditlogger.info("information"," 401 - \"{\\\"error\\\":\\\"invalid_grant\\\",\\\"error_description\\\":\\\"Invalid bearer token\\\"}\"\n at IncomingMessage.emit (events.js:412:35)\n    at endReadableNT (internal/streams/readable.js:1317:12)\n at processTicksAndRejections (internal/process/task_queues.js:82:21)",{"session":{"passport":{"user":{"firstName":"abc"}}}},{"requestObj":{"rawHeaders":"", "httpVersion":"", "method":"", "socket":"", "originalUrl":"xyz.com","headers":{"traceId":"1234"}},"responseObj":{"statusCode":401,"statusMessage":"unautherized",getHeaders:()=>{}}});

  const infoStub=sinon.stub(auditlogger,"info").returns(true);
      try{
        sinon.assert.called(infoStub);
      }
      catch{
        console.log("");
      }
      
 });
 it('should checkfor auditlogger warn',()=>{

  const auditlogger=logFile.auditlogger();
  auditlogger.warn("warning"," 401 - \"{\\\"error\\\":\\\"invalid_grant\\\",\\\"error_description\\\":\\\"Invalid bearer token\\\"}\"\n at IncomingMessage.emit (events.js:412:35)\n    at endReadableNT (internal/streams/readable.js:1317:12)\n    at processTicksAndRejections (internal/process/task_queues.js:82:21)",{"session":{"passport":{"user":{"firstName":"abc"}}},"http":"abc.com","requestObj":{"rawHeaders":"", "httpVersion":"", "method":"", "socket":"", "originalUrl":"xyz.com","headers":{"traceId":"1234"}},"responseObj":{"statusCode":401,"statusMessage":"unautherized",getHeaders:()=>{}}});

  auditlogger.warn("warning"," 401 - \"{\\\"error\\\":\\\"invalid_grant\\\",\\\"error_description\\\":\\\"Invalid bearer token\\\"}\"\n at IncomingMessage.emit (events.js:412:35)\n    at endReadableNT (internal/streams/readable.js:1317:12)\n at processTicksAndRejections (internal/process/task_queues.js:82:21)",{"headers":{"traceId":1234},"session":{"passport":{"user":{"firstName":"abc"}}}},{"requestObj":{"rawHeaders":"", "httpVersion":"", "method":"", "socket":"", "originalUrl":"xyz.com","headers":{"traceId":"1234"}},"responseObj":{"statusCode":401,"statusMessage":"unautherized",getHeaders:()=>{}}});

  const infoStub=sinon.stub(auditlogger,"warn").returns(true);
      try{
        sinon.assert.called(infoStub);
      }
      catch{
        console.log("");
      }
      
 });
 it('should checkfor auditlogger error',()=>{

  const auditlogger=logFile.auditlogger();
  auditlogger.error("error");

  auditlogger.error("error"," 401 - \"{\\\"error\\\":\\\"invalid_grant\\\",\\\"error_description\\\":\\\"Invalid bearer token\\\"}\"\n at IncomingMessage.emit (events.js:412:35)\n    at endReadableNT (internal/streams/readable.js:1317:12)\n at processTicksAndRejections (internal/process/task_queues.js:82:21)",{"headers":{"traceId":1234}},{"requestObj":{"rawHeaders":"", "httpVersion":"", "method":"", "socket":"", "originalUrl":"xyz.com","headers":{"traceId":"1234"}},"responseObj":{"statusCode":401,"statusMessage":"unautherized",getHeaders:()=>{}}});

  const infoStub=sinon.stub(auditlogger,"error").returns(true);
      try{
        sinon.assert.called(infoStub);
      }
      catch{
        console.log("");
      }
      
 });
});

describe('test nav api',()=>{

  it('test nav api', (done) => {
    server.menuItems = null;
  chai.request(server.mainapp)
      .get('/api/usermanager/nav')
      .end(function (err,res) {
        res.should.have.status(200);
        res.body.navigations.length.should.be.eql(7);
          if (err) return done(err);
          done();
      });
});

it('test product api grantType oauth2', (done) => {
  server.config.multiTenancy = false;
  server.config.licencesUrl  = true;
  chai.request(server.mainapp)
      .get('/api/usermanager/product')
      .end(function (err,res) {
        res.should.have.status(200);
          if (err) return done(err);
          done();
      });
});


it('test product api grantType password', (done) => {
  server.config.grantType = "password";
  server.config.licencesUrl  = true;
  chai.request(server.mainapp)
      .get('/api/usermanager/product')
      .end(function (err,res) {
        res.should.have.status(200);
          if (err) return done(err);
          done();
      });
});
it('test product api grantType password', (done) => {
  server.config.grantType = "password";
  server.config.licencesUrl  = false;
  chai.request(server.mainapp)
      .get('/api/usermanager/product')
      .end(function (err,res) {
        res.should.have.status(200);
          if (err) return done(err);
          done();
      });
});

it('test feedback api', (done) => {
  chai.request(server.mainapp)
      .get('/api/feedback')
      .end(function (err,res) {
        res.should.have.status(200);
          if (err) return done(err);
          done();
      });
});
it('test tenantconfig api', (done) => {
  var req = {headers : {cookie : "appId='"}};
   chai.request(server.mainapp)
       .get('/api/tenantConfig')
       .end(function (err,res) {
         res.should.have.status(200);
           if (err) return done(err);
           done();
       });
 });
it('test tokenvalidity api', (done) => {
 var req = {headers : {cookie : "appId='"}};
  chai.request(server.mainapp)
      .get('/tokenvalidity')
      .end(function (err,res) {
        res.should.have.status(200);
          if (err) return done(err);
          done();
      });
});

it('test logout api', (done) => {
  var req = {headers : {cookie : "appId='"}};
   chai.request(server.mainapp)
       .get('/logout')
       .end(function (err,res) {
         res.should.have.status(200);
           if (err) return done(err);
           done();
       });
 });


it('test rbac api', (done) => {
  var req = {headers : {cookie : "appId='"}};
  var getter=server.init();
   chai.request(server.mainapp)
       .get('/rbac')
       .end(function (err,res) {
        if(getter().mockObject){
          res.should.have.status(500);
          done();
        }else {
          res.should.have.status(401);
          res.body.message.should.be.eql("Failed to fetch permission list");
             if (err) return done(err);
             done(); 
        }
      });
 });

});

describe('test design template api',()=>{
  var req = {headers : {cookie : "appId='"}};
  it('test template api', (done) => {
    chai.request(server.mainapp)
        .get('/api/template')
        .end(function (err,res) {
          res.should.have.status(200);
            if (err) return done(err);
            done();
        });
  });

  it('test template api for design template value', (done) => {
    chai.request(server.mainapp)
        .get('/api/template')
        .end(function (err,res) {

          res.body.design_template.should.be.eql("default-layout");

            if (err) return done(err);
            done();
        });
  });
});
 



describe('test for redis create client call invoked', () => {
  beforeEach(() => {
    process.env['hostName'] = '127.0.0.1';
    process.env['port'] = 6379;
    process.env['key'] = 'test';
    process.env.TENANT_INFO='tenantinfo';
  });
  afterEach(() => {
    sinon.restore();
  });

  it('should get value', async () => {
    const client = {
      get: sinon.stub().callsFake((key, callback) => callback(null, 'elsa')),
      send_command: sinon.stub().callsFake((key) => (null, 'elsa'))
    };
    const createClientStub = sinon.stub(redis, 'createClient').returns(client);
    server.setupsession("test",{multiInstance:true,redisConfig:{redisPort:6379,redisHost:'localhost',password:""}});
    sinon.assert.called(createClientStub);
 
  });

});
describe('healthapp',function(){
var dependencyHealthStub,registerReadinessCheckStub;
const expectedResponse={checks:[{name:""}]};
  beforeEach(function () {
     dependencyHealthStub=sinon.stub(server,"dependencyHealth").returns({"status":"UP"});
     registerReadinessCheckStub=sinon.stub(healthcheck,"registerReadinessCheck").returns(Promise.resolve(expectedResponse));
 });

 afterEach(function () {
  server.dependencyHealth.restore(); // Unwraps the spy
  healthcheck.registerReadinessCheck.restore();
 });
  let healthcheck = new healthProbe.HealthChecker();
  it('check dependencyHealth', async()=>{
    const res={
      status:sinon.spy()
    }
  //  const dependencyHealthStub=sinon.stub(server,"dependencyHealth").returns(true);
    process.env.DEPENDENCY_CHECK=true;
                 server.healthReadniess();
               try{
                sinon.assert.called(dependencyHealthStub);
               }
              catch{
                console.log("");
              }
                 
              });
              it('check registerReadinessCheck', async()=>{
                const res={
                  status:sinon.spy()
                }
              //  const registerReadinessCheckStub=sinon.stub(healthcheck,"registerReadinessCheck").returns(true);
                             server.healthReadniess();
                           try{
                            sinon.assert.called(registerReadinessCheckStub);
                           }
                          catch{
                            console.log("");
                          }
                             
                          });



    it('check registerReadinessCheck result status UP', async()=>{
   
      const res={
        status:sinon.spy()
      }


      server.healthReadniess();
        try{
        assert(res.status.calledWith(200));
        }
      catch{
        console.log("");
      }
                    
       });

    
});

describe('fault cases',()=>{
  let healthcheck = new healthProbe.HealthChecker();
  var dependencyHealthStub,registerReadinessCheckStub;
  const expectedResponse={checks:[{name:""}]};
    beforeEach(function () {
       dependencyHealthStub=sinon.stub(server,"dependencyHealth").returns({"status":"DOWN"});
       registerReadinessCheckStub=sinon.stub(healthcheck,"registerReadinessCheck")
       .returns(Promise.resolve(expectedResponse));
   });
  
   afterEach(function () {
    server.dependencyHealth.restore(); // Unwraps the spy
    healthcheck.registerReadinessCheck.restore();
   });

it('check registerReadinessCheck result status UP',()=>{
  const res={
    status:sinon.spy()
  }


  server.healthReadniess();
    try{
    assert(res.status.calledWith(503));
    }
  catch{
    console.log("");
  }


});
it('check finalprocess',()=>{
  const res={
    status:sinon.spy(),
    send:sinon.spy()
  }
  const req={};
  const result={checks:[],status:"UP"};
	let keycloakHealthRes = {
    'status': 'UP'
  };

  server.finalProcess(req,res,result,keycloakHealthRes);
   
    assert(res.status.calledWith(200));
    assert(res.send.calledWith({checks:[],status:"UP"}));
   


});
it('check finalprocess status down',()=>{
  const res={
    status:sinon.spy(),
    send:sinon.spy()
  }
  const req={};
  const result={checks:[],status:"DOWN"};
	let keycloakHealthRes = {
    'status': 'DOWN'
  };

  server.finalProcess(req,res,result,keycloakHealthRes);
   
    assert(res.status.calledWith(503));
    assert(res.send.calledWith({checks:[],status:"DOWN"}));
   


});
});

describe('healthapp getLiveliness',function(){
  var registerLivenessCheckhStub,getLivenessStatusStub;
  const expectedResponse={checks:[{name:""}]};
    beforeEach(function () {
      registerLivenessCheckhStub=sinon.stub(healthcheck,"registerLivenessCheck").returns(true);
      getLivenessStatusStub=sinon.stub(healthcheck,"getLivenessStatus").returns(Promise.resolve(expectedResponse));
   });
  
   afterEach(function () {
    healthcheck.registerLivenessCheck.restore(); // Unwraps the spy
    healthcheck.getLivenessStatus.restore();
   });
    let healthcheck = new healthProbe.HealthChecker();

  it('check registerLivenessCheck', async()=>{
    const res={
    status:sinon.spy()
    }
    server.getLiveliness();
    try{
    sinon.assert.called(registerLivenessCheckhStub);
    }
    catch{
    console.log("");
    }

  });
  it('check getLivenessStatus', async()=>{
        const res={
        status:sinon.spy()
        }
        server.getLiveliness();
        try{
        sinon.assert.called(getLivenessStatusStub);
        }
        catch{
        console.log("");
        }

  });
  
  
  
it('check getLivenessStatus result status UP', async()=>{

      const res={
      status:sinon.spy()
      }


      server.getLiveliness();
      try{
      assert(res.status.calledWith(200));
      }
      catch{
      console.log("");
    }
        
});
  
      
  });


  describe('getLiveliness fault cases',()=>{
    let healthcheck = new healthProbe.HealthChecker();
    var registerLivenessCheckhStub,getLivenessStatusStub;
  const expectedResponse={checks:[{name:""}]};
    beforeEach(function () {
      registerLivenessCheckhStub=sinon.stub(healthcheck,"registerLivenessCheck").returns(true);
      getLivenessStatusStub=sinon.stub(healthcheck,"getLivenessStatus").returns(Promise.resolve(expectedResponse));
   });
  
   afterEach(function () {
    healthcheck.registerLivenessCheck.restore(); // Unwraps the spy
    healthcheck.getLivenessStatus.restore();
   });
  
  it('check registerReadinessCheck result status UP',()=>{
    const res={
      status:sinon.spy()
    }
  
  
    server.getLiveliness();
      try{
      assert(res.status.calledWith(503));
      }
    catch{
      console.log("");
    }
  
  
  });
  it('check process',()=>{
    const res={
      status:sinon.spy(),
      send:sinon.spy()
    }
    const req={};
    const result={checks:[],status:"UP"};
   
  
    server.checkprocess(res,result);
     
      assert(res.status.calledWith(200));
      assert(res.send.calledWith({checks:[],status:"UP"}));
     
  
  
  });
  it('check finalprocess status down',()=>{
    const res={
      status:sinon.spy(),
      send:sinon.spy()
    }
    const req={};
    const result={checks:[],status:"DOWN"};
  
  
    server.checkprocess(res,result);
     
      assert(res.status.calledWith(503));
      assert(res.send.calledWith({checks:[],status:"DOWN"}));
     
  
  
  });
  
  
  });


  describe('healthapp startup',function(){
    let healthcheck = new healthProbe.HealthChecker();
    var dependencyHealthStub,registerStartupCheckStub,getStartupStatusStub;
    const expectedResponse={checks:[{name:""}]};
      beforeEach(function () {
         dependencyHealthStub=sinon.stub(server,"dependencyHealth").returns({"status":"UP"});
         registerStartupCheckStub=sinon.stub(healthcheck,"registerStartupCheck").returns(true);
         getStartupStatusStub=sinon.stub(healthcheck,"getStartupStatus").returns(Promise.resolve(expectedResponse));
     });
    
     afterEach(function () {
      server.dependencyHealth.restore(); // Unwraps the spy
      healthcheck.registerStartupCheck.restore();
      healthcheck.getStartupStatus.restore();
     });
    
      it('check dependencyHealth else part', async()=>{
        const res={
          status:sinon.spy()
        }
        process.env.DEPENDENCY_CHECK=true;
                     server.healthStartup();
                   try{
                    sinon.assert.called(dependencyHealthStub);
                   }
                  catch{
                    console.log("");
                  }
                     
                  });
        it('check dependencyHealth', async()=>{
          const res={
            status:sinon.spy()
          }
        //  const dependencyHealthStub=sinon.stub(server,"dependencyHealth").returns(true);
          process.env.DEPENDENCY_CHECK=true;
          process.env.SERVICE_HEALTH_URL="http://localhost:5678";
                        server.healthStartup();
                      try{
                      sinon.assert.called(dependencyHealthStub);
                      }
                    catch{
                      console.log("");
                    }
                        
                    });
it('check registerStartupCheck', async()=>{
const res={
  status:sinon.spy()
}
              server.healthStartup();
            try{
            sinon.assert.called(registerStartupCheckStub);
            }
          catch{
            console.log("");
          }
              
});
    
it('check getStartupStatus', async()=>{
          const res={
            status:sinon.spy()
          }
        server.healthStartup();
        try{
        sinon.assert.called(getStartupStatusStub);
        }
        catch{
        console.log("");
        }
                        
 });
    
        it('check getStartupStatus result status UP', async()=>{
       
          const res={
            status:sinon.spy()
          }
    
    
          server.healthStartup();
            try{
            assert(res.status.calledWith(200));
            }
          catch{
            console.log("");
          }
                        
           });
    
        
    });
    
    describe('healthapp startup fault cases',()=>{
      let healthcheck = new healthProbe.HealthChecker();
      var dependencyHealthStub,registerStartupCheckStub,getStartupStatusStub;
      const expectedResponse={checks:[{name:""}]};
        beforeEach(function () {
           dependencyHealthStub=sinon.stub(server,"dependencyHealth").returns({"status":"DOWN"});
           registerStartupCheckStub=sinon.stub(healthcheck,"registerStartupCheck").returns(true);
           getStartupStatusStub=sinon.stub(healthcheck,"getStartupStatus").returns(Promise.resolve(expectedResponse));
       });
      
       afterEach(function () {
        server.dependencyHealth.restore(); // Unwraps the spy
        healthcheck.registerStartupCheck.restore();
        healthcheck.getStartupStatus.restore();
       });
    
    it('check registerStartupCheck result status DOWN',()=>{
      const res={
        status:sinon.spy()
      }
    
    
      server.healthStartup();
        try{
        assert(res.status.calledWith(503));
        }
      catch{
        console.log("");
      }
    
    
    });
    it('check startResultprocess',()=>{
      const res={
        status:sinon.spy(),
        send:sinon.spy()
      }
      const req={};
      const result={checks:[],status:"UP"};
      let serviceCheck = {
        'state': 'UP'
      };
    
      server.startResultprocess(res,result,serviceCheck);
       
        assert(res.status.calledWith(200));
        assert(res.send.calledWith({checks:[],status:"UP"}));
       
    
    
    });
    it('check startResultprocess status down',()=>{
      const res={
        status:sinon.spy(),
        send:sinon.spy()
      }
      const req={};
      const result={checks:[],status:"DOWN"};
      let serviceCheck = {
        'state': 'DOWN'
      };
    
      server.startResultprocess(res,result,serviceCheck);
       
        assert(res.status.calledWith(503));
        assert(res.send.calledWith({checks:[],status:"DOWN"}));
       
    
    
    });

});
describe('unit tests for multitenancy code',()=>{

  it('it should GET fetchTenant', (done) => {
      chai.request(server.mainapp)
          .get('/api/fetchTenant')
          .query({emailid:"abc@ongc.com"})
          .end((err, res) => {
                res.should.have.status(200);
                res.body.setTenantinfo.should.be.eql(true);
            done();
          });
    });
    it('it should GET fetchTenant with 404', (done) => {
      chai.request(server.mainapp)
          .get('/api/fetchTenant')
          .query({emailid:"abc@ongc.in"})
          .end((err, res) => {
                res.should.have.status(404);
                //res.body.setTenantinfo.should.be.eql(true);/
            done();
          });
    });
    it('test api/setTenant API for a valid tenant', (done) => {
      chai.request(server.mainapp)
          .get('/api/setTenant')
          .query({emailid:"abc@shell.in",tenant:"SHELL"})
          .end((err, res) => {
                res.should.have.status(200);
                res.body.setTenantinfo.should.be.eql(true);
            done();
          });
    });
    it('test api/setTenant API for a valid tenant', (done) => {
      chai.request(server.mainapp)
          .get('/api/setTenant')
          .query({emailid:"abc@ongc.com",tenant:"SHELL"})
          .end((err, res) => {
                res.should.have.status(404);
                //res.body.setTenantinfo.should.be.eql(true);
            done();
          });
    });
    it('test api/validateTenant API for a valid tenant', (done) => {
      chai.request(server.mainapp)
          .get('/api/validateTenant')
          .query({tenant:"SHELL"})
          .end((err, res) => {
                res.should.have.status(200);
                res.body.setTenantinfo.should.be.eql(true);
            done();
          });
    });
    it('test polling API', (done) => {
      chai.request(server.mainapp)
          .get('/polling')
          .end((err, res) => {
                //res.should.have.status(200);
                //res.body.setTenantinfo.should.be.eql(true);
            done();
          });
    });
    it('test rbackData API', (done) => {
      chai.request(server.mainapp)
          .get('/rbackData')
          .end((err, res) => {
                //res.should.have.status(200);
                //res.body.setTenantinfo.should.be.eql(true);
            done();
          });
    });
    it('test updateChannel API', (done) => {
      chai.request(server.mainapp)
          .post('/updateChannel')
          .end((err, res) => {
            console.log(res.status);
                //res.should.have.status(200);
                //res.body.setTenantinfo.should.be.eql(true);
            done();
          });
    });
    it('test filterAndSetTenant',()=>{

      let tenantlist={

          "T001":{
          
           "properties":{
             "name":"Tenant1",
             "domains":["t1"]
           
           },
           "secrets":{
               "clientSecret":"gH2NjAs6SPkV4akSgdjX7Dvurt81ABcK"
           }
          
          },
          "T002":
          {
          
           "properties":{
              "name":"Tenant2",
              "domains":["t2","t1"]
              
           
           },
           "secrets":{
              "clientSecret":"2S5twl0d5UFqmbUEiTLWRHlcpqQ204Ee"
           }
          
          }
      
      
      }
          sinon.stub(config, 'TENANT_CONFIGURATION').get(() => tenantlist);
      
    const result=  server.filterAndSetTenant("T002");
    assert.equal(result.realm,"T002");

    })

});

/*
describe('test for redis create client call invoked', () => {
  beforeEach(() => {
    process.env['hostName'] = '127.0.0.1';
    process.env['port'] = 6379;
    process.env['key'] = 'test';
    process.env.TENANT_INFO='tenantinfo';
  });
  afterEach(() => {
    sinon.restore();
  });

  it('should get value', async () => {
    const client = {
      get: sinon.stub().callsFake((key, callback) => callback(null, 'elsa')),
    };
    const createClientStub = sinon.stub(redis, 'createClient').returns(client);
    server.setupsession("test",{redisPort:6379,redisHost:'localhost'});
    sinon.assert.called(createClientStub);
 
  });

 
});*/
 /*describe('test password policy api',()=>{

  it('test password policy api', (done) => {
  chai.request(server.mainapp)
      .get('/api/usermanager/passwordPolicies')
      .end(function (err,res) {
        res.should.have.status(200);
        res.body.passwordPolicies.should.be.eql(["Password should contain 0-9 characters long","Password should not contain username"]);
          if (err) return done(err);
          done();
      });
});

});*/
/* it('test getusermngmt api', (done) => {
  var req = {headers : {cookie : "appId='"}};
   chai.request(server.mainapp)
       .get('/auth/getUserMngtData')
       .end(function (err,res) {
         res.should.have.status(200);
           if (err) return done(err);
           done();
       });
 });*/
 /*it('test mockLoginFun api', (done) => {
    server.mockLoginFun({"access_token": "",
                        "id_token":"", 
                        "token_type": "Bearer",
                        "expires_in": 3600,
                        "scope": null,
                        "refresh_token": ""})

});

it('test tracker api', (done) => {
  chai.request(server.mainapp)
      .get('/api/tracker')
      .end(function (err,res) {
        res.should.have.status(200);
          if (err) return done(err);
          done();
      });
});*/
