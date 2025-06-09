import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination} from 'swiper/modules';
import 'swiper/swiper-bundle.css';

// Widgets
import TestimonialStandard from '../../widgets/TestimonialStandard';

// Json
import {tesimonialData} from '../../../staticData/testimonial'

// Images
import cardiacPopup from '/assets/images/cardiac/cardiac-popup.webp'

// Redux Selector / Action
import { useSelector } from 'react-redux';
import { theme_scheme_direction } from '../../../store/setting/selectors';

export default function CardiacTestimonial() {
  const themeSchemeDirection = useSelector(theme_scheme_direction);
  return (
    <div className="position-relative section-padding rtl-image-flip" style={{background: `url(${cardiacPopup})`, backgroundRepeat: `no-repeat`, backgroundSize: `cover`, backgroundPosition: `right center`}}>
        <Container fluid className="rtl-image-flip-container">
            <Row>
                <Col md="6" className="d-md-block d-none">                      
                </Col>
                <Col md="6" className="position-relative">
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
                              slidesPerView: 1,
                            },
                            768: {
                              slidesPerView: 1,
                            },
                            1025: {
                              slidesPerView: 1,
                            },
                            1500: {
                              slidesPerView: 1,
                            }
                          }}
                    >
                        {tesimonialData.map((item, index) => (
                            <SwiperSlide key={index}>
                                <TestimonialStandard isAuthorImageHide={true} isTeastimonialicon={true} isRatting={true} testimonialImage={item.testimonialImage} testimonialUser={item.testimonialUser} testimonialMeta={item.testimonialMeta} testimonialContent={item.testimonialContent} quoteImage={item.quoteImageCardiac} ratting={item.ratting} />
                            </SwiperSlide>
                        ))}                        
                    </Swiper>
                </Col>
            </Row>
        </Container>
    </div>
  )
}
