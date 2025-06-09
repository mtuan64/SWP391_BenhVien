import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Logo from '../../widgets/Logo'
import MailBox from '../../widgets/MailBox'
import SocialMedia from '../../widgets/SocialMedia'

export default function FooterPaediatrician({ logoDynamic }) {
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
    <footer className="footer-paediatrician">
      <div className="footer-top text-body ">
        <Container>
          <Row>
            <Col lg="3" md="6" className="px-3 px-lg-4 inner-box border-end">
              <div className="pe-lg-5">
                <Logo logoDynamic={true} logoImage={logoDynamic} />
                <p className="my-4">It is a long established fact that a reader will be distracted by the readable.</p>
                <div className="iq-icon-box bg-primary-subtle p-4">
                  <div className="icon-box-content">
                    <span className="text-dark font-size-18 fw-500"> Office Address </span>
                    <p className="text-body mt-3"> 2972 Westheimer Rd. Santa Ana, Illinois 85486  </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg="3" md="6" className="px-3 px-lg-4 inner-box border-end">
              <h5 className="mb-4 ">Contact Info</h5>
              <div className="mb-3">
                <p className="text-uppercase fw-500 font-size-14">Need Help?</p>
                <h6 className="mt-0 mb-0 font-size-18 fw-500"><Link to="tel:3165550116">(316) 555-0116</Link></h6>
                <p className="m-0 text-primary font-size-14 fw-500">24 hours emergency</p>
              </div>
              <p className="text-uppercase fw-500 font-size-14">Need Support?</p>
              <h6 className="mt-0 mb-0 font-size-18"><Link to="mailto:alma.lawson@example.com">alma.lawson@example.com</Link></h6>
            </Col>
            <Col lg="3" md="6" className="px-3 px-lg-4 inner-box border-end">
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
            <Col lg="3" md="6" className="px-3 px-lg-4 inner-box">
              <h5 className="mb-4 ">Working Days</h5>
              <ul className="list-inline m-0">
                {workingDay.map((item, index) => (
                  <li className={`d-flex align-items-center justify-content-between ${index !== workingDay.length - 1 ? "mb-3 pb-2 border-bottom" : ""}`} key={index}>
                    <h6 className="mb-0 fw-normal">{item.dayLabel}</h6>
                    <span className="text-primary fw-500">{item.dayValue}</span>
                  </li>
                ))}
              </ul>
              <div className="custom-form-field mt-4">
                <div className="">
                  <MailBox />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="footer-bottom bg-primary text-white py-3">
        <Container>
          <Row className="align-items-center">
            <Col md="6">
              <p className="mb-0 text-md-start text-center">© {currentYear} KiviCare All Rights Reserved.</p>
            </Col>
            <Col md="6" className="mt-md-0 mt-3">
              <SocialMedia isLabelHide={true} customClass="justify-content-md-end justify-content-center text-dark" />
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  )
}
