import React,{useEffect, memo, Fragment, useState} from 'react'

const BackToTop = memo(() => {
    const [isVisible, setIsVisible] = useState(false);
    const handleScroll = () => {
        const scroll = window.scrollY;
        if (scroll > 250) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const animationName = `${isVisible ? 'animate__fadeIn' : 'animate__fadeOut'}`;
    return(
        <Fragment>
            <div id="back-to-top" className={`animate__animated ${animationName}`}>
                <a className="p-0 btn btn-sm position-fixed top border-0 text-white" onClick={scrollToTop}>
                    <svg width="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 15.5L12 8.5L19 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </a>
            </div>
        </Fragment>
    )
})

export default BackToTop;