function SensoTableThead(sensorTable) {
  return (
    <thead>
      <tr className="tableRow">
        <th>#</th>
        <th id="thingName" onClick={e => sensorTable.setSensorTableThead(e)}>
          thingName
        </th>
        <th id="batLvl" onClick={e => sensorTable.setSensorTableThead(e)}>
          Bat.(%)
        </th>
        <th id="connAt" onClick={e => sensorTable.setSensorTableThead(e)}>
          Connected at
        </th>
        <th id="disconnAt" onClick={e => sensorTable.setSensorTableThead(e)}>
          Disconnected at
        </th>
        <th
          id="disconnReason"
          onClick={e => sensorTable.setSensorTableThead(e)}
        >
          Reason
        </th>
        <th id="connCardNum" onClick={e => sensorTable.setSensorTableThead(e)}>
          Card No.
        </th>
        <th id="connGW" onClick={e => sensorTable.setSensorTableThead(e)}>
          Gateway
        </th>
        <th id="rawSentCnt" onClick={e => sensorTable.setSensorTableThead(e)}>
          Raw sent
        </th>
        <th id="remainData" onClick={e => sensorTable.setSensorTableThead(e)}>
          Remain
        </th>
        <th id="rssi" onClick={e => sensorTable.setSensorTableThead(e)}>
          RSSI
        </th>
        <th id="fwVer" onClick={e => sensorTable.setSensorTableThead(e)}>
          F/W ver.
        </th>
        <th id="hwVer" onClick={e => sensorTable.setSensorTableThead(e)}>
          H/W ver.
        </th>
      </tr>
    </thead>
  );
}

export default SensoTableThead;
