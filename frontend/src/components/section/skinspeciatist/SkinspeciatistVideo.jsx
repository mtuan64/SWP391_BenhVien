import React from 'react'

export default function SkinspeciatistVideo() {
  return (
    <div className="video-section">
      <div className="video-section-background">
          <video  autoPlay="autoPlay" className="w-100" controls>
            <source src="assets/images/skin-specialist/kivicare-video.mp4" type="video/ogg" />
          </video>
      </div>
    </div>
  )
}
