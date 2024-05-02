import { useEffect, useState, useContext } from 'react';
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend,
} from 'recharts';
import { useBreakpointValue } from '@chakra-ui/react';
import { config } from '@renderer/config';
import { dataContext } from '../Provider';

interface ChartData {
  name: string;
  uv: number;
  fill: string;
}

export default function RadialChart(props: { refreshKey: number }) {
  const center = useContext(dataContext);
  const [radialChart, setRadialChart] = useState<ChartData[]>([]);

  const getData = async () => {
    const token = await (window as any).electronAPI.getPassword('token');
    if (center.id !== undefined) {
      try {
        const response = await fetch(
          `${config.apiURL}/api/v1/doctors/center_statistics?center_id=${center.id}`,
          {
            method: 'Get',
            redirect: 'follow',
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const result = await response.json();
        const formattedData = Object.entries(result).map(
          ([name, percentage]) => ({
            name,
            uv: percentage,
            fill: getRandomColor(),
          })
        );
        setRadialChart(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const getRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  useEffect(() => {
    getData();
  }, [props.refreshKey]);

  const legendFontSize = useBreakpointValue({
    base: '10px',
    md: '0.7rem',
    lg: '0.8rem',
    xl: '1.2rem',
    '2xl': '1.2rem',
  });

  const style = {
    top: '50%',
    right: 0,
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadialBarChart
        cx="20%"
        cy="50%"
        innerRadius="10%"
        outerRadius="80%"
        barSize={10}
        data={radialChart}
      >
        <RadialBar
          label={{ position: 'insideEnd', fill: '#fff' }}
          background
          dataKey="uv"
          fill="#8884d8"
        />
        <Legend
          iconSize={10}
          layout="vertical"
          verticalAlign="middle"
          wrapperStyle={style}
          formatter={(value, entry) => (
            <span style={{ fontSize: legendFontSize }}>{entry.payload.name as string}</span>
          )}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}
