import styled from 'styled-components';

export const TableContainer = styled.div`
  .sensorInfoTable {
    width: 100%;

    .tableRow {
      border: 0.063rem solid black;

      th {
        font-weight: 600;
        font-size: 1.3rem;
      }
    }

    .itemIndex {
      font-weight: 600;
    }

    td {
      text-align: center;
      border-bottom: 0.063rem solid #ebedee;
      padding: 15px 15px;
    }
  }
`;
