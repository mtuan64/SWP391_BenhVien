import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// widget
import Logo from '../../widgets/Logo'
import MailBox from '../../widgets/MailBox'
import SocialMedia from '../../widgets/SocialMedia'

export default function FooterFertilityClinic({logoDynamic}) {
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
        LinkTitle: "Ent Specialist",
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

  const usefulLink = [
    {
        LinkTitle: "About us",
        LinkUrl: "./about-us"
    },
    {
        LinkTitle: "Appointment",
        LinkUrl: "./appointment"
    },
    {
        LinkTitle: "Service",
        LinkUrl: "./service/service1"
    },
    {
        LinkTitle: "Contact Us",
        LinkUrl: "./contact-us"
    }
  ]

  return (
    <footer>
      <div className="bg-soft-light text-body pb-5">
        <Container className="pb-5">
          <Row className="gy-4">
            <Col lg="4" md="6">
              <div className="d-flex align-items-center gap-2 gap-md-5">
                  <div className="bg-white rounded wh-80 d-flex align-items-center justify-content-center f-none">
                      <i className="fas fa-map-marker-alt text-secondary fs-3"></i>
                  </div>
                  <div>
                      <h6 className="text-uppercase letter-spacing-2 mb-3">location</h6>
                      <p className="mb-0"> 2715 Ash Dr. San Jose, South Dakota 83475.</p>
                  </div>
              </div>
            </Col>
            <Col lg="4" md="6">
              <div className="d-flex align-items-center gap-2 gap-md-5">
                  <div className="bg-white rounded wh-80 d-flex align-items-center justify-content-center f-none">
                      <i className="fas fa-phone-alt text-secondary fs-3"></i>
                  </div>
                  <div>
                      <h6 className="text-uppercase letter-spacing-2 mb-3">contact</h6>
                      <a href="mailto:support@example.com" className="text-body">alma.lawson@example.com</a>
                      <p className="mb-0">(505) 555-0125</p>
                  </div>
              </div>
            </Col>
            <Col lg="4" md="6">
              <div className="d-flex align-items-center gap-2 gap-md-5">
                <div className="bg-white rounded wh-80 d-flex align-items-center justify-content-center f-none">
                    <i className="fas fa-business-time text-secondary fs-3"></i>
                </div>
                <div>
                    <h6 className="text-uppercase letter-spacing-2 mb-3">working hours</h6>
                    <p className="mb-0">Mon 09AM - 06PM</p>
                    <p className="mb-0">Sat 09AM - 02PM</p>
                </div>
            </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="footer-top bg-white text-body inner-box">
        <Container>
          <Row>
            <Col lg="4" md="6" className="mb-5 mb-lg-0">
              <div className="pe-lg-5">
                <Logo logoDynamic={true} logoImage={logoDynamic} />
                <p className="my-3 my-md-5">It is a long established fact that a reader will be distracted by the readable content.</p>
                <SocialMedia customClass="text-dark" />
                <div className="custom-form-field pe-sm-5 me-sm-5 mt-4">
                  <div className="pe-sm-3 pe-5">
                    <MailBox />
                  </div>
                </div>                
              </div>
            </Col>
            <Col lg="3" md="6">
              <div className="pe-lg-5">
                <h5 className="mb-3 mb-md-5">Our Services</h5>
                <ul className="m-0 p-0 list-unstyled footer-menu-link">
                  {serviceLink.map((item, index) => (
                      <li className={`${index !== serviceLink.length - 1 ? "mb-3" : "mb-0"}`} key={index}>
                          <Link to={item.LinkUrl}>
                              <i className="fas fa-angle-right me-2"></i>{item.LinkTitle}
                          </Link>
                      </li>
                  ))}
                </ul>
              </div>
            </Col>
            <Col lg="2" md="6" className="mt-5 mt-lg-0">
              <h5 className="mb-3 mb-md-5">Useful Links</h5>
              <ul className="m-0 p-0 list-unstyled footer-menu-link">
                {usefulLink.map((item, index) => (
                    <li className={`${index !== usefulLink.length - 1 ? "mb-3" : "mb-0"}`} key={index}>
                        <Link to={item.LinkUrl}>
                            <i className="fas fa-angle-right me-2"></i>{item.LinkTitle}
                        </Link>
                    </li>
                ))}
              </ul>
            </Col>
            <Col lg="3" md="6" className="mt-md-0 mt-5">
              <h5 className="mb-3 mb-md-5">Our Branches</h5>
              <iframe loading="lazy" className="w-100"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902543.2003194243!2d-118.04220880485131!3d36.56083290513502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80be29b9f4abb783%3A0x4757dc6be1305318!2sInyo%20National%20Forest!5e0!3m2!1sen!2sin!4v1576668158879!5m2!1sen!2sin"
                  height="160" allowFullScreen=""></iframe>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="footer-bottom bg-soft-light text-body">
        <Container className="py-4 text-center">
          <p className="mb-0">  © {currentYear} KiviCare, All Rights Reserved. </p>
        </Container>
    </div>
    </footer>
  )
}
