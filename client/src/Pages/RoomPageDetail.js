import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect }     from 'react-redux';
import PanelDetail     from '../Components/PanelDetail';
import RoomDetail      from '../Components/RoomPage/RoomDetail';
import Instagram       from '../Components/Instagram';
import * as AllRoomAction from '../redux/action/rooms';
import * as AllBlogAction from '../redux/action/blogs';

function RoomPageDetail(props) {   
    const { match, history, rooms, blogs, blogsAction, roomsAction }  = props;
    const slug   = match.params.slug;
    const {roomDetail, roomsOther } = rooms;
    const { blogsRecent } = blogs;
    const {actFechBlogResent } = blogsAction;
    const { actfechRoomDetail, actfecthRoomOrther,actChangeSearchRoomName } = roomsAction;
        
     //lấy dữ liệu
     useEffect(() => {       
        actFechBlogResent();      
        actChangeSearchRoomName(''); //search name = ''              
    },[]) //eslint-disable-line

    useEffect(()=>{
        actfechRoomDetail(slug);   
        actfecthRoomOrther(slug)   
    },[slug]) //eslint-disable-line

    useEffect(() => {
        const list = document.querySelectorAll('script[src = "js/main.js"]');
        if (list.length > 0) {
            document.body.removeChild(list[0])
        }
        const script = document.createElement('script');
        script.src = 'js/main.js';
        document.body.appendChild(script);
    },[roomDetail])

    return (
        <div >
            <PanelDetail name = "room single" link = "/rooms/1" history = {history} />
            <RoomDetail room ={roomDetail} blogs = {blogsRecent} roomsOrther = {roomsOther} history = {history} />
            <Instagram title = "Blogs" instagrams = {blogsRecent} link = "blog" />
        </div>
    );
}
 
const mapStatetoProps = state =>{   
    return {
        rooms: state.rooms,
        blogs: state.blogs
    }
}
const mapDispatchtoProps = dispatch =>{    
    return {          
        roomsAction: bindActionCreators(AllRoomAction, dispatch),
        blogsAction: bindActionCreators(AllBlogAction, dispatch),      
    }
}
export default connect(mapStatetoProps, mapDispatchtoProps) (RoomPageDetail);

 