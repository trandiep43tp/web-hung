
const {check} = require('express-validator');
const util      = require('util');   
const notify    = require("../configs/notify");

const option = {
	yourname: { min: 1, max: 50 },
	ordering: {min: 1, max: 100},
	status  : ['novalue'],
	message : {min: 1, max: 10000},
};

exports.contact = [	    
    check('yourname',util.format(notify.ERROR_NAME, option.yourname.min, option.yourname.max)).isLength({min: option.yourname.min, max: option.yourname.max}),    
    check('youremail', 'Phải là 1 email').isEmail(),
    check('subject','Phải khác rỗng').not().isEmpty(),
    check('ordering','Phai la so lon hon 0').isInt({gt: 0, lt: 100}),
    check('status', 'Chọn một trạng thái').not().isIn(option.status),    
    check('message',util.format(notify.ERROR_NAME, option.message.min, option.message.max)).isLength({min: option.message.min, max: option.message.max})
]




            
	 

