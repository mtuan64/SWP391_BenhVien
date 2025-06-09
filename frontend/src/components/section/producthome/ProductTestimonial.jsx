import React from 'react'
import { Container } from 'react-bootstrap';

// sweiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination} from 'swiper/modules';
import 'swiper/swiper-bundle.css';

// Widgets
import ScrollingText from '../../widgets/ScrollingText';
import Title from '../../widgets/Title';
import TestimonialAuthor from '../../widgets/TestimonialAuthor';

// Json
import { tesimonialData } from '../../../staticData/testimonial'

// Redux Selector / Action
import { useSelector } from 'react-redux';
import { theme_scheme_direction } from '../../../store/setting/selectors';

export default function ProductTestimonial() {
  const themeSchemeDirection = useSelector(theme_scheme_direction);
  return (
    <div className="mx-xxl-5 px-xxl-5">
      <div className="px-xxl-5">
        <div className="section-padding px-xxl-0 bg-primary-subtle">
          <Container>
            <div className="position-relative text-center">
              <ScrollingText scrollTitle="Testimonial" />
            </div>
            <div className="text-center">
              <Title subTitle="Testimonials" rightText="What Our " leftText="Client's Say" />
            </div>
            <div className="position-relative testimonial-section">
              <div className="position-absolute top-0 start-0 h-100 px-3 bg-primary d-lg-block d-none">
                  <div className="px-5 mx-5"></div>
              </div>
              <div className="py-lg-5 ps-lg-5 ms-lg-5">
                <Swiper className="swiper-container"
                    key={themeSchemeDirection}
                    dir={themeSchemeDirection}
                    modules={[Navigation, Pagination]}
                    pagination={true}
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
                            <TestimonialAuthor isRatting={true} testimonialImage={item.testimonialImage} testimonialUser={item.testimonialUser} testimonialMeta={item.testimonialMeta} testimonialContent={item.testimonialContent} ratting={item.ratting} />
                        </SwiperSlide>
                    ))} 
                    <div className="arrow-joint">
                        <div className="swiper-button-next"></div>
                        <div className="swiper-button-prev"></div>  
                    </div>                       
                </Swiper>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  )
}
