import React, { Fragment } from 'react'
import { Col, Container, Row, Form, Pagination } from 'react-bootstrap'

// widget
import BreadCrumb from '../../components/partial/BreadCrumb'
import ShopSidebar from '../../components/widgets/ShopSidebar'
import ProductCard from '../../components/widgets/ProductCard'

// Json
import {productData} from '../../staticData/productData'
import ChoicesJs from '../../components/widgets/Choices'

export default function ShopLeftSidebar() {
  let active = 1;
  let items = [];
  for (let number = 1; number <= 3; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} className="page-numbers">
        {number}
      </Pagination.Item>,
    );
  }

    const optionss = [
      { label: "Defalut Sorting", Value: "Defalut Sorting" },
      { label: "Sort by popularity", Value: "Sort by popularity" },
    { label: "Sort by average rating", Value: "Sort by average rating" },
    { label: "Sort by latest", Value: "Sort by latest" },
    { label: "Sort by price: low to high", Value: "Sort by price: low to high" },
    { label: "Sort by price: high to low", Value: "Sort by price: high to low" },
  ]

  return (
    <Fragment>
      <BreadCrumb title="Shop Left Sidebar" />
      <div className="section-padding">
        <Container>
          <Row className="flex-xl-row flex-column-reverse">
            <Col xl="3" className="mt-xl-0 mt-5">
              <ShopSidebar />
            </Col>
            <Col xl="9">
              <div className="top-panel mb-5">
                <Row className="align-items-center mt-5 mt-lg-0">
                    <Col sm="6" className="text-center text-sm-start">
                      <p className="m-0">Showing 1–12 of 20 results</p>
                    </Col>
                    <Col sm="6" className="mt-3 mt-sm-0 d-flex align-items-center justify-content-center justify-content-sm-end gap-3">
                      <div className="product-filter">
                         <ChoicesJs options={optionss} className="js-choice select-multiple" select="one" ></ChoicesJs>
                      </div>
                    </Col>
                </Row>
              </div>
              <Row className="row-cols-1 row-cols-sm-2 row-cols-md-2">
                {productData.map((item, index) => (
                  <div className="col" key={index}>
                    <ProductCard productImage={item.productImage} productTitle={item.productTitle} priceValue={item.priceValue} productCategory={item.productCategory} productDesc={item.productDesc} rating={item.ratting} IsNew={item.isNew} IsSale={item.isSale} />
                  </div>
                ))}  
              </Row>
              <div className="pagination justify-content-center">
                <Pagination className="page-numbers gap-3">
                  {items}
                </Pagination>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  )
}
