const { check } = require('express-validator');
const util      = require('util');   
const notify    = require("../configs/notify");
const option = {
	username    : { min: 3, max: 15 },
	password: {min: 3, max: 15}	
};

exports.login = [
    check('username',util.format(notify.ERROR_NAME, option.username.min, option.username.max)).isLength({min: option.username.min, max: option.username.max}),
    check('password',util.format(notify.ERROR_PASS, option.password.min, option.password.max)).isLength({min: option.password.min, max: option.password.max})
];