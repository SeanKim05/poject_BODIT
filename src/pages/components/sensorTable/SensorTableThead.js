import BatteryFilter from './BatteryFilter';
import CardFilter from './CardFilter';
import HardwareFilter from './HardwareFilter';

function SensorTableThead({ setSensorData, originalSensorData }) {
  return (
    <thead>
      <tr className="tableRow">
        <th>#</th>
        <th>thingName</th>
        <BatteryFilter
          setSensorData={setSensorData}
          originalSensorData={originalSensorData}
        />
        <th>Connected at</th>
        <th>Disconnected at</th>
        <th>Reason</th>
        <CardFilter
          setSensorData={setSensorData}
          originalSensorData={originalSensorData}
        />
        <th>Gateway</th>
        <th>Raw sent</th>
        <th>Remain</th>
        <th>RSSI</th>
        <th>F/W ver.</th>
        <HardwareFilter
          setSensorData={setSensorData}
          originalSensorData={originalSensorData}
        />
      </tr>
    </thead>
  );
}

export default SensorTableThead;
