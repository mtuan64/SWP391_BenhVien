import React, { Fragment, useLayoutEffect } from 'react'

// Components
import EyecareBanner from '../components/section/eyecare/EyecareBanner';
import EyecareBenifit from '../components/section/eyecare/EyecareBenifit';
import EyecareAbout from '../components/section/eyecare/EyecareAbout';
import GlobalTeamStandard from '../components/section/global/GlobalTeamStandard';
import EyecareService from '../components/section/eyecare/EyecareService';
import EyecareIconBox from '../components/section/eyecare/EyecareIconBox';
import EyecareTestimonial from '../components/section/eyecare/EyecareTestimonial';
import GlobalBlogOverlap from '../components/section/global/GlobalBlogOverlap';
import EyecareContact from '../components/section/eyecare/EyecareContact';

export default function EyeCare() {
  const css = `
    :root {
      --bs-primary: #5ab88a;
      --bs-primary-bg-subtle: #e9f3ef;
      --bs-primary-rgb: 90, 184, 138;
      --bs-primary-shade-20: #50a87d;
      --bs-secondary: #171c26;
      --bs-secondary-bg-subtle: #d4dedb;
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
      {/* banner */}
      <EyecareBanner />

      {/* benefits section */}
      <EyecareBenifit />

      {/* About us */}
      <EyecareAbout />

      {/* Team */}
      <GlobalTeamStandard />

      {/* services */}
      <EyecareService />

      {/* care service */}
      <EyecareIconBox />

      {/* Testimonial */}
      <EyecareTestimonial />

      {/* blog */}
      <GlobalBlogOverlap />

      {/* schedule */}
      <EyecareContact />

    </Fragment>
  )
}
