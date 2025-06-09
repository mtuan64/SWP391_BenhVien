import React from 'react'
import { Container } from 'react-bootstrap';

// Widgets
import VideoPopup from '../../widgets/VideoPopup';

// Images
import productHomePopup from '/assets/images/product-home/product-home-popup.jpg'

export default function ProductVideoPopup() {
  return (
    <div className="video-popup">
      <Container fluid>
        <div className="position-relative padding-200" style={{background: `url(${productHomePopup})`, backgroundRepeat: `no-repeat`, backgroundPosition: `center center`, backgroundSize: `cover`}}>
          <div className="section-padding">
            <div className="position-absolute h-100 w-100 bg-light opacity-25 top-0 start-0"></div>
            <VideoPopup isShapeCircle={true} videoLinkUrl="https://www.youtube.com/watch?v=VeDdpy4CdeM" />
          </div>
        </div>
      </Container>
    </div>
  )
}
