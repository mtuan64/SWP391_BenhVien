import React, { Fragment, useLayoutEffect } from 'react'

// Components
import LaboratoryBanner from '../components/section/laboratory/LaboratoryBanner';
import LaboratoryAbout from '../components/section/laboratory/LaboratoryAbout';
import LaboratoryService from '../components/section/laboratory/LaboratoryService';
import LaboratoryWhatDo from '../components/section/laboratory/LaboratoryWhatDo';
import LaboratorySolution from '../components/section/laboratory/LaboratorySolution';
import LaboratoryTestimonial from '../components/section/laboratory/LaboratoryTestimonial';
import LaboratoryCall from '../components/section/laboratory/LaboratoryCall';
import GlobalBlogOverlap from '../components/section/global/GlobalBlogOverlap';
import GlobalBlogBoxCard from '../components/section/global/GlobalBlogBoxCard';

export default function Laboratory() {

  const css = `
  :root {
    --bs-primary: #86bbd8;
    --bs-primary-bg-subtle: #eef4f6;
    --bs-primary-rgb: 134, 187, 216;
    --bs-primary-shade-10: #eef4f7;
    --bs-primary-shade-20: #528fb0;
    --bs-secondary: #336699;
    --bs-secondary-rgb: 15, 102, 153;
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
      <LaboratoryBanner />

      {/* About Us */}
      <LaboratoryAbout />

      {/* Service */}
      <LaboratoryService />

      {/* What We do */}
      <LaboratoryWhatDo />

      {/* solutions */}
      <LaboratorySolution />

      {/* Testimonail */}
      <LaboratoryTestimonial />

      {/* Call */}
      <LaboratoryCall />

      {/* Blog */}
      <GlobalBlogBoxCard />

    </Fragment>
  )
}
