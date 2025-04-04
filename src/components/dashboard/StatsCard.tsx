
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  bgColor?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  className,
  bgColor,
}) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-200", 
        className
      )}
      style={{ background: bgColor ? bgColor : undefined }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && (
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trend) && (
          <CardDescription className="flex items-center mt-1">
            {trend && (
              <span
                className={cn(
                  "mr-1 text-xs font-medium flex items-center",
                  trend.isPositive ? "text-green-500" : "text-red-500"
                )}
              >
                <span className={cn(
                  "inline-block h-2 w-2 mr-1 rounded-full",
                  trend.isPositive ? "bg-green-500" : "bg-red-500"
                )}></span>
                {trend.isPositive ? "+" : ""}
                {trend.value}%
              </span>
            )}
            {description}
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
