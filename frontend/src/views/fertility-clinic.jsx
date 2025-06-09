import React, { Fragment, useLayoutEffect } from 'react'

// Components
import FertilityBanner from '../components/section/fertility/FertilityBanner';
import FertilitySpecialized from '../components/section/fertility/FertilitySpecialized';
import FertilityAbout from '../components/section/fertility/FertilityAbout';
import FertilityService from '../components/section/fertility/FertilityService';
import FertilityCounter from '../components/section/fertility/FertilityCounter';
import GlobalTeamOverlap from '../components/section/global/GlobalTeamOverlap';
import FertilityTestimonial from '../components/section/fertility/FertilityTestimonial';
import FertilityContact from '../components/section/fertility/FertilityContact';
import GlobalBlogColumnGrid from '../components/section/global/GlobalBlogColumnGrid';

export default function FertilityClinic() {

  const css = `
  :root {
    --bs-primary: #d45ba1;
    --bs-primary-bg-subtle: #f7eaf1;
    --bs-primary-rgb: 212, 91, 161;
    --bs-secondary: #171c26;
    --bs-secondary-bg-subtle: #e7e8e9;
    --bs-secondary-rgb: 23, 28, 38;
    --bs-primary-shade-20: #c01478;
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
      {/* Banner */}
      <FertilityBanner />

      {/* Specialities */}
      <FertilitySpecialized />

      {/* Parenthood clinic */}
      <FertilityAbout />

      {/* Services */}
      <FertilityService />

      {/* Counter */}
      <FertilityCounter />

      {/* Our Team */}
      <GlobalTeamOverlap />

       {/* testimonial */}
       <FertilityTestimonial />

      {/* Contact Us */}
      <FertilityContact />

      {/* Blog */}
      <GlobalBlogColumnGrid />

    </Fragment>
  )
}
