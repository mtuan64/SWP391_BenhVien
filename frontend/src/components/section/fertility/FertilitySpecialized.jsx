import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

// Widgets
import Title from '../../widgets/Title'
import ScrollingText from '../../widgets/ScrollingText'
import IconboxBorder from '../../widgets/IconboxBorder'

// Images
import icon1 from '/assets/images/fertility-clinic/icon-1.svg'
import icon2 from '/assets/images/fertility-clinic/icon-2.svg'
import icon3 from '/assets/images/fertility-clinic/icon-3.svg'
import icon4 from '/assets/images/fertility-clinic/icon-4.svg'

export default function FertilitySpecialized() {
  const iconBoxData = [
    {
      iconImage: icon1,
      iconboxTitle: "Test Tube Baby",
      iconboxDesc: "KiviCare offers the best Embryo treatment and is best hospital for infertility treatments.",
      buttonUrl: "/service/service1"
    },
    {
      iconImage: icon2,
      iconboxTitle: "Infertility Treatment",
      iconboxDesc: "KiviCare offers the best Embryo treatment and is best hospital for infertility treatments.",
      buttonUrl: "/service/service1"
    },
    {
      iconImage: icon3,
      iconboxTitle: "Fertility Preservation",
      iconboxDesc: "KiviCare offers the best Embryo treatment and is best hospital for infertility treatments.",
      buttonUrl: "/service/service1"
    },
    {
      iconImage: icon4,
      iconboxTitle: "Surrogacy Treatment",
      iconboxDesc: "KiviCare offers the best Embryo treatment and is best hospital for infertility treatments.",
      buttonUrl: "/service/service1"
    }
  ]
  return (
    <div className="section-padding-top">
      <Container>
        <div className="text-center position-relative">
          <ScrollingText scrollTitle="Specialization" />
          <Title subTitle="specialities" rightText="Specialized Programs" />
        </div>
        <Row className="px-3">
          {iconBoxData.map((item, index) => (
            <Col lg="3" md="6" className="p-0" key={index}>
              <IconboxBorder iconImage={item.iconImage} iconboxTitle={item.iconboxTitle} iconboxDesc={item.iconboxDesc} buttonUrl={item.buttonUrl} />
            </Col>
          ))}              
        </Row>
      </Container>
    </div>
  )
}
