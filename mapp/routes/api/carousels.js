const express        = require('express');
const router         = express.Router();
const ImagelModels   = require(__path_models    + 'imageweb');
const ParamsHelper   = require(__path_helpers   + 'params');

router.get('/:slug', async (req, res, next)=> {      
    let slug			  = ParamsHelper.getParams(req.params, 'slug', 'home');	
    if(slug === 'home'){
        let objWhereImage     =  {status: 'active', location: 'frontend'}; 
        await  ImagelModels.listItemsFrontend( objWhereImage, { task: 'items-home'}).then((items)=>{ 
                 res.json(items);
        }); 
    }

    if(slug === 'panel'){
        let objWhereImage     =  {status: 'active', location: 'page'}; 
        await  ImagelModels.listItemsFrontend( objWhereImage, { task: 'items-page'}).then((items)=>{ 
                 res.json(items);
        }); 
    }
   	
});   

module.exports = router; 
 