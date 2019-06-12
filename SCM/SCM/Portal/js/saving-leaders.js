

var rootdata;
var arrMonth;
var arrZipcode;
var arrUtility;
var lowRange;
var highRange;
google.load("visualization", "1", { packages: ["corechart"] });

$(document).ready(function () {

    rootdata = saving_leader.getSavingleaders().value;
    loadRange();
    arrayConstruct();
    DrawChart(arrMonth);


    $('#divmonthavg').html(rootdata.Tables[1].Rows[0].MonthYear);
    $('#divmonthavg').click(function () {
        DrawChart(arrMonth);
    });
    $('#divzipcodeavg').click(function () {
        DrawChart(arrZipcode);
    });
    $('#divutilityavg').click(function () {
        DrawChart(arrUtility);
    });
});

function arrayConstruct() {
    arrMonth = new Array();
    arrMonth[0] = new Array(3);
    arrMonth[0][0] = "DateOfReading";
    arrMonth[0][1] = "TotalUnits";
    arrMonth[0][2] = "MonthAverage";

    arrZipcode = new Array();
    arrZipcode[0] = new Array(3);
    arrZipcode[0][0] = "DateOfReading";
    arrZipcode[0][1] = "TotalUnits";
    arrZipcode[0][2] = "ZipCodeAverage";

    arrUtility = new Array();
    arrUtility[0] = new Array(3);
    arrUtility[0][0] = "DateOfReading";
    arrUtility[0][1] = "TotalUnits";
    arrUtility[0][2] = "UtilityAverage";


    var table1 = rootdata.Tables[0];
    var table2 = rootdata.Tables[1];
    var monthavg = table2.Rows[0].MonthAverage;
    var zipcodeavg = table2.Rows[0].ZipCodeAverage;
    var utilityavg = table2.Rows[0].UtilityAverage;



    for (var i = 0; i < table1.Rows.length; i++) {
        arrMonth[i + 1] = new Array();
        arrMonth[i + 1][0] = table1.Rows[i]["DateOfReading"];
        arrMonth[i + 1][1] = table1.Rows[i]["TotalUnits"];
        arrMonth[i + 1][2] = monthavg;

        arrZipcode[i + 1] = new Array();
        arrZipcode[i + 1][0] = table1.Rows[i]["DateOfReading"];
        arrZipcode[i + 1][1] = table1.Rows[i]["TotalUnits"];
        arrZipcode[i + 1][2] = zipcodeavg;

        arrUtility[i + 1] = new Array();
        arrUtility[i + 1][0] = table1.Rows[i]["DateOfReading"];
        arrUtility[i + 1][1] = table1.Rows[i]["TotalUnits"];
        arrUtility[i + 1][2] = utilityavg;
    }
}


function DrawChart(arrObj) {
    var data = google.visualization.arrayToDataTable(arrObj);
    var options = {
        title: 'Period:',
        colors: ['#1d7000', '#f7a913', '#b30013'],
        isStacked: false,
        vAxis: { title: "Units Consumed" },
        seriesType: "bars",
        series: { 1: { type: "line"} },
        legend: { position: 'none' }
    };

    var view = new google.visualization.DataView(data);


//    view.setColumns([0, {
//        type: 'number',
//        label: 'Value',
//        calc: function (dt, row) {
//            return (dt.getValue(row, 1) < lowRange) ? dt.getValue(row, 1) : null;
//        }
//    }, {
//        type: 'number',
//        label: 'Value',
//        calc: function (dt, row) {
//            return (dt.getValue(row, 1) >= lowRange && dt.getValue(row, 1) < highRange) ? dt.getValue(row, 1) : null;
//        }
//    }, {
//        type: 'number',
//        label: 'Value',
//        calc: function (dt, row) {
//            return (dt.getValue(row, 1) >= highRange) ? dt.getValue(row, 1) : null;
//        }
//    }]);

    var chart = new google.visualization.ComboChart(document.getElementById('chart'));
    chart.draw(data, options);
}

function loadRange() {
    range = comUsage.LoadRange().value;
    for (var r = 0; r < range.Rows.length; r++) {
        if (range.Rows[r]["UsageType"] == "E" && range.Rows[r]["Type"] == "K" && range.Rows[r]["RangeMode"] == "D") {
            lowRange = range.Rows[r]["LowRange"];
            highRange = range.Rows[r]["HighRange"];
            break;
        }
    }

}