import { useState, useRef, useEffect } from 'react';

function SensorTableTbody(sensorTable) {
  const [hover, setHover] = useState(false);
  const [batStatOk, setBatStatOk] = useState(false);

  const mouseHandler = e => (e === hover ? setHover(false) : setHover(e));

  return (
    <tbody>
      {sensorTable.sensorTableBody.data.map((item, index) => {
        return (
          <tr
            key={item.thingName}
            className={hover === index ? 'onHover' : 'onLeave'}
            onMouseEnter={() => {
              mouseHandler(index);
            }}
          >
            <td className="itemIndex">{index + 1}</td>
            <td>{item.thingName}</td>
            {item.shadow.batLvl > 20 ? (
              <td className="bat_lvl_stat">{item.shadow.batLvl}</td>
            ) : (
              <td className="bat_lvl_stat_low">{item.shadow.batLvl}</td>
            )}
            <td>{item.shadow.connAt}</td>
            <td>{item.shadow.disconnAt}</td>
            <td>{item.shadow.disconnReason}</td>
            <td>{item.shadow.connCardNum}</td>
            <td>{item.shadow.connGW}</td>
            <td>{item.shadow.rawSentCnt}</td>
            <td>{item.shadow.remainData}</td>
            <td>{item.shadow.rssi}</td>
            <td>{item.shadow.fwVer}</td>
            <td>{item.shadow.hwVer}</td>
          </tr>
        );
      })}
    </tbody>
  );
}

export default SensorTableTbody;
