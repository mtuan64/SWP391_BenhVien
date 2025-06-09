import React from 'react'
import { Col, Container, Row, Image } from 'react-bootstrap';

// Widgets
import Title from '../../widgets/Title';
import ButtonBox from '../../widgets/ButtonBox';
import CounterStandard from '../../widgets/CounterStandard';

// Images
import laboratoryBanner from '/assets/images/laboratory/laboratory-banner.webp'

export default function LaboratoryBanner() {
  return (
    <div className="bg-primary-subtle position-relative laboratory-banner">
      <div className="py-5 bg-secondary position-absolute end-0 top-0 w-50 d-lg-block d-none">
        <div className="py-5">
            <div className="py-4"></div>
        </div>
      </div>
      <div className="position-absolute end-0 top-0 h-100 d-lg-block d-none">
        <div className="px-5 bg-secondary h-50">
            <div className="px-5">
                <div className="px-4"></div>
            </div>
        </div>
        <div className="position-absolute start-50 top-50 mt-5 translate-middle-x d-xxl-block d-none">
          <ul className="list-inline m-0">
              <li className="mb-4">
                  <a href="https://www.facebook.com/" className="d-inline-block text-center text-body" target="_blank">
                      <i className="fab fa-facebook-f"></i>
                  </a>
              </li>
              <li className="mb-4">
                  <a href="https://twitter.com/" className="d-inline-block text-center text-body" target="_blank">
                      <i className="fab fa-twitter"></i>
                  </a>
              </li>
              <li className="mb-4">
                  <a href="https://in.pinterest.com/" className="d-inline-block text-center text-body" target="_blank">
                      <i className="fab fa-pinterest"></i>
                  </a>
              </li>
              <li>
                  <a href="https://www.linkedin.com/" className="d-inline-block text-center text-body" target="_blank">
                      <i className="fab fa-linkedin-in"></i>
                  </a>
              </li>
          </ul>
        </div>
      </div>
      <Container fluid>
        <Row className="align-items-center">
          <Col xxl="6" lg="6">
            <div className="pt-5 pb-lg-5 pb-0 mb-lg-0 mb-md-n5">
              <Row>
                <Col xxl="9">
                  <div className="no-sub-title big-font">
                    <Title rightText="Uncovering Power Of Research For " leftText=" New Creativity" titleDescription="State of the art Laboratory Services, Accurate Results Guaranteed. Trust our laboratory for all your Testing Needs." />
                  </div>
                  <div className="pt-xl-5">
                    <ButtonBox buttonText="Research More" buttonUrl="/about-us" />
                  </div>
                </Col>
                <Col xxl="3" className="d-xxl-block d-none"></Col>
              </Row>
            </div>
          </Col>
          <Col xxl="6" lg="6">
            <div className="section-padding px-0">
              <Row>
                <Col lg="1" className="d-lg-block d-none"></Col>
                <Col lg="11" className="ps-md-5">
                  <div className="position-relative">
                    <div className="text-center mt-xl-n5 mt-xl-3">
                        <Image src={laboratoryBanner} alt="banner-image" className="img-fluid position-relative" />
                    </div>
                    <div className="py-4 px-5 bg-primary position-absolute top-50 start-0 d-md-block d-none">
                        <CounterStandard counterValue="30+" counterTitle="Research Center" />
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
