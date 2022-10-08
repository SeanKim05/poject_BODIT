import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';

const ModalCalendar = ({ startDate, setModal, handleClick }) => {
  return (
    <CalendatContainer>
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
      <button onClick={() => setModal(false)}>취소</button>
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
  }
  .react-datepicker__current-month {
    padding: 14px;
    font-size: 20px;
  }
  .react-datepicker__day-names {
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    width: 80%;
    font-size: 17px;
  }
  .react-datepicker__week {
    width: 82%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    padding: 15px;
    font-size: 15px;
  }
`;
