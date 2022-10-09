import { useEffect, useState } from 'react';
import React from 'react';
import styled from 'styled-components';
import SensorInfoTable from './components/SensorInfoTable';

function Main() {
  const [sensorData, setSensorData] = useState([]);
  const [sortState, setSortState] = useState(false);
  // let url =
  //   'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a1db46b3-41b2-4a81-b7c6-5f85e7842cca/sensor-info-list.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221007%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221007T132442Z&X-Amz-Expires=86400&X-Amz-Signature=d90a20321e972cc75774c2e445c8e4724ed15f15b99cd1cba82ffa9a4bef1461&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22sensor-info-list.json%22&x-id=GetObject';

  const ColSort = e => {
    setSensorData(
      sensorData.sort((a, b) => {
        console.log(e.target);
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
    fetch('./data/SensorInfoList.json')
      // fetch(url)
      .then(res => res.json())
      .then(data => setSensorData(data));
  }, []);

  return (
    <MainContainer>
      <MainWrapper>
        <SensorInfoTable data={sensorData} setData={ColSort} />
      </MainWrapper>
    </MainContainer>
  );
}

export default Main;

const MainContainer = styled.div`
  /* width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #d3b9eb; */
`;

const MainWrapper = styled.div`
  /* width: 450px;
  height: 600px;
  background-color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 600px;
  } */
`;
