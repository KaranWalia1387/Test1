var BrowserTable = {};
var databindtogrid;
var toDate, fromDate;
var zipcode = '', cityid = '', acctType='';
var Tables,BrowserData;
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
            { name: 'BrowserName' },
            { name: 'TotalCount', type: 'number' },
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
            pagesize: 20,
            columnsresize: true,
            columnsreorder: true,
            columns:
            [
                { text: 'Browser Name', dataField: 'BrowserName', width: '50%', },
                { text: 'Customers', dataField: 'TotalCount', width: '50%', },
            ]
        });
    } catch (e) {
        setTimeout(function () {
            loader.hideloader();

        }, 2000);
        console.log(e.message);
    }

}


$(document).ready(function () {
    try {
        loader.showloader();
        $('#jqxgrid').show();
        $('.grid-section_1').show();
        $('#nodata_div').hide();
        

        fromDate = replace($('#txtDateFrom').val());
        toDate = replace($('#txtDateTo').val());
        //loader.showloader();
        $('#hdnParamValues').val(fromDate + '|' + toDate + '|' + cityid + '|' + zipcode + '|' + acctType);
        // BrowserTable = Browser_Used.getData(fromDate, toDate, cityid, zipcode, acctType);
        var param = { 'Datefrom': fromDate, 'DateTo': toDate, 'cityid': cityid, 'ZipCode': zipcode, 'CustomerType': acctType };
       
        CallAjax(Error, param);
        ConvertData();
        if (BrowserTable.Tables[0].Rows[0]['TotalCount'] > 0) {
            databindtogrid = BrowserTable.Tables[1].Rows;
            var length = parseInt(BrowserTable.Tables[2].Rows.length);
            //   $('.usage_date_time').html('<b>' + ConvertDate(fromDate) + '-' + ConvertDate(toDate) + '</b>');for bugid
            
            LoadHeader();
            LoadGrid();
            LoadChart();
        } else {
            $('#nodata_div').show();
            $('#jqxgrid').hide();
            $('#chartDiv').hide();
            $('#jqxchildgrid').hide();


        }
       //loader.hideloader();
        $('#btnFilter').click(function () {
            
            LoadFilterData();
            chartgraphsection(defOpen);
        })
        $("#jqxgrid").bind('rowselect', function (event) {
            var row = event.args.rowindex;
            var datarow = $("#jqxgrid").jqxGrid('getrowdata', row);
            if (datarow.TotalCount > 0) {
                LoadChildGrid(datarow);
            }
            $("#jqxgrid").jqxGrid('rowunselect', row);
        });
        setTimeout(function () {
            loader.hideloader();

        }, 2000);
    } catch (e) {
        setTimeout(function () {
            loader.hideloader();

        }, 2000);
        console.log(e.message);
    }
});

function LoadChart() {
    try {
        var processed_jsonb2 = new Array();
        var processed_jsonb1 = new Array();
        var processed_jsonb3 = new Array();
        var processed_jsonb4 = new Array();
        var DateTable = BrowserTable.Tables[3].Rows
        databindtogrid = BrowserTable.Tables[5].Rows;


        if (databindtogrid.length > 0) {
            $.map(databindtogrid, function (obj, i) {

                processed_jsonb1.push({
                    name: obj.BMonth.slice(0, -5),
                    y: obj.TotalCount == "0" ? null : parseInt(obj.TotalCount),
                });

            });
        }
        databindtogrid = BrowserTable.Tables[6].Rows;
        if (databindtogrid.length > 0) {
            $.map(databindtogrid, function (obj, i) {
                processed_jsonb2.push({
                    name: obj.BMonth.slice(0, -5),
                    y: obj.TotalCount == "0" ? null : parseInt(obj.TotalCount),
                });
            });
        }
        databindtogrid = BrowserTable.Tables[4].Rows;
        if (databindtogrid.length > 0) {
            $.map(databindtogrid, function (obj, i) {

                processed_jsonb4.push({
                    name: obj.BMonth.slice(0, -5),
                    y: obj.TotalCount == "0" ? null : parseInt(obj.TotalCount),
                });

            });
        }
        databindtogrid = BrowserTable.Tables[7].Rows;
        if (databindtogrid.length > 0) {
            $.map(databindtogrid, function (obj, i) {

                processed_jsonb3.push({
                    name: obj.BMonth.slice(0, -5),
                    y: obj.TotalCount == "0" ? null : parseInt(obj.TotalCount),
                });

            });
        }

        $('#chartDiv').highcharts({
            chart: {
                type: 'areaspline'
            },
            title: {
                text: null,
            },
            legend: {
                layout: 'horizontal',
                align: 'right',
                verticalAlign: 'top',
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
                    text: 'Number of Users'
                },
                labels: {
                    enabled: true,
                }
            },

            tooltip: {
                shared: false,
                formatter: function () {
                   // return '<b>Date: </b>' + this.point.name + '<br/><b>' + this.series.name + ': </b>' + changetoK(Math.abs(this.y)) + ' users';
                    return '<b>Date: </b>' + this.point.name + '<br/><b>' + this.series.name + ': </b>' +this.y + ' users';
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
                        rotation: -30,
                        y: -7,//#4867
                        enabled: false,
                        formatter: function () {
                            if (this.y === 0) {
                                return null;
                            }
                            //return this.y;
                            // return (showindecimal == true || showindecimal == undefined || showindecimal == null) ? Highcharts.numberFormat(this.y, 2) : Highcharts.numberFormat(this.y, 0);
                            return Highcharts.numberFormat(this.y,0);
                        },
                        style: {
                            color: 'black',
                            fontSize: '9px'
                        }

                    },

                }
            },
            series: [{
                name: 'Chrome',
                data: processed_jsonb1,
                color: colorarrHEX[1]     //'#FFA9A9'
            }, {

                name: 'Firefox',
                data: processed_jsonb2,
                color: colorarrHEX[0]    //'#333333'

            }, 
            
             {
                 name: 'Internet Explorer',
                 data: processed_jsonb3,
                 color: colorarrHEX[3]
             }, {
                 name: 'Safari',
                 data: processed_jsonb4,
                 color: colorarrHEX[2]
             }]
        });
    } catch (e) {
        setTimeout(function () {
            loader.hideloader();

        }, 2000);
        console.log(e.message);
    }
}


// to load the header of  page
function LoadHeader() {
    try{
        $.each(databindtogrid, function (key, value) {
            switch (value["BrowserName"]) {
                case "Chrome":
                    $('#demandusageval').text(value["TotalCount"]);
                    break;
                case "Internet Explorer":
                    $('#IE').text(value["TotalCount"]);
                    break;
                case "Firefox":
                    $('#Mozilla').text(value["TotalCount"]);
                    break;
                case "Safari":
                    $('#Safari').text(value["TotalCount"]);
                    break;
            }
        })
    } catch (e) {
        setTimeout(function () {
            loader.hideloader();

        }, 2000);
        console.log(e.message);
    }
   
}




function LoadFilterData() {
    try {
        $('#jqxgrid').show();
        $('.grid-section_1').show();
        $('#nodata_div').hide();
        fromDate = replace($('#txtDateFrom').val());
        toDate = replace($('#txtDateTo').val());
        var startDate = $('#txtDateFrom').val();
        var endDate = $('#txtDateTo').val();
        if (startDate != '' && endDate != '') {
            if (Date.parse(startDate) > Date.parse(endDate)) {
                $("#txtDateTo").val('');
                //alert("From date should not be greater than to date");
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
        loader.showloader();
        acctType = $('#ddlAccountType option:selected').val();
        $('#hdnParamValues').val(fromDate + '|' + toDate + '|' + cityid + '|' + zipcode + '|' + acctType);
       
        var param = { 'Datefrom': fromDate, 'DateTo': toDate, 'cityid': cityid, 'ZipCode': zipcode, 'CustomerType': acctType };
        CallAjax(Error, param);
        ConvertData();
        if (BrowserTable.Tables[0].Rows[0]['TotalCount'] > 0) {
            databindtogrid = BrowserTable.Tables[1].Rows;
            var length = parseInt(BrowserTable.Tables[2].Rows.length);
           // $('.usage_date_time').html('<b>' + ConvertDate(fromDate) + '-' + ConvertDate(toDate) + '</b>');
            $('.grid-section').show();
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
            resetHeader();
            LoadHeader();
            LoadGrid();
            LoadChart();
           
        }
        else {
            $('#nodata_div').show();
            $('#jqxgrid').hide();
            $('.grid-section').hide();
            $('#jqxchildgrid').hide();
            resetHeader()
        }
        setTimeout(function () {
            loader.hideloader();

        }, 2000);
    } catch (e) {

        setTimeout(function () {
            loader.hideloader();

        }, 2000);
        console.log(e.message);
    }

}

function replace(text) {
    var dateArr = text.split('/');
    var val = dateArr[0] + '-' + dateArr[1] + '-' + dateArr[2];
    return val;

}

// this function is called on clicking the row of main grid 
// to load the date specific data of corresponding browser
function LoadChildGrid(row) {
    try{
        switch (row.BrowserName) {
            case "Chrome":
                databindtogrid = BrowserTable.Tables[5].Rows;
                break;
            case "Internet Explorer":
                databindtogrid = BrowserTable.Tables[4].Rows;
                break;
            case "Firefox":
                databindtogrid = BrowserTable.Tables[6].Rows;
                break;
            case "safari":
                databindtogrid = BrowserTable.Tables[7].Rows;
                break;
        }

        autoheightPrimary = false;
        if (databindtogrid!=null && databindtogrid.length == 0) {
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
            { name: 'BMonth' },
                { name: 'TotalCount', type: 'number' },
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
            width: "99.8%",
            height: GridHeight * .79,
            columnsheight: 38,
            altrows: true,
            rowsheight: 34,
           // autoheight: autoheightPrimary,
            //height: "320",
            source: dataAdapter,
            sortable: true,
            selectionmode: 'singlerow', //To trigger row select event

            pageable: true,
            pagesizeoptions: ['10', '20', '30', '40', '50','100'],
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
                { text: 'Month', columngroup: 'BrowserName',dataField: 'BMonth', width: '50%', },
                { text: 'Customers', columngroup: 'BrowserName', dataField: 'TotalCount', width: '50%', },
            ],
            columngroups: [
                        { text: row.BrowserName, align: 'center', name: 'BrowserName' }
            ]
        });
    } catch (e) {
        setTimeout(function () {
            loader.hideloader();

        }, 2000);
        console.log(e.message);
    }

}

// ajax module 
function CallAjax(fnError, param) {
    var startDate = $('#txtDateFrom').val();
    var endDate = $('#txtDateTo').val();
    var dsplit = endDate.split("/");
    var dateEnds = new Date(dsplit[2], dsplit[0] - 1, dsplit[1]);
    dsplit = startDate.split("/");
    var dateStarts = new Date(dsplit[2], dsplit[0] - 1, dsplit[1]);
    $('#lblCurrent').text(monthNames[dateEnds.getMonth()] + ' ' + dateEnds.getDate() + ', ' + dateEnds.getFullYear());
    $('#lblBefore').text(monthNames[dateStarts.getMonth()] + ' ' + dateStarts.getDate() + ', ' + dateStarts.getFullYear());
    $.ajax({
        type:"POST",
        url:"Browser-Used.aspx/getData",
        data:JSON.stringify(param),
        async:false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //data: { id: 'k' },
        success: function (response, status, type) {
            BrowserData = $.parseJSON(response.d);
        },
        error: fnError,
         })

}

function Error(e) {
    setTimeout(function () {
        loader.hideloader();

    }, 2000);
    console.log(e);
}

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
        setTimeout(function () {
            loader.hideloader();

        }, 2000);
        console.log(e.message)
    }
}
// this function convert date to 'MM dd, yy' from any format of date
function ConvertDate(date) {
       var dateFormat = $.datepicker.formatDate('MM dd, yy', new Date(date));
    return dateFormat;
}

function resetHeader() {
    $('#demandusageval').text("0");
    $('#Mozilla').text("0");
    $('#IE').text("0");
    $('#Safari').text("0");

}


