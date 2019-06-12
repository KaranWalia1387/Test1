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
var weatherOverlay = 0;
var json_htmp = new Array();
var IsDecimal = 1;
function populateChart(type, id, value, showindecimal, usagetype) {
    if (showindecimal == undefined) {
        showindecimal = true;
    }
    var usageType = usagetype;
    if (processed_json.length > 0) {
        if (processed_jsondollarvalue.length > 0) {
            Bindheighdollar(type, id, value);

        }
        else {
            Bindheigh(type, id, value, showindecimal, usageType);

        }
    }
   
}

function Bindsolar(type, id, value, chartorentation) {
    var maxy = processed_json[0].y;
    var xaxiscustomized;
    var yaxiscustomized;
    var maxtemp = 0;
    for (var i = 0; i < processed_json.length; i++) {
        if (maxy < processed_json[i].y)
            maxy = processed_json[i].y;

    }
    if (json_htmp.length > 0) {
        maxtemp = json_htmp[0].y;
        for (var i = 0; i < json_htmp.length; i++) {
            if (maxtemp < json_htmp[i].y)
                maxtemp = json_htmp[i].y;

        }
    }
    if (weatherOverlay == '0') {
        xaxiscustomized = [{
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
        }];

        yaxiscustomized = [{
            min: 0,
            max: maxy + (maxy * .2),
            maxPadding: 0.12,
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
        { // Secondary yAxis
            min: 0,
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            },
            opposite: true
        }];
    }
    else {
        maxy = maxy + (maxy * 1.2);
        xaxiscustomized =[ {
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
        ,
                {
                    yAxis: 1,
                    name: 'Temperature',
                    type: 'spline',
                    showInLegend: false,
                    data: json_htmp,
                    tooltip: {
                        valueSuffix: '°F'
                    }
                }];

        yaxiscustomized = [{
            min: 0,
            max: maxy,
            maxPadding: 0.12,
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

        }
        ,
        { // Secondary yAxis
            min: -53,
            max: maxtemp + 20,
            title:
                {
                    // text: 'Temperature',
                    // add temperature measure unit
                  text: null//$('#lbltemp').text(),
                    //style:
                    //    {
                    //        color: Highcharts.getOptions().colors[0]
                    //    }
                },
            labels: {
                enabled: false
                //formatter: function () {
                //    return this.value;
                //}
            },
            opposite: true


        }
        ];
    }
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
        yAxis: yaxiscustomized,
        xAxis: xaxiscustomized,

        plotOptions: {
            series: {
                dataLabels: {  
                    //crop: true,
                    useHTML: true,
                    stacking: 'normal',
                    align: 'center',
                    rotation: 0,
                   // x: 4,
                    y: -15,
                    inside: false,
                    enabled: true,
                    formatter: function () {
                        // return Highcharts.numberFormat(this.y, 2)
                        return (this.point.Icon_url == null ? (Highcharts.numberFormat(this.y, 2)) : ('<div id="chrt"><img src="' + (this.point.Icon_url == null ? "" : this.point.Icon_url) + '" alt=""/></div>'));
                    },
                    style: {
                        color: '#333333',
                        fontSize: '10px'
                    }
                },
                point: {
                    cursor: 'pointer',
                    //events: {
                    //    click: function () {
                    //        chartclick(this.name, this.y);
                    //    }
                    //}
                },
                color: '#D3D3D3'
            }
        },

        tooltip: {
            useHTML: true,
            formatter: function () {
                // if (this.point.series.yAxis.axisTitle.textStr == 'Temperature(°C)')              
                if (this.point.series.yAxis.axisTitle.textStr == $('#lbltemp').text())
                    return '<div><div><b>' + this.point.series.yAxis.axisTitle.textStr + ': </b>' + Highcharts.numberFormat(this.y, 2) + '°F</div></div>';
                else
                    return '<div style="z-index:99"><div><b>' + this.point.series.yAxis.axisTitle.textStr + ': </b>' + Highcharts.numberFormat(this.y, 2) + '</div>' + (this.point.High_fahrenheit == null ? "" : '<div><b>' + $('#lblMaxTemp').text() + ': </b>' + (this.point.High_fahrenheit)) + '</div>' + (this.point.Low_fahrenheit == null ? "" : '<div><b>' + $('#lblMinTemp').text() + ': </b>' + (this.point.Low_fahrenheit)) + '</div>' + (this.point.Avehumidity == null ? "" : '<div><b>' + $('#lblAvgHumidity').text() + ': </b>' + (this.point.Avehumidity)) + '</div>' + (this.point.Icon == null ? '' : '<div><b>' + $('#lblWeather').text() + ': </b>' + getweatherinfo(this.point.Icon) + '</div>') + '</div>';
                
            }
        },
        series: [{
            yAxis: 0,
            showInLegend: false,
            type: type,
            name: xaxis,
            data: processed_json,
            colorByPoint: (showcolors && (type == 'column')),
            dataLabels: {
                rotation: chartorentation //Changed by khushbu kansal for displaying text in vertical position
            }

        },
        {
            showInLegend: false,
            yAxis: 1,
            name: 'Temperature',
            type: 'spline',
            data: json_htmp,
            tooltip: {
                valueSuffix: '°F'
            }
        }
        ]

    });
}

function getweatherinfo(weathervalue) {
    var returnvalue = weathervalue;
    switch (weathervalue) {
        case 'partlycloudy': returnvalue = 'Partly Cloudy'
            break;
    }
    return returnvalue;
}

function Bindbarheigh(type, id, value) {
    //Bug Id 0007975 START
    var showlegend = true;
    //END 0007975
    if (id == 'chtsaving') {
        showlegend = false; //Bug Id 0007975
        rotationVal = 0.1
    }
    else {
        rotationVal = -45
    }
    if (processed_json.length > 0) {
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
            yAxis: {
                min: 0,
                maxPadding: 0.14,
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


                series: {
                    dataLabels: {
                        stacking: 'normal',
                        //align: 'top',
                        rotation: rotationVal,
                        //inside: true,
                        x: 0,
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
                            color: '#333333',
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
                        return '<b>' + this.point.series.yAxis.axisTitle.textStr + ': </b>' + this.y;
                    else
                        return '<b>' + this.point.series.yAxis.axisTitle.textStr + ': </b>' + Highcharts.numberFormat(this.y, 2);
                }
            },
            series: [{
                showInLegend: false,
                type: type,
                name: xaxis,
                data: processed_json,
                colorByPoint: (showcolors && (type == 'column'))


            }
            ]

        });
    }
}

function BindheighDashboard(type, id, value, yaxislabel) {
    if (processed_json.length > 0) {
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
            yAxis: {
                min: 0,
                maxPadding: 0.09,
                title: {
                    text: '',
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
                },               
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


                series: {
                    dataLabels: {
                       
                        align: 'top',
                        rotation: -90,
                        x: 4,
                     
                        enabled: false,
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
                        cursor: 'pointer'
                        
                    }
                }
            },

            tooltip: {
                formatter: function () {
                    if (value == 'absolute')
                        return '<b>' + this.point.series.yAxis.axisTitle.textStr + ': </b>' + this.y;
                    else {
                        if (yaxislabel == '$') {
                            return yaxislabel + changetoK(this.y)
                        }
                        else
                            return changetoK(this.y) + ' ' + yaxislabel;
                    }
                }
            },
            series: [{
                showInLegend: false,
                type: type,
                name: xaxis,
                data: processed_json,
                colorByPoint: (showcolors && (type == 'column'))


            }
            ]

        });
    }
}

function BindheighDashboard_EnergyRpt(type, id, value, yaxislabel) {
    if (processed_json.length > 0) {
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
            yAxis: {
                min: 0,
                maxPadding: 0.09,
                title: {
                    text: '',
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
                },
                title: {
                    text: 'Cost of Units Consumed($)'
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


                series: {
                    dataLabels: {
                        //crop: true,
                        // stacking: 'normal',
                        align: 'top',
                        rotation: -90,
                        x: 4,
                        //inside: true,
                        enabled: false,
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
                        //events: {
                        //    //click: function () {
                        //    //    chartclick(this.name, this.y);
                        //    //}
                        //}
                    }
                }
            },

            tooltip: {
                formatter: function () {
                    if (value == 'absolute')
                        return '<b>' + this.point.series.yAxis.axisTitle.textStr + ': </b>' + this.y;
                    else {
                        if (yaxislabel == '$') {
                            return yaxislabel + Highcharts.numberFormat(this.y, 2)
                        }
                        else
                            return Highcharts.numberFormat(this.y, 2) + ' ' + yaxislabel;
                    }
                }
            },
            series: [{
                showInLegend: false,
                type: type,
                name: xaxis,
                data: processed_json,
                colorByPoint: (showcolors && (type == 'column'))


            }
            ]

        });
    }
}

function Bindheigh(type, id, value, showindecimal, usageType) {
    if (showindecimal == undefined) {
        showindecimal = true;
    }
    try {
        var yaxiscustomized;//Used to Hide Temperature Axis when No Weather Data is there
        var xaxiscustomized;//Used to Hide Temperature Axis when No Weather Data is there
        var maxy = processed_json[0].y;
        var maxtemp = 0;
        var maxline;
        for (var i = 0; i < processed_json.length; i++) {
            if (maxy < processed_json[i].y)
                maxy = processed_json[i].y;

        }
        if (json_htmp.length > 0) {
            maxtemp = json_htmp[0].y;
            for (var i = 0; i < json_htmp.length; i++) {
                if (maxtemp < json_htmp[i].y)
                    maxtemp = json_htmp[i].y;

            }
        }

        var plot = {};
      
        if (weatherOverlay == '0') {
            maxline = maxy * 0.9;
            if (usageType == "WU") {
                plot = {
                    value: maxline,
                    color: '#31afdb',
                    dashStyle: 'shortdash',
                    width: 2,
                    //label: {
                    //    text: 'Water Allocation'
                    //}
                }
            }
         
            maxy = maxy + (maxy * .2);
            yaxiscustomized = {
                min: 0,
                max: maxy,
                maxPadding: 0.12,
                title: {
                    text: yaxis,
                    style: {
                        color: '#333333',
                        fontSize: '12px',
                    },
                },
                plotLines: [plot],
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
            xaxiscustomized = [{
                yAxis: 0,
                showInLegend: false,
                type: type,
                name: xaxis,
                data: processed_json,
                dataLabels: {
                    rotation: -90 //Changed by khushbu kansal for displaying text in vertical position

                },
                colorByPoint: (showcolors && (type == 'column')),

            }]
        }
        else {            
            maxline = maxy * 0.9;
            if (usageType == "WU") {
                plot = {
                    value: maxline,
                    color: '#31afdb',
                    dashStyle: 'shortdash',
                    width: 2,
                    //label: {
                    //    text: 'Water Allocation'
                    //}
                }
            }
            maxy = maxy + (maxy * 0.5),
            xaxiscustomized = [{
                yAxis: 0,
                showInLegend: false,
                type: type,
                name: xaxis,
                data: processed_json,
                dataLabels: {
                    rotation: -90 

                },
                colorByPoint: (showcolors && (type == 'column'))
            },
                {
                    yAxis: 1,
                    name: 'Temperature',
                    type: 'spline',
                    showInLegend: false,
                    data: json_htmp,
                    tooltip: {
                        valueSuffix: '°F'
                    }
                }
            ],
            yaxiscustomized = [{
                min: 0,
                max: maxy,
                maxPadding: 0.12,
                title: {
                    text: yaxis,
                    style: {
                        color: '#333333',
                        fontSize: '12px',
                    },
                },                
                plotLines: [plot],
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

            }
            ,
            {
                // Secondary yAxis
                min: -53,
                max: maxtemp + 20,
                title: {
                    text: null//$('#lbltemp').text(),//Added by khushbu kansal for displaying text in spanish
                    //style: {
                    //    color: Highcharts.getOptions().colors[0]
                    //} //Changed by khushbu kansal for removing secondary axis
                },
                labels: {
                    enabled: false
                    //formatter: function () {
                    //    return this.value;
                    //}
                },
                opposite: true

            }
            ]
        }


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
            yAxis: yaxiscustomized,
            xAxis: {
                labels: {
                    rotation: -45,
                    style: {
                        color: '#444444',
                        fill: '#444444',  /* Energy efficiency */
                        margin: "-20px",
                        fontSize: '11px',
                        fontFamily: 'verdana'
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
                    pointRange: 0,
                    dataLabels: {
                        //crop: true,
                        useHTML: true,
                        stacking: 'normal',
                        align: 'middle',
                        rotation: 0,
                        // x: -4,
                        y: -15,
                        //inside: true,
                        enabled: true,
                       // format: (usageType == 'WU' && mode == 'M' && type=='D') ? "{y} K" : '',       //Added for water usage monthly values Bug # 17823                                                                         
                        formatter: function () {
                            if (this.point.Icon_url == null || this.point.Icon_url == "") {
                                if (this.y != 0) {
                                    return (showindecimal == true ? Highcharts.numberFormat(this.y, 2) : Highcharts.numberFormat(this.y, 0))
                                }
                            }
                            else {
                                return ('<div id="chrt"><img src=' + this.point.Icon_url + ' alt="" style="width:50%;height:50%"/><br>' + Highcharts.numberFormat(this.y, 2) + '</div>');
                            };
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
                                if (this.series.name != "Temperature") {//Added by khushbu kansal to disable drilldown on weather
                                    chartclick(this.name, this.y);
                                }
                            }
                        }
                    },
                    color: '#D3D3D3'
                }
            },
            tooltip: {
                useHTML: true,
                formatter: function () {
                   
                    if (this.point.High_fahrenheit == null || this.point.High_fahrenheit == undefined || this.point.High_fahrenheit == "") {
                      
                            return '<div><div>' + this.point.series.yAxis.axisTitle.textStr + ': </b>' + (showindecimal == true ? Highcharts.numberFormat(this.y, 2) : Highcharts.numberFormat(this.y, 0)) + '</div></div>';
                    }
                    else
                        return '<div><div>' + this.point.series.yAxis.axisTitle.textStr + ': </b>' + Highcharts.numberFormat(this.y, 2) + '</div>' + (this.point.High_fahrenheit == null ? "" : '<div>' + $('#lblMaxTemp').text() + ': ' + (this.point.High_fahrenheit)) + '</div>' + (this.point.Low_fahrenheit == '' ? "" : '<div>' + $('#lblMinTemp').text() + ': ' + (this.point.Low_fahrenheit)) + '</div>' + (this.point.Avehumidity == null ? "" : '<div>' + $('#lblAvgHumidity').text() + ': ' + (this.point.Avehumidity)) + '</div>' + (this.point.Icon == null ? '' : '<div>' + $('#lblWeather').text() + ': ' + getweatherinfo(this.point.Icon) + '</div>') + '</div>';
                }
            },
            series: xaxiscustomized

        });
    }
    catch (e) {
        console.log(e.message);
    }
}

function Bindheigh_usage(graph_type, id, value, showindecimal, usageType, mode, chartorentation, IsAMI, IsAMIStatus) {
    IsDecimal = showindecimal;
    if (showindecimal == undefined) {
        showindecimal = true;
    }
    try {
        var setdrilldownonAMI = IsAMI == "false" ? (mode == "S" ? true : false) : (IsAMIStatus == true && IsAMI == undefined ? (mode == "S" ? true : false) : true);
        var yaxiscustomized;//Used to Hide Temperature Axis when No Weather Data is there
        var xaxiscustomized;//Used to Hide Temperature Axis when No Weather Data is there
        var maxy = 0;
        var maxdemy = 0;
        var maxtemp = 0; var maxallocation = 0; var maxdemand = 0;
        var maxline;
        var maxdata = Math.max.apply(Math, processed_json.map(function (o) { return o.y; }));
        //water allocation changes by khushbu kansal on basis of max value
        if (json_htmp.length > 0) {
            maxtemp = Math.max.apply(Math, json_htmp.map(function (o) { return o.y; }))
        }
        if (processed_jsonAllocation.length > 0) {
            maxallocation = Math.max.apply(Math, processed_jsonAllocation.map(function (o) { return o.y; }));
        }

        if (processed_jsonOnDemand.length > 0) {
            maxdemand = Math.max.apply(Math, processed_jsonOnDemand.map(function (o) { return o.y; }));
        }

        if (usageType == 'PU' && (mode == 'D' || mode == 'MI'))
            maxy = maxdata;//(maxdemand > maxdata ? maxdemand : maxdata);
        else
            maxy = (maxallocation > maxdata ? maxallocation : maxdata);

        var plot = {};

        if (weatherOverlay == '0') {
            maxline = maxy * 0.9;
            if (usageType == "WU") {
                //plot = {
                //    value: maxline,
                //    color: '#31afdb',
                //    dashStyle: 'shortdash',
                //    width: 2,
                //    //label: {
                //    //    text: 'Water Allocation'
                //    //}
                //}
            }

            maxy = (maxy * 1.1);
            yaxiscustomized = [{
                min: 0,
                max: maxy,
                maxPadding: 0.12,
                title: {
                    text: yaxis,
                    style: {
                        color: '#333333',
                        fontSize: '12px',
                    },
                },
                // plotLines: [plot],
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
            }, { // Secondary yAxis
                title: {
                    text: '',  //'Max demand in kw',
                    style: {
                        color: '#333333',
                        fontSize: '12px',
                    }
                },
                labels: {
                    format: '{value} kw',
                    formatter: function () {
                        return this.value;
                    }
                },
                opposite: true
            }],
            xaxiscustomized = [{
                yAxis: 0,
                showInLegend: false,
                type: graph_type,
                name: xaxis,
                data: processed_json,
                dataLabels: {
                    rotation: chartorentation, //Changed by khushbu kansal for displaying text in vertical position
                },
                colorByPoint: (showcolors && (graph_type == 'column')),

            }, {
                showInLegend: false,
                dataLabels: {
                    enabled: false
                },
                data: processed_jsonAllocation,
                color: "#31afdb",
                dashStyle: 'shortdash',
            }
            , {
                yAxis: 1,
                showInLegend: false,
                dataLabels: {
                    enabled: false
                },
                type: 'line',
                data: processed_jsonOnDemand,
                color: "#31afdb",
                dashStyle: 'shortdash',
                opposite: true
            }]
        }
        else {
            maxline = maxy * 0.9;
            if (usageType == "WU") {
                plot = {
                    value: maxline,
                    color: '#31afdb',
                    dashStyle: 'shortdash',
                    width: 2,
                    //label: {
                    //    text: 'Water Allocation'
                    //}
                }
            }
            maxy = maxy + (maxy * 0.5),
            xaxiscustomized = [{
                yAxis: 0,
                showInLegend: false,
                type: graph_type,
                name: xaxis,
                data: processed_json,
                dataLabels: {
                    rotation: chartorentation

                },
                colorByPoint: (showcolors && (graph_type == 'column'))
            },
                {
                    yAxis: 1,
                    name: 'Temperature',
                    type: 'spline',
                    showInLegend: false,
                    data: json_htmp,
                    tooltip: {
                        valueSuffix: '°F'
                    }
                },
                {
                    showInLegend: false,
                    dataLabels: {
                        enabled: false
                    },
                    data: processed_jsonAllocation,
                    color: "#31afdb",
                    dashStyle: 'shortdash',
                }
            ],
            yaxiscustomized = [{
                min: 0,
                max: maxy,
                maxPadding: 0.12,
                title: {
                    text: yaxis,
                    style: {
                        color: '#333333',
                        fontSize: '12px',
                    },
                },
                // plotLines: [plot],
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

            }
            ,
            {
                // Secondary yAxis
                min: (IsDecimal?-53:-25),
                max: maxtemp + 20,
                title: {
                    text: null//$('#lbltemp').text(),//Added by khushbu kansal for displaying text in spanish
                    //style: {
                    //    color: Highcharts.getOptions().colors[0]
                    //} //Changed by khushbu kansal for removing secondary axis
                },
                labels: {
                    enabled: false
                    //formatter: function () {
                    //    return this.value;
                    //}
                },
                opposite: true

            }
            ]
        }


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
            yAxis: yaxiscustomized,
            xAxis: {
                labels: {
                    rotation: -45,
                    style: {
                        color: '#444444',
                        fill: '#444444',  /* Energy efficiency */
                        margin: "-10px",
                        fontSize: '11px',
                        fontFamily: 'verdana'
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
                    pointRange: 0,
                    dataLabels: {
                        //crop: true,
                        useHTML: true,
                        stacking: 'normal',
                        align: 'center',
                        rotation: 0,
                        // x: -4,
                        y:  (IsDecimal?-10:-20),
                        //inside: true,
                        enabled: true,
                        // format: (usageType == 'WU' && mode == 'M' && type == 'G') ? "{y} K" : '',       //Added for water usage monthly values Bug # 17823                                                                         
                        formatter: function () {
                            if (this.point.Icon_url == null || this.point.Icon_url == "") {
                                if (this.y != 0 && this.y != undefined) {
                                    return (changetoK(this.y)); //(showindecimal == true ? (Highcharts.numberFormat(this.y, 2) + (mode == 'G' ? " K" : "")) : Highcharts.numberFormat(this.y, 0))
                                }
                            }
                            else {
                                return ('<div id="chrt"><img src=' + this.point.Icon_url + ' alt="" /></div>');
                            };
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
                                if (this.series.name != "Temperature") {//Added by khushbu kansal to disable drilldown on weather
                                    if (setdrilldownonAMI == true) {
                                        if (mode != 'B') {
                                            chartclick(this);
                                        }
                                    }
                                }
                            }
                        }
                    },
                    color: '#D3D3D3'
                }
            },
            tooltip: {
                useHTML: true,
                formatter: function () {

                    if (this.point.High_fahrenheit == null || this.point.High_fahrenheit == undefined || this.point.High_fahrenheit == "") {
                        if (this.point.title == 'Allocation') {
                            return '<div><div><b>Units Allocated: </b>' + changetoK(this.y);
                        }
                        else if (this.point.title == 'Demand') {
                            return '<div><div><b>Max Demand:</b>' + changetoK(this.y) + ' kW';
                        }
                        else
                            return '<div><div><b>' + this.point.series.yAxis.axisTitle.textStr + ': </b>' + changetoK(this.y);//(showindecimal == true ? Highcharts.numberFormat(this.y, 2) : Highcharts.numberFormat(this.y, 0)) + '</div></div>';
                    }
                    else
                        return '<div><div><b>' + this.point.series.yAxis.axisTitle.textStr + ': </b>' + changetoK(this.y) + '</div>' + (this.point.High_fahrenheit == null ? "" : '<div><b>' + $('#lblMaxTemp').text() + ': </b>' + (this.point.High_fahrenheit)) + '</div>' + (this.point.Low_fahrenheit == '' ? "" : '<div><b>' + $('#lblMinTemp').text() + ': </b>' + (this.point.Low_fahrenheit)) + '</div>' + (this.point.Avehumidity == null ? "" : '<div><b>' + $('#lblAvgHumidity').text() + ': </b>' + (this.point.Avehumidity)) + '</div>' + (this.point.Icon == null ? '' : '<div><b>' + $('#lblWeather').text() + ': </b>' + getweatherinfo(this.point.Icon) + '</div>') + '</div>';
                }
            },
            series: xaxiscustomized

        });
    }
    catch (e) {
        console.log(e.message);
    }
}

function Bindheigh_Efficiency(type, id, value, showindecimal, usageType) {
    if (showindecimal == undefined) {
        showindecimal = true;
    }
    try {
        var yaxiscustomized;
        var xaxiscustomized;
        var maxy = processed_json[0].y;
        var maxtemp = 0;
        var maxline;
        for (var i = 0; i < processed_json.length; i++) {
            if (maxy < processed_json[i].y)
                maxy = processed_json[i].y;

        }
        if (json_htmp.length > 0) {
            maxtemp = json_htmp[0].y;
            for (var i = 0; i < json_htmp.length; i++) {
                if (maxtemp < json_htmp[i].y)
                    maxtemp = json_htmp[i].y;

            }
        }

        var plot = {};

        if (weatherOverlay == '0') {
            maxline = maxy * 0.9;
            if (usageType == "WU") {
                plot = {
                    value: maxline,
                    color: 'blue',
                    dashStyle: 'shortdash',
                    width: 2,
                    //label: {
                    //    text: 'Water Allocation'
                    //}
                }
            }

            maxy = maxy + (maxy * .2);
            yaxiscustomized = {
                min: 0,
                max: maxy,
                maxPadding: 0.12,
                title: {
                    text: yaxis,
                    style: {
                        color: '#333333',
                        fontSize: '12px',
                    },
                },
                plotLines: [plot],
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
            xaxiscustomized = [{
                yAxis: 0,
                showInLegend: false,
                type: type,
                name: xaxis,
                data: processed_json,
                //dataLabels: {
                //    rotation: -90 //Changed by khushbu kansal for displaying text in vertical position

                //},
                colorByPoint: (showcolors && (type == 'column')),

            }]
        }
        else {
            maxline = maxy * 0.9;
            if (usageType == "WU") {
                plot = {
                    value: maxline,
                    color: 'blue',
                    dashStyle: 'shortdash',
                    width: 2,
                    //label: {
                    //    text: 'Water Allocation'
                    //}
                }
            }
            maxy = maxy + (maxy * 0.5),
            xaxiscustomized = [{
                yAxis: 0,
                showInLegend: false,
                type: type,
                name: xaxis,
                data: processed_json,
                //dataLabels: {
                //    rotation: -90

                //},
                colorByPoint: (showcolors && (type == 'column'))
            },
                {
                    yAxis: 1,
                    name: 'Temperature',
                    type: 'spline',
                    showInLegend: false,
                    data: json_htmp,
                    tooltip: {
                        valueSuffix: '°F'
                    }
                }
            ],
            yaxiscustomized = [{
                min: 0,
                max: maxy,
                maxPadding: 0.12,
                title: {
                    text: yaxis,
                    style: {
                        color: '#333333',
                        fontSize: '12px',
                    },
                },
                plotLines: [plot],
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

            }
            ,
            {
                // Secondary yAxis
                min: -53,
                max: maxtemp + 20,
                title: {
                    text: null//$('#lbltemp').text(),//Added by khushbu kansal for displaying text in spanish
                    //style: {
                    //    color: Highcharts.getOptions().colors[0]
                    //} //Changed by khushbu kansal for removing secondary axis
                },
                labels: {
                    enabled: false
                    //formatter: function () {
                    //    return this.value;
                    //}
                },
                opposite: true

            }
            ]
        }


        $('#' + id).highcharts({
            chart: {
                type: 'bar'
            },
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
            yAxis: yaxiscustomized,
            xAxis: {
                labels: {
                    rotation: 0,
                    style: {
                        color: '#444444',
                        fill: '#444444',  /* Energy efficiency */
                        margin: "-20px",
                        fontSize: '11px',
                        fontFamily: 'verdana'
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
                    pointRange: 0,
                    dataLabels: {
                        //crop: true,
                        useHTML: true,
                        stacking: 'normal',
                        align: 'middle',
                        rotation: 0,
                        x: -5,
                        //y: -15,
                        //inside: true,
                        enabled: true,
                        formatter: function () {
                            if (this.point.Icon_url == null || this.point.Icon_url == "") {
                                if (this.y != 0) {
                                    return (showindecimal == true ? Highcharts.numberFormat(this.y, 2) : Highcharts.numberFormat(this.y, 0))
                                }
                            }
                            else {
                                return ('<div id="chrt"><img src=' + this.point.Icon_url + ' alt="" style="width:50%;height:50%"/><br>' + Highcharts.numberFormat(this.y, 2) + '</div>');
                            };
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
                                if (this.series.name != "Temperature") {//Added by khushbu kansal to disable drilldown on weather
                                    chartclick(this.name, this.y);
                                }
                            }
                        }
                    },
                    color: '#D3D3D3'
                }
            },
            tooltip: {
                useHTML: true,
                formatter: function () {

                    if (this.point.High_fahrenheit == null || this.point.High_fahrenheit == undefined || this.point.High_fahrenheit == "") {

                        return '<div><div>' + this.point.series.yAxis.axisTitle.textStr + ': </b>' + (showindecimal == true ? Highcharts.numberFormat(this.y, 2) : Highcharts.numberFormat(this.y, 0)) + '</div></div>';
                    }
                    else
                        return '<div><div>' + this.point.series.yAxis.axisTitle.textStr + ': </b>' + Highcharts.numberFormat(this.y, 2) + '</div>' + (this.point.High_fahrenheit == null ? "" : '<div>' + $('#lblMaxTemp').text() + ': ' + (this.point.High_fahrenheit)) + '</div>' + (this.point.Low_fahrenheit == '' ? "" : '<div>' + $('#lblMinTemp').text() + ': ' + (this.point.Low_fahrenheit)) + '</div>' + (this.point.Avehumidity == null ? "" : '<div>' + $('#lblAvgHumidity').text() + ': ' + (this.point.Avehumidity)) + '</div>' + (this.point.Icon == null ? '' : '<div>' + $('#lblWeather').text() + ': ' + getweatherinfo(this.point.Icon) + '</div>') + '</div>';
                }
            },
            series: xaxiscustomized

        });
    }
    catch (e) {
        console.log(e.message);
    }
}

function BindhighChart2SeriesNetUsage(type, id, series1name, series2name, chartorentation, IsAMI, IsAMIStatus, Isreverse) {
    var setdrilldownonAMI = IsAMI == "false" ? (mode == "S" ? true : false) : (IsAMIStatus == true && IsAMI == undefined ? (mode == "S" ? true : false) : true);
    var maxy = processed_json[0].y;
    var xaxiscustomized;
    var yaxiscustomized;
    var maxdata = Math.max.apply(Math, processed_json.map(function (o) { return o.y; }));
    

    maxy = maxdata;//(maxdemand > maxdata ? maxdemand : maxdata);
   
    if (weatherOverlay == '0') {

        xaxiscustomized = [{
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
        } 
        ];

        yaxiscustomized = [{
            //min: 0,
            maxPadding: 0.13,
            max: maxy * 1.1,
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
                    return Math.abs(this.value);
                }
            }
        }, { // Secondary yAxis
            //min: 0,
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            },
            opposite: true
        }];
    }
    else {
        maxy = maxy + (maxy * 2),
        xaxiscustomized = [{
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
        }];

        yaxiscustomized = [{
            //min: 0,
            maxPadding: 0.13,
            max: maxy,
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
                    return Math.abs(this.value);
                }
            }
        }, { // Secondary yAxis
            min: -55,
            title: {
                text: '',//$('#lbltemp').text(),//'Temperature',//Added by khushbu kansal for displaying text in spanish
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            },
            opposite: true
        }];
    }
    $('#' + id).highcharts({      
        title: {
            text: title
            ,
            style: {
                color: '#F00',
                font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
            }
        }
   ,
        yAxis: yaxiscustomized,
        xAxis: xaxiscustomized,

        tooltip: {
            useHTML: true,
            formatter: function () {
                if (this.point.title == 'Demand') {
                    return '<div><div><b>Max Demand:</b>' + changetoK(this.y) + ' kW';
                }
                if (this.point.Maxhumidity == undefined || this.point.Maxhumidity == "") {
                    return '<div><div><b>' + this.series.name + ': </b>' + changetoK(this.y) + '</div></div>';
                }
                else
                    return '<div><div><b>' + this.point.series.yAxis.axisTitle.textStr + ': </b>' + changetoK(this.y) + '</div>' + (this.point.High_fahrenheit == null ? "" : '<div><b>' + $('#lblMaxTemp').text() + ': </b>' + (this.point.High_fahrenheit)) + '</div>' + (this.point.Low_fahrenheit == '' ? "" : '<div><b>' + $('#lblMinTemp').text() + ': </b>' + (this.point.Low_fahrenheit)) + '</div>' + (this.point.Avehumidity == null ? "" : '<div><b>' + $('#lblAvgHumidity').text() + ': </b>' + (this.point.Avehumidity)) + '</div>' + (this.point.Icon == null ? '' : '<div><b>' + $('#lblWeather').text() + ': </b>' + getweatherinfo(this.point.Icon) + '</div>') + '</div>';

                 }
        },
        plotOptions: {
            series: {
                pointWidth: 18,
                dataLabels: {
                    enabled: false,
                    useHTML: true,
                    stacking: 'normal',
                    align: 'center',
                    rotation: 90,
                    x: 4,
                    y: 0,//Added by khushbu kansal increase distance between chart and data label
                    // align: 'top',
                    enabled: true,
                    rotation: 0,
                   // format: "{y}",
                    formatter: function () {
                        //if (this.point.Icon_url == undefined || this.point.Icon_url == "")
                        //    return Highcharts.numberFormat(Math.abs(this.y), 2);
                        //else
                        if (this.point.Icon_url == null || this.point.Icon_url == "") {
                            if (this.y != 0)
                                return (changetoK(this.y)); //Highcharts.numberFormat(Math.abs(this.y, 2));
                        }
                        else {
                            return ('<div id="chrt"><img src="' + this.point.Icon_url + '" alt=""/></div>');
                        }
                        //return ((this.point.Icon_url == null || this.point.Icon_url == "") ? Highcharts.numberFormat(this.y, 2) : ('<div id="chrt"><img src="' + this.point.Icon_url + '" alt="" style="width:70%;height:70%"/><br>' + Highcharts.numberFormat(this.y, 2) + '</div>'));
                    }
                },
                point: {
                    cursor: 'pointer',
                    events: {
                        click: function () {
                            if (this.series.name != "Temperature") {//Added by khushbu kansal to disable drilldown on weather
                                if (setdrilldownonAMI == true) { chartclick(this); };
                            }
                        }
                    }
                }
            }
        },
        series: [{
            type: type,
            name: series1name,
            data: processed_json,
            showInLegend: false,
            dataLabels: {
                rotation: chartorentation,
                y: (IsDecimal ? -22 : (Isreverse ? -15 : -12)),//Changed by khushbu kansal for displaying text in vertical position
            }
            //dataLabels: {
            //    rotation: 0

            //}

        }, {
            type: type,
            color: 'black',
            name: series2name,
            data: processed_json2,
            showInLegend: false,
            dataLabels: {
                rotation: chartorentation,
                y: (IsDecimal ? (Isreverse ? -22 : -32) : (Isreverse ? -15 : -32)),//Changed by khushbu kansal for displaying text in vertical position
            }
        },
        {
            yAxis: 1,
            name: 'Temperature',
            type: 'spline',
            color: '#D3D3D3',
            showInLegend: false,
            data: json_htmp,
            tooltip:
                {
                    valueSuffix: '°F'
                }
        },
         {
             yAxis: 1,
             showInLegend: false,
             dataLabels: {
                 enabled: false
             },
             type: 'line',
             data: processed_jsonOnDemand,
             color: "#31afdb",
             dashStyle: 'shortdash',
             opposite: true
         }
        ]
    });
}

function BindhighChart2Series(type, id, series1name, series2name) {

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
            min: 0,
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

function BindhighChart2SeriesLine(type, id, series1color, series2color, series1name, series2name, usagetype, month, isdecimal) {
    var maxy1 = Math.max.apply(Math, processed_json.map(function (o) { return o.y; }));
    if (maxy1 == "-Infinity") {
        var maxy = 0;
    }
    else {
        maxy = maxy1;
    }
    var maxy2 = 0;
    if (processed_json2.length > 0) {
        maxy2 = processed_json2[0].y;
        for (var i = 0; i < processed_json2.length; i++) {
            if (maxy2 < processed_json2[i].y)
                maxy2 = processed_json2[i].y;

        }
    }
    if (maxy < maxy2) {
        maxy = maxy2;
    }

    var plot;
    maxy = maxy * 0.9;
   
    $('#' + id).highcharts({
        title: {
            text: title
            ,
            style: {
                color: '#F00',
                font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
            }
        }

   ,
        yAxis: {
            min: 0,
            title: {
                text: yaxis,
                style: {
                    color: '#333333',
                    fontSize: '12px',
                }
            },
          //  plotLines: [plot],
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
            plotLines: [{
                color: '#EFEFF4',
                width: 10,
                value: month
            }],
            labels: {
                rotation: -25,
                style: {
                    color: '#333333',
                    margin: "-20px",
                    fontSize: '11px',
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
                return '<b>' + this.key + ' ' + this.point.year + ': </b>' + changetoK(this.y, isdecimal);
              }
        },
        plotOptions: {
            series: {
                pointWidth: 18               
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
            dashStyle: 'shortdash',
            name: series2name,
            data: processed_jsonAllocation,
            showInLegend: false,
            color: "#31afdb"
        }
        ]
    });
}

function BindhighChart2SeriesLine_energyReport(type, id, series1color, series2color, series1name, series2name, usagetype, month) {
    var maxy = processed_json[0].y;
    for (var i = 0; i < processed_json.length; i++) {
        if (maxy < processed_json[i].y)
            maxy = processed_json[i].y;

    }
    var maxy2 = processed_json2[0].y;
    for (var i = 0; i < processed_json2.length; i++) {
        if (maxy2 < processed_json2[i].y)
            maxy2 = processed_json2[i].y;

    }
    if (maxy < maxy2) {
        maxy = maxy2;
    }

    var plot;
    maxy = maxy * 0.9;
    //if (usagetype == "CsW") {
    //    plot = [{
    //        data: processed_jsonAllocation           
    //    }]
    //}
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
            min: 0,
            title: {
                text: yaxis,
                style: {
                    color: '#333333',
                    fontSize: '10px',
                },
                y:14.140625
            },
            //  plotLines: [plot],
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
            plotLines: [{
                color: '#EFEFF4',
                width: 10,
                value: month
            }],
            labels: {
                rotation: -25,
                style: {
                    color: '#333333',
                    margin: "-20px",
                    fontSize: '11px',
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
                return '<b>' + this.key + ' ' + this.point.year + ': </b>' + changetoK(this.y, 2);
            }
        },
        plotOptions: {
            series: {
                pointWidth: 18
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
            dashStyle: 'shortdash',
            name: series2name,
            data: processed_jsonAllocation,
            showInLegend: false,
            color: "#31afdb"
        }
        ]
    });
}

function BindhighChart2SeriesLine_waterReport(type, id, series1color, series2color, series1name, series2name, usagetype, month) {
    var maxy = processed_json[0].y;
    for (var i = 0; i < processed_json.length; i++) {
        if (maxy < processed_json[i].y)
            maxy = processed_json[i].y;

    }
    var maxy2 = processed_json2[0].y;
    for (var i = 0; i < processed_json2.length; i++) {
        if (maxy2 < processed_json2[i].y)
            maxy2 = processed_json2[i].y;

    }
    if (maxy < maxy2) {
        maxy = maxy2;
    }

    var plot = {};
    maxy = maxy * 0.9;
    if (usagetype == "CsW") {
        plot = {
            value: maxy,
            color: '#31afdb',
            dashStyle: 'shortdash',
            width: 2,          
        }
    }
   
    $('#' + id).highcharts({       
        title: {
            text: title
            ,
            style: {
                color: '#F00',
                font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
            }           
        }

   ,
        yAxis: {           
            title: {
                text: yaxis,
                style: {
                    color: '#333333',
                    fontSize: '10px',
                }
            },
            plotLines: [plot],
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
            plotLines: [{
                color: '#EFEFF4',
                width: 10,
                value: month
            }],
            labels: {
                rotation: -25,
                style: {
                    color: '#333333',
                    margin: "-20px",
                    fontSize: '11px',
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
                return '<b>' + this.key + ' ' + this.point.year + ': </b>' + Highcharts.numberFormat(this.y, 2);               
            }
        },
        plotOptions: {
            series: {
                pointWidth: 18              
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

function BindhighChart2Seriesother(type1, type2, id, series1color, series2color, series1name, series2name) {

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
            min: 0,
            title: {
                text: series1name,
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

                //return '<b>' + this.key + ' : </b>' + Highcharts.numberFormat(this.y, 2);
                return '<b>' + this.key + ': </b>' + this.y;
            }
        },
        plotOptions: {
            series: {
                //pointWidth: 18,
                dataLabels: {
                    crop: true,
                    stacking: 'normal',
                    align: 'top',
                    rotation: -90,
                    x: 4,
                    enabled: true,
                    formatter: function () {
                        if (this.y === 0) {
                            return null;
                        }
                        return this.y;
                    },
                    style: {
                        color: 'black'
                    }

                }
            }
        },
        series: [{
            type: type1,
            name: series1name,
            data: processed_jsonrate1,
            showInLegend: false
            //color: series1color

        }
        //,
        //    {
        //    type: type2,
        //    name: series2name,
        //    data: processed_jsonrate2,
        //    showInLegend: false,
        //    color: series2color
        //}
        ]
    });
}

function BindhighChart3Series(type, id, series1name, series2name, series3name) {

    $('#' + id).highcharts({
        //chart: { zoomType: 'xy' },
        credits: {
            enabled: false
        },
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
            min: 0,
            maxPadding: 0.09,//bug# 5902
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
                    rotation: -90,
                    x: 4,
                    //inside: true,
                    enabled: true,
                    formatter: function () {
                        if (this.y === 0) {
                            return null;
                        }
                        //return this.y;
                        return Highcharts.numberFormat(this.y, 2);
                    },
                    style: {
                        color: '#333333'
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

function BindhighChart4SeriesLine(type, id, series1color, series2color, series3color, series4color, series1name, series2name, series3name, series4name, usagetype, month) {
    var maxy = Math.max.apply(Math, processed_json.map(function (o) { return o.y; }));
    //for (var i = 0; i < processed_json.length; i++) {
    //    if (maxy < processed_json[i].y)
    //        maxy = processed_json[i].y;

    //}
    for (var i = 0; i < processed_json2.length; i++) {
        if (maxy < processed_json2[i].y)
            maxy = processed_json2[i].y;

    }
    for (var i = 0; i < processed_json3.length; i++) {
        if (maxy < processed_json3[i].y)
            maxy = processed_json3[i].y;

    }
    for (var i = 0; i < processed_json4.length; i++) {
        if (maxy < processed_json4[i].y)
            maxy = processed_json4[i].y;

    }

   // var plot = {};
    maxy = maxy * 0.9;
    //if (usagetype == "CsW") {
    //    plot = {
    //        dashStyle: 'shortdash',
    //        color: "blue",
    //        data: processed_jsonAllocation
    //        //label: {
    //        //    text: 'Water Allocation'
    //        //}
    //    }
    //}
    var plot1 = {
        value: 50,
        color: 'green',
        dashStyle: 'shortdash',
        width: 2,       
    };
   
    $('#' + id).highcharts({       
        credits: {
            enabled: false
        },
        title: {
            text: title
            ,
            style: {
                color: '#F00',
                font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
            }//,
         
        }

   ,
        yAxis: {
            min: 0,
            title: {
                text: yaxis,
                style: {
                    color: '#333333',
                    fontSize: '11px',
                }
            },
           // plotLines: [plot],
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
            plotLines: [{
                color: '#EFEFF4',
                width: 10,
                value: month
            }],
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
                return '<b>' + this.key + ' ' + this.point.year + ': </b>' + changetoK(this.y, 2);
                   }
        },
        plotLines: [plot1],
        plotOptions: {
            series: {
                pointWidth: 18
               
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
        },
        {
            dashStyle: 'shortdash',
            name: series2name,
            data: processed_jsonAllocation,
            showInLegend: false,
            color: "#31afdb"
        }
        ]
    });
}

function BindPieChart(id, axisname) {
    $('#' + id).highcharts({
        credits: {
            enabled: false
        },
        chart: {
            type: 'pie',

        },

        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b> ({point.y:,.0f})',
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                    softConnector: true
                }
            }
        },
        tooltip: {

            formatter: function () {
                if (this.point.title != undefined) {
                    return '<b>' + this.point.title + ': </b>' + Math.abs(this.y);
                    //return '<b>' + this.point.title + ' : </b>' + Highcharts.numberFormat(this.y, 2);
                }
                else {
                    // return '<b>' + this.point.series.name + ' : </b>' + Math.abs(this.y);
                    return '<b>' + this.point.series.name + ': </b>' + Highcharts.numberFormat(this.y, 2);
                }
                //
            }
        },
        legend: {
            enabled: true
        },
        title: {
            text: ''
        },


        series: [{

            name: axisname,
            data: processed_json
        }]
    });

}

function BindPieChart2(id, axisname) {
    $('#' + id).highcharts({
        credits: {
            enabled: false
        },
        chart: {
            type: 'pie',

        },

        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b> ({point.y:,.0f})',
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                    softConnector: true
                }
            }
        },
        tooltip: {

            formatter: function () {
                if (this.point.title != undefined) {
                    return '<b>' + this.point.title + ': </b>' + Math.abs(this.y);
                    //return '<b>' + this.point.title + ' : </b>' + Highcharts.numberFormat(this.y, 2);
                }
                else {
                    // return '<b>' + this.point.series.name + ' : </b>' + Math.abs(this.y);
                    return '<b>' + this.point.name + ': </b>' + Highcharts.numberFormat(this.y, 2);
                }
                //
            }
        },
        legend: {
            enabled: true
        },
        title: {
            text: ''
        },


        series: [{

            name: axisname,
            data: processed_json
        }]
    });

}

function BindhighChart4RateAnalysis(type, id, series1color, series2color, series1name, series2name) {
    var maxy = Math.max.apply(Math, processed_json.map(function (o) { return o.y; }));
    
    for (var i = 0; i < processed_json2.length; i++) {
        if (maxy < processed_json2[i].y)
            maxy = processed_json2[i].y;

    }

    maxy = maxy * 0.9;

    //$("#" + id).empty();
    //$("#" + id).removeAttr();
    //$('#' + id).css('width', '' + (parseFloat(ss) * .9) + 'px');

    //$('#' + id).highcharts().redraw();
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
        yAxis: {
            min: 0,
            title: {
                text: yaxis,
                style: {
                    color: '#333333',
                    fontSize: '11px',
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
                return '<b>' + this.key + ' ' + this.point.year + ': </b>' + changetoK(this.y, 2);
            }
        },
        //plotOptions: {
        //    series: {
        //        pointWidth: 18

        //    }
        //},
        series: [{
            type: type,
            name: series1name,
            data: processed_json,
            showInLegend: true,
            color: series1color

        }, {
            type: type,
            name: series2name,
            data: processed_json2,
            showInLegend: true,
            color: series2color
        }]
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

function getMonthValue(monthname) {
    var month1 = monthname;
    month1 = month1.toLowerCase();
    var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    month1 = months.indexOf(month1);
    return month1 + 1;
}
function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

//this function is used to add k when value is greater than 9999, Logic changes as suggested by Harmann on Duke
//function changetoK(value) {
//    if (value > 9999) {
//        value = value / 1000;
//        if (IsDecimal)
//            return value.toFixed(2) + "K";
//        else
//            return RoundOff(value);
//    } else {
//        if ( IsDecimal || (value < 1))
//            return value.toFixed(2);
//        else  return RoundOff(value);
           
        
//    }
//}
function changetoK(value) 
{
    if (value.toString() == "" || value.toString() == undefined || value.toString() == "null" || value.toString() == "NaN" || value.toString() == "0") return "N/A";
    if (value > 1000) 
    {
        value = value / 1000;
        //var arr = value.toString().split(".")
        return value.toFixed(2) + "K";
    }
    else 
    { 
        return value.toFixed(2); 
    }
}

function RoundOff(value)
{
    var decimalval = value.toFixed(2);
    var num_arr = decimalval.split('.');
    var newval = num_arr[0];
    if (num_arr[1] > 50)
        return (parseInt(newval) + 1);
    else
        return newval;
    
}