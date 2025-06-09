import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';

// widget
import Logo from '../../widgets/Logo';
import FilterRating from '../../widgets/FilterRating'

// images
import footerLogo from '/assets/images/logo/logo-yellow-footer.png'

// Json
import {productData} from '../../../staticData/productData'

export default function FooterPsychiatrist() {
  const currentYear = new Date().getFullYear();

  const serviceLink = [
    {
      LinkTitle: "Oncologist",
      LinkUrl: "./service/oncologist"
    },
    {
      LinkTitle: "Neurologist",
      LinkUrl: "./service/neurologist"
    },
    {
      LinkTitle: "ENT Specialist",
      LinkUrl: "./service/entspecialist"
    },
    {
      LinkTitle: "Cardiologist",
      LinkUrl: "./service/cardiologist"
    },
    {
      LinkTitle: "Audiologist",
      LinkUrl: "./service/audiologist"
    },
    {
      LinkTitle: "Psychiatrists",
      LinkUrl: "./service/psychiatrists"
    }
  ]

  const workingDay = [
    {
      dayLabel: "Weekdays",
      dayValue: "9:00 - 18:00"
    },
    {
      dayLabel: "Saturday",
      dayValue: "9:00 - 18:00"
    },
    {
      dayLabel: "Sunday",
      dayValue: "Closed"
    }
  ]

  return (
    <footer>
      <div className="bg-dark footer-top text-body inner-box">
        <Container>
          <Row>
            <Col lg="4" md="6" className="mb-5 mb-lg-0">
              <div className="pe-lg-5">
                <Logo logoDynamic={true} logoImage={footerLogo} />
                <p className=" my-5 text-white">It is a long established fact that a reader will be distracted
                  by the readable content.</p>
                <h5 className="text-white mb-2">+ (480) 555-0103</h5>
                <span className="text-white">Email us : <span className="text-primary"> kivicare@example.com</span></span>
              </div>
            </Col>
            <Col lg="2" md="6" className="mb-5 mb-lg-0">
              <h5 className="mb-4 text-white">Departments</h5>
              <ul className="m-0 p-0 list-unstyled footer-menu-link">
                {serviceLink.map((item, index) => (
                  <li className={`${index === serviceLink.length - 1 ? "mb-0" : "mb-3"}`} key={index}>
                    <Link to={item.LinkUrl} className="text-white">
                      <i className="fas fa-angle-right me-2"></i>{item.LinkTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>
            <Col lg="3" md="6" className="mb-5 mb-lg-0">
              <h5 className="mb-4 text-white">Popular Products</h5>
              <ul className="p-0 m-0 footer-blog-post">
                {productData.slice(0, 2).map((item, index) => (
                  <li className="d-flex align-items-center gap-3 border-0 mb-4" key={index}>
                    <div className="img-holder">
                      <Image src={item.productImage} alt="product-img" className="img-fluid avatar-100 rounded-0" />
                    </div>
                    <div className="post-blog">
                      <Link className="new-link d-block" to="/shop/product-standard">
                        <h6 className="post-title fw-500 mb-0 text-white text-capitalize">{item.productTitle}</h6>
                      </Link>
                      <FilterRating rating={item.ratting} />
                      <span className="text-white">{item.priceValue}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </Col>
            <Col lg="3" md="6">
              <h5 className="mb-4 text-white">Opening Hours</h5>
              <ul className="list-inline m-0">
                {workingDay.map((item, index) => (
                  <li className={`d-flex align-items-center justify-content-between ${index !== workingDay.length - 1 ? "mb-3 pb-2 border-bottom" : ""}`} key={index}>
                    <span>{item.dayLabel}</span>
                    <span className="text-white">{item.dayValue}</span>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="footer-bottom bg-secondary text-white">
        <Container className="py-4">
          <Row>
            <Col lg="12" className="text-center">
              <p className="mb-0">
                © {currentYear} KiviCare All Rights Reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  )
}
