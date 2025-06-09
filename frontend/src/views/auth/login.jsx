import React from 'react'
import { Col, Container, Form, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Widgets
import Logo from '../../components/widgets/Logo'
import ButtonBox from '../../components/widgets/ButtonBox'
import ButtonLink from '../../components/widgets/ButtonLink'


export default function Login() {
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
                    <Form.Label>Username or email address <span>*</span></Form.Label>
                    <Form.Control type="text" name="user-name" className="mb-5" required />
                </div>
                <div className="custom-form-field">
                    <Form.Label>Passwords <span>*</span></Form.Label>
                    <Form.Control type="password" name="pwd" className="mb-5" required />
                </div>
                <div className="flex-column flex-sm-row d-flex align-items-start justify-content-between mb-5 gap-2">
                  <Form.Check
                      type="checkbox"
                      id="01"
                      label="Remember me"
                      className="mb-5"
                  />  
                  <Link to="/auth/reset-password" className="forgot-pwd">Forgot Password?</Link>
                </div>             
                <ButtonBox buttonText="log in" buttonUrl="/" />
              </Form>
              <div className="d-flex align-items-center mt-5 flex-wrap gap-2">
                <p className="my-0 text-capitalize">Don't have an account yet?</p>
                <div className="sign_up_btn mb-0">
                  <ButtonLink buttonText="sign up" buttonUrl="/auth/registration" />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
