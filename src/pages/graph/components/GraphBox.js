import { Line } from 'react-chartjs-2';

const GraphBox = ({ data }) => (
  <div>
    <Line data={data} options={data.options} />
  </div>
);

export default GraphBox;
