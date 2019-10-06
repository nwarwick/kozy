import React, { useState } from 'react'

export default function AudioCard({ source, label }) {
  const [audio] = useState(new Audio(source))
  const [isPlaying, setIsPlaying] = useState(false)
  audio.loop = true

  function toggleAudio() {
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
  }

  function handleClick(e) {
    e.preventDefault()
    setIsPlaying(!isPlaying)
    toggleAudio()
  }

  return (
    <div className='audio-card'>
      <div>
        <button onClick={e => handleClick(e)}>
          {isPlaying ? 'Stop' : 'Play'}
        </button>
      </div>
      <div>slider</div>
      {label}
    </div>
  )
}
