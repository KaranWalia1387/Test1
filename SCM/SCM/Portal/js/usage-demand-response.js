

var padd = "00"
var lowRange;
var highRange;
var range;
var usageOrGeneration;

var DREventData = '{"DataSet":{"DREventData":[{"EID":"2347856780","PROGRAM":"SmartAC","CUSTID":"5673890675","METERID":"197686","NTIME":"2015-07-15T13:00:00-07:00","STIME":"2015-07-15T14:00:00-07:00","ETIME":"2015-07-15T17:00:00-07:00"},{"EID":"3476894563","PROGRAM":"SmartHAN","CUSTID":"5673890675","METERID":"197686","NTIME":"2015-07-10T13:00:00-07:00","STIME":"2015-07-10T14:00:00-07:00","ETIME":"2015-07-10T17:00:00-07:00"}]}}';
var parsedDREventData = "";
var IntervalAvg = [];
var BaselineAvg = [];
var eventId = '';
var EventDate = '';
$(document).ready(function () {


    //var drresult = comUsage.LoadDRParticipationDetails();
    //if (drresult != "" && drresult.value != "") {
    //    DREventData = drresult.value;
    //}
    //parsedDREventData = jQuery.parseJSON(DREventData);
    //parsedDREventData = parsedDREventData.DataSet.DREventData;   
   // parsedDREventData = $.parseJSON(drresult.value).DataSet.DREventData;
    //parsedDREventData = parsedDREventData.EnergyData.INTVAVG;

    $('#btnExporttoExcel,#lnkExporttoExcel').click(function () {
        $('#hdnunit').val(type);
        $('#hdntime').val(mode);
        $('#hdnTitle').val(mainTitle);
    });


    // range = comUsage.LoadRange().value
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

    //var date = new Date();


    eventId = DResponse.GetEventId().value;
    EventDate = DResponse.GetEventDate().value;
    SetHeadingText(EventDate);
    var DrEvents = comUsage.LoadDRParticipationDetailsSingleEID(eventId).value;
   parsedDREventData = DrEvents.Rows[0];
    drawChart('1', type, 'H', EventDate);
    setImages();
});


function SetHeadingText(strDate) {
    var lblText = 'Hourly Data For ' + strDate;

}


function UsageDataHourly(sender, args) {


    var date = new Date(sender._selectedDate);
    SetHeadingText(date);
    strDateRedate = GetUTCDateFormat(date, 'yyyy-mm-dd');

    var meternumer = $('#hdnMeter').val();
    $("#hdnstrDate").val(strDateRedate);
    drawChart('1', type, mode, strDateRedate);

}


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

function GetDREvent(datetime) {
    var itemCount = parsedDREventData.length;
    var EventID = 0;
    for (var i = 0; i < itemCount; i++) {
        var eventdate = GetUTCDateFormat((new Date(Date.parse(parsedDREventData[i]["STIME"]))), 'yyyy-mm-dd');
        // var eventEnddate = (new Date(Date.parse(parsedDREventData[i]["ETIME"])));
        if (datetime == eventdate) {
            EventID = String(parsedDREventData[i]["EID"]);
            break;
        }

    }
    return EventID;

}

function CheckDREvent(datetime) {
    var usagedate = (new Date(Date.parse(datetime)));
    usagedate.setMinutes(usagedate.getMinutes() - 420);    
    try {      
            
            var eventdate = new Date(Date.parse(parsedDREventData.STIME));
            var eventEnddate = new Date(Date.parse(parsedDREventData.ETIME));
            if (usagedate <= eventEnddate && usagedate >= eventdate)
            {
                return true;
            }
            else
            {
                return false;
            }
            
      
        
    }
    catch (e) {
        var error = 'An error has occurred: ' + e.message;
        alert(error);

    }
}


//To set images on onclick
function setImages() {
    $('#usageMapMode a[mode=' + prevmode + ']').removeClass("active");
    $('#usageMapMode a[mode=' + mode + ']').addClass("active");
    $('#usageMapType a[type=' + prevtype + ']').removeClass("active");
    $('#usageMapType a[type=' + type + ']').addClass("active");
}

function drawChart(UsageOrGeneration, Type, Mode, date) {

    //if (Mode == 'H' || Mode == 'D')
    //{
    //    $("#divCalender").css('display', 'inline');
    //}
    //else {
    //    $("#divCalender").css('display', 'none');
    //}
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
    //strDate = $("#hdnstrDate").val();
    strDate = date;//$("#hdnstrDate").val();
    //Get Usage Data
    var hourlytype = Mode == "H" ? "F" : "H";
    var usageData = null;
    if (Mode == "H") {
        $("#drlegend").show();
        $("#drlegendtext").show();
        var currentdate = (new Date());

        if (strDate == "")
            strDate = currentdate.getFullYear() + "-" + padd.substring(0, padd.length - (currentdate.getMonth() + 1).toString().length) + (currentdate.getMonth() + 1) + "-" + padd.substring(0, padd.length - (currentdate.getDate()).toString().length) + (currentdate.getDate());
        else {
            currentdate = (new Date(Date.parse(strDate)));
            strDate = currentdate.getFullYear() + "-" + padd.substring(0, padd.length - (currentdate.getMonth() + 1).toString().length) + (currentdate.getMonth() + 1) + "-" + padd.substring(0, padd.length - (currentdate.getDate()).toString().length) + (currentdate.getDate());
        }

        //strDate = "2015-07-15";
        //usageData = comUsage.LoadDRUsage(UsageOrGeneration, Type, Mode, (strDate == undefined ? "" : strDate), hourlytype).value;
        //var eventId = GetDREvent(date);
        //if (eventId > 0)
        //{
        //    totalData = comUsage.LoadDRbaselineCurtailments(date, eventId).value;

        //}
        //else
        //{
        //    $('#chart').html('');
        //    alert('Power Usage data not found.');
        //    return false;
        //}

        totalData = comUsage.LoadDRbaselineCurtailments(date, eventId).value;
        if (totalData != null) {
            usageData = totalData.Tables[1];

            $('#averageval').html(totalData.Tables[2].Rows[0].IVALUE + ' kWh');
            $('#highestval').html(totalData.Tables[2].Rows[0].CVALUE + ' kWh');
            $('#lblCurrentUsage').html(totalData.Tables[2].Rows[0].BaseAvg + ' kWh');
            $('#lblEstimatedUsage').html(totalData.Tables[2].Rows[0].CurAvg + ' kWh');
        }
        else {
            $('#chart').html('');
            alert('Power Usage data not found.');
            return false;
        }
    }
    else {
        $("#drlegend").hide();
        $("#drlegendtext").hide();

        usageData = comUsage.LoadUsage(UsageOrGeneration, Type, Mode, (strDate == undefined ? "" : strDate), hourlytype).value;
    }


    //if (usageData == null || usageData.Rows.length == 0) {
    //    $('#chart').html('');
    //    alert('Power Usage data not found.');
    //    return false;
    //}



    processed_json = new Array();
    processed_json2 = new Array();
    IntervalAvg = new Array();
    BaselineAvg = new Array();
    //loadRange(Type, Mode, "E");
    switch (Mode) {
        case "H":
            hAxisCol = "Hourly";
            vAxisCol = "Unit";
            hAxTitle = 'Hourly';
            $.map(usageData.Rows, function (obj, i) {
                processed_json.push({
                    //name: formatAMPM(obj.Hourly), //we are getting time value from database now
                    //name: obj.TS,
                    //y: obj.DATA,
                    //color: setcolor(obj.DATA),
                    //year: obj.TS
                    //name: obj.Hourly,
                    name: GetHHmm((new Date(Date.parse(obj.TS)))),
                    y: parseFloat(obj.FORE10DAY),

                    color: CheckDREvent((new Date(Date.parse(obj.TS)))) ? "#7cb5ec" : "#F8A13F",
                    //  color: CheckDREvent(obj.TS) ? "#7cb5ec" :setcolor('#F8A13F'),
                    year: obj.Year
                });
            });
            //curtailusageData = comUsage.LoadDRCurtailUsage(UsageOrGeneration, Type, Mode, (strDate == undefined ? "" : strDate), hourlytype).value;
            curtailusageData = totalData.Tables[0];
            var y1 = totalData.Tables[2].Rows[0].BaseAvg;
            var y2 = totalData.Tables[2].Rows[0].CurAvg;
            $.map(curtailusageData.Rows, function (obj, i) {
                processed_json2.push({
                    //name: formatAMPM(obj.Hourly), //we are getting time value from database now
                    //name: obj.TS,
                    //y: obj.DATA,
                    //color: setcolor(obj.DATA),
                    //year: obj.TS
                    //name: obj.Hourly,
                    name: GetHHmm((new Date(Date.parse(obj.TS)))),
                    y: parseFloat(obj.INTV),
                    year: obj.Year
                });
            });
            $.map(curtailusageData.Rows, function (obj, i) {
                IntervalAvg.push({
                    //name: formatAMPM(obj.Hourly), //we are getting time value from database now
                    //name: obj.TS,
                    //y: obj.DATA,
                    //color: setcolor(obj.DATA),
                    //year: obj.TS
                    //name: obj.Hourly,
                    name: GetHHmm((new Date(Date.parse(obj.TS)))),
                    y: parseFloat(y2)



                });
            });
            $.map(curtailusageData.Rows, function (obj, i) {
                BaselineAvg.push({
                    //name: formatAMPM(obj.Hourly), //we are getting time value from database now
                    //name: obj.TS,
                    //y: obj.DATA,
                    //color: setcolor(obj.DATA),
                    //year: obj.TS
                    //name: obj.Hourly,
                    name: GetHHmm((new Date(Date.parse(obj.TS)))),
                    y: parseFloat(y1)


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
    //setdailyhighest(Mode, Type, processed_json);


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
    $(".radius").height($(window).height() * .70);
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



function setdailyhighest(mode, unit, usagearray) {
    var maxval = 0;
    var avgvalue = 0;
    var total = 0;
    if (usagearray.length > 0) {
        maxval = usagearray[0].y;
    }
    for (var i = 0; i < usagearray.length; i++) {
        if (usagearray[i].y > maxval) {
            maxval = usagearray[i].y;
        }
        total += usagearray[i].y;
    }
    avgvalue = total / usagearray.length;
    var maxValueInArray = Math.max.apply(Math, usagearray.y);

    // var avftext = 'DAILY';
    var avftext = 'HOURLY';
    var unittext = 'kWh';
    var modetext = '';
    switch (mode) {
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
        $("#lblCurrentUsage").text($("#hdnDollarThisMonth").val());
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