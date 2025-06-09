import React from 'react'
import RatingStar from './RatingStar'

export default function FilterRating({rating}) {
  const renderStars = () => {
    const starElements = [];

    for (let i = 1; i <= 5; i++) {
      starElements.push(
        <RatingStar key={i} isFill={rating >= i} />
      );
    }

    return starElements;
  };
  return (
    <div className="ratting">
      { renderStars()}
    </div>
  )
}
