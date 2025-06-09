import React, { useEffect, useState } from 'react'

export default function BeforeAfterImg(props) {
  const [position, setPosition] = useState(50); // Initial position set to 50%

  useEffect(() => {
    const container = document.querySelector('.before-after-container');
    container.style.setProperty('--position', `${position}%`);
  }, [position]);

  const handleInputChange = (e) => {
    setPosition(e.target.value);
  };

  return (
    <div className='position-relative before-after-container'>
      <div className="image-container">
          <img className="image-before before-after-image" src={props.beforeImage} alt="before-image" />
          <img className="image-after before-after-image" src={props.afterImage} alt="after-image" />
      </div>
      <input
        type="range"
        min="0"
        max="100"
        defaultValue="50"
        className="before-after-slider"
        onChange={handleInputChange}
      />
      <div className="before-after-slider-line" aria-hidden="true"></div>
      <div className="before-after-slider-button" aria-hidden="true"></div>
    </div>
  )
}
