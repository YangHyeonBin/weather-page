// 이 파일을 현재 사용하지 않고 있습니다.
// Home 컴포넌트의 코드가 길어져 데이터를 받아오는 코드를 분리하려 했으나, 아직 방법을 찾는 중입니다.

import { useState } from 'react';
import axios from 'axios';
import { clothesDummy } from '../clothesDummy';

// api 이용해 날씨 정보 받아오는 코드는 분리하는 게 좋을 것 같아 따로 빼고자 함.
// 그런데 result, clothes를 어떻게 전달하지?

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

export const searchWeather = async (e) => {
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
