import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';

// Widget
import Title from '../../widgets/Title';
import ScrollingText from '../../widgets/ScrollingText';
import ButtonBox from '../../widgets/ButtonBox';

export default function OrthopedicsGetStarted() {
  return (
    <div className="section-padding">
        <Container>
          <div className="position-relative">
            <ScrollingText scrollTitle="why choose" />
          </div>
          <Row className="align-items-center gy-4">
            <Col lg="8">
              <Title subTitle="why choose us" rightText="Helping patients across Mid Michigan renew " leftText="Their Freedom" titleDescription="There are many variations of passages of Lorem Ipsum
          available, but the majority have suffered alteration in some form, by injected humour, or randomised
          words which don’t look" />
              <ButtonBox buttonText="get started now" buttonUrl="/service/service2" />
            </Col>
            <Col lg="4">
              <Row>
                <Col lg="12" md="6">
                  <div className="bg-white shadow p-3 p-md-4 p-lg-5 mb-5">
                    <div className="d-flex align-items-center gap-3">
                        <h2 className="text-primary">99%</h2>
                        <h5>Success Surgery</h5>
                    </div>
                    <p className="mb-0">It is a long established fact that a reader willbe distracted by the readable content</p>
                  </div>
                </Col>
                <Col lg="12" md="6">
                  <div className="bg-white shadow p-3 p-md-4 p-lg-5">
                    <div className="d-flex align-items-center gap-3">
                        <h2 className="text-primary">100%</h2>
                        <h5>Dedicated Care</h5>
                    </div>
                    <p className="mb-0">It is a long established fact that a reader willbe distracted by the readable content</p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
    </div>
  )
}
