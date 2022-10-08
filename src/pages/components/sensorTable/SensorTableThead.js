import BatteryFilter from './BatteryFilter';
import CardFilter from './CardFilter';
import HardwareFilter from './HardwareFilter';

function SensorTableThead() {
  return (
    <thead>
      <tr className="tableRow">
        <th>#</th>
        <th>thingName</th>
        <BatteryFilter />
        <th>Connected at</th>
        <th>Disconnected at</th>
        <th>Reason</th>
        <CardFilter />
        <th>Gateway</th>
        <th>Raw sent</th>
        <th>Remain</th>
        <th>RSSI</th>
        <th>F/W ver.</th>
        <HardwareFilter />
      </tr>
    </thead>
  );
}

export default SensorTableThead;
