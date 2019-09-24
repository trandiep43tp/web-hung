import React        from 'react';
import { NavLink }  from 'react-router-dom';

function Rooms(props) {
    let children = props.children;
    return (
        <section className="ftco-section bg-light">
            <div className="container">
                <div className="row justify-content-center mb-5 pb-3">
                    <div className="col-md-7 heading-section text-center ftco-animate">
                        <h2 className="mb-4">Our Rooms</h2>
                    </div>
                </div>
                <div className="row">
                    {children}
                </div>
            </div>
            <div className="btn-wrapper">
                <p className="text-center">
                    <NavLink className="btn btn-primary" exact= {true} to= '/rooms/1' >
                        VIEW ALL
                    </NavLink>               
                </p>
            </div>
        </section >
    );
}

export default Rooms;
