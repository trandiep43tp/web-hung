import React      from 'react';
import { NavLink} from 'react-router-dom';
import Summary    from '../Helper/Summary';

function RoomItem(props) {
    const room = props.room;
    const image =  `uploads/article/${room.images[0]}`;    
    return (
        <div className="col-sm col-md-6 col-lg-4 ftco-animate">
            <div className="room">
                <NavLink exact= {true} to = {`/rooms/detail/${room.slug}`} className="img d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${image})` }} >
                    <div className="icon d-flex justify-content-center align-items-center">
                        <span className="icon-search2" ></span>
                    </div>
                </NavLink>                 
                <div className="text p-3 text-center">
                    <h3 className="mb-3" style ={{height: 132, overflow: 'hidden'}}><NavLink exact= {true} to = {`/rooms/detail/${room.slug}`} >{ room.name }</NavLink></h3>
                    <p><span className="price mr-2">$ { room.price }</span> <span className="per">per night</span></p>
                    <Summary summary = { room.summary} />                   
                    <hr />
                    <p className="pt-1">
                        <NavLink exact= {true} to = {`/rooms/detail/${room.slug}`} className="btn-custom">Book Now <span className="icon-long-arrow-right" /> </NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RoomItem;
