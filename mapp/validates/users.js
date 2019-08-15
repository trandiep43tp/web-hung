

const { check } = require('express-validator');
const util      = require('util');    
const notify    = require("../configs/notify");

const option = {	
    name    : { min: 1, max: 18 },
    username: { min: 1, max: 18 },
    password: { min: 1, max: 40 },
	ordering: {min: 1, max: 100},
	status  : ['novalue'],
	group   : ['novalue'],
	content : {min: 1, max: 10000},
};  

exports.user = [    
    check('name',util.format(notify.ERROR_NAME, option.name.min, option.name.max)).isLength({min: option.name.min, max: option.name.max}),
    check('username',util.format(notify.ERROR_NAME, option.username.min, option.username.max)).isLength({min: option.username.min, max: option.username.max}),
    check('password',util.format(notify.ERROR_CONTENT, option.password.min, option.password.max)).isLength({min: option.password.min}),
    check('ordering','Phai la so lon hon 0').isInt({gt: 0, lt: 100}),	
    check('status', 'Chọn một trạng thái').not().isIn(option.status),		
    check('group_id', 'Chọn một trạng thái').not().isIn(option.group),		
    check('content',util.format(notify.ERROR_CONTENT, option.content.min, option.content.max)).isLength({min: option.content.min, max: option.content.max})
];
 



            
	

