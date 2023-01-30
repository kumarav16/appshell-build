
let chai = require('chai');
let chaiHttp = require('chai-http');
let {  mainapp}    = require('../src/server');
let server = require('../src/server');
const mtp=require('../src/MultiTenancyAPIs');
let should = chai.should();
const sinon = require('sinon');
const assert = require('chai').assert;
const config = require('../src/app-config');
const {validateTenant,fetchTenant,getLandingPage,setTenant,domainTenantMappingList,tenantList,filterDomainList}=require('../src/MultiTenancyAPIs');

chai.use(chaiHttp);
//Our parent block
describe('Unit test cases for multi tenancy APIs', () => {
 

  
  describe('test  fetchTenant ', () => {


    beforeEach(function(done) {
        done();
     });
     
     afterEach(function(done) {
         sinon.restore();
         done();
     });
    it('it should GET fetchTenant', (done) => {
      chai.request(mainapp)
          .get('/api/fetchTenant')
          .query({emailid:"abc@ongc.com"})
          .end((err, res) => {
                res.should.have.status(200);
                res.body.setTenantinfo.should.be.eql(true);
            done();
          });
    });


    it('should test fetchTenant callback method for single tenant email',()=>{  
    
     let req={query:{emailid:"@ongc.com"}};
     let res={};
      let result=fetchTenant(req, res);  
      assert.deepEqual(result, {   setTenantinfo: true, tenants: [ 'ONGC' ]});
  
    });

    it('should test fetchTenant callback method for single tenant email',()=>{  
    
      let req={query:{emailid:"@ongc.in"}};
      let res={};
       let result=fetchTenant(req, res);  
       assert.deepEqual(result, {   msg: "invalid domain"});
        });
    it('should test fetchTenant callback method for multiple tenant email',()=>{  
      
        let req={query:{emailid:"@shell.in"}};
        let res={};
        let result=fetchTenant(req, res);    
        assert.deepEqual(result, {
            tenants: domainTenantMappingList["shell.in"],
            isMultiple: true,
            setTenantInfo: false
          });
    
      });
  
      it('should test fetchTenant callback method for single tenant email',()=>{  
        let req={query:{emailid:"@ongc.com"},tenant:"BHGE"};
        let res={};
         let result=setTenant(req, res);  
         assert.deepEqual(result, {   msg: 'invalid tenant'});

       });
});


describe('test api/setTenant API and  setTenant callback', () => {

    beforeEach(function(done) {
        done();
     });
     
     afterEach(function(done) {
         sinon.restore();
         done();
     });

    it('test api/setTenant API for a valid tenant', (done) => {
      chai.request(mainapp)
          .get('/api/setTenant')
          .query({emailid:"abc@shell.in",tenant:"SHELL"})
          .end((err, res) => {
                res.should.have.status(200);
                res.body.setTenantinfo.should.be.eql(true);
            done();
          });
    });

    /*it('test  api/setTenant API for an invalid tenant', (done) => {
        chai.request(mainapp)
            .get('/api/setTenant')
            .query({emailid:"abc@shell.com",tenant:"BHGE"})
            .end((err, res) => {
                  
                  res.body.msg.should.be.eql("invalid tenant");
              done();
            });
      });*/


    it('should test setTenant callback method for valid tenant',()=>{  
    
     let req={query:{emailid:"@shell.in",tenant:"ONGC"}};
     let res={};
      let result=setTenant(req, res);  
      assert.deepEqual(result, {   setTenantinfo: true});
  
    });


    it('should test setTenant callback method for invalid tenant',()=>{  
      
        let req={query:{emailid:"@shell.in",tenant:"BHGE"}};
        let res={};
        let result=setTenant(req, res);    
        assert.deepEqual(result, {
            msg: "invalid tenant"
          });
    
      });
  

});


describe('test filterDomainList',()=>{

    beforeEach(function(done) {
       done();
    });
    
    afterEach(function(done) {
        sinon.restore();
        done();
    });

    it('should test fileterDomainList function for config.TENANT_CONFIGURATION empty',()=>{

        sinon.stub(config, 'TENANT_CONFIGURATION').get(() => {});
       const[result1,result2]= filterDomainList({});
       assert.deepEqual(result1, {});
  

    });


    it('should test fileterDomainList function for config.TENANT_CONFIGURATION dummy',()=>{
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
       const[result1,result2]= filterDomainList(tenantlist);
       assert.deepEqual(result2, ["t1","t2"]);
  

    });

});


describe('test  validateTenant callback', () => {


    it('test api/validateTenant API for a valid tenant', (done) => {
      chai.request(mainapp)
          .get('/api/validateTenant')
          .query({tenant:"SHELL"})
          .end((err, res) => {
                res.should.have.status(200);
                res.body.setTenantinfo.should.be.eql(true);
            done();
          });
    });

 /*   it('test  api/setTenant API for an invalid tenant', (done) => {
        chai.request(mainapp)
            .get('/api/validateTenant')
            .query({tenant:"BHGE"})
            .end((err, res) => {
                  
                  res.body.msg.should.be.eql("invalid tenant");
              done();
            });
      });
*/

    it('should test validateTenant callback method for valid tenant',()=>{  
    
     let req={query:{tenant:"ONGC"}};
     let res={};
      let result=validateTenant(req, res);  
      assert.deepEqual(result, {   setTenantinfo: true});
  
    });


    it('should test setTenant callback method for invalid tenant',()=>{  
      
        let req={query:{tenant:"BHGE"}};
        let res={};
        let result=validateTenant(req, res);    
        assert.deepEqual(result, {
            msg: "invalid tenant"
          });
    
      });
  

});
 
});