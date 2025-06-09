import React, { Fragment } from 'react'
import { Col, Container, Row, Image, Accordion } from 'react-bootstrap'

// Images
import audiologist from '/assets/images/service/audiologist.webp'

// widgets
import BreadCrumb from '../../components/partial/BreadCrumb'
import ServiceMenu from '../../components/widgets/ServiceMenu'
import ServiceSidebar from '../../components/widgets/ServiceSidebar'
import VideoPopup from '../../components/widgets/VideoPopup'
import Counter from '../../components/widgets/Counter'
import Progressbar from '../../components/widgets/Progressbar'
import Faq from '../../components/widgets/Faq'

// Json
import {faqData} from '../../staticData/faqData'

export default function Audiologist() {
  return (
    <Fragment>
      <BreadCrumb title="Audiologist" />
      <div className="section-padding service-details">
        <Container>
          <Row>
            <Col lg="4">
              <div className="bg-primary-subtle p-3 p-md-4">
                <div className="service-menu">
                  <ul className="list-inline m-0">
                    <li className="mb-3">
                      <ServiceMenu serviceUrl="/service/oncologist" serviceTitle="Oncologist" />
                    </li>
                    <li className="mb-3">
                      <ServiceMenu serviceUrl="/service/neurologist" serviceTitle="Neurologist" />
                    </li>
                    <li className="mb-3">
                      <ServiceMenu serviceUrl="/service/entspecialist" serviceTitle="ENT Specialist" />
                    </li>
                    <li className="mb-3">
                      <ServiceMenu serviceUrl="/service/cardiologist" serviceTitle="Cardiologist" />
                    </li>
                    <li className="mb-3">
                      <ServiceMenu isActive={true} serviceUrl="/service/audiologist" serviceTitle="Audiologist" />
                    </li>
                    <li className="mb-3">
                      <ServiceMenu serviceUrl="/service/psychiatrists" serviceTitle="Psychiatrists" />
                    </li>
                  </ul>
                </div>
              </div>
              <ServiceSidebar />
            </Col>
            <Col lg="8" className="mt-lg-0 mt-5">
              <div className="about-service">
                <div className="position-relative">
                  <Image src={audiologist} className="img-fluid" alt="image" />
                  <VideoPopup videoLinkUrl="https://www.youtube.com/watch?v=VeDdpy4CdeM" />
                </div>
                <div className="iq-title-box mt-5 mb-0">
                  <span className="iq-subtitle text-uppercase">DEPARTMENT</span>
                  <h3 className="iq-title iq-heading-title mb-2">
                     <span className="right-text text-capitalize fw-500">Audiologist </span>
                     <span className="left-text text-capitalize fw-light">Treatments</span>
                  </h3>
                  <p className="iq-title-desc text-body">
                     A cardiologist is a doctor that deals with the cardiovascular system. This means he or
                     she treats any abnormality in our blood vessels and heart. This can include heart disease or
                     condition which requires diagnosis and treatment.
                  </p>
               </div>
               <Row className="mt-5 align-items-center">
                <Col md="6">
                  <ul className="list-inline m-0">
                    <li className="mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <span className="text-primary"><i className="fas fa-check"></i></span>
                          <span>Treats minor illnesses</span>
                        </div>
                    </li>
                    <li className="mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <span className="text-primary"><i className="fas fa-check"></i></span>
                          <span>Answers health questions</span>
                        </div>
                    </li>
                    <li>
                        <div className="d-flex align-items-center gap-2">
                          <span className="text-primary"><i className="fas fa-check"></i></span>
                          <span>Conducts health checkups</span>
                        </div>
                    </li>
                  </ul>
                </Col>
                <Col md="6" className="mt-md-0 mt-2">
                  <ul className="list-inline m-0">
                    <li className="mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <span className="text-primary"><i className="fas fa-check"></i></span>
                          <span>Specialty physicians</span>
                        </div>
                    </li>
                    <li className="mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <span className="text-primary"><i className="fas fa-check"></i></span>
                          <span>Performs routine health tests</span>
                        </div>
                    </li>
                    <li>
                        <div className="d-flex align-items-center gap-2">
                          <span className="text-primary"><i className="fas fa-check"></i></span>
                          <span>List Items</span>
                        </div>
                    </li>
                  </ul>
                </Col>
               </Row>
               <div className="pt-5">
                  <Row className="mt-5 align-items-center">
                    <Col md="5">
                      <Counter counterValue="1000" counterTitle="Operations Done" counterText="Lorem Ipsum is simply dummy text of the
                        printing and typesetting." />
                    </Col>
                    <Col md="7" className="mt-md-0 mt-5">
                        <div>
                          <Progressbar progressTitle="Immunotherapy" progressValue="91" />
                        </div>
                        <div className="mt-5">
                          <Progressbar progressTitle="Hormone therapy" progressValue="84" />
                        </div>
                        <div className="mt-5">
                          <Progressbar progressTitle="Targeted drug therapy" progressValue="75" />
                        </div>
                    </Col>
                  </Row>
               </div>
               <div className="mt-5 pt-md-3 pb-5 border-bottom">
                  <div className="iq-title-box mt-5 mb-0">
                     <span className="iq-subtitle text-uppercase">TIPS & INFO</span>
                     <h4 className="iq-title iq-heading-title mb-2">
                        <span className="right-text text-capitalize fw-500">KiviCare Tips For Healthy </span>
                        <span className="left-text text-capitalize fw-light">Children And
                        Families</span>     
                     </h4>
                     <p className="iq-title-desc text-body">
                        Raising a family isn’t always easy. You are busy, and so are your children. There is a
                        lot to do in little time. But the stakes are high. Today, many kids are overweight or
                        obese. A healthy, active lifestyle can help maintain weight. It also can prevent health
                        issues, such as diabetes, heart disease, asthma, and high blood pressure.
                     </p>
                  </div>
               </div>
               <div className="mt-5 pt-3">
                  <div className="accordion" id="main-faq">
                    <Accordion defaultActiveKey={faqData[0]?.uniqid} className="mb-3">
                      {faqData.slice(0, 3).map((item, index) => (
                        <Faq key={index} uniqid={item.uniqid} faqTitle={item.faqTitle} faqdesc={item.faqdesc} />
                      ))}
                    </Accordion>
                </div>
               </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  )
}
