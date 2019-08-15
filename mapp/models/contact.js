const ItemModel    = require(__path_schemas   + 'contact');
module.exports = {
    listItems: (objWhere,sort,pagination)=>{       
        return  ItemModel
                    .find(objWhere)
                    .select('yourname youremail subject message status ordering created modified')
                    .sort(sort)  
                    .skip((pagination.currentPage - 1)*pagination.totalItemsperPage)   
                    .limit(pagination.totalItemsperPage);
    },
    countDocuments: (objWhere, option = null)=>{
        return ItemModel.countDocuments(objWhere);
    },
    getItem: (id, option =  null)=>{
        return ItemModel.findById(id);
    },
    changeStatus: (id, currentStatus, option = null)=>{       
        let user_name = (option.user != null )? option.user : '';
        let status = (currentStatus === 'active')? 'inactive' : 'active';
        let data = {
            status,
            modified: {
                user_id: 0,
                user_name: user_name,  
                time: Date.now()	
            }
        }	    
        if(option.combo === 'muti'){
            data.status = currentStatus;
            return ItemModel.updateMany({_id: {$in: id}}, data);
        }   
        return ItemModel.updateOne({_id: id}, data);
    },
    changeOrdering: async (ids, ordering, option = null)=>{       
        let data = {           
            modified: {
                user_id: 0,
                user_name: option.user,  
                time: Date.now()	
            } 
        }		
		if(Array.isArray(ids)){			
            for(let index = 0; index< ids.length; index++){
                data.ordering= parseInt(ordering[index]);	
                await ItemModel.updateOne({_id: ids[index]}, data);
            }
			return Promise.resolve("success")
		}else{
			data.ordering = parseInt(ordering);				
		    return	ItemModel.updateOne({_id: ids}, data);
		}
    },
    deleteItems: (ids, option = null)=>{                         
        if(option === 'muti'){           
            return ItemModel.deleteMany({_id: {$in: ids}});
        }    
        return  ItemModel.deleteOne({_id: ids});       
    },
    saveItems: (item, option = null)=>{
        if(option.task === 'add'){
            item.created ={				
				time : Date.now()
			}
			return new ItemModel(item).save();			
        }
        if(option.task === 'edit'){
            item.modified ={
				user_id: 0,
				user_name: option.user,
				time : Date.now()
			}
		    return	ItemModel.updateOne({_id: item.id}, item);
        }
    }, 
    saveItemsFrontend: (item)=>{        
        item.created ={	time : Date.now()};
        item.status = 'active';
        item.ordering = 1;
        return new ItemModel(item).save();          
    }    
}