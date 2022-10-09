import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

function HardwareFilter({ setSensorData, originalSensorData }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const [condition, setCondition] = useState();
  const HardwareFilterHandler = e => {
    setOpen(!open);
    setCondition(e.target.textContent);
  };
  useEffect(() => {
    setSensorData(() =>
      [...originalSensorData].filter(data =>
        '1.0.0' == condition
          ? data.shadow.hwVer == '1.0.0'
          : data.shadow.hwVer != '1.0.0',
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
      <DropdownBtn onClick={() => setOpen(!open)}>H/W ver.</DropdownBtn>
      {open && (
        <DropdownList ref={ref}>
          <DropdownItem onClick={HardwareFilterHandler}>1.0.0</DropdownItem>
          <DropdownItem onClick={HardwareFilterHandler}>Others</DropdownItem>
        </DropdownList>
      )}
    </>
  );
}

export default HardwareFilter;

const DropdownBtn = styled.div`
  font-weight: 600;
  font-size: 1.3rem;
  cursor: pointer;
`;
const DropdownList = styled.div`
  position: absolute;
  width: 95px;
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
