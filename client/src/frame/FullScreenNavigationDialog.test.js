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
import {create} from 'react-test-renderer';
import FullScreenNavigationDialog  from './FullScreenNavigationDialog';
import { MemoryRouter } from "react-router-dom";
import Frame, { FrameContextConsumer } from 'react-frame-component';
import {shallow,mount} from 'enzyme';
import { unwrap } from '@material-ui/core/test-utils';
import '../setupTests';

const styles = {
    appBar: {
      position: 'relative',
    },
    flex: {
      flex: 1,
    },
    closeButton: {
      marginRight: 20,
    },
    shell:{
      width: '100%',
      height: '100%'
    }
  };

describe('FullScreenNavigationDialog',()=>{

    it('verify notification show state',()=>{
        const component = mount(<FullScreenNavigationDialog classes={styles} modalClose={()=>{}} >
        <div>children</div>
        </FullScreenNavigationDialog>
        );
        expect(component.state().open).toBeTruthy();
    });

   

   
}
);



describe('App frame component on post message',()=>{

  

    it("handleClickOpen",()=>{
        const component = mount(<FullScreenNavigationDialog classes={styles} modalClose={()=>{}} >
        <div>children</div>
        </FullScreenNavigationDialog>
        );
        component.instance().handleClickOpen();
        expect(component.state().open).toBeTruthy();

    });


    it("handleClose",()=>{
        const component = mount(<FullScreenNavigationDialog classes={styles} modalClose={()=>{}} >
        <div>children</div>
        </FullScreenNavigationDialog>
        );
        component.instance().handleClose();
        expect(component.state().open).toBeFalsy();

    });
  
});



