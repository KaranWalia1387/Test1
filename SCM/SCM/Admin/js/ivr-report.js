var defOpen = 1;
var TextMessageTable;
var databindtogrid;
gridid = 'jqxgrid';
var piechart = '';
var divId = 'chartDiv';
var mode = '';
var autoheightPrimary = false;
var Counttable;
var imagerenderer = function (row, datafield, value) {
    return getresult(row, value);
}
function getresult(row, value) {
    var cityId = $('#jqxgrid').jqxGrid('getrowdata', row).CityId;

    return '<div style="text-align: left;"><span id=' + cityId + ' class=filterdrop >' + value + '</span></div>';
}
function LoadGrid() {
    autoheightPrimary = false;
    //if (Counttable.length == 0) {
    //    $('#nodata_div').show();
    //}
    if (databindtogrid.length == 0) {
        $('#nodata_div').show();
    }

    //// databindtogrid = Counttable;    
    ////if (Counttable.length == 0) {
    ////    $('#nodata_div').show();        
    ////    $('#jqxgrid').hide();
    ////    $('#jqxchildgrid').hide();

    ////}
    ////else {
    ////    $('#nodata_div').hide();      
    ////    $('#jqxgrid').show();
    ////    $('#jqxchildgrid').hide();
    ////    $("#statusBill").attr('disabled', 'disabled');       

    ////}

    if (databindtogrid.length <= 10)
        autoheightPrimary = true;

    //if (Counttable.length <= 10)
    //    autoheightPrimary = true;

    //Getting the source data with ajax GET request
    var source = {
        datatype: "array",
        datafields: [
         { name: 'CreatedDate',type:'date' },
         { name: 'Pending', type: 'number' },
         { name: 'Success', type: 'number' },
         { name: 'Failure', type: 'number' },
         { name: 'Total', type: 'number' },
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid//Counttable
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    //if (Counttable.length > 0)
    if (databindtogrid.length > 0)
    {
        $("#btnExportPdf").removeAttr('disabled');
        $("#btnExportPdf").css('cursor', 'pointer');
    }
    else {
        $("#btnExportPdf").attr('disabled', 'disabled');
        $("#btnExportPdf").css('cursor', 'default');
    }
    var supportsOrientationChange = "onorientationchange" in window,
     orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
    window.addEventListener(orientationEvent, function () {
        var GridHeight = $(window).height() - 331;
        $("#jqxgrid").jqxGrid({ height: GridHeight });
        var modechild = ($('#ddlCity').val() != '') ? '2' : '1';
        if (modechild == 2) {
            $("#jqxchildgrid").jqxGrid({ height: GridHeight });
        }
    }, false);

    $("#jqxgrid").jqxGrid({
        width: "99.8%",
        //autoheight: autoheightPrimary,
        height: GridHeight * .79,
        columnsheight: 38,
        rowsheight: 34,
        theme: 'darkblue',
        altrows: true,
        source: dataAdapter,

        //theme: 'darkblue',
        sortable: true,
        selectionmode: 'singlerow', //To trigger row select event
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
        pagesize: 10,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [
            { text: 'Created Date', dataField: 'CreatedDate', width: '20%' , columntype:'date', cellsformat:'MM/dd/yyyy'},
            { text: 'Pending Messages', dataField: 'Pending', width: '20%' },
            { text: 'Delivered Messages', dataField: 'Success', width: '20%' },
            { text: 'Failed Messages', dataField: 'Failure', width: '20%' },
           { text: 'Total Messages', dataField: 'Total', width: '20%' }

        ]
    });
}

function LoadChildGrid() {
    autoheightPrimary = false;
    if (databindtogrid.length <= 10)
        autoheightPrimary = true;
    //Getting the source data with ajax GET request
    var source = {
        datatype: "array",
        datafields: [
         { name: 'CustomerName' },
         { name: 'CityName' },
         { name: 'ZipCode' },
         { name: 'AccountNumber', type: 'number' },
         { name: 'MobileNo' },
         { name: 'MessageStatus' },
         { name: 'CallStartTime', type: 'date' },
         { name: 'CallEndTime', type: 'date' },
         { name: 'CallBound' }
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    $("#jqxchildgrid").jqxGrid({
        width: "100%",
        autoheight: autoheightPrimary,
        height: "320",
        source: dataAdapter,

        theme: 'darkblue',
        sortable: true,
        selectionmode: 'singlerow', //To trigger row select event
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [
            { text: 'Customer Name', dataField: 'CustomerName', width: '15%' },
            { text: 'City Name', dataField: 'CityName', width: '15%' },
            { text: 'Zip Code', dataField: 'ZipCode', width: '10%' },
            { text: 'Account Number', dataField: 'AccountNumber', width: '15%' },
            { text: 'Mobile No', dataField: 'MobileNo', width: '15%' },
            { text: 'Message Status', dataField: 'MessageStatus', width: '20%' },

            { text: 'Call Start Time', dataField: 'CallStartTime', width: '20%', cellsformat: 'MM/dd/yyyy h:mm tt' },
            { text: 'Call End Time', dataField: 'CallEndTime', width: '20%', cellsformat: 'MM/dd/yyyy h:mm tt' },
            { text: 'Call Bound', dataField: 'CallBound', width: '15%' }


        ]
    });

    $("#jqxchildgrid").on('bindingcomplete', function () {
        if ($(window).width() < 1025) {
            $("#jqxchildgrid").jqxGrid('autoresizecolumns');
        }
    });
}

// NOT IN USE
function OLD_LoadGrid() {
    autoheightPrimary = false;
    if (databindtogrid.length <= 10)
        autoheightPrimary = true;
    //Getting the source data with ajax GET request
    var source = {
        datatype: "array",
        datafields: [
         { name: 'CustomerName' },
         { name: 'AccountNumber', type: 'number' },
         { name: 'MobileNo' },
         { name: 'Status', type: 'number' },
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

        width: "100%",
        autoheight: autoheightPrimary,
        height: "320",
        source: dataAdapter,

        theme: 'darkblue',
        sortable: true,
        selectionmode: 'singlerow', //To trigger row select event
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [
            { text: 'Customer Name', dataField: 'CustomerName' },
            { text: 'Account Number', dataField: 'AccountNumber', width: '12%' },
            { text: 'Mobile No', dataField: 'MobileNo' },
            { text: 'Status', dataField: 'Status' },
        ]
    });
}
function chartclick(name, chartType, drilldown, type) {
    var tabSecondary = TextMessageTable.Tables[2];
    var processed_json4 = new Array();
    if (drilldown.indexOf('city') > 0) {
        $.map(tabSecondary.Rows, function (obj, i) {
            if (name.replace(' ', '').trim().toLowerCase() == obj.CityName.replace(' ', '').trim().toLowerCase()) {
                processed_json4.push({
                    name: obj.Status,
                    y: parseInt(obj.UserCount),
                    color: obj.Status.toLowerCase() == 'pending' ? 'orange' : obj.Status.toLowerCase() == 'success' ? 'green' : 'red',
                    title: obj.Status
                });
            }
        });
    }
    else {
        $.map(tabSecondary.Rows, function (obj, i) {
            if (name.trim() == obj.ZipCode) {
                processed_json4.push({
                    name: obj.Status,
                    y: parseInt(obj.UserCount),
                    color: obj.Status.toLowerCase() == 'pending' ? 'orange' : obj.Status.toLowerCase() == 'success' ? 'green' : 'red',
                    title: obj.Status
                });
            }
        });
    }
    return processed_json4;
}
function PiechartCommon(mode, caseId) {

    var piechart = TextMessageTable.Tables[1];
    //To remove title if dates are blank
    var title;
    if ($('#txtDateFrom').val() != "" && $('#txtDateTo').val() != "")
        title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
    else
        title = "";
    //var title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
    $('#usagetitle').html(title);

    switch (parseInt(mode)) {
        case 0:
            processed_json = new Array();
            $.map(piechart.Rows, function (obj, i) {
                processed_json.push({
                    name: obj.CityName,
                    y: obj.UserCount,
                    color: colorarrHEX[i],
                    title: obj.CityName,
                    drilldown: 'status-city'
                });
            });
            break;
        case 1:
            var piechart = TextMessageTable.Tables[2];
            processed_json = new Array();
            $.map(piechart.Rows, function (obj, i) {
                processed_json.push({
                    name: obj.ZipCode,
                    y: obj.UserCount,
                    title: obj.ZipCode,
                    color: colorarrHEX[i],
                    drilldown: 'status-zipcode'
                });
            });
            break;
        case 3:
            var piechart = TextMessageTable.Tables[2];
            processed_json = new Array();
            $.map(piechart.Rows, function (obj, i) {
                processed_json.push({
                    name: obj.ZipCode,
                    y: obj.UserCount,
                    color: obj.Status.toLowerCase() == 'pending' ? 'orange' : obj.Status.toLowerCase() == 'success' ? 'green' : 'red',
                    title: obj.ZipCode
                });
            });
            break;
        case 2:
            var piechart = TextMessageTable.Tables[2];
            processed_json = new Array();
            $.map(piechart.Rows, function (obj, i) {
                processed_json.push({
                    name: obj.Status,
                    y: obj.UserCount,
                    color: obj.Status.toLowerCase() == 'pending' ? 'orange' : obj.Status.toLowerCase() == 'success' ? 'green' : 'red',
                    title: obj.Status
                });
            });

            break;
    }
    if (mode == 0 || mode == 1)
        createchart(caseId, divId, 'City'); //function writtion in common-function.js
    else
        createchart(caseId, divId);
}

$(document).ready(function () {

    $(window).resize(function () {
        try {
            if (gridid == 'jqxchildgrid') {
                if ($(window).width() < 1025)
                    $("#jqxchildgrid").jqxGrid('autoresizecolumns');
                else {
                    LoadChildGrid();
                }
            }
        }
        catch (e) { }
    });

    $('#nodata_div').hide();

    mode = 0;

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
        submit();
        chartgraphsection(defOpen);
    });

});
$(document).on("click", ".filterdrop", function () {
    var idCity = this.id;
    $('#ddlCity').val(idCity);
    var obj = $('#ddlCity option:selected');
    if (obj.index() > 0) {
        submit();
    }
    resizegrid();
});
function BindHeader() {
    try {
        var totalpending = 0;
        var totalsucess = 0;
        var totalfailure = 0;
        var totaldata = 0;
        if (Counttable != null) {
            for (var i = 0 ; i < Counttable.length; i++) {
                if (Counttable[i]["MessageStatus"] == "Pending")
                    totalpending += Counttable[i]["MessageCount"]
                if (Counttable[i]["MessageStatus"] == "Success")
                    totalsucess += Counttable[i]["MessageCount"]
                if (Counttable[i]["MessageStatus"] == "Failure")
                    totalfailure += Counttable[i]["MessageCount"]
                if (Counttable[i]["MessageStatus"] == "Total")
                    totaldata += Counttable[i]["MessageCount"]
            }
            $('#lblPending').text(totalpending);
            $('#lblFailure').text(totalfailure);
            $('#lblSuccess').text(totalsucess);
            $('#lbltotal').text(totaldata);
        }

    }
    catch (e) {
        console.log(e.message);
    }

}
function LoadChart() {
    var processed_jsonb1 = new Array();
    var processed_jsonb2 = new Array();
    var processed_jsonb3 = new Array();
    var month;
    var Year;
    //databindtogrid = TextMessagesTable.Tables[2].Rows;     
    if (databindtogrid.length > 0) {
        $.map(databindtogrid, function (obj, i) {
            processed_jsonb1.push({
                name: obj.CreatedDate.slice(0, -5),
                y: parseInt(obj.Pending),
            });
        });
    }
    //databindtogrid = TextMessagesTable.Tables[3].Rows;
    if (databindtogrid.length > 0) {
        $.map(databindtogrid, function (obj, i) {
            processed_jsonb2.push({
                name: obj.CreatedDate.slice(0, -5),
                y: parseInt(obj.Success),
            });
        });
    }

    //databindtogrid = TextMessagesTable.Tables[4].Rows;
    if (databindtogrid.length > 0) {
        $.map(databindtogrid, function (obj, i) {
            processed_jsonb3.push({
                name: obj.CreatedDate.slice(0, -5),
                y: parseInt(obj.Failure),
            });
        });
    }

    $('#chartDiv').highcharts({
        chart: {
            type: 'areaspline'
        },
        title: {
            text: ''
        },
        legend: {
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            //x: 350,
            //y: 100,
            //floating: true,
            //borderWidth: 1,
            x: 0,
            y: 0,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -70,
            },
        },
        yAxis: {
            allowDecimals: false,
            title: {
                text: 'Number of calls'
            }
        },
        tooltip: {
            
            shared: false,
           
            formatter: function () {
              //  return '<b>Date: </b>' + this.point.name + '<br/><b>' + this.series.name + ': ' + '</b>' + changetoK(Math.abs(this.y));
                return '<b>Date: </b>' + this.point.name + '<br/><b>' + this.series.name + ': ' + '</b>' + this.y;
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
                dataLabels: {
                    stacking: 'normal',

                    align: 'center',
                    rotation: -30,//#4867
                    // x: 0,//#4867
                    y: -7,//#4867
                    enabled: false,
                    formatter: function () {
                        if (this.y === 0) {
                            return null;
                        }
                        //return this.y;
                        // return (showindecimal == true || showindecimal == undefined || showindecimal == null) ? Highcharts.numberFormat(this.y, 2) : Highcharts.numberFormat(this.y, 0);
                        // return Highcharts.numberFormat(this.y);
                        return (changetoK(this.y));
                    },
                    style: {
                        color: 'black',
                        fontSize: '9px'
                    }

                }
              
            }
          
        },
        series: [{
            name: 'Pending Messages',
            data: processed_jsonb1,
            color: colorarrHEX[2]

        }, {
            name: 'Delivered Messages',
            data: processed_jsonb2,
            color: colorarrHEX[3]
        },
        {
            name: 'Failed Messages',
            data: processed_jsonb3,
            color: colorarrHEX[1]
        }]
    });
}
function submit() {
    try {
        var startDate = $('#txtDateFrom').val();
        var endDate = $('#txtDateTo').val();
        //For mutually Exclusive search Criteria
        //if (!isDate(startDate)) {
        //    alert('Invalid From date format,Please select/enter MM/DD/YYYY.');
        //    $('#txtDateFrom').focus();
        //    return false;
        //}

        //if (!isDate(endDate)) {
        //    alert('Invalid To Date format,Please select/enter MM/DD/YYYY. ');
        //    $('#txtDateTo').focus();
        //    return false;
        //}

        if (startDate != '' && endDate != '') {
            if (Date.parse(startDate) > Date.parse(endDate)) {
                $("#txtDateTo").val('');
                // alert("From date should not be greater than to date");
                alert("'From Date' should not be greater than 'To date'");
                $("#txtDateTo").val("");
                return false;
            }
        }
        loader.showloader();
        //if (ValidatePage('divFilter')) {
        var zip = '';
        var city = '';
        if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
            var ddlCity = $('#ddlCity option:selected');
            if ($(ddlCity).attr('key') == 'CityName') {
                city = $(ddlCity).val();
            }
            if ($(ddlCity).attr('key') == 'Zipcode') {
                zip = $(ddlCity).val();
            }
        }

        var dtFrom = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? '' : $('#txtDateFrom').val();
        var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : $('#txtDateTo').val();

        var ddlAccountType = ($('#ddlAccountType').val() == 'Account Type' || $('#ddlAccountType').val() == null || $('#ddlAccountType').val() == '') ? '' : $('#ddlAccountType').val();

        if ((city == '' && zip == '' && ddlAccountType == '')) {
            mode = 0;
        }
        else {
            mode = (city != '') ? 1 : 0;

            if (zip != '') {
                mode = 2;
            }

            if ((city != '' || zip != '') && ddlAccountType != '') {
                mode = 3;
            }
            else if (ddlAccountType != '') {
                mode = 3;
            }
        }

        // TextMessageTable = IVR.LoadGridData(dtFrom, dtTo, mode, city, zip, ddlMessageStatus).value;
        // databindtogrid = TextMessageTable.Tables[0].Rows;

        // $('#hdnParamValues').val(convertlocaltoutc(dtFrom) + '|' + convertlocaltoutc(dtTo) + '|' + mode + '|' + city + '|' + zip + '|' + ddlMessageStatus);
        // $('#hdnParamValues').val(dtFrom + '|' + dtTo + '|' + mode + '|' + city + '|' + zip + '|' + ddlMessageStatus);
        var param = {
            datefrom: dtFrom,
            dateto: dtTo,
            cityid: city,
            zip: zip,
            CustomerType: ddlAccountType
        }
        $.ajax({
            type: "Post",
            url: "IVR.aspx/LoadGridData",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(param),
            success: function (data) {
                loader.hideloader();
                data = data.d;
                var result = $.parseJSON(data);
                $('#hdnParamValues').val(dtFrom + '|' + dtTo + '|' + city + '|' + zip + '|' + ddlAccountType);
                if (result != null) {
                    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

                    if (startDate != '' && endDate != '') {
                        var dsplit = endDate.split("/");
                        var dateEnds = new Date(dsplit[2], dsplit[0] - 1, dsplit[1]);
                        dsplit = startDate.split("/");
                        var dateStarts = new Date(dsplit[2], dsplit[0] - 1, dsplit[1]);
                        $('#To_Date').text(months[dateEnds.getMonth()] + ' ' + dateEnds.getDate() + ', ' + dateEnds.getFullYear());
                        $('#From_Date').text(months[dateStarts.getMonth()] + ' ' + dateStarts.getDate() + ', ' + dateStarts.getFullYear());
                    }
                }
                //Counttable = result.Table1;
                Counttable = result.Table;
                databindtogrid = result.Table1;
                BindHeader();

                if (databindtogrid.length == 0) {
                    $(".grid-section").hide(); $('#jqxgrid').hide();
                    $('#jqxchildgrid').hide();
                    $('#nodata_div').show();
                }
                else {
                    $('#jqxgrid').show();
                    $('#nodata_div').hide(); //$('#jqxchildgrid').show();
                    $(".grid-section").show();
                    var name = $('.left-active-sprites ul li a.active').closest('li').attr('class');
                    if (name == "chart") {
                        $("#chartDiv").hide();
                        $("#graphDiv").show();
                    }
                    else {
                        $("#chartDiv").show();
                        $("#graphDiv").hide();
                    }
                    gridid = 'jqxgrid';
                    //chartgraphsection(defOpen);
                    //$('#nodata_div').hide();                                  
                    //$('#jqxgrid').show();
                    //$('#graphdivarea').show();
                    //gridid = 'jqxgrid';
                    LoadChart();
                    LoadGrid();
                }
            },
            error: function (request, status, error) {
                //w2alert('Error!! ' + request.statusText); 
            }
        });

        //if (databindtogrid.length != 0) {
        //    if (mode == '0') {
        //        $('#jqxgrid').show();
        //        $('#jqxchildgrid').hide();
        //        $('#usagetitle').show();
        //        $('#div-TextMessagechart').show();
        //        $('#nodata_div').hide();
        //        $('#nodata_div1').hide();
        //    }
        //    else {
        //        $('#jqxgrid').hide();
        //        $('#jqxchildgrid').show();
        //        $('#usagetitle').show();
        //        $('#div-TextMessagechart').show();
        //        $('#nodata_div').hide();
        //        $('#nodata_div1').hide();
        //    }
        //}
        //else {
        //    $('#jqxgrid').hide();
        //    $('#jqxchildgrid').hide();
        //    $('#nodata_div').html('<font color="Red">No Data</font>');
        //    $('#nodata_div').show();
        //    $('#nodata_div1').html('<font color="Red">No Data</font>');
        //    $('#nodata_div1').show();
        //    $('#usagetitle').hide();
        //    $('#div-TextMessagechart').hide();

        //    return;
        //}

        //if (mode > 0) {

        //    if (databindtogrid.length <= 10) { autoheightPrimary = true; }

        //    $('#jqxgrid').hide();
        //    $('#jqxchildgrid').show();
        //    gridid = 'jqxchildgrid';
        //    LoadChildGrid();
        //    PiechartCommon(mode);
        //}
        //else {
        //    $('#jqxgrid').show();
        //    $('#jqxchildgrid').hide();
        //    gridid = 'jqxgrid';
        //    PiechartCommon(mode);
        //    LoadGrid();

        //}

        //    return true;
        //}
        //else { return false; }
    }
    catch (e) {
    }
}

