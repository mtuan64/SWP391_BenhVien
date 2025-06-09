import React,{memo,Fragment, useEffect} from "react";

// router-dom
import { Outlet } from "react-router-dom";

// footer
import Footer from "../components/partial/footer";
import Header1 from "../components/partial/header1";

// setting custimzor
import SettingOffCanvas from '../components/setting/SettingOffCanvas'

const HorizontalLayout = memo((props) => {
    useEffect(
        () => {
            document.body.classList.add('full-screen')
            return () => {
                document.body.classList.remove('full-screen')
            }
        }
    )
    return (
        <Fragment>
            <main className="main-content">
            <div className="position-relative">
                <Header1 />
            </div>
            <div className="content-inner container-fluid pb-0" id="page_layout">
                <Outlet />
            </div>
            <SettingOffCanvas />
            <Footer />
            </main>
        </Fragment>
    )
})

HorizontalLayout.displayName = "HorizontalLayout"
export default HorizontalLayout