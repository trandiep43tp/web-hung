const express    = require('express');
const router     = express.Router();
const util       = require('util'); 
const { validationResult } = require('express-validator');
const folderView   = __path_views_admin + 'pages/imageweb/';
const ParamsHelper = require(__path_helpers   + 'params'); 
const UtilsHelper  = require(__path_helpers   + 'utils');
const FilesHelper  = require(__path_helpers   + 'file');
const ImageWWebModels  = require(__path_models    + 'imageweb');
const validate     = require(__path_validates + 'imageweb').imageweb;
const uploadImage  = FilesHelper.upload('image', 'imageweb'); 
const notify       = require(__path_configs   + 'notify');
const link          = '/'+ systemConfig.prefixAdmin + '/imageweb';

/* GET dashboard page. */
router.get( '(/:status)?', async(req, res, next) => {
    let objWhere ={};	   
    let currentStatus = ParamsHelper.getParams(req.params, 'status', 'all');
    objWhere          = (currentStatus === "all" )? {} : {status: currentStatus};
    let statusFilter  = await UtilsHelper.createFilterStatus(currentStatus, 'imageweb');
    let query         = ParamsHelper.getParams(req.query, 'search', '');  
	if(query !== ''){
		objWhere.name = new RegExp(query, 'i');   
    };	
    //phân trang
	let pagination ={
		totalItems : 0,
		totalItemsperPage: 4,
		currentPage		 : 1,
		pageRanges       : 3,    //để cấu hình khi có quá nhiều trang
	};	
	pagination.currentPage =  parseInt(ParamsHelper.getParams(req.query, 'page', 1));
	await ImageWWebModels.countDocuments(objWhere).then((data)=>{
			pagination.totalItems = data;		  
		 });
    ImageWWebModels.listItems(objWhere ).then((items)=> {
        res.render(folderView + 'list', { 
            title: 'Image Web',
            items,
            statusFilter,
            currentStatus,
            query,
            pagination
        });
    });

   
});
//thay đổi trạng thái status
router.get('/change-status/:id/:status', function(req, res, next) {	
	let currentStatus = ParamsHelper.getParams(req.params, 'status', 'active');
	let id            = ParamsHelper.getParams(req.params, 'id', '');	
	ImageWWebModels.changeStatus(id, currentStatus).then((err, result)=>{
		req.flash('success', notify.CHANGE_STATUS_SUSCCESS ); 
		res.redirect(link);
	});	
});
//change status muti
router.post('/change-status/:status', function(req, res, next) {
	let currentStatus = ParamsHelper.getParams(req.params, 'status', 'active');
	let ids = req.body.cid;  	
	ImageWWebModels.changeStatus(ids, currentStatus, 'muti').then((result)=>{	
		req.flash('success', util.format(notify.CHANGE_STATUS_MUTI_SUSCCESS, result.n ));
		res.redirect(link);
	});	
});

router.get('/form/:status/:id?', function(req, res, next) {  
	let currentStatus = ParamsHelper.getParams(req.params, 'status', 'add');
	let id 			  = ParamsHelper.getParams(req.params, 'id', '');	
	let errors        = [];
	if(currentStatus === 'add'){
		let item = {id, name: '', image: '', status: 'novalue', content_1: '', content_2: '',location: ''}			
		res.render(folderView +'form', { title: 'Item Add page', item, errors });
	}else{
		ImageWWebModels.getItem(id)
			.then((item)=>{
				res.render(folderView + 'form', { title: 'Item Edit page', item, errors });
			});		
	};  
})

router.post('/save',uploadImage, validate, function(req, res, next){
    const itemEdit       = Object.assign(req.body);    
	let item = {
		id       : itemEdit.id,
		name     : itemEdit.name, 		
        status   : itemEdit.status, 
		location : itemEdit.location,
        content_1: itemEdit.content_1,
        content_2: itemEdit.content_2,
	};	
    const taskCurrent = (item.id !=='')? 'edit' : 'add';
    const massage     = (taskCurrent === 'edit')? notify.CHANGE_ITEM_SUSCCESS : notify.ADD_SUSCCESS;
	const title       = (taskCurrent === 'edit')? 'Image Web Edit' : 'Image Web Add';	
    const errors      = validationResult(req).array();
	
	if (errors.length > 0) { 	
        if(req.file != undefined){
            FilesHelper.remove('public/uploads/imageweb/', req.file.filename);  
        } 
        item.image = itemEdit.image_old;       		
		res.render(folderView + 'form', {title, item, errors});		
	}else{
        if(req.file === undefined){  //edit thông tin k phải edit hình
            item.image = itemEdit.image_old;
        }else{
            item.image = req.file.filename;               
            if(taskCurrent == 'edit'){
                FilesHelper.remove('public/uploads/imageweb/', itemEdit.image_old);
            };
        }; 
      
        ImageWWebModels.saveItems(item, taskCurrent).then((err, result)=>{
            req.flash('success', massage );
            res.redirect(link);
        });	
	}	
});

module.exports = router;
