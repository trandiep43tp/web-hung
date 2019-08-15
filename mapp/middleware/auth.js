const linkLogin = '/'+ systemConfig.prefixAdmin + '/auth';
const linkNoPermission  = '/'+ systemConfig.prefixAdmin + '/auth/no-permission';

module.exports = (req, res, next)=>{
    if (req.isAuthenticated()){      
       next();
        // if(req.user.username === "trandiep43tp"){               
        //     next();
        // }else{            
        //     res.redirect(linkNoPermission);
        // }    
    }else{
        res.redirect(linkLogin);
    }    
}