import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);

const BarChart = ({ data }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
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
                        const label = context.dataset.label || '';
                        const value = context.parsed.y || 0;
                        return `${label}: ${value}`;
                    }
                }
            },
            datalabels: {
                color: '#333',
                anchor: 'end',
                align: 'top',
                offset: 4,
                font: {
                    weight: 'bold',
                    size: 14
                },
                formatter: (value) => {
                    return value;
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: '#f0f0f0'
                },
                ticks: {
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    padding: 10
                }
            }
        },
        layout: {
            padding: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
            }
        },
        animation: {
            duration: 2000,
            easing: 'easeInOutQuart'
        }
    };

    // Thêm màu sắc cho các cột
    if (data.datasets) {
        data.datasets = data.datasets.map(dataset => ({
            ...dataset,
            backgroundColor: '#6c5ce7',
            borderColor: '#6c5ce7',
            borderWidth: 2,
            borderRadius: 8,
            barThickness: 40,
            maxBarThickness: 50,
            hoverBackgroundColor: '#a084ee',
            hoverBorderColor: '#a084ee'
        }));
    }

    return (
        <div style={{ 
            width: '100%', 
            height: '500px', 
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '16px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
        }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;
