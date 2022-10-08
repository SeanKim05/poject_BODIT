import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';

const ModalCalendar = ({ startDate, handleClick, setModal }) => {
  const calendar = useRef(null);
  return (
    <CalendatContainer
      ref={calendar}
      onClick={e => {
        if (calendar.current === e.target) {
          setModal(false);
        }
      }}
    >
      <DatePicker
        className="calendar-box"
        onChange={e => {
          handleClick(e);
        }}
        locale={ko}
        startDate={startDate}
        shouldCloseOnSelect={false}
        inline
      />
    </CalendatContainer>
  );
};

export default ModalCalendar;

const CalendatContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000099;
  z-index: 1;

  .react-datepicker__month-container {
    width: 600px;
    height: 500px;
    z-index: 100;

    @media screen and (max-width: ${({ theme }) => theme.surfaceDuo}) {
      width: 360px;
      height: 410px;
    }

    @media screen and (max-width: ${({ theme }) => theme.iPhoneXr}) {
      width: 350px;
      height: 400px;
    }
    @media screen and (max-width: ${({ theme }) => theme.pixel5}) {
      width: 320px;
      height: 370px;
    }
    @media screen and (max-width: ${({ theme }) => theme.iPhoneSe}) {
      width: 300px;
      height: 350px;
    }
  }
  .react-datepicker__header {
  }
  .react-datepicker__current-month {
    padding: 18px;
    font-size: 22px;
  }
  .react-datepicker__day-names {
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    width: 80%;
    font-size: 17px;
  }
  .react-datepicker__week {
    display: flex;
    justify-content: space-around;
    width: 82%;
    margin: 0 auto;
    padding: 15px;
    font-size: 15px;
    @media screen and (max-width: ${({ theme }) => theme.iPhoneXr}) {
      padding: 8px;
    }
  }

  .react-datepicker__day--keyboard-selected {
    background-color: rgb(218, 122, 79);
    border-radius: 50%;
  }
`;
