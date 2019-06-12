
var tempDRPrograms;
var programID;
var tempCustomerSignedData;
var cutomerno = "";
var EventId = "";

function GetDREvents(cutomerno) {
    //var id = '0';
    $.ajax({
        type: "POST",
        url: "DRPastEvents.aspx/CallPastDREvents",
        data: '{id: "' + cutomerno + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessDRPrograms,
        async: false,

        failure: function (response) {
            return response.d;
        }
    });
}
function OnSuccessDRPrograms(response) {
    //var json;

    if (response == "" || response.d == "" || response.d == "Error : ORA-00942: table or view does not exist") {

        $("#dvTableContainer").html("No data found");

    }
    else {
        //     

        tempDRPrograms = $.parseJSON(response.d).DataSet.DREventData;

        if (tempDRPrograms.length > 0) {
            var rows = "";
            var str = "<table>";
            str += "<tr>";
            str += "<td style='width:120px;'>Event ID</td>";
            str += "<td style='width:120px; padding: 0px 6px;'>PROGRAM</td>";
            str += "<td style='width:110px;'>STIME</td>";
            str += "<td style='width:110px;'>ETIME</td>";
            str += "<td style='width:120px; padding: 0px 4px;'>Event Status</td>";
            str += "<td style='width:120px;'>Action (Opt in/out)</td>";
            str += "<td style='width:120px;'>Saving (KWH)</td>";
            str += "<td style='width:80px;padding: 0px 6px;'>Saving ($)</td>";
            str += "</tr>";
            for (var i in tempDRPrograms) {

                var StartDate = (new Date(Date.parse(tempDRPrograms[i].STIME)));

                var EndDate = (new Date(Date.parse(tempDRPrograms[i].ETIME)));


                var STIME = GetUTCDateFormat(StartDate, 'yyyy-mm-dd');

                var startdate = pad(StartDate.getMonth() + 1, 2) + '/' + pad(StartDate.getDate(), 2) + '/' + StartDate.getFullYear() + ' ' + pad(StartDate.getHours(), 2) + ':' + pad(StartDate.getMinutes(), 2) + ':' + pad(StartDate.getSeconds(), 2);
                var enddate = pad(EndDate.getMonth() + 1, 2) + '/' + pad(EndDate.getDate(), 2) + '/' + EndDate.getFullYear() + ' ' + pad(EndDate.getHours(), 2) + ':' + pad(EndDate.getMinutes(), 2) + ':' + pad(EndDate.getSeconds(), 2);

                rows += "<tr>";
                rows += "<td><a href='#' onclick =showhidediv('" + tempDRPrograms[i].EID + "','" + STIME.toString() + "')>" + tempDRPrograms[i].EID + "</a></td>";

                rows += "<td>" + tempDRPrograms[i].PROGRAM + "</td>";

                rows += "<td>" + startdate + "</td>";
                rows += "<td>" + enddate + "</td>";


                var status = tempDRPrograms[i].ESTATUS.toString().trim();
                rows += "<td>" + (status == 'C' ? "Completed" : (status == 'A' ? "Cancelled" : "Error")) + "</td>";
                rows += "<td>" + (tempDRPrograms[i].EACTION.toString().trim() == 'I' ? "Opt in" : "Opt Out") + "</td>";
                rows += "<td>" + tempDRPrograms[i].CVALUE + "</td>";
                rows += "<td>" + tempDRPrograms[i].IVALUE + "</td>";

                rows += "</tr>";
            }

            str = str + rows + "</table>";

            $("#dvTableContainer").html(str);
        }
    }
}

function showhidediv(eventId, EventDate) {

    $('#DRDiv').show();
    $('#chartDiv').show();
    var utlitynum = $('select#ddlAddress option:selected').attr("utilityaccountnum");
    EventId = eventId;
    cutomerno = utlitynum;
    SetHeadingText(EventDate);
    var DrEvents = comUsage.LoadDRParticipationDetailsSingleEID(eventId, cutomerno).value;
    parsedDREventData = DrEvents.Rows[0];
    drawChartDR('1', type, 'H', EventDate);
}

function RegisterPopupDetail(detailData) {
    programID = detailData;
    var registerDetails = "";

    for (i = 0; i < tempDRPrograms.length; i++) {
        if (tempDRPrograms[i].ID == detailData) {
            registerDetails = "<table class='table'>";

            registerDetails += "<tr>";
            registerDetails += "<td>Name</td>";
            registerDetails += "<td>" + tempDRPrograms[i].NAME + "</td>";
            registerDetails += "</tr>"

            registerDetails += "<tr>";
            registerDetails += "<td>Description</td>";

            if (tempDRPrograms[i].DESCP = '\'\'') {
                registerDetails += "<td></td>";
            }
            else {
                registerDetails += "<td>" + tempDRPrograms[i].DESCP + "</td>";
            }

            registerDetails += "</tr>"

            registerDetails += "<tr>";
            registerDetails += "<td>Ptype</td>";
            registerDetails += "<td>" + tempDRPrograms[i].PTYPE + "</td>";
            registerDetails += "</tr>"

            registerDetails += "<tr>";
            registerDetails += "<td>Freq</td>";
            registerDetails += "<td>" + tempDRPrograms[i].FREQ + "</td>";
            registerDetails += "</tr>"

            registerDetails += "<tr>";
            registerDetails += "<td>Trig</td>";
            registerDetails += "<td>" + tempDRPrograms[i].TRIG + "</td>";
            registerDetails += "</tr>"

            registerDetails += "<tr>";
            registerDetails += "<td>Incentive</td>";
            registerDetails += "<td>" + tempDRPrograms[i].INCENTIVE + "</td>";
            registerDetails += "</tr>"

            registerDetails += "<tr>";
            registerDetails += "<td>Penalty</td>";
            registerDetails += "<td>" + tempDRPrograms[i].PENALTY + "</td>";
            registerDetails += "</tr>"

            registerDetails += "<tr>";
            registerDetails += "<td>Contract</td>";
            registerDetails += "<td>" + tempDRPrograms[i].CONTRACT + "</td>";
            registerDetails += "</tr>"

            registerDetails += "<tr>";
            registerDetails += "<td>Feature</td>";
            registerDetails += "<td>" + tempDRPrograms[i].FEATURE + "</td>";
            registerDetails += "</tr>"

            registerDetails += "<tr>";
            registerDetails += "<td>MPROG</td>";
            registerDetails += "<td>" + tempDRPrograms[i].MPROG + "</td>";
            registerDetails += "</tr>"

            registerDetails += "</table>";

            break;
        }
    }

    $('#dvRegisterDetails').html(registerDetails);

}

function GetCustomerSignedProgramDetails() {
    var id = cutomerno;
    $.ajax({
        type: "POST",
        url: "DRPrograms.aspx/CallCustomers",
        data: '{id: "' + id + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessCustomerSignedProgramDetails,
        async: false,

        failure: function (response) {
            return response.d;
        }
    });
}

function OnSuccessCustomerSignedProgramDetails(response) {
    var json;
    var tempSignedCustomers = new Array();
    var flag = "0";
    if (response == "" || response.d == "" || response.d == "Error : ORA-00942: table or view does not exist") {
        // no data found
        //alert('no data found');

        tempSignedCustomers = [
            {
                "PID": "4567834578", "NAME": "PROG_03", "DESCP": "(DR Program)", "TYPE": "SmartHAN", "FREQ": "Any Day", "TRIG": "6h-Short term dispatch", "INCENTIVE": "$5/kW", "PENALTY": "$25/During event opt-out", "CONTRACT": "Monthly", "FEATURE": "1h-Response Time", "MULTI": "N"
            }
        ];

        if (typeof tempCustomerSignedData !== "undefined") {
            tempSignedCustomers.push(tempCustomerSignedData);
        }

        for (i = 0; i < tempSignedCustomers.length; i++) {
            if (tempSignedCustomers[i].PID == programID) {
                flag = "1";
                break;
            }
        }

        if (flag == "1") {
            // toastr.error('Already signed up.')
            w2alert('Already signed up.')
        }
        else {
            tempCustomerSignedData = {
                "PID": "" + programID + "",
                "NAME": "PROG_03", "DESCP": "(DR Program)", "TYPE": "SmartHAN", "FREQ": "Any Day", "TRIG": "6h-Short term dispatch",
                "INCENTIVE": "$5/kW", "PENALTY": "$25/During event opt-out", "CONTRACT": "Monthly", "FEATURE": "1h-Response Time", "MULTI": "N"
            };

            tempSignedCustomers.push(tempCustomerSignedData);
            w2alert('You have successfully signed up.');
            // toastr.success('You have successfully signed up.')
        }

    }
    else {

        rejsondata = $.parseJSON(response.d).DataSet.CustPrograms;
        if (rejsondata.length == null || rejsondata.length == undefined) {
            tempSignedCustomers.push(rejsondata);
        }

        if (typeof tempCustomerSignedData !== "undefined") {
            tempSignedCustomers.push(tempCustomerSignedData);
        }

        for (i = 0; i < tempSignedCustomers.length; i++) {
            if (tempSignedCustomers[i].PID == programID) {
                flag = "1";
                break;
            }
        }

        if (flag == "1") {
            // toastr.error('Already signed up.');
            w2alert('Already signed up.')
        }
        else {
            tempCustomerSignedData = {
                "PID": "" + programID + "",
                "NAME": "", "DESCP": "", "TYPE": "", "FREQ": "", "TRIG": "",
                "INCENTIVE": "", "PENALTY": "", "CONTRACT": "", "FEATURE": "", "MULTI": ""
            };

            CustomerProgramSignup(programID);

            tempSignedCustomers.push(tempCustomerSignedData);

            //alert('You have signin this program.');
        }
    }
}

function CustomerProgramSignup(pid) {
    var id = cutomerno + ',' + pid;
    $.ajax({
        type: "POST",
        url: "DRPrograms.aspx/CallCustomerProgramSignup",
        data: '{id: "' + id + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessCustomerProgramSign,
        async: false,

        failure: function (response) {
            return response.d;
        }
    });
}

function OnSuccessCustomerProgramSign(response) {
    if (response == "" || response.d == "" || response.d == "Error : ORA-00942: table or view does not exist") {
        w2alert('Unable to sign up.');
        //toastr.error('Unable to sign up.')
    }
    else {
        //"SIGNUP":"Signup successful ..."}

        var msg = $.parseJSON(response.d).SIGNUP;
        w2alert(msg);
        //toastr.success(msg);
    }
}

function drawChartDR(UsageOrGeneration, Type, Mode, date) {

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

    strDate = date;

    var hourlytype = Mode == "H" ? "F" : "H";
    var usageData = null;
    if (Mode == "H") {
        $("#drlegend").show();
        $("#drlegendtext").show();
        var currentdate = (new Date());

        //if (strDate == "")
        //    strDate = currentdate.getFullYear() + "-" + padd.substring(0, padd.length - (currentdate.getMonth() + 1).toString().length) + (currentdate.getMonth() + 1) + "-" + padd.substring(0, padd.length - (currentdate.getDate()).toString().length) + (currentdate.getDate());
        //else {
        //    currentdate = (new Date(Date.parse(strDate)));
        //    strDate = currentdate.getFullYear() + "-" + padd.substring(0, padd.length - (currentdate.getMonth() + 1).toString().length) + (currentdate.getMonth() + 1) + "-" + padd.substring(0, padd.length - (currentdate.getDate()).toString().length) + (currentdate.getDate());
        //}

        totalData = comUsage.LoadDRbaselineCurtailments(date, EventId, cutomerno).value;
        if (totalData != null) {
            usageData = totalData.Tables[1];

            $('#averagevalues').html(totalData.Tables[2].Rows[0].IVALUE + ' kWh');
            $('#highestvalues').html(totalData.Tables[2].Rows[0].CVALUE + ' kWh');
            $('#lblCurntDr').html(totalData.Tables[2].Rows[0].BaseAvg + ' kWh');
            $('#lblEstDR').html(totalData.Tables[2].Rows[0].CurAvg + ' kWh');
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

                    name: GetHHmm((new Date(Date.parse(obj.TS)))),
                    y: parseFloat(obj.FORE10DAY),

                    color: CheckDREvent((new Date(Date.parse(obj.TS)))) ? "#7cb5ec" : "#F8A13F",

                    year: obj.Year
                });
            });
            curtailusageData = totalData.Tables[0];
            var y1 = totalData.Tables[2].Rows[0].BaseAvg;
            var y2 = totalData.Tables[2].Rows[0].CurAvg;
            $.map(curtailusageData.Rows, function (obj, i) {
                processed_json2.push({

                    name: GetHHmm((new Date(Date.parse(obj.TS)))),
                    y: parseFloat(obj.INTV),
                    year: obj.Year
                });
            });
            $.map(curtailusageData.Rows, function (obj, i) {
                IntervalAvg.push({

                    name: GetHHmm((new Date(Date.parse(obj.TS)))),
                    y: parseFloat(y2)



                });
            });
            $.map(curtailusageData.Rows, function (obj, i) {
                BaselineAvg.push({

                    name: GetHHmm((new Date(Date.parse(obj.TS)))),
                    y: parseFloat(y1)


                });
            });
            mainTitle = 'Hourly Usage for ' + new Date(usageData.Rows[0]["TS"]).toLocaleDateString();
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

    var chartDiv = $('#chart')[0];

    var cWidth = $('#chart').css('width').replace('px', '');
    var cHeight = $('#chart').css('height').replace('px', '');

    if (cHeight == "0px")
    { cHeight = 150; }




    $('#hdnTitle').val(mainTitle);
    $("#lblCharttitle").text(mainTitle);

    var columncount = processed_json.length;
    if (columncount > 31) {
        var chartwidth = columncount * 30;
        $('#chart').attr('style', 'width:' + chartwidth + 'px !important');
    }
    else {
        $('#chart').attr('style', 'width:97%!important');
    }

    $(".radius").height($(window).height() * .70);
    populateChart('column', 'chart');

}
function SetHeadingText(strDate) {
    var lblText = 'Hourly Data For ' + strDate;

}

function CheckDREvent(datetime) {
    var usagedate = (new Date(Date.parse(datetime)));
    usagedate.setMinutes(usagedate.getMinutes() - 420);
    try {

        var eventdate = new Date(Date.parse(parsedDREventData.STIME));
        var eventEnddate = new Date(Date.parse(parsedDREventData.ETIME));
        if (usagedate <= eventEnddate && usagedate >= eventdate) {
            return true;
        }
        else {
            return false;
        }



    }
    catch (e) {
        var error = 'An error has occurred: ' + e.message;
        alert(error);

    }
}

function populateChart(type, id, value) {
    if (processed_json.length > 0) {

        if (processed_json2.length > 0) {
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
    $('#disclaimer').hide();
    $('.nav_left ul li').removeClass("active");
    $('.sidebar_dresponse').addClass("active");
    $('.fancybox').click(function () {

        $('.fancybox').fancybox({

            afterShow: function () {

                populateChart(type[x], 'commonPieChart')
            }
        });


    });
});