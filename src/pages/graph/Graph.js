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
import ModalCalendar from './components/ModalCalendar';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import zoomPlugin from 'chartjs-plugin-zoom';
import * as S from './Graph.styled';

const Graph = () => {
  const [temp, setTemp] = useState();
  const [humidity, setHumidity] = useState();
  const [pressure, setPressure] = useState();
  const [createdAt, setCreatedAt] = useState();
  const [originalCreatedAt, setOriginalCreatedAt] = useState();

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
        setOriginalCreatedAt(data.feeds.map(feed => feed.created_at));
      });
  }, [pickDay]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    zoomPlugin,
  );

  let data;

  if (createdAt) {
    data = [
      {
        labels: createdAt.map(time => time),
        datasets: [
          {
            label: '',
            data: temp,
            borderColor: 'rgba(196,196,196, 0.6)',
            backgroundColor: temp.map(tempEl =>
              tempEl >= 30
                ? '#f65446'
                : tempEl >= 20
                ? '#3cc926'
                : 'rgb(39, 127, 242)',
            ),
          },
        ],
        options: {
          plugins: {
            zoom: {
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: 'xy',
              },
            },
          },
        },
      },
      {
        labels: createdAt.map(time => time),
        datasets: [
          {
            label: '',
            data: humidity,
            borderColor: 'rgba(196,196,196, 0.6)',
            backgroundColor: 'rgba(39, 127, 242)',
          },
        ],
        options: {
          plugins: {
            zoom: {
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: 'xy',
              },
            },
          },
        },
      },
      {
        labels: createdAt.map(time => time),
        datasets: [
          {
            label: '',
            data: pressure,
            borderColor: 'rgba(196,196,196, 0.6)',
            backgroundColor: 'rgba(39, 127, 242)',
          },
        ],
        options: {
          plugins: {
            zoom: {
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: 'xy',
              },
            },
          },
        },
      },
    ];
  }

  const csvHeaders = [
    { label: 'Temp', key: 'temp' },
    { label: 'Humidity', key: 'humidity' },
    { label: 'Pressure', key: 'pressure' },
    { label: 'Created at', key: 'created_at' },
  ];

  let csvData = [];
  if (createdAt) {
    for (let i = 0; i < createdAt.length; i++) {
      csvData.push({
        temp: temp[i],
        humidity: humidity[i],
        pressure: pressure[i],
        created_at: originalCreatedAt[i],
      });
    }
  }

  return (
    <S.Wrap>
      <header>
        <div className="headerContainer">
          <div className="leftContainer">
            <FontAwesomeIcon icon={faPlus} size="2x" />
            <FontAwesomeIcon icon={faMinus} size="2x" />
          </div>
          <div className="rightContainer">
            <button>
              <S.CSVButton header={csvHeaders} data={csvData}>
                EXPORT
              </S.CSVButton>
            </button>
            <p
              className="calendar-box"
              onClick={() => {
                setModal(true);
              }}
            >
              <FontAwesomeIcon icon={faCalendar} /> <span>{pickDay}</span>
            </p>
          </div>
        </div>
      </header>
      <S.MainContainer>
        {modal && (
          <ModalCalendar
            setModal={setModal}
            startDate={startDate}
            setStartDate={setStartDate}
            handleClick={handleClick}
          />
        )}
        {createdAt?.length > 0 ? (
          data.map((dataEl, i) => (
            <div key={i}>
              <h1 className="title">
                <span>{i === 0 ? '기온' : i === 1 ? '습도' : '압력'}</span>
              </h1>
              <div className="graphBox">
                <GraphBox data={dataEl} />
              </div>
            </div>
          ))
        ) : (
          <div className="empty-data">해당 날짜에 데이터가 없습니다.</div>
        )}
      </S.MainContainer>
    </S.Wrap>
  );
};

export default Graph;
