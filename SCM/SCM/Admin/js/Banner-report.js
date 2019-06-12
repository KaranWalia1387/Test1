var mode = 0;

var Bannertable;
var Bannertbl;
var databindtogrid;
var Gridheader;
var GridHeight = '';
var processed_jsonb = new Array();
var processed_jsonb1 = new Array();
var processed_jsonb2 = new Array();
var processed_jsonb3 = new Array();
var processed_jsonb4 = new Array();
var processed_jsonb5 = new Array();
var processed_jsonb6 = new Array();
var processed_jsonb7 = new Array();
var processed_jsonb8 = new Array();
var processed_jsonb9 = new Array();

//TitleExport = 'banner-report';
gridid = 'jqxgrid';
//var divId = 'div-Billingchart';
var autoheightbool = false;
var autoheightPrimary = false;
var subPieChartTable;
var defOpen = 1;
//on page load
function LoadGrid() {
    // loader.showloader();
    try {
        autoheightPrimary = false;
        if (databindtogrid.length == 0) {
            $('#nodata_div').show();
            $('#nodata_div').html('<font color="Red">No Banner Data available</font>');
            $('#jqxgrid').hide();
            $('#jqxchildgrid').hide();
        }
        else {
            $('#nodata_div').hide();
            $('#jqxgrid').show();
            $('#jqxchildgrid').hide();
        }
        if (databindtogrid.length <= 10)
            autoheightPrimary = true;
        //Getting the source data with ajax GET request

        source = {
            datatype: "array",
            datafields: [
                    { name: 'ClickDate' },
                    { name: 'Billing', type: 'number' },
                    { name: 'Compare Spending', type: 'number' },
                    //{ name: 'Compare Spending I', type: 'String' },
                     { name: 'Connect Me', type: 'number' },
                    // { name: 'ConnectMe - I', type: 'String' },
                     { name: 'Dashboard', type: 'number' },
                    //{ name: 'Electric Vehicle - I', type: 'number' },
                    //{ name: 'Electric Vehicle - II', type: 'number' },
                     { name: 'My Account', type: 'number' },
                     { name: 'Usage', type: 'number' }
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
            source: dataAdapter,
            sortable: true,
            selectionmode: 'singlerow', //To trigger row select event

            rowsheight: 34,
            height: GridHeight * .79,
            columnsheight: 38,
            theme: 'darkblue',
            altrows: true,

            pageable: true,
            pagesizeoptions: ['10', '20', '30', '40', '50', '100'],
            pagesize: 20,
            columnsresize: true,
            columnsreorder: true,
            columns: [
                 { text: 'Click Date', dataField: 'ClickDate', width: '15%' },
                  { text: 'Billing', dataField: 'Billing', width: '15%' },
                  { text: 'Compare Spending', dataField: 'Compare Spending', width: '15%' },
                  { text: 'Connect Me', dataField: 'Connect Me', width: '15%' },
                  { text: 'Dashboard', dataField: 'Dashboard', width: '15%' },
                  //{ text: 'Electric Vehicle - I', dataField: 'Electric Vehicle - I', width: '12%' },
                  //{ text: 'Electric Vehicle - II', dataField: 'Electric Vehicle - II', width: '12%' },
                  { text: 'MyAccount', dataField: 'My Account', width: '15%' },
                  { text: 'Usage', dataField: 'Usage', width: '15%' }
            ]

        });

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
    chartdivid = 'div-Bannerchart';
    mode = 0;
    loader.showloader();

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
    });

});

function GetDataOnPageLoad() {

    databindtogrid = Bannertable.Table1;
    Gridheader = Bannertable.GridColumns;

    $.map(databindtogrid, function (obj, i) {
        processed_jsonb = new Array();
        processed_jsonb1 = new Array();
        processed_jsonb2 = new Array();
        processed_jsonb3 = new Array();
        processed_jsonb4 = new Array();
        processed_jsonb5 = new Array();
        processed_jsonb6 = new Array();
        processed_jsonb7 = new Array();
        processed_jsonb8 = new Array();
        processed_jsonb9 = new Array();
        //'My Account', colorarrHEX[5], 'Usage', colorarrHEX[6]);
        var seriesname = parseInt(obj.ClickDate);
        processed_jsonb.push({
            name: obj.ClickDate.slice(0,-5),
            y: parseInt(obj["Billing"]),
            color: colorarrHEX[0],
            title: 'Billing :'
        });

        processed_jsonb1.push({
            name: obj.ClickDate.slice(0,-5),
            y: parseInt(obj["Compare Spending"]),
            color: colorarrHEX[1],
            title: 'Compare Spending: '
        });


        processed_jsonb2.push({
            name: obj.ClickDate.slice(0,-5),
            y: parseInt(obj["Connect Me"]),
            color: colorarrHEX[2],
            title: 'Connect Me: '
        });

        processed_jsonb3.push({
            name: obj.ClickDate.slice(0,-5),
            y: parseInt(obj["Dashboard"]),
            color: colorarrHEX[3],
            title: 'Dashboard: '
        });
        -

        processed_jsonb4.push({
            name: obj.ClickDate.slice(0,-5),
            y: parseInt(obj["Electric Vehicle - I"]),
            color: colorarrHEX[4],
            title: 'Electric Vehicle - I: '
        });

        processed_jsonb5.push({
            name: obj.ClickDate.slice(0, -5),
            y: parseInt(obj["Electric Vehicle - II"]),
            color: colorarrHEX[5],
            title: 'Electric Vehicle - II: '
        });

    
        processed_jsonb6.push({
            name: obj.ClickDate.slice(0,-5),
            y: parseInt(obj["My Account"]),
            color: colorarrHEX[6],
            title: 'My Account: '
        });

        processed_jsonb7.push({
            name: obj.ClickDate.slice(0,-5),
            y: parseInt(obj["Usage"]),
            color: colorarrHEX[7],
            title: 'Usage: '
        });

    });

    if (processed_jsonb.length > 0) {
        BindhighChartwithdrill('areaspline', 'chartDiv', 'Billing', colorarrHEX[0], 'Compare Spending', colorarrHEX[1], 'Connect Me', colorarrHEX[2], 'Dashboard', colorarrHEX[3], '', colorarrHEX[4], '', colorarrHEX[5], 'My Account', colorarrHEX[6], 'Usage', colorarrHEX[7]);
    }

    var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var frmdate = Bannertable.Table1[0]["ClickDate"];
    var Month = MONTHS[frmdate.split("/")[0] - 1];
    var day = frmdate.split("/")[1];
    var year = frmdate.split("/")[2];
    $('#From_Date').text($('#txtDateFrom').val());
    var todate = Bannertable.Table1[Bannertable.Table1.length - 1]["ClickDate"];
    Month = MONTHS[todate.split("/")[0] - 1];
    day = todate.split("/")[1];
    year = todate.split("/")[2];
    $('#To_Date').text($('#txtDateTo').val());
    LoadGrid();
}


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
                //alert("From date should not be greater than to date");
                alert("'From Date' should not be greater than 'To date'");
                $("#txtDateTo").val("");
                return false;
            }
        }

        mode = 0;

        var dtFrom = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? '' : $('#txtDateFrom').val();
        var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : $('#txtDateTo').val();
        var ddlBanner = ($('#ddlBanner').val() == null || $('#ddlBanner').val() == '') ? '' : $('#ddlBanner').val();

        loader.showloader();
        var obj = {};
        obj.Mode = mode;
        obj.FromDate = dtFrom;
        obj.ToDate = dtTo;
        obj.BannerID = ddlBanner;

        $.ajax({
            type: "POST",
            url: "Banner-Clicks.aspx/LoadGridData",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function success(response) {
                Bannertbl = JSON.parse(response.d);
                $('#hdnParamValues').val(0 + '|' + ddlBanner + '|' + dtFrom + '|' + dtTo);
                GetDataOnSearch();
            },
            error: function OnError(response) {
                loader.hideloader();
            }
        });


    }
    catch (e) { }
}

//BindhighChartwithdrill('areaspline', 'chartDiv', 'Billing', colorarrHEX[0], 'Compare', colorarrHEX[1], 'Connect Me', colorarrHEX[2], 'Dashboard', colorarrHEX[3], 'Electric Vehicle', colorarrHEX[4], 'My Account', colorarrHEX[5], 'Usage', colorarrHEX[6]);
function BindhighChartwithdrill(type, id, series0name, color0, series1name, color1, series2name, color2, series3name, color3, series4name, color4, series5name, color5, series6name, color6, series7name, color7) {//, series7name, color7, series8name, color8, series9name, color9

    $('#' + id).highcharts({
        credits: {
            enabled: false
        },
        chart: {
            type: type,
            options3d: {
                enabled: enable3d,
                alpha: 15,
                beta: 0
            }
        },
        legend: {
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            floating: false

        },
        title: {
            text: title         
            ,
            style: {
                color: '#F00',
                font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
            }//,
            //zoomType: 'xy'
        }

   ,
        yAxis: {
            //min: 0,
            allowDecimals: false,
            title: {
                // text: yaxis,
                text: 'Number of Clicks', 
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

            useHTML: true,
            //headerFormat: '<table><tr><td><b>Date: </b>{point.key}</td></tr></table><table>',
            //pointFormat: '<tr><td><b>{series.name}: </b></td>' +
            //    '<td style="text-align: right">{point.y}</td></tr>',
            //footerFormat: '</table>',
            formatter: function () {
                return '<b>Date: </b>' + this.point.name + '<br/><b>' + this.series.name + ': </b>' + this.y;
            }
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5,
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
                pointWidth: 18,
                dataLabels: {
                    stacking: 'normal',
                    align: 'center',
                    rotation: -30,
                    x: 4,
                    y: -7,
                    enabled: false,
                    formatter: function () {
                        if (this.y === 0) {
                            return null;
                        }
                        return this.y;
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
                            chartclick(this.title, this.name);

                        }
                    }
                }
            }
        },
        series: [{
            type: type,
            name: series0name,
            data: processed_jsonb,
            color: color0,
            showInLegend: true,

        }, {
            type: type,
            name: series1name,
            data: processed_jsonb1,
            color: color1,
            showInLegend: true
        },
        {
            type: type,
            name: series2name,
            data: processed_jsonb2,
            color: color2,
            showInLegend: true
        }

        , {
            type: type,
            name: series3name,
            data: processed_jsonb3,
            color: color3,
            showInLegend: true
        }, //{
        //    type: type,
        //    name: series4name,
        //    data: processed_jsonb4,
        //    color: color4,
        //    showInLegend: true,

        //}, {
        //    type: type,
        //    name: series5name,
        //    data: processed_jsonb5,
        //    color: color5,
        //    showInLegend: true
        //},
        {
            type: type,
            name: series6name,
            data: processed_jsonb6,
            color: color6,
            showInLegend: true
        }

        , {
            type: type,
            name: series7name,
            data: processed_jsonb7,
            color: color7,
            showInLegend: true
        }
        //{
        //    type: type,
        //    name: series8name,
        //    data: processed_jsonb8,
        //    color: color8,
        //    showInLegend: true
        //}

        //, {
        //    type: type,
        //    name: series9name,
        //    data: processed_jsonb9,
        //    color: color9,
        //    showInLegend: true
        //}
        ]
    });
}

function GetDataOnSearch() {
    Bannertable = Bannertbl;
    databindtogrid = Bannertbl.Table1;
    Gridheader = Bannertable.GridColumns;
    processed_jsonb = new Array();
    processed_jsonb1 = new Array();
    processed_jsonb2 = new Array();
    processed_jsonb3 = new Array();
    processed_jsonb4 = new Array();
    processed_jsonb5 = new Array();
    processed_jsonb6 = new Array();
    processed_jsonb7 = new Array();
    processed_jsonb8 = new Array();
    processed_jsonb9 = new Array();

    $.map(databindtogrid, function (obj, i) {

        var seriesname = parseInt(obj.ClickDate);
        processed_jsonb.push({
            name: obj.ClickDate.slice(0,-5),
            y: parseInt(obj["Billing"]),
            color: colorarrHEX[0],
            title: 'Billing: '
        });


        processed_jsonb1.push({
            name: obj.ClickDate.slice(0, -5),
            y: parseInt(obj["Compare Spending"]),
            color: colorarrHEX[1],
            title: 'Compare Spending: '
        });


        processed_jsonb2.push({
            name: obj.ClickDate.slice(0,-5),
            y: parseInt(obj["Connect Me"]),
            color: colorarrHEX[2],
            title: 'Connect Me: '
        });


        //processed_jsonb4.push({
        //    name: obj.ClickDate.slice(0,-5),
        //    y: parseInt(obj["ConnectMe - I"]),
        //    color: colorarrHEX[4],
        //    title: 'ConnectMe - I :'
        //});

        processed_jsonb3.push({
            name: obj.ClickDate.slice(0,-5),
            y: parseInt(obj["Dashboard"]),
            color: colorarrHEX[3],
            title: 'Dashboard:'
        });


        //processed_jsonb4.push({
        //    name: obj.ClickDate.slice(0,-5),
        //    y: parseInt(obj["Electric Vehicle - I"]),
        //    color: colorarrHEX[4],
        //    title: 'Electric Vehicle - I: '
        //});

        //processed_jsonb5.push({
        //    name: obj.ClickDate.slice(0,-5),
        //    y: parseInt(obj["Electric Vehicle - II"]),
        //    color: colorarrHEX[5],
        //    title: 'Electric Vehicle - II :'
        //});

        processed_jsonb6.push({
            name: obj.ClickDate.slice(0,-5),
            y: parseInt(obj["My Account"]),
            color: colorarrHEX[6],
            title: 'My Account: '
        });

        processed_jsonb7.push({
            name: obj.ClickDate.slice(0,-5),
            y: parseInt(obj["Usage"]),
            color: colorarrHEX[7],
            title: 'Usage: '
        });

    });
    if (processed_jsonb1.length > 0) {
        BindhighChartwithdrill('areaspline', 'chartDiv', 'Billing', colorarrHEX[0], 'Compare Spending', colorarrHEX[1], 'Connect Me', colorarrHEX[2], 'Dashboard', colorarrHEX[3], '', colorarrHEX[4],'', colorarrHEX[5], 'My Account', colorarrHEX[6], 'Usage', colorarrHEX[7]);
    }

    var Totalbanner = Bannertable.Table[0]["TotalBanner"];
    var Totalclicks = Bannertable.Table[0]["TotalClicks"];

    if (Totalbanner == null) {
        $('#Totalbanners').text("0");
    }
    else {
        $('#Totalbanners').text(Totalbanner);
    }
    if (Totalclicks == null) {
        $('#Totalclicks').text("0");
    }
    else {
        $('#Totalclicks').text(Totalclicks);
    }

    var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if (Bannertable.Table1.length > 0) {
        $('#chartDiv').show();
        var frmdate = Bannertable.Table1[0]["ClickDate"];
        var Month = MONTHS[frmdate.split("/")[0] - 1];
        var day = frmdate.split("/")[1];
        var year = frmdate.split("/")[2];
        $('#From_Date').text(convertdate($('#txtDateFrom').val()));
        var todate = Bannertable.Table1[Bannertable.Table1.length - 1]["ClickDate"];
        Month = MONTHS[todate.split("/")[0] - 1];
        day = todate.split("/")[1];
        year = todate.split("/")[2];
        $('#To_Date').text(convertdate($('#txtDateTo').val()));

        gridid = 'jqxgrid';
        LoadGrid();
        loader.hideloader();
    }
    else
    {
        $('#From_Date').text(convertdate($('#txtDateFrom').val()));
        $('#To_Date').text(convertdate($('#txtDateTo').val()));
        $('#chartDiv').hide();
        $('#nodata_div').show();
        $('#nodata_div').html('<font color="Red">No Banner Click Data available</font>');
        $('#nodatadiv').show();
        $('#nodatadiv').html('<font color="Red">No Banner Click Data available</font>');
        $('#jqxgrid').hide();
        $('#jqxchildgrid').hide();
        loader.hideloader();
    }
}


function convertdate(date)
{
    var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var Month = MONTHS[date.split("/")[0] - 1];
    var day = date.split("/")[1];
    var year = date.split("/")[2];
    var newdate = Month + " " + day + ", " + year;
    return newdate;
}