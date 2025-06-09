import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// image
import labWhatWeDo from '/assets/images/laboratory/lab-what-we-do.webp'

export default function LaboratoryWhatDo() {
  return (
    <div className="section-padding bg-secondary">
        <Container>
          <Row className="align-items-center">
            <Col lg="6">
              <div className="iq-title-box">
                <span className="iq-subtitle text-uppercase text-white">What We Do</span>
                <h2 className="iq-title iq-heading-title text-white">
                    <span className="right-text text-capitalize fw-500">Changing The Way Of Your Testing </span>
                    <span className="left-text text-capitalize fw-light">And Research</span>
                </h2>
                <p className ="iq-title-desc text-white mt-3 mb-0">
                KiviCare is a healthcare platform that provides virtual medical consultations and manages health
                    records. Testing ensures seamless user experience and data security.
                </p>
              </div>
              <div className="iq-list mt-5">
                  <ul className="iq-list-with-icon list-inline mb-0">
                      <li className="d-flex align-items-center gap-2 mb-4">
                          <span className="counter-numbers text-white flex-shrink-0">1</span>
                          <span className="text-capitalize text-white">Always Accurate To Our Research And Testing In Laboratory.</span>
                      </li>
                      <li className="d-flex align-items-center gap-2 mb-4">
                          <span className="counter-numbers text-white flex-shrink-0">2</span>
                          <span className="text-capitalize text-white">Evaluating Consistency And Reliability Of Laboratory Results.</span>
                      </li>
                      <li className="d-flex align-items-center gap-2">
                          <span className="counter-numbers text-white flex-shrink-0">3</span>
                          <span className="text-capitalize text-white">Precision To Testing And Focus On Medical Checkup.</span>
                      </li>
                  </ul>
              </div>
              <div className="pt-lg-5 mt-5 button-primary">
                <div className="iq-btn-container">
                    <Link className="iq-button text-capitalize bg-transparent border border-primary"
                        to="/about-us">
                        <span className="iq-btn-text-holder position-relative">Read More</span>{" "}
                        <span className="iq-btn-icon-holder">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 8 8"
                                fill="none">
                                <path
                                    d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                    fill="currentColor"></path>
                            </svg>
                        </span>
                    </Link>
                  </div>
              </div>
            </Col>
            <Col lg="6" className="mt-lg-0 mt-5">
              <Image src={labWhatWeDo} alt="what-we-do" className="img-fluid w-100" />
            </Col>
          </Row>
        </Container>
    </div>
  )
}
