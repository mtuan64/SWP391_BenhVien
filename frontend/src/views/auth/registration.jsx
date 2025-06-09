import React from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Widgets
import Logo from '../../components/widgets/Logo'
import ButtonBox from '../../components/widgets/ButtonBox'
import ButtonLink from '../../components/widgets/ButtonLink'

export default function Registration() {
  return (
    <div className="sign-in-page position-relative">
      <Container>
        <Row className="justify-content-center align-items-center height-self-center h-100">
          <Col lg="5" md="12" className="align-self-center">
            <div className="sign-user_card position-relative bg-white mx-auto">
              <div className="logo-img text-center mb-5">
                <Logo />
              </div>
              <Form>
                <div className="custom-form-field">
                    <Form.Control type="text" name="user-name" placeholder="Your email id *" className="mb-5" required />
                </div>
                <p className="mb-5"> Your personal data will be used to support your experience throughout this
                     website, to manage access to your account, and for other purposes described in our 
                     <Link to="/privacy-policy"> privcy policy</Link>. 
                </p>
                <ButtonBox buttonText="register" buttonUrl="/" />
              </Form>
              <div className="d-flex align-items-center mt-3">
                <p className="my-0 text-capitalize">Already have an account?</p>
                <div className="sign_up_btn mb-0 ms-2">
                  <ButtonLink buttonText="sign in" buttonUrl="/auth/login" />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
