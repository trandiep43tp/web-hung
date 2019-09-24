import React from 'react';

function Blogs({children }) {   
    return (
        <section className="ftco-section">
            <div className="container">
                <div className="row justify-content-center mb-5 pb-3">
                    <div className="col-md-7 heading-section text-center ftco-animate">
                        <h2>Recent Blog</h2>
                    </div>
                </div>
                <div className="row d-flex">
                        {children }                    
                </div>
            </div>
        </section>
    );
}

export default Blogs;
