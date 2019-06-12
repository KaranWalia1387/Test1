var usageOrGeneration = "";
var prevmode = '';
var prevtype = '';

google.load("visualization", "1", { packages: ["corechart"] });

$(document).ready(function () {

    Gtype = $('[type="hidden"][id$=hdnType]').val();
    Gmode = $('[type="hidden"][id$=hdnMode]').val();
    prevmode = $('[type="hidden"][id$=hdnMode]').val();
    prevtype = $('[type="hidden"][id$=hdnType]').val();

    // Code Coptimised For Css Based Buttons by Vivek for kwh & $$$ Values
    $('#GenrationType  ul li a').click(function () {
        Gtype = $(this).attr('mode');
        $('[type="hidden"][id$=hdnType]').val(Gtype);
        drawChart(usageOrGeneration, Gtype, Gmode);
        $('#GenrationType a').removeClass('active');
        $(this).addClass('active');
        // setImages(); Removed Funtionality to optimize code
    });

    // Code Coptimised For Css Based Buttons by Vivek for Last 10 Days & Next 10 Days.
    $('#GenrationMode a').click(function () {
        Gmode = $(this).attr('mode');
        $('[type="hidden"][id$=hdnMode]').val(Gmode);
        drawChart(usageOrGeneration, Gtype, Gmode);
        $('#GenrationMode a').removeClass("active");
        $(this).addClass('active');
        // setImages(); Removed Funtionality to optimize code
    });

    drawChart(usageOrGeneration, Gtype, Gmode);
    setImages();
});

function setImages() {
    // Code Coptimised For Css Based Buttons by Vivek to set default classes on buttons.

    $('#GenrationMode a').removeClass("active");
    $('#GenrationMode a[mode=' + Gmode + ']').addClass("active");
    $('#GenrationType a').removeClass("active");
    $('#GenrationType a[mode=' + Gtype + ']').addClass("active");
}

function drawChart(usageOrGeneration, Type, Mode) {
    var session = common.checksession().value;//Usage.checksession().value;
    if (session == "null") {
        alert('Your session has expired. Please re-login.');
        window.location.href = "default.aspx";
        return;
    }

    var MyData = weatherAPI_PowerGeneration.GetGenration(Type, Mode, $("#hdnstrDate").val()).value;
    var rowCount;
    if (MyData != null && MyData != "") {
        rowCount = MyData.Rows.length;
    }
    else { rowCount = 0; }
    //xaxis = "Date";
    yaxis = Type == "K" ? 'Units Generated (kWh)' : 'Cost of Units Generated ($)';
    processed_json = new Array();
    processed_json1 = new Array();
    if (rowCount > 0) {
        mainTitle = 'Period: ' + MyData.Rows[0]["GenerationDate"] + " to " + MyData.Rows[rowCount - 1]["GenerationDate"];
        $.map(MyData.Rows, function (obj, i) {

            processed_json.push([obj.DateOfReading, parseFloat(obj.TotalUnit)]);
            processed_json1.push({
                y:parseFloat(obj.TotalUnit)
            });
        });
    }
    else {
        alert('Your account data is not available at this time. Please try again later or contact customer support.')
        $('#divWether').html('');
        $('#chart_div').html('');
    }
    $("#lblUsageDate").text(mainTitle);
    $('#hdnTitle').val(mainTitle);
    setdailyhighest(Mode, Type, processed_json1);
    $(".radius").height($(window).height() * .39);
    populateChart('column', 'chart_div');
    getapidata();
}

//For weather API
function getapidata() {

    var result = weatherAPI_PowerGeneration.GetApiLocations().value;
    var parsedjson = jQuery.parseJSON(result);
    plotapilocations(parsedjson);
}

function plotapilocations(data) {
    var s = '';
    for (var i = 1; i < data.list.length; i++) {
        var date = new Date();
        var date = new Date((data.list[i].dt) * 1000);
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        var date = mm + '/' + dd + '/' + yyyy;
        var humidity = (data.list[i].humidity > 0) ? "Humidity " + data.list[i].humidity : "&nbsp;";
        s += "<div class='DayContainer'> <div class='DayHeader'>" + date + "</div>" +
        "<div class='DateHeader'>" + humidity + "</div>" +
        "<div class='Weather'><img src='images/Weather/" + data.list[i].weather[0].icon + ".png' alt='WeatherIcon' title='" + data.list[i].weather[0].main + "'></div>" +
        "<div class='Temp'>Max " + (((parseFloat(data.list[i].temp.max) - 273.15).toFixed(2)) * 1.8000 + 32.00).toFixed(2) + "°F</div>" +
        "<div class='Lowtemp'>Min " + (((parseFloat(data.list[i].temp.min) - 273.15).toFixed(2)) * 1.8000 + 32.00).toFixed(2) + "°F</div></div>";
    }
    $('#divWether').html(s);
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
    drawChart('1', Gtype, Gmode, strDate);

}

function setdailyhighest(mode, unit, usagearray) {
    try {
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

        var avftext = 'DAILY';
        var unittext = 'HCF';
        var modetext = '';


       
        switch (unit) {
            case 'K': unittext = 'kWh';
                break;
            case 'D':
                unittext = '$';
                break;

        }

        if (unittext == 'kWh') {
            $("#highestval").text(maxval.toFixed(2) + " " + unittext);
            $("#averageval").text(avgvalue.toFixed(2) + " " + unittext);
            $("#lblCurrentUsage").text($("#hdnUnitThisMonth").val() + " " + unittext);
            $("#lblEstimatedUsage").text($("#hdnUnitPrediction").val() + " " + unittext);
        }
        else {
            $("#highestval").text(unittext + maxval.toFixed(2));
            $("#averageval").text(unittext + avgvalue.toFixed(2));
            $("#lblCurrentUsage").text($("#hdnDollarThisMonth").val());
            $("#lblEstimatedUsage").text($("#hdnDollarPredicted").val());
        }

        //if (unit == 'K') {
        //    getColorForUnit();
        //}
        //else if (unit == 'D') {
        //    getColorForDollar();
        //}

        //Commented to keep the color black only
        //if (maxval <= avgvalue) {
        //    document.getElementById('highestval').style.color = '#94D60A';
        //}
        //else if (maxval == avgvalue) {
        //    document.getElementById('highestval').style.color = '#F8A13F';
        //}
        //else {
        //    document.getElementById('highestval').style.color = '#ba3d4b';
        //}
        
    }
    catch (ex)
    { }
}

function getColorForUnit() {
    var currUsage = $("#hdnUnitThisMonth").val();
    var estUsage = $("#hdnUnitPrediction").val();
    if (currUsage <= lowRangew) {
        color = '#94D60A';
        document.getElementById('lblCurrentUsage').style.color = color;
        document.getElementById('lblEstimatedUsage').style.color = color;
    }
    else if (currUsage > lowRangew && currUsage <= highRangew) {
        color = '#F8A13F';
        document.getElementById('lblCurrentUsage').style.color = color;
        document.getElementById('lblEstimatedUsage').style.color = color;
    }
    else if (currUsage > highRangew) {
        color = '#ba3d4b';
        document.getElementById('lblCurrentUsage').style.color = color;
        document.getElementById('lblEstimatedUsage').style.color = color;
    }
}

function getColorForDollar() {
    var currUsage = $("#hdnDollarThisMonth").val();
    var estUsage = $("#hdnDollarPredicted").val();
    if (currUsage <= lowRangew) {
        color = '#94D60A';
        document.getElementById('lblCurrentUsage').style.color = color;
        document.getElementById('lblEstimatedUsage').style.color = color;
    }
    else if (currUsage > lowRangew && currUsage <= highRangew) {
        color = '#F8A13F';
        document.getElementById('lblCurrentUsage').style.color = color;
        document.getElementById('lblEstimatedUsage').style.color = color;
    }
    else if (currUsage > highRangew) {
        color = '#ba3d4b';
        document.getElementById('lblCurrentUsage').style.color = color;
        document.getElementById('lblEstimatedUsage').style.color = color;
    }
}
