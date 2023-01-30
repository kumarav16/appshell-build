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

 
const _ = require("lodash");
const express = require("express");
const rp = require("request-promise");
const proxy = require("express-request-proxy");
const request = require('request');
const compression = require("compression");
const apicache = require('apicache');
const router = express.Router();
const events = require('events');
const auth = require('./auth');
const em = new events.EventEmitter();
const logFile = require('./appshell-logger');
apicache.options({ debug:  false, enabled:  true });
const cache = apicache.middleware;
var config = require('./app-config'); 
var microapps = require('../microapp-services.json');
/* istanbul ignore next*/
var routeConfig = process.env.TENANT_INFO ? JSON.parse(process.env.TENANT_INFO)[0]['microappServices'] : microapps[0]['microappServices'];
/* istanbul ignore next*/
var node_env = process.env.TENANT_INFO ? 'tenantinfo' : (process.env.node_env || 'development');
const DEFAULT_TIMEOUT = 180000;
const uuid = require('node-uuid');
const logger=logFile.logger();
const NotificationIMethod = require('./behaviour/implementInterface');

var vstacktrace=function(){
  var codelocation=new Error().stack;
  return codelocation;
}
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);
/* istanbul ignore if */
if (config.multiInstance) {
  const redis=require('redis');
  var redisAdapter = require('socket.io-redis');
  var pubClient;
    pubClient = redis.createClient({ ...config.redisConfig});
    if(config.redisConfig.acl){
    pubClient['auth'] = null;
    pubClient.send_command('AUTH', [config.redisConfig.acl.username, config.redisConfig.acl.password], redis.print);
  }
  const subClient=pubClient.duplicate();
  io.adapter(redisAdapter({ pubClient,subClient }));
}
server.listen(config.wsport);
/* istanbul ignore next*/
io.on("connection", function (socket) {

  socket.on("token", function (msg) {
    logger.info('Socket connection established',vstacktrace());
    socket.join(msg);
  });
  socket.on("leave", function (msg) {
    socket.leave(msg);
  });
});
const onlyStatus200 = (req, res) => res.statusCode === 200;
const cacheTime = config.apiCacheTime || false;
//const cacheSuccesses = cache(cacheTime, onlyStatus200);
let cacheSuccesses ;
  /* istanbul ignore if*/
  if (cacheTime) {
    cacheSuccesses =  cache(cacheTime, onlyStatus200);
  }
  else {
      cacheSuccesses = function cacheSuccesses(req, res, next) {
        next();
      }
  };

const _require = require('http-proxy-middleware'),
    createProxyMiddleware = _require.createProxyMiddleware;

const updatelastcalltime = function (req, res, next) {
  let originalUrl = `/${req.originalUrl.replace(config.baseHref,"").replace("/?", "").toLowerCase()}`;
  let url_split = originalUrl.split('/');
  let appName = "/" + url_split[1].toLowerCase();
  const appIdx = _.findIndex(routeConfig, { path: appName });
/* istanbul ignore else */
  if (appIdx === -1) {
    next();
  }
  else {
    req.session.lastcalltime = new Date().getTime() + 0;
    next();
  }


};

const checktoken = function (req, res, next) {
  let originalUrl = `/${req.originalUrl.replace(config.baseHref,"").replace("/?", "").toLowerCase()}`;
  let url_split = originalUrl.split('/');
  let appName = "/" + url_split[1].toLowerCase();
  const appIdx = _.findIndex(routeConfig, { path: appName });
/* istanbul ignore else */
  if (appIdx === -1) {
    next();
  }
  else {
    if (req.session && req.session.clientToken) {
      next();
    }
    else {
      logger.info('Logout called due to no clientToken',vstacktrace(),req);
      auth.logout(req, res, next);
    }
  }


};
const callBack = function (req, res, next) {
    const customHeader = {}; // imp
    
    if (req.microapp) {
      logger.info('Callback request url',vstacktrace(),req.body);
      rp.get({
        uri: req.microapp.host + req.microapp.template,
        headers: customHeader,
        timeout: parseInt(req.headers.timeout) || DEFAULT_TIMEOUT,
        resolveWithFullResponse: true
      })
        .then(function (response) {
          let validURL = false;
          /* istanbul ignore else*/
          if(response.body.search("<title></title>") === -1){
            validURL = true;
          }
          //set cookie
          /* istanbul ignore else*/
          if(req.microapp.thirdPartyApp)
          { 
            res.cookie('appId', req.microapp.id, { secure: config.secure,  httpOnly: config.httpOnly, sameSite:config.sameSite });
            res.send({response: response.body, validURL:validURL});
          }
          else 
          {
           	 res.set('Cache-Control', 'max-age='+config.microappStaticFileCacheInSec);
            res.cookie('appId', 'unset', { secure: config.secure, httpOnly:config.httpOnly, sameSite:config.sameSite});
            res.send({ response: response.body, validURL:validURL});
          }
          
        })
        .catch(function (err) {
         /* istanbul ignore next */
          res.status(503).json({ error: err.message, validURL:false });
        });
    }else {
      next();
    }
  }
 /* istanbul ignore next */
  function getCookie(name, req) {
    let match;
    if(req.headers.cookie) {
      match = req.headers.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
    }
  
    return match ? match[1] : null;
  }
  function getTenant(req) {
    let clientTenant = req.session && req.session.clientConfig && req.session.clientConfig.tenant
    let tenant = process.env.tenant || config.tenant;
    /* istanbul ignore else */
    if (config.multiTenancy) {
      tenant = clientTenant;
      return tenant;
    }else{
      return tenant;
    }
  }
function create(routeConfig,passportadapter) {

  const router = express.Router();
  router.param("electron", (req, res, next, name) => {
    let appName = "/" + name.toLowerCase();

    //this gets the microapp object
    let appObject = _.find(routeConfig, { path: appName })
    //this finds index by comparing rbac id with microapp id
    /* istanbul ignore next */
    let isValidPermission = req.session.rbacResponse && _.findIndex(req.session.rbacResponse, { rsname: (appObject && appObject.id) });
    let appIdx = _.findIndex(routeConfig, { path: appName });
    
    let currtime = Math.floor(new Date().getTime()/1000);
    /* istanbul ignore if */
    if(currtime >= req.session.expiresOn){
        next();
    } else {
      /* istanbul ignore else */
      if (isValidPermission !== -1) {
      req.microapp = routeConfig[appIdx];
      // 2nd condition to cache first partial page
      /* istanbul ignore else */
      if (req.originalUrl.match(/.html|.woff2|.ttf|.svg|.css|.js/g) === null && req.originalUrl !== `/${name.toLowerCase()}/?`) {
        req.headers = Object.assign({}, req.headers, {
          "x-apicache-bypass": true,
          "traceId":uuid.v1(),
          "accept-language": req.headers["accept-language"],
          "original-url": req.get("original-url"),
          "content-type": req.headers["content-type"],
          "content-length": req.headers["content-length"],
          "authorization": 'Bearer ' + req.session.clientToken,
          "idToken": req.session.idToken,
          "tenant": getTenant(req),
          "tenantId": getTenant(req),
          "cookie": req.cookies ? Object.keys(req.cookies).map(k => `${k}=${urlencode(req.cookies[k])}`).join('; ') : undefined,
        });
      } else {
        req.headers = Object.assign({}, req.headers,
          {
            "accept-language": req.headers["accept-language"],
            "cookie": req.cookies ? Object.keys(req.cookies).map(k => `${k}=${urlencode(req.cookies[k])}`).join('; ') : undefined,
          });
      }
      next();
    } else {

      const appId = getCookie('appId', req);
      //if (appId && appId != null)
      if (appId && appId != 'unset')  
      {
        if (req.url.includes('js/') || req.url.includes('static/') || req.url.includes('/microapp.') || req.url.includes('/favicon.ico')) {         
          next();
        } else {
          const Idx = _.findIndex(routeConfig, { id: appId });
          req['microapp'] = routeConfig[Idx];
          createProxyMiddleware({
            target: req.microapp.host,
            changeOrigin: true, // for hosted sites, changes host header to match to target's host
            //ws: true, // enable websocket proxy
            logLevel: 'debug',
            secure: false,
            onProxyReq : (proxyReq, req) => {
              if (!req.body || !Object.keys(req.body).length) {
                return;
              }
            
              const contentType = proxyReq.getHeader('Content-Type');
              const writeBody = (bodyData) => {
                proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
                proxyReq.write(bodyData);
              };
              
              if (contentType === 'application/json') {
                writeBody(JSON.stringify(req.body));
              }
            
              if (contentType === 'application/x-www-form-urlencoded') {
                writeBody(querystring.stringify(req.body));
              }
            }
          })(req, res, next);
        }
      } else {
      // do not cache static content that is handled by service worker
      req.headers = Object.assign({}, req.headers,
        {
          "x-apicache-bypass": true
        }
      )
      next();
    }
  }}
  });




/* istanbul ignore next */
  const rmv = function (req) {
    req.removeAllListeners('data');
    req.removeAllListeners('end');

  };
/**
   * POST proxy body
   * https://stackoverflow.com/questions/28371641/how-can-i-use-express-http-proxy-after-bodyparser-json-has-been-called
   */
  router.use(function (req, res, next) {
    /* istanbul ignore if */
    if(req.headers['datatype'] !== 'binary' && req.headers["content-type"] === "application/json") {
      rmv(req);
    //add new listeners for the proxy to use
    process.nextTick(function () {
      if (req.body) {
        req.emit('data', JSON.stringify(req.body));
      }
      req.emit('end');
    });
   }
    
    next();
  });

var jwt_decode = require('jwt-decode');

router.use(`${config.baseHref}Service-hub/:clientProxy/*`,[checktoken, updatelastcalltime],(req,res,next)=>{
 
  var decoded = jwt_decode(req.session.refresh_token);
 
  req.session.expiresOn = decoded.exp;

  var currtime = Math.floor(new Date().getTime() / 1000);
 /* istanbul ignore if */
  if (currtime >= req.session.expiresOn){
    auth.logout(req, res, next);
  } else{  

    const clinethostName =  _.find(config.serviceHub,{ClientProxyName : req.params.clientProxy});

   req.headers = Object.assign({}, req.headers, {
      "x-apicache-bypass": true,
      "traceId": uuid.v1(),
      "content-type": req.headers["content-type"],
      "content-length": req.headers["content-length"],
      "authorization": 'Bearer ' + req.session.clientToken,
      "idToken": req.session.idToken,
      "tenant": getTenant(req),
      "tenantId": getTenant(req)});
    proxy({
      url: clinethostName.hostName+'/*',
      timeout: parseInt(req.headers.timeout) || 180000,
      originalQuery: req.originalUrl.indexOf("?") >= 0
    })(req, res, next); 
  }});

  router.use(`${config.baseHref}Notification-hub/:clientProxy/:notificationUrl`, [checktoken, updatelastcalltime], (req, res, next) => {
    let notificationUrl  = req.params && req.params.notificationUrl;
    let reqBody = req && req.body ;

    var decoded = jwt_decode(req.session.refresh_token);

    req.session.expiresOn = decoded.exp;
  
    var currtime = Math.floor(new Date().getTime() / 1000);

    const clientIdToken = req && req.session && req.session.clientToken; 
    /* istanbul ignore else */
    if (currtime >= req.session.expiresOn) {
      auth.logout(req, res, next);
    } else {
    
      const clinethostName = _.find(config.serviceHub, { ClientProxyName: req.params.clientProxy });    
      var input = {
        "tenant": getTenant(req),
        "token": 'Bearer ' + clientIdToken,
        "url": clinethostName.hostName + '/' + notificationUrl,
        "payload": {
          "body": reqBody
        }
      };

      if (req.method === "GET") {
        NotificationIMethod["default"].prototype.getData(input).then(function (data) {
          let response = {
            statusCode : data.status,
            body: data.data
          }
          return res.send(response);
        });
      } else if (req.method === "PATCH") {
        NotificationIMethod["default"].prototype.markNotificationAsRead(input).then(function (data) {
          let response = {
            statusCode : data.status,
            body: data.data
          }
          return res.send(response);
        });
      }     
    }
  });

  /**
   *   partial fetch
   */
  router.get(`${config.baseHref}:electron/`, [checktoken, cacheSuccesses, updatelastcalltime], callBack);




  // Proxy all requests for the elctron app path to its host
  router.use(`${config.baseHref}:electron/*`, [checktoken, cacheSuccesses, updatelastcalltime], (req, res, next) => {
    /* Following code is related to Refresh token feature, donnot remove)*/
    /* istanbul ignore if */
    if (req.microapp) {
      if(config.mockSecurityServiceObj){
        proxy({
          url: req.microapp.host + "/*",
          timeout: parseInt(req.headers.timeout) || DEFAULT_TIMEOUT,
          originalQuery: req.originalUrl.indexOf("?") >= 0
        })(req, res, next);
      }
       else {
        const {traceId}=req.headers;
        proxy({
          url: req.microapp.host + "/*",
          timeout: parseInt(req.headers.timeout) || DEFAULT_TIMEOUT,
          originalQuery: req.originalUrl.indexOf("?") >= 0
        },logger.info(`req proxy : ${req.originalUrl}`, vstacktrace()))(req, res, next);
        if(traceId){
          logger.info('http call',vstacktrace(),req,{requestObj:req,responseObj:res,http:true});
        }
      }
    } else {
      next();
    }
  });

  return router;
}

module.exports = {
  create: create,
  callBack:callBack,
  checktoken :checktoken,
  io:io
};
