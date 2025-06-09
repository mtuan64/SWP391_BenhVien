import React from 'react'
import { Container } from 'react-bootstrap';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination} from 'swiper/modules';
import 'swiper/swiper-bundle.css';

// Widgets
import ScrollingText from '../../widgets/ScrollingText';
import Title from '../../widgets/Title';
import TeamContentAside from '../../widgets/TeamContentAside';

// Json
import { teamData } from '../../../staticData/team';

// Redux Selector / Action
import { useSelector } from 'react-redux';
import { theme_scheme_direction } from '../../../store/setting/selectors';

export default function CardiacTeam() {
  const themeSchemeDirection = useSelector(theme_scheme_direction);
  return (
    <div className="section-padding pt-0">
        <Container>
          <div className="text-center position-relative">
            <ScrollingText scrollTitle="our doctors" />
            <Title subTitle="Team" rightText="Our Medical " leftText="Team" />
          </div>
          <div className="team-content-aside-wrapper overflow-hidden">
          <Swiper className="swiper-container"
              key={themeSchemeDirection}
              dir={themeSchemeDirection}
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              centeredSlides={true}
              data-loop="true"
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
                  slidesPerView: 4,
                }
              }}
          >
              {teamData.map((item, index) => (
                  <SwiperSlide key={index}>
                      <TeamContentAside teamImage={item.teamImage} teamMemberName={item.teamMemberName} teamSpecialized={item.teamSpecialized} />
                  </SwiperSlide>
              ))}                        
          </Swiper>
          </div>
        </Container>
    </div>
  )
}
