// OpenWeatherMap의 오픈 api를 이용해 도시의 날씨 정보를 받아옵니다.
// 사용자의 입력을 받고, 결과(날씨 정보, 추천 옷차림)를 표시합니다.
// 401 응답 코드 받을 시, 에러 페이지로 전환합니다.
// 404 응답 코드 받을 시, 사용자에게 에러가 발생했음을 알리는 문구를 보여줍니다.

import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { clothesDummy } from '../clothesDummy';
import ErrorPage from '../components/ErrorPage';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = process.env.REACT_APP_API_KEY;
const MAIL_ADDRESS = 'idgusqls0506@gmail.com';

export default function Home() {
  const [location, setLocation] = useState('');
  const [result, setResult] = useState({});
  const [clothes, setClothes] = useState([]);

  const [responseCode, setResponseCode] = useState(0);

  const searchClothes = (temp) => {
    const recommendClothes = clothesDummy.filter(
      (item) => item.min <= temp && temp <= item.max
    );
    setClothes(recommendClothes);
  };

  const searchWeather = async (e) => {
    if (e.key === 'Enter') {
      setResult({});
      try {
        const data = await axios({
          method: 'GET',
          url: `${BASE_URL}/weather?q=${location}&appid=${API_KEY}`,
        });
        setResult(data);
        setResponseCode(data.status);
        searchClothes(Math.round(((data.data.main.temp - 273.15) * 10) / 10));
      } catch (error) {
        // alert(error);
        setResponseCode(error.response.status);
      }
    }
  };

  switch (responseCode) {
    case 401:
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
              onChange={(e) => {
                setLocation(e.target.value);
                setResponseCode(0);
              }}
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
            {responseCode === 404 && (
              <NotFoundErrorBox>
                <h1 className='error-title'>
                  '{location}'(이)라는 이름의 도시를 찾지 못했습니다.
                </h1>
                <p className='error-message'>
                  철자를 다시 한 번 확인해주시기 바랍니다!
                </p>
                <p className='error-message'>
                  <span className='guidance'>
                    철자를 정확히 입력했는데도 계속 오류가 발생한다면,
                  </span>
                  <span className='guidance'>
                    페이지를 찾는 데서 오류가 발생했다는 내용의 메일을{' '}
                    {MAIL_ADDRESS}으로 보내주세요.
                  </span>
                  <span className='guidance'>
                    원인을 파악해 조치를 취하도록 하겠습니다.
                  </span>
                </p>
                <p className='error-message'>이용에 불편을 드려 죄송합니다.</p>
              </NotFoundErrorBox>
            )}
          </div>
        </WeatherBox>
      );
  }
}

const WeatherBox = styled.div`
  background-color: beige;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1em;

  @media screen and (max-width: 48rem) {
    font-size: 0.9rem;
  }

  h1 {
    font-size: 2em;

    @media screen and (max-width: 48rem) {
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

const NotFoundErrorBox = styled.section`
  text-align: center;

  .error-title {
    font-size: 1.5rem;
    margin-bottom: 0.5em;

    @media screen and (max-width: 48rem) {
      font-size: 1.25rem;
    }
  }

  .error-message {
    margin-bottom: 1em;

    /* @media screen and (max-width: 48rem) {
      margin-bottom: 0.5em;
    } */
  }

  .error-message:last-child {
    margin-bottom: 0;
  }

  .guidance {
    display: block;
  }
`;
