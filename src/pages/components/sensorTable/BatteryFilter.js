import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

function BatteryFilter({ setSensorData, originalSensorData }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const [condition, setCondition] = useState();
  const BatteryFilterHandler = e => {
    setOpen(!open);
    setCondition(
      e.target.textContent.slice(0, e.target.textContent.length - 2),
    );
  };
  useEffect(() => {
    setSensorData(() =>
      [...originalSensorData].filter(data => data.shadow.batLvl <= condition),
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
      <DropdownBtn onClick={() => setOpen(!open)}>Bat.(%)</DropdownBtn>
      {open && (
        <DropdownList ref={ref}>
          <DropdownItem onClick={BatteryFilterHandler}>100%↓</DropdownItem>
          <DropdownItem onClick={BatteryFilterHandler}>80%↓</DropdownItem>
          <DropdownItem onClick={BatteryFilterHandler}>60%↓</DropdownItem>
          <DropdownItem onClick={BatteryFilterHandler}>40%↓</DropdownItem>
          <DropdownItem onClick={BatteryFilterHandler}>20%↓</DropdownItem>
        </DropdownList>
      )}
    </>
  );
}

export default BatteryFilter;

const DropdownBtn = styled.div`
  font-weight: 600;
  font-size: 1.3rem;
  cursor: pointer;
`;
const DropdownList = styled.div`
  position: absolute;
  background-color: #fff;
  border: 1px solid black;
`;
const DropdownItem = styled.div`
  cursor: pointer;
  :hover {
    color: gray;
  }
`;
