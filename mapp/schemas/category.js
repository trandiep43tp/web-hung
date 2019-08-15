const mongoose       = require('mongoose');
const databaseConfig = require(__path_configs +'database');

const schema = new mongoose.Schema({
      name: String,
      slug: String,    
      status: String, 
      view: String,    //để thay đổi cách hiển thị trên fronted
      ordering: Number,
      content: String,     
      created: {
            user_id: Number,
            user_name: String,
            time : Date
      },
      modified: {
            user_id: Number,
            user_name: String,
            time: Date
      }
});

module.exports = mongoose.model(databaseConfig.col_category , schema)