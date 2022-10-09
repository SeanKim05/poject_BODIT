import BatteryFilter from './BatteryFilter';
import CardFilter from './CardFilter';
import FirmwareFilter from './FirmwareFIlter';
import HardwareFilter from './HardwareFilter';

function SensorTableThead(sensorTable) {
  return (
    <thead>
      <tr className="tableRow">
        <th>#</th>
        <th id="thingName" onClick={e => sensorTable.setSensorTableThead(e)}>
          thingName
        </th>
        <th>
          <BatteryFilter
            id="batLvl"
            setSensorData={sensorTable.setSensorData}
            originalSensorData={sensorTable.originalSensorData}
          />
          <img
            src={process.env.PUBLIC_URL + '/sort.png'}
            id="batLvl"
            className="sortImg"
            onClick={e => sensorTable.setSensorTableThead(e)}
          />
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
        <th>
          <CardFilter
            id="connCardNum"
            setSensorData={sensorTable.setSensorData}
            originalSensorData={sensorTable.originalSensorData}
          />
          <img
            src={process.env.PUBLIC_URL + '/sort.png'}
            id="connCardNum"
            className="sortImg"
            onClick={e => sensorTable.setSensorTableThead(e)}
          />
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
        <th>
          <FirmwareFilter
            setSensorData={sensorTable.setSensorData}
            originalSensorData={sensorTable.originalSensorData}
          />
          <img
            src={process.env.PUBLIC_URL + '/sort.png'}
            id="fwVer"
            className="sortImg"
            onClick={e => sensorTable.setSensorTableThead(e)}
          />
        </th>
        <th>
          <HardwareFilter
            setSensorData={sensorTable.setSensorData}
            originalSensorData={sensorTable.originalSensorData}
          />
          <img
            src={process.env.PUBLIC_URL + '/sort.png'}
            id="hwVer"
            className="sortImg"
            onClick={e => sensorTable.setSensorTableThead(e)}
          />
        </th>
      </tr>
    </thead>
  );
}

export default SensorTableThead;
