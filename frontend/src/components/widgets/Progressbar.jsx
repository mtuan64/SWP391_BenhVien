import React, { Fragment } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function Progressbar(props) {
  return (
    <Fragment>
      <div className="wrapper-progress">
        <div className="percentage-progress d-flex justify-content-between">
          <h6 className="mb-2 text-body">{props.progressTitle}</h6>
          <div className="text-body"><span>{props.progressValue}%</span></div>
        </div>
      </div>
      <ProgressBar now={props.progressValue} style={{height: `10px`}} />
    </Fragment>    
  )
}
