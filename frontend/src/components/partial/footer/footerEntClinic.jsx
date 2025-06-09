import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';

// widget
import Logo from '../../widgets/Logo'
import SocialMedia from '../../widgets/SocialMedia';


export default function FooterEntClinic({logoDynamic}) {

  const currentYear = new Date().getFullYear();
  const impLink = [
    {
        LinkTitle: "About us",
        LinkUrl: "./about-us"
    },
    {
        LinkTitle: "Appointment",
        LinkUrl: "./appointment"
    },
    {
        LinkTitle: "service",
        LinkUrl: "./service/service1"
    },
    {
        LinkTitle: "Contact Us",
        LinkUrl: "./contact-us"
    }
  ]

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

  return (
    <footer>
      <div className="bg-primary-subtle footer-top text-body inner-box">
        <Container>
          <Row>
            <Col lg="4" md="6" className="mb-5 mb-lg-0">
              <div className="pe-lg-5">
                <Logo logoDynamic={true} logoImage={logoDynamic} />
                <SocialMedia customClass="text-dark mt-5" />
                <iframe
                     loading="lazy"
                     className="mt-5 w-100"
                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902543.2003194243!2d-118.04220880485131!3d36.56083290513502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80be29b9f4abb783%3A0x4757dc6be1305318!2sInyo%20National%20Forest!5e0!3m2!1sen!2sin!4v1576668158879!5m2!1sen!2sin"
                     height="160"
                     allowFullScreen=""
                     ></iframe>
              </div>
            </Col>
            <Col lg="2" md="5" className="mb-5 mb-lg-0">
              <h5 className="mb-3 mb-md-5 fw-normal">Direct Links</h5>
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
              <h5 className="mb-3 mb-md-5 fw-normal">Our Services</h5>
              <ul className="m-0 p-0 list-unstyled footer-menu-link">
                  {serviceLink.map((item, index) => (
                      <li className={`${index !== serviceLink.length - 1 ? "mb-3" : "mb-0"}`} key={index}>
                          <Link to={item.LinkUrl}>
                              <i className="fas fa-angle-right me-2"></i>{item.LinkTitle}
                          </Link>
                      </li>
                  ))}
              </ul>
            </Col>
            <Col lg="3" md="6" className="mt-md-0 mt-5">
                <h5 className="mb-3 mb-md-5 fw-normal">Contact Us</h5>
                <p>Don’t hasitate to call or drop us a line</p>
                <h4 className="fw-normal pb-3">+ (480) 555-0103</h4>
                <a href="mailto:support@example.com"><span className="text-body">kivicare@example.com</span></a>
                <span className="d-block"><Link to="/contact-us">www.kivicare.contact.com</Link></span>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="footer-bottom border-top text-body">
          <Container className="py-4">
            <p className="mb-0 text-center"> ©{" "}{currentYear} KiviCare, All Rights Reserved. </p>
          </Container>
      </div>
    </footer>
  )
}
