import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Carousel  from '../Components/HomePage/Carousel';
import Form      from '../Components/HomePage/Form';
import Procedure from '../Components/HomePage/Procedure';
import Rooms     from '../Components/HomePage/Rooms';
import RoomItem  from '../Components/HomePage/RoomItem';
import Couters   from '../Components/HomePage/Couters';
import Employees from '../Components/HomePage/Employees';
import Blogs     from '../Components/HomePage/Blogs';
import BlogItem  from '../Components/HomePage/BlogItem';
import Instagram from '../Components/Instagram';
import * as AllBlogAction       from '../redux/action/blogs';
import * as AllRoomAction       from '../redux/action/rooms';
import * as AllCarouselAction   from '../redux/action/carousels';


function HomePage(props) {
    const { carousels, history, rooms, blogs } = props; 
    const { roomsHome } = rooms;
    const { blogsHome } = blogs;
    const { actFecthCarousels, actFecthImagePanel } = props.carouselsAction;
    const { actFecthRoomsHome  } = props.roomsAction;
    const { actFecthBlogsHome } = props.blogsAction;
    
    
    useEffect(() => {
        actFecthCarousels();
        actFecthImagePanel();
        actFecthRoomsHome();
        actFecthBlogsHome();       
    }, []) //eslint-disable-line

    useEffect(() => {
        const list = document.querySelectorAll('script[src = "js/main.js"]');
        if (list.length > 0) {
            document.body.removeChild(list[0])
        }
        const script = document.createElement('script');
        script.src = 'js/main.js';
        document.body.appendChild(script);
    }, [roomsHome, blogsHome, carousels]);

    return (
        <div >
            <Carousel carousels = {carousels} />
            <Form history = {history} />           
            <Procedure />
            <Rooms > {showRoomList(roomsHome)}  </Rooms>
            <Couters />
            <Employees />
            <Blogs > {showBlogList(blogsHome)} </Blogs>
            <Instagram title="rooms" instagrams={roomsHome} link='article' />
        </div>
    );
}

const showRoomList = (rooms) => {
    let xhtml = '';
    if (rooms.length > 0) {
        xhtml = rooms.map((room, index) => {
            return <RoomItem key={index} room={room} />
        })
    }
    return xhtml;
}
const showBlogList = (blogs) => {
    let xhtml = '';
    if (blogs.length > 0) {
        xhtml = blogs.map((blog, index) => {
            return <BlogItem key={index} blog={blog} />
        })
    }
    return xhtml;
} 

const mapStatetoProps = state => {
    return {
        rooms: state.rooms,
        blogs: state.blogs,
        carousels: state.carousels.listCarousels
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {       
        roomsAction: bindActionCreators(AllRoomAction, dispatch),
        blogsAction: bindActionCreators(AllBlogAction, dispatch),
        carouselsAction: bindActionCreators(AllCarouselAction, dispatch)
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(HomePage);

