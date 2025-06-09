import React from 'react'
import {  Container } from 'react-bootstrap';

// Widgets
import VideoPopup from '../../widgets/VideoPopup';

// Images
import videoPopupBg from '/assets/images/orthopedics/video-popup-bg.webp'

export default function OrthopedicsVideoPopup() {
  return (
    <div className="video-popup">
      <Container fluid className="p-0">
        <div className="position-relative padding-200" style={{backgroundImage: `url(${videoPopupBg})`, backgroundSize:`cover`}}>
          <div className="section-padding">
            <VideoPopup videoLinkUrl="https://www.youtube.com/watch?v=VeDdpy4CdeM" />
          </div>
      </div>
      </Container>
    </div>
  )
}
