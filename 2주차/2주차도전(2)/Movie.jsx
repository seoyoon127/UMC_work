import React from 'react';    //Movie 컴포넌트

const IMG_URL="https://image.tmdb.org/t/p/original";

export default function Movie({title,poster_path,vote_average,overveiw}) {//prop로 전달받음
  return (
    <div className='movie_container'>
      <img src={IMG_URL+poster_path} alt={title}/>
      <div className='overveiw'>
        <div>{title}<br/>{overveiw}</div>
      </div>
      <div className='info_box'>
          <span>{title}</span>
          <span className='vote_avg'>{vote_average}</span>
      </div>
    </div>
  )
}
