import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

// Widgets
import ButtonBox from '../../widgets/ButtonBox'

export default function EyecareContact() {
  return (
    <div className="main-schedule bg-dark py-5">
      <Container>
        <Row>
          <Col lg="12">
          <div className="py-5 text-center">
              <h3 className="text-white mb-3">Ready to Schedule an appointment ? Contact us online or on call us
                  <span className="text-primary d-block">(316) 555-0116</span>
              </h3>
              <p className="mb-5 pb-3 text-white">we offer amazing services options to fit you</p>
              <div className="button-primary">
                <ButtonBox buttonUrl="/contact-us" buttonText="Contact Us" />
              </div>
            </div>
          </Col>
        </Row>
      </Container>    
    </div>
  )
}
