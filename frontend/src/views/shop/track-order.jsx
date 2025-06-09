import React from 'react'
import { Col, Container, Row, Form } from 'react-bootstrap'
import Logo from '../../components/widgets/Logo'
import ButtonBox from '../../components/widgets/ButtonBox'

export default function TrackOrder() {
  return (
    <div className="sign-in-page position-relative">
      <Container>
        <Row className="justify-content-center align-items-center height-self-center h-100">
            <Col lg="5" md="12" className="align-self-center">
              <div className="sign-user_card position-relative bg-white mx-auto">
                <div className="logo-img text-center mb-5">
                    <Logo />
                </div>
                <p>To track your order please enter your Order ID in the box below and press the "Track" button. This was
                  given to you on your receipt and in the confirmation email you should have received.
               </p>
               <Form>
                <div className="custom-form-field">
                  <Form.Label>Order ID</Form.Label>
                  <Form.Control type="text" name="order-id" className="mb-5" placeholder="Enter your order id. Found in your order confirmation email." required />
                </div>
                <div className="custom-form-field">
                  <Form.Label>Billing email</Form.Label>
                  <Form.Control type="email" name="order-email" className="mb-5" placeholder="Email you used during checkout." required />
                </div>
                <div className="iq-btn-container button-primary">
                  <ButtonBox buttonText="Track Order" />
                </div>
               </Form>
              </div>
            </Col>
        </Row>
      </Container>
    </div>
  )
}
