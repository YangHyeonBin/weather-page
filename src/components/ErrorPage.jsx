// 현재는 401 에러만 안내하고 있습니다.

import React from 'react';
import styled from 'styled-components';

const MAIL_ADDRESS = 'idgusqls0506@gmail.com';

export default function ErrorPage() {
  return (
    <AuthErrorBox>
      <h1 className='error-title'>인증 오류가 발생했습니다.</h1>
      <p className='error-message'>
        인증 오류가 발생했다는 내용의 메일을 {MAIL_ADDRESS}으로 보내주시면
        원인을 파악해 조치를 취하도록 하겠습니다.
      </p>
      <p className='error-message'>이용에 불편을 드려 죄송합니다.</p>
    </AuthErrorBox>
  );
}

const AuthErrorBox = styled.section`
  height: 100vh;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  .error-title {
    font-size: 2rem;
    margin-bottom: 1em;

    @media screen and (max-width: 48rem) {
      font-size: 1.5rem;
    }
  }

  .error-message {
    font-size: 1.25rem;
    margin-bottom: 1em;

    @media screen and (max-width: 48rem) {
      font-size: 1rem;
    }
  }

  .error-message:last-child {
    margin-bottom: 0;
  }
`;
