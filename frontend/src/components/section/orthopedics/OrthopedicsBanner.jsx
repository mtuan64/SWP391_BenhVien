import React from 'react'
import { Col, Container, Row, Image } from 'react-bootstrap';

// widgets
import Title from '../../widgets/Title';
import ScrollingText from '../../widgets/ScrollingText';
import ButtonBox from '../../widgets/ButtonBox';

// Images
import pattern5 from '/assets/images/orthopedics/pattern-5.webp'
import pattern6 from '/assets/images/orthopedics/pattern-6.webp'
import banner from '/assets/images/orthopedics/banner.webp'

export default function OrthopedicsBanner() {
  return (
    <div className="banner-orthopedics py-5 position-relative overflow-hidden">
      <Image src={pattern5} alt="pattern" className="img-fluid position-absolute d-none d-lg-block start-0 top-0 rtl-image-flip" />
      <Image src={pattern6} alt="pattern" className="img-fluid position-absolute d-none d-lg-block end-50 bottom-0 rtl-image-flip" />
      <Container fluid className="position-relative py-5">
          <Row className="align-items-center">
            <Col lg="5">
              <div className="iq-title-box">
                <div className="no-sub-title big-font">
                    <Title rightText="Let Our Years Of Expertise Help To Get " leftText="Back On Track" titleDescription="Over a long period of work we have provided 1000’s of clients a better life and helped to overcome mental illness" />
                </div>
              </div>
              <div className="padding-top-60">
                <ButtonBox buttonText="read more" buttonUrl="/about-us" />
              </div>
            </Col>
            <Col lg="1"></Col>
            <Col lg="4" className="d-none d-md-none d-lg-block">
              <Image src={banner} alt="service-img" className="img-fluid w-100" />
            </Col>
            <Col lg="2">
              <div className="orth-scrolling-text d-none d-md-none d-lg-block">
                <ScrollingText scrollTitle="orthopedic" />
              </div>
            </Col>
          </Row>
          <div className="opening-time p-4 bg-white position-absolute top-50">
              <h5 className="mb-3 mb-md-5">Opening Time</h5>
              <ul className="list-inline mb-4">
                  <li className="mb-3 d-flex align-items-center justify-content-between gap-2 text-dark">
                    <span>Monday - Friday</span>
                    <span>6:00 - 7:00 pm</span>
                  </li>
                  <li className="mb-3 d-flex align-items-center justify-content-between gap-2 text-dark">
                    <span>Saturday</span>
                    <span>8:00 - 2:00 pm </span>
                  </li>
                  <li className="d-flex align-items-center justify-content-between gap-2 text-dark">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </li>
              </ul>
              <ButtonBox buttonText="appointment" buttonUrl="/appointment" />
          </div>
      </Container>
    </div>
  )
}
