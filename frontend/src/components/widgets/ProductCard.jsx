import React, { Fragment, useState } from 'react'
import { Col, Image, Row, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

import FilterRating from './FilterRating'
import QuickView from './QuickView'
import Wishlist from '../../views/shop/wishlist'

export default function ProductCard({IsProductlist, IsNew, IsSale, ...props}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [items, setItems] = useState([]);

  const WishListAlert = () => {
    Swal.fire(
      'Added!',
      'Your item has been Added to the wishlist.',
      'success'
    )
  };

  const cartAlert = () => {
    Swal.fire(
      'Added!',
      'Your item has been Added to the cart.',
      'success'
    )
  };

  return (
    <Fragment>
      {IsProductlist === true ? (
          <div className="iq-product-box position-relative product-list">
              <div className="iq-inner-box">
                <Row>
                  <Col sm="4">
                    <div className="iq-product-image position-relative">
                        <Image src={props.productImage} alt="icon" className="img-fluid" loading="lazy" />
                        <div className="iq-button-holder d-inline-block">
                          <ul className="list-inline d-flex align-items-center gap-5 m-0 bg-white">
                              <li className="quick-view line-height-0">
                                <Link className="cursor-pointer" onClick={handleShow}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 20 17"
                                      fill="none">
                                      <path fillRule="evenodd" clipRule="evenodd"
                                          d="M13.1614 8.05311C13.1614 9.79911 11.7454 11.2141 9.99938 11.2141C8.25338 11.2141 6.83838 9.79911 6.83838 8.05311C6.83838 6.30611 8.25338 4.89111 9.99938 4.89111C11.7454 4.89111 13.1614 6.30611 13.1614 8.05311Z"
                                          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                          strokeLinejoin="round" />
                                      <path fillRule="evenodd" clipRule="evenodd"
                                          d="M9.998 15.3549C13.806 15.3549 17.289 12.6169 19.25 8.05292C17.289 3.48892 13.806 0.750916 9.998 0.750916H10.002C6.194 0.750916 2.711 3.48892 0.75 8.05292C2.711 12.6169 6.194 15.3549 10.002 15.3549H9.998Z"
                                          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                          strokeLinejoin="round" />
                                    </svg>
                                </Link>
                              </li>
                          </ul>
                        </div>
                        {IsNew === true && (
                          <span className="iq-on-new badge bg-primary">New</span>
                        )}

                        {IsSale === true && (
                          <span className="iq-on-new badge bg-primary">Sale</span>
                        )}                         
                    </div>
                  </Col>
                  <Col sm="8" className="mt-4 mt-sm-0">
                    <div className="product-caption">
                        <h4 className="product-title mt-1 mb-2">
                          <Link to="/shop/product-standard">{props.productTitle} </Link>
                        </h4>
                        <h6 className="price-value fw-semibold mb-2">
                          {props.priceValue}
                        </h6>
                        <div className="ratting">
                          <FilterRating rating={props.rating} />
                        </div>
                        <div className="list-buttons mt-3">
                          <ul className="list-inline m-0 d-flex align-items-center">
                              <li>
                                <div className="iq-btn-container">
                                    <Link className="iq-button text-capitalize" to="#" onClick={cartAlert}>
                                      <span className="iq-btn-text-holder position-relative">add to cart</span>
                                      <span className="iq-btn-icon-holder">
                                          <svg width="10" height="11" viewBox="0 0 10 11" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M5 0.5C5.34518 0.5 5.625 0.779822 5.625 1.125V4.875H9.375C9.72018 4.875 10 5.15482 10 5.5C10 5.84518 9.72018 6.125 9.375 6.125H5.625V9.875C5.625 10.2202 5.34518 10.5 5 10.5C4.65482 10.5 4.375 10.2202 4.375 9.875V6.125H0.625C0.279822 6.125 0 5.84518 0 5.5C0 5.15482 0.279822 4.875 0.625 4.875H4.375V1.125C4.375 0.779822 4.65482 0.5 5 0.5Z"
                                                fill="currentColor" />
                                          </svg>
                                      </span>
                                    </Link>
                                </div>
                              </li>
                              <li className="wish-list bg-primary-subtle ms-3">
                                <Link to="#" className="wishlist-btn" onClick={WishListAlert}>
                                    <span className="btn-inner">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20"
                                          viewBox="0 0 22 20" fill="none">
                                          <path fillRule="evenodd" clipRule="evenodd"
                                            d="M1.87187 9.59832C0.798865 6.24832 2.05287 2.41932 5.56986 1.28632C7.41986 0.689322 9.46186 1.04132 10.9999 2.19832C12.4549 1.07332 14.5719 0.693322 16.4199 1.28632C19.9369 2.41932 21.1989 6.24832 20.1269 9.59832C18.4569 14.9083 10.9999 18.9983 10.9999 18.9983C10.9999 18.9983 3.59787 14.9703 1.87187 9.59832Z"
                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                          <path d="M15 4.70001C16.07 5.04601 16.826 6.00101 16.917 7.12201"
                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                      </svg>
                                    </span>
                                </Link>
                              </li>
                          </ul>
                        </div>
                        <p className="product-desc mt-4 mb-0">{props.productDesc}</p>
                    </div>
                  </Col>
                </Row>
              </div>
          </div>
      ) : (
        <div className="iq-product-box position-relative animate:hover-media">
          <div className="iq-inner-box">
            <Link to="shop/shop-detail"></Link>
            <div className="iq-product-image position-relative">
                <div className="animate:hover-media-wrap">
                  <Image src={props.productImage} alt="icon"  className="img-fluid hover-media" loading="lazy" />
                </div>
                <div className="iq-button-holder d-inline-block">
                  <ul className="list-inline d-flex align-items-center gap-5 m-0 bg-white py-3 px-5">
                      <li className="quick-view">
                        <Link className="cursor-pointer" onClick={handleShow}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 20 17"
                              fill="none">
                              <path fillRule="evenodd" clipRule="evenodd"
                                  d="M13.1614 8.05311C13.1614 9.79911 11.7454 11.2141 9.99938 11.2141C8.25338 11.2141 6.83838 9.79911 6.83838 8.05311C6.83838 6.30611 8.25338 4.89111 9.99938 4.89111C11.7454 4.89111 13.1614 6.30611 13.1614 8.05311Z"
                                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                  strokeLinejoin="round" />
                              <path fillRule="evenodd" clipRule="evenodd"
                                  d="M9.998 15.3549C13.806 15.3549 17.289 12.6169 19.25 8.05292C17.289 3.48892 13.806 0.750916 9.998 0.750916H10.002C6.194 0.750916 2.711 3.48892 0.75 8.05292C2.711 12.6169 6.194 15.3549 10.002 15.3549H9.998Z"
                                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                  strokeLinejoin="round" />
                            </svg>
                        </Link>
                      </li>
                      <li className="wish-list">
                        <Link to="#" className="wishlist-btn" onClick={WishListAlert}>
                            <span className="btn-inner">
                              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20"
                                  fill="none">
                                  <path fillRule="evenodd" clipRule="evenodd"
                                    d="M1.87187 9.59832C0.798865 6.24832 2.05287 2.41932 5.56986 1.28632C7.41986 0.689322 9.46186 1.04132 10.9999 2.19832C12.4549 1.07332 14.5719 0.693322 16.4199 1.28632C19.9369 2.41932 21.1989 6.24832 20.1269 9.59832C18.4569 14.9083 10.9999 18.9983 10.9999 18.9983C10.9999 18.9983 3.59787 14.9703 1.87187 9.59832Z"
                                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                    strokeLinejoin="round" />
                                  <path d="M15 4.70001C16.07 5.04601 16.826 6.00101 16.917 7.12201"
                                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                    strokeLinejoin="round" />
                              </svg>
                            </span>
                        </Link>
                      </li>
                      <li className="add-to-cart">
                        <Link to="#" className="cart-btn" onClick={cartAlert}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 20 21"
                              fill="none">
                              <path
                                  d="M0.750122 1.24988L2.83012 1.60988L3.79312 13.0829C3.87012 14.0199 4.65312 14.7389 5.59312 14.7359H16.5021C17.3991 14.7379 18.1601 14.0779 18.2871 13.1899L19.2361 6.63188C19.3421 5.89888 18.8331 5.21888 18.1011 5.11288C18.0371 5.10388 3.16412 5.09888 3.16412 5.09888"
                                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                  strokeLinejoin="round" />
                              <path d="M12.1251 8.7948H14.8981" stroke="currentColor" strokeWidth="1.5"
                                  strokeLinecap="round" strokeLinejoin="round" />
                              <path fillRule="evenodd" clipRule="evenodd"
                                  d="M5.15447 18.2025C5.45547 18.2025 5.69847 18.4465 5.69847 18.7465C5.69847 19.0475 5.45547 19.2915 5.15447 19.2915C4.85347 19.2915 4.61047 19.0475 4.61047 18.7465C4.61047 18.4465 4.85347 18.2025 5.15447 18.2025Z"
                                  fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                  strokeLinejoin="round" />
                              <path fillRule="evenodd" clipRule="evenodd"
                                  d="M16.4347 18.2025C16.7357 18.2025 16.9797 18.4465 16.9797 18.7465C16.9797 19.0475 16.7357 19.2915 16.4347 19.2915C16.1337 19.2915 15.8907 19.0475 15.8907 18.7465C15.8907 18.4465 16.1337 18.2025 16.4347 18.2025Z"
                                  fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                  strokeLinejoin="round" />
                            </svg>
                        </Link>
                      </li>
                  </ul>
                </div>
                {IsNew === true && (
                  <span className="iq-on-new badge bg-primary">New</span>
                )}

                {IsSale === true && (
                  <span className="iq-on-sale badge bg-primary">Sale</span>
                )} 
            </div>
            <div className="product-caption text-center mt-3">
                <span className="iq-category">{props.productCategory}</span>            
                <h5 className="product-title mt-1 mb-2">
                  <Link to="/shop/product-standard">{props.productTitle}</Link>
                </h5>
                <h6 className="price-value fw-semibold mb-2">
                  {props.priceValue}
                </h6>
                <div className="ratting">
                  <FilterRating rating={props.rating} />
                </div>
            </div>
          </div>
        </div>
      )}
      
      <QuickView showModal={show} closeModal={handleClose} productData={{...props, IsNew, IsSale}} />

    </Fragment>
  )
}
