import React, { memo, Fragment } from "react";

// router-dom
import { Outlet } from "react-router-dom";

// header
import Header from '../components/partial/header'

// sidebar 
import Sidebar from "../components/partial/sidebar";

// footer
import Footer from "../components/partial/footer";

// Sub Header
import SubHeader from "../components/partial/sub-header";

// setting custimzor
import SettingOffCanvas from '../components/setting/SettingOffCanvas'

// Import selectors & action from setting store
import * as SettingSelector from "../store/setting/selectors";

// Redux Selector / Action
import { useSelector } from "react-redux";

import { useLocation } from "react-router-dom";

const DefaultLayout = memo((props) => {
    const sidebarColor = useSelector(SettingSelector.header_banner);
    const location = useLocation()
    const pageLayout = useSelector(SettingSelector.page_layout);
    return (
        <Fragment>
            <Sidebar />
            <main className="main-content">
                <div className={`position-relative iq-banner ${sidebarColor}`}>
                    {location.pathname !== '/component' && < Header />}
                    <SubHeader />
                </div>
                <div className={` ${pageLayout} content-inner pb-0`} id="page_layout">
                    <Outlet />
                </div>
                <SettingOffCanvas BannerStyle={true} />
                <Footer />
            </main>
            {/* {
                props.isHeader === 'true' && 

            <h1>Default Layout</h1>
            } */}
        </Fragment>
    )
})

DefaultLayout.displayName = "DefaultLayout"
export default DefaultLayout