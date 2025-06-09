import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

// Widgets
import Title from '../../widgets/Title'
import ButtonBox from '../../widgets/ButtonBox'
import ScrollingText from '../../widgets/ScrollingText'

// Images
import eye02 from '/assets/images/eye-care/eye-02.webp'

export default function EyecareBanner() {
  return (
    <div className="eyecare-banner  pb-5 eyes-carebg-right">
      <Container fluid>
        <Row>
          <Col lg="4">
            <div className="section-padding pe-0 ps-0">
              <div className="no-sub-title big-font">
                  <Title rightText="Eye Care Services That You " leftText="Can Trust" titleDescription="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout." />
              </div>
              <div className="button-primary">
                  <ButtonBox buttonUrl="/appointment" buttonText="Get Appoinement" />
              </div>
            </div>
          </Col>
          <Col lg="1"></Col>
          <Col lg="7" className="position-relative eye-care-title">
            <ScrollingText scrollTitle="eye" />
            <img src={eye02} alt="img" className="img-fluid position-relative mt-lg-5 pt-5 rtl-image-flip" />
          </Col>
        </Row>
      </Container>
    </div>
  )
}
