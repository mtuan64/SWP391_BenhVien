import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

// Widgets
import CircleProgressbarWhite from '../../widgets/CircleProgressbarWhite'
import ButtonBox from '../../widgets/ButtonBox'
import IconboxBorder from '../../widgets/IconboxBorder'

// Images
import cleanIcon from '/assets/images/Dentist-Page/clean-icon.svg'
import HighestRatedDentistry from '/assets/images/Dentist-Page/Highest-rated-dentistry.svg'
import careSchedule from '/assets/images/Dentist-Page/care-schedule.svg'
import pricing from '/assets/images/Dentist-Page/pricing.svg'

export default function DentistAbout() {
    const iconBoxData = [
        {
          iconImage: cleanIcon,
          iconboxTitle: "Clean & modern studios",
          iconboxDesc: "There are many variations of passages of Lorem Ipsum available but the majority",
        },
        {
          iconImage: HighestRatedDentistry,
          iconboxTitle: "Highest-rated dentistry",
          iconboxDesc: "There are many variations of passages of Lorem Ipsum available but the majority",
        },
        {
          iconImage: careSchedule,
          iconboxTitle: "Care On Your Schedule",
          iconboxDesc: "There are many variations of passages of Lorem Ipsum available but the majority",
        },
        {
          iconImage: pricing,
          iconboxTitle: "Transparent care and pricing",
          iconboxDesc: "There are many variations of passages of Lorem Ipsum available but the majority",
        }
    ]

  return (
    <div className="bg-dentist-dark px-3">
        <Container className="position-relative">
          <Row className="align-items-center">
            <Col lg="6" className="section-padding">
              <div className="iq-title-box text-white pe-lg-5 mb-0">
                <span className="iq-subtitle text-uppercase text-white">about kiviCare</span>
                <h2 className="iq-title iq-heading-title text-white">
                    <span className="right-text text-capitalize fw-500">A perfect smile </span>
                    <span className="left-text text-capitalize fw-light">Guaranteed by kiviCare</span>
                </h2>
                <p className="iq-title-desc text-white pb-4">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                    laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                </p>
                <Row>
                  <Col sm="6">
                    <CircleProgressbarWhite progressId="circle-progress-1" progressValueNumber="50" progressSubtitle="Dental" progressTitle="Dental Care" />
                  </Col>
                  <Col sm="6" className="mt-sm-0 mt-5">
                    <CircleProgressbarWhite progressId="circle-progress-2" progressValueNumber="70" progressSubtitle="Smile" progressTitle="Sweet Smile" />
                  </Col>
                </Row>
                <div className="padding-top-80 button-white">
                  <ButtonBox buttonUrl="/appointment" buttonText="Get appointment" />
                </div>
              </div>
            </Col>
            <Col lg="6" className="section-padding py-lg-0 pt-0">
              <Row className="iconbox-border-hover gx-0">
                {iconBoxData.map((item, index) => (
                  <div className={`col-sm-6 ${index === 0 ? "mt-0" : "mt-5 mt-lg-0"} ${index === 1 ? "mt-md-0 mt-5" : ""}`} key={index}>
                    <IconboxBorder isButtonHide={true} iconImage={item.iconImage} iconboxTitle={item.iconboxTitle} iconboxDesc={item.iconboxDesc} />
                  </div>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
  )
}
