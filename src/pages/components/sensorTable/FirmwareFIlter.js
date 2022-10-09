import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

function FirmwareFilter({ setSensorData, originalSensorData }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const [condition, setCondition] = useState();
  const FirmwareFilterHandler = e => {
    setOpen(!open);
    setCondition(e.target.textContent);
  };
  useEffect(() => {
    setSensorData(() =>
      [...originalSensorData].filter(data =>
        '1.0.0' == condition
          ? data.shadow.fwVer == '1.0.0'
          : data.shadow.fwVer != '1.0.0',
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
      <DropdownBtn onClick={() => setOpen(!open)}>F/W ver.</DropdownBtn>
      {open && (
        <DropdownList ref={ref}>
          <DropdownItem onClick={FirmwareFilterHandler}>1.0.0</DropdownItem>
          <DropdownItem onClick={FirmwareFilterHandler}>Others</DropdownItem>
        </DropdownList>
      )}
    </>
  );
}

export default FirmwareFilter;

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
