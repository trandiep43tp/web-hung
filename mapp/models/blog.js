
const ItemModel    = require(__path_schemas   + 'blog');
const FilesHelper  = require(__path_helpers   + 'file_list'); 
const forderBlog   = 'public/uploads/blog/';

module.exports = {    
    listItems: (objWhere, sort, pagination)=>{
        return  ItemModel
                    .find(objWhere)
                    .select('name status ordering special show created modified category.name')
                    .sort(sort) 
                    .skip((pagination.currentPage - 1)*pagination.totalItemsperPage)   
                    .limit(pagination.totalItemsperPage);

    },     
    listItemsFrontend: (objWhere, parram = null, pagination = null, option = null)=>{
        if(option.task === 'items-home'){             
            return  ItemModel
                    .find(objWhere)
                    .select('name slug images summary created ') 
                    .sort({ordering: 'asc'})                 
                    .limit(8);
        } 
        if(option.task === 'items-rooms'){
            return  ItemModel
                    .find(objWhere)
                    .select('name slug images created') 
                    .sort({ordering: 'asc'})
                    .skip((pagination.currentPage - 1)*pagination.totalItemsperPage) 
                    .limit(pagination.totalItemsperPage);
        }
        if(option.task === 'items-random'){
            return  ItemModel.aggregate([
                { $match: objWhere},
                { $project: { images: 1 }},
                { $sample: {size: 5}}
            ])            
        }
        if(option.task === 'items-detail'){
            return  ItemModel
                    .findOne(parram)
                    .select('name slug status ordering special images summary content category show')                           
        }
        if(option.task == 'items-others'){           
            return  ItemModel
                    .find({show: objWhere.show, _id: {$ne: parram.id} })
                    .select('name slug images created ') 
                    .sort({'created.time': 'desc'})
                    .limit(5);          
        }
        if(option.task == 'items-recent-blog'){           
            return  ItemModel
                    .find({show: objWhere.show })
                    .select('name slug images created ') 
                    .sort({'created.time': 'desc'})
                    .limit(6);          
        }
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
    changeSpecial: (id, currentSpecial, option = null)=>{
       
        let special = (currentSpecial === 'nomal')? 'top_post' : 'nomal';
        let data = {
            special,
            modified: {
                user_id: userinfo.id,
                user_name: userinfo.name,  
                time: Date.now()	
            }
        }	    
        if(option === 'muti'){
            data.special = currentSpecial;
            return ItemModel.updateMany({_id: {$in: id}}, data);
        }    

        return ItemModel.updateOne({_id: id}, data);
    },    
    changeShow: (id, currentShow, option = null)=>{       
        let show = (currentShow === 'show')? 'hidden' : 'show';
        let data = {
            show,
            modified: {
                user_id: userinfo.id,
                user_name: userinfo.name,  
                time: Date.now()	
            }
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
			return Promise.resolve("success");  //sau khi thực hiện xong mới return một trạng thái
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
                    let itemImages = item.images;
                    itemImages.map((image, index) =>{
                       FilesHelper.remove(forderBlog, image); 
                    });                                     
                });
            }         
            return ItemModel.deleteMany({_id: {$in: ids}});
        }    
        //lấy lại thông tin item để lấy tên image              
        await ItemModel.findById(ids).then((item)=>{    
            let itemImages = item.images;
            itemImages.map((image, index) =>{
               FilesHelper.remove(forderBlog, image); 
            });                       
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
    },
    itemUpdateName: (item, option = null)=>{          
        return ItemModel.updateMany({'category.id': item.id}, {category: {id: item.id, name: item.name}})      
    }
}