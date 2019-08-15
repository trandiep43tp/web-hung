const express        = require('express');
const router         = express.Router();
const DistrictModel  = require(__path_models  + 'district');
const ArticleModel   = require(__path_models  + 'article');
const BlogModel      = require(__path_models  + 'blog');
const UserModel      = require(__path_models  + 'users');
const ImageModel     = require(__path_models  + 'imageweb');
const folderView     = __path_views_frontend + 'pages/home/';
const layoutFrontend = __path_views_frontend + 'frontend';

router.get('/', async (req, res, next)=> {   
    
    let itemsDistrict = [];
    let itemsArticle  = [];
    let itemsBlog     = [];
    let itemRandom    = [];
    let itemsImageCarourel= [];
    let itemsUser     = [];
    let linkImage     = 'article';
    let objWhereArticle   =  {show: 'show', special: 'top_post', status: 'active'};
    let objWhereBlog      =  {show: 'show', special: 'top_post'};
    let objWhereRandom    =  {show: 'show', status: 'active'};  
    let objWhereImage     =  {status: 'active', location: 'frontend'};   
    await  ImageModel.listItemsFrontend( objWhereImage, {task: 'items-home'}).then((items)=>{ itemsImageCarourel = items });
    await  DistrictModel.listItemsFrontend( null, {task: 'items-home'}).then((items)=>{ itemsDistrict = items });
    await  ArticleModel.listItemsFrontend(objWhereArticle, null, null, {task: 'items-home'}).then((items)=>{ itemsArticle = items });
    await  BlogModel.listItemsFrontend(objWhereBlog, null, null, {task: 'items-home'}).then((items)=>{ itemsBlog = items });
    await  UserModel.listItemsFrontend( null, {task: 'items-home'}).then((items)=>{ itemsUser = items });
    await  ArticleModel.listItemsFrontend(objWhereRandom, null, null, {task: 'items-random-home'}).then((items)=>{ itemRandom = items });
 
	res.render(folderView +'index', { 
            layout: layoutFrontend,                   
            itemsArticle,
            itemsDistrict,
            itemsBlog,
            itemsUser,
            itemRandom,
            linkImage,
            itemsImageCarourel 
    });
});

module.exports = router;