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
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

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
      },
      {
        labels: createAt.map(time => time),
        datasets: [
          {
            label: '',
            data: humidity,
            borderColor: 'rgba(196,196,196, 0.6)',
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
            borderColor: 'rgba(196,196,196, 0.6)',
            backgroundColor: 'rgba(39, 127, 242)',
          },
        ],
      },
    ];
  }

  return (
    <Wrap>
      <header>
        <div className="headerContainer">
          <div className="leftContainer">
            <FontAwesomeIcon icon={faPlus} size="2x" />
            <FontAwesomeIcon icon={faMinus} size="2x" />
          </div>
          <div className="rightContainer">
            <button>EXPORT</button>
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
      <MainContainer>
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
                <span>{i === 0 ? '기온' : i === 1 ? '습도' : '압력'}</span>
              </h1>
              <div className="graphBox">
                <GraphBox data={dataEl} />
              </div>
            </div>
          ))}
      </MainContainer>
    </Wrap>
  );
};

export default Graph;

const MainContainer = styled.main``;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  header {
    position: fixed;
    top: 0;
    width: 100%;
    padding: 20px;
    background-color: rgba(39, 127, 242);

    .headerContainer {
      max-width: 1200px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      color: #fff;
      padding: 0 8px;

      .leftContainer {
        svg {
          cursor: pointer;
          &:first-child {
            margin-right: 10px;
          }
          &:active {
            color: #d1d1d1;
          }
        }
      }
      .rightContainer {
        display: flex;

        button {
          margin-right: 30px;
          border: 2px solid #fff;
          border-radius: 5px;
          background-color: ${({ theme }) => theme.mainBlue};
          color: #fff;
          font-weight: 700;
          font-size: 1rem;

          span {
            cursor: pointer;
            @media screen and (max-width: ${({ theme }) => theme.iPhoneXr}) {
              display: none;
            }
            &:active {
              background-color: #fff;
              color: ${({ theme }) => theme.mainBlue};
            }
          }

          .calendar-box {
            color: #fff;
            font-size: 25px;
            font-weight: 700;
            &:active {
              color: #d1d1d1;
            }

            span {
              cursor: pointer;
            }
            svg {
              margin-right: 5px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  ${MainContainer} {
    max-width: 1200px;
    width: 100%;

    .title {
      text-align: center;
      margin-top: 100px;

      &:first-child {
        margin-top: 150px;
      }

      span {
        display: inline-block;
        width: 50px;
        padding: 8px;
        background-color: #1c74e8;
        border-radius: 30px;
        font-weight: 700;
        font-size: 20px;
        text-align: center;
        color: #fff;
        box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
          0 1px 3px rgba(0, 0, 0, 0.08);
      }
    }

    .graphBox {
      margin-top: 20px;
      margin-bottom: 50px;
      padding: 30px;
      border-radius: 20px;
      box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
        0 1px 3px rgba(0, 0, 0, 0.08);
    }
  }
`;
