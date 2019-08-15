
const {check} = require('express-validator');
const util   = require('util');    
const notify = require("../configs/notify");
const option = {
	name    : { min: 1, max: 20 },
	ordering: {min: 1, max: 100},
	status  : ['novalue'] ,
	view    : ['novalue'] ,
	content : {min: 1, max: 100},
};

exports.category = [    		
		//NAME
		check('name',util.format(notify.ERROR_NAME, option.name.min, option.name.max)).isLength({min: option.name.min, max: option.name.max}),
		//ORDERING
		check('ordering','Phai la so lon hon 0').isInt({gt: 0, lt: 100}),
		//STATUS
		check('status', 'Chọn một trạng thái').not().isIn(option.status),
		//VIEW
		check('view', 'Chọn một trạng thái').not().isIn(option.view),
		//slug
		check('slug', 'Không dược rỗng').not().isEmpty(),
		//CONTENT
		check('content',util.format(notify.ERROR_NAME, option.content.min, option.content.max)).isLength({min: option.content.min, max: option.content.max})
]

 



            
	

