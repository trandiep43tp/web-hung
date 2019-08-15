

const { check } = require('express-validator');
const util      = require('util');    
const notify    = require("../configs/notify");

const option = {	
    name    : { min: 1, max: 18 },
    username: { min: 1, max: 18 },
    password: { min: 1, max: 40 },
	ordering: {min: 1, max: 100},
	status  : ['novalue'],
	location: ['novalue'],
	content : {min: 1, max: 10000},
};  

exports.imageweb = [    
    check('name',util.format(notify.ERROR_NAME, option.name.min, option.name.max)).isLength({min: option.name.min, max: option.name.max}),
    check('status', 'Chọn một trạng thái').not().isIn(option.status),		
    check('location', 'Chọn một trạng thái').not().isIn(option.location),		
    check('content_1',util.format(notify.ERROR_CONTENT, option.content.min, option.content.max)).isLength({min: option.content.min, max: option.content.max}),
    check('content_2',util.format(notify.ERROR_CONTENT, option.content.min, option.content.max)).isLength({min: option.content.min, max: option.content.max})
];
 



            
	

