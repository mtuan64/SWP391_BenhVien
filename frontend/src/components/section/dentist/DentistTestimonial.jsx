import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination} from 'swiper/modules';
import 'swiper/swiper-bundle.css';

// widget
import TestimonialStandard from '../../widgets/TestimonialStandard';

// Images
import testimonialBg from '/assets/images/Dentist-Page/testimonial-bg.webp'

// Json
import { tesimonialData } from '../../../staticData/testimonial'

// Redux Selector / Action
import { useSelector } from 'react-redux';
import { theme_scheme_direction } from '../../../store/setting/selectors';

export default function DentistTestimonial() {
  const themeSchemeDirection = useSelector(theme_scheme_direction);
  return (
    <div className="position-relative section-padding rtl-image-flip" style={{background: `url(${testimonialBg})`,backgroundSize: 'cover', backgroundPosition: 'right center'}}>
        <Container fluid className="rtl-image-flip-container">
          <Row>
            <Col md="6"></Col>
            <Col md="6">
            <Swiper className="swiper-container testimonial-quote testimonial-quote-white custom-phunsuc-wangade"
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
                      slidesPerView: 2,
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
                        <TestimonialStandard isAuthorImageHide={true} isTeastimonialicon={true} isRatting={true} quoteImage={item.quoteImage} testimonialImage={item.testimonialImage} testimonialUser={item.testimonialUser} testimonialMeta={item.testimonialMeta} testimonialContent={item.testimonialContent} ratting={item.ratting} />
                    </SwiperSlide>
                ))}
                </Swiper>
            </Col>
          </Row>
        </Container>
      </div>
  )
}
