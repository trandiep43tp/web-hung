const express        = require('express');
const router         = express.Router();
const UserModels  = require(__path_models    + 'users');

router.get('/', async (req, res, next)=> { 
    await  UserModels.listItemsFrontend( null, { task: 'items-home'}).then((items)=>{ 
             res.json(items);
    }); 	
});
   

module.exports = router;
 