import React from 'react'

// widget
import ButtonBox from './ButtonBox';

export default function PricingTab({isActive, ...props}) {
  return (
    <div className={`iq-price-box iq-price-box-tab text-body box-shadow rounded-4 ${isActive ? 'bg-primary-subtle' : 'bg-white'}`}>
      <div className="iq-inner-box">
        <div className={`iq-price-header ${isActive ? 'bg-dark text-white' : 'bg-primary-subtle text-body'}`}>
          <div className="text-center">
            <h4 className={`${isActive ? 'text-secondary' : ''}`}>{props.pricingTitle}</h4>
            <p className="mb-0">{props.priceDescription}</p>
          </div>
        </div>
        <div className="iq-price-body text-center">
          <p className="mt-0">{props.priceSubTitle}</p>
          <h2 className="mb-0">{props.priceValue}</h2>
          <ul className="list-inline border-top mt-5 pt-5">
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
          </ul>
        </div>
        <div className={`iq-price-footer text-center ${isActive ? 'button-primary' : ''}`}>
          <ButtonBox buttonText="read more" buttonUrl="/pricing-plan-two" />
        </div>
      </div>
    </div>
  )
}
