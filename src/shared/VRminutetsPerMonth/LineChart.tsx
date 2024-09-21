import { config } from '@renderer/config';
import { useContext, useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { dataContext } from '../Provider';

const LineChartLineChart = (props: { refreshKey: number }) => {
  const center = useContext(dataContext);
  const [lineChartData, setLineChartData] = useState([]);
  const selectedCenterContext = useContext(dataContext);

  const getData = async () => {
    const token = await (window as any).electronAPI.getPassword('token');
    const currentYear = new Date().getFullYear(); // Get the current year dynamically

    if (center.id !== undefined) {
      await fetch(
        `${config.apiURL}/api/v1/doctors/center_vr_minutes?center_id=${selectedCenterContext.id}&year=${currentYear}`,
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          // Format the API response into an array of objects for the chart
          const formattedData = Object.entries(result).map(([key, value]) => ({
            name: key.split(' ')[0], // Extract the month name (e.g., "January")
            Vrminutes: value, // The value from the API response
          }));

          setLineChartData(formattedData);
        })
        .catch((error) => console.log('error', error));
    }
  };

  useEffect(() => {
    getData();
  }, [props.refreshKey]);

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={lineChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Vrminutes" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default LineChartLineChart;
