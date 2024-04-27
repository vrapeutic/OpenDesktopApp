// // problems in width
// import React, { useEffect, useState, useContext } from 'react';
// import ReactApexChart from 'react-apexcharts';
// import { config } from '@renderer/config';
// import { dataContext } from '@renderer/shared/Provider';

// export default function RadialChart(props: any) {
//   const center = useContext(dataContext);
//   const [radialChart, setRadialChart] = useState<{
//     series: any;
//     options: object;
//   }>({
//     series: [],
//     options: {
//       chart: {
//         height: "auto",
//         width: "auto",
//         type: 'radialBar',
//         toolbar: {
//           show: true,
//           offsetX: 0,
//           offsetY: 0,
//           tools: {
//             download: '...',
//             selection: true,
//             zoom: false,
//             zoomin: false,
//             zoomout: false,
//             pan: false,
//             reset: false,
//             customIcons: [],
//           },
//           export: {
//             csv: {
//               filename: undefined,
//               columnDelimiter: ',',
//               headerCategory: 'category',
//               headerValue: 'value',
//               dateFormatter(timestamp: any) {
//                 return new Date(timestamp).toDateString();
//               },
//             },
//             svg: {
//               filename: undefined,
//             },
//             png: {
//               filename: undefined,
//             },
//           },
//           autoSelected: 'zoom',
//         },
//       },

//       title: {
//         text: 'VR Sessions Monthly Metrics',
//         align: 'left',
//         offsetX: 0,
//         offsetY: 0,
//         floating: false,
//         style: {
//           fontSize: '20px',
//           fontWeight: '500',
//           fontFamily: 'Graphik LCG',
//           color: '#00261C',
//           lineHeight: '20px',
//           left: '24px',
//           top: '24px',
//         },

//         noData: {
//           text: 'Loading...',
//         },
//       },
//       stroke: {
//         lineCap: 'round',
//         width: -15,
//       },
//       colors: ['#A93BFF', '#FF7049', '#20C997'],
//       legend: {
//         show: true,
//         showForSingleSeries: false,
//         showForNullSeries: true,
//         showForZeroSeries: true,
//         position: 'right',
//         horizontalAlign: 'center',
//         floating: false,
//         fontSize: '1rem',
//         fontFamily: 'Roboto',
//         fontWeight: 700,
//         lineHeight: '16.41px',
//         formatter: function (seriesName: string, opts: any) {
//           return `${seriesName} : ${opts.w.globals.series[opts.seriesIndex]}%`;
//         },

//         inverseOrder: false,
//         width: "auto",
//         height: "auto",
//         tooltipHoverFormatter: undefined,
//         customLegendItems: [
//           'good session percentage',
//           'vr percentage',
//           'kids using vr percentage ',
//         ],
//         offsetX: -1,
//         offsetY: 40,
//         labels: {
//           colors: '#5A5881',
//           useSeriesColors: false,
//         },
//         markers: {
//           width: 0,
//           height: 0,
//           strokeWidth: 0,
//           strokeColor: '#fff',
//           fillColors: undefined,
//           radius: 50,
//           customHTML: undefined,
//           onClick: undefined,
//           offsetX: 0,
//           offsetY: 0,
//         },
//         itemMargin: {
//           horizontal: 2,
//           vertical: 6,
//         },
//         onItemClick: {
//           toggleDataSeries: false,
//         },
//         onItemHover: {
//           highlightDataSeries: false,
//         },
//       },
//       plotOptions: {
//         stroke: {
//           show: true,
//           curve: 'smooth',
//           lineCap: 'round',
//           colors: undefined,
//           width: 4,
//           dashArray: 0,
//         },

//         radialBar: {
//           inverseOrder: false,
//           startAngle: 0,
//           endAngle: 360,
//           offsetX: 0,
//           offsetY: 20,
//           hollow: {
//             margin: 3,
//             size: '1%',
//             background: 'transparent',
//             image: undefined,
//             imageWidth: "auto",
//             imageHeight: "auto",
//             imageOffsetX: 0,
//             imageOffsetY: 0,
//             imageClipped: true,
//             position: 'front',
//             dropShadow: {
//               enabled: false,
//               top: 0,
//               left: 0,
//               blur: 3,
//               opacity: 0.5,
//             },
//           },
//           track: {
//             show: true,
//             startAngle: 0,
//             endAngle: 360,
//             background: '#f2f2f2',
//             strokeWidth: '75%',
//             opacity: 1,
//             margin: 13,
//             dropShadow: {
//               enabled: false,
//               top: 0,
//               left: 0,
//               blur: 0,
//               color: 'rgb(86, 59, 255)',
//               opacity: 0.26,
//             },
//           },
//           dataLabels: {
//             show: false,
//             name: {
//               show: true,
//               fontSize: '16px',
//               fontFamily: undefined,
//               fontWeight: 600,
//               color: undefined,
//               offsetY: -10,
//             },
//             value: {
//               show: false,
//               fontSize: '14px',
//               fontFamily: undefined,
//               fontWeight: 400,
//               color: undefined,
//               offsetY: 16,
//             },
//             total: {
//               show: false,
//               label: 'Total',
//               color: '#373d3f',
//               fontSize: '16px',
//               fontFamily: undefined,
//               fontWeight: 600,
//             },
//           },
//         },
//       },
//     },
//   });

//   const getData = async () => {
//     const token = await (window as any).electronAPI.getPassword('token');
//     if (center.id !== undefined) {
//       await fetch(
//         `${config.apiURL}/api/v1/doctors/center_statistics?center_id=${center.id}`,
//         {
//           method: 'Get',
//           redirect: 'follow',
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       )
//         .then((response) => response.json())
//         .then((result) => {
//           setRadialChart({ ...radialChart, series: Object.values(result) });
//         })
//         .catch((error) => console.log('error', error));
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, [props.refreshKey]);

//   return (
//     <ReactApexChart
//       options={radialChart.options}
//       series={radialChart.series}
//       type="radialBar"
//       height="231.43px"
//       width="431.56px"
//     />
//   );
// }


//// scroll and hide the chart

// import React, { useEffect, useState, useContext } from 'react';
// import ReactApexChart from 'react-apexcharts';
// import { config } from '@renderer/config';
// import { dataContext } from '@renderer/shared/Provider';

// export default function RadialChart(props: any) {
//   const center = useContext(dataContext);
//   const [radialChart, setRadialChart] = useState<{
//     series: any;
//     options: object;
//   }>({
//     series: [],
//     options: {
//       chart: {
//         height: '100%',
//         width: '100%',
//         type: 'radialBar',
//       },
//       title: {
//         text: 'VR Sessions Monthly Metrics',
//         align: 'left',
//         offsetX: 0,
//         offsetY: 0,
//         floating: false,
//         style: {
//           fontSize: '20px',
//           fontWeight: '500',
//           fontFamily: 'Graphik LCG',
//           color: '#00261C',
//           lineHeight: '20px',
//           left: '24px',
//           top: '24px',
//         },
//         noData: {
//           text: 'Loading...',
//         },
//       },
//       stroke: {
//         lineCap: 'round',
//         width: -15,
//       },
//       colors: ['#A93BFF', '#FF7049', '#20C997'],
//       legend: {
//         show: true,
//         showForSingleSeries: false,
//         showForNullSeries: true,
//         showForZeroSeries: true,
//         position: 'right',
//         horizontalAlign: 'center',
//         floating: false,
//         fontSize: '16px',
//         fontFamily: 'Roboto',
//         fontWeight: 700,
//         lineHeight: '16.41px',
//         formatter: function (seriesName: string, opts: any) {
//           return `${seriesName} : ${opts.w.globals.series[opts.seriesIndex]}%`;
//         },
//         inverseOrder: false,
//         width: 'auto',
//         height: '200px', // Set a fixed height for the legend container
//         tooltipHoverFormatter: undefined,
//         customLegendItems: [
//           'good session percentage',
//           'vr percentage',
//           'kids using vr percentage ',
//         ],
//         offsetX: -1,
//         offsetY: 40,
//         labels: {
//           colors: '#5A5881',
//           useSeriesColors: false,
//         },
//         markers: {
//           width: 0,
//           height: 0,
//           strokeWidth: 0,
//           strokeColor: '#fff',
//           fillColors: undefined,
//           radius: 30,
//           customHTML: undefined,
//           onClick: undefined,
//           offsetX: 0,
//           offsetY: 0,
//         },
//         itemMargin: {
//           horizontal: 2,
//           vertical: 6,
//         },
//         onItemClick: {
//           toggleDataSeries: false,
//         },
//         onItemHover: {
//           highlightDataSeries: false,
//         },
//       },
//       plotOptions: {
//         stroke: {
//           show: true,
//           curve: 'smooth',
//           lineCap: 'round',
//           colors: undefined,
//           width: 4,
//           dashArray: 0,
//         },
//         radialBar: {
//           inverseOrder: false,
//           startAngle: 0,
//           endAngle: 360,
//           offsetX: 0,
//           offsetY: 20,
//           hollow: {
//             margin: 3,
//             size: '1%',
//             background: 'transparent',
//             image: undefined,
//             imageWidth: 150,
//             imageHeight: 150,
//             imageOffsetX: 0,
//             imageOffsetY: 0,
//             imageClipped: true,
//             position: 'front',
//             dropShadow: {
//               enabled: false,
//               top: 0,
//               left: 0,
//               blur: 3,
//               opacity: 0.5,
//             },
//           },
//           track: {
//             show: true,
//             startAngle: 0,
//             endAngle: 360,
//             background: '#f2f2f2',
//             strokeWidth: '75%',
//             opacity: 1,
//             margin: 13,
//             dropShadow: {
//               enabled: false,
//               top: 0,
//               left: 0,
//               blur: 0,
//               color: 'rgb(86, 59, 255)',
//               opacity: 0.26,
//             },
//           },
//           dataLabels: {
//             show: false,
//             name: {
//               show: true,
//               fontSize: '16px',
//               fontFamily: undefined,
//               fontWeight: 600,
//               color: undefined,
//               offsetY: -10,
//             },
//             value: {
//               show: false,
//               fontSize: '14px',
//               fontFamily: undefined,
//               fontWeight: 400,
//               color: undefined,
//               offsetY: 16,
//             },
//             total: {
//               show: false,
//               label: 'Total',
//               color: '#373d3f',
//               fontSize: '16px',
//               fontFamily: undefined,
//               fontWeight: 600,
//             },
//           },
//         },
//       },
//     },
//   });

//   useEffect(() => {
//     const getData = async () => {
//       const token = await (window as any).electronAPI.getPassword('token');
//       if (center.id !== undefined) {
//         await fetch(
//           `${config.apiURL}/api/v1/doctors/center_statistics?center_id=${center.id}`,
//           {
//             method: 'Get',
//             redirect: 'follow',
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         )
//           .then((response) => response.json())
//           .then((result) => {
//             setRadialChart((prevChart) => ({
//               ...prevChart,
//               series: Object.values(result),
//             }));
//           })
//           .catch((error) => console.log('error', error));
//       }
//     };
//     getData();
//   }, [center.id, props.refreshKey]);

//   return (
//     <div style={{ width: '100%', height: '100%' }}>
//       <ReactApexChart
//         options={radialChart.options}
//         series={radialChart.series}
//         type="radialBar"
//         height="100%"
//         width="100%"
//       />
//     </div>
//   );
// }


// import React, { useEffect, useState, useContext } from 'react';
// import ReactApexChart from 'react-apexcharts';
// import { config } from '@renderer/config';
// import { dataContext } from '@renderer/shared/Provider';

// export default function RadialChart(props: any) {
//   const center = useContext(dataContext);
//   const [seriesData, setSeriesData] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const getData = async () => {
//       const token = await (window as any).electronAPI.getPassword('token');
//       if (center.id !== undefined) {
//         await fetch(
//           `${config.apiURL}/api/v1/doctors/center_statistics?center_id=${center.id}`,
//           {
//             method: 'GET',
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         )
//           .then((response) => response.json())
//           .then((result) => {
//             setSeriesData(Object.values(result));
//             setIsLoading(false);
//           })
//           .catch((error) => console.log('error', error));
//       }
//     };
//     getData();
//   }, [center.id, props.refreshKey]);

//   return (
//     <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
//       {isLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <ReactApexChart
//           options={{
//             chart: {
//               height: '100%',
//               width: '100%',
//               type: 'radialBar',
//             },
//             title: {
//               text: 'VR Sessions Monthly Metrics',
//               align: 'left',
//               offsetX: 0,
//               offsetY: 0,
//               floating: false,
//               style: {
//                 fontSize: '20px',
//                 fontWeight: '500',
//                 fontFamily: 'Graphik LCG',
//                 color: '#00261C',
//                 lineHeight: '20px',
//                 left: '24px',
//                 top: '24px',
//               },
//               noData: {
//                 text: 'Loading...',
//               },
//             },
//             stroke: {
//               lineCap: 'round',
//               width: -15,
//             },
//             colors: ['#A93BFF', '#FF7049', '#20C997'],
//             legend: {
//               show: true,
//               showForSingleSeries: false,
//               showForNullSeries: true,
//               showForZeroSeries: true,
//               position: 'right',
//               horizontalAlign: 'center',
//               floating: false,
//               fontSize: '16px',
//               fontFamily: 'Roboto',
//               fontWeight: 700,
//               lineHeight: '16.41px',
//               formatter: function (seriesName: string, opts: any) {
//                 return `${seriesName} : ${opts.w.globals.series[opts.seriesIndex]}%`;
//               },
//               inverseOrder: false,
//               width: 'auto',
//               height: 'auto',
//               tooltipHoverFormatter: undefined,
//               customLegendItems: [
//                 'good session percentage',
//                 'vr percentage',
//                 'kids using vr percentage ',
//               ],
//               offsetX: -1,
//               offsetY: 40,
//               labels: {
//                 colors: '#5A5881',
//                 useSeriesColors: false,
//               },
//               markers: {
//                 width: 0,
//                 height: 0,
//                 strokeWidth: 0,
//                 strokeColor: '#fff',
//                 fillColors: undefined,
//                 radius: 30,
//                 customHTML: undefined,
//                 onClick: undefined,
//                 offsetX: 0,
//                 offsetY: 0,
//               },
//               itemMargin: {
//                 horizontal: 2,
//                 vertical: 6,
//               },
//               onItemClick: {
//                 toggleDataSeries: false,
//               },
//               onItemHover: {
//                 highlightDataSeries: false,
//               },
//             },
//             plotOptions: {
//               stroke: {
//                 show: true,
//                 curve: 'smooth',
//                 lineCap: 'round',
//                 colors: undefined,
//                 width: 4,
//                 dashArray: 0,
//               },
//               radialBar: {
//                 inverseOrder: false,
//                 startAngle: 0,
//                 endAngle: 360,
//                 offsetX: 0,
//                 offsetY: 20,
//                 hollow: {
//                   margin: 3,
//                   size: '1%',
//                   background: 'transparent',
//                   image: undefined,
//                   imageWidth: 150,
//                   imageHeight: 150,
//                   imageOffsetX: 0,
//                   imageOffsetY: 0,
//                   imageClipped: true,
//                   position: 'front',
//                   dropShadow: {
//                     enabled: false,
//                     top: 0,
//                     left: 0,
//                     blur: 3,
//                     opacity: 0.5,
//                   },
//                 },
//                 track: {
//                   show: true,
//                   background: '#f2f2f2',
//                   strokeWidth: '75%',
//                   margin: 13,
//                 },
//                 dataLabels: {
//                   show: false,
//                 },
//               },
//             },
//           }}
//           series={seriesData}
//           type="radialBar"
//           height="100%"
//           width="100%"
//         />
//       )}
//     </div>
//   );
// }



// RadialChart.js

// import React, { useEffect, useState, useContext } from 'react';
// import ReactApexChart from 'react-apexcharts';
// import { config } from '@renderer/config';
// import { dataContext } from '@renderer/shared/Provider';

// export default function RadialChart(props: any) {
//   const center = useContext(dataContext);
//   const [radialChart, setRadialChart] = useState<{
//     series: any;
//     options: object;
//   }>({
//     series: [],
//     options: {
//       chart: {
//         height: 181,
//         width: 181,
//         type: 'radialBar',
//         toolbar: {
//           show: true,
//           offsetX: 0,
//           offsetY: 0,
//           tools: {
//             download: '...',
//             selection: true,
//             zoom: false,
//             zoomin: false,
//             zoomout: false,
//             pan: false,
//             reset: false,
//             customIcons: [],
//           },
//           export: {
//             csv: {
//               filename: undefined,
//               columnDelimiter: ',',
//               headerCategory: 'category',
//               headerValue: 'value',
//               dateFormatter(timestamp: any) {
//                 return new Date(timestamp).toDateString();
//               },
//             },
//             svg: {
//               filename: undefined,
//             },
//             png: {
//               filename: undefined,
//             },
//           },
//           autoSelected: 'zoom',
//         },
//       },

//       title: {
//         text: 'VR Sessions Monthly Metrics',
//         align: 'left',
//         offsetX: 0,
//         offsetY: 0,
//         floating: false,
//         style: {
//           fontSize: '20px',
//           fontWeight: '500',
//           fontFamily: 'Graphik LCG',
//           color: '#00261C',
//           lineHeight: '20px',
//           left: '24px',
//           top: '24px',
//         },

//         noData: {
//           text: 'Loading...',
//         },
//       },
//       stroke: {
//         lineCap: 'round',
//         width: -15,
//       },
//       colors: ['#A93BFF', '#FF7049', '#20C997'],
//       legend: {
//         show: true,
//         showForSingleSeries: false,
//         showForNullSeries: true,
//         showForZeroSeries: true,
//         position: 'right',
//         horizontalAlign: 'center',
//         floating: false,
//         fontSize: '16px',
//         fontFamily: 'Roboto',
//         fontWeight: 700,
//         lineHeight: '16.41px',
//         formatter: function (seriesName: string, opts: any) {
//           return `${seriesName} : ${opts.w.globals.series[opts.seriesIndex]}%`;
//         },

//         inverseOrder: false,
//         width: 215.56,
//         height: 147.97,
//         tooltipHoverFormatter: undefined,
//         customLegendItems: [
//           'good session percentage',
//           'vr percentage',
//           'kids using vr percentage ',
//         ],
//         offsetX: -1,
//         offsetY: 40,
//         labels: {
//           colors: '#5A5881',
//           useSeriesColors: false,
//         },
//         markers: {
//           width: 0,
//           height: 0,
//           strokeWidth: 0,
//           strokeColor: '#fff',
//           fillColors: undefined,
//           radius: 30,
//           customHTML: undefined,
//           onClick: undefined,
//           offsetX: 0,
//           offsetY: 0,
//         },
//         itemMargin: {
//           horizontal: 2,
//           vertical: 6,
//         },
//         onItemClick: {
//           toggleDataSeries: false,
//         },
//         onItemHover: {
//           highlightDataSeries: false,
//         },
//       },
//       plotOptions: {
//         stroke: {
//           show: true,
//           curve: 'smooth',
//           lineCap: 'round',
//           colors: undefined,
//           width: 4,
//           dashArray: 0,
//         },

//         radialBar: {
//           inverseOrder: false,
//           startAngle: 0,
//           endAngle: 360,
//           offsetX: 0,
//           offsetY: 20,
//           hollow: {
//             margin: 3,
//             size: '1%',
//             background: 'transparent',
//             image: undefined,
//             imageWidth: 150,
//             imageHeight: 150,
//             imageOffsetX: 0,
//             imageOffsetY: 0,
//             imageClipped: true,
//             position: 'front',
//             dropShadow: {
//               enabled: false,
//               top: 0,
//               left: 0,
//               blur: 3,
//               opacity: 0.5,
//             },
//           },
//           track: {
//             show: true,
//             startAngle: 0,
//             endAngle: 360,
//             background: '#f2f2f2',
//             strokeWidth: '75%',
//             opacity: 1,
//             margin: 13,
//             dropShadow: {
//               enabled: false,
//               top: 0,
//               left: 0,
//               blur: 0,
//               color: 'rgb(86, 59, 255)',
//               opacity: 0.26,
//             },
//           },
//           dataLabels: {
//             show: false,
//             name: {
//               show: true,
//               fontSize: '16px',
//               fontFamily: undefined,
//               fontWeight: 600,
//               color: undefined,
//               offsetY: -10,
//             },
//             value: {
//               show: false,
//               fontSize: '14px',
//               fontFamily: undefined,
//               fontWeight: 400,
//               color: undefined,
//               offsetY: 16,
//             },
//             total: {
//               show: false,
//               label: 'Total',
//               color: '#373d3f',
//               fontSize: '16px',
//               fontFamily: undefined,
//               fontWeight: 600,
//             },
//           },
//         },
//       },
//     },
//   });

//   const getData = async () => {
//     const token = await (window as any).electronAPI.getPassword('token');
//     if (center.id !== undefined) {
//       await fetch(
//         `${config.apiURL}/api/v1/doctors/center_statistics?center_id=${center.id}`,
//         {
//           method: 'Get',
//           redirect: 'follow',
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       )
//         .then((response) => response.json())
//         .then((result) => {
//           setRadialChart({ ...radialChart, series: Object.values(result) });
//         })
//         .catch((error) => console.log('error', error));
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, [props.refreshKey]);

//   return (
//     <ReactApexChart
//       options={radialChart.options}
//       series={radialChart.series}
//       type="radialBar"
//       height="231.43px"
//       width="431.56px"
//     />
//   );
// }


// import React, { useEffect, useState, useContext } from 'react';
// import ReactApexChart from 'react-apexcharts';
// import { config } from '@renderer/config';
// import { dataContext } from '@renderer/shared/Provider';

// export default function RadialChart(props: any) {
//   const center = useContext(dataContext);
//   const [radialChart, setRadialChart] = useState<{
//     series: any;
//     options: object;
//   }>({
//     series: [],
//     options: {
//       chart: {
//         height: '400px', // Fixed height
//         width: '100%',
//         type: 'radialBar',
//       },
//       title: {
//         text: 'VR Sessions Monthly Metrics',
//         align: 'left',
//         offsetX: 0,
//         offsetY: 0,
//         floating: false,
//         style: {
//           fontSize: '20px',
//           fontWeight: '500',
//           fontFamily: 'Graphik LCG',
//           color: '#00261C',
//           lineHeight: '20px',
//           left: '24px',
//           top: '24px',
//         },
//         noData: {
//           text: 'Loading...',
//         },
//       },
//       stroke: {
//         lineCap: 'round',
//         width: -15,
//       },
//       colors: ['#A93BFF', '#FF7049', '#20C997'],
//       legend: {
//         show: true,
//         showForSingleSeries: false,
//         showForNullSeries: true,
//         showForZeroSeries: true,
//         position: 'right',
//         horizontalAlign: 'center',
//         floating: false,
//         fontSize: '16px',
//         fontFamily: 'Roboto',
//         fontWeight: 700,
//         lineHeight: '16.41px',
//         formatter: function (seriesName: string, opts: any) {
//           return `${seriesName} : ${opts.w.globals.series[opts.seriesIndex]}%`;
//         },
//         inverseOrder: false,
//         width: 'auto',
//         height: '200px', // Set a fixed height for the legend container
//         tooltipHoverFormatter: undefined,
//         customLegendItems: [
//           'good session percentage',
//           'vr percentage',
//           'kids using vr percentage ',
//         ],
//         offsetX: -1,
//         offsetY: 40,
//         labels: {
//           colors: '#5A5881',
//           useSeriesColors: false,
//         },
//         markers: {
//           width: 0,
//           height: 0,
//           strokeWidth: 0,
//           strokeColor: '#fff',
//           fillColors: undefined,
//           radius: 30,
//           customHTML: undefined,
//           onClick: undefined,
//           offsetX: 0,
//           offsetY: 0,
//         },
//         itemMargin: {
//           horizontal: 2,
//           vertical: 6,
//         },
//         onItemClick: {
//           toggleDataSeries: false,
//         },
//         onItemHover: {
//           highlightDataSeries: false,
//         },
//       },
//       plotOptions: {
//         stroke: {
//           show: true,
//           curve: 'smooth',
//           lineCap: 'round',
//           colors: undefined,
//           width: 4,
//           dashArray: 0,
//         },
//         radialBar: {
//           inverseOrder: false,
//           startAngle: 0,
//           endAngle: 360,
//           offsetX: 0,
//           offsetY: 20,
//           hollow: {
//             margin: 3,
//             size: '1%',
//             background: 'transparent',
//             image: undefined,
//             imageWidth: 150,
//             imageHeight: 150,
//             imageOffsetX: 0,
//             imageOffsetY: 0,
//             imageClipped: true,
//             position: 'front',
//             dropShadow: {
//               enabled: false,
//               top: 0,
//               left: 0,
//               blur: 3,
//               opacity: 0.5,
//             },
//           },
//           track: {
//             show: true,
//             startAngle: 0,
//             endAngle: 360,
//             background: '#f2f2f2',
//             strokeWidth: '75%',
//             opacity: 1,
//             margin: 13,
//             dropShadow: {
//               enabled: false,
//               top: 0,
//               left: 0,
//               blur: 0,
//               color: 'rgb(86, 59, 255)',
//               opacity: 0.26,
//             },
//           },
//           dataLabels: {
//             show: false,
//             name: {
//               show: true,
//               fontSize: '16px',
//               fontFamily: undefined,
//               fontWeight: 600,
//               color: undefined,
//               offsetY: -10,
//             },
//             value: {
//               show: false,
//               fontSize: '14px',
//               fontFamily: undefined,
//               fontWeight: 400,
//               color: undefined,
//               offsetY: 16,
//             },
//             total: {
//               show: false,
//               label: 'Total',
//               color: '#373d3f',
//               fontSize: '16px',
//               fontFamily: undefined,
//               fontWeight: 600,
//             },
//           },
//         },
//       },
//     },
//   });

//   useEffect(() => {
//     const getData = async () => {
//       const token = await (window as any).electronAPI.getPassword('token');
//       if (center.id !== undefined) {
//         await fetch(
//           `${config.apiURL}/api/v1/doctors/center_statistics?center_id=${center.id}`,
//           {
//             method: 'Get',
//             redirect: 'follow',
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         )
//           .then((response) => response.json())
//           .then((result) => {
//             setRadialChart((prevChart) => ({
//               ...prevChart,
//               series: Object.values(result),
//             }));
//           })
//           .catch((error) => console.log('error', error));
//       }
//     };
//     getData();
//   }, [center.id, props.refreshKey]);

//   return (
//     <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
//       <ReactApexChart
//         options={radialChart.options}
//         series={radialChart.series}
//         type="radialBar"
//         height="100%"
//         width="100%"
//       />
//     </div>
//   );
// }


// the old one
import React, { useEffect, useState, useContext } from 'react';
import ReactApexChart from 'react-apexcharts';
import { config } from '@renderer/config';
import { dataContext } from '@renderer/shared/Provider';

export default function RadialChart(props: any) {
  const center = useContext(dataContext);
  const [radialChart, setRadialChart] = useState<{
    series: any;
    options: object;
  }>({
    series: [],
    options: {
      chart: {
        height: 181,
        width: 181,
        type: 'radialBar',
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: '...',
            selection: true,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
            customIcons: [],
          },
          export: {
            csv: {
              filename: undefined,
              columnDelimiter: ',',
              headerCategory: 'category',
              headerValue: 'value',
              dateFormatter(timestamp: any) {
                return new Date(timestamp).toDateString();
              },
            },
            svg: {
              filename: undefined,
            },
            png: {
              filename: undefined,
            },
          },
          autoSelected: 'zoom',
        },
      },

      title: {
        text: 'VR Sessions Monthly Metrics',
        align: 'left',
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: '20px',
          fontWeight: '500',
          fontFamily: 'Graphik LCG',
          color: '#00261C',
          lineHeight: '20px',
          left: '24px',
          top: '24px',
        },

        noData: {
          text: 'Loading...',
        },
      },
      stroke: {
        lineCap: 'round',
        width: -15,
      },
      colors: ['#A93BFF', '#FF7049', '#20C997'],
      legend: {
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        position: 'right',
        horizontalAlign: 'center',
        floating: false,
        fontSize: '16px',
        fontFamily: 'Roboto',
        fontWeight: 700,
        lineHeight: '16.41px',
        formatter: function (seriesName: string, opts: any) {
          return `${seriesName} : ${opts.w.globals.series[opts.seriesIndex]}%`;
        },

        inverseOrder: false,
        width: 215.56,
        height: 147.97,
        tooltipHoverFormatter: undefined,
        customLegendItems: [
          'good session percentage',
          'vr percentage',
          'kids using vr percentage ',
        ],
        offsetX: -1,
        offsetY: 40,
        labels: {
          colors: '#5A5881',
          useSeriesColors: false,
        },
        markers: {
          width: 0,
          height: 0,
          strokeWidth: 0,
          strokeColor: '#fff',
          fillColors: undefined,
          radius: 30,
          customHTML: undefined,
          onClick: undefined,
          offsetX: 0,
          offsetY: 0,
        },
        itemMargin: {
          horizontal: 2,
          vertical: 6,
        },
        onItemClick: {
          toggleDataSeries: false,
        },
        onItemHover: {
          highlightDataSeries: false,
        },
      },
      plotOptions: {
        stroke: {
          show: true,
          curve: 'smooth',
          lineCap: 'round',
          colors: undefined,
          width: 4,
          dashArray: 0,
        },

        radialBar: {
          inverseOrder: false,
          startAngle: 0,
          endAngle: 360,
          offsetX: 0,
          offsetY: 20,
          hollow: {
            margin: 3,
            size: '1%',
            background: 'transparent',
            image: undefined,
            imageWidth: 150,
            imageHeight: 150,
            imageOffsetX: 0,
            imageOffsetY: 0,
            imageClipped: true,
            position: 'front',
            dropShadow: {
              enabled: false,
              top: 0,
              left: 0,
              blur: 3,
              opacity: 0.5,
            },
          },
          track: {
            show: true,
            startAngle: 0,
            endAngle: 360,
            background: '#f2f2f2',
            strokeWidth: '75%',
            opacity: 1,
            margin: 13,
            dropShadow: {
              enabled: false,
              top: 0,
              left: 0,
              blur: 0,
              color: 'rgb(86, 59, 255)',
              opacity: 0.26,
            },
          },
          dataLabels: {
            show: false,
            name: {
              show: true,
              fontSize: '16px',
              fontFamily: undefined,
              fontWeight: 600,
              color: undefined,
              offsetY: -10,
            },
            value: {
              show: false,
              fontSize: '14px',
              fontFamily: undefined,
              fontWeight: 400,
              color: undefined,
              offsetY: 16,
            },
            total: {
              show: false,
              label: 'Total',
              color: '#373d3f',
              fontSize: '16px',
              fontFamily: undefined,
              fontWeight: 600,
            },
          },
        },
      },
    },
  });

  const getData = async () => {
    const token = await (window as any).electronAPI.getPassword('token');
    if (center.id !== undefined) {
      await fetch(
        `${config.apiURL}/api/v1/doctors/center_statistics?center_id=${center.id}`,
        {
          method: 'Get',
          redirect: 'follow',
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          setRadialChart({ ...radialChart, series: Object.values(result) });
        })
        .catch((error) => console.log('error', error));
    }
  };

  useEffect(() => {
    getData();
  }, [props.refreshKey]);

  return (
    <ReactApexChart
      options={radialChart.options}
      series={radialChart.series}
      type="radialBar"
      height="231.43px"
      width="431.56px"
    />
  );
}


