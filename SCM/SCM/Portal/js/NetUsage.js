

var KH;  //kWh+Hourly
var KD; //kWh+Daily
var KM; //kWh+Monthly
var DH; //$$$+Hourly
var DD; //$$$+Daily
var DM; //$$$+Monthly

var type;
var mode;
var lowRange;
var highRange;

google.load("visualization", "1", { packages: ["corechart"] });

$(document).ready(function () {
    KH = comUsage.LoadNetUsage('K', 'H').value;  //kWh+Hourly
    KD = comUsage.LoadNetUsage('K', 'D').value; //kWh+Daily
    KM = comUsage.LoadNetUsage('K', 'M').value; //kWh+Monthly
    DH = comUsage.LoadNetUsage('D', 'H').value; //$$$+Hourly
    DD = comUsage.LoadNetUsage('D', 'D').value; //$$$+Daily
    DM = comUsage.LoadNetUsage('D', 'M').value; //$$$+Monthly

    $('#usageMapMode a').click(function () {
        mode = $(this).attr('mode');
        loadNetChart();
        $(this).parent().find('img').each(function () {
            this.src = this.src.replace('_ro.png', '.png');
        });
        this.src = this.src.replace('.png', '_ro.png');

    });
    $('.usageMapType a').click(function () {
        type = $(this).attr('type');
        loadNetChart();
        $(this).parent().find('img').each(function () {
            this.src = this.src.replace('_ro.png', '.png');
        });
        this.src = this.src.replace('.png', '_ro.png');

    });
    type = "K";
    mode = "D";
    loadNetChart();
});


function loadNetChart() {

    loadRange();
    var key = type + mode;
    $('#hdnType').val(type);
    switch (key) {
        case 'KH': drawChart(KH); break;
        case 'KD': drawChart(KD); break;
        case 'KM': drawChart(KM); break;
        case 'DH': drawChart(DH); break;
        case 'DD': drawChart(DD); break;
        case 'DM': drawChart(DM); break;
        default: drawChart(KD);
    }
}
function drawChart(usageData) {

    var hAxisCol = '';
    var vAxisCol = '';
    var vAxisCol1 = '';
    var hAxTitle = '';
    //var vAxTitle = type == "K" ? 'kWh' : '$$$';
    var mainTitle = '';

    var rowCount = usageData.Rows.length;

    processed_json = new Array();
    loadRange(Type, Mode, "E");
    switch (Mode) {
        case "H":
            hAxisCol = "Hourly";
            vAxisCol = "Usage";
            vAxisCol1 = "Generation";
            $.map(usageData.Rows, function (obj, i) {
                processed_json.push({
                    name: formatAMPM(obj.Hourly),
                    y: obj.Unit,
                    color: setcolor(obj.Unit)
                });
            });
            break;

        case "D":
            hAxisCol = "DateOfReading";
            vAxisCol = "Usage";
            vAxisCol1 = "Generation";
            $.map(usageData.Rows, function (obj, i) {
                processed_json.push({
                    name: obj.UsageDate,
                    y: obj.TotalValue,
                    color: setcolor(obj.TotalValue)
                });
            });
            //mainTitle = 'Period: ' + usageData.Rows[0]["UsageDate"] + ' to ' + usageData.Rows[usageData.Rows.length - 1]["UsageDate"];
            break;

        case "M":
                    hAxisCol = "Month";
                    vAxisCol = "Usage";
                    vAxisCol1 = "Generation";
            //$.map(usageData.Rows, function (obj, i) {

            //    processed_json.push([getMonthName(obj.Month), (obj.TotalValue), setcolor(obj.TotalValue)]);
            //});
            $.map(usageData.Rows, function (obj, i) {
                processed_json.push({
                    name: getMonthName(obj.Month),
                    y: obj.TotalValue,
                    color: setcolor(obj.TotalValue)
                });
            });
            //mainTitle = 'Period: ' + getMonthName(usageData.Rows[0]["Month"]) + ' ' + usageData.Rows[0]["Year"] + ' to ' + getMonthName(usageData.Rows[usageData.Rows.length - 1]["Month"]) + ' ' + usageData.Rows[usageData.Rows.length - 1]["Year"];
            break;
    }

    function setcolor(usagevalue) {
        var color = '#FFFFFF';
        if (usagevalue <= lowRange) {
            color = '#1d7000';
        }
        else if (usagevalue > lowRange && usagevalue <= highRange) {
            color = '#f7a913';
        }
        else if (usagevalue > highRange) {
            color = '#b30013';
        }
        else {
            color = '#0000FF';

        }
        return color;

    }

    var chartDiv = $('#chart')[0];

    var cWidth = $('#chart').css('width').replace('px', '');
    var cHeight = $('#chart').css('height').replace('px', '');

    if (cHeight == "0px")
    { cHeight = 150; }


    $('#hdnTitle').val(mainTitle);

    populateChart('column', 'chartGeneration');

    //switch (mode) {
    //    case "H":
    //        hAxisCol = "Hourly";
    //        vAxisCol = "Usage";
    //        vAxisCol1 = "Generation";
    //        //hAxTitle = 'Hourly';
    //        //mainTitle = ' Usage for ' + usageData.Rows[0]["DateOfReading"];
    //        break;

    //    case "D":
    //        hAxisCol = "DateOfReading";
    //        vAxisCol = "Usage";
    //        vAxisCol1 = "Generation";
    //        //hAxTitle = 'Daily';
    //        //mainTitle = ' Usage from ' + usageData.Rows[0]["DateOfReading"] + ' to ' + usageData.Rows[rowCount - 1]["DateOfReading"];
    //        break;

    //    case "M":
    //        hAxisCol = "Month";
    //        vAxisCol = "Usage";
    //        vAxisCol1 = "Generation";
    //        //hAxTitle = 'Monthly';
    //        //mainTitle = ' Usage from ' + getMonthName(usageData.Rows[0]["Month"]) + '-' + usageData.Rows[0]["Year"] + ' to ' + getMonthName(usageData.Rows[rowCount - 1]["Month"]) + '-' + usageData.Rows[rowCount - 1]["Year"];
    //        break;
    //}

    //var usageDataArray = new Array();
    //usageDataArray[0] = new Array();
    //usageDataArray[0][0] = hAxisCol;
    //usageDataArray[0][1] = vAxisCol;
    //usageDataArray[0][2] = vAxisCol1;


    //for (var i = 0; i < rowCount; i++) {

    //    usageDataArray[i + 1] = new Array();
    //    //mainTitle += usageData.Rows[0]["DateOfReading"] + ' to ' + usageData.Rows[(usageData.length) - 1]["DateOfReading"];
    //    var udata = usageData.Rows[i][hAxisCol].toString();
    //    switch (mode) {
    //        case "H": usageDataArray[i + 1][0] = udata; break;
    //        case "D": udata = udata.substring(udata.indexOf('/') + 1); usageDataArray[i + 1][0] = udata.substring(0, udata.indexOf('/')); break;
    //        //case "M": usageDataArray[i + 1][0] = getMonthName(usageData.Rows[i][hAxisCol]) + '-'+ usageData.Rows[i]["Year"]; break;                     
    //        case "M": usageDataArray[i + 1][0] = (udata.length > 1 ? udata : '0' + udata) + '/' + usageData.Rows[i]["Year"].toString().substring(2); break;
    //    }

    //    usageDataArray[i + 1][1] = usageData.Rows[i][vAxisCol];
    //    usageDataArray[i + 1][2] = usageData.Rows[i][vAxisCol1];
    //}

    //var data = google.visualization.arrayToDataTable(usageDataArray);

    //var options = {
    //    title: 'Units Consumed (CCFS)',
    //    //width: 400, height: 400
    //    colors: ['#044104', '#f7a913', '#b30013', 'Blue'],
    //    legend: { position: 'none' },
    //    //bar: { groupWidth: '60%' },
    //    isStacked: false,
    //    interpolateNulls: false,
    //    //vAxis: { title: vAxTitle, titleTextStyle: { color: 'red'} }
    //    //hAxis: { textStyle: { fontSize: 8} }
    //};


    //var view = new google.visualization.DataView(data);
    ////view.setColumns([0,1]);

    //view.setColumns([0,
    //{
    //    type: 'number',
    //    label: 'Value',
    //    calc: function (dt, row) {
    //        return (dt.getValue(row, 1) < lowRange) ? dt.getValue(row, 1) : null;
    //    }
    //}, {

    //    type: 'number',
    //    label: 'Value',
    //    calc: function (dt, row) {
    //        return (dt.getValue(row, 1) >= lowRange && dt.getValue(row, 1) < highRange) ? dt.getValue(row, 1) : null;
    //    }
    //}, {

    //    type: 'number',
    //    label: 'Value',
    //    calc: function (dt, row) {

    //        return (dt.getValue(row, 1) >= highRange) ? dt.getValue(row, 1) : null;
    //    }

    //}, 2]);


    ////view.setColumns([0,1,2]);



    //var chart = new google.visualization.ColumnChart(document.getElementById('chartGeneration'));
    //chart.draw(view, options);
}

function loadRange() {
    // var rangeData = comUsage.LoadRange(type, mode, "E").value;
    var rangeData = comUsage.LoadRange().value;
    lowRange = rangeData.Rows[0]["LowRange"];
    highRange = rangeData.Rows[0]["MiddleRange"];
}