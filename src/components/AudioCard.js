import React, { useState, useEffect } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

export default function AudioCard({ source, label }) {
  const DEFAULT_VOLUME = 0.5
  const [audio] = useState(new Audio(source))
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(
    () => {
      audio.volume = DEFAULT_VOLUME
      audio.loop = true
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

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

  function setVolume(volumeValue) {
    audio.volume = volumeValue
  }

  return (
    <div
      className={`audio-card ${label.toLowerCase()} ${isPlaying && 'active'}`}
    >
      <button
        className='btn btn-blank'
        onClick={volumeValue => handleClick(volumeValue)}
      >
        {isPlaying ? (
          <FontAwesomeIcon icon={faPause} />
        ) : (
          <FontAwesomeIcon icon={faPlay} />
        )}
      </button>
      <Slider
        min={0}
        max={1}
        step={0.1}
        defaultValue={DEFAULT_VOLUME}
        onChange={volumeValue => setVolume(volumeValue)}
      />
      {label}
    </div>
  )
}
