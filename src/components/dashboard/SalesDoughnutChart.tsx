// src/components/dashboard/SalesDoughnutChart.tsx
"use client";
import { Doughnut } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

interface SalesDoughnutChartProps {
  chartData: ChartData<'doughnut'>;
  chartOptions: ChartOptions<'doughnut'>;
}

const SalesDoughnutChart = ({ chartData, chartOptions }: SalesDoughnutChartProps) => {
  return (
    <div className="c-chart-container">
      <h3 className="c-chart-container__title">Sales by Region</h3>
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
};

export default SalesDoughnutChart;