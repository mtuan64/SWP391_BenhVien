import React from 'react'
import { Col, Container, Row, Image } from 'react-bootstrap'

// Widget
import Title from '../../widgets/Title'
import ScrollingText from '../../widgets/ScrollingText'
import ButtonBox from '../../widgets/ButtonBox'

// Images
import aboutusright from '/assets/images/general/about-us-right.webp'
import signature from '/assets/images/general/signature.png'

export default function HomeAbout() {
  const aboutListData = [
    {
        listTitle: "Treats minor illnesses"
    },
    {
        listTitle: "Answers health questions"
    },
    {
        listTitle: "Conducts health checkups"
    },
    {
        listTitle: "Performs routine health tests"
    },
    {
        listTitle: "Orthopaedic surgeon"
    },
    {
        listTitle: "Endocrinologist"
    }
]
  return (
    <div className="bg-secondary-subtle section-padding">
        <Container className="position-relative">
            <ScrollingText scrollTitle="about us" />
            <Row>
                <Col lg="5" md="12">
                    <Title subTitle="about kiviCare" rightText="Welcome To KiviCare " leftText="Central Hospital" titleDescription="It is a long established fact that a reader
    will be distracted by the readable content." />

                    <div className="pt-lg-1 me-lg-5 pe-lg-5">
                        <div className="mt-5 working-hour bg-primary text-white p-3 p-md-5 me-lg-5">
                            <div className="display-4 mb-3">
                                <i className="far fa-clock"></i>
                            </div>
                            <h4 className="text-white mb-5">Opening Time</h4>
                            <ul className="list-inline m-0">
                                <li className="mb-3 pb-3 border-bottom d-flex align-items-center justify-content-between">
                                    <span>Monday - Friday</span>
                                    <span>6:00 - 7:00 pm</span>
                                </li>
                                <li className="mb-3 pb-3 border-bottom d-flex align-items-center justify-content-between">
                                    <span>Saturday</span>
                                    <span>8:00 - 9:00 pm </span>
                                </li>
                                <li className="d-flex align-items-center justify-content-between">
                                    <span>Sunday</span>
                                    <span>Closed</span>
                                </li>
                            </ul>
                        </div>
                    </div>   
                </Col>
                <Col lg="3" md="6" className="mt-5 mt-lg-0">
                    <div className="iq-list d-flex justify-content-between flex-column h-100">
                        <ul className="iq-list-with-icon ps-0">
                            {aboutListData.map((item, index) => (
                                <li className="d-flex align-items-center gap-2 mb-3" key={index}>
                                    <span className="text-secondary">
                                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                            d="M2.59695 0.0379703C1.96118 0.143694 1.43245 0.425953 0.931049 0.927357C0.417642 1.44076 0.148371 1.95322 0.0397285 2.62375C-0.0132428 2.95081 -0.0132428 11.0523 0.0397285 11.3794C0.148371 12.0499 0.417642 12.5623 0.931049 13.0758C1.45007 13.5948 1.96808 13.8644 2.64799 13.9694C2.82029 13.996 4.26339 14.0049 7.16941 13.9975L11.4378 13.9865L11.7003 13.9055C12.2771 13.7275 12.7083 13.4735 13.0885 13.088C13.4916 12.6792 13.737 12.2647 13.9056 11.7077C13.987 11.4385 13.9886 11.3982 14.0009 9.23766C14.0091 7.79777 14.0004 6.99291 13.9756 6.9009C13.9548 6.82371 13.88 6.69296 13.8092 6.61033C13.4661 6.20947 12.8337 6.27331 12.5616 6.73626L12.4593 6.91035L12.441 9.09925L12.4228 11.2882L12.3066 11.5334C12.1451 11.8743 11.9069 12.117 11.5706 12.2832L11.2956 12.4191H7.00714H2.71865L2.47338 12.3029C2.1325 12.1414 1.88982 11.9032 1.72365 11.5669L1.58772 11.2919V7.00345V2.71496L1.70391 2.46969C1.86534 2.12888 2.10361 1.88613 2.43975 1.71996L2.71471 1.58403L4.9603 1.56579L7.2059 1.54755L7.36846 1.45634C7.61281 1.31924 7.74644 1.10557 7.76443 0.823275C7.78096 0.563781 7.71124 0.382248 7.52847 0.208777C7.30031 -0.00774129 7.35492 -0.00332719 4.97256 0.00134246C3.77304 0.00367729 2.70402 0.0201672 2.59695 0.0379703ZM13.7726 0.807514C13.6449 0.839691 13.2121 1.25828 10.3161 4.1504L7.00543 7.45644L5.64641 6.10225C4.18011 4.64115 4.18047 4.64141 3.8313 4.67497C3.58297 4.69883 3.39371 4.80886 3.25883 5.00772C3.12075 5.21133 3.07945 5.43211 3.13786 5.65432C3.17602 5.79956 3.35091 5.98715 4.86479 7.50704C5.99438 8.64115 6.59731 9.2207 6.69515 9.26648C6.87318 9.34981 7.10765 9.35532 7.28915 9.28042C7.45817 9.21067 14.5982 2.092 14.7053 1.88646C14.7958 1.71281 14.7965 1.41406 14.7068 1.21662C14.6213 1.02837 14.4111 0.854029 14.208 0.802881C14.0253 0.756878 13.9712 0.757425 13.7726 0.807514Z"
                                            fill="currentColor" />
                                        </svg>
                                    </span>
                                    <span className="text-capitalize text-body">{item.listTitle}</span>
                                </li>
                            ))}                                
                        </ul>
                        <div className="bottom-part">
                            <Image src={signature} alt="" className="img-fluid mb-5" />
                            <h4 className="mt-5 mb-2 fw-normal">Briar Ford</h4>
                            <p className="text-primary font-size-14 text-uppercase fw-500">CEO & Founder</p>
                            <ButtonBox buttonUrl="appointment" buttonText="Get Appointment" />
                        </div>
                    </div>
                </Col>
                <Col lg="4" md="6" className="mt-5 mt-lg-0 text-lg-end text-center">
                    <Image src={aboutusright} alt="" className="img-fluid d-none d-lg-block d-md-block" />
                </Col>
            </Row>
        </Container>
    </div>
  )
}
