import React    from 'react';
import { Link } from 'react-router-dom';

function PaginationHelper(props){   
    let {linkPrefix, pagination} = props;     
    let xhtml             = '';    
    let totalItems        = pagination.totalItems;
    let totalItemsperPage = pagination.totalItemsperPage;
    let currentPage       = pagination.currentPage;
    let totalPages        = Math.ceil(totalItems/totalItemsperPage);
    //let fromItem          = (currentPage -1)*totalItemsperPage + 1;
   // let toItem            = ((fromItem + totalItemsperPage -1)>=totalItems)? totalItems :(fromItem + totalItemsperPage -1) ;
    let pageRanges        = pagination.pageRanges;          
    if(totalItemsperPage >= totalItems ) return(  <div className="block-27"> {xhtml}  </div>);   
    let xhtmlPrevious = <li><Link   style={{pointerEvents: 'none'}} to={linkPrefix} >&lt;</Link></li>;    
    let xhtmlPage     = '';
    let xhtmlNext     = <li ><Link style={{pointerEvents: 'none'}}  to={linkPrefix} >&gt;</Link></li>;
    if(currentPage > 1 ){  
        xhtmlPrevious = <li ><Link to= {`${linkPrefix}/${currentPage-1}`} >&lt;</Link></li>;
    };    
    if(currentPage < totalPages){       
        xhtmlNext     = <li ><Link to= {`${linkPrefix}/${currentPage + 1}`} >&gt;</Link></li>;       
    };   

    // viết giải thuật để không để số trang hiển thị quá nhiều  
    let  middle = Math.ceil(pageRanges/2);
    let  min    = currentPage - middle + 1; 
    let  max    = min + pageRanges - 1;
    if( min <= 1 ){
         min = 1;
        max =  pageRanges ;
    };    
    if(max >= totalPages){
        max = totalPages;
        min = (max - pageRanges + 1) <= 1 ? 1: max - pageRanges + 1;
    };
    let arr = []
    for(let i = min; i<= max; i++){   
        arr.push(i);        
    };
    xhtmlPage = arr.map((i) =>{
             if(i === currentPage){
                 return  <li className = "active" key = {i} ><Link  to= {`${linkPrefix}/${i}`} > {i} </Link></li>;
             }else{        
                 return  <li key = {i} ><Link to= {`${linkPrefix}/${i}`} > {i} </Link></li>;
             }; 
        })

     xhtml = <ul > {xhtmlPrevious}  {xhtmlPage}  {xhtmlNext}</ul>;
   
    return(
        <div className="block-27">  { xhtml}  </div>
    );     
}

export default PaginationHelper;

  
