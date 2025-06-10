import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const COLORS = [
  '#0088FE', '#FF6384', '#FFCE56', '#00C49F', '#FFBB28',
  '#FF8042', '#A28CFF', '#FFB6B9', '#36A2EB', '#4BC0C0',
  '#F67280', '#C06C84', '#6C5B7B', '#355C7D', '#99B898',
  '#E94E77', '#542733', '#53777A', '#FFD700', '#B5EAD7'
];

const PieChart = ({ data }) => {
  if (!data || !data.labels || !data.datasets || !data.datasets[0]) {
    return <div>Không có dữ liệu thống kê</div>;
  }

  // Tự động gán màu cho từng phần
  const backgroundColor = data.labels.map((_, idx) => COLORS[idx % COLORS.length]);
  data.datasets[0].backgroundColor = backgroundColor;
  data.datasets[0].borderColor = '#fff';
  data.datasets[0].borderWidth = 2;
  data.datasets[0].hoverOffset = 16;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        align: 'center',
        labels: {
          boxWidth: 24,
          boxHeight: 16,
          borderRadius: 8,
          font: {
            size: 16,
            family: "'Segoe UI', 'Roboto', 'Arial', sans-serif",
            weight: 'bold'
          },
          padding: 18
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#fff',
        titleColor: '#333',
        bodyColor: '#333',
        borderColor: '#6c5ce7',
        borderWidth: 1,
        padding: 12,
        caretSize: 8,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value}`;
          }
        }
      },
      datalabels: {
        color: '#fff',
        font: {
          weight: 'bold',
          size: 16
        },
        formatter: (value, ctx) => {
          const sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = ((value * 100) / sum).toFixed(1) + '%';
          return percentage;
        },
        textShadowBlur: 10,
        textShadowColor: 'rgba(0,0,0,0.75)'
      }
    },
    layout: {
      padding: 24
    }
  };

  return (
    <div style={{ width: '600px', height: '600px', margin: '0 auto' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
