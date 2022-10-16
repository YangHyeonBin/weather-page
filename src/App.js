import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const BASE_URL = 'https://api.openweathermap.org/data/2.5';
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [location, setLocation] = useState('');
  const [result, setResult] = useState({});

  const searchWeather = async (e) => {
    if (e.key === 'Enter') {
      try {
        const data = await axios({
          method: 'GET',
          url: `${BASE_URL}/weather?q=${location}&appid=${API_KEY}`,
        });
        setResult(data);
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <WeatherBox>
      <div className='weather-box'>
        <input
          type='text'
          placeholder='Enter city name'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={searchWeather}
        />
        {Object.keys(result).length !== 0 && (
          <ResultBox>
            <div className='city'>{result.data.name}</div>
            <div className='sky'>{result.data.weather[0].main}</div>
            <div className='temperature'>
              {Math.round(((result.data.main.temp - 273.15) * 10) / 10)}°
            </div>
            <div>
              체감 온도:{' '}
              {Math.round(((result.data.main.feels_like - 273.15) * 10) / 10)}°
            </div>
          </ResultBox>
        )}
      </div>
    </WeatherBox>
  );
}

export default App;

const WeatherBox = styled.div`
  background-color: beige;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .weather-box {
    padding: 20px;

    input {
      font-size: 20px;
      padding: 16px;
      border: 1px solid black;
      border-radius: 8px;
      margin-bottom: 1em;
    }
  }
`;

const ResultBox = styled.div`
  padding: 10px;
  border: 1px solid black;
  border-radius: 8px;
  text-align: center;

  .city {
    font-size: 24px;
    font-weight: 700;
  }

  .temperature {
    color: dodgerblue;
    font-size: 40px;
  }

  .sky {
    font-size: 20px;
  }
`;
