import React, { Fragment } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

// widget
import BreadCrumb from '../../components/partial/BreadCrumb';
import BlogStandard from '../../components/widgets/BlogStandard';
import BlogColumn from '../../components/widgets/BlogColumn';

//json
import {blogs} from '../../staticData/blogData'

export default function BlogMasonry() {
  return (
    <Fragment>
      <BreadCrumb title="Blog Masonry" />
      <div className="section-padding">
          <Container>
            <Row>
                <Col lg="6" className="blog-height">
                    {blogs.slice(0, 1).map((item, index) => (
                        <BlogStandard key={index} blogImage={item.blogImage} blogCategory={item.blogCategory} blogPublishDate={item.blogPublishDate} blogAuthor={item.blogAuthod} blogTitle={item.blogTitle} />
                    ))}
                </Col>
            
                <Col lg="6" className="mt-5 mt-lg-0">
                    {blogs.slice(1,3).map((item, index) => (
                        <div className={`${index == blogs.slice(1, 3).length - 1 ? "blog" : "blog mb-5"}`} key={index}>
                            <BlogColumn blogImage={item.blogImage} blogCategory={item.blogCategory} blogPublishDate={item.blogPublishDate} blogAuthor={item.blogAuthod} blogTitle={item.blogTitle} />
                        </div>
                    ))}
                </Col>
            </Row>
            <Row className="mt-5">
              <Col lg="6">
                  {blogs.slice(4,6).map((item, index) => (
                      <div className={`${index == blogs.slice(4, 6).length - 1 ? "blog" : "blog mb-5"}`} key={index}>
                          <BlogColumn blogImage={item.blogImage} blogCategory={item.blogCategory} blogPublishDate={item.blogPublishDate} blogAuthor={item.blogAuthod} blogTitle={item.blogTitle} />
                      </div>
                  ))}
              </Col>

              <Col lg="6" className="blog-height mt-5 mt-lg-0">
                  {blogs.slice(6, 7).map((item, index) => (
                      <BlogStandard key={index} blogImage={item.blogImage} blogCategory={item.blogCategory} blogPublishDate={item.blogPublishDate} blogAuthor={item.blogAuthod} blogTitle={item.blogTitle} />
                  ))}
              </Col>          
            </Row>
          </Container>
      </div>
    </Fragment>
  )
}
