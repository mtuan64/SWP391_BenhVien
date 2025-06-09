import React from 'react'
import { Col, Container, Row, Accordion, Image } from 'react-bootstrap';

// Widgets
import Faq from '../../widgets/Faq';

// Json
import {faqData} from '../../../staticData/faqData'

// Image
import faq from '/assets/images/ent-clinic/faq.webp'

export default function EntclinicFaq() {
  return (
    <div className="section-padding">
      <Container>
        <Row>
          <Col lg="6">
          <div className="accordion" id="main-faq">
              <Accordion defaultActiveKey={faqData[0]?.uniqid} className="mb-3">
                {faqData.map((item, index) => (
                  <Faq key={index} uniqid={item.uniqid} faqTitle={item.faqTitle} faqdesc={item.faqdesc} />
                ))}
              </Accordion>
            </div>    
          </Col>
          <Col lg="6">
            <Image src={faq} alt="banner" className="img-fluid w-100" />
          </Col>
        </Row>
      </Container>
  </div>
  )
}
