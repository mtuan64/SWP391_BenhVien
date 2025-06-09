import React,{memo,Fragment} from "react";

// router-dom
import { Outlet } from "react-router-dom";

// header
import Header from '../components/partial/header'

// sidebar 
import Sidebar from "../components/partial/sidebar";

// footer
import Footer from "../components/partial/footer";

// setting custimzor
import SettingOffCanvas from '../components/setting/SettingOffCanvas'

// Import selectors & action from setting store
import * as SettingSelector from "../store/setting/selectors";

// Redux Selector / Action
import { useSelector } from "react-redux";

const IndexLayout = memo((props) => {
    const pageLayout = useSelector(SettingSelector.page_layout);
    return (
        <Fragment>
            <Sidebar />
            <main className="main-content">
            <div className="position-relative iq-banner">
                <Header />
            </div>
            <div className={` ${pageLayout} content-inner pb-0`} id="page_layout">
                <Outlet />
            </div>
            <SettingOffCanvas />
            <Footer />
            </main>            
        </Fragment>
    )
})

IndexLayout.displayName = "IndexLayout"
export default IndexLayout