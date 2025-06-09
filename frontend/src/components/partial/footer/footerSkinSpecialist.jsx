import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'

// widget
import Logo from '../../widgets/Logo'
import SocialMedia from '../../widgets/SocialMedia'

export default function FooterSkinSpecialist({logoDynamic}) {
  const currentYear = new Date().getFullYear();
  const impLink = [
    {
        LinkTitle: "About us",
        LinkUrl: "./about-us"
    },
    {
        LinkTitle: "service",
        LinkUrl: "./service/service1"
    },
    {
        LinkTitle: "Team",
        LinkUrl: "./tab-three-column"
    },
    {
        LinkTitle: "Contact Us",
        LinkUrl: "./contact-us"
    }
  ]
  const workingDay = [
    {
        dayLabel: "Monday - Friday",
        dayValue: "6:00 - 7:00 pm"
    },
    {
        dayLabel: "Saturday",
        dayValue: "8:00 - 2:00 pm"
    },
    {
        dayLabel: "Sunday",
        dayValue: "Closed"
    }
  ]
  return (
    <footer>
      <div className="footer-top text-body inner-box pt-0">
        <Container>
          <Row>
            <Col lg="4" md="6" className="mb-5 mb-lg-0">
              <div className="pe-lg-5">
                <Logo logoDynamic={true} logoImage={logoDynamic} />
                <p className="mt-3 mt-md-4">It is a long established fact that a reader will be distracted by the readable.</p>
                <h5 className="text-primary my-3">(316) 555-0116</h5>
                <Link to="mailto:support@example.com"><span className="text-body">customersuport@Kivicare.com</span></Link>
              </div>
            </Col>
            <Col lg="2" md="6" className="mb-5 mb-lg-0">
              <h5 className="mb-3 mb-md-5">Important Links</h5>
              <ul className="m-0 p-0 list-unstyled footer-menu-link">
                {impLink.map((item, index) => (
                    <li className={`${index !== impLink.length - 1 ? "mb-3" : "mb-0"}`} key={index}>
                        <Link to={item.LinkUrl}>
                            <i className="fas fa-angle-right me-2"></i>{item.LinkTitle}
                        </Link>
                    </li>
                ))}
              </ul>
            </Col>
            <Col lg="3" md="6">
              <h5 className="mb-3 mb-md-5">Contact Us</h5>
              <p>4517 Washington Ave,  Manchester, Kentucky .England 524163.</p>
              <SocialMedia isLabelHide={true} customClass="mt-5" />
            </Col>
            <Col lg="3" md="6" className="mt-md-0 mt-5">
              <div className="pe-lg-5">
                <h5 className="mb-3 mb-md-5">Working Hours</h5>
                <ul className="list-inline m-0">
                  {workingDay.map((item, index) => (
                    <li className={`d-flex align-items-center justify-content-between ${index !== workingDay.length - 1 ? "mb-3" : ""}`} key={index}>
                          <span>{item.dayLabel}</span>
                          <span className="text-primary">{item.dayValue}</span>
                      </li>
                  ))}  
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="footer-bottom bg-white">
        <div className="container   py-4 ">
            <div className="row">
                <div className="col-lg-12 text-center ">
                    <p className="mb-0">© {currentYear} KiviCare All Rights Reserved.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </footer>
  )
}
