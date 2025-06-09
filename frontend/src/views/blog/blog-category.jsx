import React, {Fragment} from 'react'
import { Col, Container, Row, Pagination } from 'react-bootstrap'

// Widget
import BreadCrumb from '../../components/partial/BreadCrumb';
import BlogStandard from '../../components/widgets/BlogStandard';
import BlogSidebar from '../../components/widgets/BlogSidebar';

// Json
import {blogs} from '../../staticData/blogData'

export default function BlogCategory() {
  let active = 1;
  let items = [];
  for (let number = 1; number <= 3; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} className="page-numbers">
        {number}
      </Pagination.Item>,
    );
  }
  return (
    <Fragment>
      <BreadCrumb title="Category: Health Care" />
      <div className="blog-list section-padding ">
          <Container>
            <Row>
              <Col lg="8">
                  {blogs.map((item) => (
                      <BlogStandard isDesc={true} isTag={true} blogImage={item.blogImage} blogCategory={item.blogCategory} blogPublishDate={item.blogPublishDate} blogAuthor={item.blogAuthod} blogTitle={item.blogTitle} blogDescription={item.blogDescription} blogTag={item.blogTag} />
                  ))}
                  <div className="pagination justify-content-center">
                    <Pagination className="page-numbers gap-3">
                      {items}
                    </Pagination>
                  </div> 
              </Col>
              <Col lg="4">
                    <BlogSidebar />
              </Col>
            </Row>
          </Container>
      </div>
    </Fragment>
  )
}
