import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import './weatherapp.css';

function WeatherApp() {
    const [input, setInput] = useState('');
    const [weather, setWeather] = useState({
        loading: false,
        data: null,
        error: false,
        errorMessage: ''
    });

    const toDateFunction = () => {
        const currentDate = new Date();
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        return currentDate.toLocaleDateString('en-US', options);
    };

    const search = () => {
        setWeather({ loading: true, error: false, errorMessage: '' });
        axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: input,
                units: 'metric',
                appid: '33ad054031daca405b08e0acb02cd368', // Replace 'YOUR_API_KEY' with your actual API key
            }
        })
        .then(response => {
            setWeather({ data: response.data, loading: false, error: false });
        })
        .catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                setWeather({ data: null, loading: false, error: true, errorMessage: error.response.data.message });
            } else {
                setWeather({ data: null, loading: false, error: true, errorMessage: 'City not found. Please try again.' });
            }
        });
    };

    return (
        <div className="weather-container">
            <div className="weather-box">
                <h1 className="app-name">Weather App</h1>
                <div className="search-bar">
                    <input
                        type="text"
                        className="city-search"
                        placeholder="Enter City Name"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && search()}
                    />
                    <button className="search-button" onClick={search}>Search</button>
                </div>
                {weather.loading && <div className="loading">Loading...</div>}
                {weather.error && (
                    <div className="error-message">
                        <FontAwesomeIcon icon={faFrown} />
                        <h2>{weather.errorMessage}</h2>
                    </div>
                )}
                {weather.data && weather.data.main && (
                    <div className="weather-info">
                        <h2>{weather.data.name}, {weather.data.sys.country}</h2>
                        <p>{toDateFunction()}</p>
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}.png`}
                            alt={weather.data.weather[0].description}
                        />
                        <p>{weather.data.weather[0].description.toUpperCase()}</p>
                        <p>Temperature: {weather.data.main.temp}°C</p>
                        <p>Wind Speed: {weather.data.wind.speed} m/s</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default WeatherApp;
