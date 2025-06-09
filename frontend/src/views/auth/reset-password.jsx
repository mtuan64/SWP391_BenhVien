import React from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Widgets
import Logo from '../../components/widgets/Logo'
import ButtonBox from '../../components/widgets/ButtonBox'
import ButtonLink from '../../components/widgets/ButtonLink'

export default function ResetPassword() {
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
                <p className="mb-5"> Lost your password? Please enter your username or email address. You will
              receive a link to create a new password via email. </p>
                <div className="custom-form-field">
                    <Form.Control type="text" name="user-name" placeholder="Enter Username or Email*" className="mb-5" required />
                </div>
                <ButtonBox buttonText="reset password" buttonUrl="/" />
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
