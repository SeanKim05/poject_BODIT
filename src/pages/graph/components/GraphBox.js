import { Line } from 'react-chartjs-2';

const GraphBox = ({ data }) => (
  <div>
    <Line data={data} />
  </div>
);

export default GraphBox;
