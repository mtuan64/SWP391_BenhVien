import React, { Fragment, useLayoutEffect } from 'react'

// Components
import DentistBanner from '../components/section/dentist/DentistBanner';
import DentistAbout from '../components/section/dentist/DentistAbout';
import DentistClinic from '../components/section/dentist/DentistClinic';
import DentistVideo from '../components/section/dentist/DentistVideo';
import DentistService from '../components/section/dentist/DentistService';
import DentistGallery from '../components/section/dentist/DentistGallery';
import DentistResult from '../components/section/dentist/DentistResult';
import GlobalTeamStandard from '../components/section/global/GlobalTeamStandard';
import DentistTestimonial from '../components/section/dentist/DentistTestimonial';
import GlobalClientSlider from '../components/section/global/GlobalClientSlider';
import GlobalBlogSimple from '../components/section/global/GlobalBlogSimple';

export default function Dentist() {
  const css = `
    :root {
      --bs-primary: #1dbfcc;
      --bs-primary-bg-subtle: #e3f4f5;
      --bs-primary-rgb: 29, 191, 204;
      --bs-primary-shade-20: #10949f;
      --bs-secondary: #171c26;
      --bs-secondary-bg-subtle: #e3e4e6;
      --bs-secondary-rgb: 23, 28, 38;
    }
    `;

    useLayoutEffect(() => {
      // Create a new style element
      const styleElement = document.createElement('style');
  
      // Set the CSS text of the style element
      styleElement.textContent = css;
  
      // Append the style element to the head of the document
      let content = document.head.appendChild(styleElement);
      return () => {
        content.remove()
      }
    })

  return (
    <Fragment>
      {/* Banner Section */}
      <DentistBanner />

      {/* About KiviCare */}
      <DentistAbout />

      {/* Working Hour */}
      <DentistClinic />

      {/* Video Popup */}
      <DentistVideo />

      {/* service */}
      <DentistService />

      {/* gallary */}
      <DentistGallery />

      {/* after/before */}
      <DentistResult />

      {/* Team */}
      <GlobalTeamStandard />

      {/* Testimonial */}
      <DentistTestimonial />

      {/* Brand Logo */}
      <div className="client-bg ">
        <GlobalClientSlider />
      </div>
      {/* Blogs */}
      <GlobalBlogSimple />

    </Fragment>
  )
}
