import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

// Widgets
import ScrollingText from '../../widgets/ScrollingText'
import Title from '../../widgets/Title'
import BeforeAfterImg from '../../widgets/BeforeAfterImg'

// Images
import beforeImg from '/assets/images/Dentist-Page/before-img.webp'
import afterImg from '/assets/images/Dentist-Page/after-img.webp'

export default function DentistResult() {
  return (
    <div className="bg-primary-subtle section-padding">
        <Container>
          <Row>
            <Col sm="12">
              <div className="text-center position-relative">
                <ScrollingText ScrollingText="Our result" />
                <Title subTitle="results" rightText="Here Comes The Best Result" />
                <BeforeAfterImg beforeImage={beforeImg} afterImage={afterImg} />
              </div>
            </Col>
          </Row>
        </Container>
    </div>
  )
}
