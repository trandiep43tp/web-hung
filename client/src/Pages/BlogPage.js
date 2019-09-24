import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import Panel from '../Components/Panel';
import Blogs from '../Components/BlogPage/Blogs';
import * as AllBlogAction from '../redux/action/blogs';

function BlogPage(props) {
     
    const { match, blogs, pagination, blogsAction } = props;  
    const {blogSearch, blogsPage } = blogs;         
    const { paginationBlog } = pagination;
    const {actChangeCurrentPageBlog, actfechCountBlogs, actfechBlogsPage } = blogsAction;                              
   
    let page = 1;
    if (match.params.page !== undefined && !isNaN(match.params.page)) {
        page = parseInt(match.params.page);        
    }    

    useEffect( ()=>{                 
       actChangeCurrentPageBlog(page)
    },[page]) //eslint-disable-line

    useEffect(() => {
        actfechCountBlogs(blogSearch);    
     }, [blogSearch]) //eslint-disable-line
    
    useEffect(()=>{
        actfechBlogsPage(blogSearch, paginationBlog);      
    },[paginationBlog.currentPage, blogSearch]) //eslint-disable-line

    useEffect( () =>{
        const list = document.querySelectorAll('script[src = "js/main.js"]');       
        if(list.length > 0){
            document.body.removeChild(list[0])
        }
        const script = document.createElement('script');
        script.src = 'js/main.js';
        document.body.appendChild(script);
    },[])

	return (
        <div >
            <Panel name = 'blogs' />
            <Blogs  blogs = {blogsPage} pagination = {paginationBlog} history = {props.history} />
        </div>	
	);
}


const mapStatetoProps = state => {
    return {              
        blogs: state.blogs,
        pagination: state.pagination
    }
}

const mapDispatchtoProps = (dispatch, ownProps) => {
    return {       
        blogsAction: bindActionCreators(AllBlogAction, dispatch),
    }
}
export default connect(mapStatetoProps, mapDispatchtoProps)(BlogPage);

