const mongoose       = require('mongoose');
const databaseConfig = require(__path_configs + 'database');

const schema = new mongoose.Schema({
    name    : String,
    slug    : String,
    status  : String, 
    ordering: Number,
    special : String,
    price   : Number,
    images  : [String],   //mảng các hình khi mở chi tiết,
    summary : String,  //tóm tắt các thông tin
    content : String,
    district: {
        id  : String,
        name: String
    },
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

module.exports = mongoose.model(databaseConfig.col_article, schema);