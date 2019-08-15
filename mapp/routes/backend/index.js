const express           = require('express');
const router            = express.Router(); 
const middleware        = require(__path_middleware   + 'auth');
const middlewareUserInfo= require(__path_middleware   + 'get-user-info');
const middlewareGroup   = require(__path_middleware   + 'get-group-admin');

router.use('/auth', require('./login')); 
router.use('(/:status)?', middleware, middlewareUserInfo, middlewareGroup );   //cách viết bằng cách tách ra thành modunle khác rồi kéo vào
router.use('/imageweb', require('./imageweb'));
router.use('/category', require('./category'));
router.use('/district', require('./district')); 
router.use('/article', require('./article')); 
router.use('/contact', require('./contact')); 
router.use('/groups', require('./groups')); 
router.use('/users', require('./users')); 
router.use('/blog', require('./blog')); 

module.exports = router;
 
      