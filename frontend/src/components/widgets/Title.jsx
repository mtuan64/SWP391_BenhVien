import React from 'react'

export default function Title(props) {
  return (
    <div className="iq-title-box">
      <span className="iq-subtitle text-uppercase">{props.subTitle}</span>
      <h2 className="iq-title iq-heading-title">
        <span className={`right-text text-capitalize fw-500 ${props.leftText !== undefined ? "" : "me-0"}`}>{props.rightText}</span>
        <span className="left-text text-capitalize fw-light">{props.leftText}</span>
      </h2>
      <p className="iq-title-desc text-body mt-3 mb-0" >
          {props.titleDescription}
      </p>
    </div>
  )
}
