import React from 'react';

function Footer() {
    return (
        <footer className="ftco-footer ftco-bg-dark ftco-section">
            <div className="container">
                <div className="row mb-5">
                    <div className="col-md">
                        <div className="ftco-footer-widget mb-4">
                            <h2 className="ftco-heading-2">Deluxe Hotel</h2>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                            <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
                                <li className="ftco-animate"><a href="/"><span className="icon-twitter" /></a></li>
                                <li className="ftco-animate"><a href="/"><span className="icon-facebook" /></a></li>
                                <li className="ftco-animate"><a href="/"><span className="icon-instagram" /></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="ftco-footer-widget mb-4 ml-md-5">
                            <h2 className="ftco-heading-2">Useful Links</h2>
                            <ul className="list-unstyled">
                                <li><a href="/blogs/1" className="py-2 d-block">Blog</a></li>
                                <li><a href="/rooms/1" className="py-2 d-block">Rooms</a></li>                               
                            </ul>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="ftco-footer-widget mb-4">
                            <h2 className="ftco-heading-2">Privacy</h2>
                            <ul className="list-unstyled">                               
                                <li><a href="/about" className="py-2 d-block">About Us</a></li>
                                <li><a href="/contact" className="py-2 d-block">Contact Us</a></li>                               
                            </ul>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="ftco-footer-widget mb-4">
                            <h2 className="ftco-heading-2">Have a Questions?</h2>
                            <div className="block-23 mb-3">
                                <ul>
                                    <li><span className="icon icon-map-marker" /><span className="text">203 Fake St. Mountain View, San Francisco, California, USA</span></li>
                                    <li><a href="/"><span className="icon icon-phone" /><span className="text">+2 392 3929 210</span></a></li>
                                    <li><a href="/"><span className="icon icon-envelope" /><span className="text">info@yourdomain.com</span></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <p>{/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                            Copyright © All rights reserved | This template is made with <i className="icon-heart color-danger" aria-hidden="true" /> by <a href="https://colorlib.com" >Colorlib</a>
                            {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}</p>
                    </div>
                </div>
            </div>
        </footer>

    );
}

export default Footer;
