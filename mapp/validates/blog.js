

const { check } = require('express-validator');
const util      = require('util');    //đây là thư viện của nodejs 
const notify    = require("../configs/notify");

const option = {	
	name    : { min: 3, max: 10000 },
	ordering: {min: 1, max: 1000},
	status  : ['novalue'],
    special : ['novalue'],
    summary : ['novalue'],
    category: ['novalue', 0],
    summary : {min: 1, max: 10000},	
    content : {min: 1, max: 10000},
    show    : ['novalue'],
};
  
exports.blog = [	
		check('name',util.format(notify.ERROR_NAME, option.name.min, option.name.max)).isLength({min: option.name.min, max: option.name.max}),
        check('slug','Phải khác rỗng').not().isEmpty(),
        check('status', 'Chọn một trạng thái').not().isIn(option.status),       
        check('ordering','Phai la so lon hon 0').isInt({gt: 0}),		
        check('special', 'Chọn một trạng thái').not().isIn(option.special),      
        check('show', 'Chọn một trạng thái').not().isIn(option.show),
		check('summary', util.format(notify.ERROR_NAME, option.summary.min, option.summary.max)).isLength({min: option.content.min, max: option.content.max}),		
		check('content',util.format(notify.ERROR_NAME, option.content.min, option.content.max)).not().isEmpty()  
    ]
            
	

