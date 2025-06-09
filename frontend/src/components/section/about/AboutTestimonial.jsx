import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination} from 'swiper/modules';
import 'swiper/swiper-bundle.css';

// Widgets
import Title from '../../widgets/Title';
import ScrollingText from '../../widgets/ScrollingText';
import TestimonialStandard from '../../widgets/TestimonialStandard';

// Json
import { tesimonialData } from '../../../staticData/testimonial';

// Redux Selector / Action
import { useSelector } from 'react-redux';
import { theme_scheme_direction } from '../../../store/setting/selectors';

export default function AboutTestimonial() {
  const themeSchemeDirection = useSelector(theme_scheme_direction);
  return (
    <div className="section-padding testimonial-section">
        <Container className="position-relative">
            <ScrollingText scrollTitle="Testimonails" />
            <Row className="align-items-center">
            <Col md="6" className="position-relative">
                <Title subTitle="testimonials" rightText="What Our " leftText="Patients Says" />
            </Col>
            <Col md="6" className="position-relative">
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
