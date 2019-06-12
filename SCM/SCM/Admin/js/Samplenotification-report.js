var mode = '1';
var notificationtable;
var databindtogrid;
TitleExport = 'notification-report';
gridid = 'jqxgrid';
var divId = 'chartDiv';
var autoheightbool = false;
var autoheightPrimary = false;
var defOpen = 1;


function BindHeader() {
    try {
        var data = notificationtable.Table;
        data.forEach(function (obj, i) {
            if (obj.Notifications == "Total") {
                $('#lblTotalReq').text(obj.Cnt);
            }
            if (obj.Notifications == "Outages") {
                $('#lblOutageReq').text(obj.Cnt);
            }
            if (obj.Notifications == "Billing") {
                $('#lblBillingReq').text(obj.Cnt);
            }
            if (obj.Notifications == "Service") {
                $('#lblServiceReq').text(obj.Cnt);
            }
        });
    }
    catch (e) {
        console.log(e.message);
    }

}

//on page load
function LoadGrid() {
    try {
        autoheightPrimary = false;
        if (databindtogrid.length <= 10)
            autoheightPrimary = true;
        //Getting the source data with ajax GET request
        source = {
            datatype: "array",
            datafields: [
            { name: 'Created_Date', type: 'date' },
            //{ name: 'CityName', type: 'text' },
            { name: 'Service', type: 'number' },
            { name: 'Billing', type: 'number' },
            { name: 'Outage', type: 'number' },
            { name: 'Total', type: 'number' },
            ],
            async: false,
            record: 'Table',
            sortable: true,
            localdata: databindtogrid
        };

        var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });

        $("#jqxgrid").jqxGrid({
            width: "99.8%",
            //autoheight: autoheightPrimary,
            source: dataAdapter,
            height: GridHeight * .81,
            columnsheight: 38,
            rowsheight: 34,
            theme: 'darkblue',
            altrows: true,

            sortable: true,
            selectionmode: 'singlerow', //To trigger row select event
            pageable: true,
            pagesizeoptions: ['10', '20', '30', '40', '50', '100'],
            pagesize: 20,
            columnsresize: true,
            columnsreorder: true,
            columns:
            [
                { text: 'Created Date', dataField: 'Created_Date', columntype: Date, width: '22%', cellsformat: 'MM/dd/yyyy' },
                //{ text: 'City', dataField: 'CityName', width: '15%' },
                { text: 'Service Request Notifications', dataField: 'Service', width: '20%' },
                { text: 'Outage Notifications', dataField: 'Outage', width: '20%' },
                { text: 'Billing Notifications', dataField: 'Billing', width: '20%' },
                { text: 'Total Notifications', dataField: 'Total', width: '20%' }
            ]
        });
    }
    catch (e) {
        console.log(e.message);
    }
}

function PiechartCommon() {
    var piechart;
    var pieChartLevel3;
    piechart = notificationtable.Table1;

    if (piechart.length > 0) {
        $('#graphdivarea').css('display', 'block');
        $('#chartDiv').show();
        $('#nodata_div').hide();
        $('#nodata_div1').hide();
    }
    else {
        $('#nodata_div').show();
        $('#nodata_div1').show();
        $('#graphdivarea').css('display', 'none');
        $('#nodata_div').html('<font color="Red">No Notification Data available</font>');
        $('#chartDiv').hide();
        $('#notifytitle').hide();
    }

    processed_json = new Array();
    processed_json2 = new Array();
    processed_json3 = new Array();
    $('#legends').hide();
    
    $.map(piechart, function (obj, i) {
        processed_json.push({

            name: obj.Created_Date.slice(0, -5),
            y: obj.Service,
            color: colorarrHEX[0],
            title: 'Service Request Notifications',
        });
    });

    $.map(piechart, function (obj, i) {
        processed_json2.push({
            name: obj.Created_Date.slice(0, -5),
            y: obj.Outage,
            color: colorarrHEX[1],
            title: 'Outage Notifications',
        });
    });

    $.map(piechart, function (obj, i) {
        processed_json3.push({
            name: obj.Created_Date.slice(0, -5),
            y: obj.Billing,
            color: colorarrHEX[2],
            title: 'Billing Notifications',
        });
    });

    BindhighChart3AdminSeries('areaspline', divId, 'Service Request Notifications', colorarrHEX[0], 'Outage Notifications', colorarrHEX[1], 'Billing Notifications', colorarrHEX[2]);

}

$(document).ready(function () {

    var beforedate = new Date(new Date().setDate(new Date().getDate() - 30));
    var date = new Date();
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    $('#lblCurrent').text(months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear());
    $('#lblBefore').text(months[beforedate.getMonth()] + ' ' + beforedate.getDate() + ', ' + beforedate.getFullYear());
    var bfrdate = (beforedate.getMonth() + 1) + '/' + beforedate.getDate() + '/' + beforedate.getFullYear();
    var curdate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    $('#txtDateFrom').val(bfrdate);
    $('#txtDateTo').val(curdate);
    chartdivid = 'chartDiv';
    $('#nodata_div').hide();
    $('#nodata_div1').hide();
    $('#imgClk').hide();
    submit();
    $('.imgtoggle').click(function () {
        $('.content').slideToggle('slow');
        var oldSrc = $('.imgtoggle').attr('src');
        var minusImg = "..\\images\\ArrowsMinus.png";
        var plusImg = "..\\images\\ArrowsPlus.png";
        oldSrc = oldSrc == minusImg ? plusImg : minusImg;
        $('.imgtoggle').attr('src', oldSrc);
    });


    $('#btnFilter').click(function () {
        var bfrdate = $('#txtDateTo').val().split('/');
        var aftdate = $('#txtDateFrom').val().split('/');
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        $('#lblCurrent').text(months[bfrdate[0] - 1] + ' ' + bfrdate[1] + ', ' + bfrdate[2]);
        $('#lblBefore').text(months[aftdate[0] - 1] + ' ' + aftdate[1] + ', ' + aftdate[2]);
        submit();
        chartgraphsection(defOpen);
    });
});

$(document).on("click", ".filterdrop", function () {
    var idCity = this.id.split('_')[0];
    var notify = this.id.split('_')[1];
    $('#ddlCity').val(idCity);
    var obj = $('#ddlCity option:selected');
    $('#ddlNotificationtype').val(notify);
    var objNotify = $('#ddlNotificationtype option:selected');
    if (obj.index() > 0 && objNotify.index() > 0) {
        submit();
    }
});

function submit() {
    try {
        $('#legends').hide();
        var startDate = $('#txtDateFrom').val();
        var endDate = $('#txtDateTo').val();

        if (startDate != '' && endDate != '') {
            if (Date.parse(startDate) > Date.parse(endDate)) {
                $("#txtDateTo").val('');
                //   alert("From date should not be greater than to date");
                alert("'From Date' should not be greater than 'To date'");
                $("#txtDateTo").val("");
                return false;
            }
        }
        loader.showloader();
        var zip = "";
        var dtFrom = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? '' : $('#txtDateFrom').val();
        var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : $('#txtDateTo').val();
        var city = "";
        var ddlNotificationtype = ($('#ddlNotificationtype').val() == null || $('#ddlNotificationtype').val() == '') ? '' : $('#ddlNotificationtype').val();
        var ddlAccountType = ($('#ddlAccountType').val() == null || $('#ddlAccountType').val() == '') ? '' : $('#ddlAccountType').val();

        if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
            var ddlCity = $('#ddlCity option:selected');
            if ($(ddlCity).attr('key') == 'CityName') {
                city = $(ddlCity).val();
            }
            if ($(ddlCity).attr('key') == 'Zipcode') {
                zip = $(ddlCity).val();
            }
        }

        if ((city == '' && zip == '' && ddlAccountType == '')) {
            mode = 1;
        }
        else {

            mode = (city != '') ? 2 : 1;

            if (zip != '') {
                mode = 3;
            }

            if ((city != '' || zip != '') && ddlAccountType != '') {
                mode = 4;
            } else if (ddlAccountType != '') {
                mode = 4;
            }
        }
        if (ddlNotificationtype != '') {
            mode = 5;
        }
        var param = {
            datefrom: dtFrom,
            dateto: dtTo,
            mode: mode, cityid: city,
            zipcode: zip,
            notificationtypeid: ddlNotificationtype,
            customertype: ddlAccountType
        }
        //  notificationtable = SampleNotification.LoadGrid(mode, dtFrom, dtTo, city, zip, ddlNotificationtype, ddlAccountType).value;
        $.ajax({
            type: "POST",
            url: "SampleNotification.aspx/LoadGrid",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(param),
            success: function (data) {
                data = data.d;
                notificationtable = $.parseJSON(data);
                //OutageTable = result;
                $('#hdnParamValues').val(mode + '|' + dtFrom + '|' + dtTo + '|' + city + '|' + zip + '|' + ddlNotificationtype + '|' + ddlAccountType);
                databindtogrid = notificationtable.Table1;
                if (databindtogrid.length == 0) {
                    $('#jqxgrid').hide(); $(".grid-section").hide();
                    $('#jqxchildgrid').hide();
                    $('#nodata_div').show();
                    $('#nodata_div').html('<font color="Red">No Notification Data available</font>');
                    BindHeader();
                    //$('#nodata_div1').show();
                    //$('#nodata_div1').html('<font color="Red">No Notification Data available</font>');
                }
                else {
                    chartgraphsection(defOpen);
                    $('#chartDiv').show();
                    $('#jqxgrid').show(); $(".grid-section").show();
                    $('#jqxchildgrid').hide();
                    PiechartCommon();
                    var name = $('.left-active-sprites ul li a.active').closest('li').attr('class');
                    if (name == "chart") {
                        $("#graphdivarea").hide();
                        $("#tabledivarea").show();
                    }
                    else {
                        $("#graphdivarea").show();
                        $("#tabledivarea").hide();
                    }
                    gridid = 'jqxgrid';
                    BindHeader();
                    LoadGrid();
                }

                loader.hideloader();
            },

            error: function (request, status, error) { w2alert('Error!! ' + request.statusText); loader.hideloader(); }
        });
        //for pdf
        // databindtogrid = notificationtable.Tables[1].Rows;


    } catch (e) { }
}

function BindhighChart3AdminSeries(type, id, series1name, color1, series2name, color2, series3name, color3) {

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
            }
        },
        legend: {
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            floating: false

        },

        yAxis: {
            allowDecimals: false,
            title: {
                text: 'Number of notifications',
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
                rotation: -70,
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
            shared: false,
            formatter: function () {
                return '<b>Date: </b>' + this.point.name + '<br/><b>' + this.series.name + ': </b>' + this.y;
            }
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.8,
                lineWidth: null,
                states: {
                    hover: {
                        enabled: true,
                        lineWidth: 0.05
                    }
                },
                marker: {
                    enabled: false
                }
            },
            series: {
                pointWidth: 11,
                dataLabels: {
                    stacking: 'normal',

                    align: 'center',
                    rotation: -30,
                    y: -7,
                    enabled: false,
                    formatter: function () {
                        if (this.y === 0) {
                            return null;
                        }
                        return (changetoK(this.y));
                    },
                    style: {
                        color: 'black',
                        fontSize: '9px'
                    }

                },
                point: {
                    pointer: 'cursor',
                    events: {
                        click: function () {
                        }
                    }
                }
            }
        },
        series: [{
            type: type,
            name: series1name,
            data: processed_json,
            showInLegend: true,
            color: color1

        }, {
            type: type,
            name: series2name,
            data: processed_json2,
            showInLegend: true,
            color: color2
        },
        {
            type: type,
            name: series3name,
            data: processed_json3,
            showInLegend: true,
            color: color3
        }
        ]
    });
}