

import React from 'react';


const MovieModal = ({ movie, onClose }) => {
    if (!movie) return null;

    return (
       
        <div className="modal-overlay" onClick={onClose}>
       
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <span className="close-button" onClick={onClose}>&times;</span>

                <h2>{movie.title}</h2>

                <div className="video-container">
                  
                    <iframe
                        src={movie.drive_link}
                        title={movie.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>

                <p>{movie.description}</p>

                <div className="movie-details">
                    <p><strong>File Size:</strong> {movie.file_size}</p>
                    <p><strong>Upload Date:</strong> {movie.upload_date}</p>
                    <p><strong>Resolution:</strong> {movie.resolution}</p>
                   
                    <p><strong>Duration:</strong> {movie.duration || 'N/A'}</p>
                    <p><strong>Frame Rate:</strong> {movie.frame_rate || 'N/A'}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieModal;