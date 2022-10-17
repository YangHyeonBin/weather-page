import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { clothesDummy } from './clothesDummy';

function App() {
  const BASE_URL = 'https://api.openweathermap.org/data/2.5';
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [location, setLocation] = useState('');
  const [result, setResult] = useState({});
  const [clothes, setClothes] = useState([]);

  const searchClothes = (temp) => {
    const recommendClothes = clothesDummy.filter(
      (item) => item.min <= temp && temp <= item.max
    );
    setClothes(recommendClothes);
  };

  const searchWeather = async (e) => {
    if (e.key === 'Enter') {
      try {
        const data = await axios({
          method: 'GET',
          url: `${BASE_URL}/weather?q=${location}&appid=${API_KEY}`,
        });
        setResult(data);
        searchClothes(Math.round(((data.data.main.temp - 273.15) * 10) / 10));
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <WeatherBox>
      <h1>현재 기온에 맞는 옷을 알려드려요!</h1>
      <div className='weather-box'>
        <input
          type='text'
          placeholder='도시 이름을 영어로 입력하고 Enter를 눌러주세요 😊'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={searchWeather}
        />
        {Object.keys(result).length !== 0 && (
          <div className='boxes'>
            <ResultBox>
              <div className='temp-box'>
                <div>
                  <div className='city'>{result.data.name}</div>
                  <div className='sky'>{result.data.weather[0].main}</div>
                  <div className='temperature'>
                    {Math.round(((result.data.main.temp - 273.15) * 10) / 10)}°
                  </div>
                </div>
              </div>
              {result.data.weather[0].main === 'Rain' && (
                <div className='rain-message'>
                  비에 젖어도 괜찮은 장화 같은 신발을 신고, 우산 챙기는 것도
                  잊지 마세요!
                </div>
              )}
            </ResultBox>

            <ClothesBox>
              <h2 className='clothes-title'>지금은 이런 옷을 추천해요 😊</h2>
              {clothes[0].clothes.map((item, index) => (
                <p key={index} className='clothes'>
                  {item}
                </p>
              ))}
            </ClothesBox>
          </div>
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
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .weather-box {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
      font-size: 20px;
      width: 500px;
      padding: 16px;
      border: 1px solid black;
      border-radius: 8px;
      margin-bottom: 1.5em;
    }
  }

  .boxes {
    display: flex;
    align-items: center;
    width: 100%;
  }
`;

const Box = styled.div`
  padding: 20px;
  border: 1px solid black;
  border-radius: 8px;
  text-align: center;
`;

const ResultBox = styled.div`
  margin-right: 30px;
  /* position: relative; */

  .temp-box {
    border: 1px solid black;
    border-radius: 50%;
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 auto 20px;
  }

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

  .rain-message {
    /* position: absolute;
    top: 15%;
    left: -140%; */
    width: 316px;
    background-color: dodgerblue;
    color: white;
    padding: 20px;
  }
`;

const ClothesBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .clothes-title {
    font-size: 20px;
    margin-bottom: 1em;
  }

  .clothes {
    font-weight: 600;
    margin-bottom: 0.5em;
  }

  .clothes:last-child {
    margin-bottom: 0;
  }
`;
