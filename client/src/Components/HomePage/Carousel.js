import React, { useState, useEffect }  from 'react';

function Carourel(props) {
    const {carousels } = props;
    const [isShow, setisShow] = useState(false);
    const forderImage         =  'uploads/imageweb';   

    useEffect(() => {
       if (carousels.length > 0)
            setisShow(true);
    },[carousels.length]);   
    
    const showCarousel = (carousels) => {
        let xhtml = '';
        xhtml = carousels.map((carousel, index) => {
            return (
                <div className="slider-item" style={{ backgroundImage: `url( ${forderImage}/${carousel.image})` }} key = {index}>
                    <div className="overlay" />
                    <div className="container">
                        <div className="row no-gutters slider-text align-items-center justify-content-center">
                            <div className="col-md-12 ftco-animate text-center">
                                <div className="text mb-5 pb-3">
                                    <h1 className="mb-3">{carousel.content_1}</h1>
                                    <h2>{carousel.content_2}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        return <section className="home-slider owl-carousel"> {xhtml} </section>;
    }

    return   isShow ? showCarousel(carousels) : ''
}

export default Carourel;

