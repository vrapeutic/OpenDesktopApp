// import { useEffect, useState, useContext } from 'react';
// import { config } from '@renderer/config';
// import { dataContext } from '@renderer/shared/Provider';
// import { RadialBarChart, RadialBar, Legend } from "recharts";

// export default function RadialChart(props: any) {
//   const center = useContext(dataContext);
//   const [radialChart, setRadialChart] = useState([]);

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
//       .then((response) => {
//         console.log("response", response);
//         return response.json();
//       })
//       .then((result) => {
//         console.log("result", result);
//         // Transform result object into an array of objects for the chart
//         const chartData = Object.entries(result).map(([name, value]) => ({
//           name,
//           uv: value,
//         }));
//         setRadialChart(chartData);
//       })
//       .catch((error) => console.log('error', error));
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, [props.refreshKey]);

//   return (
//     <RadialBarChart
//       width={500}
//       height={300}
//       cx={150}
//       cy={150}
//       innerRadius={20}
//       outerRadius={140}
//       barSize={10}
//       data={radialChart} // Pass radialChart directly
//     >
//       <RadialBar
//         minAngle={15}
//         label={{ position: "insideStart", fill: "#fff" }}
//         background
//         clockWise
//         dataKey="uv"
//       />
//       <Legend
//         iconSize={10}
//         width={120}
//         height={140}
//         layout="vertical"
//         verticalAlign="middle"
//       />
//     </RadialBarChart>
//   );
// }
// import { useState, useEffect } from "react";
// import { RadialBarChart, RadialBar, Legend } from "recharts";

// export default function RadialChart() {
//   const [radialChart, setRadialChart] = useState([
//     { name: "good_session_percentage", uv: 50 },
//     { name: "kids_using_vr_percentage", uv: 30 },
//     { name: "vr_percentage", uv: 20 },
//   ]);

//   const [legendPosition, setLegendPosition] = useState({ left: 'auto', right: 0 });

//   useEffect(() => {
//     const calculateLegendPosition = () => {
//       const chartWidth = 500; // Width of the RadialBarChart
//       const cardWidth = Math.min(window.innerWidth * 0.9, 606); // Max width of the card (90% of window width or 606px, whichever is smaller)
//       const legendWidth = 120; // Width of the Legend component
//       const margin = 20; // Margin between legend and chart
//       const availableWidth = cardWidth - chartWidth - margin;

//       if (availableWidth >= legendWidth) {
//         // If there's enough space to fit the legend beside the chart
//         setLegendPosition({ left: chartWidth + margin, right: 'auto' });
//       } else {
//         // If there's not enough space, align legend to the right
//         setLegendPosition({ left: 'auto', right: 0 });
//       }
//     };

//     calculateLegendPosition();

//     window.addEventListener('resize', calculateLegendPosition);

//     return () => {
//       window.removeEventListener('resize', calculateLegendPosition);
//     };
//   }, []);

//   return (
//     <RadialBarChart
//       width={500}
//       height={300}
//       cx={150}
//       cy={150}
//       innerRadius={20}
//       outerRadius={140}
//       barSize={10}
//       data={radialChart}
//     >
//       <RadialBar
//         minAngle={15}
//         label={{ position: "insideEnd", fill: "#fff" }} // Adjust position to insideEnd
//         background
//         clockWise
//         dataKey="uv"
//       />
//       <Legend
//         iconSize={10}
//         width={120}
//         height={140}
//         layout="vertical"
//         align="right" // Align legend to the right
//         verticalAlign="middle"
//         wrapperStyle={{ ...legendPosition, top: "50%", transform: "translate(0, -50%)" }} // Position legend dynamically
//       />
//     </RadialBarChart>
//   );
// }



// import { useState, useEffect } from "react";
// import { RadialBarChart, RadialBar, Legend } from "recharts";

// export default function RadialChart() {
//   const [radialChart, setRadialChart] = useState([
//     { name: "good_session_percentage", uv: 50 },
//     { name: "kids_using_vr_percentage", uv: 30 },
//     { name: "vr_percentage", uv: 20 },
//   ]);

//   const [legendPosition, setLegendPosition] = useState({ left: 'auto', right: 0 });

//   useEffect(() => {
//     const calculateLegendPosition = () => {
//       const chartWidth = 500; // Width of the RadialBarChart
//       const cardWidth = 480; // Width of the Card component
//       const legendWidth = 120; // Width of the Legend component
//       const margin = 20; // Margin between legend and chart
//       const availableWidth = cardWidth - chartWidth - margin;

//       if (availableWidth >= legendWidth) {
//         // If there's enough space to fit the legend beside the chart
//         setLegendPosition({ left: chartWidth + margin, right: 'auto' });
//       } else {
//         // If there's not enough space, align legend to the right
//         setLegendPosition({ left: 'auto', right: 0 });
//       }
//     };

//     calculateLegendPosition();

//     window.addEventListener('resize', calculateLegendPosition);

//     return () => {
//       window.removeEventListener('resize', calculateLegendPosition);
//     };
//   }, []);

//   return (
//     <RadialBarChart
//       width={500}
//       height={300}
//       cx={150}
//       cy={150}
//       innerRadius={20}
//       outerRadius={140}
//       barSize={10}
//       data={radialChart}
//     >
//       <RadialBar
//         minAngle={15}
//         label={{ position: "insideEnd", fill: "#fff" }} // Adjust position to insideEnd
//         background
//         clockWise
//         dataKey="uv"
//       />
//       <Legend
//         iconSize={10}
//         width={120}
//         height={140}
//         layout="vertical"
//         align="right" // Align legend to the right
//         verticalAlign="middle"
//         wrapperStyle={{ ...legendPosition, position: "absolute", top: "50%", transform: "translate(0, -50%)" }} // Position legend dynamically
//       />
//     </RadialBarChart>
//   );
// }

// import React, { PureComponent } from 'react';
// import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   // {
//   //   name: 'test test',
//   //   uv: 31.47,
//   //   pv: 2400,
//   //   fill: '#8884d8',
//   // },
//   // {
//   //   name: '25-29',
//   //   uv: 26.69,
//   //   pv: 4567,
//   //   fill: '#83a6ed',
//   // },

//   {
//     name: '40-49',
//     uv: 50 * 0.3,
//     fill: '#a4de6c',
//   },
//   {
//     name: '50+',
//     uv: 50 * 0.2,
//     fill: '#d0ed57',
//   },
//   {
//     name: 'unknow',
//     uv: 50 * 0.5,
//     fill: '#ffc658',
//   },
// ];

// const style = {
//   top: '50%',
//   right: 0,
//   transform: 'translate(0, -50%)',
//   lineHeight: '24px',
// };

//  export default function RadialChart() {
 
//     return (
//       <ResponsiveContainer width="100%" height="100%">
//         <RadialBarChart cx="30%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={data}>
//           <RadialBar
//             minAngle={15}
//             label={{ position: 'insideStart', fill: '#fff' }}
//             background
//             clockWise
//             dataKey="uv"
//           />
//           <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
//         </RadialBarChart>
//       </ResponsiveContainer>
//     );
//   }


// import React, { PureComponent, useContext, useEffect, useState } from 'react';
// import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
// import { dataContext } from '../Provider';
// import { config } from '@renderer/config';

// const data = [
//   // {
//   //   name: 'test test',
//   //   uv: 31.47,
//   //   pv: 2400,
//   //   fill: '#8884d8',
//   // },
//   // {
//   //   name: '25-29',
//   //   uv: 26.69,
//   //   pv: 4567,
//   //   fill: '#83a6ed',
//   // },

//   {
//     name: '40-49',
//     uv: 50 * 0.3,
//     fill: '#a4de6c',
//   },
//   {
//     name: '50+',
//     uv: 50 * 0.2,
//     fill: '#d0ed57',
//   },
//   {
//     name: 'unknow',
//     uv: 50 * 0.5,
//     fill: '#ffc658',
//   },
// ];



//  export default function RadialChart(props: any) {
 
//     const center = useContext(dataContext);
//     const [radialChart, setRadialChart] = useState({});

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
//             console.log("result", result);
//             const formattedData = Object.entries(result).map(([name, percentage]) => ({ name, uv: percentage, fill: getRandomColor() })); // Mapping result object to desired format
//             setRadialChart({ series: formattedData }); // Updated to set formatted data to radialChart state
//           })
//           .catch((error) => console.log('error', error));
//       }
//     };

//     const getRandomColor = () => {
//       // Function to generate random color
//       return '#' + Math.floor(Math.random()*16777215).toString(16);
//     };
//   useEffect(() => {
//     getData();
//   }, [props.refreshKey]);


//   const data = [
//     { name: '40-49', uv: 33, fill: '#a4de6c' },
//     { name: '50+', uv: 55, fill: '#d0ed57' },
//     { name: 'unknown', uv: 88, fill: '#ffc658' }
//   ];
//   const style = {
//     top: '50%',
//     right: 0,
//     transform: 'translate(0, -50%)',
//     lineHeight: '24px',
//   };
  
//   console.log("radial chart data",radialChart)

//     return (
//       <>

//       {/* <RadialBarChart cx="30%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={data}>
//           <RadialBar
//             minAngle={15}
//             label={{ position: 'insideStart', fill: '#fff' }}
//             background
//             clockWise
//             dataKey="uv"
//           />
//           <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
//         </RadialBarChart> */}
//       <ResponsiveContainer width="100%" height="100%">
        
//          <RadialBarChart cx="30%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={data}>

//   <RadialBar
//     minAngle={15}
//     label={{ position: "insideEnd", fill: "#fff" }}
//     background
//     clockWise
//     dataKey="uv"
//     fill="#8884d8"
//   />
//             <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />

// </RadialBarChart>
//       </ResponsiveContainer>
//       </>
//     );
//   }

// export default function RadialChart(props: any) {
//   const center = useContext(dataContext);
//   const [radialChart, setRadialChart] = useState({});

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
//           console.log('result', result);
//           const formattedData = Object.entries(result).map(
//             ([name, percentage]) => ({
//               name,
//               uv: percentage,
//               fill: getRandomColor(),
//             })
//           ); // Mapping result object to desired format
//           setRadialChart({ series: formattedData }); // Updated to set formatted data to radialChart state
//         })
//         .catch((error) => console.log('error', error));
//     }
//   };

//   const getRandomColor = () => {
//     // Function to generate random color
//     return '#' + Math.floor(Math.random() * 16777215).toString(16);
//   };
  
//   useEffect(() => {
//     getData();
//   }, [props.refreshKey]);

//   const style = {
//     top: '50%',
//     right: 0,
//     transform: 'translate(0, -50%)',
//     lineHeight: '24px',
//   };

//   console.log('radial chart data', radialChart);

//   return (
//     <>
//       <ResponsiveContainer width="100%" height="100%">
//         <RadialBarChart
//           cx="30%"
//           cy="50%"
//           innerRadius="10%"
//           outerRadius="80%"
//           barSize={10}
//           data={radialChart.series || []} // Use radialChart.series instead of static data
//         >
//           <RadialBar
//             minAngle={15}
//             label={{ position: 'insideEnd', fill: '#fff' }}
//             background
//             clockWise
//             dataKey="uv"
//             fill="#8884d8"
//           />
//           <Legend
//             iconSize={10}
//             layout="vertical"
//             verticalAlign="middle"
//             wrapperStyle={style}
//           />
//         </RadialBarChart>
//       </ResponsiveContainer>
//     </>
//   );
// }


// export default function RadialChart(props: any) {
//   const center = useContext(dataContext);
//   const [radialChart, setRadialChart] = useState([]);

//   const getData = async () => {
//     const token = await (window as any).electronAPI.getPassword('token');
//     if (center.id !== undefined) {
//       try {
//         const response = await fetch(
//           `${config.apiURL}/api/v1/doctors/center_statistics?center_id=${center.id}`,
//           {
//             method: 'Get',
//             redirect: 'follow',
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         const result = await response.json();
//         const formattedData = Object.entries(result).map(
//           ([name, percentage]) => ({
//             name,
//             uv: percentage,
//             fill: getRandomColor(),
//           })
//         );
//         setRadialChart(formattedData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }
//   };

//   const getRandomColor = () => {
//     return '#' + Math.floor(Math.random() * 16777215).toString(16);
//   };

//   useEffect(() => {
//     getData();
//   }, [props.refreshKey]);

//   const style = {
//     top: '50%',
//     right: 0,
//     transform: 'translate(0, -50%)',
//     lineHeight: '24px',
//   };

//   console.log('radial chart data', radialChart);

//   return (
//     <ResponsiveContainer width="100%" height="100%">
//       <RadialBarChart
//         cx="30%"
//         cy="50%"
//         innerRadius="10%"
//         outerRadius="80%"
//         barSize={10}
//         data={radialChart}
//       >
//         <RadialBar
//           minAngle={15}
//           label={{ position: 'insideEnd', fill: '#fff' }}
//           background
//           clockWise
//           dataKey="uv"
//           fill="#8884d8"
//         />
//         <Legend
//           iconSize={10}
//           layout="vertical"
//           verticalAlign="middle"
//           wrapperStyle={style}
//           formatter={(value, entry) => (
//             <span style={{ fontSize: '12px' }}>{entry.payload.name}</span>
//           )}
//         />
//       </RadialBarChart>
//     </ResponsiveContainer>
//   );
// }

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

export default function RadialChart(props: any) {
  const center = useContext(dataContext);
  const [radialChart, setRadialChart] = useState([]);

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

  const legendFontSize = useBreakpointValue({ base: '10px', md: '0.7rem', lg: '0.8rem', xl: '1.2rem', '2xl': '1.2rem' });

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
          minAngle={15}
          label={{ position: 'insideEnd', fill: '#fff' }}
          background
          clockWise
          dataKey="uv"
          fill="#8884d8"
        />
        <Legend
          iconSize={10}
          layout="vertical"
          verticalAlign="middle"
          wrapperStyle={style}
          formatter={(value, entry) => (
            <span style={{ fontSize: legendFontSize }}>{entry.payload.name}</span>
          )}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}







