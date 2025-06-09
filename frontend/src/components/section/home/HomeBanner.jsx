import React, { Fragment } from 'react'
import { Col, Container, Row, Image } from 'react-bootstrap'

// Widget
import ButtonBox from '../../widgets/ButtonBox'

// Images
import doctor from '/assets/images/general/doctor.png'
import signature from '/assets/images/general/signature.png'

export default function HomeBanner() {
  return (
    <Fragment>
      <div className="banner-one-app">
          <Container fluid>
              <Row>
                  <Col lg="3" md="12" className="banner-one-img">
                      <div className="d-flex justify-content-center flex-column h-100 text-lg-start text-center">
                          <div className="hide-sub-title-line">
                              <div className="iq-title-box mb-5">
                                  <span className="iq-subtitle text-uppercase position-relative text-secondary">Top Doctors</span>
                                  <h2>
                                      <span className="right-text text-capitalize fw-500">Make Your </span>
                                      <span className="left-text text-capitalize fw-light">Life Healthy</span>
                                  </h2>
                              </div>
                          </div>
                          <ButtonBox buttonUrl="/about-us" buttonText="Read More" />
                      </div>
                  </Col>
                  <Col lg="6" md="6" className="mt-lg-0 mt-5">
                      <div className="position-relative">
                          <Image src={doctor} alt="banner-img" className="img-fluid position-relative banner-img rtl-image-flip" />
                          <div className="scrolling-text position-absolute top-50">
                              <div className="iq-title text-uppercase">kivicare</div>
                          </div>
                      </div>
                  </Col>
                  <Col lg="3" md="6" className="mt-lg-0 mt-5">
                      <div className="d-flex justify-content-between flex-column h-100">
                          <div className="hide-sub-title-line">
                              <div className="iq-title-box text-md-end text-center mb-3">
                                  <span className="iq-subtitle text-uppercase position-relative text-primary">Our Moto</span>
                                  <h2 className="text-uppercase text-secondary">Great Health </h2>
                              </div>
                          </div>
                          <div>
                              <div className="iq-title-box iq-title-box-1 text-md-end text-center mb-3">
                                  <h5 className="text-uppercase letter-spacing-2">specialisation in </h5>
                              </div>
                              <ul className="list-inline m-0 p-0 text-md-end text-center">
                                  <li className="mb-2 fw-500 text-captlize letter-spacing-1">Cardiologist:</li>
                                  <li className="mb-2 fw-500 text-captlize letter-spacing-1">Audiologist:</li>
                                  <li className="fw-500 text-captlize letter-spacing-1">Internists:</li>
                              </ul>
                          </div>
                          <div className="text-end mt-5">
                              <div className="iq-title-box iq-title-box-1 mb-0 text-md-end text-center">
                                  <span className="iq-subtitle text-uppercase text-secondary">Medical info</span>
                                  <h5 className="iq-title iq-heading-title text-uppercase text-primary mt-2 mb-3 letter-spacing-2">Dr.
                                      K.f. Brandina </h5>
                                  <Image src={signature} alt="" className="img-fluid" />
                              </div>
                          </div>
                      </div>
                  </Col> 
              </Row>
          </Container>
      </div>
    </Fragment>
  )
}
