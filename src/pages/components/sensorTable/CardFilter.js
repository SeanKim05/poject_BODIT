import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

function CardFilter({ setSensorData, originalSensorData }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const [condition, setCondition] = useState();
  const CardFilterHandler = e => {
    setOpen(!open);
    setCondition(e.target.textContent);
  };
  useEffect(() => {
    setSensorData(() =>
      [...originalSensorData].filter(
        data => data.shadow.connCardNum == condition,
      ),
    );
  }, [condition]);
  useEffect(() => {
    const clickOutside = e => {
      if (open && ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', clickOutside);

    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [open]);

  return (
    <>
      <DropdownBtn onClick={() => setOpen(!open)}>Card No.</DropdownBtn>
      {open && (
        <DropdownList ref={ref}>
          <DropdownItem onClick={CardFilterHandler}>0</DropdownItem>
          <DropdownItem onClick={CardFilterHandler}>1</DropdownItem>
        </DropdownList>
      )}
    </>
  );
}

export default CardFilter;

const DropdownBtn = styled.div`
  font-weight: 600;
  font-size: 1.3rem;
  cursor: pointer;
`;
const DropdownList = styled.div`
  position: absolute;
  width: 55px;
  background-color: #fff;
  border: 1px solid black;
`;
const DropdownItem = styled.div`
  font-size: 17px;
  cursor: pointer;
  :hover {
    color: gray;
  }
`;
