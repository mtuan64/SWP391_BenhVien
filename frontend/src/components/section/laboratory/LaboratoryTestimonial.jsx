import React from 'react'
import { Col, Container, Row, Form } from 'react-bootstrap';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

// Widgets
import Title from '../../widgets/Title';
import TestimonialStandardWithSeprator from '../../widgets/TestimonialStandardWithSeprator';
import ChoicesJs from '../../../components/widgets/Choices';

// Json
import { tesimonialData } from '../../../staticData/testimonial';

// Redux Selector / Action
import { useSelector } from "react-redux";
import { theme_scheme_direction } from "../../../store/setting/selectors";

export default function LaboratoryTestimonial() {
  const themeSchemeDirection = useSelector(theme_scheme_direction);
   // select
  const selectDoctors = [
    { value: "Select Doctor *", label: "Select Doctor *" },
    { value: "Gunner Peha", label: "Gunner Peha" },
    { value: "Lewis Scobee", label: "Lewis Scobee" },
    { value: "Damian Melcher", label: "Damian Melcher"}
  ];

  const selectDepartment = [
    { value: "Select Department *", label: "Select Department *" },
    { value: "India", label: "India" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "United States", label: "United States" },
    { value: "Australia", label: "Australia" },
    { value: "North Corea", label: "North Corea" }
  ];

  return (
    <div className="section-padding-top px-0 position-relative mb-md-0 mb-5">
        <Container fluid>
          <div className="section-padding px-0 bg-primary-subtle">
            <Container>
              <Row>
                <Col xl="5" lg="6">
                  <div className="testimonial-standard-with-seprator-wrapper position-relative overflow-hidden">
                    <Swiper className="swiper-container"
                      key={themeSchemeDirection}
                      dir={themeSchemeDirection}
                      modules={[Navigation, Pagination]}
                      spaceBetween={30}
                      slidesPerView={1}
                      pagination={{ clickable: true }}
                      autoplay={{ delay: 3000 }}
                    >
                      {tesimonialData.map((item, index) => (
                          <SwiperSlide key={index}>
                              <TestimonialStandardWithSeprator isTeastimonialicon={true} isRatting={true} quoteImage={item.quoteImageLaboratory} testimonialImage={item.testimonialImage} testimonialUser={item.testimonialUser} testimonialMeta={item.testimonialMeta} testimonialContent={item.testimonialContent} ratting={item.ratting} />
                          </SwiperSlide>
                      ))}                        
                    </Swiper>
                  </div>
                </Col>
                <Col xl="2" className="d-none d-xl-block"></Col>
                <Col xl="5" lg="6" className="mt-lg-0 mt-5">
                  <Title subTitle="Book Appointment" rightText="Book Your " leftText="Lab Test" />
                  <Row>
                    <Col lg="6">
                      <div className="custom-form-field mb-5">
                        <Form.Group className="mb-3">
                          <Form.Control className="bg-white" type="text" placeholder="Phone Number *" />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col lg="6">
                      <div className="custom-form-field mb-5">
                        <Form.Group className="mb-3">
                        <Form.Control className="bg-white" type="email" placeholder="Your Email *" />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col lg="6">
                      <div className="custom-form-field custom-choicejs mb-5">
                        <ChoicesJs options={selectDepartment} className="js-choice" select="one" />
                      </div>
                    </Col>
                    <Col lg="6">
                      <div className="custom-form-field custom-choicejs mb-5">
                        <ChoicesJs options={selectDoctors} className="js-choice" select="one" />
                      </div>
                    </Col>
                    <Col lg="6">
                      <div className="custom-form-field mb-5">
                        <Form.Group className="mb-3">
                        <Form.Control className="bg-white" type="date" />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col lg="6">
                      <div className="custom-form-field mb-5">
                        <Form.Group className="mb-3">
                        <Form.Control className="bg-white" type="time" />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col lg="12">
                      <div className="iq-btn-container">
                        <button className="iq-button text-capitalize border-0" type="submit">
                            <span className="iq-btn-text-holder position-relative">Book Now </span>{" "}
                            <span className="iq-btn-icon-holder">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"
                                    viewBox="0 0 8 8" fill="none">
                                    <path
                                        d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                        fill="currentColor"></path>
                                </svg>
                            </span>
                        </button>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </div>
        </Container>
    </div>
  )
}
