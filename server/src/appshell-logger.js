var {loggerObj} = require('@bh-ent-tech/bh-logger-adapter');
var httpContext = require('express-http-context');
const loggerConfig=require('../loggerConfig');
const RequestIp = require('@supercharge/request-ip')
// Wrap Winston logger to print reqId in each log

var req = {};
var customlogger;
let customauditlogger;
  /*const init = params => {
    req = params;
    log.reqObj(req)
  }*/
  const init = params => {

    loggerObj.logger_init(params);
   
    customlogger=loggerObj.get_logger("winston");
    customauditlogger = loggerObj.get_logger("audit");
    
  
  }

  const update=prop=>{
    loggerObj.update(prop);
  }
  


function createHttpLogMsg({requestObj,responseObj}){
 
  const { rawHeaders, httpVersion, method, socket, originalUrl } = requestObj;
  const {traceId}=requestObj.headers;
  const { statusCode, statusMessage } = responseObj;
  const headers = responseObj.getHeaders();
const logmsg=  JSON.stringify({
    timestamp: Date.now(),
    rawHeaders,
    httpVersion,
    method,
    originalUrl,
    traceId,
    response: {
      statusCode,
      statusMessage,
      headers
    }
  },null,'\t');
return {logmsg,traceId};
}
/* istanbul ignore next */
function stacktrace() {
  function st2(f) {
    var args = [];
    if (f) {
        for (var i = 0; i < f.arguments.length; i++) {
            args.push(f.arguments[i]);
        }
        var function_name = f.toString().split('(')[0].substring(9);
        return st2(f.caller) + function_name + '(' + args.join(', ') + ')' + "\n";
    } else {
        return "";
    }
  }
  return st2(arguments.callee.caller);
}
function logmessage(message,type,codeLoc,req,additionalprop){

  var codeStack = codeLoc.split('\n')[2];
  var filename = codeStack.split('\\');
  var methodname=filename[0].split('(');
  var codeLocation =methodname[0] +filename[filename.length-1];
  var applicationAddress=process.env.NODE_IP;
  var instanceID=process.env.POD_NAME;

  let userid,traceid,tenantid,sourceAddress;
  if(req){
   
    const {sub,tenantID}=(req.session&&req.session.passport&&req.session.passport.user)||{};
    userid=sub;tenantid=tenantID;
    // userid=req.session&&req.session.passport&&req.session.passport.user?req.session.passport.user.sub:undefined;
  //  tenantid=req.session&&req.session.passport?req.session.passport.user.tenantID:undefined;
     traceid=req.headers?(req.headers.traceId?req.headers.traceId:undefined):undefined;
     sourceAddress = RequestIp.getClientIp(req);
  }
  //message instanceof Error?  message=message.message+message.stack: message=message;
  if(additionalprop){
    //additionalprop.username?message=`${additionalprop.username} | `+message:message=message;
   // userid=additionalprop.username?additionalprop.username:null;
    if(additionalprop.http){
     const logobj= createHttpLogMsg(additionalprop);
    // traceid=logobj.traceid;
     message=message+logobj.logmsg;
    }
    
  }
  switch(type){
    case "error":
      //additionalprop?customlogger.error(message,additionalprop):customlogger.error(message);
     customlogger.error(message,{userid:userid,traceid:traceid,codeLocation:codeLocation,tenantId:tenantid,sourceAddress:sourceAddress,applicationAddress:applicationAddress,instanceID:instanceID});
      break;
      case "info":
       // additionalprop?customlogger.info(message,additionalprop):customlogger.info(message);
      // var text=console.trace();
     customlogger.info(message,{userid:userid,traceid:traceid,codeLocation:codeLocation,tenantId:tenantid,sourceAddress:sourceAddress,applicationAddress:applicationAddress,instanceID:instanceID});
     break; 

     case "warn":
      customlogger.warn(message,{userid:userid,traceid:traceid,codeLocation:codeLocation,tenantId:tenantid,sourceAddress:sourceAddress,applicationAddress:applicationAddress,instanceID:instanceID});
     break;   
  }
}
function auditmessage(message,type,req,additionalprop){

  var applicationAddress=process.env.NODE_IP;
  var instanceID=process.env.POD_NAME;
  let eventType= additionalprop.eventType || '';
  let eventCategory = additionalprop.eventCategory || '';
  let eventSubtype = additionalprop.eventSubtype || '';
  let response =  additionalprop.response;
  let userid,traceid,tenantid,sourceAddress;
  if(req){
   
    const {sub,tenantID}=(req.session&&req.session.passport&&req.session.passport.user)||{};
    userid=sub;tenantid=tenantID;
    // userid=req.session&&req.session.passport&&req.session.passport.user?req.session.passport.user.sub:undefined;
  //  tenantid=req.session&&req.session.passport?req.session.passport.user.tenantID:undefined;
     traceid=req.headers?(req.headers.traceId?req.headers.traceId:undefined):undefined;
     sourceAddress = RequestIp.getClientIp(req);
  }
  //message instanceof Error?  message=message.message+message.stack: message=message;
  if(additionalprop){
    //additionalprop.username?message=`${additionalprop.username} | `+message:message=message;
   // userid=additionalprop.username?additionalprop.username:null;
    if(additionalprop.http){
     const logobj= createHttpLogMsg(additionalprop);
    // traceid=logobj.traceid;
     message=message+logobj.logmsg;
    }
    
  }
  switch(type){
    case "error":
      //additionalprop?customlogger.error(message,additionalprop):customlogger.error(message);
     customauditlogger.error(message,{
     response : response || "Audit failed",
     "event-type":eventType,
     "event-category":eventCategory,
     "event-subtype": eventSubtype,
      traceid: traceid,
     'tenant-id': tenantid,
     'source-address': sourceAddress || "NA",
     'source-user-or-service-id': applicationAddress || "NA",
     'interaction-or-request-id': userid});
      break;
      case "info":
       // additionalprop?customauditlogger.info(message,additionalprop):customauditlogger.info(message);
      // var text=console.trace();
     customauditlogger.info(message,{response : response || "Audit Success",
     "event-type":eventType,
     "event-category":eventCategory,
     "event-subtype": eventSubtype,
      traceid: traceid,
     'tenant-id': tenantid,
     'source-address': sourceAddress || "NA",
     'source-user-or-service-id': applicationAddress || "NA",
     'interaction-or-request-id': userid
    });
     break; 

     case "warn":
      customauditlogger.warn(message,{response : response,
      "event-type":eventType,
      "event-category":eventCategory,
      "event-subtype": eventSubtype,
       traceid: traceid,
      'tenant-id': tenantid,
      'source-address': sourceAddress || "NA",
      'source-user-or-service-id': applicationAddress || "NA",
      'interaction-or-request-id': userid});
     break;   
  }
}
//1.if tenantmissing
const logger= function(message){//public //type of logger(future)
  __getTenant();
 
 
  return{

    error:function(Errorobj,message="",codeLocation,req={}){
      //customlogger.error(message,{userid:userid,traceid:traceid});
      if (message.length) {
        Errorobj.message=message
      }
     // additionalprop?logmessage(message,"error",req,):logmessage(message,"error");
     logmessage(Errorobj,"error",codeLocation,req);
    },
    info:function(message,codeLocation,req,additionalprop){
      additionalprop?logmessage(message,"info",codeLocation,req,additionalprop):logmessage(message,"info",codeLocation,req);
   
    },
    warn:function(message,codeLocation,req,additionalprop){
      additionalprop?logmessage(message,"warn",codeLocation,req,additionalprop):logmessage(message,"warn",codeLocation,req);
   
    }
  }
  //handle error level
}
const auditlogger= function(message){//public //type of logger(future)
  __getTenant();
 
 
  return{

    error:function(Errorobj,message="",codeLocation,req={}){
      //customlogger.error(message,{userid:userid,traceid:traceid});
      if (message.length) {
        Errorobj.message=message
      }
     // additionalprop?logmessage(message,"error",req,):logmessage(message,"error");
     auditmessage(Errorobj,"error",codeLocation,req);
    },
    info:function(message,codeLocation,req,additionalprop){
      additionalprop?auditmessage(message,"info",req,additionalprop):auditmessage(message,"info",codeLocation,req);
   
    },
    warn:function(message,codeLocation,req,additionalprop){
      additionalprop?auditmessage(message,"warn",req,additionalprop):auditmessage(message,"warn",codeLocation,req);
   
    }
  }
  //handle error level
}

function __getTenant(){//private to add tenant id
  var reqId = httpContext.get('reqId');

}
/*
function setLogDestination(){
  const env=loggerObj.getEnv();
  let output;
    switch(env)
    {
      case "production":
        output="file";
        loggerObj.set_logger_output_destination(output);
        break;
  
        case "development":
          output="console";
          loggerObj.set_logger_output_destination(output);
          break;  
    }
  }
  
  function setThreholdLevel(){
    const env=loggerObj.getEnv();
    let threhold_level;
    switch(env)
    {
      case "production":
        threhold_level="info";
        loggerObj.set_logger_thresholdlevel(threhold_level);
        break;
  
        case "development":
          threhold_level="info";
          loggerObj.set_logger_thresholdlevel(threhold_level);
          break;  
    }
  }
*/
module.exports = {
logger:logger,
auditlogger:auditlogger,
init:init,
update:update
};
//1. resuable npm package 
//2. deisgn folder struture file inside appshell(eg this file)
//3. can same be used fro log4js
