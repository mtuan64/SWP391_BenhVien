import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap';

// Widgets
import ScrollingText from '../../widgets/ScrollingText';
import Title from '../../widgets/Title';
import SocialMedia from '../../widgets/SocialMedia';
import ButtonBox from '../../widgets/ButtonBox';

export default function PsychiatristContact() {
  return (
    <div className="section-padding bg-secondary-subtle">
      <Container className="position-relative">
        <ScrollingText scrollTitle="contact us" />
        <Row className="align-items-center">
            <Col lg="4">
              <Title subTitle="contact us" rightText="Get A Glimpse Of A" leftText=" Psychiatrist Theraphy" titleDescription="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium" />
              <SocialMedia customClass="mt-5 text-dark" />
            </Col>
            <Col lg="8" className="position-relative">
              <Row className="mt-5 mt-lg-0">
                <Col lg="6">
                  <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Your Name" className="mb-5 bg-white" required />
                  </Form.Group>
                </Col>
                <Col lg="6">
                  <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Last Name" className="mb-5 bg-white" required />
                  </Form.Group>
                </Col>
                <Col lg="6">
                  <Form.Group className="mb-3">
                    <Form.Control type="tel" minLength={10} maxLength={140} placeholder="Phone Number" className="mb-5 bg-white" required />
                  </Form.Group>
                </Col>
                <Col lg="6">
                  <Form.Group className="mb-3">
                    <Form.Control type="email" placeholder="Your Email" className="mb-5 bg-white" required />
                  </Form.Group>
                </Col>
                <Col lg="12">
                  <Form.Group className="mb-3">
                    <Form.Control as="textarea" rows={5} placeholder="Your Message" />
                  </Form.Group>
                </Col>
                <Col lg="12">
                  <ButtonBox buttonText="send message" buttonUrl="#" />
                </Col>
              </Row>
            </Col>
        </Row>
      </Container>
    </div>
  )
}
