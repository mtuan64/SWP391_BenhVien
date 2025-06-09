import React from 'react'
import { Col, Container, Row, Image } from 'react-bootstrap';

// Widgets
import Title from '../../widgets/Title';
import ScrollingText from '../../widgets/ScrollingText';

// Images
import Left from '/assets/images/orthopedics/Left.webp'
import service from '/assets/images/orthopedics/service.png'

export default function OrthopedicsWhyChoose() {
  return (
    <div className="section-padding">
      <Container>
        <div className="position-relative">
          <ScrollingText scrollTitle="CHOOSE US" />
        </div>
        <Row className="align-items-center">
          <Col lg="6">
            <Image src={Left} alt="service-img" className="img-fluid w-100" />
          </Col>
          <Col lg="6" className="mt-5 mt-lg-0">
            <Title subTitle="WHY CHOOSE US" rightText="The World’s Best Orthopedic" leftText=" Care Treatment" titleDescription="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate provident, similique sunt in culpa qui officia deserunt mollitia animi" />
            <ol className="iq-list two-column border-bottom mb-4 pb-3 mb-md-5 pb-md-5">
              <li className="text-dark">Top Qualified Doctors</li>
              <li className="text-dark">24/7 Hour Services</li>
              <li className="text-dark">Trusted Treatment</li>
              <li className="text-dark">Clean & Modern Clinic</li>
            </ol>
            <div className="d-flex align-items-start align-items-md-center gap-3 flex-column flex-md-row">
              <Image src={service} alt="icon" />
              <h5 className="iq-title iq-heading-title text-secondary">
                  <span className="right-text text-capitalize fw-500">We Carefully Understand And Easily Manage Surgery Since <span className="text-primary">2000</span> And We Provide The Best Services</span>
              </h5>           
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
