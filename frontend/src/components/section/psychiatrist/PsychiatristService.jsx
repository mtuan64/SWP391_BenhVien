import React, {useEffect, useRef} from 'react'
import { Container } from 'react-bootstrap';

// sweiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Pagination} from 'swiper/modules';
import 'swiper/swiper-bundle.css';

// Widgets
import ScrollingText from '../../widgets/ScrollingText';
import Title from '../../widgets/Title';
import ServiceSlider from '../../widgets/ServiceSlider';

// Images
import coupleTherapyLab from '/assets/images/service/couple-therapy-lab.svg'
import coupleTherapyHover from '/assets/images/service/couple-therapy-hover.svg'
import bipolarDisorderLab from '/assets/images/service/bipolar-disorder-lab.svg'
import bipolarDisorderHover from '/assets/images/service/bipolar-disorder-hover.svg'
import anxietyStressLab from '/assets/images/service/anxiety-stress-lab.svg'
import anxietyStressHover from '/assets/images/service/anxiety-stress-hover.svg'
import depressionLab from '/assets/images/service/depression-lab.svg'
import depressionLabHover from '/assets/images/service/depression-hover.svg'

// Redux Selector / Action
import { useSelector } from 'react-redux';
import { theme_scheme_direction } from '../../../store/setting/selectors';

export default function PsychiatristService() {
  const themeSchemeDirection = useSelector(theme_scheme_direction);
  
  const serviceIconData = [
    {
      serviceIcon: coupleTherapyLab,
      serviceIconHover: coupleTherapyHover,
      serviceTitle: "Couple Therapy",
      serviceDesc: "unde omnis iste natus error sit volupta accusant dolore rem aperiam",
      btnUrl: "/service/service-detail"
    },
    {
      serviceIcon: bipolarDisorderLab,
      serviceIconHover: bipolarDisorderHover,
      serviceTitle: "Bipolar Disorder",
      serviceDesc: "unde omnis iste natus error sit volupta accusant dolore rem aperiam",
      btnUrl: "/service/service-detail"
    },
    {
      serviceIcon: anxietyStressLab,
      serviceIconHover: anxietyStressHover,
      serviceTitle: "Anxiety & Stres",
      serviceDesc: "unde omnis iste natus error sit volupta accusant dolore rem aperiam",
      btnUrl: "/service/service-detail"
    },
    {
      serviceIcon: depressionLab,
      serviceIconHover: depressionLabHover,
      serviceTitle: "Depression",
      serviceDesc: "unde omnis iste natus error sit volupta accusant dolore rem aperiam",
      btnUrl: "/service/service-detail"
    },
    {
      serviceIcon: anxietyStressLab,
      serviceIconHover: anxietyStressHover,
      serviceTitle: "Anxiety & Stres",
      serviceDesc: "unde omnis iste natus error sit volupta accusant dolore rem aperiam",
      btnUrl: "/service/service-detail"
    },
    {
      serviceIcon: depressionLab,
      serviceIconHover: depressionLabHover,
      serviceTitle: "Depression",
      serviceDesc: "unde omnis iste natus error sit volupta accusant dolore rem aperiam",
      btnUrl: "/service/service-detail"
    }
  ]

  return (
    <div>
        <Container className="service-style-one">
          <div className="text-center position-relative">
            <ScrollingText scrollTitle="Our services" />
            <Title subTitle="Our services" rightText="Discover New Ways To " leftText="Be Well" />
            <Swiper className="swiper-container overflow-visible"
                  key={themeSchemeDirection}
                  dir={themeSchemeDirection}
                  modules={[Navigation, Pagination, FreeMode]}
                  spaceBetween={30}
                  loop= {true}
                  freeMode= {true}
                  centeredSlides= {true}
                  autoplay={{ delay: 3000 }}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                    },
                    576: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 3,
                    },
                    1025: {
                      slidesPerView: 3,
                    },
                    1500: {
                      slidesPerView: 3.2,
                    }
                  }}
              >
                  {serviceIconData.map((item, index) => (
                    <SwiperSlide key={index}>
                      <ServiceSlider serviceIcon={item.serviceIcon} serviceIconHover={item.serviceIconHover} serviceTitle={item.serviceTitle} serviceDesc={item.serviceDesc} btnUrl={item.btnUrl} />
                    </SwiperSlide>
                  ))}                       
              </Swiper>
          </div>
        </Container>
      </div>
  )
}
