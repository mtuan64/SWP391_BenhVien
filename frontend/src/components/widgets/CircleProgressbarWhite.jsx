import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function CircleProgressbarWhite(props) {
  return (
    <div className="iq-circle-progressbar circle-progressbar-white gap-5 d-flex align-items-center flex-wrap flex-md-row flex-column text-md-start text-center">
      <div className="card-profile-progress">
          <CircularProgressbar value={props.progressValueNumber} text={`${props.progressValueNumber}%`} />
      </div>
      <div className="circle-progressbar-info">
          <span className="circle-progressbar-subtitle text-white text-uppercase fw-semibold letter-spacing-2">{props.progressSubtitle}</span>
          <h5 className="circle-progressbar-title mt-2 mb-0 text-white">{props.progressTitle}</h5>
      </div>
    </div>
  )
}
