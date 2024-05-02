import React from 'react';
import { movies } from './API'; // API.js 파일로부터 데이터 가져오기
import Movie from './Movie'; // Movie 컴포넌트를 불러옴

function App() {
  return (
    <div>
      <div className='app_container'>
        {
          movies.results.map((movie)=>{
            return(
              <Movie  
                title={movie.title} 
                poster_path={movie.poster_path}
                vote_average={movie.vote_average}
                overveiw={movie.overview}
                />
            );
          })
        }
      </div>
    </div>
    );
}

export default App;
