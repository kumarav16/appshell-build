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

import React, { Suspense } from 'react';
import ApppLoaderFrame from "../AppLoaderFrame";
import { withStyles } from '@material-ui/core';
let  OtherComponent,CustomCommonComponent;
function CommonComponent(props) {
  if (props.type == "component") {
    const componentName =props.name;    
    if(typeof(CustomCommonComponent) == 'undefined'){
      OtherComponent = import(`../${componentName}`);
      CustomCommonComponent = React.lazy(() => OtherComponent);    
      return (
        <Suspense fallback={<div></div>}>
            <CustomCommonComponent {...props} />
        </Suspense>
      );
    }else{ 
      return (
        <Suspense fallback={<div></div>}>
          <CustomCommonComponent  {...props} ></CustomCommonComponent>
        </Suspense>
      );
    }
  }else{
    return <ApppLoaderFrame {...props}></ApppLoaderFrame>;
  }
 
}


export default CommonComponent;

