var OnlinePaymentTable = {};
var databindtogrid;
var toDate, fromDate;
var zipcode = '', cityid = '', acctType = '';
var month1, year1, month2, year2;
var date11 = new Date();
var date22 = new Date();
var length = '';
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var Tables, BrowserData;
Date.prototype.getMonthName = function () {

    return this.monthNames[this.getMonth()];
};
Date.prototype.getShortMonthName = function () {

    return this.getMonthName().substr(0, 3);
};

$(document).ready(function () {
    try {

        $('#jqxgrid').show();
        $('.grid-section_1').show();
        $('#nodata_div').hide();
        getDate();
        //$('#hdnParamValues').val(fromDate + '|' + toDate + '|' + cityid + '|' + zipcode + '|' + acctType);
        //var param = {
        //    Datefrom: fromDate,
        //    DateTo: toDate,
        //    cityid: cityid,
        //    ZipCode: zipcode,
        //    CustomerType: acctType

        //}

        
        //$('.usage_date_time').html('<b>' + month1 + ' ' + date11 + ',' + year1 + '-' + month2 + ' ' + date22 + ',' + year2 + '</b>');
        CallAjax();
        $('#btnFilter').click(function () {

            LoadFilterData();

        })
       /* $("#jqxgrid").bind('rowselect', function (event) {
            var row = event.args.rowindex;
            var datarow = $("#jqxgrid").jqxGrid('getrowdata', row);
            LoadChildGrid(datarow);

        });*/
    } catch (e) {
        console.log(e.message);
    }
});

$('#btnFilter').click(function () {

    LoadFilterData();

})
$("#jqxgrid").bind('rowselect', function (event) {
    var row = event.args.rowindex;
    var datarow = $("#jqxgrid").jqxGrid('getrowdata', row);
    LoadChildGrid(datarow);
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
            { name: 'TransactionDate' },
            { name: 'PaymentCount', type: 'number' },
            ],
            // async: false,
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
                { text: 'Transaction Date', dataField: 'TransactionDate', width: '50%', },
                { text: 'Online Payment Count', dataField: 'PaymentCount', width: '50%', },
            ]
        });
    } catch (e) {
        console.log(e.message);
    }

}

function LoadChart() {

    var processed_jsonb1 = new Array();
    databindtogrid = OnlinePaymentTable.Tables[1].Rows;


    if (databindtogrid.length > 0) {
        $.map(databindtogrid, function (obj, i) {
            processed_jsonb1.push({
                name: obj.TransactionDate.slice(0, -5),
                y: parseInt(obj.PaymentCount),
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
            maxPadding: 0.09,
            title: {
                text: 'Number of Payments',
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
                //return '<b>Date: </b>' + this.point.name + '<br/><b>' + this.series.name + ': </b>' + changetoK(Math.abs(this.y));
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
            name: 'Online Payment Count',
            data: processed_jsonb1,
            showInLegend: true,
            color: colorarrHEX[0]
        }]

    });
}

function LoadHeader() {
    var databill = OnlinePaymentTable.Tables[0].Rows;
    $('#lblTotalBill').text(databill[0].TotalBill);
    $('#lblBillPaid').text(databill[0].BillPaid);
    var totalTrans = 0;
    for (i = 0; i < OnlinePaymentTable.Tables[1].Rows.length; i++)
    {
        totalTrans += OnlinePaymentTable.Tables[1].Rows[i].PaymentCount;
    }
    $('#lbltotalTrans').text(totalTrans);
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

//function getusage_date_time() {
//    var startDate = $('#txtDateFrom').val();
//    var endDate = $('#txtDateTo').val();
//    var dsplit = endDate.split("/");
//    var dateEnds = new Date(dsplit[2], dsplit[0] - 1, dsplit[1]);
//    dsplit = startDate.split("/");
//    var dateStarts = new Date(dsplit[2], dsplit[0] - 1, dsplit[1]);
//    $('#lblCurrent').text(monthNames[dateEnds.getMonth()] + ' ' + dateEnds.getDate() + ', ' + dateEnds.getFullYear());
//    $('#lblBefore').text(monthNames[dateStarts.getMonth()] + ' ' + dateStarts.getDate() + ', ' + dateStarts.getFullYear());
//    //date11 = new Date(fromDate);
//    //month1 = monthNames[date11.getMonth()];
//    //year1 = date11.getFullYear();
//    //date11 = date11.getDate();
//    //date22 = new Date(toDate.toString());
//    //month2 = monthNames[date22.getMonth()];
//    //year2 = date22.getFullYear();
//    //date22 = date22.getDate();
//}

function LoadFilterData() {
    try {
        loader.showloader();
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
                // alert("From date should not be greater than to date");
                alert("'From Date' should not be greater than 'To date'");
                $("#txtDateTo").val("");
                loader.hideloader();
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
        var param = {
            Datefrom: fromDate,
            DateTo: toDate,
            cityid: cityid,
            ZipCode: zipcode,
            CustomerType: acctType

        }
        CallAjax(Error, param);

        //ConvertData();
        //getusage_date_time();
        //$('.usage_date_time').html('<b>' + month1 + ' ' + date11 + ',' + year1 + '-' + month2 + ' ' + date22 + ',' + year2 + '</b>');
        //if (OnlinePaymentTable.Tables[1].Rows.length > 0) {
        //    databindtogrid = OnlinePaymentTable.Tables[1].Rows;

        //    LoadHeader();
        //    LoadChart();
        //    //loader.hideloader();
        //    LoadGrid();

        //}
        //else {
        //    $('#nodata_div').show();
        //    $('#jqxgrid').hide();
        //    $('.grid-section_1').hide();
        //}
        //loader.hideloader();
    } catch (e) {
        console.log(e.message);
    }

}

function replace(text) {
    var dateArr = text.split('/');
    var val = dateArr[0] + '-' + dateArr[1] + '-' + dateArr[2];
    return val;

}

function LoadChildGrid(row) {
    switch (row.BrowserName) {
        case "Chrome":
            databindtogrid = OnlinePaymentTable.value.getTable("Table3").Rows;
            break;
        case "Internet Explorer":
            databindtogrid = OnlinePaymentTable.value.getTable("Table4").Rows;
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
        { name: 'BMOnth' },
            { name: 'TotalCount', type: 'number' },
        ],
        //async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    $("#jqxchildgrid").jqxGrid({
        width: "99%",
        autoheight: autoheightPrimary,
        height: "320",
        source: dataAdapter,
        sortable: true,
        selectionmode: 'singlerow', //To trigger row select event

        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
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
            { text: 'Month', columngroup: 'BrowserName', dataField: 'BMOnth', width: '50%', },
            { text: 'TotalCount', columngroup: 'BrowserName', dataField: 'TotalCount', width: '50%', },
        ],
        columngroups: [
                    { text: row.BrowserName, align: 'center', name: 'BrowserName' }
        ]
    });


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
    $('#hdnParamValues').val(dtFrom + '|' + dtTo);
    var param = {
        Datefrom: dtFrom,
        DateTo: dtTo
    }

    $.ajax({
        type: "POST",
        url: "Online-Payment.aspx/getData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(param),
        success: function (data) {
            BrowserData = $.parseJSON(data.d);
            ConvertData();
            LoadHeader();
            if (OnlinePaymentTable.Tables[1].Rows.length > 0) {
                databindtogrid = OnlinePaymentTable.Tables[1].Rows;
                var length = parseInt(OnlinePaymentTable.Tables[1].Rows.length);
              //  LoadHeader();
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
                LoadChart();

            } else {
                $('#nodata_div').show();
                $('#jqxgrid').hide();
                $('#chartDiv').hide();
                $(".grid-section").hide();
            }

            loader.hideloader();
        },
        error: function (request, status, error) { }
    })

}

function Error(e) {

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
        OnlinePaymentTable['Tables'] = Tables;
    }
    catch (e) {
        console.log(e.message)
    }
}