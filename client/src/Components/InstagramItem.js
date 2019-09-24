import React from 'react';

function InstagramItem(props){
    const instagram = props.instagram;
    const link = props.link;
    const image =  `uploads/${link}/${instagram.images[0]}`;

    return (
        <div className="col-sm-12 col-md ftco-animate">
            <a href={image} className="insta-img image-popup" style={{ backgroundImage: `url(${image})`}}>
                <div className="icon d-flex justify-content-center">
                    <span className="icon-instagram align-self-center" />
                </div>
            </a>
        </div>
    );
}

export default InstagramItem;
