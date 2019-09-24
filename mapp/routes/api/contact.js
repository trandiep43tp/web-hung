const express        = require('express');
const router         = express.Router();
const folderView     = __path_views_frontend + 'pages/contact/';
const layoutFrontend = __path_views_frontend + 'frontend';
const validateContact      = require(__path_validates + 'contact_frontend').contact;
const { validationResult } = require('express-validator');
const ContactModels        = require(__path_models    + 'contact');
const notify               = require(__path_configs   + 'notify');
const link                 = '/contact';


router.post('/', (req, res, next) =>{     
     const itemEdit       = req.query;
	const item = {		
        yourname: itemEdit.name, 
        youremail: itemEdit.email,
        subject: itemEdit.subject,
        message: itemEdit.content				
    };    
    ContactModels.saveItemsFrontend(item).then((err, result)=>{       
        res.json(result);
    })	
});

module.exports = router;