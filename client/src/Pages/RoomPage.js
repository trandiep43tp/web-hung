import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Panel from '../Components/Panel';
import Rooms from '../Components/RoomPage/Rooms';
import Instagram from '../Components/Instagram';
import FormSearch from '../Components/RoomPage/FormSerch';
import FormEvaluate from '../Components/RoomPage/FormEvaluate';
import GlobalLoading from  '../Components/Helper/Loadding';
import * as AllRoomAction from '../redux/action/rooms';
import * as AllBlogAction from '../redux/action/blogs';

function RoomPage(props) {
    const {history, match, rooms, blogs, pagination } = props;
    const { roomsPage, roomSearch} = rooms;
    const { blogsRecent } = blogs;   
    const {paginationRoom } = pagination;
    const { actFecthRoomsPage, actFecthCountRooms, actChangeCurrentPageRoom } = props.roomsAction;
    const { actFechBlogResent } = props.blogsAction;
   
    let page = 1;
    if (match.params.page !== undefined && !isNaN(match.params.page)) {
        page = parseInt(match.params.page);        
    }    

    useEffect(()=>{
        actFechBlogResent();         
    },[]) //eslint-disable-line

    useEffect(()=>{
        actFecthCountRooms(roomSearch);
    },[roomSearch]) //eslint-disable-line

    useEffect(()=>{
        actChangeCurrentPageRoom(page)
    },[page]) //eslint-disable-line
   
    useEffect(() => {   
        actFecthRoomsPage(roomSearch, paginationRoom);          
    },[ roomSearch, paginationRoom.currentPage]) //eslint-disable-line   
   
    return ( 
        <div >
            <Panel name='rooms' />
            <section className="ftco-section bg-light">
                <div className="container">
                    <div className="row">
                        <GlobalLoading />
                        <Rooms pagination={paginationRoom} rooms = {roomsPage} />
                        <div className="col-lg-3 sidebar">
                            <div className="sidebar-wrap bg-light ftco-animate">
                                <h3 className="heading mb-4">Advanced Search</h3>
                                <FormSearch search={roomSearch } history = { history } />
                            </div>
                            <div className="sidebar-wrap bg-light ftco-animate">
                                <h3 className="heading mb-4">Star Rating</h3>
                                <FormEvaluate history = { history } />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Instagram title = "Blogs" instagrams = {blogsRecent} link = "blog" />
        </div>
    );
}

const mapStatetoProps = state => {
    return {      
        rooms: state.rooms,        
        blogs: state.blogs,     
        pagination: state.pagination,
       
    }
}
const mapDispatchtoProps = dispatch => {
    return {       
        blogsAction: bindActionCreators(AllBlogAction, dispatch),
        roomsAction: bindActionCreators(AllRoomAction, dispatch),
    }
}
export default connect(mapStatetoProps, mapDispatchtoProps)(RoomPage);

