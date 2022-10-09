import styled from 'styled-components';

export const TableContainer = styled.div`
  .sensorInfoTable {
    width: 100%;

    .tableRow {
      border: 0.063rem solid black;

      th {
        padding: 0.2rem 0.2rem;
        font-weight: 600;
        font-size: 1.4rem;
        cursor: pointer;
      }

      .sortImg {
        margin-left: 0.125rem;
        margin-top: 0.125rem;
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
      padding: 0.938rem 0.938rem;
      font-weight: 600;
      text-align: center;
      border-bottom: 0.063rem solid #ebedee;
    }

    td.bat_lvl_stat {
      color: inherit;
    }

    td.bat_lvl_stat_low {
      color: red;
    }
  }
`;
