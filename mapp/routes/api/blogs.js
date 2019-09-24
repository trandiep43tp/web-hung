const express        = require('express');
const router         = express.Router();
const BlogModel      = require(__path_models + 'blog'); 
const ParamsHelper   =  require(__path_helpers   + 'params');


router.get('/bloghome', async(req, res, next)=> { 
    let objWhere      =  {show: 'show', special: 'top_post'};    
    await  BlogModel.listItemsFrontend(objWhere, null, null, {task: "items-home"}).then((items)=>{ 
        res.json(items);
    }); 
	
});

router.get('/blogpage', async(req, res, next)=> {  
    const search      = await JSON.parse(req.query.search) ;   
    const pagination  = await JSON.parse(req.query.pagination); 
    let objWhere      =  {show: 'show', status: 'active'};  
    if(search.name != undefined && search.name != ''){
        objWhere.name = new RegExp(search.name, 'i');  
    }
          
    await  BlogModel.listItemsFrontend(objWhere, null, pagination, {task: 'items-blogs'}).then((items)=>{ 
        res.json(items);
    }); 	
}); 

router.get('/blogcount', async (req, res, next)=> {  
    let search    = await JSON.parse(req.query.search) ;            
    let objWhere  =  {show: 'show', status: 'active'};
    if(search.name != ''&& search.name != undefined){
        objWhere.name = new RegExp(search.name, 'i');  
    }     
   	await  BlogModel.countDocuments(objWhere).then((blogCount)=>{           
        res.json(blogCount);
     });    
})

router.get('/blogdetail', async (req, res, next)=> { 
    let slug   = req.query;         
    await  BlogModel.listItemsFrontend(null, slug, pagination = null, {task: 'items-detail'})
            .then((item) => res.json(item))
    
});

router.get('/blogorther', async(req, res, next)=> {     
    let slug   = req.query;       
   await  BlogModel.listItemsFrontend(null, slug, null, {task: 'items-orther'}).then((items)=>{ 
       res.json(items);
   }); 	
});

router.get('/blogrecent', async(req, res, next)=> {      
   await  BlogModel.listItemsFrontend(null, null, null, {task: 'items-recent'}).then((items)=>{ 
       res.json(items);
   }); 	
});
   
       

module.exports = router;
 