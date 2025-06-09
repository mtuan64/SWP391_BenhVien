import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

// Images
import bannerBg from '/assets/images/product-home/banner-bg.jpg'

export default function ProductCardBanner() {
  return (
    <div>
        <Container>
          <div className="section-padding px-5 rtl-image-flip" style={{background: `url(${bannerBg})`, backgroundRepeat: `no-repeat`, backgroundPosition: `center center`, backgroundSize: `cover`}}>
            <div className="px-lg-5 rtl-image-flip-container">
              <Row>
                <Col lg="6">
                  <div className="iq-title-box mb-0">
                        <h2 className="iq-title iq-heading-title">
                            <span className="right-text text-capitalize fw-500">Shop & Shipment </span>
                            <span className="left-text text-capitalize fw-light">Across The Worldwide</span>
                        </h2>
                        <p className="iq-title-desc text-body mt-3 mb-0">
                            Enjoy 15% off on your first purchase
                        </p>
                    </div>
                </Col>
                <Col lg="6" className="d-lg-none d-none"></Col>
              </Row>
            </div>
          </div>
        </Container>
      </div>
  )
}
