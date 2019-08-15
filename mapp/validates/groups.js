
const { check } = require('express-validator');
const util      = require('util');    
const notify    = require("../configs/notify");
const option = {
	name    : { min: 1, max: 20 },
	ordering: {min: 1, max: 100},
	status  : ['novalue'] ,
	content : {min: 1, max: 100},
};

exports.group = [	
    check('name',util.format(notify.ERROR_NAME, option.name.min, option.name.max)).isLength({min: option.name.min, max: option.name.max}),
    check('ordering','Phai la so lon hon 0').isInt({gt: 0, lt: 100}),
    check('status', 'Chọn một trạng thái').not().isIn(option.status),
    check('group_acp', 'Chọn một trạng thái').not().isEmpty(),
    check('content',util.format(notify.ERROR_NAME, option.content.min, option.content.max)).isLength({min: option.content.min, max: option.content.max})
]; 