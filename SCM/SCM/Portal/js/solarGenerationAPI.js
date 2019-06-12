google.load('visualization', '1', { 'packages': ['corechart'] });

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(drawChart);
var data;
function drawChart() {
    $.ajax({
        type: "GET",
        url: "Data.aspx",
        dataType: "json",
        async: true,
        success: function (data) {
            var dataArray = new Array();
            dataArray[0] = new Array();
            dataArray[0][0] = "Month";
            dataArray[0][1] = "Value";

            for (var i = 1; i <= 12; i++) {
                dataArray[i] = new Array();
            }
            dataArray[1][0] = "January";
            dataArray[1][1] = data.outputs.avg_dni.monthly.jan;
            dataArray[2][0] = "February";
            dataArray[2][1] = data.outputs.avg_dni.monthly.feb;
            dataArray[3][0] = "March";
            dataArray[3][1] = data.outputs.avg_dni.monthly.mar;
            dataArray[4][0] = "April";
            dataArray[4][1] = data.outputs.avg_dni.monthly.apr;
            dataArray[5][0] = "May";
            dataArray[5][1] = data.outputs.avg_dni.monthly.may;
            dataArray[6][0] = "June";
            dataArray[6][1] = data.outputs.avg_dni.monthly.jun;
            dataArray[7][0] = "July";
            dataArray[7][1] = data.outputs.avg_dni.monthly.jul;
            dataArray[8][0] = "August";
            dataArray[8][1] = data.outputs.avg_dni.monthly.aug;
            dataArray[9][0] = "September";
            dataArray[9][1] = data.outputs.avg_dni.monthly.sep;
            dataArray[10][0] = "October";
            dataArray[10][1] = data.outputs.avg_dni.monthly.oct;
            dataArray[11][0] = "November";
            dataArray[11][1] = data.outputs.avg_dni.monthly.nov;
            dataArray[12][0] = "December";
            dataArray[12][1] = data.outputs.avg_dni.monthly.dec;




            var data1 = google.visualization.arrayToDataTable(dataArray);



            //var chartDiv = $('chart_div')[0];
            var options = {
                title: 'Monthly Generation',
                titleTextStyle: { color: '#666' },
                is3D: true,
                pieSliceTextStyle: { 'fontSize': 8 },
                pieSliceText: 'none'


            };




            // Instantiate and draw our chart, passing in some options.

            var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));

            chart.draw(data1, options);
        }

    });
}


// new

//google.load('visualization', '1', { 'packages': ['corechart'] });
//// Set a callback to run when the Google Visualization API is loaded.
//google.setOnLoadCallback(drawChart);
//var data;
//function drawChart() {
//    $.ajax({
//        type: "GET",
//        url: "Data.aspx",
//        dataType: "json",
//        async: true,
//        success: function (data) {

//            var dataArray = new Array();
//            dataArray[0] = new Array();
//            dataArray[0][0] = "Month";
//            dataArray[0][1] = "Value";

//            for (var i = 1; i <= 12; i++) {
//                dataArray[i] = new Array();
//            }
//            dataArray[1][0] = "Jan";
//            dataArray[1][1] = data.outputs.avg_dni.monthly.jan;
//            dataArray[2][0] = "Feb";
//            dataArray[2][1] = data.outputs.avg_dni.monthly.feb;
//            dataArray[3][0] = "Mar";
//            dataArray[3][1] = data.outputs.avg_dni.monthly.mar;
//            dataArray[4][0] = "Apr";
//            dataArray[4][1] = data.outputs.avg_dni.monthly.apr;
//            dataArray[5][0] = "May";
//            dataArray[5][1] = data.outputs.avg_dni.monthly.may;
//            dataArray[6][0] = "Jun";
//            dataArray[6][1] = data.outputs.avg_dni.monthly.jun;
//            dataArray[7][0] = "Jul";
//            dataArray[7][1] = data.outputs.avg_dni.monthly.jul;
//            dataArray[8][0] = "Aug";
//            dataArray[8][1] = data.outputs.avg_dni.monthly.aug;
//            dataArray[9][0] = "Sep";
//            dataArray[9][1] = data.outputs.avg_dni.monthly.sep;
//            dataArray[10][0] = "Oct";
//            dataArray[10][1] = data.outputs.avg_dni.monthly.oct;
//            dataArray[11][0] = "Nov";
//            dataArray[11][1] = data.outputs.avg_dni.monthly.nov;
//            dataArray[12][0] = "Dec";
//            dataArray[12][1] = data.outputs.avg_dni.monthly.dec;
//            var data1 = google.visualization.arrayToDataTable(dataArray);
//            var options = {
//                title: 'Solar Generation Year 2012',
//                titleTextStyle: { color: '#666' },
//                is3D: true,
//                pieSliceTextStyle: { 'fontSize': 8 },
//                vAxis: { title: 'Unit Generated(In kWh)', titleTextStyle: { color: '#666', italic: false }, minValue: 0 },
//                hAxis: { textStyle: { fontSize: 11 }, showTextEvery: 1, slantedText: true, slantedTextAngle: 50 }



//            };
//            var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
//            chart.draw(data1, options);
//        }
//    });
//}