import React from 'react'
import { Col, Container, Row, Form } from 'react-bootstrap'

// Widgets
import Title from '../../widgets/Title'

// Images
import ContactFormBg from '/assets/images/fertility-clinic/contact-form-bg.webp'

export default function FertilityContact() {
  return (
    <div className="contact-form-wrapper" >
      <Container>
        <div className="padding-70 position-relative rtl-image-flip" style={{background: `url(${ContactFormBg})`, backgroundRepeat: `no-repeat`, backgroundSize: `cover`, minHeight:`500px`, position: `relative`}}>
            <Row className="px-3 rtl-image-flip-container">
              <Col lg="6" className="p-0">
                <Title subTitle="GET IN TOUCH" rightText="Contact " leftText="Us" />
                <div>
                  <Row>
                    <Col lg="6">
                      <div className="custom-form-field">
                      <Form.Group className="mb-5">
                        <Form.Control type="text" placeholder="Your Name" className="bg-secondary-subtle" />
                      </Form.Group>
                      </div>
                    </Col>
                    <Col lg="6">
                      <div className="custom-form-field">
                      <Form.Group className="mb-5">
                        <Form.Control type="text" placeholder="Last Name" className="bg-secondary-subtle" />
                      </Form.Group>
                      </div>
                    </Col>
                    <Col lg="6">
                      <div className="custom-form-field">
                      <Form.Group className="mb-5">
                        <Form.Control type="tel" placeholder="Phone Number" className="bg-secondary-subtle" />
                      </Form.Group>
                      </div>
                    </Col>
                    <Col lg="6">
                      <div className="custom-form-field">
                      <Form.Group className="mb-5">
                        <Form.Control type="email" placeholder="your Email" className="bg-secondary-subtle" />
                      </Form.Group>
                      </div>
                    </Col>
                    <Col lg="12">
                      <div className="custom-form-field">
                      <Form.Group className="mb-5">
                        <Form.Control as="textarea" placeholder="Your Message" className="bg-secondary-subtle" />
                      </Form.Group>
                      </div>
                    </Col>
                    <Col lg="12">
                      <div className="iq-btn-container">
                          <button className="iq-button text-capitalize border-0" type="submit">
                            <span className="iq-btn-text-holder position-relative">send message</span>{" "}
                            <span className="iq-btn-icon-holder">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 8 8" fill="none">
                                  <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor"></path>
                                </svg>
                            </span>
                          </button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
        </div>
      </Container>
    </div>
  )
}
