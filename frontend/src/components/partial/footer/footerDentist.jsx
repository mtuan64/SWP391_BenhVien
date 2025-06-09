import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';

// widget
import Logo from '../../widgets/Logo'
import SocialMedia from '../../widgets/SocialMedia';

// images
import footerLogo from '/assets/images/logo/logo-skyblue-footer.png'
import appStore from '/assets/images/pages/appstore-123.svg'
import googlePlayStore from '/assets/images/pages/google-play-store.svg'

// Json
import {blogs} from '../../../staticData/blogData'

export default function FooterDentist() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer-dark bg-secondary">
      <div className="footer-top inner-box ">
        <Container>
          <Row>
            <Col lg="3" md="6" className="mb-5 mb-lg-0">
              <div className="pe-lg-5">
                <Logo logoDynamic={true} logoImage={footerLogo} />
                <p className="mt-4 mb-4 text-white">Best Quality of Treatment & Patient Care by professional Doctors </p>
                <div className="d-flex gap-3">
                    <span className="text-white">
                        <i aria-hidden="true" className="far fa-clock fs-4"></i>
                    </span>
                    <div>
                        <p className="m-0 text-white">Mon to Sat:<span className="text-primary"> 9:00 to 20:00</span></p>
                        <p className="m-0 text-white">Sunday: Closed</p>
                    </div>                            
                </div>
              </div>
            </Col>
            <Col lg="3" md="6" className="mb-5 mb-lg-0">
              <h5 className="mb-4 text-white">Recent Post</h5>
              <ul className="p-0 m-0 footer-blog-post">
                {blogs.slice(0, 2).map((item, index) => (
                    <li className="d-flex align-items-center gap-3 border-0 mb-4" key={index}>
                        <div className="img-holder">
                            <Image src={item.blogImage} alt="product" className="avatar-80 rounded-0" />
                        </div>
                        <div className="post-blog">
                            <Link to="/blog/blog-date" className="d-block meta-data">
                                <i className="far fa-calendar-alt me-2 text-white" aria-hidden="true"></i>{" "}
                                <span className="text-primary text-capitalize">{item.blogPublishDate}</span>
                            </Link>
                            <Link to="/blog/blog-author" className="d-block meta-data">
                                <i className="far fa-user me-2 text-white" aria-hidden="true"></i>{" "}
                                <span className="text-primary text-capitalize">{item.blogAuthod}</span>
                            </Link>
                            <Link className="new-link d-block mt-2" to="/blog/blog-details">
                                <h5 className="post-title fw-500 mb-0 text-white text-capitalize">{item.blogTitle}</h5>
                            </Link>
                        </div>
                    </li>
                ))}
              </ul>
            </Col>
            <Col lg="3" md="6">
              <div className="pe-lg-5">
                <h5 className="mb-4 text-white">Quick Contact</h5>
                <ul className="list-inline m-0">
                      <li className="mb-3 text-white">
                          4517, Washington Ave, Manchester, Kentucky, England 524163.
                      </li>
                      <li className="mb-3">
                          <a className="text-white" href="tel:4805550103">+ (480) 555-0103</a>
                      </li>
                      <li className="">
                          <a href="https://templates.iqonic.design/kivicare-dist/template/react/contact-us">www.kivicare.contact.com</a>
                      </li>
                  </ul>
              </div>
            </Col>
            <Col lg="3" md="6" className="mt-md-0 mt-5">
              <h5 className="mb-4 text-white">Download Our App</h5>
              <h6 className="text-white">Download our App and Have Our Services</h6>
              <div className="d-flex flex-wrap align-items-center gap-2 mt-4">
                  <span>
                      <Image src={appStore} alt="appstore" className="img-fluid d-inline-block" />
                  </span>
                  <span>
                      <Image src={googlePlayStore} alt="google-play-store" className="img-fluid d-inline-block" />
                  </span>
              </div>
              <SocialMedia customClass="mt-5 text-white" />
            </Col>
          </Row>
        </Container>
      </div>
      <div className="footer-bottom border-top">
        <Container className="py-4">
          <p className="mb-0 text-white text-center">© {currentYear} KiviCare All Rights Reserved.</p>
        </Container>
    </div>
    </footer>
  )
}
