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

const _              = require('lodash');
const express        = require('express');
const request        = require('request-promise');
const router         = express.Router();

function resolveTenant(req, res, next) {

    next();
}

function create() {
        router.all('*', (req, res, next) => {
            resolveTenant(req, res, next);
        });
    
        return router;
    }

module.exports = {
    create: create,
};
