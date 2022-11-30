# What-to-wear-today

## 소개

OpenWeatherMap의 open API를 이용해, 도시 이름을 입력하면 현재 기온을 알려주는 서비스를 만드는 예제를 수행했습니다.

현재 기온에 맞는 옷차림을 추천해주는 서비스가 있으면 좋겠단 생각에 예제를 발전시켜 보았습니다.

기온별 옷차림은 인터넷에서 찾아볼 수 있는 이미지들을 참고해, 더미 데이터를 만들어 가져왔습니다.

## 사용 기술

📍 Axios, React.js, react-router-dom, styled-components

- Axios 라이브러리를 배우고 처음 사용해 봤습니다.

- React.js 사용법을 더 익히고 싶어 사용했고, 화면을 전환해 401 에러 페이지를 보여주기 위해 react-router-dom을 사용했습니다.

- 간단한 프로젝트여서 리액트 컴포넌트 안에 스타일을 위한 코드를 작성해도 코드 확인에 불편함이 없을 것이라 생각해 styled-components를 사용했습니다.

## 화면 미리보기

### PC 등 큰 화면 예시

![image](https://user-images.githubusercontent.com/90481975/204800604-8de6d3ed-04ec-494b-86f4-2dbf02c9b11b.png)

초기 화면입니다.

![image](https://user-images.githubusercontent.com/90481975/204800725-e720172c-ee3b-41af-9cbc-6070edc0540f.png)

검색 결과 화면입니다. 입력한 도시의 현재 기온, 하늘 상태를 알 수 있고, 기온에 맞는 옷차림을 제시합니다.

![image](https://user-images.githubusercontent.com/90481975/204800884-977907b1-75e3-489d-a68d-a97f7984ddea.png)

현재 비가 온다면, 비와 관련한 메시지를 추가로 보여줍니다.

![image](https://user-images.githubusercontent.com/90481975/204799150-b91dae56-d9a9-4491-98b2-533c9c8600c0.png)

404 Not Found 에러 발생 메시지입니다.

![image](https://user-images.githubusercontent.com/90481975/204799310-b409748f-12d3-4b75-b498-aca142e627ce.png)

401 Unauthorized 에러 발생 화면입니다. url에 '/error'를 추가해 페이지를 확인했습니다.

### 모바일 등 작은 화면 예시

<img src="https://user-images.githubusercontent.com/90481975/204798371-9e195fd6-c321-4542-8efc-54bceb22973f.png" width="250px" />

초기 화면입니다.

<img src="https://user-images.githubusercontent.com/90481975/204798695-abc02b77-064b-43f9-986e-a6376b395e56.png" width="250px" />

검색 결과 화면입니다. 작은 화면에 맞게 배치를 바꾸었습니다.

<img src="https://user-images.githubusercontent.com/90481975/204798528-fae632e4-3c8a-49fd-be4a-7379114d8632.png" width="250px" />

404 Not Found 에러 발생 메시지입니다.

<img src="https://user-images.githubusercontent.com/90481975/204798808-cc2a84b6-5f6a-4bc3-a536-e22d0f35b714.png" width="250px" />

401 Unauthorized 에러 발생 화면입니다.

## 📍 업데이트 내역

✨ 깃헙에서 클론해 실행 시 API Key가 없어 기온 정보를 가져오지 못합니다. 이에 netlify를 이용해 서비스를 배포했습니다. [여기](https://what-2-wear-today.netlify.app/)에서 확인 가능합니다. (2022.11.23.)

✨ 다양한 브라우저에서 편하게 사용할 수 있도록 반응형 웹페이지로 수정했습니다. (2022.11.23.)

✨ 에러 발생 관련 안내를 추가했습니다. (2022.11.30.)

- 인증 에러(401) 발생 시 해당 사항을 안내하는 페이지를 추가했습니다. (경로: /error)

- NotFound 에러 (404) 발생 시 해당 사항을 안내하는 문구를 추가했습니다. 도시 이름을 실수로 잘못 입력하는 경우에도 404 에러가 발생하기에, 다른 페이지로 이동하지 않고 바로 문구가 나타나도록 했습니다. 사용자가 자신이 입력한 내용을 바로 확인하고 다시 검색할 수 있습니다.
