// // import React, { useEffect, useState, useContext } from 'react';
// // import ReactApexChart from 'react-apexcharts';
// // import { config } from '@renderer/config';
// // import { dataContext } from '@renderer/shared/Provider';

// // export default function LineChart(props: any) {
// //   const center = useContext(dataContext);
// //   const [lineChart, setLineChart] = useState<{ series: any; options: object }>({
// //     series: [
// //       {
// //         name: 'Minutes',
// //         data: [],
// //       },
// //     ],

// //     options: {
// //       chart: {
// //         id: 'mychart',
// //         height: 172.34,
// //         type: 'line',
// //         toolbar: {
// //           show: true,
// //           offsetX: 0,
// //           offsetY: 0,
// //           tools: {
// //             download: '...',
// //             selection: true,
// //             zoom: false,
// //             zoomin: false,
// //             zoomout: false,
// //             pan: false,
// //             reset: false,
// //             customIcons: [],
// //           },
// //           export: {
// //             csv: {
// //               filename: undefined,
// //               columnDelimiter: ',',
// //               headerCategory: 'category',
// //               headerValue: 'value',
// //               dateFormatter(timestamp: any) {
// //                 return new Date(timestamp).toDateString();
// //               },
// //             },
// //             svg: {
// //               filename: undefined,
// //             },
// //             png: {
// //               filename: undefined,
// //             },
// //           },
// //           autoSelected: 'zoom',
// //         },

// //         dropShadow: {
// //           enabled: true,
// //           enabledOnSeries: undefined,
// //           top: 12.29,
// //           left: 0,
// //           blur: 5,
// //           color: 'rgb(86, 59, 255)',
// //           opacity: 0.26,
// //         },
// //       },

// //       stroke: {
// //         width: 5,
// //         curve: 'smooth',
// //       },

// //       title: {
// //         text: 'Number of VR minutes per Month',
// //         align: 'left',
// //         style: {
// //           left: '24px',
// //           top: '24px',
// //           fontFamily: 'Graphik LCG',
// //           fontWeight: 500,
// //           fontSize: 20,
// //           lineHeight: 20,
// //         },
// //       },

// //       noData: {
// //         text: 'Select center to show chart...',
// //       },

// //       xaxis: {
// //         categories: [
// //           'Jan',
// //           'Feb',
// //           'Mar',
// //           'Apr',
// //           'May',
// //           'Jun',
// //           'Jul',
// //           'Aug',
// //           'Sep',
// //           'Oct',
// //           'Nov',
// //           'Dec',
// //         ],
// //       },

// //       yaxis: {
// //         show: false,
// //       },

// //       colors: ['#A93BFF'],

// //       grid: {
// //         show: true,
// //         borderColor: '#90A4AE',
// //         strokeDashArray: 0,
// //         position: 'back',
// //         xaxis: {
// //           lines: {
// //             show: false,
// //           },
// //         },
// //         yaxis: {
// //           lines: {
// //             show: false,
// //           },
// //         },
// //         row: {
// //           colors: undefined,
// //           opacity: 0.5,
// //         },
// //         column: {
// //           colors: undefined,
// //           opacity: 0.5,
// //         },
// //         padding: {
// //           top: 35.1,
// //           right: 24,
// //           bottom: 0,
// //           left: 24,
// //         },
// //         chart: {
// //           height: '100%',
// //           width: '100%',
// //           type: 'line',
// //         },
// //       },
// //     },
// //   });

// //   const getData = async () => {
// //     const token = await (window as any).electronAPI.getPassword('token');
// //     const date = new Date();
// //     const year = date.getFullYear();
// //     const month = {
// //       January: 0,
// //       February: 0,
// //       March: 0,
// //       April: 0,
// //       May: 0,
// //       June: 0,
// //       July: 0,
// //       August: 0,
// //       September: 0,
// //       October: 0,
// //       November: 0,
// //       December: 0,
// //     };

// //     const months = Object.entries(month).reduce((acc: any, [key, value]) => {
// //       acc[`${key} ${year}`] = value;
// //       return acc;
// //     }, {});
// //     if (center.id !== undefined) {
// //       await fetch(
// //         `${config.apiURL}/api/v1/doctors/center_vr_minutes?center_id=${center.id}`,
// //         {
// //           method: 'Get',
// //           redirect: 'follow',
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       )
// //         .then((response) => response.json())
// //         .then((result) => {
// //           setLineChart({
// //             ...lineChart,
// //             series: [
// //               {
// //                 name: 'Minutes',
// //                 data: Object.values(Object.assign(months, result)),
// //               },
// //             ],
// //           });
// //         })
// //         .catch((error) => console.log('error', error));
// //     }
// //   };

// //   useEffect(() => {
// //     getData();
// //   }, [props.refreshKey]);

// //   return (
// //     <div style={{ width: '100%', height: '100%' }}>
// //       <ReactApexChart
// //         options={lineChart.options}
// //         series={lineChart.series}
// //         type="line"
// //         height="100%"
// //         width="100%"
// //       />
// //     </div>
// //   );
// // }


// // import React, { PureComponent } from 'react';
// // import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// // const data = [
// //   {
// //     name: 'Page A',
// //     uv: 4000,
// //     pv: 2400,
// //     amt: 2400,
// //   },
// //   {
// //     name: 'Page B',
// //     uv: 3000,
// //     pv: 1398,
// //     amt: 2210,
// //   },
// //   {
// //     name: 'Page C',
// //     uv: 2000,
// //     pv: 9800,
// //     amt: 2290,
// //   },
// //   {
// //     name: 'Page D',
// //     uv: 2780,
// //     pv: 3908,
// //     amt: 2000,
// //   },
// //   {
// //     name: 'Page E',
// //     uv: 1890,
// //     pv: 4800,
// //     amt: 2181,
// //   },
// //   {
// //     name: 'Page F',
// //     uv: 2390,
// //     pv: 3800,
// //     amt: 2500,
// //   },
// //   {
// //     name: 'Page G',
// //     uv: 3490,
// //     pv: 4300,
// //     amt: 2100,
// //   },
// // ];

// // export default class Example extends PureComponent {
// //   static demoUrl = 'https://codesandbox.io/s/tiny-line-chart-r5z0f';


// //     return (
// //       <ResponsiveContainer width="100%" height="100%">
// //         <LineChart width={300} height={100} data={data}>
// //           <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
// //         </LineChart>
// //       </ResponsiveContainer>
// //     );
// //   }
// // }


// // import { LineChart, Line, ResponsiveContainer } from 'recharts';

// // const data = [
// //   {
// //     name: 'Page A',
// //     uv: 4000,
// //     pv: 2400,
// //     amt: 2400,
// //   },
// //   {
// //     name: 'Page B',
// //     uv: 3000,
// //     pv: 1398,
// //     amt: 2210,
// //   },
// //   {
// //     name: 'Page C',
// //     uv: 2000,
// //     pv: 9800,
// //     amt: 2290,
// //   },
// //   {
// //     name: 'Page D',
// //     uv: 2780,
// //     pv: 3908,
// //     amt: 2000,
// //   },
// //   {
// //     name: 'Page E',
// //     uv: 1890,
// //     pv: 4800,
// //     amt: 2181,
// //   },
// //   {
// //     name: 'Page F',
// //     uv: 2390,
// //     pv: 3800,
// //     amt: 2500,
// //   },
// //   {
// //     name: 'Page G',
// //     uv: 3490,
// //     pv: 4300,
// //     amt: 2100,
// //   },
// // ];

// // export default function LineChartLineChart(props: any) {
// //   return (
// //     <ResponsiveContainer width="100%" height="100%">
// //       <LineChart width={300} height={100} data={data}>
// //         <Line type="monotone" dataKey="uv" stroke="#8884d8" strokeWidth={2} />
// //       </LineChart>
// //     </ResponsiveContainer>
// //   );
// // }

// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

// export default function LineChartLineChart(props: any) {


//     return (
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart
//           width={500}
//           height={300}
//           data={data}
//           margin={{
//             top: 5,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="pv" activeDot={{ r: 8 }} />
//           <Line type="monotone" dataKey="uv" />
//         </LineChart>
//       </ResponsiveContainer>
//     );
//   }


// import React, { PureComponent } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

// export default class LineChartLineChart extends PureComponent {
//   static demoUrl = 'https://codesandbox.io/s/tiny-line-chart-r5z0f';

//   render() {
//     return (
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart width={300} height={100} data={data}>
//           <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
//         </LineChart>
//       </ResponsiveContainer>
//     );
//   }
// }



import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page   k',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page l',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page M',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page n',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page o',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },

];

const LineChartLineChart = (props: { refreshKey: number }) => {
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
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
    </>
  );
}

export default LineChartLineChart;
