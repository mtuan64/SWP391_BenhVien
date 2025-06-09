import React from 'react'
import { Col, Container, Row, Tabs, Tab, Image } from 'react-bootstrap';

// Widgets
import Title from '../../widgets/Title';
import ButtonLink from '../../widgets/ButtonLink';

// Images
import labTab1 from '/assets/images/laboratory/lab-tab-1.webp'
import labTab2 from '/assets/images/laboratory/lab-tab-2.webp'
import labTab3 from '/assets/images/laboratory/lab-tab-3.webp'
import labTab4 from '/assets/images/laboratory/lab-tab-4.webp'

export default function LaboratorySolution() {
  return (
    <div className="section-padding pb-0">
        <Container>
          <Title subTitle="Lab Solutions" rightText="Our Laboratory " leftText="Solutions" />
          <div className="tab-bottom-bordered tab-border-botton-style-2 border-0 mb-md-0 mb-5">
            <Tabs defaultActiveKey="lab-tab-1" id="uncontrolled-tab-example" className="mb-5 justify-content-lg-between justify-content-center gap-3 bg-transparent pe-0">
              <Tab eventKey="lab-tab-1" title="Experiment Research & Testing">
                <div className="iq-tab-fade-up pt-lg-5 pt-3">
                  <Row className="align-items-center">
                    <Col lg="6">
                      <Image src={labTab1} alt="lab-tab-1" className="img-fluid" />
                    </Col>
                    <Col lg="6" className="mt-lg-0 mt-5">
                      <div className="no-sub-title">
                        <div className="iq-title-box">
                          <h3 className="iq-title iq-heading-title">
                            <span className="right-text text-capitalize fw-500">Exploring Efficacy Of Research </span>
                            <span className="left-text text-capitalize fw-light">Through Experimentation</span>
                          </h3>
                          <p className="iq-title-desc text-body mt-3 mb-0" >
                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                          </p>
                        </div>
                      </div>
                      <ButtonLink buttonUrl="/about-us" buttonText="Read More" />
                    </Col>
                  </Row>
                </div>
              </Tab>
              <Tab eventKey="lab-tab-2" title="Advanced Sample Preparation">
                <div className="iq-tab-fade-up pt-lg-5 pt-3">
                  <Row className="align-items-center">
                    <Col lg="6">
                      <Image src={labTab2} alt="lab-tab-1" className="img-fluid" />
                    </Col>
                    <Col lg="6" className="mt-lg-0 mt-5">
                      <div className="no-sub-title">
                        <div className="no-sub-title">
                          <div className="iq-title-box">
                            <h3 className="iq-title iq-heading-title">
                              <span className="right-text text-capitalize fw-500">Decoding Data Interpreting Results </span>
                              <span className="left-text text-capitalize fw-light">With Precision</span>
                            </h3>
                            <p className="iq-title-desc text-body mt-3 mb-0" >
                              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                            </p>
                          </div>
                        </div>
                      </div>
                      <ButtonLink buttonUrl="/about-us" buttonText="Read More" />
                    </Col>
                  </Row>
                </div>
              </Tab>
              <Tab eventKey="lab-tab-3" title="Consistency Quality Control">
                <div className="iq-tab-fade-up pt-lg-5 pt-3">
                  <Row className="align-items-center">
                    <Col lg="6">
                      <Image src={labTab3} alt="lab-tab-1" className="img-fluid" />
                    </Col>
                    <Col lg="6" className="mt-lg-0 mt-5">
                      <div className="no-sub-title">
                        <div className="no-sub-title">
                          <div className="iq-title-box">
                            <h3 className="iq-title iq-heading-title">
                              <span className="right-text text-capitalize fw-500">Cutting Edge Techniques For </span>
                              <span className="left-text text-capitalize fw-light">Sample Preparation</span>
                            </h3>
                            <p className="iq-title-desc text-body mt-3 mb-0" >
                              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                            </p>
                          </div>
                        </div>
                      </div>
                      <ButtonLink buttonUrl="/about-us" buttonText="Read More" />
                    </Col>
                  </Row>
                </div>
              </Tab>
              <Tab eventKey="lab-tab-4" title="Results Interpretation">
                <div className="iq-tab-fade-up pt-lg-5 pt-3">
                  <Row className="align-items-center">
                    <Col lg="6">
                      <Image src={labTab4} alt="lab-tab-1" className="img-fluid" />
                    </Col>
                    <Col lg="6" className="mt-lg-0 mt-5">
                      <div className="no-sub-title">
                        <div className="no-sub-title">
                          <div className="iq-title-box">
                            <h3 className="iq-title iq-heading-title">
                              <span className="right-text text-capitalize fw-500">Ensuring Consistent Quality </span>
                              <span className="left-text text-capitalize fw-light">Control Standards</span>
                            </h3>
                            <p className="iq-title-desc text-body mt-3 mb-0" >
                              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                            </p>
                          </div>
                        </div>
                      </div>
                      <ButtonLink buttonUrl="/about-us" buttonText="Read More" />
                    </Col>
                  </Row>
                </div>
              </Tab>
            </Tabs>
          </div>
        </Container>
      </div>
  )
}
