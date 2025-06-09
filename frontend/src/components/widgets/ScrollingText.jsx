import React, {  memo, useEffect } from "react";

const  ScrollingText = memo((props) => {
  useEffect(() => {
    const handleScroll = () => {
        const scrollingTexts = document.querySelectorAll('.scrolling-text');
        const windowHeight = window.innerHeight;

        scrollingTexts.forEach(text => {
            const count = text.getBoundingClientRect().top;
            const windowBottom = window.scrollY + windowHeight;

            if (count <= windowBottom) {
                const i = window.scrollY - count + windowHeight;
                const scroll = i - 150;
                const speed = scroll + ((scroll / 70) / 100);
                const textScroll = (speed * 30) / 100;
                text.style.transform = `translateX(${textScroll}px)`;
            }
        });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
}, []);
  return (
    <div className="scrolling-text position-absolute">
        <div className="iq-title text-uppercase">{props.scrollTitle}</div>
    </div>
  )
})

export default ScrollingText
