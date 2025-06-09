import React, { Fragment } from 'react'
import { Col, Container, Row, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination} from 'swiper/modules';
import 'swiper/swiper-bundle.css';

// Images
import shortLogo from '/assets/images/pages/short-logo.png'

// widget
import TeamOverdetail from '../components/widgets/TeamOverdetail';
import BreadCrumb from '../components/partial/BreadCrumb';

// json
import {teamData} from '../staticData/team'
import Progressbar from '../components/widgets/Progressbar';

// Redux Selector / Action
import { useSelector } from "react-redux";
import { theme_scheme_direction } from '../store/setting/selectors';

export default function DoctorDetails() {
  const themeSchemeDirection = useSelector(theme_scheme_direction);

  return (
    <Fragment>
      <BreadCrumb title="Doctor Details" />
      <div className="section-padding team-detail">
        <Container>
          <Row className="gy-4">
            <Col lg="4">
              <div className="team-member-info">
                {teamData.slice(0, 1).map((item, index) => (
                    <TeamOverdetail key={index} teamImage={item.teamImage} teamMemberName={item.teamMemberName} teamSpecialized={item.teamSpecialized} />
                  ))} 
              </div>
              <div className="mt-5 sidebar-widget-working-hour bg-secondary-subtle text-body p-3 p-md-5">
                  <div className="icon mb-4">
                      <i className="far fa-clock"></i>
                  </div>
                  <h4 className="mb-3 fw-500">Opening Time</h4>
                  <ul className="list-inline m-0">
                      <li className="mb-2 pb-2 border-bottom d-flex align-items-center justify-content-between">
                          <span>Monday - Friday</span>
                          <span>6:00 - 7:00 pm</span>
                      </li>
                      <li className="mb-2 pb-2 border-bottom d-flex align-items-center justify-content-between">
                          <span>Saturday</span>
                          <span>8:00 - 9:00 pm </span>
                      </li>
                      <li className="d-flex align-items-center justify-content-between">
                          <span>Sunday</span>
                          <span>Closed</span>
                      </li>
                  </ul>
              </div>
              <div className="mt-5 sidebar-widget-services bg-primary-subtle text-body p-3 p-md-5">
                <div className="image mb-5">
                    <Image src={shortLogo} className="img-fluid" alt="image" />
                </div>
                <h4 className="mb-3">KiviCare Services</h4>
                <ul className="list-inline m-0">
                    <li className="mb-2">
                        <span><b>Call : </b></span>
                        <span>+123456789</span>
                    </li>
                    <li className="mb-2">
                        <span><b>Mail : </b></span>
                        <span>support@example.com</span>
                    </li>
                    <li>
                        <span><b>Address : </b></span>
                        <span>1234 North Avenue Luke Lane, South Bend, IN 360001</span>
                    </li>
                </ul>
                <div className="sidebar-widget-social-list mt-5">
                  <ul className="list-inline m-0 p-0 d-flex align-items-center gap-3 flex-wrap">
                    <li>
                        <Link to="https://www.facebook.com/"
                            className="facebook-icon d-inline-block text-white text-center">
                            <i className="fab fa-facebook"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to="https://twitter.com/"
                            className="twitter-icon d-inline-block text-white text-center">
                            <i className="fab fa-twitter"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to="https://www.youtube.com/"
                            className="youtube-icon d-inline-block text-white text-center">
                            <i className="fab fa-youtube"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to="https://www.linkedin.com/"
                            className="linkedin-icon d-inline-block text-white text-center">
                            <i className="fab fa-linkedin"></i>
                        </Link>
                    </li>
                </ul>
                </div>
              </div>
            </Col>
            <Col lg="8">
              <div className="iq-title-box">
                  <h3 className="iq-title iq-heading-title mb-3">
                      <span className="right-text text-capitalize">General </span>
                      <span className="left-text text-capitalize fw-light">Surgeon</span>
                  </h3>
                  <p className="iq-title-desc text-body">
                      Dr. Mantooth has done Basic and Advanced training in Reproductive Medicine and IVF- Homerton
                      University hospital London UK. He is an active member of London Fertility Society and has helped
                      in conducting workshops in IFS conference.
                  </p>
              </div>
              <Row>
                <Col md="6">
                  <h5 className="fw-normal">Honors and Awards </h5>
                  <Row className="mt-5 g-3">
                    <Col sm="6" className="mt-0">
                      <div className="px-3 pt-2 pb-3 border">
                          <div className="text-primary">
                              <i aria-hidden="true" className="flaticon flaticon-flaticon flaticon-award"></i>
                          </div>
                          <h6 className="mt-1 mb-0">2020 World Health Organization Vaccine Research Award</h6>
                        </div>
                    </Col>
                    <Col sm="6" className="mt-4 mt-sm-0">
                      <div className="px-3 pt-2 pb-3 border">
                          <div className="text-primary">
                              <i aria-hidden="true" className="flaticon flaticon-flaticon flaticon-award"></i>
                          </div>
                          <h6 className="mt-1 mb-0">2016 Best Skincare Treatment Winning Trophy & Recognition</h6>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col md="6" className="mt-4 mt-sm-0">
                    <h5 className="fw-normal">Skillset</h5>
                    <div className="mt-5">
                      <Progressbar progressTitle="Technique" progressValue="70" />
                    </div>
                    <div className="mt-5">
                      <Progressbar progressTitle="Empathy" progressValue="80" />
                    </div>
                    <div className="mt-5">
                      <Progressbar progressTitle="Operation" progressValue="90" />
                    </div>
                </Col>
              </Row>
              <div className="mt-5 px-5 py-3 border">
                  <Row className="align-items-center">
                    <Col md="2">
                      <h5 className="m-0">Specialty</h5>
                    </Col>
                    <Col md="10" className="mt-md-0 mt-2">
                      <span className="text-primary"><i className="far fa-star"></i></span>
                      <span className="ms-1">Gynecologist</span>
                    </Col>
                  </Row>
              </div>
              <div className="mt-3 px-5 py-3 border">
                <div className="row align-items-center">
                    <div className="col-md-2">
                        <h5 className="m-0">Education</h5>
                    </div>
                    <div className="col-md-10 mt-md-0 mt-2">
                        <ul className="list-inline m-0">
                            <li className="mb-2">
                                <span className="text-primary"><i className="fas fa-check"></i></span>
                                <span className="ms-1">Embryology</span>
                            </li>
                            <li className="mb-2">
                                <span className="text-primary"><i className="fas fa-check"></i></span>
                                <span className="ms-1">Doctor of Medicine, University of texas, USA (1990)</span>
                            </li>
                            <li>
                                <span className="text-primary"><i className="fas fa-check"></i></span>
                                <span className="ms-1">Medical Orientation Program, St. Louis University (St. Louis,
                                    Missouri
                                    1996)</span>
                            </li>
                        </ul>
                    </div>
                </div>
              </div>
              <div className="mt-3 px-5 py-3 border">
                  <div className="row align-items-center">
                      <div className="col-md-2">
                          <h5 className="m-0">Experience</h5>
                      </div>
                      <div className="col-md-10 mt-md-0 mt-2">
                          <span className="text-primary"><i className="fas fa-file-alt"></i></span>
                          <span className="ms-1">15 Years of experience in medicine</span>
                      </div>
                  </div>
              </div>
              <div className="mt-5">
                  <div className="iq-title-box mb-0">
                      <span className="iq-subtitle">DOCTORS</span>
                      <h4 className="iq-title iq-heading-title mb-0">
                          <span className="right-text text-capitalize">Recommended </span>
                          <span className="left-text text-capitalize fw-light">Colleague Doctors</span>
                      </h4>
                  </div>
              </div>
              <div className="mt-4">
                <Swiper className="swiper-container"
                key={themeSchemeDirection}
                dir={themeSchemeDirection}
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                autoplay={{ delay: 3000 }}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  576: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1025: {
                    slidesPerView: 2,
                  },
                  1500: {
                    slidesPerView: 2,
                  }
                }}
            >
                {teamData.map((item, index) => (
                    <SwiperSlide key={index}>
                        <TeamOverdetail teamImage={item.teamImage} teamMemberName={item.teamMemberName} teamSpecialized={item.teamSpecialized} />
                    </SwiperSlide>
                ))}                        
            </Swiper>  
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  )
}
