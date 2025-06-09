import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination} from 'swiper/modules';
import 'swiper/swiper-bundle.css';

// Widgets
import ScrollingText from '../../widgets/ScrollingText'
import Title from '../../widgets/Title'
import BlogOverdetails from '../../widgets/BlogOverdetails';

// Json
import {blogs} from '../../../staticData/blogData'

export default function GlobalBlogOverlap() {
  return (
    <div className="eyes-care-blog section-padding ">
      <Container>
        <Row>
          <Col lg="12">
            <div className="text-center">
              <div className="position-relative">
                <ScrollingText scrollTitle="latest blog" />
              </div>
              <Title subTitle="blog" rightText="Read Our Latest " leftText="News And Advices" />
            </div>
          </Col> 
        </Row>
        <Row className="gy-5">
          {blogs.slice(0, 3).map((item, index) => (
            <Col lg="4" key={index}>
              <BlogOverdetails blogImage={item.blogImage} blogPublishDate={item.blogPublishDate} blogAuthor={item.blogAuthod} blogCategory={item.blogCategory} blogTitle={item.blogTitle} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}
