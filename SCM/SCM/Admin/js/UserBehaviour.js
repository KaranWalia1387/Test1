var dtOutageChartjs = new Array();
var dtOutageChartjs1 = new Array();
var dtUsageChartjs = new Array();
var Generationjs = new Array();
var dtBrowserjs = new Array
var dtLoginDetails = new Array



var dt_outage;
var dt_device;
var dt_resolution;
var dt_browser;
var dt_heatmap;
var dt_loginDetails;


var nodataLabel = "<center><font color='Red'>No Data Available</font></center>";
function LoadData() {
    try {
        var param =
           {
               datefrom: '',
               dateto: ''
           };
        loader.showloader();
        $.ajax({
            type: "POST",
            url: "DashboardUserBehaviour.aspx/LoadUserBehaviourData",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(param),
            success: function (data) {
                data = data.d;
                var result = $.parseJSON(data);
                dt_outage = result.Table1;
                dt_device = result.Table3;
                dt_resolution = result.Table5;
                dt_browser = result.Table7;
                dt_loginDetails = result.LoginDetailTable;

                FillOutageData('userbehavour');
                FillDeviceData('userbehavour');
                FillResolutionData('userbehavour');
                FillBrowserData('userbehavour');
                FillLoginDetailsData('userbehavour');
                loader.hideloader();
            },
            error: function (request, status, error) { loader.hideloader(); alert('Error!! ' + request.statusText); }
        });
    }
    catch (e) { }
}

$(document).ready(function () {
    LoadData();
    //FillOutageData('userbehavour');
    //FillDeviceData('userbehavour');
    //FillResolutionData('userbehavour');
    //FillBrowserData('userbehavour');
    //FillHeatmapData('userbehavour');

    $('.left-active-sprite ul li a').click(function () {
        var lstanchor = $(this).parent().parent().find('a');
        $(lstanchor).each(function (i, obj) {
            $(obj).attr('class', '');
        })

        $(this).attr('class', 'active');
    });

});

function FillOutageData(type) {
    try {
        processed_json = new Array();
        //if (dt_outage == null || dt_outage == undefined) {
        //    dt_outage = DashboardUserBehaviour.LoadUserBehaviourDashboard().value;
        //}

        //if (dt_outage != null) {
        //    if (dt_outage.Tables[0].length > 0) {
        //        $('#totalpayement').text(dt_outage.Tables[0].Rows[0]["TotalCount"]);
        //        $('#totalpayementTitle').text("Total Payment");                
        //    }

        //}
        if (dt_outage == null || dt_outage.length == 0) {
            if (type == 'userbehavour') {
                $('#outageschart1').html(nodataLabel);
                $('#gridoutage').html(nodataLabel);
            }
            else {
                $('#data-viewer-popup').html(nodataLabel);
                $('#grid-viewer-popup').html(nodataLabel);
            }
        }
        //if (dt_outage.Tables[1].Rows.length > 0) {
        //    for (var i = 0; i < dt_outage.Tables[1].Rows.length; i++) {
        //        dt_outage.Tables[1].Rows[i]["TotalCount"] = parseInt(dt_outage.Tables[1].Rows[i]["TotalCount"].toString());
        //        dt_outage.Tables[1].Rows[i]["DMonth"] = parseInt(dt_outage.Tables[1].Rows[i]["DMonth"].toString());
        //        dt_outage.Tables[1].Rows[i]["DYear"] = dt_outage.Tables[1].Rows[i]["DYear"];
        //        $('#totalpayement').text(dt_outage.Tables[0].Rows[0]["TotalCount"]);
        //    }
        if (dt_outage.length > 0) {
            for (var i = 0; i < dt_outage.length; i++) {
                dt_outage[i]["TotalCount"] = parseInt(dt_outage[i]["TotalCount"].toString());
                dt_outage[i]["DDay"] = parseInt(dt_outage[i]["DDay"].toString());
                dt_outage[i]["DMonth"] = parseInt(dt_outage[i]["DMonth"].toString());
                dt_outage[i]["DYear"] = parseInt(dt_outage[i]["DYear"].toString());
            }
            yaxis = 'Number of Payments';

            //$.map(dt_outage.Tables[1].Rows, function (obj, i) {
            $.map(dt_outage, function (obj, i) {
                processed_json.push({
                    name: obj.DDay + '/' + obj.DMonth,// + '/' + obj.DYear,
                    y: obj.TotalCount,
                    color: '#6baee3',
                    title: obj.DDay + '/' + obj.DMonth ,//+ ' / ' + obj.DYear,
                    dataLabels: {
                        crop: false,
                        overflow: 'none',
                    }
                });
            });

            if (processed_json.length > 0) {
                if (type == 'userbehavour') {
                    populateChart('areaspline', 'gridoutage', false);
                    // LoadOutageGrid('gridoutage', dt_outage.Tables[1].Rows);
                }
                else {
                    populateChart('areaspline', 'grid-viewer-popup', false);
                    //LoadOutageGrid('grid-viewer-popup', dt_outage.Tables[1].Rows);
                }
            } else {
                if (type == 'userbehavour') {
                    $('#outageschart1').html(nodataLabel);
                    $('#gridoutage').html(nodataLabel);
                }
                else {
                    $('#data-viewer-popup').html(nodataLabel);
                    $('#grid-viewer-popup').html(nodataLabel);
                }
            }

            dtOutageChartjs = processed_json;
        }
        // if (dt_outage.Tables[1].Rows.length > 0) {
        //for (var i = 0; i < dt_outage.Tables[1].Rows.length; i++) {
        //    dt_outage.Tables[1].Rows[i]["TotalCount"] = parseInt(dt_outage.Tables[1].Rows[i]["TotalCount"].toString());
        //    dt_outage.Tables[1].Rows[i]["DMonth"] = parseInt(dt_outage.Tables[1].Rows[i]["DMonth"].toString());
        //    dt_outage.Tables[1].Rows[i]["DYear"] = parseInt(dt_outage.Tables[1].Rows[i]["DYear"].toString());
        //    $('#totalpayement').text(dt_outage.Tables[0].Rows[0]["TotalCount"]);
        //}
        if (dt_outage.length > 0) {
            yaxis = 'Number of Payments';
            processed_json = new Array();
            // $.map(dt_outage.Tables[1].Rows, function (obj, i) {
            $.map(dt_outage, function (obj, i) {
                processed_json.push({
                    name: obj.DDay + '/' + obj.DMonth,// + '/' + obj.DYear,
                    y: obj.TotalCount,
                    color: '#6baee3',
                    title: obj.DDay + '/' + obj.DMonth,// + '/' + obj.DYear,
                    dataLabels: {
                        crop: false,
                        overflow: 'none',
                    }
                });
            });

            if (processed_json.length > 0) {
                if (type == 'userbehavour') {
                    populateChart('column', 'outageschart1', false);
                    // LoadOutageGrid('gridoutage', dt_outage.Tables[1].Rows);
                }
                else {
                    populateChart('column', 'data-viewer-popup', false);
                    //LoadOutageGrid('grid-viewer-popup', dt_outage.Tables[1].Rows);
                }
            } else {
                if (type == 'userbehavour') {
                    $('#outageschart1').html(nodataLabel);
                    $('#gridoutage').html(nodataLabel);
                }
                else {
                    $('#data-viewer-popup').html(nodataLabel);
                    $('#grid-viewer-popup').html(nodataLabel);
                }
            }

            dtOutageChartjs1 = processed_json;
        }


    } catch (e) { }
}

function FillDeviceData(type) {
    try {
        processed_json = new Array();
        //if (dt_device == null || dt_device == undefined) {
        //    dt_device = DashboardUserBehaviour.LoadUserBehaviourDashboard().value;
        //}
        if (dt_device == null) {
            if (type == 'userbehavour') {
                $('#usagechart1').html(nodataLabel);
                $('#gridusage').html(nodataLabel);
            }
            else {
                $('#data-viewer-popup').html(nodataLabel);
                $('#grid-viewer-popup').html(nodataLabel);
            }
        }
        //if (dt_device.Tables[3].Rows.length > 0) {
        //    for (var i = 0; i < dt_device.Tables[3].Rows.length; i++) {
        //        dt_device.Tables[3].Rows[i]["OS"] = dt_device.Tables[3].Rows[i]["OS"].toString();
        //        dt_device.Tables[3].Rows[i]["OSClicks"] = parseInt(dt_device.Tables[3].Rows[i]["OSClicks"].toString());
        //        // $('#totalpayement').text(dt_outage.Tables[0].Rows[0]["TotalCount"]);
        //    }
        if (dt_device.length > 0) {
            for (var i = 0; i < dt_device.length; i++) {
                dt_device[i]["OS"] = dt_device[i]["OS"].toString();
                dt_device[i]["OSClicks"] = parseInt(dt_device[i]["OSClicks"].toString());
                // $('#totalpayement').text(dt_outage.Tables[0].Rows[0]["TotalCount"]);
            }
            yaxis = 'Number of Customers';
            processed_json = new Array();
            // $.map(dt_device.Tables[3].Rows, function (obj, i) {
            $.map(dt_device, function (obj, i) {
                processed_json.push({
                    name: obj.OS,
                    y: obj.OSClicks,
                    color: '#6baee3',
                    title: obj.OS,
                    dataLabels: {
                        crop: false,
                        overflow: 'none',
                    }
                });
            });

            if (processed_json.length > 0) {
                if (type == 'userbehavour') {

                    populateChart('areaspline', 'gridusage', false);
                    // LoadOutageGrid('gridoutage', dt_outage.Tables[1].Rows);
                }
                else {
                    populateChart('areaspline', 'grid-viewer-popup', false);
                    //LoadOutageGrid('grid-viewer-popup', dt_outage.Tables[1].Rows);
                }
            } else {
                if (type == 'userbehavour') {
                    $('#usagechart1').html(nodataLabel);
                    $('#gridusage').html(nodataLabel);
                }
                else {
                    $('#data-viewer-popup').html(nodataLabel);
                    $('#grid-viewer-popup').html(nodataLabel);
                }
            }

            dtUsageChartjs = processed_json;
        }
        //if (dt_device.Tables[3].Rows.length > 0) {
        //    for (var i = 0; i < dt_device.Tables[3].Rows.length; i++) {
        //        dt_device.Tables[3].Rows[i]["OS"] = dt_device.Tables[3].Rows[i]["OS"].toString();
        //        dt_device.Tables[3].Rows[i]["OSClicks"] = parseInt(dt_device.Tables[3].Rows[i]["OSClicks"].toString());

        //    }
        if (dt_device.length > 0) {
            yaxis = 'Number of Customers';
            processed_json = new Array();
            // $.map(dt_device.Tables[3].Rows, function (obj, i) {
            $.map(dt_device, function (obj, i) {
                processed_json.push({
                    name: obj.OS,
                    y: obj.OSClicks,
                    color: '#6baee3',
                    title: obj.OS,
                    dataLabels: {
                        crop: false,
                        overflow: 'none',
                    }
                });
            });

            if (processed_json.length > 0) {
                if (type == 'userbehavour') {
                    populateChart('column', 'usagechart1', false);
                    // LoadOutageGrid('gridoutage', dt_outage.Tables[1].Rows);
                }
                else {
                    populateChart('column', 'data-viewer-popup', false);
                    //LoadOutageGrid('grid-viewer-popup', dt_outage.Tables[1].Rows);
                }
            } else {
                if (type == 'userbehavour') {
                    $('#usagechart1').html(nodataLabel);
                    $('#gridusage').html(nodataLabel);
                }
                else {
                    $('#data-viewer-popup').html(nodataLabel);
                    $('#grid-viewer-popup').html(nodataLabel);
                }
            }

            dtUsageChartjs = processed_json;
        }
    }
    catch (e) { }
}

function FillResolutionData(type) {
    try {
        processed_json = new Array();
        //if (dt_resolution == null || dt_resolution == undefined) {
        //    dt_resolution = DashboardUserBehaviour.LoadUserBehaviourDashboard().value;
        //}
        if (dt_resolution == null) {
            if (type == 'userbehavour') {
                $('#generationchart1').html(nodataLabel);
                $('#gridgeneration1').html(nodataLabel);
            }
            else {
                $('#data-viewer-popup').html(nodataLabel);
                $('#grid-viewer-popup').html(nodataLabel);
            }
        }
        //if (dt_resolution.Tables[5].Rows.length > 0) {
        //    for (var i = 0; i < dt_resolution.Tables[5].Rows.length; i++) {
        //        dt_resolution.Tables[5].Rows[i]["ScreenResolution"] = dt_resolution.Tables[5].Rows[i]["ScreenResolution"].toString();
        //        dt_resolution.Tables[5].Rows[i]["ScreenResolutionCount"] = parseInt(dt_resolution.Tables[5].Rows[i]["ScreenResolutionCount"].toString());                
        //    }
        if (dt_resolution.length > 0) {
            for (var i = 0; i < dt_resolution.length; i++) {
                dt_resolution[i]["ScreenResolution"] = dt_resolution[i]["ScreenResolution"].toString();
                dt_resolution[i]["ScreenResolutionCount"] = parseInt(dt_resolution[i]["ScreenResolutionCount"].toString());
            }
            yaxis = 'Number of Customers';
            processed_json = new Array();
            //  $.map(dt_resolution.Tables[5].Rows, function (obj, i) {
            $.map(dt_resolution, function (obj, i) {
                processed_json.push({
                    name: obj.ScreenResolution,
                    y: obj.ScreenResolutionCount,
                    color: '#6baee3',
                    title: obj.ScreenResolution,
                    dataLabels: {
                        crop: false,
                        overflow: 'none',
                    }
                });
            });

            if (processed_json.length > 0) {
                if (type == 'userbehavour') {

                    populateChart('areaspline', 'gridgeneration1', false);
                    // LoadOutageGrid('gridoutage', dt_outage.Tables[1].Rows);
                }
                else {
                    populateChart('areaspline', 'grid-viewer-popup', false);
                    //LoadOutageGrid('grid-viewer-popup', dt_outage.Tables[1].Rows);
                }
            } else {
                if (type == 'userbehavour') {
                    $('#generationchart1').html(nodataLabel);
                    $('#gridgeneration1').html(nodataLabel);
                }
                else {
                    $('#data-viewer-popup').html(nodataLabel);
                    $('#grid-viewer-popup').html(nodataLabel);
                }
            }

            Generationjs = processed_json;
        }
        //if (dt_resolution.Tables[5].Rows.length > 0) {
        //    for (var i = 0; i < dt_resolution.Tables[5].Rows.length; i++) {
        //        dt_resolution.Tables[5].Rows[i]["ScreenResolution"] = dt_resolution.Tables[5].Rows[i]["ScreenResolution"].toString();
        //        dt_resolution.Tables[5].Rows[i]["ScreenResolutionCount"] = parseInt(dt_resolution.Tables[5].Rows[i]["ScreenResolutionCount"].toString());               
        //    }
        if (dt_resolution.length > 0) {
            yaxis = 'Number of Customers';
            processed_json = new Array();
            // $.map(dt_resolution.Tables[5].Rows, function (obj, i) {
            $.map(dt_resolution, function (obj, i) {
                processed_json.push({
                    name: obj.ScreenResolution,
                    y: obj.ScreenResolutionCount,
                    color: '#6baee3',
                    title: obj.ScreenResolution,
                    dataLabels: {
                        crop: false,
                        overflow: 'none',
                    }
                });
            });

            if (processed_json.length > 0) {
                if (type == 'userbehavour') {
                    populateChart('column', 'generationchart1', false);
                    // LoadOutageGrid('gridoutage', dt_outage.Tables[1].Rows);
                }
                else {
                    populateChart('column', 'data-viewer-popup', false);
                    //LoadOutageGrid('grid-viewer-popup', dt_outage.Tables[1].Rows);
                }
            } else {
                if (type == 'userbehavour') {
                    $('#generationchart1').html(nodataLabel);
                    $('#gridgeneration1').html(nodataLabel);
                }
                else {
                    $('#data-viewer-popup').html(nodataLabel);
                    $('#grid-viewer-popup').html(nodataLabel);
                }
            }

            Generationjs = processed_json;
        }
    }
    catch (e) { }
}

function FillBrowserData(type) {
    try {
        processed_json = new Array();
        //if (dt_browser == null || dt_browser == undefined) {
        //    dt_browser = DashboardUserBehaviour.LoadUserBehaviourDashboard().value;
        //}
        if (dt_browser == null) {
            if (type == 'userbehavour') {
                $('#servicechart').html(nodataLabel);
                $('#gridservice').html(nodataLabel);
            }
            else {
                $('#data-viewer-popup').html(nodataLabel);
                $('#grid-viewer-popup').html(nodataLabel);
            }
        }
        //if (dt_browser.Tables[7].Rows.length > 0) {
        //    for (var i = 0; i < dt_browser.Tables[7].Rows.length; i++) {
        //        dt_browser.Tables[7].Rows[i]["BrowserName"] = dt_browser.Tables[7].Rows[i]["BrowserName"].toString();
        //        dt_browser.Tables[7].Rows[i]["TotalCount"] = parseInt(dt_browser.Tables[7].Rows[i]["TotalCount"].toString());                
        //    }
        if (dt_browser.length > 0) {
            for (var i = 0; i < dt_browser.length; i++) {
                dt_browser[i]["BrowserName"] = dt_browser[i]["BrowserName"].toString();
                dt_browser[i]["TotalCount"] = parseInt(dt_browser[i]["TotalCount"].toString());
            }
            yaxis = 'Number of Customers';
            processed_json = new Array();
            // $.map(dt_browser.Tables[7].Rows, function (obj, i) {
            $.map(dt_browser, function (obj, i) {
                processed_json.push({
                    name: obj.BrowserName,
                    y: obj.TotalCount,
                    color: '#6baee3',
                    title: obj.BrowserName
                });
            });

            if (processed_json.length > 0) {
                if (type == 'userbehavour') {

                    populateChart('areaspline', 'gridservice', false);
                    // LoadOutageGrid('gridoutage', dt_outage.Tables[1].Rows);
                }
                else {
                    populateChart('areaspline', 'grid-viewer-popup', false);
                    //LoadOutageGrid('grid-viewer-popup', dt_outage.Tables[1].Rows);
                }
            } else {
                if (type == 'userbehavour') {
                    $('#servicechart').html(nodataLabel);
                    $('#gridservice').html(nodataLabel);
                }
                else {
                    $('#data-viewer-popup').html(nodataLabel);
                    $('#grid-viewer-popup').html(nodataLabel);
                }
            }

            dtBrowserjs = processed_json;
        }
        //if (dt_browser.Tables[7].Rows.length > 0) {
        //    for (var i = 0; i < dt_browser.Tables[7].Rows.length; i++) {
        //        dt_browser.Tables[7].Rows[i]["BrowserName"] = dt_browser.Tables[7].Rows[i]["BrowserName"].toString();
        //        dt_browser.Tables[7].Rows[i]["TotalCount"] = parseInt(dt_browser.Tables[7].Rows[i]["TotalCount"].toString());                
        //    }
        if (dt_browser.length > 0) {
            //yaxis = '<strong>Top Browser</strong>';
            processed_json = new Array();
            //$.map(dt_browser.Tables[7].Rows, function (obj, i) {
            $.map(dt_browser, function (obj, i) {
                processed_json.push({
                    name: obj.BrowserName,
                    y: obj.TotalCount,
                    color: colorarrHEX[i],
                    title: obj.BrowserName
                });
            });

            if (processed_json.length > 0) {
                if (type == 'userbehavour') {
                    BindPieChartWithoutLabel('servicechart', 'Count');
                    // LoadOutageGrid('gridoutage', dt_outage.Tables[1].Rows);
                }
                else {
                    BindPieChartWithoutLabel('data-viewer-popup', 'Count');
                    //LoadOutageGrid('grid-viewer-popup', dt_outage.Tables[1].Rows);
                }
            } else {
                if (type == 'userbehavour') {
                    $('#servicechart').html(nodataLabel);
                    $('#gridservice').html(nodataLabel);
                }
                else {
                    $('#data-viewer-popup').html(nodataLabel);
                    $('#grid-viewer-popup').html(nodataLabel);
                }
            }

            dtBrowserjs = processed_json;
        }
    }
    catch (e) { }
}

function FillHeatmapData(type) {
    try {
        processed_json = new Array();
        dt_heatmap = null;
        //if (dt_heatmap == null || dt_heatmap == undefined) {
        //    dt_heatmap = DashboardUserBehaviour.LoadUserBehaviourDashboard().value;
        //}
        if (dt_heatmap == null) {
            if (type == 'userbehavour') {
                $('#Heapchart').html(nodataLabel);
                $('#gridHeap').html(nodataLabel);
            }
            else {
                $('#data-viewer-popup').html(nodataLabel);
                $('#grid-viewer-popup').html(nodataLabel);
            }
        }
    }
    catch (e) { }
}


function FillLoginDetailsData(type) {
    try {
        processed_json = new Array();
        //if (dt_device == null || dt_device == undefined) {
        //    dt_device = DashboardUserBehaviour.LoadUserBehaviourDashboard().value;
        //}
        if (dt_loginDetails == null) {
            if (type == 'userbehavour') {
                $('#LoginDetailschart').html(nodataLabel);
                $('#gridLoginDetails').html(nodataLabel);
            }
            else {
                $('#data-viewer-popup').html(nodataLabel);
                $('#grid-viewer-popup').html(nodataLabel);
            }
        }
        //if (dt_device.Tables[3].Rows.length > 0) {
        //    for (var i = 0; i < dt_device.Tables[3].Rows.length; i++) {
        //        dt_device.Tables[3].Rows[i]["OS"] = dt_device.Tables[3].Rows[i]["OS"].toString();
        //        dt_device.Tables[3].Rows[i]["OSClicks"] = parseInt(dt_device.Tables[3].Rows[i]["OSClicks"].toString());
        //        // $('#totalpayement').text(dt_outage.Tables[0].Rows[0]["TotalCount"]);
        //    }
        if (dt_loginDetails.length > 0) {
            for (var i = 0; i < dt_loginDetails.length; i++) {
                var logindate = dt_loginDetails[i]["ActivityDateTime"].toString();
               // dt_loginDetails[i]["LoginDateTime"] = logindate.substring(3, 6) + logindate.substring(8, 10);
                dt_loginDetails[i]["ActivityDateTime"] = logindate.substring(0, 5);// + logindate.substring(8, 10);
                dt_loginDetails[i]["LoginCount"] = parseInt(dt_loginDetails[i]["LoginCount"].toString());
                // $('#totalpayement').text(dt_outage.Tables[0].Rows[0]["TotalCount"]);
            }
            yaxis = 'Number of Logins';
            processed_json = new Array();
            // $.map(dt_device.Tables[3].Rows, function (obj, i) {
            $.map(dt_loginDetails, function (obj, i) {
                processed_json.push({
                    name: obj.ActivityDateTime,
                    y: obj.LoginCount,
                    color: '#6baee3',
                    title: obj.ActivityDateTime,
                    dataLabels: {
                        crop: false,
                        overflow: 'none',
                    }
                });
            });

            if (processed_json.length > 0) {
                if (type == 'userbehavour') {

                    populateChart('areaspline', 'gridLoginDetails', false);
                    // LoadOutageGrid('gridoutage', dt_outage.Tables[1].Rows);
                }
                else {
                    populateChart('areaspline', 'grid-viewer-popup', false);
                    //LoadOutageGrid('grid-viewer-popup', dt_outage.Tables[1].Rows);
                }
            } else {
                if (type == 'userbehavour') {
                    $('#LoginDetailschart').html(nodataLabel);
                    $('#gridLoginDetails').html(nodataLabel);
                }
                else {
                    $('#data-viewer-popup').html(nodataLabel);
                    $('#grid-viewer-popup').html(nodataLabel);
                }
            }

            dtLoginDetails = processed_json;
        }
        //if (dt_device.Tables[3].Rows.length > 0) {
        //    for (var i = 0; i < dt_device.Tables[3].Rows.length; i++) {
        //        dt_device.Tables[3].Rows[i]["OS"] = dt_device.Tables[3].Rows[i]["OS"].toString();
        //        dt_device.Tables[3].Rows[i]["OSClicks"] = parseInt(dt_device.Tables[3].Rows[i]["OSClicks"].toString());

        //    }
        if (dt_loginDetails.length > 0) {
            yaxis = 'Number of Logins';
            processed_json = new Array();
            // $.map(dt_device.Tables[3].Rows, function (obj, i) {
            $.map(dt_loginDetails, function (obj, i) {
                processed_json.push({
                    name: obj.ActivityDateTime,
                    y: obj.LoginCount,
                    color: '#6baee3',
                    title: obj.ActivityDateTime,
                    dataLabels: {
                        crop: false,
                        overflow: 'none',
                    }
                });
            });

            if (processed_json.length > 0) {
                if (type == 'userbehavour') {
                    populateChart('column', 'LoginDetailschart', false);
                    // LoadOutageGrid('gridoutage', dt_outage.Tables[1].Rows);
                }
                else {
                    populateChart('column', 'data-viewer-popup', false);
                    //LoadOutageGrid('grid-viewer-popup', dt_outage.Tables[1].Rows);
                }
            } else {
                if (type == 'userbehavour') {
                    $('#LoginDetailschart').html(nodataLabel);
                    $('#gridLoginDetails').html(nodataLabel);
                }
                else {
                    $('#data-viewer-popup').html(nodataLabel);
                    $('#grid-viewer-popup').html(nodataLabel);
                }
            }

            dtLoginDetails = processed_json;
        }
    }
    catch (e) { }
}

function switchview(viewshow, viewhide, type) {
    try {
        document.getElementById(viewshow).style.display = 'block';
        if (type == 'userbehavour') {
            $('#' + viewshow).css('height', 205);
        }
        else {

        }
        document.getElementById(viewhide).style.display = 'none';
        // $(".jqgrid:visible").jqxGrid('updatebounddata');
        if (viewshow == 'gridoutage') {
            $('#gridoutage').html("");
            FillOutageData('userbehavour');
        }
        else if (viewshow == 'outageschart1') {
            $('#outageschart1').html("");
            FillOutageData('userbehavour');
        }
        if (viewshow == 'gridusage') {
            $('#gridusage').html("");
            FillDeviceData('userbehavour');
        }
        else if (viewshow == 'usagechart1') {
            $('#usagechart1').html("");
            FillDeviceData('userbehavour');
        }
        if (viewshow == 'gridgeneration1') {
            $('#gridgeneration1').html("");
            FillResolutionData('userbehavour');
        }
        else if (viewshow == 'generationchart1') {
            $('#generationchart1').html("");
            FillResolutionData('userbehavour');
        }
        if (viewshow == 'gridservice') {
            $('#gridservice').html("");
            FillBrowserData('userbehavour');
        }
        else if (viewshow == 'servicechart') {
            $('#servicechart').html("");
            FillBrowserData('userbehavour');
        }

        if (viewshow == 'gridLoginDetails') {
            $('#gridLoginDetails').html("");
            FillLoginDetailsData('userbehavour');
        }
        else if (viewshow == 'LoginDetailschart') {
            $('#LoginDetailschart').html("");
            FillLoginDetailsData('userbehavour');
        }


        //chart.redraw();
        // setTimeout("FillOutageData(type);", 300);

        // FillOutageData('popup');
    }
    catch (e) { }
}
