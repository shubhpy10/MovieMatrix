// src/MovieBox.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieData from "./MovieData"; // आपकी अपडेटेड मूवी डेटा फाइल
import MovieCard from './MovieCard';


const MovieBox = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleCardClick = (movie) => {
        // अब हम imdbID को पास कर रहे हैं, क्योंकि MovieDetailPage इसे ढूंढेगा
        if (movie.imdbID) {
            navigate(`/movie/${movie.imdbID}`);
        } else {
            console.warn(`Movie IMDb ID is missing for: ${movie.Title}. Cannot navigate.`);
            alert(`Could not open "${movie.Title}". Missing IMDb ID.`);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredMovies = MovieData.filter(movie => {
        if (searchTerm.trim() === '') {
            return true;
        }
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        
        return movie.Title.toLowerCase().includes(lowerCaseSearchTerm) ||
               (movie.Genre && movie.Genre.toLowerCase().includes(lowerCaseSearchTerm)) ||
               (movie.Actors && movie.Actors.toLowerCase().includes(lowerCaseSearchTerm)) ||
               (movie.Director && movie.Director.toLowerCase().includes(lowerCaseSearchTerm)) ||
               (movie.Plot && movie.Plot.toLowerCase().includes(lowerCaseSearchTerm));
    });

    return (
        <>
            <div className="search-bar-container container my-4">
                <input
                    type="text"
                    className="form-control search-input"
                    placeholder="Search for movies by title, genre, actor, or director..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="MovieBox row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
                {filteredMovies.length > 0 ? (
                    filteredMovies.map((data, index) => (
                      
                        <div className="col" key={data.id || data.imdbID || index}>
                            <MovieCard movie={data} onClick={handleCardClick} />
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center text-white my-5">
                        <h3>No movies found matching your search.</h3>
                        <p>Try a different search term.</p>
                    </div>
                )}
            </div>
        </>
    );
}

export default MovieBox;