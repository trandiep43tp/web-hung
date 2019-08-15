const express      = require('express');
const router       = express.Router();
const passport     = require('passport');
const systemConfig = require(__path_configs + 'system');
const link         = '/'+ systemConfig.prefixAdmin + '/article';
const linkIndex    = '/'+ systemConfig.prefixAdmin + '/auth' ;
const folderView   = __path_views_admin + 'pages/login/';
const layoutFrontend = __path_views_admin + 'login';
const validateLogin  = require(__path_validates + 'login').login;
const {validationResult } = require('express-validator');

router.get('/logout',(req, res, next)=> {  
	req.logout();
	res.redirect(linkIndex);	
});  
router.get('/',(req, res, next)=> {  	
	if (req.isAuthenticated()) 	res.redirect(link);		
	let item ={username: '', password: ''}		
	res.render(folderView+ 'index',{
		layout: layoutFrontend,   	
		errors: false, 
		item 
	});
});  
router.get('/no-permission', function(req, res, next) {
	res.render(folderView + 'no-permission', { title: 'No Permission' });
});
router.post('/submit',validateLogin ,(req, res, next)=> {
    const item       = Object.assign(req.body);   
    const errors     = validationResult(req).array();         
	if (errors.length >0) {	       
		res.render(folderView+ 'index',{
			layout: layoutFrontend,   			
			errors, 
			item  
		});		
	}else{		       	
		passport.authenticate('local', {
			successRedirect: link,
			failureRedirect: linkIndex,
			failureFlash   : true
         })(req, res, next);	
	}; 
});

module.exports = router;
