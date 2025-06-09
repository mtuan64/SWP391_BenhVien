import React, { memo, Fragment } from "react";
import { Outlet } from "react-router-dom";
// setting custimzor
import SettingOffCanvas from '../components/setting/SettingOffCanvas'

const SimpleLayout = memo((props) => {
    return (
        <Fragment>
            <div className="wrapper">
                <Outlet />
            </div>
            <SettingOffCanvas />
        </Fragment>
    )
}

)

SimpleLayout.displayName = "SimpleLayout"
export default SimpleLayout;