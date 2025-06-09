import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

// sweiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination} from 'swiper/modules';
import 'swiper/swiper-bundle.css';

// Widgets
import Title from '../../widgets/Title'
import ScrollingText from '../../widgets/ScrollingText'
import TestimonialStandard from '../../widgets/TestimonialStandard'

// Json
import { tesimonialData } from '../../../staticData/testimonial'

// Redux Selector / Action
import { useSelector } from 'react-redux';
import { theme_scheme_direction } from '../../../store/setting/selectors';

export default function SkinspeciatistTestiminial() {
  const themeSchemeDirection = useSelector(theme_scheme_direction);
  return (
    <div className="section-padding bg-primary-subtle testimonial-section">
        <Container className="position-relative">
            <ScrollingText scrollTitle="Testimonial" />
            <Row className="align-items-center">
                <Col lg="5" >
                  <Title subTitle="KiviCare Testimonial" rightText="What Our Patients Say" leftText=" about our Treatment" />
                </Col>
                <Col lg="1"></Col>
                <Col lg="6" className="position-relative">
                <Swiper className="swiper-container cust-globelteam-swiper"
                      key={themeSchemeDirection}
                      dir={themeSchemeDirection}
                      modules={[Navigation, Pagination]}
                      spaceBetween={30}
                      slidesPerView={1}
                      navigation={{
                        clickable: true,
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                      }}
                      autoplay={{ delay: 3000 }}
                  >
                      {tesimonialData.map((item, index) => (
                          <SwiperSlide key={index}>
                              <TestimonialStandard testimonialImage={item.testimonialImage} testimonialUser={item.testimonialUser} testimonialMeta={item.testimonialMeta} testimonialContent={item.testimonialContent} />
                          </SwiperSlide>
                      ))}   
                      <div className="arrow-joint">
                          <div className="swiper-button-next"></div>
                          <div className="swiper-button-prev"></div>  
                      </div>                     
                  </Swiper>
                </Col>
            </Row>
        </Container>
    </div>
  )
}
