import React from 'react'
import { Container } from 'react-bootstrap'

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination} from 'swiper/modules';

// Widget
import Title from '../../widgets/Title'
import ScrollingText from '../../widgets/ScrollingText'
import TeamOverdetail from '../../widgets/TeamOverdetail';

// Json
import {teamData} from '../../../staticData/team'

// Redux Selector / Action
import { useSelector } from "react-redux";
import { theme_scheme_direction } from "../../../store/setting/selectors";

export default function GlobalTeamOverlap() {
  const themeSchemeDirection = useSelector(theme_scheme_direction);
  return (
    <div className="team-section section-padding">
          <Container>
              <div className="text-center position-relative">
                  <ScrollingText scrollTitle="Our Doctors" />
                  <Title subTitle="Doctors" rightText="Our outstanding " leftText="doctors" />
              </div>
              <Swiper className="swiper-container cust-globelteam-swiper"
                  modules={[Navigation, Pagination]}
                  key={themeSchemeDirection}
                  dir={themeSchemeDirection}
                  spaceBetween={30}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3000 }}
                  breakpoints={{
                      0: {
                        slidesPerView: 1,
                      },
                      576: {
                        slidesPerView: 2,
                      },
                      768: {
                        slidesPerView: 2,
                      },
                      1025: {
                        slidesPerView: 3,
                      },
                      1500: {
                        slidesPerView: 3,
                      }
                  }}
              >
                  {teamData.map((item, index) => (
                      <SwiperSlide key={index}>
                          <TeamOverdetail teamImage={item.teamImage} teamMemberName={item.teamMemberName} teamSpecialized={item.teamSpecialized} />
                      </SwiperSlide>
                  ))}                        
              </Swiper>
          </Container>
      </div>
  )
}
