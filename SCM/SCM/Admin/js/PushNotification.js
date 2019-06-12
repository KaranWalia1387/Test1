var BrowserTable = {};
var databindtogrid;
var result;
var toDate, fromDate;
var zipcode = '', cityid = '', acctType = '';
var Tables, BrowserData;
var month1, year1, month2, year2;
var date11 = new Date();
var date22 = new Date();
var defopen = 1;
var length = '';
var Counttable;
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

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
            { name: 'CreatedDate' },
             { name: 'Pending', type: 'number' },
              { name: 'Success', type: 'number' },
            { name: 'Failure', type: 'number' },
            ],
            //async: false,
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
            pagesizeoptions: ['10', '20', '30', '40', '50', '100'],
            pagesize: 20,
            columnsresize: true,
            columnsreorder: true,
            columns:
            [
                { text: 'Created Date', dataField: 'CreatedDate', width: '25%', cellsformat: "dd MMMM, yyyy" },
                { text: 'Pending Messages', dataField: 'Pending', width: '25%', },
                { text: 'Delivered Messages', dataField: 'Success', width: '25%', },
                { text: 'Failed Messages', dataField: 'Failure', width: '25%', },
            ]
        });
    } catch (e) {
        console.log(e.message);
    }

}

function showHideDiv() {
    $('#chartDiv').show();
}

$(document).ready(function () {
    try {
        $('#jqxgrid').show();
        $('.grid-section_1').show();
        $('#nodata_div').hide();
      //  getDate();
        //$('#hdnParamValues').val(fromDate + '|' + toDate + '|' + cityid + '|' + zipcode + '|' + acctType);
        //var param = { 'Datefrom': fromDate, 'DateTo': toDate, 'cityid': cityid, 'ZipCode': zipcode, 'CustomerType': acctType };
        //   CallAjax(Error, param);
        submit();

        $('#btnFilter').click(function () {
            submit();//LoadFilterData();

        })
        $("#jqxgrid").bind('rowselect', function (event) {
            var row = event.args.rowindex;
            var datarow = $("#jqxgrid").jqxGrid('getrowdata', row);
            LoadChildGrid(datarow);
        });
    } catch (e) {
        console.log(e.message);
    }

});

function LoadChart() {
    var processed_jsonb3 = new Array();
    var processed_jsonb2 = new Array();
    var processed_jsonb1 = new Array();

   // databindtogrid = result.Table2;


    if (databindtogrid.length > 0) {
        $.map(result.Table2, function (obj, i) {
            processed_jsonb1.push({
                name: obj.CreatedDate.slice(0, -5),
                y: parseInt(obj.Pending),
            });
        });
    }


    //databindtogrid = result.Table3; //BrowserTable.Tables[3].Rows;
    if (databindtogrid.length > 0) {
        $.map(result.Table3, function (obj, i) {
            processed_jsonb2.push({
                name: obj.CreatedDate.slice(0, -5),
                y: parseInt(obj.Success),
            });
        });
    }

    //databindtogrid = result.Table4;//BrowserTable.Tables[4].Rows;
    if (databindtogrid.length > 0) {
        $.map(result.Table4, function (obj, i) {
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
            floating: false
        },
        xAxis: {
            // lineColor: '#999',
            // lineWidth: 1,
            formatter: function () {
                return this.value; // clean, unformatted number for year
            },
            type: "category",
            dateTimeLabelFormats: { // don't display the dummy year
                month: '%e. %b',
                year: '%b'
            },
            title: {
                //text: ''
                style: {
                    color: '#333333',
                    fontSize: '12px',
                }
            },
            labels: {

                enabled: true,
                rotation: -70,
                style: {
                    color: '#333333',
                    margin: "-20px",
                    fontSize: '10px',
                }
            },
        },
        yAxis: {
            allowDecimals: false,
            min: 0,
            maxPadding: 0.09,
            title: {
                text: 'Number of Push Notifications',
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
            useHTML: true,
            
            formatter: function () {
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
            name: 'Pending Messages',
            data: processed_jsonb1,
            showInLegend: true,
            color: colorarrHEX[2]


        }, {
            name: 'Delivered Messages',
            data: processed_jsonb2,
            showInLegend: true,
            color: colorarrHEX[3]
        },
        {

            name: 'Failed Messages ',
            data: processed_jsonb3,
            showInLegend: true,
            color: colorarrHEX[1]
        }
        ]
    });
}

function BindHeader() {   
    $('#lblRespondedMsg').text(Counttable[0]["MessageCount"]);
    $('#lblSuccessMsg').text(Counttable[1]["MessageCount"]);
    $('#lblFailureMsg').text(Counttable[2]["MessageCount"]);
    $('#lblTotalMsg').text(Counttable[3]["MessageCount"]);
}

//function getDate() {
//    var d = new Date();
//    var curr_date = d.getDate();
//    var curr_month = (d.getMonth() + 1);
//    var curr_year = d.getFullYear();
//    toDate = curr_month + 1 + "-" + curr_date + "-" + curr_year;
//    if (curr_date == 31) {
//        fromDate = curr_month + "-" + (curr_date - 1) + "-" + (curr_year);
//    }
//    else {
//        fromDate = curr_month + "-" + curr_date + "-" + (curr_year);
//    }

//}


//function LoadFilterData() {
//    try {

//        $('#jqxgrid').show();
//        $('.grid-section_1').show();
//        $('#nodata_div').hide();
//        fromDate = replace($('#txtDateFrom').val());
//        toDate = replace($('#txtDateTo').val());
//        var startDate = $('#txtDateFrom').val();
//        var endDate = $('#txtDateTo').val();
//        if (startDate != '' && endDate != '') {
//            if (Date.parse(startDate) > Date.parse(endDate)) {
//                $("#txtDateTo").val('');
//                alert("From date should not be greater than to date");
//                $("#txtDateTo").val("");
//                return false;
//            }
//        }

//        zipcode = ''; cityid = '';
//        if ($('#ddlCity option:selected').attr('key') == 'CityName') {
//            cityid = $('#ddlCity option:selected').val();
//        }
//        else if ($('#ddlCity option:selected').attr('key') == 'Zipcode') {
//            cityid = $('#ddlCity option:selected').attr('cityid');
//            zipcode = $('#ddlCity option:selected').val();

//        }
//        acctType = $('#ddlAccountType option:selected').val();
//        $('#hdnParamValues').val(fromDate + '|' + toDate + '|' + cityid + '|' + zipcode + '|' + acctType);
//        var param = { 'Datefrom': fromDate, 'DateTo': toDate, 'cityid': cityid, 'ZipCode': zipcode, 'CustomerType': acctType };
//        CallAjaxFilter(Error, param);

//    } catch (e) {
//        console.log(e.message);
//    }

//}

//function replace(text) {
//    var dateArr = text.split('/');
//    var val = dateArr[0] + '-' + dateArr[1] + '-' + dateArr[2];
//    return val;

//}

//function LoadChildGrid(row) {
//    try {
//        switch (row.BrowserName) {
//            case "Chrome":
//                databindtogrid = BrowserTable.Tables[3].Rows;
//                break;
//            case "Internet Explorer":
//                databindtogrid = BrowserTable.Tables[4].Rows;
//                break;
//        }

//        autoheightPrimary = false;
//        if (databindtogrid != null && databindtogrid.length == 0) {
//            $('#jqxgrid').hide();
//            $('#jqxchildgrid').hide();
//        }
//        else {
//            $('#nodata_div').hide();
//            $('#jqxgrid').hide();
//            $('#jqxchildgrid').show();

//        }
//        if (databindtogrid.length <= 10)
//            autoheightPrimary = true;
//        //Getting the source data with ajax GET request
//        source = {
//            datatype: "array",
//            datafields: [
//            { name: 'BMOnth' },
//                { name: 'TotalCount', type: 'number' },
//            ],
//            async: false,
//            record: 'Table',
//            sortable: true,
//            localdata: databindtogrid
//        };
//        var dataAdapter = new $.jqx.dataAdapter(source,
//            { contentType: 'application/json; charset=utf-8' }
//        );

//        $("#jqxchildgrid").jqxGrid({
//            width: "99%",
//            autoheight: autoheightPrimary,
//            height: "320",
//            source: dataAdapter,
//            sortable: true,
//            selectionmode: 'singlerow', //To trigger row select event

//            pageable: true,
//            pagesizeoptions: ['10', '20', '30', '40', '50'],
//            pagesize: 20,
//            columnsresize: true,
//            columnsreorder: true,
//            showtoolbar: true,
//            rendertoolbar: function (toolbar) {
//                var me = this;
//                var container = $("<div style='margin: 5px;'></div>");
//                toolbar.append(container);
//                container.append('<input id="Back" type="button" value="Back" />');
//                $("#Back").jqxButton();
//                $("#Back").on('click', function () {
//                    $('#jqxgrid').show();
//                    $('#jqxchildgrid').hide();
//                });
//            },
//            columns:
//            [
//                { text: 'Month', columngroup: 'BrowserName', dataField: 'BMOnth', width: '50%', },
//                { text: 'TotalCount', columngroup: 'BrowserName', dataField: 'TotalCount', width: '50%', },
//            ],
//            columngroups: [
//                        { text: row.BrowserName, align: 'center', name: 'BrowserName' }
//            ]
//        });
//    } catch (e) {
//        console.log(e.message);
//    }

//}

//function CallAjax(fnError, param) {
//    loader.showloader();
//    $.ajax({

//        type: "POST",
//        url: "Push-Notification.aspx/getData",
//        data: JSON.stringify(param),
//        //async: false,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        //data: { id: 'k' },
//        success: function (response, status, type) {
//            BrowserData = $.parseJSON(response.d);
//            ConvertData();
//            getusage_date_time();
//            //$('.usage_date_time').html('<b>' + month1 + ' ' + date11 + ',' + year1 + '-' + month2 + ' ' + date22 + ',' + year2 + '</b>');
//            var length = parseInt(BrowserTable.Tables[1].Rows.length);
//            if (length > 0) {
//                databindtogrid = BrowserTable.Tables[1].Rows;
//                var length = parseInt(BrowserTable.Tables[1].Rows.length);
//                LoadHeader();
//                LoadGrid();
//                LoadChart();

//            } else {
//                $('#nodata_div').show();
//                $('#jqxgrid').hide();
//                $('#graphdivarea').hide();
//            }
//            loader.hideloader();
//        },
//        error: fnError,
//    })

//}
//function CallAjaxFilter(fnError, param) {
//    loader.showloader();
//    $.ajax({

//        type: "POST",
//        url: "Push-Notification.aspx/getData",
//        data: JSON.stringify(param),
//        //async: false,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        //data: { id: 'k' },
//        success: function (response, status, type) {
//            BrowserData = $.parseJSON(response.d);

//            ConvertData();
//            getusage_date_time();
//            //$('.usage_date_time').html('<b>' + month1 + ' ' + date11 + ',' + year1 + '-' + month2 + ' ' + date22 + ',' + year2 + '</b>');
//            var length = parseInt(BrowserTable.Tables[1].Rows.length);
//            if (length > 0) {
//                databindtogrid = BrowserTable.Tables[1].Rows;
//                var length = parseInt(BrowserTable.Tables[1].Rows.length);
//                LoadHeader();
//                LoadGrid();
//                LoadChart();
//                if ($('.left-active-sprites ul li.graph a').hasClass('active')) {
//                    $('#graphdivarea').css('display', 'block');
//                    $('#tabledivarea').css('display', 'none');
//                }
//                else {
//                    $('#graphdivarea').css('display', 'none');
//                    $('#tabledivarea').css('display', 'block');
//                }
//            }
//            else {
//                $('#nodata_div').show();
//                $('#jqxgrid').hide();
//                $('.grid-section_1').hide();
//            }
//            loader.hideloader();
//        },
//        error: fnError,
//    })

//}

//function Error(e) {

//    console.log(e);
//}

function ConvertData() {
    try {

        Tables = new Array();
        $.map(BrowserData, function (obj, i) {
            Tables.push({
                name: i,
                Rows: obj,
            });
        });
        BrowserTable['Tables'] = Tables;
    }
    catch (e) {
        console.log(e.message)
    }
}

function getusage_date_time() {

    var startDate = $('#txtDateFrom').val();
    var endDate = $('#txtDateTo').val();
    var dsplit = endDate.split("/");
    var dateEnds = new Date(dsplit[2], dsplit[0] - 1, dsplit[1]);
    dsplit = startDate.split("/");
    var dateStarts = new Date(dsplit[2], dsplit[0] - 1, dsplit[1]);
    $('#lblCurrent').text(monthNames[dateEnds.getMonth()] + ' ' + dateEnds.getDate() + ', ' + dateEnds.getFullYear());
    $('#lblBefore').text(monthNames[dateStarts.getMonth()] + ' ' + dateStarts.getDate() + ', ' + dateStarts.getFullYear());

}


function submit() {
    try {
        var startDate = $('#txtDateFrom').val();
        var endDate = $('#txtDateTo').val();

        if (startDate != '' && endDate != '') {
            if (Date.parse(startDate) > Date.parse(endDate)) {
                $("#txtDateTo").val('');
                //  alert("From date should not be greater than to date");
                alert("'From Date' should not be greater than 'To date'");
                $("#txtDateTo").val("");
                return false;
            }
        }
        loader.showloader();      
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
        var param = {
            Datefrom: dtFrom,
            DateTo: dtTo,
            cityid: city,
            ZipCode: zip,
            CustomerType: ddlAccountType
        }
        $.ajax({
            type: "Post",
            url: "Push-Notification.aspx/getData",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(param),
            success: function (data) {
                loader.hideloader();
                data = data.d;
                result = $.parseJSON(data);
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
                Counttable = result.Table;
                databindtogrid = result.Table1;
                BindHeader();

                if (databindtogrid.length == 0) {
                    $(".grid-section").hide(); $('#jqxgrid').hide();
                    $('#jqxchildgrid').hide();
                    $('#nodata_div').show();
                }
                else {

                    $('#nodata_div').hide();
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
                    LoadChart();
                    LoadGrid();
                }
            },
            error: function (request, status, error) {
                //w2alert('Error!! ' + request.statusText); 
            }
        });

    }
    catch (e) {
    }
}