import React from 'react'
import {  Container, Row, Col, Image, Accordion } from 'react-bootstrap';

// Widgets
import Title from '../../widgets/Title';
import ScrollingText from '../../widgets/ScrollingText';
import Faq from '../../widgets/Faq';

// Json
import { faqData } from '../../../staticData/faqData';

// Images
import faq from '/assets/images/orthopedics/faq.webp'

export default function OrthopedicsFaq() {
  return (
    <div className="section-padding">
        <Container>
          <div className="position-relative">
            <ScrollingText scrollTitle="faq" />
          </div>
          <Row className="align-items-center">
              <Col lg="6">
                <Title subTitle="FAQ" rightText="Ask Us Anything,We Are Here To " leftText="Help" />
              <div className="accordion" id="main-faq">
                <Accordion defaultActiveKey={faqData[0]?.uniqid} className="mb-3">
                    {faqData.map((item) => (
                      <Faq uniqid={item.uniqid} faqTitle={item.faqTitle} faqdesc={item.faqdesc} />
                    ))}
                </Accordion>
                </div> 
              </Col>
              <Col lg="6">
                <Image src={faq} alt="faq" className="img-fluid w-100" />
              </Col>
          </Row>
        </Container>
      </div>
  )
}
