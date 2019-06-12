var processed_json = new Array();
var processed_json2 = new Array();
var processed_json3 = new Array();
var processed_json4 = new Array();
var processed_jsondollarvalue = new Array();
var type = ['column', 'line'];
var x = 0;
var title = '';
var xaxis = '';
var yaxis = '';
var showcolors = false;
var colorarrHEX = new Array();
colorarrHEX = ["#3366CC", "#ba3d4b", "#ff9900", "#109618", "#990099", "#0099c6", "#DD4477", "#66AA00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#cccccc"];
var series1color = '';
var series2color = '';
var series3color = '';
var series4color = '';
function populateChart(type, id, value)
{
    if (processed_json.length > 0)
    {
        
            if (processed_json2.length > 0)
            {
                DResponse_chart(type, id, value);
            }
    }
    
}

function DResponse_chart(type, id, value) {
    $('#' + id).highcharts({
        credits: {
            enabled: false
        },
        title: {
            text: title,
            style: {
                color: '#F00',
                font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
            }
        },
        yAxis: [{
            min: 0,
         //   max:80,
            title: {
                text: yaxis,
                style: {
                    color: '#333333',
                    fontSize: '12px',
                },

            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'red',
                    fontSize: '5px'
                }
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }

        }, {
            min: 0,
            title: {
                text: "",
            },
            
            labels: {
                enabled: false
            }

        },
        {
            min: 0,
            title: {
                text: "",
            },

            labels: {
                enabled: false
            }

        }
        ],
        xAxis: [{
            labels: {
                rotation: -45,
                style: {
                    color: '#333333',
                    margin: "-20px",
                    fontSize: '10px',
                }
            },
            type: "category",
            name: 'Customer Count',
            title: {
                style: {
                    color: '#333',
                    fontWeight: 'bold',
                    fontSize: '3px',
                    fontFamily: 'Trebuchet MS, Verdana, sans-serif'

                }
            }
        }, {
            labels: {
                enabled: false
            }
           
        }],
        plotOptions: {
            series: {
                dataLabels: {
                    //crop: true,
                    //groupPadding: 22,
                    stacking: 'normal',
                    align: 'top',
                    rotation: -90,
                    x: 4,
                    //inside: true,
                    enabled: true,
                    formatter: function () {
                        if (this.y === 0) {
                            return null;
                        }
                        if (value == 'absolute')
                            return this.y;
                        else
                            return Highcharts.numberFormat(this.y, 2);
                    },
                    style: {
                        color: 'black',
                        fontSize: '10px'
                    }
                },
                point: {
                    cursor: 'pointer',
                    events: {
                        click: function () {
                            chartclick(this.name, this.y);
                        }
                    }
                }
            }
        },

        tooltip: {

            formatter: function () {
                if (value == 'absolute')
                    return this.point.series.yAxis.axisTitle.textStr + ': </b>' + this.y;
                else
                    return this.point.series.name + ': </b>' + Highcharts.numberFormat(this.y, 2);
            }
        },
        series: [{
            showInLegend: false,
            type: type,
            name: 'Baseline',
            data: processed_json,
            colorByPoint: (showcolors && (type == 'column'))


        },
           {
               showInLegend: false,
               type: "line",
               name: 'Curtail',
               data: processed_json2,
               dataLabels: {
                   enabled: false
               },
               color: '#66FF66'
             
           },
            {
                showInLegend: false,
                type: "line",
                name: 'Interval Avg',
                data: IntervalAvg,
                dataLabels: {
                    enabled: false
                },
                marker: {
        enabled: false
    },
                color: '#FF0000'
                //colorByPoint: (showcolors && (type == 'column'))
            },
             {
                 showInLegend: false,
                 type: "line",
                 name: 'Baseline Avg',
                 data: BaselineAvg,
                 dataLabels: {
                     enabled: false
                 },
                 marker: {
                     enabled: false,
                  
                 },
                 color: '#000000'
               
             }
        ]

    });
}

//open fancy popup and draw dynamic chart on call function from click on extent button
$(document).ready(function () {

    $('.fancybox').click(function () {

        $('.fancybox').fancybox({

            afterShow: function () {

                populateChart(type[x], 'commonPieChart')
            }
        });


    });
});
