import React, { Fragment } from 'react'
import { Container, Row, Pagination } from 'react-bootstrap'

// Widget
import BreadCrumb from '../../components/partial/BreadCrumb';
import BlogStandard from '../../components/widgets/BlogStandard';

// Json
import {blogs} from '../../staticData/blogData'

export default function BlogTwoColumn() {
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
      <BreadCrumb title="Two Column Blog" />
      <div className="blog-list section-padding">
        <Container>
          <Row className="row-cols-1 row-cols-md-2">            
              {blogs.map((item, index) => (
                <div className="col" key={index}>
                  <BlogStandard blogImage={item.blogImage} blogCategory={item.blogCategory} blogPublishDate={item.blogPublishDate} blogAuthor={item.blogAuthod} blogTitle={item.blogTitle} />
                </div>
              ))}
          </Row>
          <div className="pagination justify-content-center">
            <Pagination className="page-numbers gap-3">
              {items}
            </Pagination>
          </div>
        </Container>
      </div>
    </Fragment>
  )
}
