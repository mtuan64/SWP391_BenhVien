import React from 'react'
import { Container } from 'react-bootstrap';

// Widgets
import VideoPopup from '../../widgets/VideoPopup';

// Images
import VideoBg from '/assets/images/paediatrician/video-bg.webp';

export default function PaediatricianVideoPopup() {
  return (
    <div className="video-popup">
      <Container fluid className="p-0">
        <div className="position-relative padding-200" style={{ background: `url(${VideoBg})`, backgroundRepeat: `no-repeat` , backgroundSize : "cover"}}>
          <div className="section-padding">
            <div className="position-absolute h-100 w-100 opacity-25 bg-primary top-0 start-0"></div>
            <VideoPopup videoLinkUrl="https://www.youtube.com/watch?v=VeDdpy4CdeM" />
          </div>
        </div>
      </Container>
    </div>
  )
}
