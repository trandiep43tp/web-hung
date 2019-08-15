const ItemModel    = require(__path_schemas   + 'district');
 
module.exports = {   
    listItems: (objWhere,sort,pagination)=>{
        return  ItemModel
                    .find(objWhere)
                    .select('name status view ordering slug created modified ')
                    .sort(sort)  
                    .skip((pagination.currentPage - 1)*pagination.totalItemsperPage)   
                    .limit(pagination.totalItemsperPage);
    }, 

    listItemsFrontend: (params, option = null)=>{         
        if(option.task === 'items-home'){
            return  ItemModel
                .find({status: 'active'})
                .select('name slug') 
                .sort({ordering: 'asc'})
        }  
    },
    listItemsforArticle: ()=>{
        return  ItemModel
                    .find()
                    .select('name ')
                    .sort({ordering: 'asc'})
    },
    countDocuments: (objWhere, option = null)=>{
        return ItemModel.countDocuments(objWhere);
    },
    getItem: (id, option =  null)=>{
        return ItemModel.findById(id);
    },      
    changeStatus: (id, currentStatus, option = null)=>{       
        let status = (currentStatus === 'active')? 'inactive' : 'active';
        let data = {
            status,
            modified: {
                user_id: 0,
                user_name: 'admin',  
                time: Date.now()	
          }
        }	    
        if(option === 'muti'){
            data.status = currentStatus;
            return ItemModel.updateMany({_id: {$in: id}}, data);
        }    

        return ItemModel.updateOne({_id: id}, data);
    },
    changeview: (id, currentView, option = null)=>{       
        let view = (currentView === 'list')? 'thumb' : 'list';
        let data = {
            view,
            modified: {
                user_id: 0,
                user_name: 'admin',  
                time: Date.now()	
            }
        }	    
        if(option === 'muti'){
            data.view = currentview;
            return ItemModel.updateMany({_id: {$in: id}}, data);
        }    
        return ItemModel.updateOne({_id: id}, data);
    },
    changeOrdering: async (ids, ordering, option = null)=>{       
        let data = {           
            modified: {
                user_id: 0,
                user_name: 'admin',  
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
        if(option == 'add'){
            item.created ={
				user_id: 0,
				user_name: "admin",
				time : Date.now()
			}
			return new ItemModel(item).save();			
        }
        if(option == 'edit'){
            item.modified ={
				user_id: 0,
				user_name: "admin",
				time : Date.now()
			}
		    return	ItemModel.updateOne({_id: item.id}, item);
        }
    }    
}