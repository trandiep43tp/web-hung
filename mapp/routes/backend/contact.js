const express      = require('express');
const router       = express.Router();
const util         = require('util');   
const ContactModels= require(__path_models    + 'contact');
const UtilsHelper  = require(__path_helpers   + 'utils');
const ParamsHelper = require(__path_helpers   + 'params');
const systemConfig = require(__path_configs   + 'system');
const notify       = require(__path_configs   + 'notify');
const validateContact = require(__path_validates + 'contact').contact;
const { validationResult } = require('express-validator');
const link         = '/'+ systemConfig.prefixAdmin + '/contact';
const folderView   = __path_views_admin + 'pages/contact/';

router.get('(/:status)?',async (req, res, next)=> {   		
	let objWhere ={};	
	let currentStatus = ParamsHelper.getParams(req.params, 'status', 'all');		
	 objWhere      = (currentStatus === "all" )? {} : {status: currentStatus};	
	let query = ParamsHelper.getParams(req.query, 'search', '');  
	if(query !== ''){
		objWhere.name = new RegExp(query, 'i');  
	};	
	let statusFilter  = await UtilsHelper.createFilterStatus(currentStatus, 'contact');
    let sort_field = ParamsHelper.getParams(req.session, 'sort_field', 'ordering');
    let sort_type  = ParamsHelper.getParams(req.session, 'sort_type', 'asc');
	let sort = {'created.time': 'desc'};
	 	sort[sort_field] = sort_type;
	//phân trang
	let pagination ={
		totalItems : 0,
		totalItemsperPage: 4,
		currentPage		 : 1,
		pageRanges       : 3,    
	};	
	 //lấy số trang hiện tại
	pagination.currentPage =  parseInt(ParamsHelper.getParams(req.query, 'page', 1));

	//đếm tỏng số bản ghi
	await ContactModels.countDocuments(objWhere).then((data)=>{
			pagination.totalItems = data;		  
		 });	
	//lấy dữ liệu 
	ContactModels.listItems(objWhere,sort,pagination).then((items)=>{       
		res.render(folderView + 'list', { 
			title: 'Contact List page',
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
	let user          = (req.user.username === undefined)? 'diep' : req.user.username;	 
	ContactModels.changeStatus(id, currentStatus, { user }).then((result)=>{
		req.flash('success', notify.CHANGE_STATUS_SUSCCESS ); 
		res.redirect(link);
	});
});
//change status muti
router.post('/change-status/:status', function(req, res, next) {
    let user          = req.user.username;
	let currentStatus = ParamsHelper.getParams(req.params, 'status', 'active');
	let ids           = req.body.cid; 	
	//cách 2 xử lý bên models
	ContactModels.changeStatus(ids, currentStatus,{ user, combo: 'muti' } ).then((result)=>{
		req.flash('success', util.format(notify.CHANGE_STATUS_MUTI_SUSCCESS, result.n ));
		res.redirect(link);
	});
});
//change ordering
router.post('/change-ordering/', function(req, res, next) {
	let user     = req.user.username;
	let ids      = req.body.cid;
	let ordering = req.body.ordering;
	if(Array.isArray(ids)){
		ContactModels.changeOrdering(ids, ordering, { user}).then((result)=>{
			req.flash('success', util.format( notify.CHANGE_ORDERING_MUTI_SUSCCESS,ids.length ));
			res.redirect(link);
		});		
	}else{
		ContactModels.changeOrdering(ids, ordering, {user} ).then((result)=>{
			req.flash('success', notify.CHANGE_ORDERING_SUSCCESS);
			res.redirect(link);
		});
	};		
});
//khi nhấn delete
router.get('/delete/:id', function(req, res, next) {	
	let id  = ParamsHelper.getParams(req.params, 'id', '');
	ContactModels.deleteItems(id ).then((result)=>{
		req.flash('success', notify.DELETE_SUSCCESS);
		res.redirect(link);
	});	
});
//delete- muti
router.post('/delete', function(req, res, next) {	
	let ids = req.body.cid;   
	ContactModels.deleteItems(ids, 'muti').then((result)=>{
		req.flash('success', util.format( notify.DELETE_MUTI_SUSCCESS, result.n ));
		res.redirect(link);
	});
});
//add và Edit
router.get('/form/:status/:id?', function(req, res, next) {  
	let currentStatus = ParamsHelper.getParams(req.params, 'status', 'add');
	let id 			  = ParamsHelper.getParams(req.params, 'id', '');	
	let errors        = [];
	if(currentStatus === 'add'){
		let item = {yourname: '', youremail: '', subject: '', message: '', ordering: 0, status: 'novalue'}			
		res.render(folderView +'form', { title: 'Contact Add page', item, errors });
	}else{
		ContactModels.getItem(id).then((item)=>{
			res.render(folderView +'form', { title: 'Contact Edit page', item, errors });
		});		
	};  
});
router.post('/save', validateContact, (req, res, next) =>{  
	const itemEdit       = Object.assign(req.body);  
	const item = {
		id: itemEdit.id,
        yourname: itemEdit.yourname, 
        youremail: itemEdit.youremail,
        subject: itemEdit.subject,
        message: itemEdit.message,
		ordering: parseInt(itemEdit.ordering), 
		status: itemEdit.status
		
    };
    let errors       = validationResult(req).array();
	let user        = req.user.username;
	let taskCurrent = (item.id !=='')? 'edit' : 'add';
	let title       = (taskCurrent === 'edit')? 'Contact Edit page' : 'Contact Add page';
	if (errors.length >0) {
		res.render(folderView +'form', { title, item, errors });
	}else{
		if(taskCurrent ==='edit' ){
			ContactModels.saveItems(item, {user, task: 'edit' }).then((err, result)=>{				
				req.flash('success', notify.CHANGE_ITEM_SUSCCESS);
				res.redirect(link);
			})
		}else{
			ContactModels.saveItems(item, {user, task: 'add' }).then((err, result)=>{
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
 