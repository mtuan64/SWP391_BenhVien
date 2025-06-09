import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

// widgets
import VideoPopup from '../../widgets/VideoPopup'

// Images
import dentistVideoBg from '/assets/images/Dentist-Page/dentist-video-bg.webp'

export default function DentistVideo() {
  return (
    <div className="video-popup margin-top-negative-100 section-padding-bottom">
        <Container>
          <Row>
            <Col md="12">
              <div className="position-relative padding-200" style={{background: `url(${dentistVideoBg})`, backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}>
                <div className="background-overlay position-absolute h-100 w-100 opacity-50 bg-primary top-0 start-0"></div>
                <VideoPopup videoLinkUrl="https://www.youtube.com/watch?v=VeDdpy4CdeM"/>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
  )
}
