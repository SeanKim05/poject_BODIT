import React from 'react';
import styled from 'styled-components';

function Main() {
  return (
    <MainContainer>
      <MainWrapper>
        <div>
          <p>BODIT</p>
        </div>
      </MainWrapper>
    </MainContainer>
  );
}

export default Main;

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #d3b9eb;
`;

const MainWrapper = styled.div`
  width: 450px;
  height: 600px;
  background-color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 600px;
  }
`;
