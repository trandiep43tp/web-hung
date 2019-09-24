
import React   from 'react';
import {Link } from 'react-router-dom';

function Summary(props) {    
   return ( getSummary(props.summary, props.slug));
}

const getSummary = (string = '', slug)=> {
    if(string === '') return [];    
    let ItemSummary = string.split(',');  
    let xhtml = '';
    xhtml= ItemSummary.map((item, index) =>{            
            let arrtmp = item.split(':');
            return  <li key = { index}><Link to = {slug} >{arrtmp[0]}: <span>{arrtmp[1] }</span></Link></li>;          
        });   
    return xhtml;
};

export default Summary;
