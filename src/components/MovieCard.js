import React from 'react'
import moment from 'moment'

export default function MovieCard({
  title,
  image,
  netflixId,
  imdbId,
  rating,
  releaseDate,
  genres,
  synopsis,
  runtime
}) {
  const formattedReleaseDate = moment(releaseDate, 'MMMM Do, YYYY').format(
    'MMMM Do, YYYY'
  )
  const imdbAnchor = (
    <a
      href={`https://www.imdb.com/title/${imdbId}/`}
      target='_blank'
      rel='noopener noreferrer'
    >
      {`https://www.imdb.com/title/${imdbId}/`}
    </a>
  )

  function generateEncodedSection(content, label) {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: `<div class='movie-card-info-section'>
              <label>${label}: </label>
              ${content}
            </div>`
        }}
      />
    )
  }

  function generateSection(content, label) {
    return (
      <div className='movie-card-info-section'>
        <label>{label}: </label>
        {content}
      </div>
    )
  }

  function generateMarkup(content) {
    return { __html: content }
  }

  return (
    <div className='movie-card'>
      {image ? (
        <img src={image} alt='Movie poster' />
      ) : (
        <div>If there was a poster for the movie it would go here</div>
      )}
      <div className='movie-card-body'>
        <h2 dangerouslySetInnerHTML={generateMarkup(title)} />
        {generateSection(rating, 'Rating')}
        {generateSection(imdbAnchor, 'IMDb')}
        {generateSection(formattedReleaseDate, 'Release date')}
        {generateSection(runtime, 'Runtime')}
        {generateEncodedSection(synopsis, 'Synopsis')}
        {netflixId && (
          <a
            className='btn btn-primary movie-card-netflix-link'
            href={`https://www.netflix.com/watch/80206240${netflixId}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            Watch on Netflix
          </a>
        )}
      </div>
    </div>
  )
}
