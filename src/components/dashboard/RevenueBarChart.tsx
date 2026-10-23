// src/components/dashboard/RevenueBarChart.tsx
"use client";
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

interface RevenueBarChartProps {
  chartData: ChartData<'bar'>;
  chartOptions: ChartOptions<'bar'>;
}

const RevenueBarChart = ({ chartData, chartOptions }: RevenueBarChartProps) => {
  return (
    <div className="c-chart-container">
      <h2 className="c-chart-container__title">Monthly Revenue</h2>
      <Bar data={chartData} options={chartOptions} aria-label="Bar chart of monthly revenue (sample data)" role="img" />
    </div>
  );
};

export default RevenueBarChart;