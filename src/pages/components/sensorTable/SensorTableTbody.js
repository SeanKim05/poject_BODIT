function sensorTableTbody(sensorTable) {
  return (
    <tbody>
      {sensorTable.sensorTableBody.data.map((item, index) => (
        <tr key={item.thingName}>
          <td className="itemIndex">{index}</td>
          <td>{item.thingName}</td>
          <td>{item.shadow.batLvl}</td>
          <td>{item.shadow.connectionTime}</td>
          <td>{item.shadow.disconnectionTime}</td>
          <td>{item.shadow.disconnReason}</td>
          <td>{item.shadow.connCardNum}</td>
          <td>{item.shadow.connectedGateway}</td>
          <td>{item.shadow.rawSentCnt}</td>
          <td>{item.shadow.remainData}</td>
          <td>{item.shadow.rssi}</td>
          <td>{item.shadow.fwVer}</td>
          <td>{item.shadow.hwVer}</td>
        </tr>
      ))}
    </tbody>
  );
}

export default sensorTableTbody;
