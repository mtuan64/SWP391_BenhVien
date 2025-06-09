import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap';

// Widgets
import Title from '../../widgets/Title';
import ButtonBox from '../../widgets/ButtonBox';

// Images
import banner1 from '/assets/images/psychiatrist/banner-1.webp'
import drKokko from '/assets/images/psychiatrist/dr-kokko.webp'
import banner2 from '/assets/images/psychiatrist/banner-2.webp'

export default function PsychiatristBanner() {
  return (
    <div className="section-padding bg-secondary-subtle px-0">
      <Container fluid>
        <Row className="align-items-center">
          <Col lg="5">
            <div className="mb-0 pb-5 mb-lg-5 d-flex flex-wrap gap-xl-4 gap-3">
              <button type="button" className="btn btn-outline-dark rounded-pill text-uppercase px-3 py-2 fw-500">Therapy</button>
              <button type="button" className="btn btn-outline-dark rounded-pill text-uppercase px-3 py-2 fw-500">tutorial</button>
              <button type="button" className="btn btn-outline-dark rounded-pill text-uppercase px-3 py-2 fw-500">tips & tricks</button>
            </div>
            <div className="no-sub-title big-font mb-5 pb-0 pb-lg-3">
              <Title rightText="Healthy Mind Is The Greatest" leftText=" Treasure To Find" titleDescription="Over a long period of work we have provided 1000’s of clients a better life and helped
          to overcome mental illness." />
              <ButtonBox buttonText="Read More" buttonUrl="/about-us" />
            </div>
          </Col>
          <Col lg="7">
            <Row className="align-items-start position-relative mt-5 mt-lg-0">
              <Col md="6">
                <Image src={banner1} alt="banner-1" className="img-w-100 img-fluid" />
                <Image src={drKokko} alt="dr-kokko" className=" bottom-0 position-absolute psychiatrist-banner-img d-none d-lg-inline-block" />
              </Col>
              <Col md="6">
                <Image src={banner2} alt="banner-1" className="img-w-100 img-fluid" />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
