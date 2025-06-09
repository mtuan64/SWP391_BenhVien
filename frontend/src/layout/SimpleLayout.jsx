import React,{memo,Fragment} from "react";
// router-dom
import { Outlet } from "react-router-dom";
import RtlSetting from "../components/setting/SettingOffCanvas";

const SimpleLayout = memo((props) => {
    return(
        <Fragment>
            <main className="main-content">                
                <Outlet />
            </main>
             {/* Rtl Setting   */}
             <RtlSetting />
        </Fragment>
    )
})

SimpleLayout.displayName ="SimpleLayout"
export default SimpleLayout