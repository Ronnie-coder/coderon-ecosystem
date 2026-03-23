// src/components/dashboard/StatCard.tsx
import { IconType } from 'react-icons';

interface StatCardProps {
  title: string;
  value: string;
  Icon: IconType;
}

const StatCard = ({ title, value, Icon }: StatCardProps) => {
  return (
    <div className="c-stat-card">
      <div className="c-stat-card__icon-wrapper">
        <Icon />
      </div>
      <div className="c-stat-card__info">
        <h3 className="c-stat-card__title">{title}</h3>
        <p className="c-stat-card__value">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;