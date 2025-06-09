import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap';

// Widgets
import Title from '../../widgets/Title';
import ScrollingText from '../../widgets/ScrollingText';

// Images
import aboutUs from '/assets/images/psychiatrist/about-us.png'
import icon from '/assets/images/psychiatrist/icon.webp'

export default function PsychiatristAbout() {
  return (
    <div className="section-padding">
      <Container>
        <Row className="align-items-center">
          <Col lg="6" className="pe-lg-5">
            <Image src={aboutUs} alt="about-us" className="w-100 img-fluid" />
          </Col>
          <Col lg="6" className="position-relative mt-5 mt-lg-0">
            <ScrollingText scrollTitle="about us" />
            <Title subTitle="about us" rightText="Early treatment of Mental	illness has " leftText="High Success" titleDescription="Our goal is to eliminate or
              control disabling or troubling symptoms so the patient can function better. This treatment involves a talking relationship between a therapist & patient." />
              <Row className="gy-3">
                <Col xl="6" lg="7" sm="6">
                  <ul className="iq-list-with-icon p-0 border-bottom pb-4 mb-5">
                    <li className="d-flex align-items-center gap-2 mb-3 text-primary">
                      <svg className="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 21.2498C17.108 21.2498 21.25 17.1088 21.25 11.9998C21.25 6.89176 17.108 2.74976 12 2.74976C6.892 2.74976 2.75 6.89176 2.75 11.9998C2.75 17.1088 6.892 21.2498 12 21.2498Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M10.5576 15.4709L14.0436 11.9999L10.5576 8.52895" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                      <span className="text-body">Nunc Consectetur Tortor In Nisi.</span>
                    </li>
                    <li className="d-flex align-items-center gap-2 mb-3 text-primary">
                      <svg className="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 21.2498C17.108 21.2498 21.25 17.1088 21.25 11.9998C21.25 6.89176 17.108 2.74976 12 2.74976C6.892 2.74976 2.75 6.89176 2.75 11.9998C2.75 17.1088 6.892 21.2498 12 21.2498Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M10.5576 15.4709L14.0436 11.9999L10.5576 8.52895" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                      <span className="text-body">Quisque Nec Mi Convallis Lacus</span>
                    </li>
                    <li className="d-flex align-items-center gap-2 mb-3 text-primary">
                      <svg className="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 21.2498C17.108 21.2498 21.25 17.1088 21.25 11.9998C21.25 6.89176 17.108 2.74976 12 2.74976C6.892 2.74976 2.75 6.89176 2.75 11.9998C2.75 17.1088 6.892 21.2498 12 21.2498Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M10.5576 15.4709L14.0436 11.9999L10.5576 8.52895" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                      <span className="text-body">Vivamus Egestas Tellus A Massa</span>
                    </li>
                  </ul>
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <Image src={icon} alt="icon" />
                  <div>
                    <span>Feel free to contact us here</span>
                    <h5 className="text-secondary mt-1 fw-bolder">
                      <span className="text-dark">Call:</span> +1-202-555-0104
                    </h5>
                  </div>
                  </div>
                </Col>
                <Col xl="6" lg="7" sm="6">
                <div className="bg-secondary-subtle p-xl-5 p-lg-4 p-5 d-block">
                  <h2 className="text-secondary fw-bolder">100%</h2>
                  <h5 className="fw-normal">Satisfaction Guarantee</h5>
                  <p className="mt-3 mb-0 text-body">It is a long established fact that  a reader will be distracted by the readable content </p>
                </div>
                </Col>
              </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
