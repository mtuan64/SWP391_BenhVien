import React, {useState} from 'react'
import { Col, Container, Row } from 'react-bootstrap';

// Images
import cardiacGallery1 from '/assets/images/cardiac/cardiac-gallery-1.jpg'
import cardiacGallery2 from '/assets/images/cardiac/cardiac-gallery-2.jpg'
import cardiacGallery3 from '/assets/images/cardiac/cardiac-gallery-3.jpg'
import cardiacGallery4 from '/assets/images/cardiac/cardiac-gallery-4.jpg'
import cardiacGallery5 from '/assets/images/cardiac/cardiac-gallery-5.jpg'
import cardiacGallery6 from '/assets/images/cardiac/cardiac-gallery-6.jpg'

// library
import FsLightbox from "fslightbox-react";

export default function CardiacGallary() {
    const [toggler, setToggler] = useState(false);
    const [toggler1, setToggler1] = useState(false);
    const [toggler2, setToggler2] = useState(false);
    const [toggler3, setToggler3] = useState(false);
    const [toggler4, setToggler4] = useState(false);
    const [toggler5, setToggler5] = useState(false);
  return (
    <div className="section-padding position-relative custom-gallery pt-0">
        <Container fluid className="position-relative p-md-0">
        <Row>
            <Col md="3">
                <div className="pb-4 gallery-overlay position-relative h-50">                  
                    <span type="button" data-fslightbox="gallery" className="h-100 gallery-overlay-box" onClick={() => setToggler(!toggler)}>
                    <img src={cardiacGallery1} className="img-fluid h-100 w-100" alt="profile-image" loading="lazy" />
                    <FsLightbox
                    toggler={toggler}
                    sources={[cardiacGallery1]}
                    />
                    <div className="view-image">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 20 17" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M13.1614 8.05311C13.1614 9.79911 11.7454 11.2141 9.99938 11.2141C8.25338 11.2141 6.83838 9.79911 6.83838 8.05311C6.83838 6.30611 8.25338 4.89111 9.99938 4.89111C11.7454 4.89111 13.1614 6.30611 13.1614 8.05311Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.998 15.3549C13.806 15.3549 17.289 12.6169 19.25 8.05292C17.289 3.48892 13.806 0.750916 9.998 0.750916H10.002C6.194 0.750916 2.711 3.48892 0.75 8.05292C2.711 12.6169 6.194 15.3549 10.002 15.3549H9.998Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    </span>
                </div>
                <div className="mb-md-0 mb-4 gallery-overlay position-relative h-50">                  
                    <span type="button" data-fslightbox="gallery" className="h-100 gallery-overlay-box" onClick={() => setToggler1(!toggler1)}>
                        <img src={cardiacGallery2} className="img-fluid h-100 w-100" alt="profile-image" loading="lazy" />
                        <FsLightbox
                        toggler={toggler1}
                        sources={[cardiacGallery2]}
                        />
                        <div className="view-image">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 20 17" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M13.1614 8.05311C13.1614 9.79911 11.7454 11.2141 9.99938 11.2141C8.25338 11.2141 6.83838 9.79911 6.83838 8.05311C6.83838 6.30611 8.25338 4.89111 9.99938 4.89111C11.7454 4.89111 13.1614 6.30611 13.1614 8.05311Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M9.998 15.3549C13.806 15.3549 17.289 12.6169 19.25 8.05292C17.289 3.48892 13.806 0.750916 9.998 0.750916H10.002C6.194 0.750916 2.711 3.48892 0.75 8.05292C2.711 12.6169 6.194 15.3549 10.002 15.3549H9.998Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </span>
                </div>
            </Col>
            <Col md="3">
                <div className="mb-md-0 mb-4 gallery-overlay position-relative h-100 py-4 py-md-0">                  
                    <span type="button" data-fslightbox="gallery" className="h-100 gallery-overlay-box" onClick={() => setToggler2(!toggler2)}>
                        <img src={cardiacGallery3} className="img-fluid h-100 w-100" alt="profile-image" loading="lazy" />
                        <FsLightbox
                        toggler={toggler2}
                        sources={[cardiacGallery3]}
                        />
                        <div className="view-image">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 20 17" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M13.1614 8.05311C13.1614 9.79911 11.7454 11.2141 9.99938 11.2141C8.25338 11.2141 6.83838 9.79911 6.83838 8.05311C6.83838 6.30611 8.25338 4.89111 9.99938 4.89111C11.7454 4.89111 13.1614 6.30611 13.1614 8.05311Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M9.998 15.3549C13.806 15.3549 17.289 12.6169 19.25 8.05292C17.289 3.48892 13.806 0.750916 9.998 0.750916H10.002C6.194 0.750916 2.711 3.48892 0.75 8.05292C2.711 12.6169 6.194 15.3549 10.002 15.3549H9.998Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </span>
                </div>
            </Col>
            <Col md="3">
                <div className="pb-4 gallery-overlay position-relative h-50">                  
                    <span type="button" data-fslightbox="gallery" className="h-100 gallery-overlay-box" onClick={() => setToggler3(!toggler3)}>
                    <img src={cardiacGallery4} className="img-fluid h-100 w-100" alt="profile-image" loading="lazy" />
                    <FsLightbox
                    toggler={toggler3}
                    sources={[cardiacGallery4]}
                    />
                    <div className="view-image">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 20 17" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M13.1614 8.05311C13.1614 9.79911 11.7454 11.2141 9.99938 11.2141C8.25338 11.2141 6.83838 9.79911 6.83838 8.05311C6.83838 6.30611 8.25338 4.89111 9.99938 4.89111C11.7454 4.89111 13.1614 6.30611 13.1614 8.05311Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.998 15.3549C13.806 15.3549 17.289 12.6169 19.25 8.05292C17.289 3.48892 13.806 0.750916 9.998 0.750916H10.002C6.194 0.750916 2.711 3.48892 0.75 8.05292C2.711 12.6169 6.194 15.3549 10.002 15.3549H9.998Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    </span>
                </div>
                <div className="mb-md-0 mb-4 gallery-overlay position-relative h-50">                  
                    <span type="button" data-fslightbox="gallery" className="h-100 gallery-overlay-box" onClick={() => setToggler4(!toggler4)}>
                        <img src={cardiacGallery5} className="img-fluid h-100 w-100" alt="profile-image" loading="lazy" />
                        <FsLightbox
                        toggler={toggler4}
                        sources={[cardiacGallery5]}
                        />
                        <div className="view-image">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 20 17" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M13.1614 8.05311C13.1614 9.79911 11.7454 11.2141 9.99938 11.2141C8.25338 11.2141 6.83838 9.79911 6.83838 8.05311C6.83838 6.30611 8.25338 4.89111 9.99938 4.89111C11.7454 4.89111 13.1614 6.30611 13.1614 8.05311Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M9.998 15.3549C13.806 15.3549 17.289 12.6169 19.25 8.05292C17.289 3.48892 13.806 0.750916 9.998 0.750916H10.002C6.194 0.750916 2.711 3.48892 0.75 8.05292C2.711 12.6169 6.194 15.3549 10.002 15.3549H9.998Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </span>
                </div>
            </Col>
            <Col md="3">
                <div className="gallery-overlay position-relative h-100 pt-4 pt-md-0">                  
                    <span type="button" data-fslightbox="gallery" className="h-100 gallery-overlay-box" onClick={() => setToggler5(!toggler5)}>
                        <img src={cardiacGallery6} className="img-fluid h-100 w-100" alt="profile-image" loading="lazy" />
                        <FsLightbox
                        toggler={toggler5}
                        sources={[cardiacGallery6]}
                        />
                        <div className="view-image">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 20 17" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M13.1614 8.05311C13.1614 9.79911 11.7454 11.2141 9.99938 11.2141C8.25338 11.2141 6.83838 9.79911 6.83838 8.05311C6.83838 6.30611 8.25338 4.89111 9.99938 4.89111C11.7454 4.89111 13.1614 6.30611 13.1614 8.05311Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M9.998 15.3549C13.806 15.3549 17.289 12.6169 19.25 8.05292C17.289 3.48892 13.806 0.750916 9.998 0.750916H10.002C6.194 0.750916 2.711 3.48892 0.75 8.05292C2.711 12.6169 6.194 15.3549 10.002 15.3549H9.998Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </span>
                </div>
            </Col>
        </Row>
        </Container>
    </div>
  )
}
