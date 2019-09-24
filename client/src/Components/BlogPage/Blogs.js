import React, {useEffect} from 'react';
import BlogItem         from './BlogItem';
import PaginationHelper from '../../Components/Helper/Pagination';
import FormSerchName    from './FormSerchName';

function Blogs(props) {
    const {blogs, pagination, history } = props;  
    
    useEffect(() => {       
        const list = document.querySelectorAll('script[src = "js/main.js"]');
        if (list.length > 0) {
            document.body.removeChild(list[0])
        }
        const script = document.createElement('script');
        script.src = 'js/main.js';
        document.body.appendChild(script);
    }, [blogs]);   

    return (
        <section className="ftco-section">
            <div className="container">
                <div className = "row">
                    <div className="col-lg-7 sidebar ftco-animate">                       
                            {/* <PaginationHelper linkPrefix = '/blogs' pagination = { pagination}  />  */}                        
                    </div>
                    <div className="col-lg-5 sidebar ftco-animate">
                        <div className="sidebar-box">
                            <FormSerchName history = {history} />                           
                        </div>                                            
                    </div>                   
                </div>
                <div className="row d-flex">
                   { showBlogs(blogs)}
                </div>
                <div className="row mt-5">
                    <div className="col text-center">
                        <PaginationHelper linkPrefix = '/blogs' pagination = { pagination}  />                      
                    </div>
                </div>
            </div>
        </section>
    );
}

const showBlogs = (blogs) =>{
    let xhtml = '';
    if(blogs.length === 0) return <h2>Không có bài viết nào</h2>;
    xhtml = blogs.map((item, index) =>{
        return (
            <BlogItem blog = {item} key = {index} />
        )
    })
    return xhtml;
}
export default Blogs;
