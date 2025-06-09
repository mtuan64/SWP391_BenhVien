import React, { Fragment } from 'react'
import { Container, Row, Col, Accordion } from "react-bootstrap";
import Image from 'react-bootstrap/Image';

// images
import relationshipIssue from '/assets/images/service/relationship-issue.webp';

// widget
import BreadCrumb from '../../components/partial/BreadCrumb';
import BlogSidebar from '../../components/widgets/BlogSidebar';
import Faq from '../../components/widgets/Faq';
import Counter from '../../components/widgets/Counter';
import Progressbar from '../../components/widgets/Progressbar';

// Json
import { faqData } from '../../staticData/faqData'

export default function ServiceDetail() {
  const listData = [
    {
      icon: <i className="fas fa-check"></i>,
      text: 'Treats minor illnesse'
    },
    {
      icon: <i className="fas fa-check"></i>,
      text: 'Answers health questions'
    },
    {
      icon: <i className="fas fa-check"></i>,
      text: 'Conducts health checkups'
    },
    {
      icon: <i className="fas fa-check"></i>,
      text: 'Specialty physicians'
    },
    {
      icon: <i className="fas fa-check"></i>,
      text: 'Performs routine health tests'
    },
    {
      icon: <i className="fas fa-check"></i>,
      text: 'List Items'
    },
  ] 

  return (
    <Fragment>
      <BreadCrumb title="Service Detail" />

      <div className="section-padding service-details">
        <Container>
          <Row>
            <Col lg="8">
              <div className="about-service">
                <div className="position-relative">
                  <Image src={relationshipIssue} className="img-fluid" alt="image"/>
                </div>
                <div className="iq-title-box mt-5 mb-0">
                  <span className="iq-subtitle text-uppercase">reationship issue</span>
                  <h3 className="iq-title iq-heading-title mb-2">
                    <span className="right-text text-capitalize fw-500 me-0">Psychiatrist</span>
                    <span className="left-text text-capitalize fw-light"> Treatments</span>
                  </h3>
                  <p className="iq-title-desc text-body mb-0" >
                    A cardiologist is a doctor that deals with the cardiovascular system. This means he or she treats any abnormality in our blood vessels and heart. This can include heart disease or condition which requires diagnosis and treatment.
                  </p>
                </div>
                <Row className="mt-5 align-items-center">
                  <Col md="6">
                    <ul className="list-inline m-0">
                      {listData.slice(0,3).map((item, index) => (
                        <li className={`${index == 2 ? "mb-0" : "mb-2"}`} key={index}>
                          <div className="d-flex align-items-center gap-2">
                            <span className="text-primary">{item.icon}</span>
                            <span>{item.text}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </Col>
                  <Col md="6" className="mt-md-0 mt-2">
                    <ul className="list-inline m-0">
                      {listData.slice(3, 6).map((item, index) => (
                        <li className={`${index == 2 ? "mb-0" : "mb-2"}`} key={index}>
                          <div className="d-flex align-items-center gap-2">
                            <span className="text-primary">{item.icon}</span>
                            <span>{item.text}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </Col>
                </Row>
                <div className="pt-5">
                  <Row className="mt-5 align-items-center">
                    <Col md="5">
                      <Counter counterValue="1000" counterTitle="Operations Done" counterText="Lorem Ipsum is simply dummy text of the printing and typesetting." />
                    </Col>
                    <Col md="7" className="mt-md-0 mt-5">
                      <div>
                        <Progressbar progressTitle="Immunotherapy" progressValue="91" />
                      </div>
                      <div className="mt-5">
                        <Progressbar progressTitle="Hormonetherapy" progressValue="84" />
                      </div>
                      <div className="mt-5">
                        <Progressbar progressTitle="Targeted drug therapy" progressValue="75" />
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="mt-5 pt-md-3 pb-5 border-bottom">
                  <div className="iq-title-box mt-5 mb-0">
                    <span className="iq-subtitle text-uppercase">tips & info</span>
                    <h3 className="iq-title iq-heading-title">
                      <span className="right-text text-capitalize fw-500">KiviCare Tips For Healthy </span>
                      <span className="left-text text-capitalize fw-light">Children And
                        Families</span>
                    </h3>
                    <p className="iq-title-desc text-body mb-0" >
                      Raising a family isn’t always easy. You are busy, and so are your children. There is a
                      lot to do in little time. But the stakes are high. Today, many kids are overweight or
                      obese. A healthy, active lifestyle can help maintain weight. It also can prevent health
                      issues, such as diabetes, heart disease, asthma, and high blood pressure.
                    </p>
                  </div>
                </div>
                <div className="accordion mt-5 pt-3" id="main-faq">
                  <Accordion defaultActiveKey={faqData[0]?.uniqid} className="mb-3">
                    {faqData.slice(0, 3).map((item, index) => (
                      <Faq key={index} uniqid={item.uniqid} faqTitle={item.faqTitle} faqdesc={item.faqdesc} />
                    ))}
                  </Accordion>
                </div> 
              </div>
            </Col>
            <Col lg="4" className="mt-lg-0 mt-5">
              <BlogSidebar />
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>

  )
}
