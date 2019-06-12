var json = [];
var gaugeOptions;
var dashGaugeData = new Array();
//var color = '#55BF3B';

//$(function () {

function initGaugeOptions(color1, color2, color3, id) {
    var gaugeOptions = {

        chart: {
            type: 'solidgauge',
            backgroundColor: 'transparent'
        },

        title: null,

        pane: {
            center: ['50%','55%'],
            size: '100%',
            startAngle: -90,
            endAngle: 90,
            background: {
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        tooltip: {
            enabled: false
        },

        // the value axis
        yAxis: {
            stops: [
              [0.1, color1], // green
            [0.5, color2], // yellow
            [0.9, color3]// red
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
            title: {
                y: -50,
                x: -45
            },
            labels: {
                y: 0
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: -25,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };
    $('#' + id).highcharts(Highcharts.merge(gaugeOptions, {

        yAxis: {
            min: 0,
           max: 200,
            title: {
                text: id.toUpperCase(),
                style: {
                    //color: '#F00',
                    font: 'bold 18px "Trebuchet MS", Verdana, sans-serif'
                }
            }
        },
        credits: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },
        series: [{
            name: 'Speed',
            data: [dashGaugeData[id]],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:black">{y}</span><br/></div>'
            },
        }]
    }));
}






function drawGauge(id) {

    // The speed gauge




    //setInterval(function () {
    //    // Speed
    //    var chart = $('#'+id).highcharts();
    //    if (chart) {
    //        var point = chart.series[0].points[0],
    //            newVal,
    //            inc = Math.round((Math.random() - 0.5) * 1000);


    //        newVal = point.y + inc;
    //        if (newVal < 0 || newVal > 6000) {
    //            newVal = point.y - inc;
    //        }

    //        point.update(newVal);
    //    }

    //    //// RPM
    //    //chart = $('#container-rpm').highcharts();
    //    //if (chart) {
    //    //    var point = chart.series[0].points[0],
    //    //        newVal,
    //    //        inc = Math.random() - 0.5;

    //    //    newVal = point.y + inc;
    //    //    if (newVal < 0 || newVal > 5) {
    //    //        newVal = point.y - inc;
    //    //    }

    //    //    point.update(newVal);
    //    //}
    //}, 1000);


}









//});