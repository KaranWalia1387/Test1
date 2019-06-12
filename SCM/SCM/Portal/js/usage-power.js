var lowRange;
var highRange;
var range;
var usageOrGeneration = "";
$(document).ready(function () {

    
    $('#btnExporttoExcel,#lnkExporttoExcel').click(function () {
        $('#hdnunit').val(type);
        $('#hdntime').val(mode);
        $('#hdnTitle').val(mainTitle);
    });

    range = comUsage.LoadRange().value;
    usageOrGeneration = "1";
    type = $('#hdnType').val();
    mode = $('#hdnMode').val();
    prevmode = $('#hdnMode').val(); //This variable is used to remember prev mode.
    prevtype = $('#hdnType').val(); //This variable is used to remember prev type.
    $('#usageMapMode a').click(function () {
        currentmode = $(this).attr('mode');
        if (currentmode != mode) {
            prevmode = mode;
            mode = currentmode;
            $('#hdnMode').val(mode);
            drawChart(usageOrGeneration, type, mode);
            setImages();
        }
    });

    $('#usageMapType ul li a, #usageMapOpt a').click(function () {
        currenttype = $(this).attr('type');
        if (currenttype != type) {
            prevtype = type;
            type = currenttype;
            $('#hdnType').val(type);
            drawChart(usageOrGeneration, type, mode);
            setImages();
        }
    });
    drawChart(usageOrGeneration, type, mode);
    setImages();
});

//This function is no longer required as we are fetching the time value from the database now
//function formatAMPM(datein) {
//    //var dateinput = new Date(datein);
//    //var hours = dateinput.getHours();
//    var minutes;
//    var ampm = datein >= 12 ? 'pm' : 'am';
//    datein = datein % 12;
//    datein = datein ? datein : 12; // the hour '0' should be '12'
//    //minutes = minutes < 10 ? '0' + minutes : minutes;
//    minutes = '00';
//    var strTime = datein + ':' + minutes + ' ' + ampm;
//    return strTime;
//}

//To set images on onclick
function setImages() {
    $('#usageMapMode a[mode=' + prevmode + ']').removeClass("active");
    $('#usageMapMode a[mode=' + mode + ']').addClass("active");
    $('#usageMapType a[type=' + prevtype + ']').removeClass("active");
    $('#usageMapType a[type=' + type + ']').addClass("active");
}

function drawChart(UsageOrGeneration, Type, Mode) {

    if (Mode == 'H' || Mode == 'D') {
        $("#divCalender").css('display', 'inline');
    }
    else {
        $("#divCalender").css('display', 'none');
    }
    var hAxisCol = '';
    var vAxisCol = '';
    var hAxTitle = '';
    yaxis = Type == "K" ? 'Units Consumed (kWh)' : 'Cost of Units Consumed ($)';
    mainTitle = '';

    //Check Session
    var session = common.checksession().value;
    if (session) {
        alert('Your session has expired. Please re-login.');
        window.location.href = "default.aspx";
        return;
    }
    strDate = $("#hdnstrDate").val();
    //Get Usage Data
    var hourlytype = Mode=="H"?"F":"H";
    var usageData = comUsage.LoadUsage(UsageOrGeneration, Type, Mode, (strDate == undefined ? "" : strDate), hourlytype).value;

    if (usageData == null || usageData.Rows.length == 0) {
        $('#chart').html('');
        alert('Power Usage data not found.');
        return false;
    }

    processed_json = new Array();
    loadRange(Type, Mode, "E");
    switch (Mode) {
        case "H":
            hAxisCol = "Hourly";
            vAxisCol = "Unit";
            hAxTitle = 'Hourly';
            $.map(usageData.Rows, function (obj, i) {
                processed_json.push({
                    //name: formatAMPM(obj.Hourly), //we are getting time value from database now
                    name: obj.Hourly,
                    y: obj.Unit,
                    color: setcolor(obj.Unit),
                    year: obj.Year
                });
            });

            mainTitle = 'Hourly Usage for ' + usageData.Rows[0]["UsageDate"];
            break;

        case "D":
            hAxisCol = "UsageDate";
            vAxisCol = "TotalValue";
            hAxTitle = 'Daily';

            $.map(usageData.Rows, function (obj, i) {
                processed_json.push({
                    name: obj.UsageDate,
                    y: obj.TotalValue,
                    color: setcolor(obj.TotalValue)
                });
            });
            mainTitle = 'Period: ' + usageData.Rows[0]["UsageDate"] + ' to ' + usageData.Rows[usageData.Rows.length - 1]["UsageDate"];
            break;

        case "M":
            hAxisCol = "Month";
            vAxisCol = "TotalValue";
            hAxTitle = 'Monthly';

            $.map(usageData.Rows, function (obj, i) {
                processed_json.push({
                    name: getMonthName(obj.Month),
                    y: obj.TotalValue,
                    color: setcolor(obj.TotalValue),
                    year: obj.Year

                });
            });
            mainTitle = 'Period: ' + getMonthName(usageData.Rows[0]["Month"]) + ' ' + usageData.Rows[0]["Year"] + ' to ' + getMonthName(usageData.Rows[usageData.Rows.length - 1]["Month"]) + ' ' + usageData.Rows[usageData.Rows.length - 1]["Year"];
            break;
    }
    setdailyhighest(Mode,Type, processed_json);
    

    var chartDiv = $('#chart')[0];

    var cWidth = $('#chart').css('width').replace('px', '');
    var cHeight = $('#chart').css('height').replace('px', '');

    if (cHeight == "0px")
    { cHeight = 150; }


    $('#hdnTitle').val(mainTitle);
    $("#lblCharttitle").text(mainTitle);
    //yaxis = 'Units Consumed (kWh)';

    //Start - increase width of the chart to show more data
    var columncount = processed_json.length;
    if (columncount > 31) {
        var chartwidth = columncount * 30;
        $('#chart').attr('style', 'width:' + chartwidth + 'px !important');
    }
    else {
        $('#chart').attr('style', 'width:97%!important');
    }
    //End - increase width of the chart to show more data
    $(".radius").height($(window).height()*.39);
    populateChart('column', 'chart');


}

function setcolor(usagevalue) {
    var color = '#FFFFFF';
    if (usagevalue <= lowRange) {
        color = '#94D60A';
    }
    else if (usagevalue > lowRange && usagevalue <= highRange) {
        color = '#F8A13F';
    }
    else if (usagevalue > highRange) {
        color = '#ba3d4b';
    }
    return color;

}

function loadRange(type, mode, rangeType) {


    type = type == "C" ? "K" : type;
    for (var r = 0; r < range.Rows.length; r++) {
        if (range.Rows[r]["Type"] == type && range.Rows[r]["RangeMode"] == mode) {
            lowRange = range.Rows[r]["LowRange"];
            highRange = range.Rows[r]["MiddleRange"];
            break;
        }
    }

}

function chartclick(x, y) {
    prevmode = mode;
    if (mode == 'H')
    { return false; }
    else if (mode == 'Y') {
        mode = 'M';

    }
    else if (mode == 'M') {
        mode = 'D';
        var clickyear = "";
        for (var i = 0; i < processed_json.length; i++) {
            if (processed_json[i].name == x) {
                clickyear = processed_json[i].year;
            }
        }
        $("#hdnstrDate").val(pad(getMonthValue(x), 2) + "/" + clickyear);
    }
    else if (mode == 'D') {
        mode = 'H';
        $("#hdnstrDate").val(x);
     
        $find("Cal_Date").set_selectedDate(x);
    }

    drawChart(usageOrGeneration, $('#hdnType').val(), mode);
    setImages();
}

function UsageDataHourly(sender, args) {

    var date = new Date(sender._selectedDate);

    // get the timezone offset in minutes
    var timeOffsetMinutes = date.getTimezoneOffset();
    // Convert minutes into milliseconds and create a new date based on the minutes.
    var correctedDate = new Date(date.getTime() + timeOffsetMinutes * 60000);

    var dd = correctedDate.getDate();
    if (dd < 10) {
        dd = '0' + dd
    }
    var mm = correctedDate.getMonth() + 1;
    if (mm < 10) {
        mm = '0' + mm
    }

    var yyyy = date.getFullYear();
    var strDate = mm + '/' + dd + '/' + yyyy;
    var lblText = 'Hourly Data For ' + strDate;
    //            $("#lblCharttitle").text(lblText);

    var meternumer = $('#hdnMeter').val();
    $("#hdnstrDate").val(strDate);
    drawChart('1', type, mode, strDate);

}


function setdailyhighest(mode,unit,usagearray)
{
    var maxval = 0;
    var avgvalue = 0;
    var total=0;
    if(usagearray.length>0)
    {
        maxval=usagearray[0].y;
    }
    for (var i = 0; i < usagearray.length; i++)
    {
        if (usagearray[i].y > maxval)
        {
            maxval = usagearray[i].y;
        }
        total+=usagearray[i].y;
    }
    avgvalue = total / usagearray.length;
    var maxValueInArray = Math.max.apply(Math, usagearray.y);
   
    // var avftext = 'DAILY';
    var avftext = 'HOURLY';
    var unittext = 'kWh';
    var modetext = '';
    switch (mode)
    {
        case 'H':
            avftext = $('#glblizeDaily').text();
            modetext = $('#glblizeDay').text();
            break;
        case 'D':
            avftext = $('#glblizeMonthly').text();
            modetext = $('#glblizeMonth').text();
            break;
        case 'M':
            avftext = $('#glblizeYearly').text();
            modetext = $('#glblizeYear').text();
            break;
    }
    switch (unit) {
        case 'K': unittext = 'kWh';
            break;
        case 'D':
            unittext = '$';
            break;
       
    }

    $('#averagevaltext').text(avftext);
    $('#ModeText').text(modetext);

    if (unittext == 'kWh') {
        $("#highestval").text(maxval.toFixed(2) + " " + unittext);
        $("#averageval").text(avgvalue.toFixed(2) + " " + unittext);
        $("#lblCurrentUsage").text($("#hdnPowerUnitThisMonth").val() + " " + unittext);
        $("#lblEstimatedUsage").text($("#hdnPowerUnitPrediction").val() + " " + unittext);
    }
    else {
        $("#highestval").text(unittext + maxval.toFixed(2));
        $("#averageval").text(unittext + avgvalue.toFixed(2));
        $("#lblCurrentUsage").text( $("#hdnDollarThisMonth").val());
        $("#lblEstimatedUsage").text($("#hdnDollarPredicted").val());
    }  
    if (mode == 'M' && unit == 'K') {
        getColorForUnit();
    }
    else if (mode == 'M' && unit == 'D') {
        getColorForDollar();
    }
    if (maxval <= avgvalue) {
        document.getElementById('highestval').style.color = '#94D60A';
    }
    else if (maxval == avgvalue) {
        document.getElementById('highestval').style.color = '#F8A13F';
    }
    else {
        document.getElementById('highestval').style.color = '#ba3d4b';
    }
}

function getColorForUnit() {
    var currUsage = $("#hdnPowerUnitThisMonth").val();
    var estUsage = $("#hdnPowerUnitPrediction").val();
    if (currUsage <= lowRange) {
        color = '#94D60A';
        document.getElementById('lblCurrentUsage').style.color = color;
        document.getElementById('lblEstimatedUsage').style.color = color;
    }
    else if (currUsage > lowRange && currUsage <= highRange) {
        color = '#F8A13F';
        document.getElementById('lblCurrentUsage').style.color = color;
        document.getElementById('lblEstimatedUsage').style.color = color;
    }
    else if (currUsage > highRange) {
        color = '#ba3d4b';
        document.getElementById('lblCurrentUsage').style.color = color;
        document.getElementById('lblEstimatedUsage').style.color = color;
    }
}

function getColorForDollar() {
    var currUsage = $("#hdnDollarThisMonth").val();
    var estUsage = $("#hdnDollarPredicted").val();
    if (currUsage <= lowRange) {
        color = '#94D60A';
        document.getElementById('lblCurrentUsage').style.color = color;
        document.getElementById('lblEstimatedUsage').style.color = color;
    }
    else if (currUsage > lowRange && currUsage <= highRange) {
        color = '#F8A13F';
        document.getElementById('lblCurrentUsage').style.color = color;
        document.getElementById('lblEstimatedUsage').style.color = color;
    }
    else if (currUsage > highRange) {
        color = '#ba3d4b';
        document.getElementById('lblCurrentUsage').style.color = color;
        document.getElementById('lblEstimatedUsage').style.color = color;
    }
}