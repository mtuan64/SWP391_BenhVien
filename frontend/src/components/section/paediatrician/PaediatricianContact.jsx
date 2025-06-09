import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

// Widget
import ButtonBox from '../../widgets/ButtonBox';

export default function PaediatricianContact() {
  return (
    <div className="bg-secondary footer-top-padding text-center px-3">
      <Container>
        <Row>
          <Col lg="12">
            <h3 className="text-white fw-normal mb-2">Ready to Schedule an appointment ? Contact us online or on call us
                <span className="text-primary d-block"> (316) 555-0116</span>
            </h3>
            <span className="text-white">we offer amazing services options to fit you</span>
            <div className="button-primary mt-0 mt-lg-3 pt-5">
              <ButtonBox buttonUrl="/contact-us" buttonText="Contact Us" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
