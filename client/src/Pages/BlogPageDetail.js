import React, { useEffect }   from 'react';
import { bindActionCreators } from 'redux';
import { connect }     from 'react-redux';
import PanelDetail     from '../Components/PanelDetail';
import BlogDetail      from '../Components/BlogPage/BlogDetail';
import * as AllBlogAction from '../redux/action/blogs';

function BlogPageDetail(props) {
    const { match, history, blogs, blogsAction } = props;
    const slug   = match.params.slug;
    const { blogDetail, blogsRecent} = blogs;  
    const { actFechBlogResent, actfechBlogDetail } = blogsAction;

    useEffect(()=>{
        actFechBlogResent();        
    },[]) //eslint-disable-line    

    useEffect(()=>{
        actfechBlogDetail(slug);
    },[slug]) //eslint-disable-line

    useEffect(() => {
        const list = document.querySelectorAll('script[src = "js/main.js"]');
        if (list.length > 0) {
            document.body.removeChild(list[0])
        }
        const script = document.createElement('script');
        script.src = 'js/main.js';
        document.body.appendChild(script);
    }, [])

    return (
        <div >
            <PanelDetail name = "blog single" link = "/blogs/1" history = {history} />            
            <BlogDetail blog ={blogDetail} blogsRecent = { blogsRecent} history = {history} />           
        </div>
    );
}

const mapStatetoProps = state =>{   
    return {
        blogs: state.blogs
    }
}


const mapDispatchtoProps = ( dispatch ) =>{    
    return {
        blogsAction: bindActionCreators(AllBlogAction, dispatch) 
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps) (BlogPageDetail);

