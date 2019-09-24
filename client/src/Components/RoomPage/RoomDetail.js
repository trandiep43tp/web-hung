import React  from 'react';
import { NavLink }         from 'react-router-dom';
import Moment              from 'react-moment';
import ReactHtmlParser     from 'react-html-parser';
import SummaryinRoomDetail from '../Helper/SummaryinRoomDetail';  
import FormSearchName      from './FormSerchName';

function RoomDetail(props) {    

    let {room, blogs, history, roomsOrther} = props;    
    
    function handleRanting(e) {       
        alert("Cảm Ơn Bạn Đã Đánh Giá");
        e.preventDefault();       
       // props.history.push( `/rooms/detai");         
    }
   
    return (
        <section className="ftco-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="row">
                            <div className="col-md-12 ftco-animate">
                                <h2 className="mb-4">{ room.name }</h2>
                                {  showImage(room.images)}                               
                            </div>
                            { ReactHtmlParser(room.content)}
                            
                            <div className="col-md-12 properties-single ftco-animate mb-5 mt-4">
                                <h4 className="mb-4">Review &amp; Ratings</h4>
                                <div className="row">
                                    <div className="col-md-6">
                                        <form method="post" className="star-rating">
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange = {handleRanting} />
                                                <label className="form-check-label" htmlFor="exampleCheck1">
                                                    <p className="rate"><span><i className="icon-star" /><i className="icon-star" /><i className="icon-star" /><i className="icon-star" /><i className="icon-star" /> 100 Ratings</span></p>
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange = {handleRanting} />
                                                <label className="form-check-label" htmlFor="exampleCheck1">
                                                    <p className="rate"><span><i className="icon-star" /><i className="icon-star" /><i className="icon-star" /><i className="icon-star" /><i className="icon-star-o" /> 30 Ratings</span></p>
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange = {handleRanting} />
                                                <label className="form-check-label" htmlFor="exampleCheck1">
                                                    <p className="rate"><span><i className="icon-star" /><i className="icon-star" /><i className="icon-star" /><i className="icon-star-o" /><i className="icon-star-o" /> 5 Ratings</span></p>
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange = {handleRanting} />
                                                <label className="form-check-label" htmlFor="exampleCheck1">
                                                    <p className="rate"><span><i className="icon-star" /><i className="icon-star" /><i className="icon-star-o" /><i className="icon-star-o" /><i className="icon-star-o" /> 0 Ratings</span></p>
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange = {handleRanting} />
                                                <label className="form-check-label" htmlFor="exampleCheck1">
                                                    <p className="rate"><span><i className="icon-star" /><i className="icon-star-o" /><i className="icon-star-o" /><i className="icon-star-o" /><i className="icon-star-o" /> 0 Ratings</span></p>
                                                </label>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 room-single ftco-animate mb-5 mt-5">
                                <h4 className="mb-4">Available Room</h4>                              
                                <div className="row">
                                    { showRoomsOrther(roomsOrther, room._id)}                                   
                                </div>
                            </div>
                        </div>
                    </div> {/* .col-md-8 */}
                    
                    <div className="col-lg-4 sidebar ftco-animate">
                        <div className="sidebar-box">
                            <FormSearchName history = {history} />
                            {/* <form action="/" className="search-form" onSubmit = {handleSubmit}>
                                <div className="form-group">
                                    <span className="icon fa fa-search" />
                                    <input type="text" value = {name} onChange = {e => setName(e.target.value)} className="form-control" placeholder="Type a keyword and hit enter" />
                                </div>
                            </form> */}
                        </div>
                        <div className="sidebar-box ftco-animate">
                            <div className="categories">
                                <h3>Categories</h3>
                                <SummaryinRoomDetail summary = {room.summary} slug = {room.slug} />                               
                            </div>
                        </div>
                        <div className="sidebar-box ftco-animate">
                            <h3>Recent Blog</h3>
                            {  showBlog(blogs)}                           
                        </div>
                        <div className="sidebar-box ftco-animate">
                            <h3>Tag Cloud</h3>
                            <div className="tagcloud">
                                <a href="/" className="tag-cloud-link">dish</a>
                                <a href="/" className="tag-cloud-link">menu</a>
                                <a href="/" className="tag-cloud-link">food</a>
                                <a href="/" className="tag-cloud-link">sweet</a>
                                <a href="/" className="tag-cloud-link">tasty</a>
                                <a href="/" className="tag-cloud-link">delicious</a>
                                <a href="/" className="tag-cloud-link">desserts</a>
                                <a href="/" className="tag-cloud-link">drinks</a>
                            </div>
                        </div>
                        <div className="sidebar-box ftco-animate">
                            <h3>Paragraph</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus itaque, autem necessitatibus voluptate quod mollitia delectus aut, sunt placeat nam vero culpa sapiente consectetur similique, inventore eos fugit cupiditate numquam!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const showImage = images =>{
    let xhtml = '';
    if(images === undefined || images.length === 0 ) return xhtml;    
    xhtml = images.map((item, index) =>{
        return(
            <div className="item" key = {index}>
                <div className="room-img" style={{ backgroundImage: `url(uploads/article/${item})` }} />
            </div>
        )
    })      
    return <div className="single-slider owl-carousel"> {xhtml} </div>;
}

const showRoomsOrther = (roomsOrther, idRoomCurrent) =>{  
    let  xhtml = '';
    if(roomsOrther.length >0){   
          xhtml = roomsOrther.map((item, index) =>{               
            return(
                <div className="col-sm col-md-6 ftco-animate" key = {index}>
                    <div className="room">
                        <NavLink exact = {true} to= {`/rooms/detail/${item.slug}`} className="img img-2 d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(uploads/article/${item.images[0]})` }}>
                            <div className="icon d-flex justify-content-center align-items-center">
                                <span className="icon-search2" />
                            </div>
                        </NavLink>
                        <div className="text p-3 text-center">
                            <h3 className="mb-3" style = {{height: 96, overflow: "hidden"}}><NavLink to={`/rooms/detail/${item.slug}`}>{item.name}</NavLink></h3>
                            <p><span className="price mr-2">${item.price}</span> <span className="per">per night</span></p>
                            <hr />
                            <p className="pt-1"><NavLink to = {`/rooms/detail/${item.slug}`} className="btn-custom">View Room Details <span className="icon-long-arrow-right" /></NavLink></p>
                        </div>
                    </div>
                </div>
            )          
        })
    }
    return xhtml;
} 

const showBlog = blogs =>{
    let xhtml = '';
    if(blogs.length >0 ){
        xhtml = blogs.map((item, index) =>{
            return( 
                <div className="block-21 mb-4 d-flex" key = {index}>
                    <NavLink exact={true}  to={`{/blogs/detail/${item.slug}}`} className="blog-img mr-4" style={{ backgroundImage: `url(uploads/blog/${item.images[0]})` }}> </NavLink>
                    <div className="text">
                        <h3 className="heading"><NavLink exact = {true} to = {`/blogs/detail/${item.slug}`} >{item.name}</NavLink></h3>
                        <div className="meta">
                            <div><NavLink to={`{/blogs/detail/${item.slug}}`}>
                                            <Moment format="MMM Do YY">
                                                {item.created.time}
                                            </Moment>
                                    </NavLink>
                            </div>
                            <div><NavLink to="/"><span className="icon-person" />{item.created.user_name}</NavLink></div>
                            <div><NavLink to="/"><span className="icon-chat" /> 19</NavLink></div>
                        </div>
                    </div>
                </div>
            )
        })
    }
    return xhtml;
}


export default RoomDetail;


