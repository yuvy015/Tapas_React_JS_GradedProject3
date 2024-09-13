import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import './FavoritePage.css'; // Import CSS for styling the flash message

const FavoritePage = () => {
    const [favorites, setFavorites] = useState([]);
    const [flashMessage, setFlashMessage] = useState('');

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    const handleRemoveFavorite = (movieId) => {
        const updatedFavorites = favorites.filter(movie => movie.id !== movieId);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

        // Show flash message
        setFlashMessage('Removed from Favorites');
        setTimeout(() => setFlashMessage(''), 1000); // Hide message after 1 second
    };

    return (
        <div className="favorite-page">
            <h1>Favorite Movies</h1>
            {flashMessage && <div className="flash-message">{flashMessage}</div>}
            <div className="movie-list">
                {favorites.length > 0 ? (
                    favorites.map(movie => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            onRemove={() => handleRemoveFavorite(movie.id)}
                        />
                    ))
                ) : (
                    <p>No favorite movies added yet.</p>
                )}
            </div>
        </div>
    );
};

export default FavoritePage;
