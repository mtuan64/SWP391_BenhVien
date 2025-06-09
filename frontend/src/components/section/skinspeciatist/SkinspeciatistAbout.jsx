import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'

// sweiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination} from 'swiper/modules';
import 'swiper/swiper-bundle.css';

// Widgets
import Title from '../../widgets/Title'
import ScrollingText from '../../widgets/ScrollingText'
import ButtonBox from '../../widgets/ButtonBox'
import TitleboxSlider from '../../widgets/TitleboxSlider';

// Images
import aboutBanner from '/assets/images/skin-specialist/about-banner.webp'

// Redux Selector / Action
import { useSelector } from 'react-redux';
import { theme_scheme_direction } from '../../../store/setting/selectors';

export default function SkinspeciatistAbout() {
  const themeSchemeDirection = useSelector(theme_scheme_direction);
  const SliderBoxData = [
    {
      sliderTitleMain: "23",
      sliderDecs: "Good Experience in skin treatment"
    },
    {
      sliderTitleMain: "500",
      sliderDecs: "Good Experience in skin treatment"
    }
  ]
  return (
    <div className="section-about">
      <Container fluid className="p-0">
          <Row className="align-items-center gx-0">
            <Col lg="6" className="position-relative">
              <div className="about-banner">
                <Image src={aboutBanner} alt="banner" className="img-fluid" />
                <div className="banner-detail-slider position-absolute bg-white p-4 text-center d-none d-xl-block">
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
            <Col lg="4" className="ps-lg-5 position-relative">
              <div className="py-lg-0 px-lg-0 px-md-5 px-3 py-5">
                <ScrollingText scrollTitle="about us" />
                <Title subTitle="about kivicare" rightText="The world’s Best Skin Care " leftText="Treatment" titleDescription="It is a long established fact that a reader will be
            distracted by the readable content of a page when looking at its layout" />
                <Row className="w-100">
                  <Col md="6">
                    <ul className="iq-list-with-icon p-0 ">
                        <li className="d-flex align-items-center gap-2 mb-3">
                          <i className="fa fa-check text-primary" aria-hidden="true"></i>
                          <span>Treats minor illnesses</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 mb-3">
                          <i className="fa fa-check text-primary" aria-hidden="true"></i>
                          <span>Answers health questions</span>
                        </li>
                    </ul>
                  </Col>
                  <Col md="6">
                    <ul className="iq-list-with-icon p-0">
                        <li className="d-flex align-items-center gap-2 mb-3">
                          <i className="fa fa-check text-primary" aria-hidden="true"></i>
                          <span>Conducts health checkups</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 mb-3">
                          <i className="fa fa-check text-primary" aria-hidden="true"></i>
                          <span>Specialty physicians</span>
                        </li>
                    </ul>
                  </Col>
                </Row>
                <div className="mt-3">
                  <div className="button-primary">
                    <ButtonBox buttonText="Read More" buttonUrl="/about-us" />
                  </div>
              </div>
              </div>
            </Col>
            <Col lg="2"></Col>
          </Row>
      </Container>
    </div>
  )
}
