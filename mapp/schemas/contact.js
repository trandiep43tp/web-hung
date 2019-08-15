const mongoose       = require('mongoose');
const databaseConfig = require(__path_configs +'database');

const schema = new mongoose.Schema({
    yourname: String,
    youremail: String,
    subject: String,
    message: String,
    status: String, 
    ordering: Number,    
    created: {      
        time : Date
    },
    modified: {
        user_id: Number,
        user_name: String,
        time: Date
    }
});

module.exports = mongoose.model(databaseConfig.col_contact, schema)