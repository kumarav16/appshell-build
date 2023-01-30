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

import React from 'react';
import  Fetch  from '../network/Fetch';

class PopupFrameHolder extends React.Component {

    state = {
        htmlContent: '<h3>Loading</h3>',
      };
    
    constructor(props) {
        super(props);
        this.holder = React.createRef();
    }  
     getFramePage(options) {
        Fetch.get(options)
        .then(response=>response.json())
        .then(data=> {
            this.setState({htmlContent: data.response})
        }).catch(err => { 
            console.log(err);  
            //this.props.onError(); 
        });    
        
      }
      
    componentDidMount() {
        const { path , data } = this.props;
        const options = {
           url: path,
           data: data || {}
       }
        this.getFramePage(options);
      }


    render() {
        const { htmlContent } = this.state;
        return (
           <React.Fragment>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
          </React.Fragment>  
        )
    }
}

export default PopupFrameHolder;