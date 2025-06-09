import React,{memo,Fragment} from "react";
// router-dom
import { Outlet } from "react-router-dom";

import DefaulFooter from "../components/partial/footer/footer";
import DefaultHeader from "../components/partial/header/header";
import BackToTop from "../components/partial/BackToTop";
import RtlSetting from "../components/setting/SettingOffCanvas";
import Loader from "../components/partial/Loader";

const IndexLayout = memo(({ Header, logoDynamic, Footer, IsMegaMenu }) => {
    return(
        <Fragment>
            <Loader />
            
            <main className="main-content">
                <div className="position-relative">
                    {Header == undefined ? <DefaultHeader logoDynamic={logoDynamic} IsMegaMenu={IsMegaMenu} /> : <Header logoDynamic={logoDynamic} IsMegaMenu={IsMegaMenu} />}
                </div>
                <Outlet />
            </main>

            {/* footer */}
            {Footer == undefined ? <DefaulFooter logoDynamic={logoDynamic} /> : <Footer logoDynamic={logoDynamic} />}

            {/* Rtl Setting   */}
            <RtlSetting />

            {/* Back To Top */}
            <BackToTop />
        </Fragment>
    )
})

IndexLayout.displayName ="IndexLayout"
export default IndexLayout