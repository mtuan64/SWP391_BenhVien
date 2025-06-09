import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

// Widgets
import ScrollingText from '../../widgets/ScrollingText'
import Title from '../../widgets/Title'
import ButtonBox from '../../widgets/ButtonBox';
import CounterWithIcon from '../../widgets/CounterWithIcon';

export default function EyecareService() {
  const CounterData = [
    {
      counterIcon: <i aria-hidden="true" className="flaticon flaticon-flaticon flaticon-government text-primary"></i>,
      counterValue: "75",
      counterText: "Specialized DR."
    },
    {
      counterIcon: <i aria-hidden="true" className="flaticon flaticon-flaticon flaticon-care text-primary"></i>,
      counterValue: "10",
      counterText: "Award Won"
    },
    {
      counterIcon: <i aria-hidden="true" className="flaticon flaticon-flaticon flaticon-rating text-primary"></i>,
      counterValue: "150",
      counterText: "Appointments"
    },
    {
      counterIcon: <i aria-hidden="true" className="flaticon flaticon-flaticon flaticon-debit-card text-primary"></i>,
      counterValue: "250",
      counterText: "Young Visitors"
    }
  ]
  return (
    <div className="eye-care-service section-padding bg-primary-subtle text-body">
        <Container>
          <Row className="align-items-center section-padding-bottom ps-0 pe-0">
              <Col lg="6" className="pe-xl-5">
                <div className="position-relative">
                  <ScrollingText scrollTitle="services" />
                </div>
                <Title subTitle="Services" rightText="We Provide Friendly And Useful" leftText=" Medical Services." titleDescription="The passage
          experienced a surge in popularity during the 1960s when Letraset used it on their
          dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with
          their software.le content of a page when looking at its layout." />
                <div className="button-primary">
                    <ButtonBox buttonUrl="/appointment" buttonText="Get Appoinement" />
                </div>
              </Col>
              <Col lg="6" className="mt-lg-0 mt-5">
                <Row className="custom-border-right">
                  {CounterData.map((item, index) => (
                      <Col md="6" lg="6" xl="5" className="mb-3 mt-lg-0 box-custom-border" key={index}>
                        <CounterWithIcon customClass={(index === 1 || index === 3) ? "" : ""} counterIcon={item.counterIcon} counterValue={item.counterValue} counterText={item.counterText} />
                      </Col>
                  ))}
                </Row>
              </Col>
          </Row>
        </Container>
    </div>
  )
}
