import React, { Fragment, useState } from 'react'

import FsLightbox from "fslightbox-react";

export default function VideoPopup({ isShapeCircle , ...props}) {
  const [toggler, setToggler] = useState(false);
  return (
    <Fragment>
			<FsLightbox
				toggler={toggler}
				sources={[props.videoLinkUrl]}
			/>
      {isShapeCircle === true ? (
      <div className="iq-popup-video">
        <div className="iq-video-icon position-absolute ">
            <div className="iq-video bg-white position-absolute text-center d-inline-block iq-fslightbox-img rounded-circle">
              <button className="bg-transparent border-0 w-100" onClick={() => setToggler(!toggler)}>
                <i aria-hidden="true" className="fas fa-play text-primary"></i>
              </button>
            </div>
            <div className="iq-waves">
              <div className="waves position-absolute rounded-circle wave-1"></div>
              <div className="waves position-absolute rounded-circle wave-2"></div>
              <div className="waves position-absolute rounded-circle wave-3"></div>
            </div>
        </div>
      </div>
    ) :(
      <div className="iq-popup-video">
        <div className="iq-video-icon position-absolute ">
            <div className="iq-video bg-white position-absolute text-center d-inline-block iq-fslightbox-img">
              <button className="bg-transparent border-0 w-100" onClick={() => setToggler(!toggler)}>
                <i aria-hidden="true" className="fas fa-play text-primary"></i>
              </button>
            </div>
            <div className="iq-waves">
              <div className="waves position-absolute rounded-0 wave-1"></div>
              <div className="waves position-absolute rounded-0 wave-2"></div>
              <div className="waves position-absolute rounded-0 wave-3"></div>
            </div>
        </div>
      </div>
    )}
    </Fragment>
  )
}
