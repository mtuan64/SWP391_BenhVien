import React from 'react'
import Image from 'react-bootstrap/Image';

export default function History(props) {
  return (
    <div className="history">
      <div className="row align-items-center">
          <div className="col-md-4 border-end">
            <div className="d-flex align-items-center gap-3 gap-lg-5 flex-lg-auto flex-wrap">
                <Image src={props.historyImage} alt="icon" className="img-fluid history-image" loading="lazy" />
                <h5>{props.historyYear}</h5>
            </div>
          </div>
          <div className="col-md-8 ps-md-5 mt-md-0 mt-3">
            <p className="mb-0">{props.historyDesc}</p>
          </div>
      </div>
    </div>
  )
}
