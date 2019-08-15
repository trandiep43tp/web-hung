const express        = require('express');
const router         = express.Router();
const BlogModel      = require(__path_models + 'blog'); 
const ParamsHelper   =  require(__path_helpers   + 'params');
const folderView     = __path_views_frontend + 'pages/blog/';
const layoutFrontend = __path_views_frontend + 'frontend';
const link           = '/blog';

router.get('/', async(req, res, next)=> {     
    let itemBlogs     = [];   
    let objWhere      = {show: 'show'};    
    //lấy các điều kiện search
    let search = ParamsHelper.getParams(req.query, 'search', '');   
    if(search != ''){
       
        objWhere.name = new RegExp(search, 'i');  
    }
     
    let pagination    ={
            totalItems : 0, 
            totalItemsperPage: 8,
            currentPage		 : 1,
            pageRanges       : 5,    
    };    
    pagination.currentPage =  parseInt(ParamsHelper.getParams(req.query, 'page', 1));     
	await  BlogModel.countDocuments(objWhere).then((data)=>{ pagination.totalItems = data });
    await  BlogModel.listItemsFrontend(objWhere, null, pagination, {task: 'items-rooms'}).then((items)=>{ itemBlogs = items });
    
	res.render(folderView +'index', { 
           layout: layoutFrontend, 
           itemBlogs,
           pagination,                   
    });
});
router.get('/detail/:slug', async (req, res, next)=> {   
    let itemBlog      = {};
    let itemOtherBlog = [];   
    let objWhere      = {show: 'show'};   
    let slug          = ParamsHelper.getParams(req.params, 'slug', '');    
    await BlogModel.listItemsFrontend(objWhere, {slug: slug}, null, {task: 'items-detail'}).then((item) =>{ itemBlog = item });
    await BlogModel.listItemsFrontend(objWhere, {id: itemBlog.id }, null, {task: 'items-others'}).then((items) =>{ itemOtherBlog = items });
    
	res.render(folderView +'detail', { 
           layout: layoutFrontend, 
           itemBlog,
           itemOtherBlog        
    });
});

//dùng jquery ddieeuf hướng từ file diep.js

// router.post('/search', (req, res, next) =>{
//     let itemSearch = Object.assign(req.body); 
//     req.session.search = itemSearch;	
// 	res.redirect(link);
// })

module.exports = router;