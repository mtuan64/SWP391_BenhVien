import React, {Fragment} from 'react'
import { Col, Container, Row, Pagination } from 'react-bootstrap'

// Widget
import BreadCrumb from '../../components/partial/BreadCrumb';
import BlogStandard from '../../components/widgets/BlogStandard';
import BlogSidebar from '../../components/widgets/BlogSidebar';

// Redux Selector / Action
import { useSelector } from "react-redux";

// Import selectors & action from setting store
import * as SettingSelector from "../../store/data/selectors";

export default function BlogLists() {
  let active = 1;
  let items = [];
  for (let number = 1; number <= 3; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} className="page-numbers">
        {number}
      </Pagination.Item>,
    );
  }
  
  const blogData = useSelector(SettingSelector.blog_data)
  return (
    <Fragment>
      <BreadCrumb title="Blog" />
      <div className="blog-list section-padding ">
          <Container>
            <Row>
              <Col lg="8">
                  {blogData.map((item,index) => (
                      <BlogStandard key={index} isDesc={true} isTag={true} blogImage={item.blogImage} blogCategory={item.blogCategory} blogPublishDate={item.blogPublishDate} blogAuthor={item.blogAuthod} blogTitle={item.blogTitle} blogDescription={item.blogDescription} blogTag={item.blogTag} />
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
