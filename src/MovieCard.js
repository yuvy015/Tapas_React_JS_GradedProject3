import React from 'react';

const MovieCard = ({ movie, onRemove }) => {
    return (
        <div className="movie-card">
            <img src={movie.poster} alt={movie.title} />
            <h2>{movie.title}</h2>
            {onRemove && <button onClick={onRemove}>Remove from Favorites</button>}
        </div>
    );
};

export default MovieCard;
