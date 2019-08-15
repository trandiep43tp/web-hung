const express        = require('express');
const router         = express.Router();
const util           = require('util');    //đây là thư viện của nodejs
const { validationResult } = require('express-validator');
const BlogModels     = require(__path_models    + 'blog');
const UtilsHelper    = require(__path_helpers   + 'utils');
const ParamsHelper   = require(__path_helpers   + 'params');
const ImagesHelper   = require(__path_helpers   + 'file_list');
const systemConfig   = require(__path_configs   + 'system');
const notify         = require(__path_configs   + 'notify');
const validateBlog   = require(__path_validates + 'blog').blog;
const link           = '/'+ systemConfig.prefixAdmin + '/blog';
const folderView     = __path_views_admin + 'pages/blog/';
const uploadImages   = ImagesHelper.upload('thumb', 'blog');  //thumb là name của input hình

router.get('(/:status)?',async (req, res, next)=> { 
	let objWhere ={};	
	let currentStatus = ParamsHelper.getParams(req.params, 'status', 'all');		
	 objWhere         = (currentStatus === "all" )? {} : {status: currentStatus};	
	let query         = ParamsHelper.getParams(req.query, 'search', '');  	
	if(query !== ''){
		objWhere.name = new RegExp(query, 'i');   //tìm kiếm không phân biệt các chữ hoa, thường
	}	
	let statusFilter  = await UtilsHelper.createFilterStatus(currentStatus, 'blog');
	//lấy các điều kiện sort
	let sort_field = ParamsHelper.getParams(req.session, 'sort_field', 'ordering');
	let sort_type  = ParamsHelper.getParams(req.session, 'sort_type', 'asc');
    let categoryId = ParamsHelper.getParams(req.session, 'category_id', 0);
	if(categoryId != 0){
		objWhere.category = categoryId;
	}	
	let sort = {};
		sort[sort_field] = sort_type;
	//phân trang
	let pagination ={
		totalItems : 0,
		totalItemsperPage: 4,
		currentPage		 : 1,
		pageRanges       : 3,    //để cấu hình khi có quá nhiều trang. ta chỉ cho hiện 3 trang trên phân trang
	}	
	pagination.currentPage =  parseInt(ParamsHelper.getParams(req.query, 'page', 1));
	await BlogModels.countDocuments(objWhere).then((data)=>{
			pagination.totalItems = data;		  
		 })
	//lấy dữ liệu 	
	BlogModels.listItems(objWhere,sort,pagination).then((items)=> {		
		res.render(folderView + 'list', { 
			title: 'Blog List page',
			items,
			statusFilter,
			currentStatus,
			query,
			pagination,
			sort_field,
			sort_type		
		});
	}); 

});   
//thay đổi trạng thái status
router.get('/change-status/:id/:status', function(req, res, next) {	
	let currentStatus = ParamsHelper.getParams(req.params, 'status', 'active');
	let id            = ParamsHelper.getParams(req.params, 'id', '');
		
	BlogModels.changeStatus(id, currentStatus).then((err, result)=>{
		req.flash('success', notify.CHANGE_STATUS_SUSCCESS); 
		res.redirect(link);
	});	
});
//change status muti
router.post('/change-status/:status', function(req, res, next) {
	let currentStatus = ParamsHelper.getParams(req.params, 'status', 'active');
	let ids = req.body.cid;  	
	BlogModels.changeStatus(ids, currentStatus, 'muti').then((result)=>{	
		req.flash('success', util.format(notify.CHANGE_STATUS_MUTI_SUSCCESS, result.n ));
		res.redirect(link);
	})	
});
//thay đổi trạng thái special
router.get('/change-special/:id/:status', function(req, res, next) {	
	let currentSpecial = ParamsHelper.getParams(req.params, 'status', 'nomal');
	let id             = ParamsHelper.getParams(req.params, 'id', '');		
	BlogModels.changeSpecial(id, currentSpecial).then((err, result)=>{
		req.flash('success', notify.CHANGE_SPECIAL_SUSCCESS );
		res.redirect(link);
	});	
});
//change special muti
router.post('/change-special/:status', function(req, res, next) {
	let currentSpecial = ParamsHelper.getParams(req.params, 'status', 'active');
	let ids            = req.body.cid; 	
	BlogModels.changeSpecial(ids, currentSpecial, 'muti').then((result)=>{	
		req.flash('success', util.format(notify.CHANGE_SPECIAL_MUTI_SUSCCESS, result.n ));
		res.redirect(link);
	})	
});
//thay đổi trạng thái show
router.get('/change-show/:id/:show', function(req, res, next) {	  
    let currentShow   = ParamsHelper.getParams(req.params, 'show', 'hidden');    
	let id            = ParamsHelper.getParams(req.params, 'id', '');		
	BlogModels.changeShow(id, currentShow).then((err, result)=>{
		req.flash('success', notify.CHANGE_SHOW_SUSCCESS );
		res.redirect(link);
	});	
});
//change ordering
router.post('/change-ordering/', function(req, res, next) {
    let ids     = req.body.cid;
    let ordering = req.body.ordering;		
    if(Array.isArray(ids)){
        BlogModels.changeOrdering(ids, ordering, 'muti').then((result)=>{
            req.flash('success', util.format( notify.CHANGE_ORDERING_MUTI_SUSCCESS,ids.length));
            res.redirect(link);
        });        
    }else{
        BlogModels.changeOrdering(ids, ordering).then((result)=>{
            req.flash('success', notify.CHANGE_ORDERING_SUSCCESS);
            res.redirect(link);
        });	
    }	
});
//khi nhấn delete
router.get('/delete/:id', async (req, res, next)=> {	
	let id  = ParamsHelper.getParams(req.params, 'id', '');
	BlogModels.deleteItems(id).then((result)=>{
		req.flash('success', notify.DELETE_SUSCCESS);
	 	res.redirect(link);
	})	
});
//delete- muti
router.post('/delete', function(req, res, next) {	
	let ids = req.body.cid;   
	BlogModels.deleteItems(ids, 'muti').then((result)=>{
		req.flash('success', util.format( notify.DELETE_MUTI_SUSCCESS, result.n ));
		res.redirect(link);
	})
});  
//add và Edit
router.get('/form/:status/:id?', async (req, res, next)=> {  
	let currentStatus = ParamsHelper.getParams(req.params, 'status', 'add');
	let id 			  = ParamsHelper.getParams(req.params, 'id', '');	
	let errors        = [];	
	if(currentStatus == 'add'){        
		let item = {
            name: '', 
            slug: '',
            status: 'novalue',  
            ordering: 1,
            special: 'novalue',  //nomall or top_post 
            images: [],
            summary: '',    //tóm tắt
            content: '',     
            show: ''    //hiện hay không hiện bài
        }			
		res.render(folderView +'form', { title: 'Blog Add page', item, errors });
	}else{
	    await	BlogModels.getItem(id).then((itemBlog)=>{	item = itemBlog; });
    	res.render(folderView +'form', { title: 'Blog Edit page', item,  errors });   
	}  
});
router.post('/save', uploadImages ,validateBlog ,(req, res, next)=>{ 
    let itemEdit     = Object.assign(req.body);  
    let listFile     = req.files;
    let listImageOld = (itemEdit.image_old != '')? itemEdit.image_old.split(',') : [];
    let taskCurrent  = (itemEdit.id != '')? 'edit' : 'add';
    let massage      = (taskCurrent === 'edit')? notify.CHANGE_ITEM_SUSCCESS : notify.ADD_SUSCCESS;
    let title        = (taskCurrent === 'edit')? 'Blog Edit page' : 'Blog add page';		
    let errors       = validationResult(req).array();
    let item = { 
        id       : itemEdit.id,
        name     : itemEdit.name,
        slug     : itemEdit.slug, 
        status   : itemEdit.status,           
        ordering : parseInt(itemEdit.ordering),             
        special  : itemEdit.special,           
        images   : [],
        summary  : itemEdit.summary,
        content  : itemEdit.content,                     
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
                await   ImagesHelper.remove('public/uploads/blog/', item.filename);                    
            })				
        }        
        res.render(folderView +'form', {title, item, errors: errors});			
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
                    await   ImagesHelper.remove('public/uploads/blog/', item);                    
                })
            }
        }       
        BlogModels.saveItems(item, taskCurrent).then((err, result)=>{
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
router.get('/filter-category/:category_id', function(req, res, next) { 
   	let category_id = ParamsHelper.getParams(req.params, 'category_id', 0);
	//lưu vào trong session
	req.session.category_id = category_id;
	res.redirect(link);
});

module.exports = router;
 