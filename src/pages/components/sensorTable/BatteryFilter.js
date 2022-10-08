import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

function BatteryFilter() {
  const [open, setOpen] = useState(false);
  const ref = useRef();
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
      <DropdownBtn>
        <th onClick={() => setOpen(!open)}>Bat.(%)</th>
      </DropdownBtn>
      {open && (
        <DropdownList ref={ref}>
          <DropdownItem>Low Battery</DropdownItem>
        </DropdownList>
      )}
    </>
  );
}

export default BatteryFilter;

const DropdownBtn = styled.div`
  cursor: pointer;
`;
const DropdownList = styled.div`
  position: absolute;
  border: 1px solid black;
`;
const DropdownItem = styled.div`
  cursor: pointer;
`;
