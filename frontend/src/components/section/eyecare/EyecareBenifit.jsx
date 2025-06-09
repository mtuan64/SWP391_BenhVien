import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

// Widgets
import Title from '../../widgets/Title'
import IconboxTransprent from '../../widgets/IconboxTransprent'

// Images
import eye02 from '/assets/images/eye-care/eye-02.webp'
import eye03 from '/assets/images/eye-care/eye-03.webp'
import eye04 from '/assets/images/eye-care/eye-04.webp'
import eye05 from '/assets/images/eye-care/eye-05.webp'

export default function EyecareBenifit() {
  const IconBoxData = [
    {
        iconImage: eye03,
        iconboxTitle: "Qualified Doctors",
        iconboxDesc: "It is a long established fact that a will be distracted by the readable content of a page looking at its layout.",
        buttonUrl: "/service/oncologist"
    },
    {
        iconImage: eye04,
        iconboxTitle: "Work Improvements",
        iconboxDesc: "It is a long established fact that a will be distracted by the readable content of a page looking at its layout.",
      buttonUrl: "/service/entspecialist"
    },
    {
        iconImage: eye05,
        iconboxTitle: "Restoring Confidence",
        iconboxDesc: "It is a long established fact that a will be distracted by the readable content of a page looking at its layout.",
        buttonUrl: "/service/neurologist"
    }
  ]
  return (
    <div className="section-padding-bottom">
      <Container>
        <div className="box-card-main benefits-main">
          <Row className="align-items-center">
            <Col xl="4" lg="5">
              <Title subTitle="BENEFITS" leftText="With KiviCare" rightText="Best Benefits " />
            </Col>
            <Col xl="6" lg="7" className="mb-5 mb-lg-0">
              <p className="mb-0">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its </p>
            </Col>
          </Row>
          <Row>
            {IconBoxData.map((item, index) => (
              <Col lg="4" md="6" key={index} className={`${index === IconBoxData.length - 1 && "mt-0 mt-md-5 mt-lg-0"}`}>
                <div className="box-transparent no-img-bg pe-lg-5">
                  <IconboxTransprent iconImage={item.iconImage} iconboxTitle={item.iconboxTitle} iconboxDesc={item.iconboxDesc} buttonUrl={item.buttonUrl} />
                </div>
              </Col>
            ))} 
          </Row>
        </div>
      </Container>
    </div>
  )
}
