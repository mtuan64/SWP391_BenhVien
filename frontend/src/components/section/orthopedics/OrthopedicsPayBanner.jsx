import React from 'react'
import {  Container, Row, Col, Image } from 'react-bootstrap';

// Images
import pattern1 from '/assets/images/orthopedics/pattern-1.webp'
import appstore123 from '/assets/images/pages/appstore-123.svg'
import googlePlayStore from '/assets/images/pages/google-play-store.svg'
import footerImg from '/assets/images/orthopedics/footer-img.webp'

export default function OrthopedicsPayBanner() {
  return (
    <div className="section-padding bg-secondary position-relative">
      <Image src={pattern1} alt="faq" className="img-fluid position-absolute d-none d-md-none d-lg-block start-0 top-0 rtl-image-flip" />
      <Container>
        <Row>
          <Col lg="7" md="9">
            <div className="iq-title-box">
              <span className="iq-subtitle text-uppercase text-primary">SPECIAL CARE</span>
              <h2 className="iq-title iq-heading-title text-white">
                  <span className="right-text text-capitalize fw-500">Looking For Full </span>
                  <span className="left-text text-capitalize fw-light">Package ?</span>
              </h2>
              <p className="iq-title-desc mt-3 mb-0 text-white">Children Undergo Rapid Physical And Mental Changes As They
                  Grow. We Understand This Fact & Assess A Child’s Health Status Based On The Normal Ranges For Their
                  Age.</p>
            </div>
            <Image src={appstore123} className="d-inline-block me-4" />
            <Image src={googlePlayStore} className="d-inline-block" />
          </Col>
          <Col lg="5" md="3">
            <Image src={footerImg} alt="faq" className="img-fluid position-absolute bottom-0 d-none d-lg-inline-block" />
          </Col>
        </Row>
      </Container>
    </div>
  )
}
