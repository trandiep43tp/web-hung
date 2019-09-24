import React, { useState, useEffect} from 'react';
import RoomItem         from './RoomItem';
import PaginationHelper from '../../Components/Helper/Pagination';

function Rooms(props){   
   
   const { rooms } = props; 
    const [isLoading, setIsLoading] = useState(false);
    const pagination                = props.pagination;

    useEffect(() =>{      
        if(rooms.length >0){
            setIsLoading(true)
        }       
    },[rooms])

    useEffect(() => {       
        const list = document.querySelectorAll('script[src = "js/main.js"]');
        if (list.length > 0) {
            document.body.removeChild(list[0])
        }
        const script = document.createElement('script');
        script.src = 'js/main.js';
        document.body.appendChild(script);
    }, [rooms]);
    
    return ( 
        <div className="col-lg-9">
            <div className="row">
                {isLoading? showRooms(rooms) : ''}
            </div>
            <div className="row mt-5">
                <div className="col text-center">
                   <PaginationHelper linkPrefix = '/rooms' pagination = { pagination}  />
                </div>
            </div>           
        </div>
    );
}


const showRooms = (rooms) => {
    let xhtml = '';
    if (rooms.length > 0) {
        xhtml = rooms.map((room, index) => {
            return < RoomItem  key={index} room={room} />
        })
    }
    return xhtml;
}


export default Rooms;
