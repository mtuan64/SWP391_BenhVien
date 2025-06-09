import React, { Fragment, useEffect } from 'react'
import { Col, Container, Row, Form } from 'react-bootstrap'

// Widgets
import BreadCrumb from '../components/partial/BreadCrumb'
import Title from '../components/widgets/Title'
import ButtonBox from '../components/widgets/ButtonBox'

export default function ContactUs() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Fragment>
      <BreadCrumb title="Contact Us" />
      <div className="text-center">
        <Container className="section-padding border-bottom">
          <Row className="gy-4">
            <Col md="4" className=''>
              <i className="fas fa-map-marker-alt text-secondary font-size-60 mb-5"></i>
              <div className="iq-title-box mb-0">
                <span className="iq-subtitle text-uppercase">LOCATION</span>
                <h5 className="iq-title iq-heading-title mt-3">
                  <span className="right-text text-capitalize ">Miami, Florida USA</span>
                </h5>
              </div>
            </Col>
            <Col md="4" className=''>
              <i className="far fa-envelope text-secondary font-size-60 mb-5"></i>
              <div className="iq-title-box mb-0">
                <span className="iq-subtitle text-uppercase">EMAIL</span>
                <h5 className="iq-title iq-heading-title mt-3">
                  <span className="right-text text-capitalize ">Support@Kivitheme.Com</span>
                </h5>
              </div>
            </Col>
            <Col md="4" className=''>
              <i className="fas fa-phone  text-secondary font-size-60 mb-5"></i>
              <div className="iq-title-box mb-0">
                <span className="iq-subtitle text-uppercase">CALL ANYTIME</span>
                <h5 className="iq-title iq-heading-title mt-3">
                  <span className="right-text text-capitalize ">+1 (111) 234 567</span>
                </h5>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section-padding">
        <Container className="text-center">
          <Title subTitle="JUST A CALL AWAY" rightText="We'd love to " leftText="Hear from you!" titleDescription="We are here and always ready to help you. Let us know how we serve
      you and we’ll get back within no time." />
          <Row>
            <Col lg="2" className="d-lg-block d-none"></Col>
            <Col lg="8">
              <Row>
                <Col lg="6">
                  <Form.Group className="mb-3 custom-form-field">
                    <Form.Control type="text" placeholder="Your Name" className="mb-5" required />
                  </Form.Group>
                </Col>
                <Col lg="6">
                  <Form.Group className="mb-3 custom-form-field">
                    <Form.Control type="text" placeholder="Last Name" className="mb-5" required />
                  </Form.Group>
                </Col>
                <Col lg="6">
                  <Form.Group className="mb-3 custom-form-field">
                    <Form.Control type="tel" minLength={10} maxLength={140} placeholder="Phone Number" className="mb-5" required />
                  </Form.Group>
                </Col>
                <Col lg="6">
                  <Form.Group className="mb-3 custom-form-field">
                    <Form.Control type="email" placeholder="Your Email" className="mb-5" required />
                  </Form.Group>
                </Col>
                <Col lg="12">
                  <Form.Group className="mb-5 custom-form-field">
                    <Form.Control as="textarea" rows={5} placeholder="Your Message" className="" />
                  </Form.Group>
                </Col>
                <Col lg="12" className="text-start">
                  <ButtonBox buttonText="send message" buttonUrl="/" />
                </Col>
              </Row>
            </Col>
            <Col lg="2" className="d-lg-block d-none"></Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  )
}
