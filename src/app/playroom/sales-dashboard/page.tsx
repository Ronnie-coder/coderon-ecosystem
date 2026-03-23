// src/app/playroom/sales-dashboard/page.tsx
"use client";

import Link from 'next/link';
import { useMemo } from 'react';
import { faker } from '@faker-js/faker';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartOptions,
  ChartData
} from 'chart.js';
import { FaArrowLeft, FaDollarSign, FaUsers, FaChartLine } from 'react-icons/fa';

// Import our custom components
import StatCard from '@/components/dashboard/StatCard';
import RevenueBarChart from '@/components/dashboard/RevenueBarChart';
import SalesDoughnutChart from '@/components/dashboard/SalesDoughnutChart';

// Register the chart components we need. This is crucial.
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const SalesDashboardPage = () => {
  const dashboardData = useMemo(() => {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    const totalRevenue = faker.number.int({ min: 500000, max: 1200000 });

    return {
      stats: {
        totalRevenue: `R ${totalRevenue.toLocaleString()}`,
        newCustomers: faker.number.int({ min: 80, max: 250 }).toString(),
        salesGrowth: `${faker.number.float({ min: 2.5, max: 15, fractionDigits: 1 })}%`,
      },
      revenueData: {
        labels,
        datasets: [
          {
            label: 'Revenue (R)',
            data: labels.map(() => faker.number.int({ min: 80000, max: 200000 })),
            backgroundColor: 'rgba(212, 175, 55, 0.6)',
            borderColor: 'rgba(212, 175, 55, 1)',
            borderWidth: 1,
          },
        ],
      },
      salesByRegionData: {
        labels: ['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Other'],
        datasets: [
          {
            label: 'Sales',
            data: [
              faker.number.int({ min: 300, max: 500 }),
              faker.number.int({ min: 200, max: 400 }),
              faker.number.int({ min: 100, max: 300 }),
              faker.number.int({ min: 50, max: 150 }),
            ],
            backgroundColor: [
              'rgba(212, 175, 55, 0.8)',
              'rgba(240, 240, 240, 0.8)',
              'rgba(160, 160, 160, 0.8)',
              'rgba(51, 51, 51, 0.8)',
            ],
            borderColor: '#1A1A1A',
            borderWidth: 2,
          },
        ],
      },
    };
  }, []);

  const barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#A0A0A0' } } },
    scales: {
      y: { ticks: { color: '#A0A0A0' }, grid: { color: '#333333' } },
      x: { ticks: { color: '#A0A0A0' }, grid: { color: 'transparent' } },
    },
  };

  const doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top', labels: { color: '#A0A0A0' } } },
  };

  return (
    <div className="c-page-container">
      <Link href="/playroom" className="c-dashboard-back-link">
        <FaArrowLeft />
        Back to Playroom
      </Link>

      <div className="c-dashboard">
        <div className="c-dashboard__header">
          <h1 className="c-dashboard__title">Interactive Sales Dashboard</h1>
          <p className="c-dashboard__subtitle">A live demo showcasing data visualization with Next.js and Chart.js.</p>
        </div>

        <div className="c-dashboard__grid">
          <div className="c-dashboard__stats">
            <StatCard title="Total Revenue" value={dashboardData.stats.totalRevenue} Icon={FaDollarSign} />
            <StatCard title="New Customers (YTD)" value={dashboardData.stats.newCustomers} Icon={FaUsers} />
            <StatCard title="Sales Growth" value={dashboardData.stats.salesGrowth} Icon={FaChartLine} />
          </div>

          <div className="c-dashboard__main-chart">
            <RevenueBarChart chartData={dashboardData.revenueData} chartOptions={barChartOptions} />
          </div>

          <div className="c-dashboard__secondary-chart">
            <SalesDoughnutChart chartData={dashboardData.salesByRegionData} chartOptions={doughnutChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboardPage;