import React from 'react'
import { Col, Row, Container } from 'react-bootstrap';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

// Widgets
import Title from '../../widgets/Title';
import ScrollingText from '../../widgets/ScrollingText';
import ButtonBox from '../../widgets/ButtonBox';
import TitleboxSlider from '../../widgets/TitleboxSlider';
import VideoPopup from '../../widgets/VideoPopup';

// Images
import aboutUs from '/assets/images/paediatrician/about-us.webp';

// Redux Selector / Action
import { useSelector } from "react-redux";
import { theme_scheme_direction } from "../../../store/setting/selectors";

export default function PaediatricianAbout() {
  const themeSchemeDirection = useSelector(theme_scheme_direction);
  const aboutListData = [
    {
      listTitle: "Lorem ipsum dolor sit amet consectetur adipiscing"
    },
    {
      listTitle: "Pellentesque nec neque eu lorem efficitur posuere ac eu"
    },
    {
      listTitle: "Duis finibus lectus eget tortor ultrices, et aliquet nisi"
    }
  ]

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
          <Col lg="3" style={{ background: `url(${aboutUs})`, backgroundRepeat: `no-repeat`, backgroundPosition: `top right`,backgroundSize: 'cover' ,  position: `relative`, minHeight:`500px` }}>
            <VideoPopup videoLinkUrl="https://www.youtube.com/watch?v=VeDdpy4CdeM" />
          </Col>
          <Col lg="9">
            <div className="section-padding spacing-ls-rs">
              <div className="position-relative">
                <ScrollingText scrollTitle="About us" />
              </div>
              <Title subTitle="about our clinic" rightText="We're A Chain Of a " leftText="Child Specialist" />
              <h5 className="iq-title iq-heading-title mb-2 text-primary fw-500">Care For Child That Goes Beyond The Next Level</h5>
              <p className="iq-title-desc mb-5">All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks
                as necessary, making this the first true generator on the Internet.</p>
              <Row>
                <Col xl="6">
                  <ul className="iq-list-with-icon pb-lg-4 pb-0 mb-5 ps-0">
                    {aboutListData.map((item, index) => (
                      <li className="d-flex align-items-center gap-2 mb-3" key={index}>
                        <span className="text-secondary">
                          <svg className="icon-24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 21.2498C17.108 21.2498 21.25 17.1088 21.25 11.9998C21.25 6.89176 17.108 2.74976 12 2.74976C6.892 2.74976 2.75 6.89176 2.75 11.9998C2.75 17.1088 6.892 21.2498 12 21.2498Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M10.5576 15.4709L14.0436 11.9999L10.5576 8.52895" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        </span>
                        <span className="text-body">{item.listTitle}</span>
                      </li>
                    ))}
                  </ul>
                  <ButtonBox buttonUrl="/appointment" buttonText="get appointment" />
                </Col>
                <Col xl="3"></Col>
                <Col xl="3" className="pe-xl-5">
                  <div className="overflow-hidden">
                    <div className="position-relative title-box-slider bg-secondary p-4 d-none d-xl-block">
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
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
