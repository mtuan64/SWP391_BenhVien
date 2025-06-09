import React from 'react'

export default function IconboxColumn(props) {
  return (
    <div className="iq-icon-box column d-flex align-items-center gap-2">
      <div className="icon-box-img">
          <img src={props.iconboxImage} alt="icon" className="img-fluid" loading="lazy" />
      </div>
      <div className="icon-box-content">
          <h5 className="icon-box-title">{props.iconboxTitle}</h5>
          <p className="icon-box-desc mb-0">{props.iconboxDesc}</p>
      </div>
  </div>
  )
}
