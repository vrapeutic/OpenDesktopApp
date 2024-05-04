import { config } from '@renderer/config';
import { useContext, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { dataContext } from '../Provider';

const data = [
  {
    name: 'January',
    Vrminutes: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'February',
    Vrminutes: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'March',
    Vrminutes: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'April',
    Vrminutes: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'May',
    Vrminutes: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'June',
    Vrminutes: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'July',
    Vrminutes: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'August',
    Vrminutes: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'September',
    Vrminutes: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'October',
    Vrminutes: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'November',
    Vrminutes: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'December',
    Vrminutes: 1890,
    pv: 4800,
    amt: 2181,
  },

];

const LineChartLineChart = (props: { refreshKey: number }) => {
   const center = useContext(dataContext);
   const [lineChart, setLineChart] = useState({})
  
    const getData = async () => {
    const token = await (window as any).electronAPI.getPassword('token');
    const date = new Date();
    const year = date.getFullYear();
    const month = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };

    const months = Object.entries(month).reduce((acc: any, [key, value]) => {
      acc[`${key} ${year}`] = value;
      return acc;
    }, {});
    if (center.id !== undefined) {
      await fetch(
        `${config.apiURL}/api/v1/doctors/center_vr_minutes?center_id=${center.id}`,
        {
          method: 'Get',
          redirect: 'follow',
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          setLineChart({
            ...lineChart,
            series: [
              {
                name: 'Minutes',
                data: Object.values(Object.assign(months, result)),
              },
            ],
          });
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
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
        <Line type="monotone" dataKey="Vrminutes" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
    </>
  );
}

export default LineChartLineChart;
