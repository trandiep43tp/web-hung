import React       from 'react';
import  Moment     from 'react-moment'
import { NavLink } from 'react-router-dom';

function BlogItem(props) {
    const blog = props.blog;
    const image =  `uploads/blog/${blog.images[0]}`; 
   
    return (
        <div className="col-md-3 d-flex ftco-animate">
            <div className="blog-entry align-self-stretch">
                <NavLink to={`/blogs/detail/${blog.slug}`} className="block-20" style={{ backgroundImage: `url(${image})` }}>
                </NavLink>
                <div className="text mt-3">
                    <h3 className="heading mt-3"><NavLink to={`/blogs/detail/${blog.slug}`}>{ blog.name }</NavLink></h3>
                    <div className="meta mb-3">
                        <div><NavLink  to={`/blogs/detail/${blog.slug}`}> 
                                    <Moment format="MMM Do YY">
                                        {blog.created.time}
                                    </Moment>
                             </NavLink>
                        </div>
                        <div><NavLink to={`/blogs/detail/${blog.slug}`} >{blog.created.user_name}</NavLink></div>                       
                        <div><NavLink to={`/blogs/detail/${blog.slug}`} className="meta-chat"><span className="icon-chat" /> 3</NavLink></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogItem;
