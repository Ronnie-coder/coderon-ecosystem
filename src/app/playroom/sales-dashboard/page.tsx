// src/app/playroom/sales-dashboard/page.tsx
"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { randFloat, randInt } from '@/lib/random';
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

// Random demo numbers. Made in the browser only (after the first render), so the
// server HTML and the browser agree and React doesn't throw a hydration error.
function makeData(live: boolean) {
  const int = (min: number, max: number) => (live ? randInt(min, max) : 0);
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  return {
    stats: {
      totalRevenue: live ? `R ${randInt(500000, 1200000).toLocaleString('en-ZA')}` : '—',
      newCustomers: live ? randInt(80, 250).toString() : '—',
      salesGrowth: live ? `${randFloat(2.5, 15, 1)}%` : '—',
    },
    revenueData: {
      labels,
      datasets: [
        {
          label: 'Revenue (R)',
          data: labels.map(() => int(80000, 200000)),
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
            int(300, 500),
            int(200, 400),
            int(100, 300),
            int(50, 150),
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
}

const SalesDashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(() => makeData(false));
  useEffect(() => setDashboardData(makeData(true)), []);

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
    <div className="demo-scope container pb-20 pt-12 md:pt-16">
      <Link href="/playroom/" className="mb-8 inline-flex items-center gap-2 font-semibold text-ink/70 hover:text-ink">
        <FaArrowLeft />
        Back to our work
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