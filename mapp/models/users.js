
const fs      = require("fs");
const ItemModel    = require(__path_schemas   + 'users');
const FilesHelper  = require(__path_helpers   + 'file');
 
module.exports = {   
    listItems: (objWhere, sort, pagination)=>{
        return  ItemModel
                    .find(objWhere)
                    .select('name avatar status ordering created modified group.name')
                    .sort(sort)  
                    .skip((pagination.currentPage - 1)*pagination.totalItemsperPage)   
                    .limit(pagination.totalItemsperPage);
    }, 
    listItemsFrontend: (parram = null, option = null)=>{
        if(option.task == 'items-home'){             
            return  ItemModel
                    .find({status: 'active'})
                    .select('name avatar content group.name ') 
                    .sort({ordering: 'asc'})                 
                    .limit(6);
        }
    },  
    countDocuments: (objWhere, option = null)=>{
        return ItemModel.countDocuments(objWhere);
    },
    getItem: (id, option =  null)=>{
        return ItemModel.findById(id);
    },    
    getItembyUsername: (username, option = null)=>{       
        return ItemModel.findOne({status: 'active', username: username})
                .select('name username password avatar status, group.name ')
    },
    changeStatus: (id, currentStatus, option = null)=>{       
        let status = (currentStatus === 'active')? 'inactive' : 'active';
        let data = {
            status,
            modified: {
                user_id: userinfo.id,
                user_name: userinfo.name,  
                time: Date.now()	
            }
        }	    
        if(option === 'muti'){
            data.status = currentStatus;
            return ItemModel.updateMany({_id: {$in: id}}, data);
        }    
        return ItemModel.updateOne({_id: id}, data);
    },
    changeOrdering: async (ids, ordering, option = null)=>{
        let data = {           
            modified: {
                user_id: userinfo.id,
                user_name: userinfo.name,  
                time: Date.now()	
            }
        }		
		if(Array.isArray(ids)){			
            for(let index = 0; index< ids.length; index++){
                data.ordering= parseInt(ordering[index]);	
                await ItemModel.updateOne({_id: ids[index]}, data);
            }
			return Promise.resolve("success");  
		}else{
			data.ordering = parseInt(ordering);				
		    return	ItemModel.updateOne({_id: ids}, data);
		}	
    },
    deleteItems: async(ids, option = null)=>{                         
        if(option === 'muti'){ 
            //thực hiện xóa hình
            for(let index = 0; index < ids.length; index++){
                await ItemModel.findById(ids[index]).then((item)=>{   
                    FilesHelper.remove('public/uploads/users/', item.avatar);                   
                });
            }         
            return ItemModel.deleteMany({_id: {$in: ids}});
        } 
        //lấy lại thông tin item để lấy tên avatar               
        await ItemModel.findById(ids).then((item)=>{    
            FilesHelper.remove('public/uploads/users/', item.avatar);       
        });
        return  ItemModel.deleteOne({_id: ids});       
    },
    saveItems: (item, option = null)=>{
        if(option == 'add'){
            item.created ={
				user_id: userinfo.id,
				user_name: userinfo.name,
				time : Date.now()
			}
			return new ItemModel(item).save();			
        }
        if(option == 'edit'){
            item.modified ={
				user_id: userinfo.id,
				user_name: userinfo.name,
				time : Date.now()
			}
		    return	ItemModel.updateOne({_id: item.id}, item);
        }
    }
}