import React from 'react'
import { Col, Container, Row, Image } from 'react-bootstrap'

// sweiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination} from 'swiper/modules';
import 'swiper/swiper-bundle.css';

// Widgets
import Title from '../../widgets/Title'
import ScrollingText from '../../widgets/ScrollingText'
import TitleboxSlider from '../../widgets/TitleboxSlider';
import ButtonBox from '../../widgets/ButtonBox';

// Images
import about from '/assets/images/fertility-clinic/about.webp'
import signature from '/assets/images/general/signature.png'

// Redux Selector / Action
import { useSelector } from 'react-redux';
import { theme_scheme_direction } from '../../../store/setting/selectors';

export default function FertilityAbout() {
  const themeSchemeDirection = useSelector(theme_scheme_direction);
  const SliderBoxData = [
    {
      sliderTitleMain: "10 Years",
      sliderDecs: "Trust & Compassion"
    },
    {
      sliderTitleMain: "700 Patients",
      sliderDecs: "Trust & Compassion"
    },
    {
      sliderTitleMain: "23 Years",
      sliderDecs: "Trust & Compassion"
    }
  ]
  return (
    <div className="section-padding-top">
        <Container fluid className="position-relative ps-lg-0 px-3">
            <Row>
                <Col lg="6" className="ps-lg-0 position-relative">
                  <div className="about-banner">
                      <div className="pe-xl-5 me-xl-5">
                        <Image src={about} alt="" className="img-fluid w-100 pe-xl-5 me-xl-5" />
                      </div>
                      <div className="banner-detail-slider position-absolute bg-primary p-4 text-center box-shadow d-none d-xl-block">
                        <div className="overflow-hidden">
                          <Swiper className="swiper-container"
                                key={themeSchemeDirection}
                                dir={themeSchemeDirection}                    
                                modules={[Navigation, Pagination]}
                                spaceBetween={30}
                                slidesPerView={1}
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 3000 }}
                          >
                              {SliderBoxData.map((item, index) => (
                                  <SwiperSlide key={index}>
                                      <TitleboxSlider sliderTitleMain={item.sliderTitleMain} sliderDecs={item.sliderDecs} />
                                  </SwiperSlide>
                              ))}                        
                          </Swiper>
                        </div>
                      </div>
                  </div>
                </Col>
                <Col lg="6" className="ps-lg-5 mt-lg-0 mt-5 position-relative">
                  <ScrollingText scrollTitle="about us" />
                  <Title subTitle="about KiviCare" rightText="Welcome to The Most Advanced and" leftText=" Trusted Parenthood Clinic" titleDescription="KiviCare offers the
          best scientifically proven ways by enhancing and celebrating your parenthood journey."/>
                  <Row>
                    <Col sm="6">
                      <ul className="iq-list-with-icon p-0">
                        <li className="d-flex align-items-center gap-2 mb-3">
                            <i className="fa fa-check text-primary" aria-hidden="true"></i><span>Treats minor illnesses</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 mb-3">
                            <i className="fa fa-check text-primary" aria-hidden="true"></i><span>Answers health questions</span>
                        </li>
                      </ul>
                    </Col>
                    <Col sm="6">
                      <ul className="iq-list-with-icon p-0">
                        <li className="d-flex align-items-center gap-2 mb-3">
                            <i className="fa fa-check text-primary" aria-hidden="true"></i><span>Conducts health checkups</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 mb-3">
                            <i className="fa fa-check text-primary" aria-hidden="true"></i><span>Specialty physicians</span>
                        </li>
                      </ul>
                    </Col>
                    <Col sm="6" className="mt-5">
                      <div className="button-primary">
                        <ButtonBox buttonText="Read More" buttonUrl="/about-us" />
                      </div>
                    </Col>
                    <Col sm="6" className="mt-5">
                        <Image src={signature} alt="" className="img-fluid " />
                    </Col>
                    <Col sm="12">
                      <h4 className="iq-title iq-heading-title pt-5 my-3">
                            <span className="right-text text-capitalize">Fertility Center</span>
                      </h4>
                      <ul className="iq-list-with-icon p-0 mb-0">
                        <li className="d-flex align-items-center gap-2 mb-3">
                            <i aria-hidden="true" className="fas fa-address-card text-primary"></i><span>1234 North
                            Avenue Luke Lane,
                            South Bend, IN 360001</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 mb-3">
                            <i className="fas fa-map-marker-alt text-primary"></i><span>View Location</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 mb-0 mb-md-3">
                            <i className="fas fa-phone-alt text-primary"></i><span>+0123456789</span>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </Col>
            </Row>
        </Container>
    </div>
  )
}
