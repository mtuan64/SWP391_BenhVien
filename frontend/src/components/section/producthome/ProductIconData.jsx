import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

// Widgets
import IconboxColumn from '../../widgets/IconboxColumn';

// Images
import Traced from '/assets/images/product-home/Traced.png'
import back from '/assets/images/product-home/back.png'
import doller from '/assets/images/product-home/doller.png'

export default function ProductIconData() {
  const IconBoxData = [
    {
      iconboxImage: Traced,
      iconboxTitle: "Free Shipping Worldwide",
      iconboxDesc: "For all order over $200"
    },
    {
      iconboxImage: back,
      iconboxTitle: "Easy Return Avaliable",
      iconboxDesc: "Return product within 31 days"
    },
    {
      iconboxImage: doller,
      iconboxTitle: "Secure Payment",
      iconboxDesc: "Payment is 100% secure"
    },
    {
      iconboxImage: Traced,
      iconboxTitle: "Customer Support",
      iconboxDesc: "24 hours support avaliable"
    }
  ]
  return (
    <div className="section-padding px-0">
        <Container fluid>
            <Row className="gy-5">
              {IconBoxData.map((item, index) => (
                  <Col lg="3" sm="6" key={index}>
                    <IconboxColumn iconboxImage={item.iconboxImage} iconboxTitle={item.iconboxTitle} iconboxDesc={item.iconboxDesc} />
                </Col>
              ))}               
            </Row>
        </Container>
    </div>
  )
}
