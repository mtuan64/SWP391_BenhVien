import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Widget
import Title from '../../widgets/Title'
import ScrollingText from '../../widgets/ScrollingText'
import BlogStandard from '../../widgets/BlogStandard'
import BlogColumn from '../../widgets/BlogColumn'

// Json
import {blogs} from '../../../staticData/blogData'

export default function GlobalBlogColumnGrid() {
  return (
    <div className="section-padding">
        <Container className="position-relative">
            <div className="text-center">
                <ScrollingText scrollTitle="blog" />
                <Title subTitle="blog" rightText="Stay Updated With Our Latest " leftText="Articles" />
            </div>
            <Row>
                <Col lg="6" className="blog-height">
                    {blogs.slice(0, 1).map((item, index) => (
                        <BlogStandard key={index} blogImage={item.blogImage} blogCategory={item.blogCategory} blogPublishDate={item.blogPublishDate} blogAuthor={item.blogAuthod} blogTitle={item.blogTitle} />
                    ))}
                </Col>
            
                <Col lg="6" className="mt-5 mt-lg-0">
                    {blogs.slice(1, 3).map((item, index) => (
                        <div className={`${index == blogs.slice(1, 3).length - 1 ? "blog" : "blog mb-5"}`} key={index}>
                            <BlogColumn blogImage={item.blogImage} blogCategory={item.blogCategory} blogPublishDate={item.blogPublishDate} blogAuthor={item.blogAuthod} blogTitle={item.blogTitle} />
                        </div>
                    ))}
                </Col>
            </Row>
            <div className="text-center mt-5">
            <div className="iq-btn-container">
                <Link className="iq-button" to="/blog/blog-lists">
                <span className="iq-btn-text-holder position-relative">View More</span>{" "}
                <span className="iq-btn-icon-holder">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 8 8" fill="none">
                        <path
                            d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                            fill="white" />
                    </svg>
                </span>
                </Link>
            </div>
            </div>
        </Container>
    </div>
  )
}
