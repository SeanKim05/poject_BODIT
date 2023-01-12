import { useEffect, useState } from 'react';
import SensorInfoTable from './components/SensorInfoTable';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Main() {
  const [sensorData, setSensorData] = useState([]);
  const [sortState, setSortState] = useState(false);
  const [originalSensorData, setOriginalSensorData] = useState([]);

  const navigate = useNavigate('');
  const goGraph = () => {
    navigate('/graph');
  };
  const ColSort = e => {
    setSensorData(
      sensorData.sort((a, b) => {
        setSortState(!sortState);
        switch (e.target.id) {
          case 'thingName':
            return sortState
              ? a.thingName.localeCompare(b.thingName)
              : a.thingName.localeCompare(b.thingName) * -1;
          case 'batLvl':
            return sortState
              ? b.shadow.batLvl - a.shadow.batLvl
              : a.shadow.batLvl - b.shadow.batLvl;
          case 'connAt':
            return sortState
              ? new Date(b.shadow.connAt) - new Date(a.shadow.connAt)
              : new Date(a.shadow.connAt) - new Date(b.shadow.connAt);
          case 'disconnAt':
            return sortState
              ? new Date(b.shadow.disconnAt) - new Date(a.shadow.disconnAt)
              : new Date(a.shadow.disconnAt) - new Date(b.shadow.disconnAt);
          case 'disconnReason':
            return sortState
              ? b.shadow.disconnReason - a.shadow.disconnReason
              : a.shadow.disconnReason - b.shadow.disconnReason;
          case 'connCardNum':
            return sortState
              ? b.shadow.connCardNum - a.shadow.connCardNum
              : a.shadow.connCardNum - b.shadow.connCardNum;
          case 'connGW':
            return sortState
              ? a.shadow.connGW.localeCompare(b.shadow.connGW)
              : a.shadow.connGW.localeCompare(b.shadow.connGW) * -1;
          case 'rawSentCnt':
            return sortState
              ? b.shadow.rawSentCnt - a.shadow.rawSentCnt
              : a.shadow.rawSentCnt - b.shadow.rawSentCnt;
          case 'remainData':
            return sortState
              ? b.shadow.remainData - a.shadow.remainData
              : a.shadow.remainData - b.shadow.remainData;
          case 'rssi':
            return sortState
              ? b.shadow.rssi - a.shadow.rssi
              : a.shadow.rssi - b.shadow.rssi;
          case 'fwVer':
            return sortState
              ? a.shadow.fwVer.localeCompare(b.shadow.fwVer)
              : a.shadow.fwVer.localeCompare(b.shadow.fwVer) * -1;
          case 'hwVer':
            return sortState
              ? a.shadow.hwVer.localeCompare(b.shadow.hwVer)
              : a.shadow.hwVer.localeCompare(b.shadow.hwVer) * -1;
        }
      }),
    );
  };

  useEffect(() => {
    fetch('/bodit-team2/data/SensorInfoList.json')
      .then(res => res.json())
      .then(data => {
        setSensorData(data.data);
        setOriginalSensorData(data.data);
      });
  }, []);

  return (
    <div>
      <BtnContainer>
        <ToGoGraphBtn onClick={goGraph}>GO GRAPH</ToGoGraphBtn>
      </BtnContainer>
      <div>
        <SensorInfoTable
          data={sensorData}
          setSensorData={setSensorData}
          originalSensorData={originalSensorData}
          setData={ColSort}
        />
      </div>
    </div>
  );
}

export default Main;

const BtnContainer = styled.div`
  padding: 20px;
  text-align: left;
  background-color: ${({ theme }) => theme.mainBlue};
`;

const ToGoGraphBtn = styled.button`
  color: white;
  margin-right: 1.563rem;
  border: 2px solid #fff;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.mainBlue};
  font-weight: 700;
  font-size: 1rem;
  &:active {
    background-color: #fff;
    color: ${({ theme }) => theme.mainBlue};
  }
`;
