import React, { Fragment } from 'react'
import Image from 'react-bootstrap/Image';
// widget
import ButtonBox from './ButtonBox';

export default function PricingStandard({isActive, ...props}) {
  return (
    <Fragment>
      <div className={`iq-price-box iq-price-box-standard px-3 px-md-5 py-5 ${isActive ? " bg-primary text-white " : "bg-white"} `}>
        <div className="iq-inner-box">
            <div className="iq-price-header">
              <div className="price-heading d-flex align-items-center justify-content-between flex-sm-row flex-column-reverse mb-sm-0 mb-4">
                  <div className="price-box text-sm-start text-center">
                    <h6 className="iq-price-title text-uppercase fw-normal">{props.pricingTitle}</h6>
                    <h2 className="iq-price">{props.priceValue}<small>/ {props.priceYear}</small></h2>
                  </div>
                  <div className="price-image">
                    <Image src={props.priceImage} alt="icon" className="img-fluid" loading="lazy" />
                  </div>
              </div>
              <p className="iq-price-desc">{props.priceDescription}</p>
            </div>
            <div className="iq-price-body">
              <ul className="iq-price-service list-inline border-top pt-5 mt-5">
                  <li className="mb-3 text-capitalize">
                    <i className="fa fa-check me-2" aria-hidden="true"></i>{" "}
                    {props.list1}
                  </li>
                  <li className="mb-3 text-capitalize">
                    <i className="fa fa-check me-2" aria-hidden="true"></i>{" "}
                    {props.list2}
                  </li>
                  <li className="mb-3 text-capitalize">
                    <i className="fa fa-check me-2" aria-hidden="true"></i>{" "}
                    {props.list3}
                  </li>
                  <li className="mb-3 text-capitalize">
                    <i className="fa fa-check me-2" aria-hidden="true"></i>{" "}
                    {props.list4}
                  </li>
                  <li className="mb-3 text-capitalize">
                    <i className="fa fa-check me-2" aria-hidden="true"></i>{" "}
                    {props.list5}
                  </li>
              </ul>
            </div>
            <div className="price-footer text-center mt-5">
              <ButtonBox buttonText="read more" buttonUrl="/pricing-plan-one" />
            </div>
        </div>
      </div>
    </Fragment>
  )
}
