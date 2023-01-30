const assert = require('chai').assert;
const proton = require('../src/proton');
const chai = require('chai')
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = require('chai').expect
var express = require('express');
var request = require('supertest');
var app = express();
var router = express.Router();
const axios = require("axios");

describe('proton describe', function () {
   app.use(router);

  it("should return 200 if product api is successfully called", done => {
    axios
      .get('http://localhost:8000/api/usermanager/product')
      .then((response) => {
        expect(response.status).to.equal(200);
      });
    done()
  });
  it("should return 404 if error api is successfully called", done => {
    axios
      .get('http://localhost:8000/errorpage?')
      .then((response) => {
        expect(response.status).to.equal(404);
      });
    done()
  });
  it("should load statuc files on loading of AppShell", done => {
    axios
      .get('http://localhost:8000/static/js/2.e714499e.chunk.js')
      .then((response) => {
        expect(response.status).to.equal(200);
      });
    done()
  });

  it("should load static files on loading of AppShell for third party app", done => {
     var req = {headers : {cookie : "appId='"}};
    axios
      .get('http://localhost:8000/static/js/main.3e7424df.chunk.js',req)
      .then((response) => {
        expect(response.status).to.equal(200);
      });
    done()
  });

  // it("should return 200 if passwordPolicies api is successfully called", done => {
  //   axios
  //     .get('http://localhost:8000/api/usermanager/passwordPolicies')
  //     .then((response) => {
  //       expect(response.status).to.equal(200);
  //     });
  //   done()
  // });

  it("should return error as appbuilder is called without authentication", done => {
    axios
      .get("http://localhost:8000/app-builder")
      .then((response) => {
        expect(response.status).to.equal(200);
      }).catch(error => {
        console.log('error caught')
      });
    done()
  });
  it("should return error as appbuilder is called without authentication", done => {
    axios
      .get("http://localhost:8000/app-builder")
      .then((response) => {
        expect(response.status).to.equal(200);
      }).catch(error => {
        console.log('error caught')
      });
    done()
  });

  it("should proxy callBack request for all api which are not contain base herf appname return error if file data not found", done => {
    var req = {headers : {cookie : "appId=dremio"}};
   axios
     .get("http://localhost:8000/app.js", req)
     .then((response) => {
       expect(response.status).to.equal(200);
     }).catch(error => {
       console.log('error caught')
     });
   done()
 });
 
  it("should proxy callBack request for the elctron app path to its host", done => {
    router.get('/:electron/', function (req, res, next) {
    proton.callBack(req, res, next)
  });
    request(app)
      .get('/:electron/')
      .end(function (err) {
        if (err) throw err;
      });
    done()
  });

  it("should proxy callBack request for the elctron app path to its host", done => {
    app.use(router);
    router.get('electron', function (req, res, next) {
    proton.callBack(req, res, next)
  });
    request(app)
      .get('electron')
      .end(function (err) {
        if (err) throw err;
      });
    done()
  });
  it("should proxy callBack request for the feedback feature", done => {
   var req = {'originalUrl':'http://localhost:8000/Service-hub','session' : {'refresh_token':'xyz'}};
   axios
   .get("http://localhost:8000/Service-hub/feedback-proxy/api/feedbacks",req)
   .then((response) => {
     expect(response.status).to.equal(200);
   }).catch(error => {
     console.log('error caught')
   });
 done()
  });
  it("should proxy callBack request for the feedback feature", done => {
    var req = {Session : {"abc":"xyz"}};
    axios
    .get("http://localhost:8000/Notification-hub/feedback-proxy/api/feedbacks", req)
    .then((response) => {
      expect(response.status).to.equal(200);
    }).catch(error => {
      console.log('error caught')
    });
  done()
   });
  
  it("test for third party app set cookie value", done => {
    app.use(router);
    router.get('/:electron/', function (req, res, next) {
      req['microapp'] = {
        "id": "dremio",
        "name": "Dremio",
        "link": "/dremio/",
        "icon": "archiverounded",
        "host": "https://dremio-qa.np-0000183.npause1.bakerhughes.com",
        "path": "/dremio",
        "template": "/index.html",
        "navService": "/nav",
        "default": false,
        "thirdPartyApp": true,
        "isWebsocketRequired" : true,
        "websocketPathMap" :[
            {"webSocketServiceName": "","websocketServicePath":"/apiv2/socket"}
          ]
      } 
      proton.callBack(req, res, next)
    });
    request(app)
        .get('/:electron/')
        .end(function (err) {
            if (err) return done(err);
            done();
        });
    
    });
});
