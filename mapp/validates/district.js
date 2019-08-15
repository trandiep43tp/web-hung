
const  {check} = require('express-validator');
const util     = require('util');   
const notify   = require("../configs/notify");
const option   = {
	name    : { min: 1, max: 20 },
	ordering: {min: 1, max: 100},
	status  : ['novalue'] 	
};

exports.district = [
    check('name',util.format(notify.ERROR_NAME, option.name.min, option.name.max)).isLength({min: option.name.min, max: option.name.max}),
    check('slug','Phải khác rỗng').not().isEmpty(),
    check('status', 'Chọn một trạng thái').not().isIn(option.status),   
    check('ordering','Phai la so lon hon 0').isInt({gt: 0}),    
]
 