const express        = require('express');
const router         = express.Router();
const util           = require('util');    //đây là thư viện của nodejs
const { validationResult } = require('express-validator');
const ArticleModels  = require(__path_models    + 'article');
const DistrictModels = require(__path_models    + 'district');
const UtilsHelper    = require(__path_helpers   + 'utils');
const ParamsHelper   = require(__path_helpers   + 'params');
const ImagesHelper   = require(__path_helpers   + 'file_list');
const systemConfig   = require(__path_configs   + 'system');
const notify         = require(__path_configs   + 'notify');
const validateArticle = require(__path_validates + 'article').article;
const link           = '/'+ systemConfig.prefixAdmin + '/article';
const folderView     = __path_views_admin + 'pages/article/';
const uploadImages   = ImagesHelper.upload('thumb', 'article');  //thumb là name của input hình

router.get('(/:status)?',async (req, res, next)=> {           
    let DistrictItems = [];
	let objWhere ={};	
	let currentStatus = ParamsHelper.getParams(req.params, 'status', 'all');		
	 objWhere         = (currentStatus === "all" )? {} : {status: currentStatus};	
    let query         = ParamsHelper.getParams(req.query, 'search', '');     	
	if(query !== ''){
		objWhere.name = new RegExp(query, 'i');   
	}
	//in ra các trạng thái filter	
	let statusFilter  = await UtilsHelper.createFilterStatus(currentStatus, 'article');	
	//lấy các điều kiện sort
	let sort_field = ParamsHelper.getParams(req.session, 'sort_field', 'ordering');
	let sort_type  = ParamsHelper.getParams(req.session, 'sort_type', 'asc');
    let districtId = ParamsHelper.getParams(req.session, 'district_id', 'novalue');       
    if(districtId != 'novalue'){
		objWhere['district.id'] =  districtId;
	}	
	let sort = {};
		sort[sort_field] = sort_type;
	//phân trang
	let pagination ={
		totalItems : 0,
		totalItemsperPage: 4,
		currentPage		 : 1,
		pageRanges       : 3,    
	}	
	// lấy số trang hiện tại
	pagination.currentPage =  parseInt(ParamsHelper.getParams(req.query, 'page', 1));
	//đếm tỏng số bản ghi
	await ArticleModels.countDocuments(objWhere).then((data)=>{
			pagination.totalItems = data;		  
		 })   
    await DistrictModels
        .listItemsforArticle()
        .then((items)=>{
            DistrictItems = items;			
        })
	//lấy dữ liệu 	
	ArticleModels.listItems(objWhere,sort,pagination).then((items)=> {		
		res.render(folderView + 'list', { 
			title: 'Rooms List page',
			items,
			statusFilter,
			currentStatus,
			query,
			pagination,
			sort_field,
            sort_type,
            DistrictItems		
		});
	}); 
}); 
//thay đổi trạng thái status
router.get('/change-status/:id/:status', function(req, res, next) {	
	let currentStatus = ParamsHelper.getParams(req.params, 'status', 'active');
	let id            = ParamsHelper.getParams(req.params, 'id', '');		
	ArticleModels.changeStatus(id, currentStatus).then((err, result)=>{
		req.flash('success', notify.CHANGE_STATUS_SUSCCESS); 
		res.redirect(link);
	});	
});
//change status muti
router.post('/change-status/:status', function(req, res, next) {
	let currentStatus = ParamsHelper.getParams(req.params, 'status', 'active');
	let ids           = req.body.cid;  //cid là tên đặt ở ô input bên layout		
	ArticleModels.changeStatus(ids, currentStatus, 'muti').then((result)=>{	
		req.flash('success', util.format(notify.CHANGE_STATUS_MUTI_SUSCCESS, result.n ));
		res.redirect(link);
	})	
});
//thay đổi trạng thái special
router.get('/change-special/:id/:status', function(req, res, next) {	
	let currentSpecial = ParamsHelper.getParams(req.params, 'status', 'nomal');
	let id             = ParamsHelper.getParams(req.params, 'id', '');		
	ArticleModels.changeSpecial(id, currentSpecial).then((err, result)=>{
		req.flash('success', notify.CHANGE_SPECIAL_SUSCCESS );
		res.redirect(link);
	});	
});
//change special muti
router.post('/change-special/:status', function(req, res, next) {
	let currentSpecial = ParamsHelper.getParams(req.params, 'status', 'active');
	let ids            = req.body.cid;  //cid là tên đặt ở ô input bên layout	
	ArticleModels.changeSpecial(ids, currentSpecial, 'muti').then((result)=>{	
		req.flash('success', util.format(notify.CHANGE_SPECIAL_MUTI_SUSCCESS, result.n ));
		res.redirect(link);
	})	
});
//thay đổi trạng thái show
router.get('/change-show/:id/:show', function(req, res, next) {	  
    let currentShow   = ParamsHelper.getParams(req.params, 'show', 'hidden');    
	let id            = ParamsHelper.getParams(req.params, 'id', '');		
	ArticleModels.changeShow(id, currentShow).then((err, result)=>{
		req.flash('success', notify.CHANGE_SHOW_SUSCCESS );
		res.redirect(link);
	});	
});
//change ordering
router.post('/change-ordering/', function(req, res, next) {
    let ids      = req.body.cid;
    let ordering = req.body.ordering;		
    if(Array.isArray(ids)){
        ArticleModels.changeOrdering(ids, ordering, 'muti').then((result)=>{
            req.flash('success', util.format( notify.CHANGE_ORDERING_MUTI_SUSCCESS,ids.length));
            res.redirect(link);
        });        
    }else{
        ArticleModels.changeOrdering(ids, ordering).then((result)=>{
            req.flash('success', notify.CHANGE_ORDERING_SUSCCESS);
            res.redirect(link);
        });	
    }	
});
//khi nhấn delete
router.get('/delete/:id', async (req, res, next)=> {	
	let id  = ParamsHelper.getParams(req.params, 'id', '');
	ArticleModels.deleteItems(id).then((result)=>{
		req.flash('success', notify.DELETE_SUSCCESS);
	 	res.redirect(link);
	})	
});
//delete- muti
router.post('/delete', function(req, res, next) {	
	let ids = req.body.cid;    
	ArticleModels.deleteItems(ids, 'muti').then((result)=>{
		req.flash('success', util.format( notify.DELETE_MUTI_SUSCCESS, result.n ));
		res.redirect(link);
	})
});
//add và Edit
router.get('/form/:status/:id?', async (req, res, next)=> {  
	let currentStatus = ParamsHelper.getParams(req.params, 'status', 'add');
	let id 			  = ParamsHelper.getParams(req.params, 'id', '');	
    let errors        = [];		
    let DistrictItems = [];
	await DistrictModels
		.listItemsforArticle()
		.then((items)=>{
			DistrictItems = items;			
		})

	if(currentStatus == 'add'){        
		let item = {
            name: '', 
            slug: '',
            status: 'novalue',   //còn hay đã cho thuê
            price: 0,            // giá
            ordering: 1,
            special: 'novalue',  //nomall or top_post 
            images: [],
            summary: '',
            content: '',     
            district:{
                id: '',
                name: ''
            },  //theo dõi thuộc quận nào
            show: ''    //hiện hay không hiện bài
        }			
		res.render(folderView +'form', { title: 'Room Add page', item, DistrictItems, errors });
	}else{
	    await	ArticleModels.getItem(id).then((itemArticle)=>{	item = itemArticle; });
    	res.render(folderView +'form', { title: 'Room Edit page', item, DistrictItems, errors });   
	}  
});
router.post('/save', uploadImages ,validateArticle , async (req, res, next)=>{	      
    let itemEdit     = Object.assign(req.body);  
    let listFile     = req.files;
    let listImageOld = (itemEdit.image_old != '')? itemEdit.image_old.split(',') : [];
    let taskCurrent  = (itemEdit.id != '')? 'edit' : 'add';
    let massage      = (taskCurrent === 'edit')? notify.CHANGE_ITEM_SUSCCESS : notify.ADD_SUSCCESS;
    let title        = (taskCurrent === 'edit')? 'Room Edit page' : 'Room add page';		
    let errors       = validationResult(req).array();
    let DistrictItems = [];
    await DistrictModels
        .listItemsforArticle()
        .then((items)=>{
            DistrictItems = items;			
        })
    let item = { 
        id       : itemEdit.id,
        name     : itemEdit.name,
        slug     : itemEdit.slug, 
        status   : itemEdit.status,
        price    : parseInt(itemEdit.price),
        ordering : parseInt(itemEdit.ordering),             
        special  : itemEdit.special,            
        images   : [],
        summary  : itemEdit.summary,
        content  : itemEdit.content,
        district : {
            id   : itemEdit.district_id,
            name : itemEdit.district_name,
        },           
        show     : itemEdit.show,
    };   
    if (errors.length > 0) {             
        //lấy lại các file hình
        if(listFile.length === 0){   
            listImageOld.forEach((image, index) => {                   
                item.images.push(image);                                
                })          				
        }
        //khi chèn tấm hình lên đúng, các trường dữ liêu khác sai thì hình vần chèn. do đó phải xóa đi
        if(listFile.length > 0){
            listFile.forEach( async (item, index) => {                   
                await   ImagesHelper.remove('public/uploads/article/', item.filename);                    
            })				
        }       
        res.render(folderView +'form', {title, item, DistrictItems, errors: errors});			
    }else{			
        if(listFile.length === 0){  //edit thông tin k phải edit hình 
            listImageOld.forEach((image, index) => {                   
                item.images.push(image);                                
            })          				
        }else{             
            listFile.forEach((file, index) => {                   
                item.images.push( file.filename);                                
            })				
            //xóa hình cũ
            if(taskCurrent == 'edit'){ 
                listImageOld.forEach( async (item, index) => {                   
                    await   ImagesHelper.remove('public/uploads/article/', item);                    
                })
            }
        }          
        ArticleModels.saveItems(item, taskCurrent).then((err, result)=>{
            req.flash('success', massage);
            res.redirect(link);
        })					
    }		
}); 
//SORT
router.get('/sort/:sort_field/:sort_type', function(req, res, next) {  
	let sort_field = ParamsHelper.getParams(req.params, 'sort_field', 'ordering');
	let sort_type  = ParamsHelper.getParams(req.params, 'sort_type', 'asc');
	//lưu vào trong session
	req.session.sort_field = sort_field;
	req.session.sort_type = sort_type;
	res.redirect(link);
});
router.get('/filter-district/:district_id', function(req, res, next) { 
   	let district_id = ParamsHelper.getParams(req.params, 'district_id', 0);
	//lưu vào trong session
	req.session.district_id = district_id;	
	res.redirect(link);
});

module.exports = router;
 