import styled from 'styled-components';

export const TableContainer = styled.div`
  .sensorInfoTable {
    width: 100%;

    .tableRow {
      border: 0.063rem solid black;

      th {
        font-weight: 600;
        font-size: 1.3rem;
        cursor: pointer;
      }
    }

    .itemIndex {
      font-weight: 600;
    }

    tr.onHover {
      background-color: grey;
    }
    tr.onLeave {
      background-color: inherit;
    }

    td {
      text-align: center;
      border-bottom: 0.063rem solid #ebedee;
      padding: 15px 15px;
    }

    td.bat_lvl_stat {
      color: inherit;
    }

    td.bat_lvl_stat_low {
      color: red;
    }
  }
`;
