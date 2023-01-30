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
function getPermissionData(responseData,data) {
    if(data){
      let resultData = "";
      data = data.data.apps;
      resultData = data.filter(function(o1){
        return responseData.some(function(o2){
            if(o1.rsname === o2.rsname){
                if(o1.scopes && o2.scopes)
                 o1.scopes.push(...o2.scopes);
                else if(o2.scopes){
                    o1['scopes'] = o2.scopes;
                }
            }
            return o1.rsname === o2.rsname && (o1.access === "enabled" || o1.access === "disabled") ;
        });
    })
      return resultData;
  }  
  return responseData
  
  };
  
  module.exports = {
    getPermissionData: getPermissionData
  };