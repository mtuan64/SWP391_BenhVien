import React from 'react'

export default function CounterStandard(props) {
  return (
    <div className="iq-counter iq-counter-standard text-center">
      <div className="counter-content">
          <h2 className="counter mt-0 mb-2 text-white fw-500">{props.counterValue}</h2>
          <h6 className="counter-title fw-normal">{props.counterTitle}</h6>
      </div>
    </div>
  )
}
