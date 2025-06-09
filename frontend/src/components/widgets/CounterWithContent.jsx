import React from 'react'

export default function CounterWithContent(props) {
  return (
    <div className="iq-counter iq-counter-with-content">
      <div className="counter-content d-flex align-items-md-center flex-md-row flex-column gap-3">
          <h2 className="counter m-0 text-primary fw-bold">{props.counterValue}</h2>
          <h6 className="counter-title m-0 fw-normal">{props.counterTitle}</h6>
      </div>
    </div>
  )
}
