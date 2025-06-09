import React from 'react'
import { Container, Row, Col, Image, Nav, Tab } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';

// widgets
import FilterRating from './FilterRating'
import CounterButton from './counterButton'
import ButtonBox from './ButtonBox'
import ProductCard from './ProductCard';

// Images
import avatar from '/assets/images/general/avatar.png'

// Json
import {productData} from '../../staticData/productData'

export default function ProductDetail({isStandard, isSale, isNew, ...props}) {
    const wishListAlert = () => {
        Swal.fire(
            'Added!',
            'Your item has been Added to the wishlist.',
            'success'
        );
    };

  return (
    <div className="section-padding product-detail">
        <Container>
            <Row>
                <Col lg="6">
                    {isStandard === true && (
                        <div className="position-relative">
                            <span data-fslightbox="product">
                                <Image src={props.productImage} className="img-fluid" alt="product-image" loading="lazy" />
                            </span>
                        </div>
                    )}
                    {isSale === true && (
                        <div className="position-relative">
                            <span data-fslightbox="product">
                                <Image src={props.productImage} className="img-fluid" alt="product-image" loading="lazy" />
                            </span>
                            <span className="iq-on-sale badge bg-primary">Sale</span>
                        </div>
                    )}
                    {isNew === true && (
                        <div className="position-relative">
                            <span data-fslightbox="product">
                                <Image src={props.productImage} className="img-fluid" alt="product-image" loading="lazy" />
                            </span>
                            <span className="iq-on-new badge bg-primary">New</span>
                        </div>
                    )}
                </Col>
                <Col lg="6" className="mt-lg-0 mt-5">
                    <h3>{props.productTitle}</h3>
                    <div className="mt-2">
                        <FilterRating rating={props.ratting} />
                    </div>
                    <h4 className="price mt-3 mb-0">{props.productPrice}</h4>
                    <p className="mt-4 mb-0">{props.productDescription}</p>
                    <div className="add-product-wrapper mt-5 pb-5 mb-5 border-bottom">
                        <ul className="list-inline m-0 p-0 d-flex align-items-center gap-5 flex-wrap">
                            <li>
                                <CounterButton />
                            </li>
                            <li className="wish-list">
                                <Link to="#" className="d-inline-block p-3 bg-primary-subtle wishlist-btn" onClick={wishListAlert}>
                                    <span className="btn-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20"
                                        fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                            d="M1.87187 9.59832C0.798865 6.24832 2.05287 2.41932 5.56986 1.28632C7.41986 0.689322 9.46186 1.04132 10.9999 2.19832C12.4549 1.07332 14.5719 0.693322 16.4199 1.28632C19.9369 2.41932 21.1989 6.24832 20.1269 9.59832C18.4569 14.9083 10.9999 18.9983 10.9999 18.9983C10.9999 18.9983 3.59787 14.9703 1.87187 9.59832Z"
                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round"></path>
                                        <path d="M15 4.70001C16.07 5.04601 16.826 6.00101 16.917 7.12201"
                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round"></path>
                                    </svg>
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <ButtonBox buttonText="Add to Cart" buttonUrl="/shop/checkout" />
                            </li>
                        </ul>
                    </div>
                    <div className="product-meta-wrapper">
                        <ul className="list-inline m-0 p-0">
                            <li className="mb-2">
                                <span>SKU : </span>
                                <h6 className="d-inline">{props.productSku}</h6>
                            </li>
                            <li className="mb-2">
                                <span>Categories : </span>
                                <h6 className="d-inline">{props.productCategories}</h6>
                            </li>
                            <li>
                                <span>Tag : </span>
                                <h6 className="d-inline">{props.productTag}</h6>
                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>
            <div className="section-padding-top px-0">
                <div className="product-detail-tabs">
                <Tab.Container id="left-tabs-example" defaultActiveKey="description">
                    <Nav variant="pills" className="justify-content-center gap-5 mb-5 border-bottom list-inline rounded-0">
                        <Nav.Item>
                            <Nav.Link eventKey="description" className="bg-transparent px-0 py-2 letter-spacing-2 fs-5 rounded-0">Description</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="additional-information" className="bg-transparent px-0 py-2 letter-spacing-2 fs-5 rounded-0">Additional information</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="reviews" className="bg-transparent px-0 py-2 letter-spacing-2 fs-5 rounded-0">Reviews</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content className="pb-5 border-bottom">
                        <Tab.Pane eventKey="description">
                            <p className="m-0">There are many variations of passages of Lorem Ipsum available,
                                but the majority have suffered alteration in some form, by injected humour,
                                or randomised words which don't look even slightly believable. If you are
                                going to use a passage of Lorem Ipsum, you need to be sure there isn't
                                anything embarrassing hidden in the middle of text. All the Lorem Ipsum
                                generators on the Internet tend to repeat predefined chunks as necessary.
                            </p>
                        </Tab.Pane>
                        <Tab.Pane eventKey="additional-information">
                            <div className="table-responsive">
                                <table className="table table-bordered mb-0">
                                    <tbody>
                                    <tr className="text-body">
                                        <th className="text-dark">Color</th>
                                        <td>Blue, Green, Red</td>
                                    </tr>
                                    <tr className="text-body">
                                        <th className="text-dark">Size</th>
                                        <td>L, M, S</td>
                                    </tr>
                                    <tr className="text-body">
                                        <th className="text-dark">Weight</th>
                                        <td>50ml, 100ml</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="reviews">
                            <h4 className="mb-4">Reviews For {props.productTitle}</h4>
                            <div className="product-review-list">
                                <ul className="list-inline m-0 p-0">
                                    <li className="pb-5 mb-5 border-bottom">
                                        <div className="d-flex flex-sm-row flex-column align-items-sm-center align-items-start gap-5">
                                            <div className="user-image flex-shrink-0">
                                                <Image src={avatar} alt="user-image" className="img-fluid" />
                                            </div>
                                            <div className="about-user">
                                                <div className="d-flex align-items-center flex-wrap gap-2">
                                                    <h5 className="mb-0">Jack Stark</h5>
                                                    <span className="text-uppercase letter-spacing-3 small fst-italic">
                                                    <i className="fas fa-minus fa-xs"></i> march 2, 2022</span>
                                                    <div className="lh-1">
                                                        <FilterRating rating={5} />
                                                    </div>
                                                </div>
                                                <p className="mt-2 mb-0">
                                                    There are many variations of passages of Lorem Ipsum
                                                    available, but the majority have suffered alteration in
                                                    some form.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="mb-5">
                                        <div className="d-flex flex-sm-row flex-column align-items-sm-center align-items-start gap-5">
                                            <div className="user-image flex-shrink-0">
                                                <Image src={avatar} alt="user-image" className="img-fluid" />
                                            </div>
                                            <div className="about-user">
                                                <div className="d-flex align-items-center flex-wrap gap-2">
                                                    <h5 className="mb-0">Jhon Deo</h5>
                                                    <span className="text-uppercase letter-spacing-3 small fst-italic">
                                                    <i className="fas fa-minus fa-xs"></i> march 15, 2022 </span>
                                                    <div className="lh-1">
                                                        <FilterRating rating={3} />
                                                    </div>
                                                </div>
                                                <p className="mt-2 mb-0">
                                                It is a long established fact that a reader will be distracted by the readable content of a page when
                                    looking at its layout.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-5 review-form">
                                <p>Add a review</p>
                                <p className="mb-5">Your email address will not be published. Required fields are marked * </p>
                                <p className="mb-2">Your rating *</p>
                                <Form>
                                    <div className="mb-5">
                                        <FilterRating rating={0} />
                                    </div>
                                    <div className="mb-5">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Your review *</Form.Label>
                                            <Form.Control as="textarea" rows={3} className="rounded-0" required />
                                        </Form.Group>
                                    </div>
                                    <div className="mb-5">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Name*</Form.Label>
                                            <Form.Control type="text" className="rounded-0" required />
                                        </Form.Group>
                                    </div>
                                    <div className="mb-5">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email*</Form.Label>
                                            <Form.Control type="email" className="rounded-0" required />
                                        </Form.Group>
                                    </div>
                                    <div className="mb-5 form-check ps-0">
                                        <Form.Check
                                            type="checkbox"
                                            id="01"
                                            label="Save my name, email, and website in this browser for the next time I comment."
                                        />
                                    </div>
                                    <ButtonBox buttonText="submit" />
                                </Form>
                            </div>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
                </div>
            </div>
            <div className="section-padding-top px-0">
                <div className="mb-5">
                    <h2 className="text-center">Related Products</h2>
                </div>
                <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4">
                    {productData.slice(0, 4).map((item, index) => (
                    <div className="col" key={index}>
                        <ProductCard productImage={item.productImage} productTitle={item.productTitle} priceValue={item.priceValue} productCategory={item.productCategory} rating={item.ratting} IsNew={item.isNew} IsSale={item.isSale} />
                    </div>
                    ))}   
                </Row>
            </div>
        </Container>
    </div>
  )
}
