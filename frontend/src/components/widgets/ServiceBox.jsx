import React from 'react'
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom'

export default function ServiceBox(props) {
  return (
    <div className="service-blog p-3 p-md-5 bg-secondary-subtle position-relative">
      <div className="css_prefix-box-title">
        <Link to={props.btnUrl}>
          <h4>{props.serviceTitle}</h4>
        </Link>
      </div>
      <p className="text-body py-2 py-md-4">{props.serviceDescription}</p>
      <div className="overflow-hidden mb-5">
        <Image src={props.serviceImage} alt="service-img" className="img-fluid w-100 service-img" />
      </div>
      <div className="service-box-icon position-absolute d-inline-block text-center">
        <Image src={props.serviceIcon} alt="service-icon" />
      </div>
      <div className="iq-btn-container">
        <Link className="iq-button iq-btn-link text-capitalize" to={props.btnUrl}>
          read more{" "}
          <span className="btn-link-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 8 8" fill="none">
              <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor"></path>
            </svg>
          </span>
        </Link>
      </div>
    </div>
  )
}
