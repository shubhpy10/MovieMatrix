import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MovieDetailPage = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();

    const movieDataString = import.meta.env.VITE_MOVIE_DATA; 
    let MovieData = [];

    try {
        if (movieDataString) {
            MovieData = JSON.parse(movieDataString);
            
        } else {
            console.warn("4. VITE_MOVIE_DATA is undefined or empty!");
        }
    } catch (error) {
        console.error("5. ERROR during JSON.parse:", error);
    }

    console.log("movieId from URL param:", movieId);
    console.log("MovieData array:", MovieData);

    // Safer matching with lowercase just in case
    const movie = MovieData.find(m => m.imdbID.toLowerCase() === movieId?.toLowerCase());

    if (!movie) {
        return (
            <div className="movie-detail-container no-movie">
                <h2>Movie not found!</h2>
                <button onClick={() => navigate('/')} className="back-button">Go back to Home</button>
            </div>
        );
    }

    const renderOmdbStars = (imdbRating) => {
        if (!imdbRating || imdbRating === 'N/A') return 'N/A';
        const ratingValue = parseFloat(imdbRating.split('/')[0]);
        const numStars = Math.round(ratingValue / 2);
        const stars = '★'.repeat(numStars);
        const emptyStars = '☆'.repeat(5 - numStars);
        return (
            <span className="star-rating">
                <span className="filled-stars">{stars}</span>
                <span className="empty-stars">{emptyStars}</span>
            </span>
        );
    };

    return (
        <div className="movie-detail-container">
            <button onClick={() => navigate(-1)} className="back-button">← Back to Movies</button>

            <div className="movie-detail-header">
                <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
                    alt={movie.Title}
                    className="detail-poster"
                />
                <div className="header-info">
                    <h1>{movie.Title} ({movie.Year})</h1>
                    <p className="tagline">{movie.Plot}</p>
                    <div className="rating-info">
                        {renderOmdbStars(movie.imdbRating)}
                        <span className="ms-2">{movie.imdbRating} ({movie.imdbVotes})</span>
                    </div>
                    <p><strong>Genre:</strong> {movie.Genre}</p>
                    <p><strong>Runtime:</strong> {movie.Runtime}</p>
                    <p><strong>Released:</strong> {movie.Released}</p>
                </div>
            </div>

            <div className="movie-details-content">
                <p><strong>Director:</strong> {movie.Director}</p>
                <p><strong>Actors:</strong> {movie.Actors}</p>
                <p><strong>Language:</strong> {movie.Language}</p>
                <p><strong>Country:</strong> {movie.Country}</p>
                {movie.Awards !== 'N/A' && <p><strong>Awards:</strong> {movie.Awards}</p>}
                {movie.BoxOffice !== 'N/A' && <p><strong>Box Office:</strong> {movie.BoxOffice}</p>}
                {movie.Production !== 'N/A' && <p><strong>Production:</strong> {movie.Production}</p>}
                <p style={{color:'red'}}>Watch Movie Online</p>

                {movie.drive_link && (
                    <div className="video-player-wrapper mt-4">
                        <iframe
                            src={movie.drive_link}
                            title={movie.Title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="movie-iframe"
                        ></iframe>
                    </div>
                )}

                <div className="text-center mt-4">
                    <a
                        href={movie.download_link}
                        className="btn download-button"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Download Movie
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;
