import axios from "axios";
import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [query, setQuery] = useState('Toronto');
    const [weather, setWeather] = useState({});

    const getData = async (query) => {
        return await (await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=d7d44523fd9a9f6e51c4f67d46e31de6`)).data;
    }

    const search = async () => {
        const data = await getData(query);
        console.log(data);
        setWeather(data);
    }

    return (
        <div className="main-container">
            <input style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 20,
            }}
                type="text"
                className="search"
                placeholder="Please enter a city name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={search} style={{
                padding: '10px',
                fontSize: '1.5rem',
                border: '2px solid black',
                borderRadius: '15px',
                backgroundColor: 'lightpink',
                marginBottom: '2%'                
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg> &nbsp;
                Find
            </button>
            {weather.main && (
                <div className="city">
                    <h3 className="city-name">
                        <p>{weather.name}<sup>{weather.sys.country}</sup></p>
                    </h3>
                    <div className="maintemp">
                        {Math.round(weather.main.temp - 273)}<sup>&deg;C</sup>
                    </div>
                    <div className="minmax">
                        <p>Minimum : {Math.floor(weather.main.temp_min - 273)}<sup>&deg;C</sup></p>
                        <p>Maximum : {Math.floor(weather.main.temp_max - 273)}<sup>&deg;C</sup></p>
                    </div>
                    <div className="information">
                        <img className="icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p>{weather.weather[0].description}</p>
                        <p>Feels Like : {Math.floor(weather.main.feels_like - 273)}</p>
                        <p>Humidity : {weather.main.humidity}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;