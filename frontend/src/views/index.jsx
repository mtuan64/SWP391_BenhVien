import React,{ memo, Fragment } from 'react'

// Components
import HomeBanner from '../components/section/home/HomeBanner';
import HomeAbout from '../components/section/home/HomeAbout';
import HomeChooseUS from '../components/section/home/HomeChooseUS';
import HomeService from '../components/section/home/HomeService';
import GlobalTeamStandard from '../components/section/global/GlobalTeamStandard';
import GlobalTestiminialCounter from '../components/section/global/GlobalTestiminialCounter';
import GlobalBlogColumnGrid from '../components/section/global/GlobalBlogColumnGrid';

export default function Index() {
    return(
        <Fragment>            
            {/* banner */}
            <HomeBanner />

            {/* About */}
            <HomeAbout />            

            {/* why choose us */}
            <HomeChooseUS />

            {/* service */}
            <HomeService />

            {/* Doctors */}
            <GlobalTeamStandard />

            {/* Testimonial */}
            <GlobalTestiminialCounter />

            {/* Blog */}
            <GlobalBlogColumnGrid />
        </Fragment>
    )
}
