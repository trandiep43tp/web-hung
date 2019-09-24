import React        from 'react';
import { NavLink }  from 'react-router-dom';

function RoomItem(props) {
    const room = props.room;     
    const image =  `uploads/article/${room.images[0]}`;      
   
    return (
        <div className="col-sm col-md-6 col-lg-4 ftco-animate">
            <div className="room">               
                <NavLink className="img d-flex justify-content-center align-items-center" exact= {false} to={"/rooms"}  style={{ backgroundImage: `url(${image})` }} >
                    <div className="icon d-flex justify-content-center align-items-center">
                        <span className="icon-search2" />
                    </div>
                </NavLink>
                <div className="text p-3 text-center">
                    <h3 className="mb-3" style = {{height: 96, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <NavLink className="btn-custom " exact= {false} to={'/rooms'} >
                            {room.name}
                        </NavLink>                        
                    </h3>
                    <p><span className="price mr-2">${ room.price }</span> <span className="per">per night</span></p>
                    <hr />
                    <p className="pt-1">
                        <NavLink className="btn-custom " exact= {false} to={`/rooms/detail/${room.slug}`} >
                            View Room Details <span className="icon-long-arrow-right" />
                        </NavLink>                      
                    </p>
                </div>
            </div> 
        </div>
    );
}

export default RoomItem;
