const GroupsModel       = require(__path_models   + 'groups');

module.exports = async (req, res, next)=>{    
   
    if( Object.keys(userinfo).length > 0){
        let idGroup = userinfo.group.id;
        await  GroupsModel.getItem(idGroup).then((result) =>{      
            res.locals.groupAdmin = result; //dùng cho view            
            global.groupAdmin = result ;   //dùng cho router cả backend và frontend
          
        }) 
    }else{        
        global.groupAdmin = {};
        res.locals.groupAdmin = {};
        
    }
    next();     
}