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

var request = require('request');
var config = require('./app-config'); // get config settings from local file or VCAPS env var in the cloud
const logFile = require('./appshell-logger');
const logger=logFile.logger();
var key = 'ae9c8a84-5bb2-11eb-ae93-0242ac130002';
var decryptor = require('simple-encryptor')(key);
/* istanbul ignore next */
var endsession = function endsession(req, res) {

  // req.session.destroy();
  // req.logout();
   res.send({
     message: 'session missing',
     timeoutmsg: 'session missing',
     'validURL': true
   });
 }
/* istanbul ignore next */
var logout = function (req, res) {
  //log.reqObj(req);
  if (config.grantType === "authorization_code") {
  

    var errorHandler = function (errorString) {
      res.setHeader("Content-Security-Policy", "script-src 'self'");
      res.send(errorString);
      auditlogger.info("Logout request sent to keycloak",req,{"eventCategory":"Logout","eventSubtype": "Failure","eventType":"Logout","response":"Audit_Failure"});
    };

    var successHandler = function (response) {
      if (parseInt(response.statusCode) === 204) {
        res.send({ message: 'success', grant: 'auth_code' });
        auditlogger.info("Logout request sent to keycloak",req,{"eventCategory":"Logout","eventSubtype": "Success","eventType":"Logout","response":"Audit_Success"});
      }
    };

    var id_token = req.session.idToken;
    var token = req.session.clientToken;
    req.session.destroy();
    var logoutUrl = config.uaaURL + config.logoutUrl + '?id_token_hint=' + id_token + '&tenant=' + config.tenant + '&client_id=' + config.clientId + '&access_token=' + token + '&client_secret=' + config.clientSecret;
 
    getLogOut(logoutUrl, successHandler, errorHandler);
  } else {
  
//     req.session.destroy();
    req.logout();

    res.send({ message: 'success', timeoutmsg: 'success timeout','validURL':true });
  }
};
/* istanbul ignore next */
function getLogOut(url, successCallback, errorCallback) {
  var options = {
    method: 'GET',
    url: url,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "cache-control": "no-cache"
    }
  };

  request(options, function (err, response, body) {
 
     /* istanbul ignore if */
    if (!err && parseInt(response.statusCode) === 204) {

      successCallback(response);
    } else if (errorCallback) {

      errorCallback(body);
    } 
  });
};

module.exports = {
  logout: logout,
  endsession:endsession
};
