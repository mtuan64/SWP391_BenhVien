import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';


// widget
import Logo from '../../widgets/Logo'
import SocialMedia from '../../widgets/SocialMedia';
import FilterRating from '../../widgets/FilterRating'

// images
import footerLogo from '/assets/images/logo/logo-skyblue-footer.png'
import visaLogo from '/assets/images/product-home/visa-logo.png'
import masterCard from '/assets/images/product-home/Mastercard.png'
import payPal from '/assets/images/product-home/PayPal.png'


// Json
import {productData} from '../../../staticData/productData'

export default function FooterProduct() {
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
        dayValue: "09:00 - 20:00"
    },
    {
        dayLabel: "Saturday",
        dayValue: "08:00 - 12:00"
    },
    {
        dayLabel: "Sunday",
        dayValue: "Close"
    }
  ]

  const paymentList = [
    {
      paymentImage: visaLogo
    },
    {
      paymentImage: masterCard
    },
    {
      paymentImage: payPal
    },
    {
      paymentImage: masterCard
    },
  ]

  return (
    <footer>
      <div className="product-home-footer text-body inner-box">
        <Container>
          <Row>
            <Col lg="3" md="6" className="mb-5 mb-lg-0">
              <div className="pe-lg-5">
                <Logo logoDdynamic={true} logoImage={footerLogo} />
                <p className="mt-3 mb-0">It is a long established fact that a reader will be distracted by the readable.</p>
                <h4 className="iq-heading-title my-4">
                  <Link to={'tel:+4805550103'}>+ (480) 555-0103</Link>
                </h4>
                <div className="d-flex align-items-center">
                  <span className="text-capitalize">Email us :</span>
                  <Link to={'mailto:kivicare@example.com'} className="text-secondary">kivicare@example.com</Link>
                </div>
              </div>
            </Col>
            <Col lg="3" md="6" className="mb-5 mb-lg-0">
              <h5 className="mb-4">Departments</h5>
              <ul className="m-0 p-0 list-unstyled footer-menu-link">
                {serviceLink.map((item, index) => (
                  <li className={`${index === serviceLink.length - 1 ? "" : "mb-3"}`} key={index}>
                    <Link to={item.LinkUrl}>
                      <i className="fas fa-angle-right me-2"></i>{item.LinkTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>
            <Col lg="3" md="6">
              <h5 className="mb-4">Popular Products</h5>
              <ul className="p-0 m-0 footer-blog-post">
                {productData.slice(0, 2).map((item, index) => (
                  <li className="d-flex align-items-center gap-3 border-0 mb-4" key={index}>
                    <div className="img-holder">
                      <Image src={item.productImage} alt="product-img" className="img-fluid avatar-100 rounded-0" />
                    </div>
                    <div className="post-blog">
                      <Link className="new-link d-block" to="/shop/product-standard">
                        <h6 className="post-title fw-500 mb-0 text-capitalize">{item.productTitle}</h6>
                      </Link>
                      <FilterRating rating={item.ratting} />
                      <span className="">{item.priceValue}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </Col>
            <Col lg="3" md="6" className="mt-md-0 mt-5">
              <h5 className="mb-4">Opening Hours</h5>
              <ul className="list-inline m-0">
                {workingDay.map((item, index) => (
                  <li className={`d-flex align-items-center justify-content-between ${index !== workingDay.length - 1 ? "mb-3 pb-2 border-bottom" : ""}`} key={index}>
                    <span>{item.dayLabel}</span>
                    <span className="text-secondary">{item.dayValue}</span>
                  </li>
                ))}
              </ul>
              <ul className="list-inline mt-5 mb-0 p-0 d-flex align-items-center gap-5">
                {paymentList.map((item, index) => (
                  <li key={index}>
                    <Image src={item.paymentImage} className="img-fluid" alt="img"/>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="footer-bottom border-top text-body">
        <Container className="py-4 text-center">          
          <p className="mb-0">
            © {currentYear} KiviCare All Rights Reserved.
          </p>
        </Container>
      </div>
    </footer>
  )
}
