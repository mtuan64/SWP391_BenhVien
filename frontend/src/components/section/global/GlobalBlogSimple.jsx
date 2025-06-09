import React from 'react'
import { Container } from 'react-bootstrap'

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination} from 'swiper/modules';
import 'swiper/swiper-bundle.css';

// Widget
import Title from '../../widgets/Title'
import ScrollingText from '../../widgets/ScrollingText'
import BlogImageHover from '../../widgets/BlogImageHover';

// Json
import { blogs } from '../../../staticData/blogData'

// Redux Selector / Action
import { useSelector } from 'react-redux';
import { theme_scheme_direction } from '../../../store/setting/selectors';

export default function GlobalBlogSimple() {
  const themeSchemeDirection = useSelector(theme_scheme_direction);
  return (
    <div className="blog section-padding">
        <Container>
          <div className="text-center">
            <div className="position-relative">
              <ScrollingText scrollTitle="latest blog" />
            </div>
            <Title subTitle="blog" rightText=" Read Our Latest " leftText="News And Advices" />
          </div>
              <Swiper className="swiper-container cust-swiper-wrapper"
                key={themeSchemeDirection}
                dir={themeSchemeDirection}
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={3}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                speed={2000}
                loop={true}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  576: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1025: {
                    slidesPerView: 3,
                  },
                  1500: {
                    slidesPerView: 3,
                  }
                }}
            >
                {blogs.map((item, index) => (
                    <SwiperSlide key={index}>
                        <BlogImageHover  blogImage={item.blogImage} blogPublishDate={item.blogPublishDate} blogCategory={item.blogCategory} blogTitle={item.blogTitle} />
                    </SwiperSlide>
                ))}                        
            </Swiper>
        </Container>
    </div>
  )
}
