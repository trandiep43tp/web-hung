const express            = require('express');
const router             = express.Router();
const middlewareUserInfo = require(__path_middleware   + '/get-user-info');
const middlewareImagePanels    = require(__path_middleware   + 'get-image-panels');
const middlewareGroup   = require(__path_middleware   + 'get-group-admin');

router.use('/', middlewareUserInfo, middlewareImagePanels,middlewareGroup,  require('./home')); 
router.use('/rooms', require('./rooms')); 
// router.use('/restaurant', require('./restaurant'));
router.use('/about', require('./about')); 
router.use('/blog', require('./blog')); 
router.use('/contact', require('./contact')); 

module.exports = router;  