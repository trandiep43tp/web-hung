const express        = require('express');
const router         = express.Router();
const ArticleModels  = require(__path_models    + 'article');
const ParamsHelper   = require(__path_helpers   + 'params');

router.get('/roomhome', async (req, res, next)=> {               
    let objWhere  =  {show: 'show', special: 'top_post', status: 'active'};    
    await  ArticleModels.listItemsFrontend( objWhere,null, null, {task: 'items-home'}).then((items)=>{ 
        res.json(items);
    }); 	
});

router.get('/roompage', async (req, res, next)=> {  
    const search      = await JSON.parse(req.query.search) ;
    const pagination  = await JSON.parse(req.query.pagination); 
         
    let sort          = {};            
    let objWhere      =  {show: 'show', status: 'active'};   
     //lấy các điều kiện search  
    if(search.name != ''&& search.name != undefined){
        objWhere.name = new RegExp(search.name, 'i');  
    }
    if( search.districtId != 'novalue' && search.districtId != undefined ){
            objWhere['district.id'] = search.districtId;
    };
    if( search.sort != 'novalue' && search.sort != undefined){        
        sort = {'price': search.sort};
    };    
    if(search.price_min != '' && search.price_max != '' && search.price_min != undefined && search.price_max != undefined   ){
        objWhere.price =  { $gte: parseInt(search.price_min), $lte: parseInt( search.price_max) };      
    };  
    await  ArticleModels.listItemsFrontend( objWhere,{sort: sort}, pagination, {task: 'items-rooms'}).then((items)=>{ 
        res.json(items);
    }); 	
});

router.get('/roomscount', async (req, res, next)=> {  
    let search    = await JSON.parse(req.query.search) ;            
    let objWhere  =  {show: 'show', status: 'active'};
    if(search.name != ''&& search.name != undefined){
        objWhere.name = new RegExp(search.name, 'i');  
    }
    if( search.districtId != 'novalue' && search.districtId != undefined ){
        objWhere['district.id'] = search.districtId;
    };     
    if(search.price_min != '' && search.price_max != '' && search.price_min != undefined && search.price_max != undefined   ){
        objWhere.price =  { $gte: parseInt(search.price_min), $lte: parseInt( search.price_max) };        
    };        
   	await  ArticleModels.countDocuments(objWhere).then((roomsCount)=>{           
        res.json(roomsCount);
     });    
});

router.get('/roomdetail', async (req, res, next)=> { 
    let slug   = req.query; 
    await  ArticleModels.listItemsFrontend(null, slug, pagination = null, {task: 'items-detail'})
            .then((item) => res.json(item))
    
});

router.get('/roomsorther', async (req, res, next)=> {     
    let slug   = req.query;   
    await  ArticleModels.listItemsFrontend(null, slug, pagination = null, {task: 'items-others'})
            .then((item) => res.json(item))
    
});

       

module.exports = router;
 