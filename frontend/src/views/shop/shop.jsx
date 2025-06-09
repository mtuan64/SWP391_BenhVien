import React, { Fragment } from 'react'
import { Col, Container, Row, Nav, Tab, Form, Pagination } from 'react-bootstrap'
import ChoicesJs from '../../components/widgets/Choices'

// widget
import BreadCrumb from '../../components/partial/BreadCrumb'
import ShopSidebar from '../../components/widgets/ShopSidebar'
import ProductCard from '../../components/widgets/ProductCard'

// Json
import { productData } from '../../staticData/productData'
import { Value } from 'sass'

export default function Shop() {

  const optionss = [
    { label: "Defalut Sorting", Value: "Defalut Sorting" },
    { label: "Sort by popularity", Value: "Sort by popularity" },
  { label: "Sort by average rating", Value: "Sort by average rating" },
  { label: "Sort by latest", Value: "Sort by latest" },
  { label: "Sort by price: low to high", Value: "Sort by price: low to high" },
  { label: "Sort by price: high to low", Value: "Sort by price: high to low" },
]

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
      <BreadCrumb title="Shop" />
      <div className="section-padding">
        <Container>
          <Row>
            <Col xl="9">
              <Tab.Container id="left-tabs-example" defaultActiveKey="pills-grid-three">
                <div className="top-panel mb-5">
                  <Row className="align-items-center">
                    <Col sm="6" className="text-center text-sm-start">
                      <p className="m-0">Showing 1–12 of 20 results</p>
                    </Col>
                    <Col sm="6" className="mt-3 mt-sm-0 d-flex align-items-center justify-content-center justify-content-sm-end gap-3">
                      <div className="list-inline m-0 nav nav-pills iq-product-filter d-none d-md-flex bg-transparent align-items-center">
                        <Nav variant="pills" className="mb-0">
                          <Nav.Item>
                            <Nav.Link eventKey="pills-list">
                              <span className="btn-inner">
                                <svg width="18" height="16" viewBox="0 0 18 16" fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                                  <g clipPath="url(#clip0_1379_355)">
                                    <path d="M3.42857 0H0V3.42857H3.42857V0Z" fill="currentColor">
                                    </path>
                                    <path d="M18 0.857422H6V2.57171H18V0.857422Z" fill="currentColor">
                                    </path>
                                    <path d="M3.42857 6H0V9.42857H3.42857V6Z" fill="currentColor">
                                    </path>
                                    <path d="M18 6.85742H6V8.57171H18V6.85742Z" fill="currentColor">
                                    </path>
                                    <path d="M3.42857 12H0V15.4286H3.42857V12Z" fill="currentColor">
                                    </path>
                                    <path d="M18 12.8574H6V14.5717H18V12.8574Z" fill="currentColor">
                                    </path>
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_1379_355">
                                      <rect width="18" height="15.4286" fill="currentColor"></rect>
                                    </clipPath>
                                  </defs>
                                </svg>
                              </span>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="pills-grid-two">
                              <span className="btn-inner">
                                <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 17 17">
                                  <path d="M8.57143 0H0V8.57143H8.57143V0Z" fill="currentcolor"></path>
                                  <path d="M17.9999 0H9.42847V8.57143H17.9999V0Z" fill="currentcolor">
                                  </path>
                                  <path d="M8.57143 9.42871H0V18.0001H8.57143V9.42871Z"
                                    fill="currentcolor"></path>
                                  <path d="M17.9999 9.42871H9.42847V18.0001H17.9999V9.42871Z"
                                    fill="currentcolor"></path>
                                </svg>
                              </span>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="pills-grid-three">
                              <span className="btn-inner">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                                  <path d="M4.90909 0H0V4.90909H4.90909V0Z" fill="currentColor"></path>
                                  <path d="M11.4545 0H6.54541V4.90909H11.4545V0Z" fill="currentColor">
                                  </path>
                                  <path d="M17.9999 0H13.0908V4.90909H17.9999V0Z" fill="currentColor">
                                  </path>
                                  <path d="M4.90909 6.5459H0V11.455H4.90909V6.5459Z" fill="currentColor">
                                  </path>
                                  <path d="M11.4545 6.5459H6.54541V11.455H11.4545V6.5459Z"
                                    fill="currentColor"></path>
                                  <path d="M17.9999 6.5459H13.0908V11.455H17.9999V6.5459Z"
                                    fill="currentColor"></path>
                                  <path d="M4.90909 13.0908H0V17.9999H4.90909V13.0908Z"
                                    fill="currentColor"></path>
                                  <path d="M11.4545 13.0908H6.54541V17.9999H11.4545V13.0908Z"
                                    fill="currentColor"></path>
                                  <path d="M17.9999 13.0908H13.0908V17.9999H17.9999V13.0908Z"
                                    fill="currentColor"></path>
                                </svg>
                              </span>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="pills-grid-four">
                              <span className="btn-inner">
                                <svg width="18" height="18" viewBox="0 0 17 17" fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                                  <path d="M3.85714 0H0V3.85714H3.85714V0Z" fill="currentColor"></path>
                                  <path d="M8.5715 0H4.71436V3.85714H8.5715V0Z" fill="currentColor">
                                  </path>
                                  <path d="M13.2856 0H9.42847V3.85714H13.2856V0Z" fill="currentColor">
                                  </path>
                                  <path d="M18 0H14.1428V3.85714H18V0Z" fill="currentColor"></path>
                                  <path d="M3.85714 4.71387H0V8.57101H3.85714V4.71387Z"
                                    fill="currentColor"></path>
                                  <path d="M8.5715 4.71387H4.71436V8.57101H8.5715V4.71387Z"
                                    fill="currentColor"></path>
                                  <path d="M13.2856 4.71387H9.42847V8.57101H13.2856V4.71387Z"
                                    fill="currentColor"></path>
                                  <path d="M18 4.71387H14.1428V8.57101H18V4.71387Z" fill="currentColor">
                                  </path>
                                  <path d="M3.85714 9.42871H0V13.2859H3.85714V9.42871Z"
                                    fill="currentColor"></path>
                                  <path d="M8.5715 9.42871H4.71436V13.2859H8.5715V9.42871Z"
                                    fill="currentColor"></path>
                                  <path d="M13.2856 9.42871H9.42847V13.2859H13.2856V9.42871Z"
                                    fill="currentColor"></path>
                                  <path d="M18 9.42871H14.1428V13.2859H18V9.42871Z" fill="currentColor">
                                  </path>
                                  <path d="M3.85714 14.1426H0V17.9997H3.85714V14.1426Z"
                                    fill="currentColor"></path>
                                  <path d="M8.5715 14.1426H4.71436V17.9997H8.5715V14.1426Z"
                                    fill="currentColor"></path>
                                  <path d="M13.2856 14.1426H9.42847V17.9997H13.2856V14.1426Z"
                                    fill="currentColor"></path>
                                  <path d="M18 14.1426H14.1428V17.9997H18V14.1426Z" fill="currentColor">
                                  </path>
                                </svg>
                              </span>
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </div>
                      <div className="product-filter">
                        <ChoicesJs options={optionss} className="js-choice select-multiple" select="one" ></ChoicesJs>
                      </div>
                    </Col>
                  </Row>
                </div>
                <Tab.Content>
                  <Tab.Pane eventKey="pills-list">
                    <Row className="row-cols-1">
                      {productData.slice(0, 5).map((item, index) => (
                        <div className="col" key={index}>
                          <ProductCard IsProductlist={true} productImage={item.productImage} productTitle={item.productTitle} priceValue={item.priceValue} productCategory={item.productCategory} productDesc={item.productDesc} rating={item.ratting} IsNew={item.isNew} IsSale={item.isSale} />
                        </div>
                      ))}
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="pills-grid-two">
                    <Row className="row-cols-1 row-cols-sm-2">
                      {productData.slice(0, 8).map((item, index) => (
                        <div className="col" key={index}>
                          <ProductCard productImage={item.productImage} productTitle={item.productTitle} priceValue={item.priceValue} productCategory={item.productCategory} rating={item.ratting} IsNew={item.isNew} IsSale={item.isSale} />
                        </div>
                      ))}
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="pills-grid-three">
                    <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3">
                      {productData.slice(0, 9).map((item, index) => (
                        <div className="col" key={index}>
                          <ProductCard productImage={item.productImage} productTitle={item.productTitle} priceValue={item.priceValue} productCategory={item.productCategory} rating={item.ratting} IsNew={item.isNew} IsSale={item.isSale} />
                        </div>
                      ))}
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="pills-grid-four">
                    <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                      {productData.slice(0, 8).map((item, index) => (
                        <div className="col" key={index}>
                          <ProductCard productImage={item.productImage} productTitle={item.productTitle} priceValue={item.priceValue} productCategory={item.productCategory} rating={item.ratting} IsNew={item.isNew} IsSale={item.isSale} />
                        </div>
                      ))}
                    </Row>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
              <div className="pagination justify-content-center">
                <Pagination className="page-numbers gap-3">
                  {items}
                </Pagination>
              </div>
            </Col>
            <Col xl="3">
              <ShopSidebar />
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  )
}
