const mongoose       = require('mongoose');
const databaseConfig = require(__path_configs + 'database');

const schema = new mongoose.Schema({
    name    : String,
    slug    : String,
    status  : String, 
    ordering: Number,
    special : String,
    images  : [String],   
    summary : String,  //tóm tắt các thông tin
    content : String,    
    show    : String,
    created : {
        user_id  : String,
        user_name: String,
        time     : Date
    },
    modified: {
        user_id  : String,
        user_name: String,
        time     : Date
    }
});

module.exports = mongoose.model(databaseConfig.col_blog, schema);