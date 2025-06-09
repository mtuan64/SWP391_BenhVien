import React from 'react'

export default function TitleboxSlider(props) {
  return (
    <div className="text-slider-content position-relative">
      <h2 className="iq-title iq-heading-title">{props.sliderTitleMain}</h2>
      <p className="iq-title-desc mb-0">{props.sliderDecs}</p>
    </div>
  )
}
