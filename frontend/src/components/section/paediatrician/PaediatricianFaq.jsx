import React from 'react'
import { Col, Row, Container, Image, Accordion } from 'react-bootstrap';

// Widgets
import Title from '../../widgets/Title';
import ScrollingText from '../../widgets/ScrollingText';
import Faq from '../../widgets/Faq';

// Json
import { faqData } from '../../../staticData/faqData';

// Images
import FAQ from '/assets/images/paediatrician/faq.jpg';

export default function PaediatricianFaq() {
  return (
    <div className="section-padding">
      <Container>
        <div className="position-relative">
          <ScrollingText scrollTitle="faq" />
        </div>
        <Row className="align-items-center">
          <Col lg="6">
            <Title subTitle="faq" rightText="Ask Us Anything,We Are Here to " leftText="Help" />  
            <div className="accordion" id="main-faq">
              <Accordion defaultActiveKey={faqData[0]?.uniqid} className="mb-3">
                {faqData.map((item, index) => (
                  <Faq uniqid={item.uniqid} faqTitle={item.faqTitle} faqdesc={item.faqdesc} key={index} />
                ))}
              </Accordion>
            </div>
          </Col>
          <Col lg="6">
            <Image src={FAQ} alt="faq" className="img-fluid w-100" />
          </Col>
        </Row>
      </Container>
    </div>
  )
}
