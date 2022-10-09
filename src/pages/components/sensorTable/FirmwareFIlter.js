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
      [...originalSensorData].filter(data => data.shadow.fwVer == condition),
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
      <Dropdownbtn>
        <th onClick={() => setOpen(!open)}>F/W ver.</th>
      </Dropdownbtn>
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

const Dropdownbtn = styled.div`
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
