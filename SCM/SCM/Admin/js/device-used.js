var DeviceUsedTable = {};
var DeviceHeaderTable;
var databindtogrid;
var toDate, fromDate;
var Tables, DeviceUsedData;
var zipcode = '', cityid = '', acctType = '';
var monthNames = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

$(document).ready(function () {
    try {
    $('#nodata_div').hide();
    getDate();
    setDate();
    fromDate = replace($('#txtDateFrom').val());
    toDate = replace($('#txtDateTo').val());
    $('#hdnParamValues').val(fromDate + '|' + toDate + '|' + cityid + '|' + zipcode + '|' + acctType);
    //DeviceUsedTable = Device_Used.getData(fromDate, toDate, cityid, zipcode, acctType);
    
    var param = { 'Datefrom': fromDate, 'DateTo': toDate, 'cityid': cityid, 'ZipCode': zipcode, 'CustomerType': acctType };
    CallAjax(Error, param);
    $('#btnFilter').click(function () {
        LoadFilterData();

    })
    $("#jqxgrid").bind('rowselect', function (event) {
        var row = event.args.rowindex;
        var datarow = $("#jqxgrid").jqxGrid('getrowdata', row);
        LoadChildGrid(datarow);
    });
} catch (e) {
// loader.hideloader();
        console.log(e.message);
}
});

function LoadGrid() {
    try {
        autoheightPrimary = false;
        if (databindtogrid.length == 0) {
            $('#nodata_div').show();
            $('#jqxgrid').hide();
            $('#jqxchildgrid').hide();
        }
        else {
            $('#nodata_div').hide();
            $('#jqxgrid').show();
            $('#jqxchildgrid').hide();
            $("#statusBill").attr('disabled', 'disabled');
        }
        if (databindtogrid.length <= 10)
            autoheightPrimary = true;
        //Getting the source data with ajax GET request

        source = {
            datatype: "array",
            datafields: [
            { name: 'DATE' },
            { name: 'AndroidDevices', type: 'number' },
             { name: 'IOSDevices', type: 'number' },
              { name: 'TotalDevices', type: 'number' }
            ],
            async: false,
            record: 'Table',
            sortable: true,
            localdata: databindtogrid
        };
        var dataAdapter = new $.jqx.dataAdapter(source,
            { contentType: 'application/json; charset=utf-8' }
        );

        $("#jqxgrid").jqxGrid({
            width: "99.8%",
            //autoheight: autoheightPrimary,
            height: GridHeight * .79,
            columnsheight: 38,
            rowsheight: 34,
            theme: 'darkblue',
            altrows: true,
            source: dataAdapter,
            sortable: true,
            selectionmode: 'singlerow', //To trigger row select event

            pageable: true,
            pagesizeoptions: ['10', '20', '30', '40', '50','100'],
            pagesize: 10,
            columnsresize: true,
            columnsreorder: true,
            columns:
            [
                { text: 'Date', dataField: 'DATE', width: '40%', },
                 { text: 'iOS Devices', dataField: 'IOSDevices', width: '20%', },
                { text: 'Android Devices', dataField: 'AndroidDevices', width: '20%', },
                  { text: 'Total Devices', dataField: 'TotalDevices', width: '20%', },
            ]
        });
    } catch (e) {
        console.log(e.message);
    }

}

function LoadChart() {
    var processed_jsonb2 = new Array();
    var processed_jsonb1 = new Array();
    var month;
    var Year;
    databindtogrid = DeviceUsedTable.Tables[2].Rows;


    if (databindtogrid.length > 0) {
        $.map(databindtogrid, function (obj, i) {
              processed_jsonb1.push({               
                  name: obj.DATE.slice(0, -5),
                y: parseInt(obj.IOSDevices),
            });
        });
    }
    databindtogrid = DeviceUsedTable.Tables[3].Rows;
    if (databindtogrid.length > 0) {
        $.map(databindtogrid, function (obj, i) {
                processed_jsonb2.push({
                    name: obj.DATE.slice(0, -5),
                y: parseInt(obj.AndroidDevices),
            });
        });
    }

    $('#chartDiv').highcharts({
        chart: {
            type: 'areaspline'
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
                    //fontWeight: 'bold',
                    fontSize: '12px',
                    // fontFamily: 'Trebuchet MS, Verdana, sans-serif'

                }
            }
        },
        yAxis: {
            allowDecimals: false,
            min: 0,
          //  maxPadding: 0.09,
            title: {
                text: 'Number of users',
                style: {
                    color: '#333333',
                    fontSize: '12px',
                }
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
        },
        tooltip: {
            shared: false,
          
            formatter: function () {
                //return '<b>Date: </b>' + this.point.name + '<br/><b>' + this.series.name + ': '+'</b>' + changetoK(Math.abs(this.y))+' users';
                return '<b>Date: </b>' + this.point.name + '<br/><b>' + this.series.name + ': '+'</b>' + this.y+' users';
            }
        },

        credits: {
            enabled: false
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
                // pointWidth: 11,
                dataLabels: {
                    stacking: 'normal',
                    align: 'center',
                    rotation: -30,//#4867
                    // x: 0,//#4867
                    y: -7,
                    enabled: false,
                    formatter: function () {
                        if (this.y === 0) {
                            return null;
                        }
                        //return this.y;
                        return (changetoK(this.y));
                        //return Highcharts.numberFormat(this.y, 0);
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
            name: 'iOS Devices',
            data: processed_jsonb1,
            showInLegend: true,
            color: colorarrHEX[1]
        }, {

            name: 'Android Devices',
            data: processed_jsonb2,
            showInLegend: true,
            color: colorarrHEX[0]

        }]
    });
}

function LoadHeader() {
    if (parseInt(DeviceHeaderTable.length) > 0)
    {
        $('#demandusageval').text(DeviceHeaderTable[0]['CNT']);
        $('#demandusagetext').text('iOS DEVICES');
        $('#Android').text(DeviceHeaderTable[1]['CNT']);
        $('#androidText').text('ANDROID DEVICES');
        $('#Total').text(DeviceHeaderTable[2]['CNT']);
        $('#totalText').text('TOTAL DEVICES');
    }
    else{
        $('#demandusageval').text(0);
        //$('#demandusagetext').text(DeviceHeaderTable[0]['DeviceType']);
        $('#Android').text(0);
        //$('#androidText').text(DeviceHeaderTable[1]['DeviceType']);
        $('#Total').text(0);
        //$('#totalText').text(DeviceHeaderTable[2]['DeviceType']);
}
    
}

function getDate() {

    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth();
    var curr_year = d.getFullYear();
    toDate = curr_month + "-" + curr_date + "-" + curr_year;
    fromDate = curr_month + "-" + (curr_date) + "-" + (curr_year - 1);
}

function setDate() {
    var frm = getDateFormat($('#txtDateFrom').val());
    var to = getDateFormat($('#txtDateTo').val());
    var currentDate = new Date();
    var prevDate = new Date(new Date().setDate(new Date().getDate() - 30));
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    if ($('#txtDateFrom').val() != "" && $('#txtDateTo').val() != "") {
        yr = frm.split(',')[1];
        yr1 = to.split(',')[1];
        if (yr == yr1) {
            $('#lblDateRange').text(frm.split(',')[0] + ' - ' + to.split(',')[0] + ', ' + yr);
        }
        else {
            $('#lblDateRange').text(frm + ' - ' + to);
        }
    }
    else {
        var bfrdate = (prevDate.getMonth() + 1) + '/' + prevDate.getDate() + '/' + prevDate.getFullYear();
        var curdate = (currentDate.getMonth() + 1) + '/' + currentDate.getDate() + '/' + currentDate.getFullYear();
        $('#txtDateFrom').val(bfrdate);
        $('#txtDateTo').val(curdate);

        var dateRange = months[prevDate.getMonth()] + ' ' + prevDate.getDate() + ', ' + prevDate.getFullYear() + ' - ' + months[currentDate.getMonth()] + ' ' + currentDate.getDate() + ', ' + currentDate.getFullYear();
        $('#lblDateRange').text(dateRange);
    }
}
function LoadFilterData() {
    try {
        fromDate = replace($('#txtDateFrom').val());
        toDate = replace($('#txtDateTo').val());
        var startDate = $('#txtDateFrom').val();
        var endDate = $('#txtDateTo').val();
        if (startDate != '' && endDate != '') {
            if (Date.parse(startDate) > Date.parse(endDate)) {
                $("#txtDateTo").val('');
               // alert("From date should not be greater than to date");
                alert("'From Date' should not be greater than 'To date'");
                $("#txtDateTo").val("");
                return false;
            }
        }

        zipcode = ''; cityid = '';
        if ($('#ddlCity option:selected').attr('key') == 'CityName') {
            cityid = $('#ddlCity option:selected').val();
        }
        else if ($('#ddlCity option:selected').attr('key') == 'Zipcode') {
            cityid = $('#ddlCity option:selected').attr('cityid');
            zipcode = $('#ddlCity option:selected').val();

        }
        acctType = $('#ddlAccountType option:selected').val();
        $('#hdnParamValues').val(fromDate + '|' + toDate + '|' + cityid + '|' + zipcode + '|' + acctType);
        //DeviceUsedTable = Device_Used.getData(fromDate, toDate, cityid, zipcode, acctType);

        // this section only for show date in div
        var fdate = new Date(fromDate.toString());
        var fromdatefordiv = monthNames[fdate.getMonth()] + ' ' + fdate.getDate() + ', ' + fdate.getFullYear();
        var tdate = new Date(toDate.toString());
        var todatefordiv = monthNames[tdate.getMonth()] + ' ' + tdate.getDate() + ', ' + tdate.getFullYear();
        $('#lblDateRange').text(fromdatefordiv + ' - ' + todatefordiv);
        // end this section

        var param = { 'Datefrom': fromDate, 'DateTo': toDate, 'cityid': cityid, 'ZipCode': zipcode, 'CustomerType': acctType };
        CallAjax(Error, param);
        //ConvertData();

        //if (DeviceUsedTable.Tables[0].Rows[2]["CNT"] > 0) {
        //    DeviceHeaderTable = DeviceUsedTable.Tables[0].Rows;
        //    databindtogrid = DeviceUsedTable.Tables[0].Rows;
        //    //var length = parseInt(DeviceUsedTable.value.Tables[2].Rows.length);
        //    //$('.usage_date_time').html('<b>' + DeviceUsedTable.value.Tables[2].Rows[0].BMOnth + '-' + DeviceUsedTable.value.Tables[2].Rows[length - 1].BMOnth + '</b>')
        //    LoadHeader();
        //    LoadGrid();
        //    LoadChart();
        //}
        //else {
            
          
        //}
    } catch (e) {
        console.log(e.message);
    }

}

function replace(text) {
    var dateArr = text.split('/');
    var val = dateArr[0] + '-' + dateArr[1] + '-' + dateArr[2];
    return val;

}

//function LoadChildGrid(row) {
//    switch (row.DeviceType) {
//        case "AppleDevices":
//            databindtogrid = DeviceUsedTable.value.getTable("Table2").Rows;
//            break;
//        case "AndroidDevices":
//            databindtogrid = DeviceUsedTable.value.getTable("Table3").Rows;
//            break;
//    }

//    autoheightPrimary = false;
//    if (databindtogrid != null && databindtogrid.length == 0) {
//        $('#jqxgrid').hide();
//        $('#jqxchildgrid').hide();
//    }
//    else {
//        $('#nodata_div').hide();
//        $('#jqxgrid').hide();
//        $('#jqxchildgrid').show();

//    }
//    if (databindtogrid.length <= 10)
//        autoheightPrimary = true;
//    //Getting the source data with ajax GET request
//    source = {
//        datatype: "array",
//        datafields: [
//            { name: 'DeviceType' },
//            { name: 'CNT', type: 'number' },
//        ],
//        async: false,
//        record: 'Table',
//        sortable: true,
//        localdata: databindtogrid
//    };
//    var dataAdapter = new $.jqx.dataAdapter(source,
//        { contentType: 'application/json; charset=utf-8' }
//    );

//    $("#jqxchildgrid").jqxGrid({
//        width: "99%",
//        autoheight: autoheightPrimary,
//        height: "320",
//        source: dataAdapter,
//        sortable: true,
//        selectionmode: 'singlerow', //To trigger row select event

//        pageable: true,
//        pagesizeoptions: ['10', '20', '30', '40', '50','100'],
//        pagesize: 10,
//        columnsresize: true,
//        columnsreorder: true,
//        showtoolbar: true,
//        rendertoolbar: function (toolbar) {
//            var me = this;
//            var container = $("<div style='margin: 5px;'></div>");
//            toolbar.append(container);
//            container.append('<input id="Back" type="button" value="Back" />');
//            $("#Back").jqxButton();
//            $("#Back").on('click', function () {
//                $('#jqxgrid').show();
//                $('#jqxchildgrid').hide();
//            });
//        },
//        columns:
//        [
//            { text: 'Device Type', columngroup: 'DevicesType', dataField: 'DeviceType', width: '50%', },
//            { text: 'TotalCount', columngroup: 'DevicesType', dataField: 'CNT', width: '50%', },
//        ],
//        columngroups: [
//                    { text: row.DeviceType, align: 'center', name: 'DeviceType' }
//        ]
//    });


//}

function CallAjax(fnError, param) {
    try
    {
        loader.showloader();
        $.ajax({
            type: "POST",
            url: "Device-used.aspx/LoadData",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //data: { id: 'k' },
            success: function (response, status, type) {
                DeviceUsedData = $.parseJSON(response.d);
                ConvertData();

                ////// this section only for show date in div
                ////var fdate = new Date(fromDate.toString());
                ////var fromdatefordiv = monthNames[fdate.getMonth()] + ' ' + fdate.getDate() + ', ' + fdate.getFullYear();
                ////var tdate = new Date(toDate.toString());
                ////var todatefordiv = monthNames[tdate.getMonth()] + ' ' + tdate.getDate() + ', ' + tdate.getFullYear();
                ////$('#lblDateRange').text(fromdatefordiv + ' - ' + todatefordiv);
                ////// end this section
                var startDate = $('#txtDateFrom').val();
                var endDate = $('#txtDateTo').val();
                var dsplit = endDate.split("/");
                var dateEnds = new Date(dsplit[2], dsplit[0] - 1, dsplit[1]);
                dsplit = startDate.split("/");
                var dateStarts = new Date(dsplit[2], dsplit[0] - 1, dsplit[1]);
                $('#lblCurrent').text(monthNames[dateEnds.getMonth()] + ' ' + dateEnds.getDate() + ', ' + dateEnds.getFullYear());
                $('#lblBefore').text(monthNames[dateStarts.getMonth()] + ' ' + dateStarts.getDate() + ', ' + dateStarts.getFullYear());
           
                if (DeviceUsedData !=null&&DeviceUsedTable.Tables[1].Rows.length > 0) {
                    DeviceHeaderTable = DeviceUsedTable.Tables[0].Rows;
                    databindtogrid = DeviceUsedTable.Tables[1].Rows;
                    $(".grid-section").show();
                    var name = $('.left-active-sprites ul li a.active').closest('li').attr('class');
                    if (name == "chart") {
                        $("#chartDiv").hide();
                        $("#tabledivarea").show();
                    }
                    else {
                        $("#chartDiv").show();
                        $("#tabledivarea").hide();
                    }
                    $('#nodata_div').hide();
                    $('#jqxgrid').show();
                    gridid = 'jqxgrid';
                    LoadGrid();
                    LoadChart(); LoadHeader();
                } else {
                    $('#nodata_div').show(); $(".grid-section").hide();
                    $('#jqxgrid').hide();
              
                    DeviceHeaderTable = DeviceUsedTable.Tables[0].Rows;
                    LoadHeader();
                }
            
                loader.hideloader();
            },
            error: fnError,
        })
    }
    catch (e) {
        loader.hideloader();
    }

}

function Error(e) {
    loader.hideloader();
    console.log(e);
}

function ConvertData() {
    try {
        Tables = new Array();
        $.map(DeviceUsedData, function (obj, i) {
            Tables.push({
                name: i,
                Rows: obj,
            });
        });
        DeviceUsedTable['Tables'] = Tables;
    }
    catch (e) {
        console.log(e.message)
    }
}


