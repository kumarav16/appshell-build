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

function getQueryString(params) {
    var esc = encodeURIComponent;
    return Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
  }

  function request(params) {
    var method = params.method || 'GET';
    var qs = '';
    var body;
    var headers = params.headers || {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    if (['GET', 'DELETE'].indexOf(method) > -1)
      qs = '?' + getQueryString(params.data);
    else // POST or PUT
      body = JSON.stringify(params.data);

    var url = params.url + qs;

    return fetch(url, { method, headers, body });
  }

  export default {
    get: params => request(Object.assign({ method: 'GET' }, params)),
    post: params => request(Object.assign({ method: 'POST' }, params)),
    put: params => request(Object.assign({ method: 'PUT' }, params)),
    delete: params => request(Object.assign({ method: 'DELETE' }, params)),
    request: params => request(params)
  };