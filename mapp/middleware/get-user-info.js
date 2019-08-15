
module.exports = (req, res, next)=>{
    let userinfo = {};   
    if (req.isAuthenticated()){ 
        userinfo = req.user;
    }    
    res.locals.userinfo = userinfo;   //truyền ra ngoài view
    global.userinfo = userinfo;       //sử dụng chung trong backend(router, models)    
    next();     
}