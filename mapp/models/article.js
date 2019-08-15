
const ItemModel     = require(__path_schemas   + 'article');
const FilesHelper   = require(__path_helpers   + 'file_list'); 
const forderArticle = 'public/uploads/article/';


module.exports = {
   
    listItems: (objWhere, sort, pagination)=>{
        return  ItemModel
                    .find(objWhere)
                    .select('name status ordering special show created modified district.name')
                    .sort(sort)  //sắp xếp theo thứ tự
                    .skip((pagination.currentPage - 1)*pagination.totalItemsperPage)   //lấy từ vị trí
                    .limit(pagination.totalItemsperPage);

    },   
    // listItemsFindFrontend: (objWhere, option = null)=>{
    //     return ItemModel                   
    //             .aggregate([                                               
    //                 { $match : {'price': { $gte : 150, $lte: 500 } }}, //lớn hơn hoặc bằng
    //                { $match : {'price': {$lte: 500} }},    // nhỏ hơn hoặc bằng. xem https://docs.mongodb.com/manual/reference/operator/query/gte/
    //                 { $project: {id: 1, name: 1,  price: 1 }},                       
    //             ]) 
    // },   
    listItemsFrontend: (objWhere, parram = null, pagination = null, option = null)=>{
       
        if(option.task === 'items-home'){                       
            return  ItemModel
                    .find(objWhere)
                    .select('name slug images summary price') 
                    .sort({ordering: 'asc'})                 
                    .limit(6);
        }

        if(option.task === 'items-rooms'){           
            return  ItemModel
                    .find(objWhere)
                    .select('name slug price images summary') 
                    .sort(parram.sort)
                    .skip((pagination.currentPage - 1)*pagination.totalItemsperPage)
                    .limit(pagination.totalItemsperPage);             
                    
        }

        if(option.task == 'items-detail'){
            return  ItemModel
                    .findOne({slug: parram.slug})
                    .select('name slug status ordering special images summary content category show')                           
        }

        if(option.task == 'items-random'){
            return  ItemModel.aggregate([
                { $match: {status: 'active'}},
                { $project: {id: 1, name: 1, created: 1, thumb: 1 }},
                { $sample: {size: 5}}
            ])                              
        }  
        
        if(option.task == 'items-others'){           
            return  ItemModel
                    .find({show: 'show', status: 'active', slug: {$ne: parram.slug} })
                    .select('name slug price images created') 
                    .sort({'created.time': 'desc'})
                    .limit(2);          
        }

        if(option.task === 'items-random-home'){
            return  ItemModel.aggregate([
                { $match: objWhere},
                { $project: { images: 1 }},
                { $sample: {size: 5}}
            ])     
        }       
    }, 
    //đếm items   
    countDocuments: (objWhere, option = null)=>{
        return ItemModel.countDocuments(objWhere);
    },

    
    getItembyDistrictId: (districtid)=>{
        return ItemModel
            .find({'district.id' : districtid})
            .select('name ')
    },

     //lấy ra 1 items
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
        //console.log(userinfo.id);
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
                       FilesHelper.remove(forderArticle, image); 
                    });                                     
                });
            }         
            return ItemModel.deleteMany({_id: {$in: ids}});
        }    

        //lấy lại thông tin item để lấy tên image              
        await ItemModel.findById(ids).then((item)=>{    
            let itemImages = item.images;
            itemImages.map((image, index) =>{
               FilesHelper.remove(forderArticle, image); 
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