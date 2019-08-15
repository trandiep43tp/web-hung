const express      = require('express');
const router       = express.Router(); 
const util         = require('util'); 
const { validationResult } = require('express-validator');
const DistrictModel= require(__path_models  + 'district');
const ArticleModel = require(__path_models    + 'article');
const UtilsHelper  = require(__path_helpers   + 'utils');
const ParamsHelper = require(__path_helpers   + 'params');
const StringHelper = require(__path_helpers   + 'string');
const systemConfig = require(__path_configs   + 'system');
const notify       = require(__path_configs   + 'notify');
const validateDistrict = require(__path_validates + 'district').district;
const link         = '/'+ systemConfig.prefixAdmin + '/district';
const folderView   = __path_views_admin + 'pages/district/';   

router.get('(/:status)?', async (req, res, next)=> { 
	let objWhere ={};	
	let currentStatus = ParamsHelper.getParams(req.params, 'status', 'all');	
	 objWhere = (currentStatus === "all" )? {} : {status: currentStatus};	
	let query = ParamsHelper.getParams(req.query, 'search', '');  
	if(query !== ''){
		objWhere.name = new RegExp(query, 'i');   
	}	
	let statusFilter  = await UtilsHelper.createFilterStatus(currentStatus, 'district');
	//lấy các điều kiện sort
	let sort_field = ParamsHelper.getParams(req.session, 'sort_field', 'ordering');
	let sort_type  = ParamsHelper.getParams(req.session, 'sort_type', 'asc');	
	let sort = {};
		sort[sort_field] = sort_type;
	//phân trang
	let pagination ={
		totalItems : 0,
		totalItemsperPage: 4,
		currentPage		 : 1,
		pageRanges       : 3,    
	}	
	pagination.currentPage =  parseInt(ParamsHelper.getParams(req.query, 'page', 1));
	//đếm tỏng số bản ghi
	await DistrictModel.countDocuments(objWhere).then((data)=>{
			pagination.totalItems = data;		  
		 });	
	//lấy dữ liệu 	
	DistrictModel
		.listItems(objWhere,sort,pagination)		
		.then((items)=> {
			res.render(folderView +'list', { 
				title: 'District List page',
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
	DistrictModel.changeStatus(id, currentStatus).then((err)=>{
		req.flash('success', notify.CHANGE_STATUS_SUSCCESS ); 
		res.redirect(link);
	})	
});
//change status muti
router.post('/change-status/:status', function(req, res, next) {
	let currentStatus = ParamsHelper.getParams(req.params, 'status', 'active');
	let ids           = req.body.cid;  		
	DistrictModel.changeStatus( ids, currentStatus, 'muti').then((result)=>{
		req.flash('success', util.format(notify.CHANGE_STATUS_MUTI_SUSCCESS, result.n ));
		res.redirect(link);
	})	
});
//change ordering
router.post('/change-ordering/', function(req, res, next) {
    let ids      = req.body.cid;
    let ordering = req.body.ordering;		
    if(Array.isArray(ids)){
        DistrictModel.changeOrdering(ids, ordering).then((result)=>{
            req.flash('success', util.format( notify.CHANGE_ORDERING_MUTI_SUSCCESS,ids.length ));
            res.redirect(link);
        })			
    }else{
        DistrictModel.changeOrdering(ids, ordering).then((result)=>{
            req.flash('success', notify.CHANGE_ORDERING_SUSCCESS);
            res.redirect(link);
        })			
    }
});
//khi nhấn delete
router.get('/delete/:id', async (req, res, next) => {	
    let id          = ParamsHelper.getParams(req.params, 'id', '');   
    let articleList = [];
    await  ArticleModel
        .getItembyDistrictId(id)
        .then((items) =>{
            articleList = items
        });
    if(articleList.length > 0){
        req.flash('danger', notify.DELETE_FAIL);
		res.redirect(link);       
    }else{
        DistrictModel.deleteItems(id).then(()=>{
            req.flash('success', notify.DELETE_SUSCCESS);
            res.redirect(link);
	    });	
    };	
}); 
//delete- muti
router.post('/delete', function(req, res, next) {	
	let ids = req.body.cid;   
	DistrictModel.deleteItems(ids, 'muti').then((result)=>{
		req.flash('success', util.format( notify.DELETE_MUTI_SUSCCESS, result.n));
		res.redirect(link);
	});	
});			 
router.get('/form/:status/:id?', async (req, res, next)=> {  
	let currentStatus = ParamsHelper.getParams(req.params, 'status', 'add');
	let id 			  = ParamsHelper.getParams(req.params, 'id', '');	
	let errors        = [];
	if(currentStatus == 'add'){
		let item = {name: '', slug: '', ordering: 0, status: 'novalue', }			
		res.render(folderView +'form', { title: 'Item Add page', item, errors });
	}else{
		let item = {};
		await	DistrictModel.getItem(id).then((itemDistrict)=>{ item = itemDistrict })
		res.render(folderView + 'form', { title: 'Item Edit page', item, errors });
	}  
});
router.post('/save', validateDistrict, (req, res, next)=>{
	const itemEdit  = Object.assign(req.body);  
	const errors    = validationResult(req).array();
	const item = {
		id:       itemEdit.id,
        name:     itemEdit.name, 
        slug:     StringHelper.createSlug(itemEdit.slug),
        status:   itemEdit.status, 
		ordering: parseInt(itemEdit.ordering)
	};	
	if (errors.length >0) { 		
		res.render(folderView + 'form', {title: 'Item Edit page', item, errors: errors });		
	}else{
		if(item.id !==''){  //edit
			DistrictModel.saveItems(item, 'edit').then((result)=>{
				ArticleModel.itemUpdateName(item).then((err, result)=>{ });
				req.flash('success', notify.CHANGE_ITEM_SUSCCES);
				res.redirect(link);
			});
		}else{  //add
			DistrictModel.saveItems(item, 'add').then((result)=>{
				req.flash('success', notify.ADD_SUSCCESS);
				res.redirect(link);
			});			
		};
	};	
});
//SORT
router.get('/sort/:sort_field/:sort_type', function(req, res, next) {  
	let sort_field = ParamsHelper.getParams(req.params, 'sort_field', 'ordering');
	let sort_type  = ParamsHelper.getParams(req.params, 'sort_type', 'asc');
	//lưu vào trong session
	req.session.sort_field = sort_field;
	req.session.sort_type  = sort_type;
	res.redirect(link);
});

module.exports = router;
 