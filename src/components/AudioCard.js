import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

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
    setIsPlaying(!isPlaying)
    toggleAudio()
  }

  return (
    <div className='audio-card'>
      <div>
        <button className='btn btn-blank' onClick={e => handleClick(e)}>
          {isPlaying ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </button>
      </div>
      {label}
    </div>
  )
}
