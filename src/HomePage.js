import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Ensure this file exists

const HomePage = () => {
    const [movies, setMovies] = useState({});
    const [favorites, setFavorites] = useState([]);
    const [selectedTab, setSelectedTab] = useState('movies-in-the-theatre'); // Default to 'movies-in-the-theatre'
    const [flashMessage, setFlashMessage] = useState('');
    const [flashMessageClass, setFlashMessageClass] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    
    useEffect(() => {
        // Fetch movies data
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                setMovies(data);
                // Load favorites from local storage
                const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
                setFavorites(storedFavorites);
            })
            .catch(error => console.error('Error fetching movie data:', error));
    }, []);

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    const addToFavorites = (movie) => {
        const isAlreadyFavorite = favorites.some(fav => fav.id === movie.id);
        if (isAlreadyFavorite) {
            setFlashMessage('Movie already in Favorites!');
        } else {
            const updatedFavorites = [...favorites, movie];
            setFavorites(updatedFavorites);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setFlashMessage('Added to Favorites!');
        }
        setFlashMessageClass('');
        setTimeout(() => {
            setFlashMessageClass('fade-out');
        }, 1000);
    };

    const removeFromFavorites = (movieId) => {
        const updatedFavorites = favorites.filter(fav => fav.id !== movieId);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setFlashMessage('Removed from Favorites!');
        setFlashMessageClass('');
        setTimeout(() => {
            setFlashMessageClass('fade-out');
        }, 1000);
    };

    // Map the selected tab to the corresponding movie section in JSON
    const tabMapping = {
        'movies-in-the-theatre': 'movies-in-theaters',  // Adjusted for "movies-in-theaters"
        'coming-soon': 'movies-coming',
        'top-rated-indian': 'top-rated-india',
        'top-rated-movies': 'top-rated-movies',
        'favorites': 'favorites',
    };

    const filteredMovies = selectedTab === 'favorites' ? favorites : (movies[tabMapping[selectedTab]] || []);

    // Filter movies based on the search query
    const searchFilteredMovies = filteredMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div className="header">
                <div className="tabs-container">
                    <div className="tabs">
                        <a 
                            href="#"
                            className={selectedTab === 'movies-in-the-theatre' ? 'active' : ''}
                            onClick={() => handleTabChange('movies-in-the-theatre')}
                        >
                            Movies in Theatre
                        </a>
                        <a 
                            href="#"
                            className={selectedTab === 'coming-soon' ? 'active' : ''}
                            onClick={() => handleTabChange('coming-soon')}
                        >
                            Coming Soon
                        </a>
                        <a 
                            href="#"
                            className={selectedTab === 'top-rated-indian' ? 'active' : ''}
                            onClick={() => handleTabChange('top-rated-indian')}
                        >
                            Top Rated Indian
                        </a>
                        <a 
                            href="#"
                            className={selectedTab === 'top-rated-movies' ? 'active' : ''}
                            onClick={() => handleTabChange('top-rated-movies')}
                        >
                            Top Rated Movies
                        </a>
                        <a 
                            href="#"
                            className={selectedTab === 'favorites' ? 'active' : ''}
                            onClick={() => handleTabChange('favorites')}
                        >
                            Favorites
                        </a>
                    </div>
                    <h1>Movies</h1>
                </div>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={() => setSearchQuery(searchQuery)}>Search</button>
                </div>
            </div>
            {flashMessage && <div className={`flash-message ${flashMessageClass}`}>{flashMessage}</div>}
            <div className="movie-list">
                {searchFilteredMovies.map(movie => (
                    <div key={movie.id} className="movie-card">
                        <img src={`/img/${movie.poster}`} alt={movie.title} />
                        <h2>{movie.title}</h2>
                        {selectedTab !== 'favorites' && (
                            <button onClick={() => addToFavorites(movie)}>❤️ Add to Favorites</button>
                        )}
                        {selectedTab === 'favorites' && (
                            <button onClick={() => removeFromFavorites(movie.id)}>❌ Remove from Favorites</button>
                        )}
                        <Link to={`/movie/${movie.id}`}>View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
