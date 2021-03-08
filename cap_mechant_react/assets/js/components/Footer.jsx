import React, { useState, useEffect } from 'react';

const Footer = (props) => {
    return (
        <>
            <footer id="footer" className="page-footer font-small bg-dark pt-4">
                <div className="container text-center text-md-left">
                    <div className="row text-center text-md-left mt-3 pb-3">
                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                        <h6 className="text-uppercase mb-4 font-weight-bold">Cap Méchant</h6>
                        <p>Here you can use rows and columns here to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit.
                        </p>
                    </div>
                    <hr className="w-100 clearfix d-md-none"/>
                    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                        <h6 className="text-uppercase mb-4 font-weight-bold">Products</h6>
                        <p>
                            <a href="#!">MDBootstrap</a>
                        </p>
                        <p>
                            <a href="#!">MDWordPress</a>
                        </p>
                        <p>
                            <a href="#!">BrandFlow</a>
                        </p>
                        <p>
                            <a href="#!">Bootstrap Angular</a>
                        </p>
                    </div>

                    <hr className="w-100 clearfix d-md-none"/>

                    <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                        <h6 className="text-uppercase mb-4 font-weight-bold">Useful links</h6>
                        <p>
                            <a href="#!">Your Account</a>
                        </p>
                        <p>
                            <a href="#!">Become an Affiliate</a>
                        </p>
                        <p>
                            <a href="#!">Shipping Rates</a>
                        </p>
                        <p>
                            <a href="#!">Help</a>
                        </p>
                    </div>

                    <hr className="w-100 clearfix d-md-none"/>

                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                        <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                        <p>
                            <mdb-icon fas icon="home" className="mr-3"></mdb-icon> New York, NY 10012, US
                        </p>
                        <p>
                            <mdb-icon fas icon="envelope" className="mr-3"></mdb-icon> info@example.com
                        </p>
                        <p>
                            <mdb-icon fas icon="phone" className="mr-3"></mdb-icon> + 01 234 567 88
                        </p>
                        <p>
                            <mdb-icon fas icon="print" className="mr-3"></mdb-icon> + 01 234 567 88
                        </p>
                    </div>
                </div>
                <hr className="bg-dark"/>
                <div className="row d-flex align-items-center">
                    <div className="col-md-7 col-lg-8">
                        <p className="text-center text-md-left">© 2020 Copyright:
                            <a href="https://creazot.re/" target="_blank">
                            <strong> creazot.re</strong>
                            </a>
                        </p>
                    </div>
                    <div className="col-md-5 col-lg-4 ml-lg-0">
                        <div className="text-center text-md-right">
                            <ul className="list-unstyled list-inline">
                            <li className="list-inline-item">
                                <a floating="true" className="rgba-white-slight mx-1">
                                    <i className="fab fa-facebook-square"></i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a floating="true" className="rgba-white-slight mx-1">
                                <i className="fab fa-twitter-square"></i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a floating="true" className="rgba-white-slight mx-1">
                                    <i className="fab fa-google-plus-square"></i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a floating="true" className="rgba-white-slight mx-1">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>

                </div>
            </footer>
        </>
    );
}
 
export default Footer;