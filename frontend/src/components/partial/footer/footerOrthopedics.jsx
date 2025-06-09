import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row, Image } from 'react-bootstrap'

// widget
import Logo from '../../widgets/Logo'
import FilterRating from '../../widgets/FilterRating'

// Json
import {productData} from '../../../staticData/productData'

export default function FooterOrthopedics({logoDynamic}) {
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
      <div className="bg-primary-subtle footer-top text-body inner-box">
        <Container>
          <Row>
            <Col lg="4" md="6" className="mb-5 mb-lg-0">
              <div className="pe-lg-5">
                <Logo logoDynamic={true} logoImage={logoDynamic} />
                <p className=" my-5 ">It is a long established fact that a reader will be distracted by the readable content.</p>
                <h5 className=" mb-2">+ (480) 555-0103</h5>
                <span className="">Email us : <span className="text-primary"> kivicare@example.com</span></span>
              </div>
            </Col>
            <Col lg="2" md="6" className="mb-5 mb-lg-0">
              <h5 className="mb-5">Departments</h5>
              <ul className="m-0 p-0 list-unstyled footer-menu-link">
                {serviceLink.map((item, index) => (
                  <li className={`${index !== serviceLink.length - 1 ? "mb-3" : "mb-0"}`} key={index}>
                    <a href={item.LinkUrl}>
                      <i className="fas fa-angle-right me-2"></i>{item.LinkTitle}
                    </a>
                  </li>
                ))}
              </ul>
            </Col>
            <Col lg="3" md="6" className="mb-5 mb-lg-0">
              <h5 className="mb-5">Popular Products</h5>
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
            <Col lg="3" md="6" >
            <div className='pe-lg-5'>
              <h5 className="mb-5">Opening Hours</h5>
              <ul className="list-inline m-0">
                {workingDay.map((item, index) => (
                  <li className={`d-flex align-items-center justify-content-between ${index !== workingDay.length - 1 ? "pb-2" : ""}`} key={index}>
                        <span>{item.dayLabel}</span>
                        <span className="text-secondary">{item.dayValue}</span>
                    </li>
                ))}  
              </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="footer-bottom bg-primary">
        <Container className="py-4">
            <p className="mb-0 text-white text-center">© {currentYear} KiviCare All Rights Reserved.
            </p>
        </Container>
      </div>
    </footer>
  )
}
