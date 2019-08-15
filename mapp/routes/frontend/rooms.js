const express        = require('express');
const router         = express.Router();
const ArticleModel   = require(__path_models  + 'article');
const DistrictModel  = require(__path_models  + 'district');
const BlogModel      = require(__path_models + 'blog'); 
const folderView     = __path_views_frontend + 'pages/rooms/';
const layoutFrontend = __path_views_frontend + 'frontend';
const ParamsHelper   = require(__path_helpers   + 'params');
const link           = '/rooms';

router.get('/', async (req, res, next)=> { 
    
    let sort          = {};
    let itemsArticle  = [];
    let itemsDistrict = [];
    let itemRandom    = [];   
    let linkImage     = 'blog';    //để định lại đường dẫn cho istagram
    let objWhere      = {show: 'show'};
    let objWhereRandom= {show: 'show'};   
    let itemSearch    = { name: '',
                       price_min: '',
                       price_max: '',
                       sort: 'novalue',
                       districtId: 'novalue' };

     //lấy các điều kiện search
    let search = ParamsHelper.getParams(req.session, 'search', itemSearch);
   
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
    
    let pagination ={
		totalItems : 0,
		totalItemsperPage: 6,  
		currentPage		 : 1,
		pageRanges       : 5,    
    };   
    // lấy số trang hiện tại
    pagination.currentPage =  parseInt(ParamsHelper.getParams(req.query, 'page', 1));    
   	await  ArticleModel.countDocuments(objWhere).then((data)=>{ pagination.totalItems = data });
    await  DistrictModel.listItemsFrontend( null, {task: 'items-home'}).then((items)=>{ itemsDistrict = items });
    await  ArticleModel.listItemsFrontend( objWhere,{sort: sort}, pagination, {task: 'items-rooms'}).then((items)=>{ itemsArticle = items });
    await  BlogModel.listItemsFrontend(objWhereRandom, null, null, {task: 'items-random'}).then((items)=>{ itemRandom = items });
    
	res.render(folderView +'index', { 
        layout: layoutFrontend,      
        itemsArticle,
        itemsDistrict,
        itemSearch: search,
        pagination,
        objWhere,
        itemRandom,
        linkImage         
    });
});
router.post('/', async (req, res, next)=> { 
    let itemSearch = Object.assign(req.body);      
	req.session.search = itemSearch;	
	res.redirect(link);
});
router.get('/clear', async (req, res, next)=> {    
    let itemSearch = { price_min: '',
                       price_max: '',
                       districtId: 'novalue' };
    req.session.search = itemSearch;	
    res.redirect(link);   
});
router.get('/detail/:slug', async (req, res, next)=> {    
    let slug           = ParamsHelper.getParams(req.params, 'slug', '');   
    let linkImage      = 'blog'; 
    let objWhereRandom = {show: 'show'};
    let itemDetail     = {};
    let itemRandomInstagram     = [];
    let itemRecentBlog = [];
    let itemRoomOther  = [];
    await  ArticleModel.listItemsFrontend({}, { slug: slug}, null, {task: 'items-detail'}).then((item )=>{ itemDetail = item });
    await  ArticleModel.listItemsFrontend({}, { slug: slug}, null, {task: 'items-others'}).then((items )=>{ itemRoomOther = items });
    await  BlogModel.listItemsFrontend(objWhereRandom, null, null, {task: 'items-random'}).then((items)=>{ itemRandomInstagram = items });
    await  BlogModel.listItemsFrontend(objWhereRandom, null, null, {task: 'items-recent-blog'}).then((items)=>{ itemRecentBlog = items });

	res.render(folderView +'detail', { 
           layout: layoutFrontend,   
           itemDetail,
           itemRoomOther,
           itemRandom: itemRandomInstagram,
           itemRecentBlog,
           linkImage    
    });
});

 
//thử cách khi nhấn vào texbox start. sự kiện form-check-input trong file diep.js được chạy
router.post('/start/:page', (req, res, next) =>{
    //xử lý các vấn đề gửi lên
     let itemSearch = Object.assign(req.body); 
    //điều hướng về trang đang xem
  
    let slug = ParamsHelper.getParams(req.params, 'page', '');
    let newLink = link + '?page=' + slug;        
    res.redirect(newLink);
});
 
//serach này trong detail
router.post('/search',  (req, res, next)=> { 
    let itemSearch = Object.assign(req.body); 
    req.session.search = itemSearch;	
	res.redirect(link);
});

module.exports = router;