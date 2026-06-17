// src/components/Chart.tsx (Original approach but fixed)
import React, { useRef, useEffect } from 'react';
import ChartJS from 'chart.js/auto';

interface ChartProps {
  data: number[];
  labels: string[];
}

const Chart: React.FC<ChartProps> = ({ data, labels }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    // ✅ Destroy existing chart before creating a new one
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }

    if (chartRef.current) {
      chartInstanceRef.current = new ChartJS(chartRef.current, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Sales',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true
        }
      });
    }

    // ✅ Cleanup on unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [data, labels]);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <h3>Sales Chart</h3>
      <canvas ref={chartRef} width="400" height="200"></canvas>
      <p style={{ fontSize: '12px', color: '#666' }}>
        Note: Chart.js adds ~200KB to bundle!
      </p>
    </div>
  );
};

export default Chart;