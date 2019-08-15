
const ImageModel  = require(__path_models  + 'imageweb');

module.exports =  async (req, res, next)=>{    
    let objWhereImage =  {status: 'active', location: 'page'};
    await  ImageModel
            .listItemsFrontend( objWhereImage, {task: 'items-page'})
            .then((items)=>{  
                res.locals.itemsImagePanels = items });        
                     
    next();     
}