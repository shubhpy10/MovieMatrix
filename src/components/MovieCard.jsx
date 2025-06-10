
import React from 'react';


const MovieCard = ({ movie, onClick }) => {
  return (
    <>
      <div
        className="card h-100 movie-card border-color rounded-3 shadow"
        onClick={() => onClick(movie)}
        style={{ cursor: 'pointer' }}
      >
      
        <img src={movie.Poster} style={{height:'65vh'}} className="card-img-top movie-poster" alt={movie.Title} />
        <div className="card-body movie-info">
          <h5 className="card-title">{movie.Title}</h5>
       
          <p className="card-text">Release Date: {movie.Released || 'N/A'}</p>
          <p className="card-text">Rating: <strong>{movie.imdbRating || 'N/A'}</strong> / 10</p>
        </div>
      </div>
    </>
  );
};

export default MovieCard;