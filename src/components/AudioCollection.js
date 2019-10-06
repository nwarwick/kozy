import React from 'react'
import AudioCard from './AudioCard'
import cafe from '../assets/audio/cafe.mp3'
import fire from '../assets/audio/fire.mp3'
import jungle from '../assets/audio/jungle.mp3'
import rain from '../assets/audio/rain.mp3'
import thunder from '../assets/audio/thunder.mp3'
import waves from '../assets/audio/waves.mp3'

export default function AudioCollection() {
  const audioSources = [
    { source: cafe, label: 'Cafe' },
    { source: fire, label: 'Fire' },
    { source: jungle, label: 'Jungle' },
    { source: rain, label: 'Rain' },
    { source: thunder, label: 'Thunder' },
    { source: waves, label: 'Waves' }
  ]

  function displayAudioCards() {
    return audioSources.map((audio, index) => (
      <AudioCard key={index} source={audio.source} label={audio.label} />
    ))
  }

  return <div className='audio-collection'>{displayAudioCards()}</div>
}
