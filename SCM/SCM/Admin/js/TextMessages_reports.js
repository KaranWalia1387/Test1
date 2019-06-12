var TextMessagesTable = {};
var databindtogrid, HeaderTable;
var toDate, fromDate;
var zipcode = '', cityid = '', acctType = '';
var Tables, TextMessageData;
var mode = '';
var monthNames = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var defOpen = 1;
var result;

function LoadGrid() {
    try {
        autoheightPrimary = false;

        if (databindtogrid.length <= 10)
            autoheightPrimary = true;
        //Getting the source data with ajax GET request
        var source = {
            datatype: "array",
            datafields: [
            { name: 'CreatedDate' },
             { name: 'Pending', type: 'number' },
                { name: 'Success', type: 'number' },
                   { name: 'Failure', type: 'number' },
                       { name: 'Total', type: 'number' }
            ],
            async: false,
            record: 'Table',
            sortable: true,
            localdata: databindtogrid
        };
        var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

        if (databindtogrid.length > 0) {
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
            sortable: true,
            selectionmode: 'singlerow', //To trigger row select event
            pageable: true,
            pagesizeoptions: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
            pagesize: 10,
            columnsresize: true,
            columnsreorder: true,
            columns:
            [
                { text: 'Created Date', dataField: 'CreatedDate', width: '20%' },
                { text: 'Pending Messages', dataField: 'Pending', width: '20%' },
                { text: 'Delivered Messages', dataField: 'Success', width: '20%' },
                { text: 'Failed Messages', dataField: 'Failure', width: '20%' },
                 { text: 'Total Messages', dataField: 'Total', width: '20%' }
            ]
        });
    } catch (e) {
        console.log(e.message);
    }

}

$(document).ready(function () {
    try {

        $('#jqxgrid').show();
        $('.grid-section_1').show();
        $('#nodata_div').hide();
        getDate();
        mode = 0;
        //$('#hdnParamValues').val(fromDate + '|' + toDate + '|' + cityid + '|' + zipcode + '|' + acctType);
        //var param = { 'datefrom': fromDate, 'dateto': toDate, 'cityid': cityid, 'zip': zipcode, 'messageStatus': acctType };
        CallAjax();

        $('#btnFilter').click(function () {
            CallAjax();
            chartgraphsection(defOpen);
        })
        //$("#jqxgrid").bind('rowselect', function (event) {
        //    var row = event.args.rowindex;
        //    var datarow = $("#jqxgrid").jqxGrid('getrowdata', row);
        //    LoadChildGrid(datarow);
        //});

    } catch (e) {
        // loader.hideloader();
        console.log(e.message);
    }
});

function LoadChart() {
    var processed_jsonb1 = new Array();
    var processed_jsonb2 = new Array();
    var processed_jsonb3 = new Array();
    var month;
    var Year;
    result = TextMessagesTable.Tables[1].Rows;

    if (result.length > 0) {
        $.map(result, function (obj, i) {
            processed_jsonb1.push({
                name: obj.CreatedDate.slice(0, -5),
                y: parseInt(obj.Pending),
            });
        });
    }
    result = TextMessagesTable.Tables[4].Rows;
    if (result.length > 0) {
        $.map(result, function (obj, i) {
            processed_jsonb2.push({
                name: obj.CreatedDate.slice(0, -5),
                y: parseInt(obj.Success),
            });
        });
    }

    result = TextMessagesTable.Tables[5].Rows;
    if (result.length > 0) {
        $.map(result, function (obj, i) {
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
                text: 'Number of Messages'
            }
        },
        tooltip: {
            shared: false,
            
            useHTML: true,
           
            formatter: function () {
               // return '<b>Date: </b>' + this.point.name + '<br/><b>' + this.series.name + ': </b>' + changetoK(Math.abs(this.y));
                return '<b>Date: </b>' + this.point.name + '<br/><b>' + this.series.name + ': </b>' + this.y;
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
            series:{               
                dataLabels: {
                    stacking: 'normal',

                    align: 'center',
                    rotation: -30,//#4867
                    // x: 0,//#4867
                    y: -7,//#4867
                    enabled: false,
                    formatter: function () {
                        return parseInt(this.y);
                    },
                    style: {
                        color: 'black',
                        fontSize: '9px'
                    }
                },

            }
        },
        series: [{
            name: 'Pending Messages',
            data: processed_jsonb1,
            color: colorarrHEX[2],

        }, {
            name: 'Delivered Messages',
            data: processed_jsonb2,
            color: colorarrHEX[3],
        },
        {
            name: 'Failed Messages',
            data: processed_jsonb3,
            color: colorarrHEX[1],
        }]
    });

}

function LoadHeader() {
    //if (parseInt(HeaderTable[0]["MessageCount"]) > 0) {
        $('#demandusageval').text(HeaderTable[0]["MessageCount"]);
        $('#Success').text(HeaderTable[1]["MessageCount"]);
        $('#Failure').text(HeaderTable[2]["MessageCount"]);
        $('#Total').text(HeaderTable[3]["MessageCount"]);
   // }
    //else {
    //    $('#demandusageval').text(0);
    //    $('#Success').text(0);
    //    $('#Failure').text(0);
    //    $('#Total').text(0);
    //}

}

function getDate() {

    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = (d.getMonth() + 1);
    var curr_year = d.getFullYear();
    toDate = curr_month + 1 + "-" + curr_date + "-" + curr_year;
    if (curr_date == 31) {
        fromDate = curr_month + "-" + (curr_date - 1) + "-" + (curr_year);
    }
    else {
        fromDate = curr_month + "-" + curr_date + "-" + (curr_year);
    }

}

function replace(text) {
    var dateArr = text.split('/');
    var val = dateArr[0] + '-' + dateArr[1] + '-' + dateArr[2];
    return val;

}

function LoadChildGrid(row) {
    try {
        switch (row.MessageStatus) {
            case "Pending":
                databindtogrid = TextMessagesTable.Tables[3].Rows;
                break;
            case "Success":
                databindtogrid = TextMessagesTable.Tables[4].Rows;
                break;
            case "Failure":
                databindtogrid = TextMessagesTable.Tables[5].Rows;
                break;
        }

        autoheightPrimary = false;
        if (databindtogrid != null && databindtogrid.length == 0) {
            $('#jqxgrid').hide();
            $('#jqxchildgrid').hide();
        }
        else {
            $('#nodata_div').hide();
            $('#jqxgrid').hide();
            $('#jqxchildgrid').show();

        }
        if (databindtogrid.length <= 10)
            autoheightPrimary = true;
        //Getting the source data with ajax GET request
        source = {
            datatype: "array",
            datafields: [
            { name: 'MessageStatus' },
                { name: 'MessageCount', type: 'number' },
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
            sortable: true,
            selectionmode: 'singlerow', //To trigger row select event

            pageable: true,
            pagesizeoptions: ['10', '20', '30', '40', '50', '100'],
            pagesize: 20,
            columnsresize: true,
            columnsreorder: true,
            showtoolbar: true,
            rendertoolbar: function (toolbar) {
                var me = this;
                var container = $("<div style='margin: 5px;'></div>");
                toolbar.append(container);
                container.append('<input id="Back" type="button" value="Back" />');
                $("#Back").jqxButton();
                $("#Back").on('click', function () {
                    $('#jqxgrid').show();
                    $('#jqxchildgrid').hide();
                });
            },
            columns:
            [
                { text: 'Message Status', dataField: 'MessageStatus' },
                { text: 'Message Count', dataField: 'MessageCount', width: '10%' },
            ],
            columngroups: [
                        { text: row.MessageStatus, align: 'center', name: 'MessageStatus' }
            ]
        });
    } catch (e) {
        console.log(e.message);
    }

}

function CallAjax() {
    loader.showloader();
    var startDate = $('#txtDateFrom').val();
    var endDate = $('#txtDateTo').val();
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


    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    if (startDate != '' && endDate != '') {
        var dsplit = endDate.split("/");
        var dateEnds = new Date(dsplit[2], dsplit[0] - 1, dsplit[1]);
        dsplit = startDate.split("/");
        var dateStarts = new Date(dsplit[2], dsplit[0] - 1, dsplit[1]);
        $('#lblCurrent').text(months[dateEnds.getMonth()] + ' ' + dateEnds.getDate() + ', ' + dateEnds.getFullYear());
        $('#lblBefore').text(months[dateStarts.getMonth()] + ' ' + dateStarts.getDate() + ', ' + dateStarts.getFullYear());
    }
    $('#hdnParamValues').val(dtFrom + '|' + dtTo + '|' + city + '|' + zip + '|' + ddlAccountType);
    var param = {
        datefrom: dtFrom,
        dateto: dtTo,
        cityid: city,
        zip: zip,
        messageStatus: ddlAccountType
    }
    $.ajax({
        type: "POST",
        url: "TextMessages.aspx/LoadGridData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(param),
        success: function (data) {
            data = data.d;
            TextMessageData = $.parseJSON(data);
            loader.hideloader();
            if (startDate != '' && endDate != '') {
                if (Date.parse(startDate) > Date.parse(endDate)) {
                    $("#txtDateTo").val('');
                    // alert("From date should not be greater than to date");
                    alert("'From Date' should not be greater than 'To date'");
                    $("#txtDateTo").val("");
                    return false;
                }
            }
            ConvertData();
            if (TextMessagesTable.Tables[1].Rows.length > 0) {
                databindtogrid = TextMessagesTable.Tables[1].Rows;
                HeaderTable = TextMessagesTable.Tables[0].Rows;
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
                //var length = parseInt(TextMessagesTable.Tables[2].Rows.length);
                //$('.usage_date_time').html('<b>' + TextMessagesTable.Tables[1].Rows[0] + '-' + TextMessagesTable.Tables[1].Rows[length - 1].BMOnth + '</b>');
                LoadHeader();
                LoadGrid();
                LoadChart();

            } else {
                $(".grid-section").hide();
                $('#nodata_div').show();
                $('#jqxgrid').hide(); $('#jqxchildgrid').hide();
                // $('#graphdivarea').hide();
                HeaderTable = TextMessagesTable.Tables[0].Rows;
                LoadHeader();
            }
            loader.hideloader();
        },
        error: function (request, status, error) {
            //w2alert('Error!! ' + request.statusText); 
        }
    })

}

function Error(e) {

    console.log(e);
}

function ConvertData() {
    try {
        Tables = new Array();
        $.map(TextMessageData, function (obj, i) {
            Tables.push({
                name: i,
                Rows: obj,
            });
        });
        TextMessagesTable['Tables'] = Tables;
    }
    catch (e) {
        console.log(e.message)
    }
}