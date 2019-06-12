var mode = '1';
var programstable;
var databindtogrid;
TitleExport = 'notification-report';
gridid = 'jqxgrid';
var divId = 'div-NotificationChart';
var autoheightbool = false;
var autoheightPrimary = false;
var defOpen = 1;
var iphone = 0;
var android = 0;
var total = 0;
var filterednames;

$(document).ready(function () {
    chartdivid = 'div-NotificationChart';
    $('#nodata_div').hide();
    $('#nodata_div1').hide();
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

function submit() {
    try {
        getusage_date_time();
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
        mode = 0;
        loader.showloader();
        var zip = "";
        var dtFrom = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? '' : $('#txtDateFrom').val();
        var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : $('#txtDateTo').val();

        var param = {
            Mode: mode,
            DeviceType: '',
            FromDate: dtFrom,
            ToDate: dtTo
        }
        $.ajax({
            type: "POST",
            url: "crashlogservice.aspx/getData",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(param),
            success: function (data) {
                data = data.d;
                var result = $.parseJSON(data);
                if (result != null) {
                    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                    if (startDate != '' && endDate != '') {
                        var dsplit = endDate.split("/");
                        var dateEnds = new Date(dsplit[2], dsplit[0] - 1, dsplit[1]);
                        dsplit = startDate.split("/");
                        var dateStarts = new Date(dsplit[2], dsplit[0] - 1, dsplit[1]);
                        $('#lblCurrent').text(months[dateEnds.getMonth()] + ' ' + dateEnds.getDate() + ', ' + dateEnds.getFullYear());
                        $('#lblBefore').text(months[dateStarts.getMonth()] + ' ' + dateStarts.getDate() + ', ' + dateStarts.getFullYear());
                    }
                    databindtogrid = result.Table1;
                    programstable = result.Table;

                    $('#hdnParamValues').val(mode + '|' + '' + '|' + dtFrom + '|' + dtTo);

                    $('#legends').hide();
                    if (databindtogrid.length == 0) {
                        $(".grid-section").hide(); $('#jqxgrid').hide();
                        $('#nodata_div').show();
                        $('#jqxgrid').hide();
                        BindHeader();
                    }
                    else {
                        $(".grid-section").show();
                        $('#nodata_div').hide();
                        $('#graphDiv').hide();
                        $('#jqxgrid').show();

                        if (mode == 0) {
                            LoadGrid();
                            BindHeader();
                            FillChartData(mode);
                            gridid = 'jqxgrid';//'jqxgrid';
                        }
                    }
                    loader.hideloader();
                }
            },
            error: function (request, status, error) { loader.hideloader(); alert('Error!! ' + request.statusText); }
        });
    } catch (e) { loader.hideloader(); alert('Error!! '); }
}

function BindHeader() {
    try {
        iphone = 0;
        android = 0;
        total = 0;
        for (var i = 0; i < databindtogrid.length; i++) {
        }
        $('#lblTotal').text(databindtogrid[0].Count);

    }
    catch (e) {
        console.log(e.message);
    }
}

//on page load
function LoadGrid() {
    try {
        autoheightPrimary = false;
        if (programstable.length > 0) {
            if (programstable.length <= 10)
                autoheightPrimary = true;
            //Getting the source data with ajax GET request
            source = {
                datatype: "array",
                datafields: [
                    { name: 'CreatedDate', type: 'date' },
                    { name: 'Count' },
                ],
                async: false,
                record: 'Table',
                sortable: true,
                localdata: programstable
            };

            var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });


            $("#jqxgrid").jqxGrid({
                width: "99.8%",
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
                pagesize: 10,
                columnsresize: true,
                columnsreorder: true,
                columns:
                   [
                       { text: 'Created Date', dataField: 'CreatedDate', width: '50%', columntype: Date, cellsformat: 'MM/dd/yyyy' },
                       { text: 'Count', dataField: 'Count', width: '50%' }
                   ]

            });
        }
        else
        {
            //$("#jqxgrid").html('<span style="text-align:center;color:#f00; padding:20px 0px; display:block;">No Data Available<span>');
            $(".grid-section").hide(); $('#jqxgrid').hide();
            $('#nodata_div').show();
            $('#jqxgrid').hide();
        }
    }
    catch (e) {
        console.log(e.message);
    }
}

function LoadChildGrid() {
    autoheightbool = false;
    if (filterednames.length <= 10)
        autoheightbool = true;
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
                { name: 'CreatedDate', type: 'date' },
                { name: 'Count' },
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: filterednames
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    // Load icon in cell // NEW UI 12/17/2014
    var imagerenderer = function (row, datafield, value) {
        switch (datafield) {
            case "Read": return getRead(row, value); break;
            default: break;
        }
    }

    var linkrenderer = function (row, datafield, value) {
        href = source.localdata[row]["DeviceName"];
        if (href == "Android") {
            var link = $('#crashattachment').val() + "android";
        }
        else { var link = $('#crashattachment').val() + "ios"; }
        var html = "<a target=_blank href=" + link + "/" + value + ">" + value + "</a>";
        return html;
    }

    $("#jqxgrid2").jqxGrid({
        width: "100%",
        height: GridHeight * .79,
        columnsheight: 38,
        rowsheight: 34,
        source: dataAdapter,
        theme: 'darkblue',
        sortable: true,
        selectionmode: 'singlerow', //To trigger row select event
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        columnsresize: true,
        columnsreorder: true,
        enabletooltips: true,
        columns:
        [
            { text: 'Created Date', dataField: 'CreatedDate', width: '50%', columntype: Date, cellsformat: 'MM/dd/yyyy' },
            { text: 'Count', dataField: 'Count', width: '50%' }
        ]
    });

    $("#jqxchildgrid").on('bindingcomplete', function () {
        if ($(window).width() < 1025) {
            $("#jqxchildgrid").jqxGrid('autoresizecolumns');
        }
    });
}

function FillChartData(mode) {
    try {
        processed_json = new Array();
        processed_json2 = new Array();

        if (programstable == null) {
            $('#chartDiv').html(nodataLabel);
        }
        yaxis = 'No of crashes';

        $.map(programstable, function (obj, i) {
            processed_json.push({
                name: obj.CreatedDate.slice(0, -5),
                y: obj.Count,
                color: colorarrHEX[0],
                title: 'Count :'
            });
        });
        $.map(programstable, function (obj, i) {
            processed_json2.push({
                name: obj.CreatedDate.slice(0, -5),
                y: obj.Count,
                color: colorarrHEX[1],
                title: 'Count :'
            });
        });
        if (processed_json.length > 0) {
            BindhighChartwithdrill('areaspline', 'chartDiv', 'Created Date', colorarrHEX[0], 'Total', colorarrHEX[1]);
        } else {
            $('#chartDiv').html(nodataLabel);
        }
        dtOutageChartjs = processed_json;
    } catch (e) { }
}

// NEW UI 12/17/2014
//for get lock icon showing in grid
function getRead(row, value) {
    CustId = $('#jqxchildgrid').jqxGrid('getrowdata', row).CustomerId;
    return '<div style="text-align: center;">' + (value == "No" ? '<img src="../images/folder_close.png" class="Gridimage" title="' + value + '"/>' : '<img src="../images/folder_open.png" class="Gridimage" title="' + value + '" />') + '</a></div>';
}

$(document).on("click", ".filterdrop", function () {
    $('#jqxgrid').hide();
    $('#jqxchildgrid').show();
    LoadChildGrid();
});

function switchview(viewshow, viewhide) {
    try {
        document.getElementById(viewshow).style.display = 'block';
        document.getElementById(viewhide).style.display = 'none';
        $(".jqgrid:visible").jqxGrid('updatebounddata');
    }
    catch (e) { }
}

function getusage_date_time() {
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

function BindhighChartwithdrill(type, id, series1name, color1, series2name, color2) {

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
            }
        }

   ,
        yAxis: {
            //min: 0,
            allowDecimals: false,
            title: {
                text: yaxis,
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
            formatter: function () {
                return '<b>Count: </b>' + this.y;
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
                            chartclick(this.y, this.name);

                        }
                    }
                }
            }
        },
        series: [{
            type: type,
            name: series1name,
            data: processed_json,
            color: color1,
            showInLegend: true,

        },
        {
            type: type,
            name: series2name,
            data: processed_json2,
            color: color2,
            showInLegend: true,

        }
        ]
    });
}

function chartclick(count, date) {
    var QueryID;
    var module;
    //ChartTitle = (title.split(":")[0]).trim();
    mode = "0";
    $("#gridsection2").show();
    $("#jqxgrid2").show();
    gridid = 'jqxgrid2';
    filterednames = programstable.filter(function (obj) {
        return (obj.Count === count) && (obj.CreatedDate.slice(0, -5) === date);
    });
    LoadChildGrid();
}
