var mode = 1;
var city = "";
var zip = "";
var Billingtable;
var Billingtbl;
var databindtogrid;
var GridHeight = '';
TitleExport = 'billing-report';
gridid = 'jqxgrid';
var divId = 'div-Billingchart';
var autoheightbool = false;
var autoheightPrimary = false;
var subPieChartTable;
var defOpen = 1;
var imagerenderer = function (row, datafield, value) {
    if (datafield == 'CustomerName')
        return getView(row, value);
    else
        return getresult(row, value);
}
function getresult(row, value) {
    var cityId = $('#jqxgrid').jqxGrid('getrowdata', row).CityId;

    return '<div style="text-align: left;"><span id=' + cityId + ' class=filterdrop >' + value + '</span></div>';

}
//for get lock icon showing in grid
function getView(row, value) {

    CustId = $('#jqxchildgrid').jqxGrid('getrowdata', row).CustomerId;
    var CustName = $('#jqxchildgrid').jqxGrid('getrowdata', row).CustomerName;
    return '<div style="padding-left:5px;"><a class="details" href="#" data-id=' + CustId + ' data-toggle="modal" data-target=".userDetails">' + CustName + '</a></div>';
}

//on page load
function LoadGrid() {
    // loader.showloader();
    try {
        autoheightPrimary = false;
        if (databindtogrid.length == 0) {
            $('#nodata_div').show();
            $('#nodata_div').html('<font color="Red">No Usage Data available</font>');
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
             { name: 'BillingDate' },            
              { name: 'Bills Paid', type: 'number' },
               { name: 'Bills Unpaid', type: 'number' },
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

        $("#jqxgrid").jqxGrid({
            width: "99.8%",
            autoheight: autoheightPrimary,
            source: dataAdapter,
            sortable: true,
            selectionmode: 'singlerow', //To trigger row select event

            rowsheight: 34,
            height: GridHeight * .78,
            columnsheight: 38,
            theme: 'darkblue',
            altrows: true,

            pageable: true,
            pagesizeoptions: ['10', '20', '30', '40', '50', '100'],
            pagesize: 20,
            columnsresize: true,
            columnsreorder: true,
            columns:
            [
                { text: 'Transaction Date', dataField: 'BillingDate', width: '28%', cellsrenderer: imagerenderer },              
                 { text: 'Paid Bills', dataField: 'Bills Paid', width: '24%', cellsrenderer: imagerenderer },
                   { text: 'Unpaid Bills', dataField: 'Bills Unpaid', width: '24%', cellsrenderer: imagerenderer },
                  { text: 'Total Bills', dataField: 'Total', width: '24%', cellsrenderer: imagerenderer },
            ]
        });
        //loader.hideloader();
    }
    catch (e) {
        loader.hideloader();
    }
}




$(document).ready(function () {
    $('#menu_navigator').click(function () {
        $('#chartDiv').css('width', '100%')
    });
    $('#nodata_div').hide();
    $('#nodata_div1').hide();
    $('#subChart1-nodata').hide();
    chartdivid = 'div-Billingchart';
    mode = 1;
    //var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : convertlocaltoutc($('#txtDateTo').val());
    loader.showloader();
    //var obj = {};
    //obj.mode = mode;
    //obj.datefrom = $('#txtDateFrom').val();
    //obj.dateto = $('#txtDateTo').val();
    //obj.cityid = '';
    //obj.zipcode = '';
    //obj.custmertype = '';
    //obj.custname = '';
    //obj.status = '';
    //$.ajax({
    //    type: "POST",
    //    url: "Billing.aspx/LoadGridData",
    //    data: JSON.stringify(obj),
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function OnSuccess(response) {
    //        Billingtable = JSON.parse(response.d);
    //        $('#hdnParamValues').val(1 + '|' + $('#txtDateFrom').val() + '|' + $('#txtDateTo').val() + '||||||0|');
    //        GetDataOnPageLoad();
    //        loader.hideloader();
    //    },
    //    error: function OnError(response) {
    //        var err = response.d;
    //        loader.hideloader();
    //    },
    //});

    submit();
    $("#ddlCity").change(function () {
        var value = $("#ddlCity").val();
        if (value != '') {
            $('#statusBill').removeAttr('disabled');
        } else {
            $("#statusBill").attr('disabled', 'disabled');
        }
    });
    $("#ddlAccountType").change(function () {
        var value = $("#ddlAccountType").val();
        if (value != '') {
            $('#statusBill').removeAttr('disabled');
        } else {
            $("#statusBill").attr('disabled', 'disabled');
        }
    });
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
    });

});

$(document).on("click", ".filterdrop", function () {
    var idCity = this.id;
    $('#ddlCity').val(idCity);
    var obj = $('#ddlCity option:selected');
    if (obj.index() > 0) {
        submit();
    }
});

function submit() {
    try {
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

        city = '';
        zip = '';
        mode = ($('#ddlCity').val() != '') ? 2 : 1;

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
        //var ddlCity = ($('#ddlCity').val() == null || $('#ddlCity').val() == '') ? '' : $('#ddlCity').val();
        var ddlAccountType = ($('#ddlAccountType').val() == null || $('#ddlAccountType').val() == '') ? '' : $('#ddlAccountType').val();
        var searchUser = ($('#txtSearch').val() == null || $('#txtSearch').val() == '') ? '' : $('#txtSearch').val();

        if (city == '' && zip == '' && ddlAccountType == '') {
            mode = 1;
        }
        else {
            mode = (city != '') ? 2 : 1;

            if (zip != '') {
                mode = 3;
            }

            if ((city != '' || zip != '') && ddlAccountType != '') {
                mode = 4;
            }
            else if (ddlAccountType != '') {
                mode = 5;
            }
        }
        var statusBill = ($('#statusBill').val() == null || $('#statusBill').val() == '') ? '' : $('#statusBill').val();
        if (statusBill != '') {
            if (statusBill == '1')
                statusBill = 'Paid'
            else
                statusBill = 'UnPaid'
            mode = 6;
        }
        loader.showloader();
        var obj = {};
        obj.mode = mode;
        obj.datefrom = dtFrom;
        obj.dateto = dtTo;
        obj.cityid = city;
        obj.zipcode = zip;
        obj.custmertype = ddlAccountType;
        obj.custname = searchUser;
        obj.status = statusBill;
        $.ajax({
            type: "POST",
            url: "Billing.aspx/LoadGridData",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function success(response) {
                Billingtbl = JSON.parse(response.d);
                $('#hdnParamValues').val(1 + '|' + dtFrom + '|' + dtTo + '|' + city + '|' + zip + '|' + ddlAccountType + '|' + searchUser + '|' + statusBill);
                GetDataOnSearch();
            },
            error: function OnError(response) {
                loader.hideloader();
            }
        });


    }
    catch (e) { }
}

function GetDataOnSearch() {
    Billingtable = Billingtbl;

    databindtogrid = Billingtbl.Table1;

    var processed_jsonb = new Array();
    var processed_jsonb1 = new Array();
    var processed_jsonb2 = new Array();

    $.map(databindtogrid, function (obj, i) {
        var seriesname = parseInt(obj.BillingDate);
        processed_jsonb1.push({
            name: obj.BillingDate.slice(0, -5),
            y: parseInt(obj["Bills Unpaid"]),
        });
        processed_jsonb2.push({
            name: obj.BillingDate.slice(0, -5),
            y: parseInt(obj["Bills Paid"]),
        });

    });

    $(function () {
        $('#chartDiv').highcharts({
            chart: {
                type: 'areaspline',
                zoomType: 'x',
            },
            title: {
                text: ''
            },
            legend: {
                layout: 'horizontal',
                align: 'right',
                verticalAlign: 'top',
                floating: false,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
            },
            xAxis: {

                type: 'category',
                labels: {
                    rotation: -70,
                },
                style: {
                    //margin: "10px",
                    minPadding: 100,
                },
            },
            yAxis: {
                min: 0,
                allowDecimals: false,
                title: {
                    text: 'Number of Bills'
                }
            },
            tooltip: {
                shared: false,
                //useHTML: true,
                //headerFormat: '<small><b>Date: </b>{point.key}</small><table>',
                //pointFormat: '<tr><td><b>{series.name}: </b></td>' +
                //    '<td style="text-align: right">{point.y} units</td></tr>',
                //footerFormat: '</table>',
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

                    }
                }

            },
            series: [{
                name: 'Paid',
                data: processed_jsonb2,
                color: '#30cd94',
            }, {
                name: 'Unpaid',
                data: processed_jsonb1,
                color: '#ed5d5d',
            }]
        });
    });
    var BillPending = Billingtable.Table[0]["Bills Unpaid"];
    var BillPaid = Billingtable.Table[0]["Bills Paid"];
    var TotalBill = Billingtable.Table[0]["Total"];
    if (BillPending == null) {
        $('#PendingBills').text("0");
    }
    else {
        $('#PendingBills').text(BillPending);
    }
    if (BillPaid == null) {
        $('#PaidBills').text("0");
    }
    else {
        $('#PaidBills').text(BillPaid);
    }
    if (TotalBill == null) {
        $('#TotalBills').text("0");
    }
    else {
        $('#TotalBills').text(TotalBill);
    }
    var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var frmdate = Billingtable.Table1[0]["BillingDate"];
    var Month = MONTHS[frmdate.split("/")[0] - 1];
    var day = frmdate.split("/")[1];
    var year = frmdate.split("/")[2];
    $('#From_Date').text(Month + " " + day + ", " + year);
    var todate = Billingtable.Table1[Billingtable.Table1.length - 1]["BillingDate"];
    Month = MONTHS[todate.split("/")[0] - 1];
    day = todate.split("/")[1];
    year = todate.split("/")[2];
    $('#To_Date').text(Month + " " + day + ", " + year);


    gridid = 'jqxgrid';
    // loader.hideloader();
    LoadGrid();
    loader.hideloader();
}