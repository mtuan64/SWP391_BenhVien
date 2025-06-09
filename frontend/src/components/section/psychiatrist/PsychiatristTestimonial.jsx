import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap';

// sweiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Pagination} from 'swiper/modules';
import 'swiper/swiper-bundle.css';

// Widgets
import TestimonialStandard from '../../widgets/TestimonialStandard';

// Images
import testimonial from '/assets/images/psychiatrist/testimonial.png'

// Json
import { tesimonialData } from '../../../staticData/testimonial'

// Redux Selector / Action
import { useSelector } from "react-redux";
import { theme_scheme_direction } from "../../../store/setting/selectors";

export default function PsychiatristTestimonial() {
  const themeSchemeDirection = useSelector(theme_scheme_direction);
  return (
    <div className="bg-secondary-subtle py-4 py-lg-0">
        <Container>
          <Row className="align-items-center">
              <Col lg="5">
                <Image src={testimonial} alt="testimonial-img" className="d-none d-lg-inline-block" />
              </Col>
              <Col lg="7">
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
                            <TestimonialStandard isAuthorImageHide={true} isTeastimonialicon={true} isRatting={true} quoteImage={item.quoteImagePsychiatrist} testimonialImage={item.testimonialImage} testimonialUser={item.testimonialUser} testimonialMeta={item.testimonialMeta} testimonialContent={item.testimonialContent} ratting={item.ratting} />
                        </SwiperSlide>
                    ))}                        
                </Swiper>
              </Col>
          </Row>
        </Container>
    </div>
  )
}
