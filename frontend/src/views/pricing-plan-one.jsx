import React, { Fragment } from 'react'
import { Container, Row, Col } from 'react-bootstrap'


// Widgets
import BreadCrumb from '../components/partial/BreadCrumb';
import PricingStandard from '../components/widgets/PricingStandard';

// Images
import priceIcon1 from '/assets/images/skin-specialist/price-icon-1.png'
import priceIcon2 from '/assets/images/skin-specialist/price-icon-2.png'
import priceIcon3 from '/assets/images/skin-specialist/price-icon-3.png'


export default function PricingPlanOne() {
  const PriceTableData = [
    {
      pricingTitle: "Basic Package",
      priceValue: "$25",
      priceYear: "year",
      priceImage: priceIcon1,
      priceDescription: "It is a long established fact that a reader will be distracted by the readable content of a page .",
      list1: "Professional Calendar View",
      list2: "Free Google Analytics",
      list3: "limited Medicines",
      list4: "limited Exercise",
      list5: "limited Task and Comments",
    },
    {
      pricingTitle: "intermediate",
      priceValue: "$75",
      priceYear: "year",
      priceImage: priceIcon2,
      priceDescription: "It is a long established fact that a reader will be distracted by the readable content of a page .",
      list1: "Professional Calendar View",
      list2: "Free Google Analytics",
      list3: "limited Medicines",
      list4: "limited Exercise",
      list5: "limited Task and Comments",
    },
    {
      pricingTitle: "Advanced",
      priceValue: "$99",
      priceYear: "year",
      priceImage: priceIcon3,
      priceDescription: "It is a long established fact that a reader will be distracted by the readable content of a page .",
      list1: "Professional Calendar View",
      list2: "Free Google Analytics",
      list3: "limited Medicines",
      list4: "limited Exercise",
      list5: "limited Task and Comments",
    }
  ]

  return (
    <Fragment>
      <BreadCrumb title="Pricing Plan" />
      <div className="section-padding">
        <Container>
          <Row className="gy-5">
            {PriceTableData.map((item, index) => (
              <Col lg="4" md={`${index === PriceTableData.length-1 ? "12" : "6"}`} key={index}>
                <PricingStandard isActive={index == 1} pricingTitle={item.pricingTitle} priceValue={item.priceValue} priceYear={item.priceYear} priceImage={item.priceImage} priceDescription={item.priceDescription} list1={item.list1} list2={item.list2} list3={item.list3} list4={item.list4} list5={item.list5} />
              </Col>
            ))}    
          </Row>
        </Container>
      </div>
    </Fragment>
  )
}
