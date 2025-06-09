import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap';

// Widgets
import Title from '../../widgets/Title';
import ScrollingText from '../../widgets/ScrollingText';
import Progressbar from '../../widgets/Progressbar';

// Images
import signature from '/assets/images/general/signature.png'
import aboutBanner from '/assets/images/pages/about-banner.webp'

export default function AboutUsBlock() {
    const prograssData = [
        {
          progressTitle: "Successful Operations",
          progressValue: "80"
        },
        {
          progressTitle: "Empathy for Patients",
          progressValue: "90"
        },
        {
          progressTitle: "Hygiene",
          progressValue: "100"
        }
    ]
  return (
    <div className="bg-primary-subtle section-padding">
        <Container className="position-relative">
        <Row>
            <Col md="6" className="pe-md-5">
            <ScrollingText scrollTitle="about us" />
            <Title subTitle="about kivicare" rightText="Health " leftText="Commitments" titleDescription="We are ready to provide you with any Medical, health and fitness help as well as prepare a business plan. We are ready to provide you with any Medical, health and fitness help as well as prepare a business plan." />
            <div className="block-progressbar">
                <ul className="list-inline m-0">
                {prograssData.map((item, index) => (
                    <li className="mb-4" key={index}>
                    <Progressbar progressTitle={item.progressTitle} progressValue={item.progressValue} />
                    </li>
                ))}                    
                </ul>
            </div>
            <div className="d-flex gap-4 mt-5 flex-column flex-lg-row mb-5 mb-md-0">
                <div>
                <h4 className="fw-normal">Briar Ford</h4>
                <p className="text-primary text-uppercase fw-bold">CEO & Founder</p>
            </div>
            <div className="sign-image">
                <Image src={signature} alt="" className="img-fluid mb-5" />
            </div>
            </div>
            </Col>
            <Col md="6">
            <Image src={aboutBanner} alt="banner" className="img-fluid" />
            </Col>
        </Row>
        </Container>
    </div>
  )
}
