import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

function HardwareFilter() {
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
      <Dropdownbtn>
        <th onClick={() => setOpen(!open)}>H/W ver.</th>
      </Dropdownbtn>
      {open && (
        <DropdownList ref={ref}>
          <DropdownItem>1.0.0</DropdownItem>
          <DropdownItem>Others</DropdownItem>
        </DropdownList>
      )}
    </>
  );
}

export default HardwareFilter;

const Dropdownbtn = styled.div`
  cursor: pointer;
`;
const DropdownList = styled.div`
  position: absolute;
  width: 95px;
  border: 1px solid black;
`;
const DropdownItem = styled.div`
  font-size: 17px;
  cursor: pointer;
`;
