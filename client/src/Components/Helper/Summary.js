
import React from 'react';

function Summary(props) {    
   return (
        <ul className="list">
           { getSummary(props.summary) }            
        </ul>
    );
}

const getSummary = (string = '')=> {
    if(string === '') return [];    
    let ItemSummary = string.split(',');  
    let xhtml = '';
    xhtml= ItemSummary.map((item, index) =>{            
            let arrtmp = item.split(':');
            return <li key = {index}><span>{arrtmp[0]}: </span> {arrtmp[1] }</li>
        });   
    return xhtml;
};

export default Summary;
