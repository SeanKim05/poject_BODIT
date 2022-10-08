import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

function CardFilter() {
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
        <th onClick={() => setOpen(!open)}>Card No.</th>
      </DropdownBtn>
      {open && (
        <DropdownList ref={ref}>
          <DropdownItem>Card No. 0</DropdownItem>
          <DropdownItem>Card No. 1</DropdownItem>
        </DropdownList>
      )}
    </>
  );
}

export default CardFilter;

const DropdownBtn = styled.div`
  cursor: pointer;
`;
const DropdownList = styled.div`
  position: absolute;
  border: 1px solid black;
`;
const DropdownItem = styled.div`
  font-size: 17px;
  cursor: pointer;
`;
