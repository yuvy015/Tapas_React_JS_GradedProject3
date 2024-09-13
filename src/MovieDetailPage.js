import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetailPage.css'; // Import the CSS for styling

const MovieDetailPage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [isZoomed, setIsZoomed] = useState(false);

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                const movie = Object.values(data).flat().find(m => m.id === id);
                setMovie(movie);
            })
            .catch(error => console.error('Error fetching movie data:', error));
    }, [id]);

    const handleImageClick = () => {
        setIsZoomed(!isZoomed);
    };

    const handleBackClick = () => {
        window.history.back(); // Go back to the previous page
    };

    if (!movie) return <div>Loading...</div>;

    return (
        <div>
            <button className="back-to-home" onClick={handleBackClick}>Back to Homepage</button>
            <div className={`movie-detail ${isZoomed ? 'zoomed' : ''}`}>
                <img
                    src={`/img/${movie.poster}`} // Ensure this path is consistent with HomePage
                    alt={movie.title}
                    onClick={handleImageClick}
                />
                <div className="description">
                    <h1>{movie.title}</h1>
                    <p><strong>Year:</strong> {movie.year}</p>
                    <p><strong>Genres:</strong> {movie.genres.join(', ')}</p>
                    <p><strong>Content Rating:</strong> {movie.contentRating}</p>
                    <p><strong>Duration:</strong> {movie.duration}</p>
                    <p><strong>Release Date:</strong> {movie.releaseDate}</p>
                    <p><strong>Average Rating:</strong> {movie.averageRating}</p>
                    <p><strong>Original Title:</strong> {movie.originalTitle}</p>
                    <p><strong>Storyline:</strong> {movie.storyline}</p>
                    <p><strong>Actors:</strong> {movie.actors.join(', ')}</p>
                    <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
                </div>
            </div>
            {isZoomed && <div className="overlay" onClick={handleImageClick} />}
        </div>
    );
};

export default MovieDetailPage;
