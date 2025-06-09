import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';

// Widgets
import CounterWithIcon from '../../widgets/CounterWithIcon';

export default function CardiacCounter() {
  const counterData = [
    {
        counterIcon: <i aria-hidden="true" className="flaticon flaticon-flaticon flaticon-government text-primary"></i>,
        counterValue: "75",
        counterText: "SPECIALIZED DR."
    },
    {
        counterIcon: <i aria-hidden="true" className="flaticon flaticon-flaticon flaticon-care text-primary"></i>,
        counterValue: "10",
        counterText: "AWARD WON"
    },
    {
        counterIcon: <i aria-hidden="true" className="flaticon flaticon-flaticon flaticon-rating text-primary"></i>,
        counterValue: "150",
        counterText: "APPOINTMENTS"
    },
    {
      counterIcon: <i aria-hidden="true" className="flaticon flaticon-flaticon flaticon-debit-card text-primary"></i>,
      counterValue: "250",
      counterText: "YOUNG VISITORS"
    }
  ]
  return (
    <div className="bg-secondary margin-negative-400 counter-white">
      <Container>
        <Row className="py-5">
          {counterData.map((item, index) => (
            <Col lg="3" key={index}>
              <CounterWithIcon counterIcon={item.counterIcon} counterValue={item.counterValue} counterText={item.counterText} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
)
}
