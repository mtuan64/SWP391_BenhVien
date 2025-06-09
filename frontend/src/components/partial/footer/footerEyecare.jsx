import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Logo from '../../widgets/Logo'
import MailBox from '../../widgets/MailBox'
import SocialMedia from '../../widgets/SocialMedia'

export default function FooterEyecare({logoDynamic}) {
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
  const workingDay = [
      {
          dayLabel: "Monday - Thursday",
          dayValue: "6:00 - 7:00 pm"
      },
      {
          dayLabel: "Friday",
          dayValue: "8:00 - 9:00 pm"
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
    <footer className="footer-eyecare">
      <div className="bg-primary-subtle footer-top text-body inner-box ">
        <Container>
          <Row>
            <Col lg="4" md="6" className="mb-5 mb-lg-0">
              <div className="pe-lg-5">
                <Logo logoDynamic={true} logoImage={logoDynamic} />
                <p className="my-4">It is a long established fact that a reader will be distracted by the readable.</p>
                <div className="iq-icon-box p-5 w-75">
                    <div className="icon-box-content">
                        <h5 className="text-primary"> Main branch Address </h5>
                        <p className="text-body mt-3"> 2972 Westheimer Rd. Santa Ana, Illinois 85486  </p>
                    </div>
                </div>
              </div>
            </Col>
            <Col lg="2" md="6" className="mb-5 mb-lg-0">
              <h5 className="mb-4 ">Contact Info</h5>
              <div className="mb-3">
                  <p>Need Help?</p>
                  <h5 className="mt-0 mb-0"><Link to="tel:3165550116">(316) 555-0116</Link></h5>
                  <p className="m-0 text-primary">24 hours emergency</p>
              </div>
              <p>Need Support?</p>
              <h6 className="mt-0 mb-0"><a style={{color: `#19323c`}} href="mailto:alma.lawson@example.com">alma.lawson@example.com</a></h6>                  
            </Col>
            <Col lg="3" md="6">
              <div className="pe-lg-5">
                <h5 className="mb-4 ">Services To Explore</h5>
                <ul className="m-0 p-0 list-unstyled footer-menu-link">
                  {serviceLink.map((item, index) => (
                      <li className={`${index === serviceLink.length - 1 ? "mb-0" : "mb-3"}`} key={index}>
                          <Link to={item.LinkUrl}>
                              <i className="fas fa-angle-right me-2"></i>{item.LinkTitle}
                          </Link>
                      </li>
                  ))}
                </ul>
              </div>
            </Col>
            <Col lg="3" md="6" className="mt-md-0 mt-5">
              <h5 className="mb-4 ">Working Days</h5>
              <ul className="list-inline m-0">
                {workingDay.map((item, index) => (
                  <li className={`d-flex align-items-center justify-content-between ${index !== workingDay.length - 1 ? "mb-3 pb-2 border-bottom" : ""}`} key={index}>
                        <span>{item.dayLabel}</span>
                        <span className="text-secondary fw-500">{item.dayValue}</span>
                    </li>
                ))}  
              </ul>
              <div className="custom-form-field mt-4 bg-secondary-subtle p-3">
                  <div className="">
                    <MailBox />
                  </div>
              </div>  
            </Col>
          </Row>
        </Container>
      </div>
      <div className="footer-bottom bg-primary-subtle border-top text-body py-3">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-6">
                    <p className="mb-0">© {currentYear} KiviCare All Rights Reserved.
                    </p>
                </div>
                <div className="col-md-6">
                  <SocialMedia customClass="justify-content-end text-dark" />
                </div>
            </div>
        </div>
    </div>
    </footer>
  )
}
