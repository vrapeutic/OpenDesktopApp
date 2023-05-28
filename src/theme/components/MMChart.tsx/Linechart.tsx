import React from 'react'
import ReactApexChart  from 'react-apexcharts';import axios from 'axios';

class Linechart extends React.Component {
  state = {series: [ ], options: { }}
    constructor(props : any) {
      super(props);

      const values : any = [];
      getData();

      this.state = {
        series: [{
          name: 'Minutes',
          data: values,
        }],

        options: {
          chart: {
            id: 'mychart',
            height: 172.34,
            type: 'line',
            toolbar: {
                show: true,
                offsetX: 0,
                offsetY: 0,
                tools: {
                  download:'...',
                  selection: true,
                  zoom: false,
                  zoomin: false,
                  zoomout: false,
                  pan: false,
                  reset: false,
                  customIcons: []
                },
                export: {
                  csv: {
                    filename: undefined,
                    columnDelimiter: ',',
                    headerCategory: 'category',
                    headerValue: 'value',
                    dateFormatter(timestamp: any) {
                      return new Date(timestamp).toDateString()
                    }
                  },
                  svg: {
                    filename: undefined,
                  },
                  png: {
                    filename: undefined,
                  }
                },
                autoSelected: 'zoom' 
              },
          
            dropShadow: {
                enabled: true,
                enabledOnSeries: undefined,
                top: 12.29,
                left: 0,
                blur: 5,
                color: 'rgb(86, 59, 255)',
                opacity: 0.26
            },
          },

          stroke: {
            width: 5,
            curve: 'smooth'
          },

          title: {
            text: 'Number of VR minutes per Month',
            align: 'left',
            style: {
               left: '24px',
               top: '24px',
               fontFamily: "Graphik LCG",
               fontWeight: 500,
               fontSize: 20,
               lineHeight: 20,}
          },

          noData: {
            text: 'Loading...'
          },

          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
           
          },
         
          yaxis: {
            show: false,
            
          },
          
          colors: ['#A93BFF'],

          grid: {
            show: true,
            borderColor: '#90A4AE',
            strokeDashArray: 0,
            position: 'back',
            xaxis: {
                lines: {
                    show: false
                }
            },   
            yaxis: {
                lines: {
                    show: false
                }
            },  
            row: {
                colors: undefined,
                opacity: 0.5
            },  
            column: {
                colors: undefined,
                opacity: 0.5
            },  
            padding: {
                top: 35.1,
                right: 24,
                bottom: 0,
                left: 24
            },  
          }
        },

       };
      
      
      async function getData() {
      const response = await fetch('http://my-json-server.typicode.com/apexcharts/apexcharts.js/yearly');
      const data = await response.json();
      console.log(data);
      for (let i = 0; i < 12; i++) {
        values.push(data[i].y)
     }
     console.log(values);
     
    }}
      

      
	render() {
		return (
			<ReactApexChart
				options={this.state.options}
				series={this.state.series}
				type='line'
				height='228.32px'
        width='557.12px'
			/>
		);
	}
}

export default Linechart;