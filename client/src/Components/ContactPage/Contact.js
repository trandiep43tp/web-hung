import React  from 'react';
import FormContact from './FormContact';


function Contact() {  
    
    return ( 
        <section className="ftco-section contact-section bg-light">
            <div className="container">
                <div className="row d-flex mb-5 contact-info">
                    <div className="col-md-12 mb-4">
                        <h2 className="h3" style = {{textAlign: 'center'}}>Contact Information</h2>
                    </div>                   
                </div>
                <div className="row">
                    <div className="col-lg-6"></div>
                    <div className="col-lg-6">
                       
                    </div>
                </div>
                <div className="row block-9">                   
                    <div className="col-md-6 order-md-last d-flex">
                        <FormContact  />
                    </div>
                    <div className="col-md-6 d-flex">
                        <div id="map" className="bg-white" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
