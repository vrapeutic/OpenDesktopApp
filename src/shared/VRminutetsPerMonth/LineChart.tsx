import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { config } from '../../config';

class LineChart extends Component {
  state: any = {series: [ ], options: { }}
  constructor(props: any) {
    super(props);
      
    this.state = {
      series: [{
        name: 'Minutes',
        data: [],
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
  
    }

    async componentDidMount(){
      const token = await (window as any).electronAPI.getPassword(
        "token"
       );

       const date = new Date();
       const year = date.getFullYear();
       
       const month={'January': 0, 'February': 0, 'March': 0, 'April': 0, 'May': 0, 'June': 0, 'July': 0,
                     'August': 0, 'September': 0, 'October': 0, 'November': 0, 'December': 0};

       const months = Object.entries(month).reduce((acc, [key, value]) => {
                      acc[`${key} ${year}`] = value;
                      return acc;
                    }, {});
                      
      await fetch(`${config.apiURL}/api/v1/doctors/center_vr_minutes?center_id=${this.props.centerId}`,{
        method: 'Get',
        redirect: 'follow',
        headers: {'Authorization': `Bearer ${token}`}
       })
    .then(response => response.json())
    .then(result => {
                   this.setState({series: [{
                    name: 'Minutes',
                    data: Object.values(Object.assign(months,result)),
                  }] 
                })
                    })
    .catch(error => console.log('error', error));     
    }
  

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

export default LineChart;
