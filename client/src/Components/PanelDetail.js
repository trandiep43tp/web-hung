import React, {useState, useEffect } from 'react';
import { connect }      from 'react-redux';
import {Link, NavLink}  from 'react-router-dom';

function RoomDetailPanel(props) {   
    const [imageItem, setImageItem ] = useState({image: 'bg_1.jpg'});
    const name       = UppercaseCharFirst(props.name);
    const menu       = props.name.split(" ", 1);
    const imagePanel = 'uploads/imageweb/' + imageItem.image;   
    const link       = props.link;   
    
    useEffect(()=>{ 
        setImageItem(props.image[0])
    },[props.image])

    function UppercaseCharFirst(string) {
        return  string.toLowerCase()
                        .split(' ')
                        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(' ');
    }

    return (
        <div className="hero-wrap" style={{ backgroundImage: `url(${imagePanel})` }}>
            <div className="overlay" />
            <div className="container">
                <div className="row no-gutters slider-text d-flex align-itemd-end justify-content-center">
                    <div className="col-md-9 ftco-animate text-center d-flex align-items-end justify-content-center">
                        <div className="text">
                            <p className="breadcrumbs mb-2" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"><span className="mr-2"><NavLink exact = {false} to = '/' >Home</NavLink></span> <span className="mr-2"><Link exact = 'true' to = {link}>{menu}</Link></span> <span>{name}</span></p>
                            <h1 className="mb-4 bread">{name}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 

const mapStatetoProps = state =>{   
    return {
        image: state.carousels.imagePanel      
    }
}
export default connect(mapStatetoProps, null) (RoomDetailPanel);

