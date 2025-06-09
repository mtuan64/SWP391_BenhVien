import React from 'react'
import { Container } from 'react-bootstrap';

// sweiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination} from 'swiper/modules';
import 'swiper/swiper-bundle.css';

// Widgets
import ScrollingText from '../../widgets/ScrollingText';
import Title from '../../widgets/Title';
import BlogWithAuthor from '../../widgets/BlogWithAuthor';

// Json
import { blogs } from '../../../staticData/blogData'

// Redux Selector / Action
import { useSelector } from 'react-redux';
import { theme_scheme_direction } from '../../../store/setting/selectors';

export default function GlobalBlogBoxCard() {
  const themeSchemeDirection = useSelector(theme_scheme_direction);
  return (
    <div className="section-padding">
        <Container>
        <div className="text-center position-relative">
          <ScrollingText scrollTitle="Our blog" />
          <Title subTitle="Our blog" rightText="Stay Updated With Our " leftText="Latest Articles" />
        </div>
        <Swiper className="swiper-container"
            key={themeSchemeDirection}
            dir={themeSchemeDirection}
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={3}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
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
                    <BlogWithAuthor blogImage={item.blogImage} blogPublishDate={item.blogPublishDate} blogCategory={item.blogCategory} blogTitle={item.blogTitle} blogAuthor={item.blogAuthod} />
                </SwiperSlide>
            ))}                        
        </Swiper>
        </Container>
      </div>
  )
}
