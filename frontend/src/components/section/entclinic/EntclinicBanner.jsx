import React from 'react'
import { Card, Col, Container, Row, Image } from 'react-bootstrap';

// Widgets
import Title from '../../widgets/Title';
import ButtonBox from '../../widgets/ButtonBox';
import VideoPopup from '../../widgets/VideoPopup';

// Images
import EntClinicBannerImage from '/assets/images/ent-clinic/ent-clinic-banner.webp'
import entText from '/assets/images/ent-clinic/ent-text.webp'
import cardImage from '/assets/images/ent-clinic/card-image.webp'

export default function EntClinicBanner() {
  return (
    <div className="ent-clinic-banner bg-primary-subtle px-0 position-relative rtl-image-flip" style={{ background: `url(${EntClinicBannerImage})`, backgroundPosition: 'bottom center', backgroundRepeat: `no-repeat`, minHeight:`500px`, position: `relative`}}>
      <Container fluid className="position-relative rtl-image-flip-container">
        <div className="position-absolute top-0 start-0 d-lg-block d-none">
          <Image src={entText} alt="ent-text" />
        </div>
        <Row className="align-items-center position-relative">
          <Col lg="7" md="6">
            <div className="big-font hide-sub-title-line">
              <Title subTitle="WELCOME TO KIVICARE" rightText="YOUR HEALTH " leftText="OUR FIRST PRIORITY" />
            </div>
            <ButtonBox buttonText="Read More" buttonUrl="/about-us" />
          </Col>
          <Col lg="5" md="6" className="text-right d-flex justify-content-end mt-5 mt-lg-0 mt-md-0">
            <Card className="banner-info-details rounded-0 mb-0">
              <Card.Body className="p-3 p-md-5">
                <div className="mb-5" style={{background: `url(${cardImage})`, backgroundRepeat: `no-repeat`, backgroundSize: `cover`, position: `relative`, padding:`120px 0`}}>
                    <VideoPopup videoLinkUrl="https://www.youtube.com/watch?v=y0dvnkLc1QI" />
                </div>
                <h4 className="pb-3">Opening Time</h4>
                <ul className="list-inline mb-5">
                    <li className="pb-3 d-flex align-items-center justify-content-between">
                      <span className="text-body">Monday - Friday</span>
                      <span className="text-secondary">6:00 - 7:00 PM</span>
                    </li>
                    <li className="pb-3 d-flex align-items-center justify-content-between">
                      <span className="text-body">Saturday</span>
                      <span className="text-secondary">9:00 - 8:00 PM </span>
                    </li>
                    <li className="d-flex align-items-center justify-content-between">
                      <span className="text-body">Sunday</span>
                      <span className="text-secondary">Closed</span>
                    </li>
                </ul>
                <ButtonBox buttonText="Appointment now" buttonUrl="/appointment" />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
