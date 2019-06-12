var nodataLabel = "<center><font color='Red'>No Data</font></center>";
var arr_outage;
var arr_Educational;
var arr_Saving;
var arr_Rebates;
var efficiencytable, serviceID;
var databindtogrid;
var GridHeight = '';
TitleExport = 'efficiency-report';
gridid = 'jqxgrid';
var reportdata;
var colors = ['#1f8aa7', '#a19999', '#ac4040', '#109618', '#990099', '#0099c6', '#DD4477', '#66AA00', '#b82e2e', '#316395', '#994499', '#22aa99'];
var colorarrHEX = ["#1f8aa7", "#a19999", "#ac4040", "#109618", "#990099", "#0099c6", "#DD4477", "#66AA00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#cccccc"];

var totalCharging, Accessibility, ChargingStationMeters, Manufacturers, processed_json, cnt;
var piechart = '';
var mode = '1';
var autoheightbool = false;
var autoheightPrimary = false;
var defOpen = 1;
var imagerenderer = function (row, datafield, value) {
    return getPopupView(row, value);
}
var cntpending = 0; var cntapproved = 0;
// Saving Tip Data
function FillSavingData(type) {
    try {
        processed_json = new Array();
        if (arr_Saving == null) {
            if (type == 'dashboard') {
                $('#Savingchart').html(nodataLabel);
                $('#gridSaving').html(nodataLabel);
            }
            else {
                $('#data-viewer-popup').html(nodataLabel);
                $('#grid-viewer-popup').html(nodataLabel);
            }
        }
        yaxis = 'Total Saving tips';

        $.map(arr_Saving, function (obj, i) {
            processed_json.push({
                name: obj.DateSavingTips,
                y: obj.ApprovedEnrollment,
                color: '#6baee3',
                title: 'Saving tips :'
            });
        });

        if (processed_json.length > 0) {
            if (type == 'dashboard') {
                populateChart('area', 'Savingchart', false);
                LoadGrid('gridSaving', arr_Saving);
            }
            else {
                populateChart('area', 'data-viewer-popup', false);
                LoadGrid('grid-viewer-popup', arr_Saving);
            }
        }
        else {
            if (type == 'dashboard') {
                $('#Savingchart').html(nodataLabel);
                $('#gridSaving').html(nodataLabel);
            }
            else {
                $('#data-viewer-popup').html(nodataLabel);
                $('#grid-viewer-popup').html(nodataLabel);
            }
        }
        dtOutageChartjs = processed_json;
    } catch (e) { }
}
// Create doughnut pie chart for rebates
function createdoughnut(divid) {
    try {
        $('#' + divid).highcharts({
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            chart: {
                marginRight: 120,
                renderTo: 'container',
                type: 'pie',
                options3d: {
            alpha: 15,
            beta: 0
        }
            },
            
            yAxis: {
                title: {
                    text: ''
                }
            },
            plotOptions: {
                pie: {
                    shadow: false
                }
            },
            tooltip: {
                formatter: function() {
                    return '<b>'+ this.point.name +'</b>: '+ this.y +' ';
                }
            },
            legend: {
                align: 'right',
                layout: 'vertical',
                verticalAlign: 'left',
                floating: true,
                //padding:100,

                //x: id == "servicechart" ? 0 : 0,
                //x:10,
                //y: 0,
                //labelFormatter: function () {
                //    // added by priyansha for legends wrapping in next line for service chart bug 9183
                //    //if (id == "servicechart") {
                //    //    var words = this.name.split(' ');
                //    //    var str = [];
                //    //    for (var word in words) {
                //    //        str.push(words[word]);
                //    //        str.push('<br>');
                //    //    }
                //    //    return str.join('');
                //    //}
                //    //else {

                //    return this.name
                //    // }
                //}
                //     labelFormatter: function () {
                //return '<p style="white-space:normal">'+ this.name+'</p>';}


            },
            series: [{
                name: 'Browsers',
                data: [["Approved Requests", arr_Rebates[0].ApprovedEnrollment], ["Pending Requests", arr_Rebates[0].PendingEnrollment]],
                colors: ['#30cd94', '#ed5d5d', '#32d2c9'],
                size: '90%',
                innerSize: '50%',
                showInLegend:true,
                dataLabels: {
                    enabled: false
                }

            }]
        });
    }
    catch (ex)
    { }
}
// Create donughnut pie chart for programes
function createdoughnutProgram(divid) {
    try {
        $('#' + divid).highcharts({
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            chart: {
                marginRight: 120,
                renderTo: 'container',
                type: 'pie',
                options3d: {
                    alpha: 15,
                    beta: 0
                }
            },

            yAxis: {
                title: {
                    text: ''
                }
            },
            plotOptions: {
                pie: {
                    shadow: false
                }
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.point.name + '</b>: ' + this.y + ' ';
                }
            },
            legend: {
                align: 'right',
                layout: 'vertical',
                verticalAlign: 'left',
                floating: true,
            },
            series: [{
                name: 'Browsers',
                data: [["Approved Requests", cntapproved], ["Pending Requests", cntpending]],
                colors: ['#30cd94', '#ed5d5d', '#32d2c9'],
                size: '90%',
                innerSize: '50%',
                showInLegend: true,
                dataLabels: {
                    enabled: false
                }
            }]
        });
    }
    catch (ex)
    { }
}
// Rebates data
function FillRebatesData(type) {
    try {
        processed_json = new Array();
        cnt = 0;
        if (arr_Rebates == null) {
            if (type == 'dashboard') {
                $('#Rebateschart').html(nodataLabel);
                $('#gridRebates').html(nodataLabel);
            }
            else {
                $('#data-viewer-popup').html(nodataLabel);
                $('#grid-viewer-popup').html(nodataLabel);
            }
        }
        yaxis = 'No of Enrollment';

        $.map(arr_Rebates, function (obj, i) {
            processed_json.push({
                name: obj.ApprovedEnrollment,
                //y: obj.ApprovedEnrollment,
                y: parseInt(obj.PendingEnrollment),
                color: colorarrHEX[i],
                //color: '#6baee3',
                title: 'Approved Requests :',
            });
            cnt = cnt + parseInt(obj.ApprovedEnrollment);
        });
        if (processed_json.length > 0) {
            if (type == 'dashboard') {
                //populateChart('area', 'Rebateschart', false);
                createdoughnut( 'Rebateschart');
                LoadGrid('gridRebates', arr_Rebates);
            }
            else {
                createdoughnut('data-viewer-popup');
                //createdoughnut('pie', 'data-viewer-popup', cnt);
                LoadGrid('grid-viewer-popup', arr_Rebates);
            }

        } else {
            if (type == 'dashboard') {
                $('#Rebateschart').html(nodataLabel);
                $('#gridRebates').html(nodataLabel);
            }
            else {
                $('#data-viewer-popup').html(nodataLabel);
                $('#grid-viewer-popup').html(nodataLabel);
            }
        }
        dtOutageChartjs = processed_json;
    } catch (e) { }
}
// Educational tips data
function FillEducationalData(type) {
    try {
        processed_json = new Array();

        if (arr_Educational == null) {
            if (type == 'dashboard') {
                $('#Educationalchart').html(nodataLabel);
                $('#gridEducational').html(nodataLabel);
            }
            else {
                $('#data-viewer-popup').html(nodataLabel);
                $('#grid-viewer-popup').html(nodataLabel);
            }
        }
        yaxis = 'Total Educational Tips';

        $.map(arr_Educational, function (obj, i) {
            processed_json.push({
                name: obj.CityName,
                y: obj.ApprovedEnrollment,
                color: '#6baee3',
                title: 'Educational Tips :'
            });
        });

        if (processed_json.length > 0) {
            if (type == 'dashboard') {
                populateChart('area', 'Educationalchart', false);
                LoadGrid('gridEducational', arr_Educational);
            }
            else {
                populateChart('area', 'data-viewer-popup', false);
                LoadGrid('grid-viewer-popup', arr_Educational);
            }

        } else {
            if (type == 'dashboard') {
                $('#Educationalchart').html(nodataLabel);
                $('#gridEducational').html(nodataLabel);
            }
            else {
                $('#data-viewer-popup').html(nodataLabel);
                $('#grid-viewer-popup').html(nodataLabel);
            }
        }
        dtOutageChartjs = processed_json;
    } catch (e) { }
}
// Programs Data
function FillOutageData(type) {
    try {
        cnt = 0;
        processed_json = new Array();
        processed_json2 = new Array();
        if (arr_outage == null) {
            if (type == 'dashboard') {
                $('#outageschart').html(nodataLabel);
                $('#gridoutage').html(nodataLabel);
            }
            else {
                $('#data-viewer-popup').html(nodataLabel);
                $('#grid-viewer-popup').html(nodataLabel);
            }
        }
        yaxis = 'No of Enrollment';

        //$.map(arr_outage, function (obj, i) {
        //    processed_json.push({
        //        name: obj.DatePrograms,
        //        y: obj.ApprovedEnrollment,
        //        title: 'Approved Enrollment :'
        //    });
        //});
        //$.map(arr_outage, function (obj, i) {
        //    processed_json2.push({
        //        name: obj.DatePrograms,
        //        y: obj.PendingEnrollment,
        //        title: 'Pending Enrollment :'
        //    });
        //});
        $.map(arr_outage, function (obj, i) {           
            cntapproved = cntapproved + parseInt(obj.ApprovedEnrollment);
            cntpending = cntpending + parseInt(obj.PendingEnrollment);
        });
      
            processed_json.push({
                name: cntapproved,
                //y: obj.ApprovedEnrollment,
                y: cntpending,//parseInt(obj.PendingEnrollment),
                color: colorarrHEX[i],
                //color: '#6baee3',
                title: 'Approved Requests :',
            });
      
        if (processed_json.length > 0) {
            if (type == 'dashboard') {
                //populateChart('area', 'Rebateschart', false);
                createdoughnutProgram('outageschart');
                LoadGrid('gridoutage', arr_outage);
            }
            else {
                createdoughnutProgram('data-viewer-popup');
                LoadGrid('grid-viewer-popup', arr_outage);
            }

        } else {
            if (type == 'dashboard') {
                $('#outageschart').html(nodataLabel);
                $('#gridoutage').html(nodataLabel);
            }
            else {
                $('#data-viewer-popup').html(nodataLabel);
                $('#grid-viewer-popup').html(nodataLabel);
            }
        }
        dtOutageChartjs = processed_json;
       
    } catch (e) { }
}

function getPopupView(row, value) {
    try {
        serviceID = $('#jqxgrid').jqxGrid('getrowdata', row).ID;
        //var servicePopup = $('#jqxgrid').jqxGrid('getrowdata', row)["ID"];
        return '<div style="padding-left:5px;" id="Popup"><span class="details" data-id=' + serviceID + ' data-backdrop="true" data-keyboard="true" data-toggle="modal" data-target=".userDetails">' + value + '</span></div>';
    }
    catch (ex) { }
}

function getresult(row, value) {
    var cityId = $('#jqxgrid').jqxGrid('getrowdata', row).CityId;

    return '<div style="text-align: left;"><span id=' + cityId + ' class=filterdrop >' + value + '</span></div>';

}

function LoadGrid(id, databindtogrid) {
    try {
        var DateColumn = 'DateRebates';
        //if (id == 'gridoutage') {
        //    DateColumn = 'DatePrograms';

        //    if (databindtogrid.length > 0) {
        //        autoheightPrimary = false;
        //        if (databindtogrid.length <= 10)
        //            autoheightPrimary = true;
        //        //Getting the source data with ajax GET request
        //        var source = {
        //            datatype: "array",
        //            datafields: [
        //            // { name: DateColumn },
        //                  { name: 'ApprovedEnrollment', type: 'number' },
        //             { name: 'PendingEnrollment' },
        //            ],
        //            //root: "Employees",
        //            //record: "Employee",
        //            //id: 'ID',
        //            async: false,
        //            record: 'Table',
        //            sortable: true,
        //            localdata: databindtogrid

        //        };
        //        var dataAdapter = new $.jqx.dataAdapter(source,
        //            { contentType: 'application/json; charset=utf-8' }
        //        );

        //        $("#" + id).jqxGrid({
        //            width: "98%",
        //            autoheight: autoheightPrimary,
        //            height: "180",
        //            autorowheight: true,
        //            source: dataAdapter,
        //            theme: 'darkblue',
        //            sortable: true,
        //            selectionmode: 'singlerow', //To trigger row select event
        //            pageable: true,
        //            pagesizeoptions: ['10', '20', '30', '40', '50'],
        //            pagesize: 20,
        //            columnsresize: true,
        //            columnsreorder: true,
        //            enabletooltips: true,
        //            columns:
        //            [
        //                //{ text: 'ID', dataField: 'ID', width: '20%', cellsrenderer: imagerenderer },
        //              //  { text: 'Date', dataField: DateColumn, width: '30%', hidden: false },
        //                { text: 'Approved Enrollments', dataField: 'ApprovedEnrollment', width: '30%', cellsrenderer: imagerenderer },//, cellsrenderer: imagerenderer
        //                //{ text: 'Efficiency Type', dataField: 'EEType', width: '25%', cellsrenderer: imagerenderer },//, cellsrenderer: imagerenderer
        //                { text: 'Pending Enrollments', dataField: 'PendingEnrollment', width: '40%', cellsrenderer: imagerenderer },//, cellsrenderer: imagerenderer
        //                //{ text: 'Users Enrolled', dataField: 'PeopleEnrolled', width: '30%', cellsrenderer: imagerenderer }//, cellsrenderer: imagerenderer
        //            ]
        //        });
        //    }
        //    else { $("#" + id).html('<span style="text-align:center;color:#f00; padding:20px 0px; display:block;">No Data<span>'); }
        //}
        //else
        //{
            if (databindtogrid.length > 0) {
                autoheightPrimary = false;
                if (databindtogrid.length <= 10)
                    autoheightPrimary = true;
                //Getting the source data with ajax GET request
                var source = {
                    datatype: "array",
                    datafields: [
                     //{ name: DateColumn },
                     { name: 'ApprovedEnrollment', type: 'number' },
                     { name: 'PendingEnrollment' },
                    ],
                    //root: "Employees",
                    //record: "Employee",
                    //id: 'ID',
                    async: false,
                    record: 'Table',
                    sortable: true,
                    localdata: databindtogrid

                };
                var dataAdapter = new $.jqx.dataAdapter(source,
                    { contentType: 'application/json; charset=utf-8' }
                );

                $("#" + id).jqxGrid({
                    width: "98%",
                    autoheight: autoheightPrimary,
                    height: "180",
                    autorowheight: true,
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
                        //{ text: 'ID', dataField: 'ID', width: '20%', cellsrenderer: imagerenderer },
                        //{ text: 'Date', dataField: DateColumn, width: '30%', hidden: false },
                        { text: 'Approved Requests', dataField: 'ApprovedEnrollment', width: '50%', cellsrenderer: imagerenderer },//, cellsrenderer: imagerenderer
                        //{ text: 'Efficiency Type', dataField: 'EEType', width: '25%', cellsrenderer: imagerenderer },//, cellsrenderer: imagerenderer
                        { text: 'Pending Requests', dataField: 'PendingEnrollment', width: '50%', cellsrenderer: imagerenderer },//, cellsrenderer: imagerenderer
                        //{ text: 'Users Enrolled', dataField: 'PeopleEnrolled', width: '30%', cellsrenderer: imagerenderer }//, cellsrenderer: imagerenderer
                    ]
                });
            }
            else { $("#" + id).html('<span style="text-align:center;color:#f00; padding:20px 0px; display:block;">No Data<span>'); }
       // }
    }
    catch (e) { }
}

function LoadChildGrid() {
    autoheightbool = false;
    if (databindtogrid.length <= 10)
        autoheightbool = true;
    var source = {
        datatype: "array",
        datafields: [
         { name: 'CityName' },
         { name: 'EEType' },
         { name: 'Title' },
         { name: 'PeopleEnrolled', type: 'number' }
        ],
        root: "Employees",
        record: "Employee",
        id: 'ID',
        async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    $("#jqxchildgrid").jqxGrid({
        width: "99%",
        autoheight: autoheightbool,
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
        selectionmode: 'singlerow',
        rowdetailstemplate: { rowdetails: "<div id='grid' style='margin: 3px;'></div>", rowdetailsheight: 120, rowdetailshidden: true },
        ready: function () {
        },
        columns:
        [
            { text: 'City Name', dataField: 'CityName', width: '20%' },
            { text: 'Efficiency Type', dataField: 'EEType', width: '20%' },
            { text: 'Title', dataField: 'Title', width: '35%' },
            { text: 'Users Enrolled', dataField: 'PeopleEnrolled', width: '25%' }
        ]
    });
}

function PiechartCommon(mode, caseId) {
    drawOutageChart(caseId);
    drawOutageChartByCity(mode, caseId);
}

function drawOutageChart(caseId) {
    var titles = 'Total People Enrolled by EEType';
    var piechart = efficiencytable.Tables[2];
    $('#EfficiencyTitle').html(titles);
    //To remove title if dates are blank
    var title;
    if ($('#txtDateFrom').val() != "" && $('#txtDateTo').val() != "")
        title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
    else
        title = "";
    //var title = 'Period: ' + $('#txtDateFrom').val() + ' to ' + $('#txtDateTo').val();
    processed_json = new Array();
    $.map(piechart.Rows, function (obj, i) {
        processed_json.push({
            name: obj.EEType,
            y: obj.PeopleEnrolled,
            color: colorarrHEX[i],
            title: obj.EEType,
        });
    });
    if (processed_json.length > 0) {
        $('#titleEfficiency').show();
        $('#titleEfficiency').html(title);
    }
    createchart(caseId, 'div-Efficiencychart');

}

function drawOutageChartByCity(mode, caseId) {
    var titles = 'Total People Enrolled by City';
    var piechart = efficiencytable.Tables[3];
    $('#EEtitlebyCity').html(titles);
    processed_json = new Array();
    $.map(piechart.Rows, function (obj, i) {
        processed_json.push({
            name: obj.City,
            y: obj.PeopleEnrolled,
            color: colorarrHEX[i],
            title: obj.City,
            drilldown: mode == 1 ? "Efficiency" : "second"
        });
    });
    createchart(caseId, 'div-Efficiencychart1');

}

function switchview(viewshow, viewhide, type) {
    try {
        document.getElementById(viewshow).style.display = 'block';
        if (type == 'dashboard') {
            $('#' + viewshow).css('height', 205);
        }
        else {

        }
        document.getElementById(viewhide).style.display = 'none';
        $(".jqgrid:visible").jqxGrid('updatebounddata');
    }
    catch (e) { }
}

function chartclick(name, chartType, drilldown, type) {

    var piechart = efficiencytable.Tables[4];
    processed_json4 = new Array();
    if (drilldown == 'second') {
        piechart = efficiencytable.Tables[2];
        $.map(piechart.Rows, function (obj, i) {
            processed_json4.push({
                name: obj.EEType,
                y: obj.PeopleEnrolled,
                color: colorarrHEX[i],
                title: obj.EEType,
            });
        });
    } else {
        if (piechart != undefined) {
            $.map(piechart.Rows, function (obj, i) {
                if (obj.CityName.toLowerCase() == name.trim().toLowerCase()) {
                    processed_json4.push({
                        name: obj.EEType,
                        y: obj.PeopleEnrolled,
                        color: colorarrHEX[i],
                        title: obj.EEType
                    });
                }
            });
        }
    }
    return processed_json4;
}

$(document).on("click", ".filterdrop", function () {
    var idCity = this.id;
    $('#ddlCity').val(idCity);
    var obj = $('#ddlCity option:selected');
    if (obj.index() > 0) {
        submit();
        chartgraphsection(defOpen);
    }
});

$(document).ready(function () {

    $('#nodata_div').hide();
    $('#nodata_div').html('');

    loader.showloader();
    //efficiencytable = EfficiencySample.LoadGridData(mode, '', '', '', '', '').value;
    var param = {
        mode:'',
        datefrom: '',
        dateto: '',
         cityid: '',
        zip: '',
        eetype: '',
    }
    $.ajax({
        type: "POST",
        url: "EfficiencySample.aspx/LoadGridData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(param),
        success: function (data) {
            
            data = data.d;
            var result = $.parseJSON(data);
            //OutageTable = result; 
            efficiencytable = result.Table1;
            arr_outage = result.Table3;
            //arr_Educational = result.Table1;
           // arr_Saving = result.Table0;
            arr_Rebates = result.Table2;
            //for (var i = 0; i < arr_outage.length; i++) {
               
            //    var dateEnds = new Date(arr_outage[i]["DatePrograms"]);
            //    arr_outage[i]["DatePrograms"] = (dateEnds.getMonth() + 1) + '/' + (dateEnds.getDate() > 10 ? dateEnds.getDate() : '0' + dateEnds.getDate()) + '/' + dateEnds.getFullYear();
            //}
            //for (var i = 0; i < arr_Rebates.length; i++) {
            //    arr_Rebates[i]["DateRebates"] = (arr_Rebates[i]["DateRebates"].getMonth() + 1) + '/' + arr_Rebates[i]["DateRebates"].getDate() + '/' + arr_Rebates[i]["DateRebates"].getFullYear();
            //}

            FillOutageData('dashboard');
            //FillEducationalData('dashboard');
            FillRebatesData('dashboard');
            //FillSavingData('dashboard');

            loader.hideloader();
        },

        error: function (request, status, error) {
            loader.hideloader(); alert('Error!! ' + request.statusText);
        }
    });
       databindtogrid = efficiencytable;

    //arr_outage = efficiencytable.Tables[3].Rows;
    //arr_Educational = efficiencytable.Tables[1].Rows;
    //arr_Saving = efficiencytable.Tables[0].Rows;
    //arr_Rebates = efficiencytable.Tables[2].Rows;
    

    $('.left-active-sprite ul li a').click(function () {
        var lstanchor = $(this).parent().parent().find('a');
        $(lstanchor).each(function (i, obj) {
            $(obj).attr('class', '');
        })

        $(this).attr('class', 'active');
    });

    $('#hdnParamValues').val(mode + '|' + $('#txtDateFrom').val() + '|' + $('#txtDateTo').val() + '|||');
    if (databindtogrid.length == 0 || databindtogrid == null) {
        $('#jqxgrid').hide();
        $('#nodata_div').show();
    }
    else {
        $('#jqxgrid').show();
        $('#nodata_div').hide();
        $('#nodata_div').html('');
        //LoadGrid();
        drawOutageChart();
        drawOutageChartByCity();
    }
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

    $("#btnExcelExport").click(function () {
        try {
            document.getElementById('graphDiv').style.display = 'block';

            if (gridid == 'jqxgrid')
                LoadGrid();
            else
                LoadChildGrid();
            // var count = $("#" + gridid).jqxGrid('columns').records.length;
            $("#" + gridid).jqxGrid('exportdata', 'xls', 'Efficiency Report');
            document.getElementById('graphDiv').style.display = 'none';
            if (defOpen == 1)
                document.getElementById('graphDiv').style.display = 'block';
        } catch (e) {
            if (defOpen == 1)
                document.getElementById('graphDiv').style.display = 'block';
            else {
                document.getElementById('graphDiv').style.display = 'none';
            }
        }
    });
});

function submit() {
    try {
        var startDate = $('#txtDateFrom').val();
        var endDate = $('#txtDateTo').val();
        //For Mutually Exclusive Search Criteria
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
                //alert("From date should not be greater than to date");
                alert("'From Date' should not be greater than 'To date'");
                $("#txtDateTo").val("");
                return false;
            }
        }

        mode = ($('#ddlCity').val() != '') ? '2' : '1';

        var zip = "";
        var dtFrom = ($('#txtDateFrom').val() == null || $('#txtDateFrom').val() == '') ? '' : $('#txtDateFrom').val();
        var dtTo = ($('#txtDateTo').val() == null || $('#txtDateTo').val() == '') ? '' : $('#txtDateTo').val();
        var city = "";

        var ddlAccountType = ($('#ddlAccountType').val() == null || $('#ddlAccountType').val() == '') ? '' : $('#ddlAccountType').val();

        if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
            var ddlCity = $('#ddlCity option:selected');
            if ($(ddlCity).attr('key') == 'CityName') {
                city = $(ddlCity).val();
            }
            if ($(ddlCity).attr('key') == 'Zipcode') {
                zip = $(ddlCity).val();
                city = $(ddlCity).attr('cityid');
            }
        }

        efficiencytable = EfficiencySample.LoadGridData(mode, dtFrom, dtTo, city, zip, ddlAccountType).value;
        //for pdf
        $('#hdnParamValues').val(mode + '|' + dtFrom + '|' + dtTo + '|' + city + '|' + zip + '|' + ddlAccountType);
        databindtogrid = efficiencytable.Tables[0].Rows;

        if (databindtogrid.length == 0 || databindtogrid == null) {
            $('#jqxgrid').hide();
            $('#jqxchildgrid').hide();
            $('#nodata_div').show();
            $('#nodata_div').html('<font color="Red">No Data</font>');
        }
        else if (mode == '1') {

            $('#jqxgrid').show();
            $('#jqxchildgrid').hide();
            $('#nodata_div').hide();
            $('#nodata_div').html('');
            drawOutageChart();
            drawOutageChartByCity();
            gridid = 'jqxgrid';
            //LoadGrid();

        }
        else {
            $('#jqxgrid').hide();
            $('#jqxchildgrid').show();
            $('#nodata_div').hide();
            $('#nodata_div').html('');
            drawOutageChart();
            drawOutageChartByCity();
            gridid = 'jqxchildgrid';
            LoadChildGrid();

        }
    } catch (e) { }
}

var row;
$('#jqxgrid').bind('rowselect', function (event) {

    row = event.args.rowindex;

});

//getting values in popup
$(document).on("click", "#Popup", function () {
    var Id = parseInt($('#jqxgrid').jqxGrid('getrowdata', row).ID);

    var SrAct = '';

    var tblstring = "<table>"
    var temptable = efficiencytable.Tables[1].Rows;
    //start bug 9181 by Altaf
    var Itemcount = temptable.length;
    for (var i = 0; i < Itemcount; i++) { // using  Itemcount instead of temptable.length in for loop increase performance   
        var CustName = '';
        var ID = parseInt(temptable[i].ID);
        if (ID === Id)// === increase performance than == operator
        {
            //end bug 9181     
            tblstring += "<tr>"
            tblstring += "<th >"
            tblstring += 'Customer Name :';
            tblstring += "</th>";
            tblstring += "<td>"
            tblstring += (CustName + temptable[i].CustomerName);
            tblstring += "</td>"
            tblstring += "<th>"
            tblstring += 'Service Account :'
            tblstring += "</th>"
            tblstring += "<td >"
            tblstring += (SrAct + temptable[i].ServiceAccount);
            tblstring += "</td>"
            tblstring += "</tr>"


        }

    }
    tblstring += "</table>";
    $("#Div1").html(tblstring);
    //$('#lblCustName').html(CustName);
    //$('#lblServiceAccount').html(SrAct);
    return;
});