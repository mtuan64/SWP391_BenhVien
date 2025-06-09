import React from 'react'

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination} from 'swiper/modules';
import 'swiper/swiper-bundle.css';

// Json
import { clientData } from '../../../staticData/clientData'

// Redux Selector / Action
import { useSelector } from "react-redux";
import { theme_scheme_direction } from "../../../store/setting/selectors";

export default function GlobalClientSlider() {
  const themeSchemeDirection = useSelector(theme_scheme_direction);
  return (
    // <div className="client-bg ">
      <ul className="p-0 m-0 mb-2 swiper-wrapper list-inline text-center">
        <Swiper className="swiper-container testimonial-quote testimonial-quote-white"
            key={themeSchemeDirection}
            dir={themeSchemeDirection}
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              0: {
                slidesPerView: 2,
              },
              576: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 2,
              },
              1025: {
                slidesPerView: 5,
              },
              1500: {
                slidesPerView: 6,
              }
            }}
        >
              {clientData.map((item, index) => (
                  <SwiperSlide as="li" key={index}>
                      <li className="swiper-slide" key={index}>
                        <img src={item.clientImage} alt="client" className="iq-client-img" loading="lazy" />
                      </li>
                  </SwiperSlide>
              ))}
        </Swiper>    
      </ul>
    // </div>
  )
}
