import React from 'react'
import { Container } from 'react-bootstrap';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

// Widgets
import Title from '../../widgets/Title';
import ServiceSliderSideContent from '../../widgets/ServiceSliderSideContent';

// Images
import coronaryHeart from '/assets/images/service/coronary-heart.webp'
import relationshipIssue from '/assets/images/service/relationship-issue.webp'
import bipolorDisorder from '/assets/images/service/bipolor-disorder.webp'
import Depression from '/assets/images/service/Depression.webp'
import CoupleTherapy from '/assets/images/service/Couple-therapy.webp'


export default function LaboratoryService() {
  
  const serviceData = [
    {
      serviceImage: coronaryHeart,
      serviceTitle: "Bipolor Disorder",
      serviceDesc: "there are many variations of Lorem Ipsum available, but the majority have suffered alteration in some form",
      btnUrl: "/service/service-detail",
    },
    {
      serviceImage: relationshipIssue,
      serviceTitle: "Relationship Issue",
      serviceDesc: "there are many variations of Lorem Ipsum available, but the majority have suffered alteration in some form",
      btnUrl: "/service/service-detail",
    },
    {
      serviceImage: bipolorDisorder,
      serviceTitle: "Bipolor Disorder",
      serviceDesc: "there are many variations of Lorem Ipsum available, but the majority have suffered alteration in some form",
      btnUrl: "/service/service-detail",
    },
    {
      serviceImage: Depression,
      serviceTitle: "Depression",
      serviceDesc: "there are many variations of Lorem Ipsum available, but the majority have suffered alteration in some form",
      btnUrl: "/service/service-detail",
    },
    {
      serviceImage: CoupleTherapy,
      serviceTitle: "Couple Therapy",
      serviceDesc: "there are many variations of Lorem Ipsum available, but the majority have suffered alteration in some form",
      btnUrl: "/service/service-detail",
    }
  ]

    // slider
    function sliderCustomWidth(swiper) {
      if (window.innerWidth > 1199) {
        const activeIndex = swiper.activeIndex;
        const innerTranslate = -(327 + 30) * activeIndex + 357;
        document.querySelector(".iq-service-slider .swiper-wrapper").style.transform = "translate3d(" + innerTranslate + "px, 0, 0)";
        const slides = document.querySelectorAll('.iq-service-slider .swiper-slide');
        slides.forEach(function (slide) {
          slide.style.width = slide.classList.contains('swiper-slide-active') ? "685px" : "327px";
        });
      } else if (window.innerWidth < 1199 && window.innerWidth >= 768) {
        const slides = document.querySelectorAll('.iq-service-slider .swiper-slide');
        slides.forEach(function (slide) {
          slide.style.width = "50%";
        });
      } else if (window.innerWidth < 768) {
        const slides = document.querySelectorAll('.iq-service-slider .swiper-slide');
        slides.forEach(function (slide) {
          slide.style.width = "100%";
        });
      }
    }

  return (
    <div className="section-padding">
      <Container>
        <div className="text-center">
            <Title subTitle="KiviCare Services" rightText="Path Of Advanced " leftText="Testing" />
        </div>
        <div className="overflow-hidden position-relative">
          <Swiper
            modules={[Autoplay]}
            className="iq-service-slider cust-swiper-wrapper"
            loop={true}
            spaceBetween={30}
            slidesPerView={'auto'}
            speed={1000}
            autoplay={{
              delay: 2500,
            }}
            breakpoints={{
              0: {
                centeredSlides: false,
              },
              768: {
                centeredSlides: false,
              },
              1200: {
                centeredSlides: true,
              }
            }}

            onSlideChangeTransitionStart={sliderCustomWidth}
            onResize={sliderCustomWidth}
          >
            {serviceData.map((item, index) => (
              <SwiperSlide key={index}>
                <ServiceSliderSideContent serviceImage={item.serviceImage} serviceTitle={item.serviceTitle} serviceDesc={item.serviceDesc} btnUrl={item.btnUrl} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </div>
  )
}
