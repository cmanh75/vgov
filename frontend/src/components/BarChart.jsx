import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const BarChart = ({ data }) => {
    return (
        <div>
            <Bar data={data} />
        </div>
    );
};

export default BarChart;
