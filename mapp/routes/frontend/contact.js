const express        = require('express');
const router         = express.Router();
const folderView     = __path_views_frontend + 'pages/contact/';
const layoutFrontend = __path_views_frontend + 'frontend';
const validateContact      = require(__path_validates + 'contact_frontend').contact;
const { validationResult } = require('express-validator');
const ContactModels        = require(__path_models    + 'contact');
const notify               = require(__path_configs   + 'notify');
const link                 = '/contact';

router.get('/', async (req, res, next)=> { 
    const item = {		
        yourname: '', 
        youremail: '',
        subject: '',
        message: ''	
    }; 
    const errors = [];
	res.render(folderView +'index', { 
           layout: layoutFrontend,
           item,
           errors          
    });
});


router.post('/save',validateContact,  (req, res, next) =>{  
    const itemEdit       = Object.assign(req.body);    
	const item = {		
        yourname: itemEdit.yourname, 
        youremail: itemEdit.youremail,
        subject: itemEdit.subject,
        message: itemEdit.message				
    };
    let errors       = validationResult(req).array();	
	if (errors.length >0) {
		res.render(folderView +'index', {
            layout: layoutFrontend,           
             item, 
             errors            
        });
	}else{		
        ContactModels.saveItemsFrontend(item).then((err, result)=>{
            req.flash('success', notify.ADD_CONTACT_SUSCCESS );
            res.redirect(link);
        })		
	}	
});

module.exports = router;