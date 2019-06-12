$(document).ready(function () {
    //Added by khushbu kansal for changing colour of area chart when mode is 0 i.e only for usage page
    if (mode == 0) {
        Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
            return {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                       [0, Highcharts.getOptions().colors[0]],
                       [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]]
            };
        });
    }
    else {
        Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
            return {
                radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
                stops: [
                    [0, color],
                    [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                ]
            };
        });
    }
});

function fillcolor() {
    var colorarray = ['#32D2C9', '#ed5d5d', '#d6d23a', '#30cd94', '#cda24c', '#6ab3c8', '#a27cb0', '#28aca6', '#4d4366', '#6e8953', '#087189', '#decc00', '#f1c354'];

    for (i = 0; i < 150; i++) {
        var color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';

        //var color = Math.floor((Math.random() * 1000000) + 1);
        //colorarray.push("#" + ("000000" + color.toString(16)).slice(-6));
        colorarray.push(color);
    }
    return colorarray;
}


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
//Bug #7054
//colorarrHEX = ["#3366CC", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#DD4477", "#66AA00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#cccccc"];
colorarrHEX = fillcolor();
//Start - Added for analytics charts
var coloranalyticsHEX
coloranalyticsHEX = ["#F8A13F", "#90ED7D", "#7cb5ec", "#7798BF", "#aaeeee", "#eeaaee", "#5EC445", "#E39D9D", "#f7a35c", "#90ee7e", "#ff9900", "#16D921", "#EDE02B", "#96D6D6"];
//End - Added for analytics charts
var series1color = '';
var series2color = '';
var series3color = '';
var series4color = '';
var chartdivid = 'div-chart';
var enable3d = false;
var excludedrillup = true;
var isStacking = true;
var hdnYear = 0;
var hdnMonth = "";
function populateChart(type, id, showindecimal) {
    if (processed_json.length > 0) {
        if (processed_jsondollarvalue.length > 0) {
            Bindheighdollar(type, id);
        }
        else {
            Bindheigh(type, id, showindecimal);
        }
    }
    else {
        //ShowDiv(id);
    }



}

function Bindheigh(type, id, showindecimal, name) {
    $('#' + id).highcharts({
        credits: {
            enabled: false
        },
        //chart: { zoomType: 'xy' },
        chart: {
            type: type,
            options3d: {
                enabled: enable3d,
                alpha: 15,
                beta: 0
            }, events: {
                drilldown: function (e) {
                    if (!e.seriesOptions) {
                        var adprocessed_json4 = chartclick(e.point.title, type, e.point.drilldown, 0);
                        if (e.point.drilldown.toLowerCase().indexOf('zipcode') < 0)
                            excludedrillup = false;
                        else {
                            excludedrillup = true;
                        }
                        var chart = this,
                            drilldowns = {
                                'Paid-Customer': {
                                    name: e.point.name,
                                    data: adprocessed_json4
                                }

                            },
                            series = drilldowns['Paid-Customer'];
                        series.id = e.point.drilldown;

                        chart.addSeriesAsDrilldown(e.point, series);

                    }

                },

                drillup: function (e) {
                    if (e.seriesOptions.id != null && (e.seriesOptions.id.toLowerCase() == 'paid' || e.seriesOptions.id.toLowerCase() == 'unpaid' || e.seriesOptions.id.toLowerCase() == 'city' || e.seriesOptions.id.toLowerCase() == 'unplanned' || e.seriesOptions.id.toLowerCase() == 'planned') || (e.seriesOptions.name != null && e.seriesOptions.name.toLowerCase() == 'zipcode')) {
                        subBackToMain(type, excludedrillup);
                    }
                }
            }
        },
        title: {
            text: title
            ,
            style: {
                color: '#F00',
                font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
            }//,
            //zoomType: 'xy'
        },
        legend: {
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            floating: false
            //backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        }

   ,
        yAxis: {
            allowDecimals: false,
            min: 0,
            maxPadding: 0.25,
            title: {
                text: yaxis,
                style: {
                    color: '#333333',
                    fontSize: '12px',
                }
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
        },
        xAxis: {

            labels: {

                enabled: true,
                rotation: -25,
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
        },
        plotOptions: {

            series: {
                dataLabels: {
                    stacking: 'normal',

                    align: 'center',
                    rotation: 0,//#4867
                    // x: 0,//#4867
                    y: -2,//#4867
                    enabled: true,
                    formatter: function () {
                        if (this.y === 0) {
                            return null;
                        }
                        //return this.y;
                        return (showindecimal == true || showindecimal == undefined || showindecimal == null) ? this.y.toFixed(2) : this.y.toFixed(0);//Highcharts.numberFormat(this.y, 2) : Highcharts.numberFormat(this.y, 0);
                        //commented because it add spaces in the numbers
                    },
                    style: {
                        color: 'black',
                        fontSize: '9px'
                    }

                },
                point: {
                    pointer: 'cursor',
                    events: {
                        click: function () {

                        }
                    }
                }
            }
        },

        tooltip: {

            formatter: function () {
                return this.point.title + ': <b>' + Math.abs(this.y) + '<b>';
                // + ' ' + this.series.tooltipOptions.valueSuffix + '<b>';
                //if (this.point.series.yAxis.axisTitle!=null)
                //return this.point.series.yAxis.axisTitle.textStr + ' : </b>' + ((showindecimal == true || showindecimal == undefined || showindecimal == null) ? Highcharts.numberFormat(this.y, 2) : Highcharts.numberFormat(this.y, 0));
            }
        },
        series: [{
            showInLegend: false,
            type: type,
            name: name,
            data: processed_json,
            color: colorarrHEX[0]
            //colorByPoint: (showcolors && (type == 'column'))


        }
        ],
        drilldown: {
            series: [{
                id: 'Paid',
                name: 'Paid',
                data: processed_json2
            }, {
                id: 'Unpaid',
                name: 'Unpaid',
                data: processed_json3
            }, {
                id: 'Planned',
                name: 'Planned',
                data: processed_json2
            }, {
                id: 'Unplanned',
                name: 'Unplanned',
                data: processed_json3
            }, {
                id: 'Power',
                name: 'Power',
                data: processed_json2
            }, {
                id: 'Water',
                name: 'Water',
                data: processed_json3
            }, {
                id: 'Gas',
                name: 'Gas',
                data: processed_json4
            }]
        }

    });
}

function BindheighUsageAdminreport(type, id, name, unit, color) {
    $('#' + id).highcharts({
        credits: {
            enabled: false
        },
        chart: {
            type: type,
            options3d: {
                enabled: enable3d,
                alpha: 15,
                beta: 0
            }
        },
        title: {
            text: title
            ,
            style: {
                color: '#F00',
                font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
            }
        },
        legend: {
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            floating: false

        },
        yAxis: {
            allowDecimals: false,
            min: 0,
            maxPadding: 0.09,
            name: 'Usage',
            title: {
                //bug id 13023
                text: (unit == 'kWh' || unit == 'Gal' || unit == 'HCF' || unit == 'CCF') ? 'Units Consumed (' + unit + ')' : 'Cost of units consumed (' + unit + ')',
                // text: 'Cost of Units Consumed ('+unit+')',
                style: {
                    color: '#333333',
                    fontSize: '12px',
                }
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
        },
        xAxis: {

            labels: {

                enabled: true,
                rotation: -70,
                style: {
                    color: '#333333',
                    margin: "-20px",
                    fontSize: '10px',
                }
            },
            type: "category",
            name: 'Power',
            title: {
                style: {
                    color: '#333333',
                    fontSize: '12px',
                }
                //text: 'No. of Days'
            }
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5,
                lineWidth: null,
                states: {
                    hover: {
                        enabled: true,
                        lineWidth: 0.05
                    }
                },
                marker: {
                    enabled: false
                }
            },
            series: {
                dataLabels: {
                    stacking: 'normal',

                    align: 'center',
                    rotation: -30,//#4867
                    // x: 0,//#4867
                    y: -7,//#4867
                    enabled: false,
                    formatter: function () {
                        if (this.y === 0) {
                            return null;
                        }
                        //return this.y;
                        // return (showindecimal == true || showindecimal == undefined || showindecimal == null) ? Highcharts.numberFormat(this.y, 2) : Highcharts.numberFormat(this.y, 0);
                        // return Highcharts.numberFormat(this.y);
                        return (changetoK(this.y));
                    },
                    style: {
                        color: 'black',
                        fontSize: '9px'
                    }

                },
                point: {
                    pointer: 'cursor',
                    events: {
                        click: function () {

                        }
                    }
                }
            }
        },

        tooltip: {
            shared: false,
            //formatter: function () {
            //    return this.series.name + ' : <b>' + parseFloat(this.y).toFixed(2) + '<b>';
            //},
            //useHTML: true,
            //headerFormat: '<small>{point.key}</small><table>',
            //pointFormat: '<tr><td>{series.name}(' + unit + '): </td>' +
            //    '<td style="text-align: right"><b>{' + changetoK('point.y') + '}</b></td></tr>',
            //footerFormat: '</table>',
            formatter: function () {
                //return this.point.title + ':<b>'+ unit+' '+ Math.abs(this.y) + '<b>';
                return '<b>Date: </b>' + this.point.name + '<br/><b>' + this.point.title + '(' + unit + ')' + ': </b>' + changetoK(Math.abs(this.y)) + '<b>';
                //if (this.point.series.yAxis.axisTitle!=null)
                //return this.point.series.yAxis.axisTitle.textStr + ' : </b>' + ((showindecimal == true || showindecimal == undefined || showindecimal == null) ? Highcharts.numberFormat(this.y, 2) : Highcharts.numberFormat(this.y, 0));
            }
        },
        series: [{
            showInLegend: true,
            type: type,
            name: name,
            data: processed_json,
            color: color//colorarrHEX[0]
            // colorByPoint: (showcolors && (type == 'column')),


        }
        ]

    });
}

function BindheighSolarAdminreport(type, id, name, tooltip_title, unit, color) {
    $('#' + id).highcharts({
        credits: {
            enabled: false
        },
        chart: {
            type: type,
            options3d: {
                enabled: enable3d,
                alpha: 15,
                beta: 0
            }
        },
        title: {
            text: title
            ,
            style: {
                color: '#F00',
                font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
            }
        },
        legend: {
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            floating: false

        },
        yAxis: {
            allowDecimals: true,
            min: 0,
            maxPadding: 0.05,
            name: 'Usage',
            title: {
                text: (unit == '1') ? 'Units generated (kWh)' : 'Cost of units generated ($)',
                style: {
                    color: '#333333',
                    fontSize: '12px',
                }
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
        },
        xAxis: {

            labels: {

                enabled: true,
                rotation: -70,
                style: {
                    color: '#333333',
                    margin: "-20px",
                    fontSize: '10px',
                }
            },
            type: "category",
            name: 'Days',
            title: {
                style: {
                    color: '#333333',
                    fontSize: '12px',
                }
                //text: 'No. of Days'
            }
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5,
                lineWidth: null,
                states: {
                    hover: {
                        enabled: true,
                        lineWidth: 0.05
                    }
                },
                marker: {
                    enabled: false
                }
            },
            series: {
                dataLabels: {
                    stacking: 'normal',

                    align: 'center',
                    rotation: -30,//#4867
                    // x: 0,//#4867
                    y: -7,//#4867
                    enabled: false,
                    formatter: function () {
                        if (this.y === 0) {
                            return null;
                        }
                        //return this.y;
                        // return (showindecimal == true || showindecimal == undefined || showindecimal == null) ? Highcharts.numberFormat(this.y, 2) : Highcharts.numberFormat(this.y, 0);
                        return Highcharts.numberFormat(this.y);
                    },
                    style: {
                        color: 'black',
                        fontSize: '9px'
                    }

                },
                point: {

                    pointer: 'cursor',
                    events: {
                        click: function () {

                        }
                    }
                }
            }
        },

        tooltip: {
            shared: false,          
            //useHTML: true,
            //headerFormat: '<small><b>Date: </b>{point.key}</small><table>',
            //pointFormat: '<tr><td><b>'+ tooltip_title + ' </b></td>' +
            //    '<td style="text-align: right">{point.y}</td></tr>',
            //footerFormat: '</table>',           
            formatter: function () {
                return '<b>Date: </b>' + this.point.name + '<br/><b>' + this.series.name + ': </b>' + changetoK(Math.abs(this.y));
            }
        },
        series: [{
            showInLegend: true,
            type: type,
            name: 'Generation',
            data: processed_json,
            color: 'rgba(255,193,24,0.5)'
            // colorByPoint: (showcolors && (type == 'column')),


        }
        ]

    });
}

function BindhighChart2SeriesEffi(type, id, series1name, color1, series2name, color2) {

    $('#' + id).highcharts({
        credits: {
            enabled: false
        },
        chart: {
            type: type,
            options3d: {
                enabled: enable3d,
                alpha: 15,
                beta: 0
            }
        },
        legend: {
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            floating: false

        },
        title: {
            text: title
            ,
            style: {
                color: '#F00',
                font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
            }//,
            //zoomType: 'xy'
        }

   ,
        yAxis: {
            allowDecimals: false,
            //min: 0,
            title: {
                text: yaxis,
                style: {
                    color: '#333333',
                    fontSize: '12px',
                }
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'red'
                }
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        xAxis: {
            labels: {
                rotation: -70,
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
        },
        tooltip: {
            shared: false,
         
            formatter: function () {
               // return '<b>Date: </b>' + this.point.name + '<br/><b>' + this.series.name + ': </b>' + changetoK(Math.abs(this.y));
                return '<b>Date: </b>' + this.point.name + '<br/><b>' + this.series.name + ': </b>' + this.y;
            }
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.9,
                lineWidth: null,
                states: {
                    hover: {
                        enabled: true,
                        lineWidth: 0.05
                    }
                },
                marker: {
                    enabled: false
                }
            },
            series: {
                pointWidth: 18,
                dataLabels: {
                    stacking: 'normal',
                    align: 'center',
                    rotation: -30,
                    x: 4,
                    y: -7,
                    enabled: false,
                    formatter: function () {
                        if (this.y === 0) {
                            return null;
                        }
                        return this.y;
                    },
                    style: {
                        color: 'black',
                        fontSize: '9px'
                    }

                }
            }
        },
        series: [{
            type: type,
            name: series1name,
            data: processed_json,
            color: color1,
            showInLegend: true,

        }, {
            type: type,
            name: series2name,
            data: processed_json2,
            color: color2,
            showInLegend: true
        }
        ]
    });
}



function BindhighChart2SeriesHeat(type, id, series1name, series2name) {

    $('#' + id).highcharts({
        credits: {
            enabled: false
        },
        chart: {
            type: type,
            options3d: {
                enabled: enable3d,
                alpha: 15,
                beta: 0
            }
        },

        title: {
            text: title
                    ,
            style: {
                color: '#F00',
                font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
            }
        },
        legend: {
            enabled: false,
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            floating: false

        },
        yAxis: {
            //min: 0,
            allowDecimals: false,
            title: {
                text: yaxis,
                style: {
                    color: '#333333',
                    fontSize: '12px',
                }
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'red'
                }
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        xAxis: {
            labels: {
                rotation: -70,
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
                    fontSize: '12px',
                    fontFamily: 'Trebuchet MS, Verdana, sans-serif'

                }
            }
        },
        //tooltip: {

        //    formatter: function () {
        //        //return '<b>' + this.point.series.name + ' : </b>' + Math.abs(this.y);
        //        return '<b>' + this.point.series.name + ' : </b>' + this.y;
        //    }
        //},
        tooltip: {
            shared: false,
            formatter: function () {
                //return '<b>Date: </b>' + this.point.name + '<br/><b>' + this.series.name + ': </b>' + changetoK(Math.abs(this.y));
                return '<b>Date: </b>' + this.point.name + '<br/><b>' + this.series.name + ': </b>' + this.y;
            }
            //useHTML: true,
            //headerFormat: '<small><b>Date: </b>{point.key}</small><table>',
            //pointFormat: '<tr><td><b>{series.name}: </b></td>' +
            //    '<td style="text-align: right">{point.y} </td></tr>',
            //footerFormat: '</table>',
        },

        plotOptions: {
            areaspline: {
                fillOpacity: 0.5,
                lineWidth: null,
                states: {
                    hover: {
                        enabled: true,
                        lineWidth: 0.05
                    }
                },
                marker: {
                    enabled: false
                }
            },
            series: {
                // pointWidth: 11,
                dataLabels: {
                    stacking: 'normal',
                    align: 'center',
                    rotation: -30,//#4867
                    // x: 0,//#4867
                    y: -7,
                    enabled: false,
                    formatter: function () {
                        if (this.y === 0) {
                            return null;
                        }
                        //return this.y;
                        return (changetoK(this.y));
                        //return Highcharts.numberFormat(this.y, 0);
                    },
                    style: {
                        color: 'black',
                        fontSize: '9px'
                    }

                },

                point: {
                    pointer: 'cursor',
                    events: {
                        click: function () {
                        }
                    }
                }
            }
        },
        series: [{
            type: type,
            name: series1name,
            data: processed_json,
            color: colorarrHEX[0],
            showInLegend: true,

        }
        //, {
        //    type: type,
        //    name: series2name,
        //    data: processed_json2,
        //    color: colorarrHEX[1],
        //    showInLegend: true
        //}
        ]
    });
}


function BindheighWithSeries(type, id, series, showindecimal, name) {
    if (name != '')
        xaxis = name;
    $('#' + id).highcharts({
        //chart: { zoomType: 'xy' },
        credits: {
            enabled: false
        },
        chart: {
            type: type,
            options3d: {
                enabled: enable3d,
                alpha: 15,
                beta: 0
            },
            events: {
                drilldown: function (e) {
                    if (!e.seriesOptions) {
                        var adprocessed_json4 = chartclick(e.point.title, type, e.point.drilldown, 1);

                        var chart = this,
                            drilldowns = {
                                'Paid-Customer': {
                                    name: e.point.name,
                                    data: adprocessed_json4
                                }

                            },
                            series = drilldowns['Paid-Customer'];
                        chart.addSeriesAsDrilldown(e.point, series);

                    }

                }
            }
        },
        title: {
            text: title
            ,
            style: {
                color: '#F00',
                font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
            }//,
            //zoomType: 'xy'
        }

   ,
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: yaxis,
                style: {
                    color: '#333333',
                    fontSize: '12px',
                }
            },
            stackLabels: {
                enabled: false,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'red',
                    fontSize: '5px'
                }
            },
            labels: {
                enabled: false,
                formatter: function () {
                    return this.value;
                }
            }
        },
        xAxis: {
            labels: {
                enabled: false,
                rotation: -25,
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
        },
        plotOptions: {
            series: {
                dataLabels: {
                    stacking: 'normal',
                    align: 'top',

                    rotation: 0,//#4867
                    x: 0,//#4867
                    // y: 18,//#4867
                    y: 8,//#4867
                    enabled: true,
                    formatter: function () {
                        if (this.y === 0) {
                            return null;
                        }
                        //return this.y;
                        return (showindecimal == true || showindecimal == undefined || showindecimal == null) ? Highcharts.numberFormat(this.y, 2) : Highcharts.numberFormat(this.y, 0);
                    },
                    style: {
                        color: 'black',
                        fontSize: '9px'
                    }

                },
                point: {
                    pointer: 'cursor',
                    events: {
                        click: function () {

                        }
                    }
                }
            }
        },

        tooltip: {

            formatter: function () {
                return this.point.title + ': <b>' + Math.abs(this.y) + '<b>';
                //return this.point.series.yAxis.axisTitle.textStr + ' : </b>' + this.y;
                //if( this.point.series.yAxis.axisTitle!=null)
                // return this.point.series.yAxis.axisTitle.textStr + ' : </b>' + ((showindecimal == true || showindecimal == undefined || showindecimal == null) ? Highcharts.numberFormat(this.y, 2) : Highcharts.numberFormat(this.y, 0));
            }
        },
        series: [{

            type: type,
            name: xaxis != 'usageChart' ? xaxis : '',
            data: series,
            //Added by khushbu kansal to remove markers
            marker: {
                enabled: false
            },
            showInLegend: false,
            colorByPoint: (showcolors && (type == 'column'))
        }
        ]

    });
}

function BindhighChart2SeriesNetUsage(type, id, series1name, series2name) {

    $('#' + id).highcharts({
        // chart: { zoomType: 'xy' },
        title: {
            text: title
            ,
            style: {
                color: '#F00',
                font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
            }//,
            //zoomType: 'xy'
        }

   ,
     
        yAxis: {
            allowDecimals: false,
            //min: 0,
            title: {
                text: yaxis,
                style: {
                    color: '#333333',
                    fontSize: '12px',
                }
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'red'
                }
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        xAxis: {
            labels: {
                rotation: -25,
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
        },


        tooltip: {

            formatter: function () {
                return '<b>' + this.point.series.name + ': </b>' + Highcharts.numberFormat(Math.abs(this.y), 2);
                //return '<b>' + this.point.series.name + ' : </b>' + Highcharts.numberFormat(this.y, 2);
            }
        },
        plotOptions: {
            series: {
                pointWidth: 18
                //dataLabels: {
                //    stacking: 'normal',
                //    align: 'top',
                //    rotation: 90,
                //    x: 4,
                //    enabled: true,
                //    formatter: function () {
                //        if (this.y === 0) {
                //            return null;
                //        }
                //        return this.y;
                //    },
                //    style: {
                //        color: 'black'
                //    }

                //}
            }
        },
        series: [{
            type: type,
            name: series1name,
            data: processed_json,
            showInLegend: false,

        }, {
            type: type,
            name: series2name,
            data: processed_json2,
            showInLegend: false
        }
        ]
    });
}

function BindhighChart2Series(type, id, series1name, series2name) {

    $('#' + id).highcharts({
        credits: {
            enabled: false
        },
        // chart: { zoomType: 'xy' },
        title: {
            text: title
            ,
            style: {
                color: '#F00',
                font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
            }//,
            //zoomType: 'xy'
        }

   ,
        yAxis: {
            allowDecimals: false,
            //min: 0,
            title: {
                text: yaxis,
                style: {
                    color: '#333333',
                    fontSize: '12px',
                }
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'red'
                }
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        xAxis: {
            labels: {
                rotation: -25,
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
        },


        tooltip: {

            formatter: function () {
                //return '<b>' + this.point.series.name + ' : </b>' + Math.abs(this.y);
                return '<b>' + this.point.series.name + ': </b>' + Highcharts.numberFormat(this.y, 2);
            }
        },
        plotOptions: {
            series: {
                pointWidth: 18
                //dataLabels: {
                //    stacking: 'normal',
                //    align: 'top',
                //    rotation: 90,
                //    x: 4,
                //    enabled: true,
                //    formatter: function () {
                //        if (this.y === 0) {
                //            return null;
                //        }
                //        return this.y;
                //    },
                //    style: {
                //        color: 'black'
                //    }

                //}
            }
        },
        series: [{
            type: type,
            name: series1name,
            data: processed_json,
            showInLegend: false,

        }, {
            type: type,
            name: series2name,
            data: processed_json2,
            showInLegend: false
        }
        ]
    });
}

function BindhighChart2SeriesAdminReports(type, id, series1name, color1, series2name, color2) {

    $('#' + id).highcharts({
        // chart: { zoomType: 'xy' },
        title: {
            text: title
            ,
            style: {
                color: '#F00',
                font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
            }//,
            //zoomType: 'xy'
        }

   ,
        credits: {
            enabled: false
        }
        ,
        legend: {
            enabled: true,
            align: 'right',
            verticalAlign: 'top'
        },
        yAxis: {
            allowDecimals: false,
            //min: 0,
            title: {
                text: 'Number of messages',
                style: {
                    color: '#333333',
                    fontSize: '12px',
                }
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
        },
        xAxis: {
            labels: {
                rotation: -70,
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
                    color: '#333333',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    fontFamily: 'Trebuchet MS, Verdana, sans-serif'

                }
            }
        },


        tooltip: {

            shared: false,
            //useHTML: true,
            //headerFormat: '<small><b>Date: </b>{point.key}</small><table>',
            //pointFormat: '<tr><td><b>{series.name}: </b></td>' +
            //    '<td style="text-align: right">{point.y}</td></tr>',
            //footerFormat: '</table>',
            formatter: function () {
                //return '<b>Date: </b>' + this.point.name + '<br/><b>' + this.series.name + ': ' + '</b>' + changetoK(Math.abs(this.y));
                return '<b>Date: </b>' + this.point.name + '<br/><b>' + this.series.name + ': ' + '</b>' + this.y;
            }
        },
        plotOptions: {
            //series: {
            //    pointWidth: 18
            //},
            areaspline: {
                fillOpacity: 0.8,
                lineWidth: null,
                states: {
                    hover: {
                        enabled: true,
                        lineWidth: 0.05
                    }
                },
                marker: {
                    enabled: false
                }
            },
            series: {
                dataLabels: {
                    stacking: 'normal',
                    enabled: false,
                    align: 'center',
                    rotation: -30,//#4867
                    // x: 0,//#4867
                    y: -7,//#4867
                    enabled: false,
                    formatter: function () {
                        if (this.y === 0) {
                            return null;
                        }
                        //return this.y;
                        // return (showindecimal == true || showindecimal == undefined || showindecimal == null) ? Highcharts.numberFormat(this.y, 2) : Highcharts.numberFormat(this.y, 0);
                        // return Highcharts.numberFormat(this.y);
                        return (changetoK(this.y));
                    },
                    style: {
                        color: 'black',
                        fontSize: '9px'
                    }

                },
                point: {
                    pointer: 'cursor',
                    events: {
                        click: function () {

                        }
                    }
                }
            }
        },
        series: [{
            type: type,
            name: series1name,
            data: processed_json,
            verticalAlign: 'top',
            align: 'right',
            showInLegend: true,
            color: colorarrHEX[3]

        }, {
            type: type,
            name: series2name,
            data: processed_json2,
            verticalAlign: 'top',
            align: 'right',
            showInLegend: true,
            color: colorarrHEX[1]
        }
        ]
    });
}

function BindhighChart4SeriesAdminReports(type, id, series1name, series2name, series3name, series4name) {
    $('#' + id).highcharts({
        title: {
            text:''
            ,
            style: {
                color: '#F00',
                font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
            }
        },
        legend: {
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            floating: false
        },
        credits: {
            enabled: false
        },
        yAxis: {
            allowDecimals: false,
            allowDecimals: false,
            title: {
                text: title,
                style: {
                    color: '#333333',
                    fontSize: '12px',
                }
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'red'
                }
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        xAxis: {
            labels: {
                rotation: -70,
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
        },


        tooltip: {
            shared: false,          
            
            formatter: function () {
                return '<b>Date: </b>' + this.point.name + '<br/><b>' + this.series.name + ': ' + '</b>' + this.y;
            }
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.8,
                lineWidth: null,
                states: {
                    hover: {
                        enabled: true,
                        lineWidth: 0.05
                    }
                },
                marker: {
                    enabled: false
                }
            },
            series: {
                dataLabels: {
                    stacking: 'normal',
                    align: 'center',
                    rotation: -30,
                    y: -7,//#4867
                    enabled: false,
                    formatter: function () {
                        if (this.y === 0) {
                            return null;
                        }
                        //return this.y;
                        // return (showindecimal == true || showindecimal == undefined || showindecimal == null) ? Highcharts.numberFormat(this.y, 2) : Highcharts.numberFormat(this.y, 0);
                        return Highcharts.numberFormat(this.y, 0);
                    },
                    style: {
                        color: 'black',
                        fontSize: '9px'
                    }

                },
            }
        },
        series: [{
            type: type,
            name: series1name,
            data: processed_json,
            showInLegend: true,
            color: colorarrHEX[0]

        }, {
            type: type,
            name: series2name,
            data: processed_json2,
            showInLegend: true,
            color: colorarrHEX[1]
        },
        {
            type: type,
            name: series3name,
            data: processed_json3,
            showInLegend: true,
            color: colorarrHEX[2]
        },
        {
            type: type,
            name: series4name,
            data: processed_json4,
            showInLegend: true,
            color: colorarrHEX[3]
        }
        ]
    });
}

function BindhighChart2SeriesLine(type, id, series1color, series2color, series1name, series2name) {

    $('#' + id).highcharts({
        //chart: { zoomType: 'xy' },
        title: {
            text: title
            ,
            style: {
                color: '#F00',
                font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
            }//,
            //zoomType: 'xy'
        }

   ,
        yAxis: {
            allowDecimals: false,
            //min: 0,
            title: {
                text: yaxis,
                style: {
                    color: '#333333',
                    fontSize: '12px',
                }
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'red'
                }
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        xAxis: {
            labels: {
                rotation: -25,
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
        },


        tooltip: {

            formatter: function () {
                //   return '<b>' + this.point.series.yAxis.axisTitle.textStr + ' : </b>' + Math.abs(this.y);
                //return '<b>' + this.point.series.name + ' : </b>' + Math.abs(this.y);
                return '<b>' + this.point.series.name + ': </b>' + Highcharts.numberFormat(this.y, 2);
            }
        },
        plotOptions: {
            series: {
                pointWidth: 18
                //dataLabels: {
                //    stacking: 'normal',
                //    align: 'top',
                //    rotation: 90,
                //    x: 4,
                //    enabled: true,
                //    formatter: function () {
                //        if (this.y === 0) {
                //            return null;
                //        }
                //        return this.y;
                //    },
                //    style: {
                //        color: 'black'
                //    }

                //}
            }
        },
        series: [{
            type: type,
            name: series1name,
            data: processed_json,
            showInLegend: false,
            color: series1color

        }, {
            type: type,
            name: series2name,
            data: processed_json2,
            showInLegend: false,
            color: series2color
        }
        ]
    });
}

function BindhighChart3Series(type, id, series1name, series2name, series3name) {

    $('#' + id).highcharts({
        //chart: { zoomType: 'xy' },
        title: {
            text: title
            ,
            style: {
                color: '#F00',
                font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
            }//,
            // zoomType: 'xy'
        }

   ,
        yAxis: {
            //min: 0,
            allowDecimals: false,
            title: {
                text: yaxis,
                style: {
                    color: '#333333',
                    fontSize: '12px',
                }
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'red'
                }
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        xAxis: {
            labels: {
                rotation: -25,
                style: {
                    color: '#333333',
                    margin: "-20px",
                    fontSize: '12px',
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
        },


        tooltip: {

            formatter: function () {
                //return '<b>' + this.point.series.yAxis.axisTitle.textStr + ' : </b>' + Math.abs(this.y);
                return '<b>' + this.point.series.yAxis.axisTitle.textStr + ': </b>' + Highcharts.numberFormat(this.y, 2)
            }
        },
        plotOptions: {
            series: {
                pointWidth: 11,
                dataLabels: {
                    stacking: 'normal',
                    align: 'top',
                    rotation: 0,//#4867
                    x: 0,//#4867
                    enabled: true,
                    formatter: function () {
                        if (this.y === 0) {
                            return null;
                        }
                        //return this.y;
                        return Highcharts.numberFormat(this.y, 2);
                    },
                    style: {
                        color: 'black'
                    }

                }
            }
        },
        series: [{
            type: type,
            name: series1name,
            data: processed_json,
            showInLegend: false

        }, {
            type: type,
            name: series2name,
            data: processed_json2,
            showInLegend: false
        },
        {
            type: type,
            name: series3name,
            data: processed_json3,
            showInLegend: false
        }
        ]
    });
}

function BindhighChart4SeriesLine(type, id, series1color, series2color, series3color, series4color, series1name, series2name, series3name, series4name) {

    $('#' + id).highcharts({
        //chart: { zoomType: 'xy' },
        title: {
            text: title
            ,
            style: {
                color: '#F00',
                font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
            }//,
            //zoomType: 'xy'
        }

   ,
        yAxis: {
            //min: 0,
            allowDecimals: false,
            title: {
                text: yaxis,
                style: {
                    color: '#333333',
                    fontSize: '12px',
                }
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'red'
                }
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        xAxis: {
            labels: {
                rotation: -25,
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
        },


        tooltip: {

            formatter: function () {
                //return '<b>' + this.point.series.name + ' : </b>' + Math.abs(this.y);
                return '<b>' + this.point.series.name + ': </b>' + Highcharts.numberFormat(this.y, 2);
            }
        },
        plotOptions: {
            series: {
                pointWidth: 18
                //dataLabels: {
                //    stacking: 'normal',
                //    align: 'top',
                //    rotation: 90,
                //    x: 4,
                //    enabled: true,
                //    formatter: function () {
                //        if (this.y === 0) {
                //            return null;
                //        }
                //        return this.y;
                //    },
                //    style: {
                //        color: 'black'
                //    }

                //}
            }
        },
        series: [{
            type: type,
            name: series1name,
            data: processed_json,
            showInLegend: false,
            color: series1color

        }, {
            type: type,
            name: series2name,
            data: processed_json2,
            showInLegend: false,
            color: series2color
        },
        {
            type: type,
            name: series3name,
            data: processed_json3,
            showInLegend: false,
            color: series3color
        },
        {
            type: type,
            name: series4name,
            data: processed_json4,
            showInLegend: false,
            color: series4color
        }
        ]
    });
}

function BindPieChart(id, axisname, showVal) {




    if (processed_json.length > 0) {
        $('#' + id).highcharts({
            //legend: {
            //    enabled: true,
            //    layout: 'vertical',
            //    align: 'left',
            //    verticalAlign: 'top',
            //    floating: true,
            //    width: 10
            //},
            credits: {
                enabled: false
            },
            chart: {
                marginleft: 40,
                type: 'pie',
                options3d: {
                    enabled: enable3d,
                    alpha: 15,
                    beta: 0
                },
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                events: {
                    drilldown: function (e) {
                        if (!e.seriesOptions) {
                            var adprocessed_json4 = chartclick(e.point.title, 'pie', e.point.drilldown, 0);
                            if (e.point.drilldown.toLowerCase().indexOf('zipcode') < 0)
                                excludedrillup = false;
                            else {
                                excludedrillup = true;
                            }
                            var chart = this,
                                drilldowns = {
                                    'Paid-Customer': {
                                        name: e.point.name,
                                        data: adprocessed_json4
                                    }

                                },
                                series = drilldowns['Paid-Customer'];
                            series.id = e.point.drilldown;

                            chart.addSeriesAsDrilldown(e.point, series);

                        }

                    },

                    drillup: function (e) {
                        if (e.seriesOptions.id != null && (e.seriesOptions.id.toLowerCase() == 'paid' || e.seriesOptions.id.toLowerCase() == 'unpaid' || e.seriesOptions.id.toLowerCase() == 'city' || e.seriesOptions.id.toLowerCase() == 'unplanned' || e.seriesOptions.id.toLowerCase() == 'planned') || (e.seriesOptions.name != null && e.seriesOptions.name.toLowerCase() == 'zipcode')) {
                            subBackToMain('pie', excludedrillup, e.seriesOptions.name);
                        }
                    }
                }
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: false,
                        format: '<b>{point.name}</b> ({point.y:,.0f})',
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                        softConnector: true,
                        distance: 0
                    }
                },
                pie: {
                    showInLegend: true
                    //style: {
                    //    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    //}
                }
            },
            legend: {

                align: 'left',
                layout: 'vertical',
                verticalAlign: 'left',
                floating: true,
                x: id == "servicechart" ? 40 : 0,
                y: 0,
                labelFormatter: function () {
                    // added by priyansha for legends wrapping in next line for service chart bug 9183
                    if (id == "div-Efficiencychart") {
                        var words = this.name.split(' ');
                        var str = [];
                        for (var word in words) {
                            str.push(words[word]);
                            str.push('<br>');
                        }
                        return str.join('');
                    }
                    else {

                        return this.name
                    }
                }

            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.point.title + ': </b>' + Math.abs(this.y);
                    //if (showVal == 1) {
                    //    return '<b>' + this.point.title + ' : </b>' + Highcharts.numberFormat(this.y, 2);
                    //}
                    //else {
                    //    return '<b>' + this.point.series.name + ' : </b>' + Math.abs(this.y);
                    //}
                    //
                }
            },
            title: {
                verticalAlign: 'middle',
                floating: true,
                text: ''
            },
            series: [{
                name: axisname,
                data: processed_json
            }],
            drilldown: {
                series: [{
                    id: 'Paid',
                    name: 'Paid',
                    data: processed_json2
                }, {
                    id: 'Unpaid',
                    name: 'Unpaid',
                    data: processed_json3
                }, {
                    id: 'Planned',
                    name: 'Planned',
                    data: processed_json2
                }, {
                    id: 'Unplanned',
                    name: 'Unplanned',
                    data: processed_json3
                }, {
                    id: 'Power',
                    name: 'Power',
                    data: processed_json2
                }, {
                    id: 'Water',
                    name: 'Water',
                    data: processed_json3
                }, {
                    id: 'Gas',
                    name: 'Gas',
                    data: processed_json4
                }]
            }
        });
    }
    else { $('#' + id).html('<span style="text-align:center;color:#f00; padding:20px 0px; display:block;">No Data<span>'); }
}




function BindPieChartWithSeries(id, axisname, series, showVal, name) {
    if (name != '')
        axisname = name;
    $('#' + id).highcharts({
        credits: {
            enabled: false
        },
        chart: {
            marginLeft: name != 'usageChart' ? 120 : 0,
            type: 'pie',
            options3d: {
                enabled: enable3d,
                alpha: 15,
                beta: 0
            },
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            events: {
                drilldown: function (e) {
                    if (!e.seriesOptions) {

                        var adprocessed_json4 = chartclick(e.point.title, 'pie', e.point.drilldown, 1);

                        var chart = this,
                            drilldowns = {
                                'Paid-Customer': {
                                    name: e.point.name,
                                    data: adprocessed_json4
                                }

                            },
                            series = drilldowns['Paid-Customer'];
                        chart.addSeriesAsDrilldown(e.point, series);

                    }

                }
            }

        },

        plotOptions: {
            series: {
                dataLabels: {
                    enabled: false,
                    format: '<b>{point.name}</b> ({point.y:,.0f})',
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                    softConnector: true,
                    distance: 1


                }
            },
            pie: {
                showInLegend: name != 'usageChart' ? true : false
            }
        },
        tooltip: {

            formatter: function () {
                return '<b>' + this.point.title + ': </b>' + Math.abs(this.y);
                //if (showVal == 1) {
                //    return '<b>' + this.point.title + ' : </b>' + Highcharts.numberFormat(this.y, 2);
                //}
                //else {
                //    return '<b>' + this.point.series.name + ' : </b>' + Math.abs(this.y);
                //}
            }
        },
        legend: {

            align: 'left',
            layout: 'vertical',
            verticalAlign: 'left',
            floating: true,
            x: id == "servicechart" ? 40 : 0,
            y: 0
        },
        title: {
            verticalAlign: 'middle',
            floating: true,
            text: ''
        },


        series: [{

            name: axisname,
            data: series,
            showInLegend: name != 'usageChart' ? true : false
        }],
        drilldown: {
            series: [{
                id: 'Paid',
                name: 'Paid',
                data: processed_json2
            }, {
                id: 'Unpaid',
                name: 'Unpaid',
                data: processed_json3
            }]
        }
    });

}

//To show stacked column chart
function StackedColumnChart(type, id) {
    $('#' + id).highcharts({

        credits: {
            enabled: false
        },
        chart: {
            type: type
        },
        title: {
            text: '',
            style: {
                color: '#F00',
                font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
            }//,
            //zoomType: 'xy'
        },
        subtitle: {
            text: ''
        },
        legend: {
            align: 'right',
            layout: 'vertical',
        },
        yAxis: {
            allowDecimals: false,
            min: 0,
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

        },
        xAxis: {
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
        },
        plotOptions: {
            column: {
                stacking: isStacking ? 'normal' : '',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black, 0 0 3px black'
                    }
                }
            },

            series: {
                //dataLabels: {
                //    stacking: 'normal',
                //    align: 'top',
                //    rotation: -90,
                //    x: 4,
                //    enabled: true,
                //    formatter: function () {
                //        if (this.y === 0) {
                //            return null;
                //        }
                //        if (value == 'absolute')
                //            return this.y;
                //        else
                //            return Highcharts.numberFormat(this.y, 2);
                //    },
                //    style: {
                //        color: 'black',
                //        fontSize: '9px'
                //    }

                //},
                point: {
                    cursor: 'pointer',
                    events: {
                        click: function () {
                            if ((hdnMonth == "" || hdnMonth == null)) {
                                setValues(this.x, this.name);
                            }
                            if (this.name != null && this.name != '')
                                chartclick(this.name, this.y);
                            else
                                chartclick(this.x, this.y);
                        }
                    }
                },
                showInLegend: true
            }
        },

        tooltip: {

            formatter: function () {
                return "Value";
                //if (value == 'absolute')
                //    return this.point.series.yAxis.axisTitle.textStr + ' : </b>' + this.y;
                //else
                //    return this.point.series.yAxis.axisTitle.textStr + ' : </b>' + Highcharts.numberFormat(this.y, 2);
            }
        },
        //series: [{
        //    showInLegend: false,
        //    type: type,
        //    name: xaxis,
        //    data: processed_json,
        //    colorByPoint: (showcolors && (type == 'column'))


        //}
        //]
        series: glblSeriesSourceData["ResultSeriesArray"]
    });
}

function BindhighChartLine(type, id, seriescolor, yaxistext, seriesname) {

    $('#' + id).highcharts({
        //chart: { zoomType: 'xy' },
        title: {
            text: ''
            ,
            style: {
                color: '#F00',
                font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
            }//,
            //zoomType: 'xy'
        }

   ,
        yAxis: {
            allowDecimals: false,
            //min: 0,
            title: {
                text: yaxistext,
                style: {
                    color: '#333333',
                    fontSize: '12px',
                }
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'red'
                }
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        xAxis: {
            labels: {
                rotation: -25,
                style: {
                    color: '#333333',
                    margin: "-20px",
                    fontSize: '10px',
                }
            },
            title: {
                style: {
                    color: '#333',
                    fontWeight: 'bold',
                    fontSize: '3px',
                    fontFamily: 'Trebuchet MS, Verdana, sans-serif'

                }
            },
            type: "category",
            name: '',
        },


        tooltip: {

            formatter: function () {
                return Highcharts.numberFormat(this.y, 2);
                //   return '<b>' + this.point.series.yAxis.axisTitle.textStr + ' : </b>' + Math.abs(this.y);
                //return '<b>' + this.point.series.name + ' : </b>' + Math.abs(this.y);
                //return '<b>' + this.point.series.name + ' : </b>' + Highcharts.numberFormat(this.y, 2);
            }
        },
        plotOptions: {
            series: {
                pointWidth: 18,
                point: {
                    cursor: 'pointer',
                    events: {
                        click: function () {
                            DrillDown(this.name, this.x, this.y, seriesname);
                        }
                    }
                }
                //dataLabels: {
                //    stacking: 'normal',
                //    align: 'top',
                //    rotation: 90,
                //    x: 4,
                //    enabled: true,
                //    formatter: function () {
                //        if (this.y === 0) {
                //            return null;
                //        }
                //        return this.y;
                //    },
                //    style: {
                //        color: 'black'
                //    }

                //}
            }
        },
        series: [{
            type: type,
            data: processed_json,
            showInLegend: false,
            color: seriescolor
        }]
    });
}

function BindPieChartWithoutLabel(id, axisname, showVal) {
    if (processed_json.length > 0) {
        $('#' + id).highcharts({
            credits: {
                enabled: false
            },
            chart: {
                marginRight: 120,
                type: 'pie',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                events: {
                    drilldown: function (e) {
                        if (!e.seriesOptions) {
                            var adprocessed_json4 = chartclick(e.point.title, 'pie', e.point.drilldown, 0);
                            if (e.point.drilldown.toLowerCase().indexOf('zipcode') < 0)
                                excludedrillup = false;
                            else {
                                excludedrillup = true;
                            }
                            var chart = this,
                                drilldowns = {
                                    'Paid-Customer': {
                                        name: e.point.name,
                                        data: adprocessed_json4
                                    }
                                },
                                series = drilldowns['Paid-Customer'];
                            series.id = e.point.drilldown;

                            chart.addSeriesAsDrilldown(e.point, series);

                        }

                    },

                    drillup: function (e) {
                        if (e.seriesOptions.id != null && (e.seriesOptions.id.toLowerCase() == 'paid' || e.seriesOptions.id.toLowerCase() == 'unpaid' || e.seriesOptions.id.toLowerCase() == 'city')) {
                            subBackToMain('pie', excludedrillup);
                        }
                    }
                }
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: false,
                        format: '<b>{point.name}</b> ({point.y:,.0f})',
                        //color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                        softConnector: true,
                        distance: 0
                    }
                }

            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.point.title + ': </b>' + Math.abs(this.y);
                    //if (showVal == 1) {
                    //    return '<b>' + this.point.title + ' : </b>' + Highcharts.numberFormat(this.y, 2);
                    //}
                    //else {
                    //    return '<b>' + this.point.series.name + ' : </b>' + Math.abs(this.y);
                    //}
                    //
                }
            },
            legend: {
                align: 'right',
                layout: 'vertical',
                verticalAlign: 'left',
                floating: true,
                // padding:100,

                x: id == "servicechart" ? 0 : 0,
                //x:10,
                y: 0,
                labelFormatter: function () {
                    // added by priyansha for legends wrapping in next line for service chart bug 9183
                    //if (id == "servicechart") {
                    //    var words = this.name.split(' ');
                    //    var str = [];
                    //    for (var word in words) {
                    //        str.push(words[word]);
                    //        str.push('<br>');
                    //    }
                    //    return str.join('');
                    //}
                    //else {

                    return this.name
                    // }
                }
                //     labelFormatter: function () {
                //return '<p style="white-space:normal">'+ this.name+'</p>';}


            },
            title: {
                text: '',
                verticalAlign: 'middle',
                floating: true
            },
            series: [{
                name: axisname,
                data: processed_json,
                showInLegend: true
            }],
            drilldown: {
                series: [{
                    id: 'Paid',
                    name: 'Paid',
                    data: processed_json2
                }, {
                    id: 'Unpaid',
                    name: 'Unpaid',
                    data: processed_json3
                }, {
                    id: 'Planned',
                    name: 'Planned',
                    data: processed_json2
                }, {
                    id: 'Unplanned',
                    name: 'Unplanned',
                    data: processed_json3
                }]
            }
        });
    }
    else { $('#' + id).html('<span style="text-align:center;color:#f00; padding:20px 0px; display:block;">No Data<span>'); }
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
    $('.leftButton').css('padding-top', '177px');
    $('.rightButton').css('padding-top', '177px');

    $(".ColapseChart").click(function () {

        try {
            var crntImg = $(this).css('background-image');

            if (crntImg.indexOf('PlusIcon') > 0) {
                $(this).css('background-image', ($(this).css('background-image').replace('PlusIcon', 'MinusIcon')));
                $(".filterContainer").slideDown();
                var chartheightnew = 300;
                if ($(".FilterGridContainer").css('height') = '0px') {
                    chartheightnew = 441;
                }

                //  $(".FilterGridContainer").animate({ height: GridHeight }, 'fast');
                $(".filterContainer").css('height', chartheightnew);
                $("#" + chartdivid).css('height', chartheightnew);
                setTimeout(function () {

                    createchart();
                }, 2000);
                GridHeight = 0;
                $("#" + gridId).jqxGrid({ height: GridHeight });
                $(".FilterGridContainer").animate({ height: GridHeight }, 'fast');
            }
            else {

                // Minus Event of Chart Click
                $(this).css('background-image', ($(this).css('background-image').replace('MinusIcon', 'PlusIcon')));
                $(".filterContainer").slideUp();
                var chartheightnew = 0;
                $(".filterContainer").css('height', chartheightnew);
                $("#" + chartdivid).css('height', chartheightnew);
                setTimeout(function () {

                    createchart();
                }, 2000);
                GridHeight = 456;
                $("#" + gridId).jqxGrid({ height: GridHeight });
                $(".FilterGridContainer").animate({ height: GridHeight }, 'fast');
                //$(".FilterGridContainer").animate({ height: GridHeight }, 'fast');
            }

        }
        catch (error)
        { }

    });
    $(".ColapseGrid").click(function () {

        try {
            var crntImg = $(this).css('background-image');

            if (crntImg.indexOf('PlusIcon') > 0) {
                $(this).css('background-image', ($(this).css('background-image').replace('PlusIcon', 'MinusIcon')));

                GridHeight = 157;
                var chartheightnew = 300
                $(".FilterGridContainer").animate({ height: GridHeight }, 'fast');

                $(".filterContainer").css('height', chartheightnew);
                $("#" + chartdivid).css('height', chartheightnew);
                setTimeout(function () {

                    createchart();
                }, 410);
                $("#" + gridId).jqxGrid({ height: GridHeight });
            }
            else {

                $(this).css('background-image', ($(this).css('background-image').replace('MinusIcon', 'PlusIcon')));
                GridHeight = 0

                var chartheightnew = 441;
                $(".FilterGridContainer").animate({ height: GridHeight }, 'fast');
                $(".filterContainer").animate({ height: (chartheightnew + 27) }, 'fast');
                $("#" + chartdivid).css('height', chartheightnew);

                setTimeout(function () {

                    createchart();
                }, 410);

            }
            $("#" + gridId).jqxGrid({ height: GridHeight });
        }
        catch (error)
        { }

    });
    //for clicking on pre or next button of chart for multiple chart
    $('.rightButton').click(function () {

        if (x < (type.length) - 1)
        { x++; }
        else if (x == (type.length) - 1) { x = 0; }
        populateChart(type[x], 'dvhighchart');
        populateChart(type[x], 'commonPieChart');

    });
    $('.leftButton').click(function () {
        if (x > 0)
        { x--; }
        else if (x == 0) { x = (type.length) - 1; }
        populateChart(type[x], 'dvhighchart');
        populateChart(type[x], 'commonPieChart');
    });
    /*---show/hide section*/
    //$(".reportopen").click(function () {

    //$(".reportopen").toggleClass("active");
    //	$(".content_report").slideToggle("slow");  
    //}); 
    $('.dataGrid').css('width', '1066');
    $('.chart_inner').css('width', '1066');
    $('.dvchart').css('width', '1020');
    $('.dataGrid1').css('width', '426');

    $(".resultsopen").click(function () {
        $(".resultsopen").toggleClass("active");
        var imgtag = $(this).find("img");
        toggleimage(imgtag);

        toggleWidthright = $(".GraphGridContainer").width() == 1295 ? "1032px" : "1295px";
        var value = (parseInt(toggleWidthright) - 48).toString();

        if (toggleWidthright == '1295px') {

            $('.GraphGridContainer').animate({ width: toggleWidthright });
            $('.resultsopen').animate({ height: 501 });

            $('.dataGrid').css('width', toggleWidthright);
            $("#" + gridId).jqxGrid({ width: toggleWidthright });
            $('.chart_inner').css('width', toggleWidthright);
            $('.dvchart').css('width', value);
            $('#' + chartdivid).css('width', value);
            $('.dvchart').attr('align', 'center');
            $('.LeftFilterPanel').hide(400);
            $("#" + gridId).jqxGrid({ height: GridHeight, width: '1295px' });
            setTimeout(function () {
                populateChart(type[x], 'dvhighchart');
            }, 410);
        }
        else {
            $('.resultsopen').animate({ height: 489 });
            $('.LeftFilterPanel').show(400);
            $('.GraphGridContainer').animate({ width: toggleWidthright });
            $('.dataGrid').css('width', toggleWidthright);
            $('.chart_inner').css('width', toggleWidthright);
            $('.dvchart').css('width', value);
            $('#' + chartdivid).css('width', value);
            $('.dvchart').attr('align', 'center');
            $("#" + gridId).jqxGrid({ width: toggleWidthright });
            setTimeout(function () {
                populateChart(type[x], 'dvhighchart');
            }, 410);
        }



    });
    $(".closeIcon").click(function () {
        var tt = $(this).parents(".span3").attr("id");
        //var gh = $("#" + tt).find(".contentArea").attr("id");
        $("#" + tt).hide(500);
    });

    //Change by khushbu kansal to make charts 3D on checking the checkbox
    $("#chkbx3d").change(function () {
        if ($(this).is(':checked')) {
            enable3d = true;
            var obj = $("a span[class*=active],i[class*=active]");
            PiechartCommon(mode, obj[0].id);

        }
        else {
            enable3d = false;
            var obj = $(".outage_graph_img  a span[class*=active],i[class*=active]");
            PiechartCommon(mode, obj[0].id);
        }
    });

});

function toggleimage(imgtag) {

    if (imgtag.attr("src").indexOf('Minus') > 0) {
        imgtag.attr("src", imgtag.attr("src").replace('Minus', 'Plus'));
    }
    else {
        imgtag.attr("src", imgtag.attr("src").replace('Plus', 'Minus'));
    }
}

var DeliveredfromNumber = 0;
var DeliveredtoNumber = 0;
var DemandfromNumber = 0;
var DemandtoNumber = 0;
var toggleWidthright = '0';
var gridId = '';
var minscale = -50;
var maxscale = 50;


function showMessage(obj, message) {
    $(obj).text(message);
    $(obj).show();
    $(obj).fadeOut(5000, "linear");
}
//for Export to pdf icon disable and enable

function ExportPdfChange(obj) {

    try {

        if (obj.length == 0) {
            $('.export').attr('disabled', 'disabled');
            $('.export').css('cursor', 'default');
            // $('.Export').css('cursor', 'default');
        }
        else {
            $('.export').attr('disabled', false);
            $('.export').css('cursor', 'pointer');
            //$('.Export').css('cursor', 'pointer');
        }
    }
    catch (ex)
    { }
}

function ShowDiv(id) {
    $('#' + id).html('<div style="margin-left: auto;text-align: center;padding-top: 23%;">No Data</div>');
    $('.leftButton').css('visibility', 'hidden');
    $('.rightButton').css('visibility', 'hidden');
}
function dynamicWidth(data) {

    if (data > 20) {
        var width = (data * 55) + 15;
        $('#dvhighchart').css('width', width);
    }

}

var glblSeriesSourceData = new Array();
glblSeriesSourceData["MapAllData"] = null;
glblSeriesSourceData["AllData"] = null;//Array that contains all data
glblSeriesSourceData["SeriesNameKey"] = null; //Key to find Series Key From SeriesNameArray 
glblSeriesSourceData["SeriesNameArray"] = null; //Distinct Set of Series Name
glblSeriesSourceData["SeriesDataKey"] = null; //Key to find Series Data Key From SeriesDataKeyArray 
glblSeriesSourceData["SeriesDataKeyArray"] = null; //Distinct Set of Series Data Key Array
glblSeriesSourceData["SeriesDataValueKey"] = null; //Key to find data from All data
glblSeriesSourceData["SeriesDataValueKey1"] = null; //Key to find data from All data
glblSeriesSourceData["SeriesName"] = null; //Series Name, will be changed in loop as and when required
glblSeriesSourceData["DataKey"] = null; //Data Key, will be changed in loop as and when required

glblSeriesSourceData["ResultSeriesArray"] = null;

function loadSeries() {
    var seriesArray = new Array();
    $(glblSeriesSourceData["SeriesNameArray"]).each(function (index) {

        glblSeriesSourceData["SeriesName"] = $(this)[0][glblSeriesSourceData["SeriesNameKey"]];
        seriesArray[index] = new Array();
        seriesArray[index]['name'] = glblSeriesSourceData["SeriesName"];
        seriesArray[index]['data'] = loadSeriesData();
    });
    glblSeriesSourceData["ResultSeriesArray"] = seriesArray;
}

function loadSeriesData() {
    var dataArray = new Array();
    $(glblSeriesSourceData["SeriesDataKeyArray"]).each(function (index) {

        glblSeriesSourceData["DataKey"] = $(this)[0][glblSeriesSourceData["SeriesDataKey"]];
        dataArray[index] = new Array();
        dataArray[index][0] = glblSeriesSourceData["DataKey"];
        if (glblSeriesSourceData["SeriesDataValueKey"] != "")
            dataArray[index][1] = loadData();
        if (glblSeriesSourceData["SeriesDataValueKey1"] != "")
            dataArray[index][2] = loadData2();
    });
    return dataArray;
}

function loadData() {
    var data = 0;
    $(glblSeriesSourceData["AllData"]).each(function (index) {

        if (glblSeriesSourceData["AllData"][index][glblSeriesSourceData["SeriesNameKey"]] == glblSeriesSourceData["SeriesName"] && glblSeriesSourceData["AllData"][index][glblSeriesSourceData["SeriesDataKey"]] == glblSeriesSourceData["DataKey"]) {
            data = glblSeriesSourceData["AllData"][index][glblSeriesSourceData["SeriesDataValueKey"]];
        }
    });

    return data;
}

function loadData2() {
    var data = 0;
    $(glblSeriesSourceData["AllData"]).each(function (index) {

        if (glblSeriesSourceData["AllData"][index][glblSeriesSourceData["SeriesNameKey"]] == glblSeriesSourceData["SeriesName"] && glblSeriesSourceData["AllData"][index][glblSeriesSourceData["SeriesDataKey"]] == glblSeriesSourceData["DataKey"]) {
            data = glblSeriesSourceData["AllData"][index][glblSeriesSourceData["SeriesDataValueKey1"]];
        }
    });
    return data;
}

function getMonthValue(monthname) {
    var month1 = monthname;
    month1 = month1.toLowerCase();
    var months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    month1 = months.indexOf(month1);
    return month1 + 1;
}

function getDayValue(monthname, year) {
    var month1 = monthname;
    month1 = month1.toLowerCase();
    var months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    month1 = months.indexOf(month1) + 1;
    if (month1 == 1 || month1 == 3 || month1 == 5 || month1 == 7 || month1 == 8 || month1 == 10 || month1 == 12)
        return 31;
    if (month1 == 4 || month1 == 6 || month1 == 9 || month1 == 11)
        return 30;
    if (month1 == 2) {
        if (year % 4 == 0)
            return 29;
        else
            return 28;
    }
}

function setValues(x, name) {
    if (hdnYear == 0) {
        hdnYear = x;
        $('.chartback').css('display', 'block');
        $('.chartback').attr('title', 'Back to yearly');
    }
    else if (name != undefined) {
        hdnMonth = name;

        $('.chartback').attr('title', 'Back to monthly');
    }
}

//This function is used to show grouped column charts
function BindColumnSeries(id, dataseries, seriesname, categories, title) {

    try {
        $('#' + id).highcharts({
            chart: {
                type: "column",
            },
            title: {
                style: {
                    'fontSize': '1em'
                },
                useHTML: true,
                x: -27,
                y: 8,
                text: '<span class="chart-title">' + title + '</span>'
            },
            plotOptions: {
                series: {
                    pointWidth: 18,
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function () {
                                DrillDown(this.category.parent.name, this.x, this.y, seriesname);
                            }
                        }
                    }
                }
            },
            series: dataseries,
            xAxis: {
                categories: categories
            }
        });
    }
    catch (err) {
    }
}

//This function is used to show grouped and stacked column charts
function BindStackedGroupedColumnSeries(id, dataseries, seriesname, categories, title, yaxistext) {

    try {
        $('#' + id).highcharts({
            chart: {
                type: "column",
            },
            title: {
                style: {
                    'fontSize': '1em'
                },
                useHTML: true,
                x: -27,
                y: 8,
                text: '<span class="chart-title">' + title + '</span>'
            },
            plotOptions: {
                series: {
                    pointWidth: 18,
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function () {
                                DrillDown(this.category.parent.name, this.x, this.y, seriesname);
                            }
                        }
                    }
                },
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false,
                        style: {
                            textShadow: '0 0 3px black'
                        }
                    }
                }
            },
            series: dataseries,
            xAxis: {
                categories: categories
            },
            yAxis: {
                allowDecimals: false,
                title: {
                    text: yaxistext,
                    style: {
                        color: '#333333',
                        fontSize: '12px',
                    }
                }
            }
        });
    }
    catch (err) {
    }
}

//This function is used to create stacked column chart
function BindStackedColumnSeries(id, dataseries, seriesname, categories, title, yaxistext) {

    try {
        $('#' + id).highcharts({
            chart: {
                type: "column",
            },
            plotOptions: {
                series: {
                    pointWidth: 18,
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function () {
                                DrillDown(this.category.name, this.x, this.y, seriesname);
                            }
                        }
                    }
                },
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false,
                        style: {
                            textShadow: '0 0 3px black'
                        }
                    }
                }
            },
            series: dataseries,
            xAxis: {
                categories: categories,
                labels: {
                    rotation: -45,
                    style: {
                        color: '#333333',
                        margin: "-20px",
                        fontSize: '10px',
                    }
                },
            },
            yAxis: {
                allowDecimals: false,
                title: {
                    text: yaxistext,
                    style: {
                        color: '#333333',
                        fontSize: '12px',
                    }
                }
            }
        });
    }
    catch (err) {
    }
}

//This function is used to create column chart
function BindColumnSeries(id, dataseries, seriesname, categories, title) {

    try {
        $('#' + id).highcharts({
            chart: {
                type: "column",
            },
            plotOptions: {
                series: {
                    pointWidth: 18
                }
            },
            series: dataseries,
            xAxis: {
                categories: categories
            }
        });
    }
    catch (err) {
    }
}


//this function is used to add k when value is greater than 1000
function changetoK(value) {
    if (value > 1000) {
        value = value / 1000;
        //var arr = value.toString().split(".")
        return value.toFixed(2) + "K";
    }
    else { return value.toFixed(2); }
}