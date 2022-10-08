import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';
import GraphBox from './components/GraphBox';
import styled from 'styled-components';
import ModalCalendar from './components/ModalCalendar';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';

const Graph = () => {
  const [temp, setTemp] = useState();
  const [humidity, setHumidity] = useState();
  const [pressure, setPressure] = useState();
  const [createAt, setCreatedAt] = useState();

  const [modal, setModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const handleClick = date => {
    setStartDate(date);
    if (date) {
      setModal(prev => !prev);
    }
  };
  const pickDay = moment(startDate).format('YYYY-MM-DD');
  const tommorow = moment(pickDay).add(1, 'd').format('YYYY-MM-DD');

  useEffect(() => {
    fetch(
      `https://api.thingspeak.com/channels/1348864/feeds.json?api_key=6SKW0U97IPV2QQV9&start=${pickDay}&end=${tommorow}`,
    )
      .then(res => res.json())
      .then(data => {
        setTemp(data.feeds.map(feed => +feed.field1));
        setHumidity(data.feeds.map(feed => +feed.field2));
        setPressure(data.feeds.map(feed => +feed.field3));
        setCreatedAt(
          data.feeds.map(
            feed =>
              `${new Date(feed.created_at).getUTCHours()}시 ${new Date(
                feed.created_at,
              ).getUTCMinutes()}분`,
          ),
        );
      });
  }, [pickDay]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
  );

  let data;

  if (createAt) {
    data = [
      {
        labels: createAt.map(time => time),
        datasets: [
          {
            label: '',
            data: temp,
            borderColor: 'rgba(39, 127, 242, 0.5)',
            backgroundColor: 'rgba(39, 127, 242)',
          },
        ],
      },
      {
        labels: createAt.map(time => time),
        datasets: [
          {
            label: '',
            data: humidity,
            borderColor: 'rgba(39, 127, 242, 0.5)',
            backgroundColor: 'rgba(39, 127, 242)',
          },
        ],
      },
      {
        labels: createAt.map(time => time),
        datasets: [
          {
            label: '',
            data: pressure,
            borderColor: 'rgba(39, 127, 242, 0.5)',
            backgroundColor: 'rgba(39, 127, 242)',
          },
        ],
      },
    ];
  }

  return (
    <MainContainer>
      <p
        className="calendar-box"
        onClick={() => {
          setModal(true);
        }}
      >
        {pickDay} <FontAwesomeIcon icon={faCalendarDays} />
      </p>
      {modal && (
        <ModalCalendar
          setModal={setModal}
          startDate={startDate}
          setStartDate={setStartDate}
          handleClick={handleClick}
        />
      )}
      {createAt &&
        data.map((dataEl, i) => (
          <div key={i}>
            <h1 className="title">
              {i === 0 ? '기온' : i === 1 ? '습도' : '압력'}
            </h1>
            <div className="graphBox">
              <GraphBox data={dataEl} />
            </div>
          </div>
        ))}
    </MainContainer>
  );
};

export default Graph;

const MainContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 100px auto;

  .calendar-box {
    font-size: 30px;
  }

  .title {
    margin-top: 100px;
    font-weight: 700;
    font-size: 20px;
    text-align: center;
    color: #222;
  }
  .graphBox {
    margin-top: 20px;
    margin-bottom: 50px;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  }
`;
