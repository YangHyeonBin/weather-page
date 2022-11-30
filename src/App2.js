import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import { clothesDummy } from './clothesDummy';
import ErrorPage from './components/ErrorPage';

function App() {
  const BASE_URL = 'https://api.openweathermap.org/data/2.5';
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [location, setLocation] = useState('');
  const [result, setResult] = useState({});
  const [clothes, setClothes] = useState([]);

  const [errorCode, setErrorCode] = useState(0);

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
        // alert(error);
        setErrorCode(error.response.status);
      }
    }
  };

  switch (errorCode) {
    case 404:
      return <ErrorPage />;
    default:
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
                        {Math.round(
                          ((result.data.main.temp - 273.15) * 10) / 10
                        )}
                        °
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
                  <h2 className='clothes-title'>
                    지금은 이런 옷을 추천해요 😊
                  </h2>
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

  // return (
  //   <WeatherBox>
  //     <h1>현재 기온에 맞는 옷을 알려드려요!</h1>
  //     <div className='weather-box'>
  //       <input
  //         type='text'
  //         placeholder='도시 이름을 영어로 입력하고 Enter를 눌러주세요 😊'
  //         value={location}
  //         onChange={(e) => setLocation(e.target.value)}
  //         onKeyDown={searchWeather}
  //       />
  //       {Object.keys(result).length !== 0 && (
  //         <div className='boxes'>
  //           <ResultBox>
  //             <div className='temp-box'>
  //               <div>
  //                 <div className='city'>{result.data.name}</div>
  //                 <div className='sky'>{result.data.weather[0].main}</div>
  //                 <div className='temperature'>
  //                   {Math.round(((result.data.main.temp - 273.15) * 10) / 10)}°
  //                 </div>
  //               </div>
  //             </div>
  //             {result.data.weather[0].main === 'Rain' && (
  //               <div className='rain-message'>
  //                 비에 젖어도 괜찮은 장화 같은 신발을 신고, 우산 챙기는 것도
  //                 잊지 마세요!
  //               </div>
  //             )}
  //           </ResultBox>

  //           <ClothesBox>
  //             <h2 className='clothes-title'>지금은 이런 옷을 추천해요 😊</h2>
  //             {clothes[0].clothes.map((item, index) => (
  //               <p key={index} className='clothes'>
  //                 {item}
  //               </p>
  //             ))}
  //           </ClothesBox>
  //         </div>
  //       )}
  //     </div>
  //   </WeatherBox>
  // );
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

  h1 {
    font-size: 2em;
  }

  @media screen and (max-width: 48rem) {
    font-size: 0.9rem;

    h1 {
      text-align: center;
    }
  }

  .weather-box {
    margin-top: 1.875em;
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
      font-size: 1.25rem;
      width: 25em;
      padding: 0.8em;
      border: 1px solid black;
      border-radius: 0.4em;
      margin-bottom: 1.5em;

      @media screen and (max-width: 48rem) {
        font-size: 0.75rem;
      }
    }
  }

  .boxes {
    display: flex;
    align-items: center;
    width: 100%;

    @media screen and (max-width: 48rem) {
      flex-direction: column;
    }
  }
`;

const Box = styled.div`
  padding: 1.25em;
  border: 1px solid black;
  border-radius: 0.5em;
  text-align: center;
`;

const ResultBox = styled.div`
  margin-right: 1.875em;
  /* position: relative; */

  @media screen and (max-width: 48rem) {
    margin-right: 0;
  }

  .temp-box {
    border: 1px solid black;
    border-radius: 50%;
    width: 12.5em;
    height: 12.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 auto 1.25em;
  }

  .city {
    font-size: 1.5rem;
    font-weight: 700;
  }

  .temperature {
    color: dodgerblue;
    font-size: 2.5rem;
  }

  .sky {
    font-size: 1.25rem;
  }

  .rain-message {
    /* position: absolute;
    top: 15%;
    left: -140%; */
    width: 19.75em;
    background-color: dodgerblue;
    color: white;
    padding: 1.25em;

    @media screen and (max-width: 48rem) {
      margin-bottom: 2em;
    }
  }
`;

const ClothesBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .clothes-title {
    font-size: 1.25rem;
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
