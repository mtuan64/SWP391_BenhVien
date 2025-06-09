import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row, Image } from 'react-bootstrap'

// widget
import Logo from '../../widgets/Logo'
import SocialMedia from '../../widgets/SocialMedia'

// Images
import footerLogo from '/assets/images/logo/logo-red-footer.png'
import appstore from '/assets/images/pages/appstore-123.svg'
import googlePlayStore from '/assets/images/pages/google-play-store.svg'


export default function FooterCardiac() {
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
  
  return (
    <footer className="footer-dark bg-secondary">
      <div className="footer-top inner-box">
        <Container>
          <Row>
            <Col lg="3" md="6" className="mb-5 mb-lg-0">
              <div className="pe-lg-5">
                <Logo logoDynamic={true} logoImage={footerLogo} />
                <p className="my-3 my-md-5 text-white">Best Quality of Treatment & Patient Care by professional Doctors </p>
                <div className="d-flex gap-3">
                      <span className="text-white">
                        <i aria-hidden="true" className="far fa-clock fs-4 text-primary"></i>
                    </span>
                    <div>
                        <p className="m-0 text-white">Mon to Sat:<span className="text-primary ms-1"> 9:00 to 20:00</span></p>
                        <p className="m-0 text-white">Sunday: <span className="text-primary ms-1">Closed</span></p>
                    </div>                            
                </div>
              </div>
            </Col>
            <Col lg="3" md="6" className="mb-5 mb-lg-0">
              <div className="pe-lg-5">
                <h5 className="mb-5 fw-normal text-white">Services To Explore</h5>
                <ul className="m-0 p-0 list-unstyled footer-menu-link">
                  {serviceLink.map((item, index) => (
                    <li className={`${index !== serviceLink.length - 1 ? "mb-3" : "mb-3"}`} key={index}>
                      <a className="text-white" href={item.LinkUrl}>
                        <i className="fas fa-angle-right me-2"></i>{item.LinkTitle}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
            <Col lg="3" md="6">
              <div className="pe-lg-5">
                <h5 className="mb-5 fw-normal text-white">Quick Contact</h5>
                <ul className="list-inline m-0">
                  <li className="mb-3 text-white">
                      4517 Washington Ave,  Manchester,Kentucky .England 524163.
                  </li>
                  <li className="mb-3">
                      <Link className="text-white" to="tel:4805550103">+ (480) 555-0103</Link>
                  </li>
                  <li className="">
                      <Link to="https://templates.iqonic.design/kivicare-dist/template/react/contact-us">www.kivicare.contact.com</Link>
                  </li>
              </ul>
              </div>
            </Col>
            <Col lg="3" md="6">
              <h5 className="mb-5 fw-normal text-white">Our App</h5>
              <h6 className="text-white fw-normal">Download our App and Have Our Services</h6>
              <div className="d-flex flex-wrap align-items-center gap-2 mt-4">
                  <span>
                      <Image src={appstore} alt="appstore" className="img-fluid d-inline-block" />
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
            <p className="mb-0 text-white text-center">© {currentYear} KiviCare All Rights Reserved.
            </p>
          </Container>
      </div>
    </footer>
  )
}
