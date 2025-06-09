import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination} from 'swiper/modules';

// Widget
import Title from '../../widgets/Title'
import ScrollingText from '../../widgets/ScrollingText'
import TestimonialStandard from '../../widgets/TestimonialStandard';
import CounterWithIcon from '../../widgets/CounterWithIcon';

// Json
import {tesimonialData} from '../../../staticData/testimonial'

// Redux Selector / Action
import { useSelector } from "react-redux";
import { theme_scheme_direction } from "../../../store/setting/selectors";

export default function GlobalTestiminialCounter() {
  const themeSchemeDirection = useSelector(theme_scheme_direction);
  const counterData = [
    {
        counterIcon: <i aria-hidden="true" className="flaticon flaticon-flaticon flaticon-manager"></i>,
        counterValue: 2050,
        counterText: "Satisfied Patient's"
    },
    {
        counterIcon: <i aria-hidden='true' className='flaticon flaticon-flaticon flaticon-packaging'></i>,
        counterValue: 15,
        counterText: "Health Sections"
    },
    {
        counterIcon: <i aria-hidden='true' className='flaticon flaticon-flaticon flaticon-care'></i>,
        counterValue: 45,
        counterText: "Awards Won"
    }
  ]
  return (
    <div className="bg-secondary-subtle section-padding testimonial-section">
        <Container className="position-relative">
            <ScrollingText scrollTitle="Testimonails" />
            <Title subTitle="testimonial" rightText="What Our Patients " leftText="Says" />
            <Row>
                <Col lg="6" md="6" className="position-relative">
                    <Swiper className="swiper-container"
                    key={themeSchemeDirection}
                    dir={themeSchemeDirection}
                        modules={[Navigation, Pagination]}
                        spaceBetween={30}
                        navigation={{
                            clickable: true,
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        autoplay={{ delay: 3000 }}
                        speed={2000}
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
                                <TestimonialStandard testimonialImage={item.testimonialImage} testimonialUser={item.testimonialUser} testimonialMeta={item.testimonialMeta} testimonialContent={item.testimonialContent} />
                            </SwiperSlide>
                        ))}  
                        <div className="arrow-joint">
                            <div className="swiper-button-next"></div>
                            <div className="swiper-button-prev"></div>  
                        </div>
                                            
                    </Swiper>
                </Col>
                <Col lg="2" className="d-lg-block d-none">
                    
                </Col>
                <Col lg="4" md="6" className="mt-5 mt-md-0">
                    <div className="bg-secondary text-white p-3 p-md-5 counter-box-bottom">
                        <ul className="list-inline m-0">
                            {counterData.map((item, index) => (
                                <li className={`${index !== counterData.length - 1 ? "mb-5" : "mb-0"}`} key={index}>
                                    <CounterWithIcon counterIcon={item.counterIcon} counterValue={item.counterValue} counterText={item.counterText} />
                                </li>
                            ))}                                    
                        </ul>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
  )
}
