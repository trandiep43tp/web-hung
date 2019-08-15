const express      = require('express');
const router       = express.Router(); 
const util         = require('util');    
const CategoryModel= require(__path_models  + 'category');
const UsersModel   = require(__path_models    + 'users');
const ArticleModel = require(__path_models    + 'article');
const UtilsHelper  = require(__path_helpers   + 'utils');
const ParamsHelper = require(__path_helpers   + 'params');
const StringHelper = require(__path_helpers   + 'string');
const systemConfig = require(__path_configs   + 'system');
const notify       = require(__path_configs   + 'notify');
const validateCategory = require(__path_validates + 'category');
const link         = '/'+ systemConfig.prefixAdmin + '/category';
const folderView   = __path_views_admin + 'pages/category/';  

router.get('(/:status)?', async (req, res, next)=> {  
	let objWhere      ={};
	let currentStatus = ParamsHelper.getParams(req.params, 'status', 'all');	
	 objWhere         = (currentStatus === "all" )? {} : {status: currentStatus};
	let query         = ParamsHelper.getParams(req.query, 'search', '');  
	if(query !== ''){
        objWhere.name = new RegExp(query, 'i');  	
    };
	let statusFilter  = await UtilsHelper.createFilterStatus(currentStatus, 'category');	
	let sort_field    = ParamsHelper.getParams(req.session, 'sort_field', 'ordering');
	let sort_type     = ParamsHelper.getParams(req.session, 'sort_type', 'asc');	
	let sort          = {};
		sort[sort_field] = sort_type;
	let pagination ={
		totalItems : 0,
		totalItemsperPage: 4,
		currentPage		 : 1,
        pageRanges       : 3,    
    };
	pagination.currentPage =  parseInt(ParamsHelper.getParams(req.query, 'page', 1));
	await CategoryModel.countDocuments(objWhere).then((data)=>{
			pagination.totalItems = data;		  
		 });
	//lấy dữ liệu 	
	CategoryModel
		.listItems(objWhere,sort,pagination)		
		.then((items)=> {
			res.render(folderView +'list', { 
				title: 'Category List page',
				items,
				statusFilter,
				currentStatus,
				query,
				pagination,
				sort_field,
				sort_type		
			})
		}); 
});
//thay đổi trạng thái status
router.get('/change-status/:id/:status', function(req, res, next) {	
	let currentStatus = ParamsHelper.getParams(req.params, 'status', 'active');
	let id            = ParamsHelper.getParams(req.params, 'id', '');
	CategoryModel.changeStatus(id, currentStatus).then((err)=>{
		req.flash('success', notify.CHANGE_STATUS_SUSCCESS ); 
		res.redirect(link);
	})	
});
//change status muti
router.post('/change-status/:status', function(req, res, next) {
	let currentStatus = ParamsHelper.getParams(req.params, 'status', 'active');
	let ids           = req.body.cid; 		
	CategoryModel.changeStatus( ids, currentStatus, 'muti').then((result)=>{
		req.flash('success', util.format(notify.CHANGE_STATUS_MUTI_SUSCCESS, result.n ));
		res.redirect(link);
	})	
});
//thay đổi trạng thái view
router.get('/change-view/:id/:view', function(req, res, next) {	
	let currentview = ParamsHelper.getParams(req.params, 'view', 'list');
	let id          = ParamsHelper.getParams(req.params, 'id', '');
	CategoryModel.changeview(id, currentview).then((err)=>{
		req.flash('success', notify.CHANGE_VIEW_SUSCCESS ); 
		res.redirect(link);
	})	
});
//change ordering
router.post('/change-ordering/', function(req, res, next) {
    let ids      = req.body.cid;
    let ordering = req.body.ordering;	
    if(Array.isArray(ids)){
        CategoryModel.changeOrdering(ids, ordering).then((result)=>{
            req.flash('success', util.format( notify.CHANGE_ORDERING_MUTI_SUSCCESS,ids.length ));
            res.redirect(link);
        })			
    }else{
        CategoryModel.changeOrdering(ids, ordering).then((result)=>{
            req.flash('success', notify.CHANGE_ORDERING_SUSCCESS);
            res.redirect(link);
        })			
    }
});
//khi nhấn delete
router.get('/delete/:id', function(req, res, next) {	
	let id  = ParamsHelper.getParams(req.params, 'id', '');
	CategoryModel.deleteItems(id).then(()=>{
		req.flash('success', notify.DELETE_SUSCCESS);
		res.redirect(link);
	})	
}); 
//delete- muti
router.post('/delete', function(req, res, next) {	
	let ids = req.body.cid;    
	CategoryModel.deleteItems(ids, 'muti').then((result)=>{
		req.flash('success', util.format( notify.DELETE_MUTI_SUSCCESS, result.n  ));
		res.redirect(link);
	})	
});
//add và Edit
router.get('/form/:status/:id?', async (req, res, next)=> {  
	let currentStatus = ParamsHelper.getParams(req.params, 'status', 'add');
	let id 			  = ParamsHelper.getParams(req.params, 'id', '');	
	let errors        = [];
	if(currentStatus == 'add'){
		let item = {name: '', ordering: 0, status: 'novalue', view: 'novalue', content: ''}			
		res.render(folderView +'form', { title: 'Item Add page', item, errors });
	}else{
		let item = {};
		await	CategoryModel.getItem(id).then((itemCategory)=>{ item = itemCategory })
		res.render(folderView + 'form', { title: 'Item Edit page', item, errors });
	}  
});
router.post('/save', (req, res, next)=>{
	const itemEdit  = Object.assign(req.body);  
	const errors    = validateCategory.validator(req);
	const item = {
		id:       itemEdit.id,
		name:     itemEdit.name, 
		ordering: parseInt(itemEdit.ordering), 
		status:   itemEdit.status, 
		view:     itemEdit.view, 
		slug:     StringHelper.createSlug(itemEdit.slug),
		content:  itemEdit.content
	};	 
	if (errors.length >0) { 		
		res.render(folderView + 'form', {title: 'Item Edit page', item, errors: errors });		
	}else{
		if(item.id !==''){  //edit
			CategoryModel.saveItems(item, 'edit').then((result)=>{
				//update lại thông tin article khi thay đổi name category
				ArticleModel.itemUpdateName(item).then((err, result)=>{ })
				req.flash('success', notify.CHANGE_ITEM_SUSCCESS);
				res.redirect(link);
			})	
		}else{  //add
			CategoryModel.saveItems(item, 'add').then((result)=>{
				req.flash('success', notify.ADD_SUSCCESS );
				res.redirect(link);
			})			
		}
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

module.exports = router;
 