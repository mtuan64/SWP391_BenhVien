import { Image } from "react-bootstrap"

// logo Images
import logoDef from "/assets/images/logo.png";
import logoDark from "/assets/images/logo-dark.png";
import logoWhite from "/assets/images/logo-white.png";
import logoMini from "/assets/images/logo-mini.png";
import logoMiniDark from "/assets/images/logo-mini-dark.png";
import logoMiniWhite from "/assets/images/logo-mini-white.png";

const Logo = () => {
    return (
        <>
            <div className="logo-main">
                <img className="logo-normal img-fluid" src={logoDef} height="30" alt="logo" />
                <img className="logo-normal dark-normal img-fluid" src={logoDark} height="30" alt="logo" />
                <img className="logo-normal white-normal img-fluid" src={logoWhite} height="30" alt="logo" />
                <img className="logo-mini img-fluid" src={logoMini} height="30" alt="logo" />
                <img className="logo-mini dark-mini img-fluid" src={logoMiniDark} height="30" alt="logo" />
                <img className="logo-mini white-mini img-fluid" src={logoMiniWhite} height="30" alt="logo" />
            </div>
        </>
    )
}

export default Logo;

