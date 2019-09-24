

import React           from 'react';
import ReactHtmlParser from 'react-html-parser';

function EmployeesItem(props) { 
    const user  = props.user;   
    const image =  `uploads/users/${user.avatar}`;  
        
    return (          
        <div className="item">
            <div className="testimony-wrap py-4 pb-5">
                <div className="user-img mb-4" style={{ backgroundImage: `url(${image})` }}>
                    <span className="quote d-flex align-items-center justify-content-center">
                        <i className="icon-quote-left" />
                    </span>
                </div>
                <div className="text text-center">
                    {/* <p className="mb-4" dangerouslySetInnerHTML = {{__html: user.content}} />   cách 1 */}
                    {/* cách 2. nên sử dụng cách này */}
                    { ReactHtmlParser(user.content)}
                    {/* <p className="mb-4" ></p>                     */}
                    <p className="name">{user.name}</p>
                    <span className="position">{user.group.name}</span>
                </div>                
            </div>             
        </div>       
    );
}

export default EmployeesItem;
