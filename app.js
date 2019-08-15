var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
//var logger = require('morgan');

//kéo các thứ ta viết vào

var systemConfig   = require("./mapp/configs/system");
var expressLayouts = require('express-ejs-layouts');
var moment         = require('moment'); 
const session      = require('express-session');

var   flash        = require('connect-flash');
const passport     = require('passport'); 

// getting-started mongoose
var mongoose = require('mongoose');                        
mongoose.connect('mongodb://trandiep:trandiep123@ds255107.mlab.com:55107/hung',{ useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', () => console.log('connection error'));
db.once('open', ()=> {
  console.log("connected")
}); 

const kiemtra = require('./kiemtra');
kiemtra.thu();

//tạo ra các biến sử dụng chung
global.__base           = __dirname + '/';
global.__mapp           = __base + 'mapp/';
global.__path_configs   = __mapp + 'configs/';
global.__path_validates = __mapp + 'validates/';
global.__path_middleware = __mapp + 'middleware/';
global.__path_views     = __mapp + 'views/';
global.__path_views_admin    = __path_views + 'admin/';
global.__path_views_frontend = __path_views + 'frontend/';
global.__path_schemas   = __mapp + 'schemas/';
global.__path_helpers   = __mapp + 'routes/helpers/';
global.__path_models    = __mapp + 'models/';
global._path_public     = __base + 'public/';
global._path_uploads    = _path_public + 'uploads/';
global.systemConfig = systemConfig;
var app = express();

// thiết lập để hiện thông báo
app.use(cookieParser());
app.use(session({
    secret: 'aaaaaaa',    //có thể dặt 1 giá trị ngẫu nhiên
    resave: true,
    saveUninitialized: true,  
    cookie: {             //thiết lập thời gian lưu cookie
       // maxAge: 5*60*1000  //5 phút
    } 
}));

//set flash
app.use(flash());
app.use((req, res, next)=> {      
    res.locals.messages = req.flash();
    next();
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//thiêt lập layout được cài vào khi mở admin, còn frontend ta định nghĩa trong các router
app.use(expressLayouts);     
app.set('layout', __path_views_admin + 'backend');

// Local variable
app.locals.moment = moment; 

//app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//khai báo sử dụng passport
require(__path_configs + 'passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(`/${systemConfig.prefixAdmin}`, require(__mapp +'routes/backend/index'));  //cho backend
app.use('/', require(__mapp +'routes/frontend/index'));                            // cho frontend

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    
  // render the error page
  if(systemConfig.env== 'dev'){    
    res.status(err.status || 500);
    res.render(__path_views_admin +'error', { title: 'Page Not Found'});
  }
  if(systemConfig.env == 'production'){    
      res.redirect("/");
  }
   
});

module.exports = app;
