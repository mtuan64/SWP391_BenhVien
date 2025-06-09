import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination} from 'swiper/modules';
import 'swiper/swiper-bundle.css';

// Widgets
import VideoPopup from '../../widgets/VideoPopup'
import ScrollingText from '../../widgets/ScrollingText'
import Title from '../../widgets/Title'
import TitleboxSlider from '../../widgets/TitleboxSlider'
import ButtonBox from '../../widgets/ButtonBox';

// Images
import bg01 from '/assets/images/eye-care/01-bg.webp'

// Redux Selector / Action
import { useSelector } from 'react-redux';
import { theme_scheme_direction } from '../../../store/setting/selectors';

export default function EyecareAbout() {
  const themeSchemeDirection = useSelector(theme_scheme_direction);
  const SliderBoxData = [
    {
      sliderTitleMain: "300 +",
      sliderDecs: "Happy customers served"
    },
    {
      sliderTitleMain: "40 +",
      sliderDecs: "Years of top experience in eye"
    },
    {
      sliderTitleMain: "25 +",
      sliderDecs: "Talented inhouse Doctors"
    }
  ]
  return (
    <div className="iq-about-us bg-primary-subtle text-body">
        <Container fluid className="p-0">
          <Row>
            <Col lg="3"  style={{background: `url(${bg01})`, backgroundRepeat: `no-repeat`, backgroundSize: `cover`, minHeight:`500px`, position: `relative`}}>
              <VideoPopup videoLinkUrl="https://www.youtube.com/watch?v=VeDdpy4CdeM" />
            </Col>
            <Col lg="9">
              <div className="section-padding spacing-ls-rs">
                <div className="position-relative">
                  <ScrollingText scrollTitle="About us" />
                </div>
                <Title subTitle="ABOUT OUR CLINIC" rightText="We're A Chain Of Eye " leftText="Care Hospitals" />
                <h5 className="iq-title iq-heading-title mb-2">YOUR VISION IS OUR VISION</h5>
                <p className="iq-title-desc mb-5">It is a long established fact that a reader will be
                    distracted by the
                    readable content of a page when looking at its layout. 
                </p>
                <Row>
                  <Col md="6" xl="4" xxl="3">
                    <ul className="iq-list-with-icon p-0 ">
                        <li className="d-flex align-items-center gap-2 mb-3">
                          <i className="fa fa-check text-primary" aria-hidden="true"></i>
                          <span>Treats minor illnesses</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 mb-3">
                          <i className="fa fa-check text-primary" aria-hidden="true"></i>
                          <span>Answers health questions</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 mb-3">
                          <i className="fa fa-check text-primary" aria-hidden="true"></i>
                          <span>Conducts health checkups</span>
                        </li>
                    </ul>
                  </Col>
                  <Col md="6" xl="4" xxl="3">
                    <ul className="iq-list-with-icon p-0">
                        <li className="d-flex align-items-center gap-2 mb-3">
                          <i className="fa fa-check text-primary" aria-hidden="true"></i>
                          <span>Specialty physicians</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 mb-3">
                          <i className="fa fa-check text-primary" aria-hidden="true"></i>
                          <span>Performs routine health tests</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 mb-3">
                          <i className="fa fa-check text-primary" aria-hidden="true"></i>
                          <span>Best lasik treatment</span>
                        </li>
                    </ul>
                  </Col>
                  <Col xxl="3" className="d-xxl-block d-none"></Col>
                  <Col xl="4" xxl="3" className="pe-xxl-5">
                    <div className="overflow-hidden">
                      <div className="position-relative title-box-slider bg-primary p-4 d-none d-xl-block">
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
                  </Col>
                  <Col lg="12">
                    <div className="button-primary">
                      <ButtonBox buttonUrl="/appointment" buttonText="Get Appointment" />
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
