import React from 'react'
import ReactApexChart from 'react-apexcharts';

class Radialbar extends React.Component {
  state = {series: [ ], options: { }}
    constructor(props :any) {
      super(props);
      const values : any = [];
      getData();

      this.state = {
      
        series: [40, 30, 60],
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
          },

          title: {
            text: 'VR Sessions Monthly Metrics',
            align: 'left',
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize:  '20px',
              fontWeight:  '500',
              fontFamily:  'Graphik LCG',
              color:  '#00261C',
              lineHeight: "20px",
              left: '24px',
              top: '24px',
            },

            noData: {
              text: 'Loading...'
            },
        },
        stroke: {
          lineCap: "round",
          width: -15,
        },
         colors: ['#A93BFF','#FF7049','#20C997'],
         legend: {
            show: true,
            showForSingleSeries: false,
            showForNullSeries: true,
            showForZeroSeries: true,
            position: 'right',
            horizontalAlign: 'center', 
            floating: false,
            fontSize: '14px',
            fontFamily: 'Roboto',
            fontWeight: 700,
            lineHeight: "16.41px",
            formatter: function(seriesName:string,opts: any) {
                return `${seriesName}  ${opts.w.globals.series[opts.seriesIndex]}%`
            },
          
            inverseOrder: false,
            width: 215.56,
            height: 147.97,
            tooltipHoverFormatter: undefined,
            customLegendItems: ['sessions with good results' , 'kids using VR', 'hours with VR adoption ', 'network adopting VR' ],
            offsetX: -1,
            offsetY: 40,
            labels: {
                colors: '#5A5881',
                useSeriesColors: false
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
                vertical: 6
            },
            onItemClick: {
                toggleDataSeries: false
            },
            onItemHover: {
                highlightDataSeries: false
            },
        },
          plotOptions: {   
             stroke: {
                show: true,
                curve: 'smooth',
                lineCap: "round",
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
                    opacity: 0.5
                  }
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
                      opacity: 0.26
                  }
              },
              dataLabels: {
                  show: false,
                  name: {
                      show: true,
                      fontSize: '16px',
                      fontFamily: undefined,
                      fontWeight: 600,
                      color: undefined,
                      offsetY: -10
                    },
                    value: {
                      show: false,
                      fontSize: '14px',
                      fontFamily: undefined,
                      fontWeight: 400,
                      color: undefined,
                      offsetY: 16,
                      formatter: function (val) {
                        return val + '%'
                      }
                    },
                    total: {
                      show: false,
                      label: 'Total',
                      color: '#373d3f',
                      fontSize: '16px',
                      fontFamily: undefined,
                      fontWeight: 600,
                      formatter: function (w) {
                        return w.globals.seriesTotals.reduce((a, b) => {
                          return a + b
                        }, 0) / w.globals.series.length + '%'
                      }
                    }
              }
          }
              }
            }
           };
        
           async function getData() {
            const response = await fetch('http://my-json-server.typicode.com/apexcharts/apexcharts.js/yearly');
            const data = await response.json();
            console.log(data);
            for (let i = 0; i < 3; i++) {
              values.push(data[i].y)
           }
           console.log(values);
           
          }
      
      
      
    }

  
	render() {
		return (
			<ReactApexChart
				options={this.state.options}
				series={this.state.series}
				type="radialBar"
				height='231.43px'
        width='431.56px'
			/>
		);
	}
}

export default Radialbar;