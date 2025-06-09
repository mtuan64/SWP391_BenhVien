import { Image } from "react-bootstrap"
import { Link } from "react-router-dom";

// logo Images
import logoDef from "/assets/images/logo/logo.png";

const Logo = ({logoDynamic, logoImage}) => {
    return (
        <>       
            <Link to="/" className="navbar-brand m-0">
                <span className="logo-normal">
                    <Image src={logoDynamic ? logoImage : logoDef} alt="logo" className="img-fluid" loading="lazy" />
                </span>
            </Link>
        </>
    )
}

export default Logo;

