var nodataLabel = "<center><font color='Red'>No Data</font></center>";
var dt;
var filter_dt;
var color = 0;
var ChartTitle = "Active";
var processed_json;
var module="Segment";

$(document).ready(function () {
    LoadData();
    var param = { QueryID: '2', Mode: '1' };
    $('#lblmodule').css('color', colorarrHEX[0]);
    $('#lblmode').css('color', colorarrHEX[0]);
    FilterData(param);
});

//$(document).ready(function () {
//$("#menu_navigator").click(function () {
function CRMDeshboard() {
    if ($('#Segmentbargraph').css('display') == 'block') {
        Bindbargraph('Segmentbargraph');
    }
    if ($('#Campaignbargraph').css('display')=='block')
    {
        Bindbargraph('Campaignbargraph');
    }
    if ($('#NoofNotificationgraph').css('display') == 'block')
    {
        Bindbargraph('NoofNotificationgraph');
    }
    Bindbargraph('Chartbox');
    callmethodfordrow('gridbox')
    // var param = { QueryID: '2', Mode: '1' };
    // FilterData(param);
}
 //   });
//});

function LoadData()
{
    $.ajax({
        type: "POST",
        url: "Crm-Dashboard.aspx/LoadData",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        //data:JSON.stringify(param),
        success: function (data){
            dt = $.parseJSON(data.d);
            LoadChart();

        },
        error:function (request, status, error){}

    });
}
function LoadChart() {
    try {
        if (dt != null)
        {
            createdoughnut('Segmentchart', dt.Table[0]["TotalSegmentCount"], dt.Table[0]["ActiveSegmentCount"], dt.Table[0]["InActiveSegmentCount"]);
            createdoughnut('Campaignchart', dt.Table1[0]["TotalCampaignCount"], dt.Table1[0]["ActiveCampaignCount"], dt.Table1[0]["InActiveCampaignCount"]);
            createEmailChart('NoofNotificationchart', dt.Table2[0]['TotalCount'], dt.Table2[0]['EmailCount'], dt.Table2[0]['TextCount'], dt.Table2[0]['PushCount'], dt.Table2[0]['IVRCount']);
        }

    } catch (e) {
        alert(e.toString());}
}
function Bindbargraph(ID) {
    if (dt != null) {
        if (ID == 'Segmentbargraph') {
            yaxis = "No. of Segments";
            processed_json = new Array();
            processed_json.push({ name: "Active", y: dt.Table[0]["ActiveSegmentCount"], title: 'Active', color: colorarrHEX[0] });
            processed_json.push({ name: "InActive", y: dt.Table[0]["InActiveSegmentCount"], title: 'Inactive', color: colorarrHEX[1] });
            // populateChart('column', ID);
        }
        else if (ID == 'Campaignbargraph') {
            yaxis = "No. of Campaign";
            processed_json = new Array();
            processed_json.push({ name: "Active", y: dt.Table1[0]["ActiveCampaignCount"], title: 'Active', color: colorarrHEX[0] });
            processed_json.push({ name: "InActive", y: dt.Table1[0]["InActiveCampaignCount"], title: 'Inactive', color: colorarrHEX[1] });
            // populateChart('column', ID);
        }
        else if (ID == 'NoofNotificationgraph') {
            yaxis = "No. of Notifications";
            processed_json = new Array();
            processed_json.push({ name: "Email", y:dt.Table2[0]['EmailCount'], title: 'Email', color: colorarrHEX[0] });
            processed_json.push({ name: "Text", y: dt.Table2[0]['TextCount'], title: 'Text', color: colorarrHEX[1] });
            processed_json.push({ name: "Push", y: dt.Table2[0]['PushCount'], title: 'Push', color: colorarrHEX[2] });
            processed_json.push({ name: "IVR", y: dt.Table2[0]['IVRCount'], title: 'IVR', color: colorarrHEX[3] });
            //populateChart('column', ID);
        }
        else if (ID == 'Chartbox') {
            if (module == "Segment") {
                yaxis = "No. of Segments";
            }
            else if (module == "Campaign") {
                yaxis = "No. of Campaigns";
            }
            else
            {
                yaxis = "No. of Notifications";
            }
            if (filter_dt != null) {
                processed_json = new Array();
                $.map(filter_dt, function (obj, i) {
                    processed_json.push({
                        name: obj.Date,
                        y: obj.TotalCount,
                        color: colorarrHEX[color],
                        title: ChartTitle
                    });
                });
            }
        }
        BindCRMheigh1('column', ID);
    }
}
function BindallGrid(ID)
{
    if (dt != null) {
        if (ID == 'gridSegment') {
            processed_jsongrid = new Array();
            processed_jsongrid.push({ Name: "Active", Count: dt.Table[0]["ActiveSegmentCount"] });
            processed_jsongrid.push({ Name: "Inactive", Count: dt.Table[0]["InActiveSegmentCount"] });
            processed_jsongrid.push({ Name: "Total", Count: dt.Table[0]["TotalSegmentCount"] });
        }
        else if (ID == 'gridCampaign') {
            processed_jsongrid = new Array();
            processed_jsongrid.push({ Name: "Active", Count: dt.Table1[0]["ActiveCampaignCount"] });
            processed_jsongrid.push({ Name: "Inactive", Count: dt.Table1[0]["InActiveCampaignCount"] });
            processed_jsongrid.push({ Name: "Total", Count: dt.Table1[0]["TotalCampaignCount"] });

        }
        else if (ID == 'gridNoofNotification') {
            var processed_jsongrid = new Array();
            processed_jsongrid.push({ Name: "Email", Count: dt.Table2[0]['EmailCount'] });
            processed_jsongrid.push({ Name: "Text", Count: dt.Table2[0]['TextCount'] });
            processed_jsongrid.push({ Name: "Push", Count: dt.Table2[0]['PushCount'] });
            processed_jsongrid.push({ Name: "IVR", Count: dt.Table2[0]['IVRCount'] });
            processed_jsongrid.push({ Name: "Total", Count: dt.Table2[0]['TotalCount'] });
        }
        LoadGrid(ID, processed_jsongrid);
    }
}
function switchview(viewshow, viewhide,viewhide2, type) {
    try {
        document.getElementById(viewshow).style.display = 'block';
        callmethodfordrow(viewshow);
        if (type == 'dashboard') {
            $('#' + viewshow).css('height', 210);
        }
        else {
        }
        document.getElementById(viewhide).style.display = 'none';
        document.getElementById(viewhide2).style.display = 'none';
        $(".jqgrid:visible").jqxGrid('updatebounddata');
    }
    catch (e) { }
}

function callmethodfordrow(ID)
{
    try{
        switch(ID)
        {
            case 'Segmentbargraph':
                Bindbargraph(ID);
                break;
            case 'Campaignbargraph':
                Bindbargraph(ID);
                break;
            case 'NoofNotificationgraph':
                Bindbargraph(ID);
                break;
            case 'gridSegment':
                BindallGrid(ID);
                break;
            case 'gridCampaign':
                BindallGrid(ID);
                break;
            case 'gridNoofNotification':
                BindallGrid(ID);
                break;
            case 'Segmentchart':
                createdoughnut('Segmentchart', dt.Table[0]["TotalSegmentCount"], dt.Table[0]["ActiveSegmentCount"], dt.Table[0]["InActiveSegmentCount"]);
                break;
            case 'Campaignchart':
                createdoughnut('Campaignchart', dt.Table1[0]["TotalCampaignCount"], dt.Table1[0]["ActiveCampaignCount"], dt.Table1[0]["InActiveCampaignCount"]);
                break;
            case 'NoofNotificationchart':
                createEmailChart('NoofNotificationchart', dt.Table2[0]['TotalCount'], dt.Table2[0]['EmailCount'], dt.Table2[0]['TextCount'], dt.Table2[0]['PushCount'], dt.Table2[0]['IVRCount']);
                break;
            case 'gridbox':
                filteGrid('gridbox', filter_dt)
                break;
            case 'Chartbox':
                Bindbargraph(ID);
                break;
            default:
                break;
        }
    }
    catch(e){}
}
function LoadGrid(id, databindtogrid) {
    try {
        if (databindtogrid.length > 0) {
            source = {
                datatype: "array",
                datafields: [
                  { name: 'Name' },
                { name: 'Count' },
                ],
                async: false,
                record: 'Table',
                sortable: true,
                localdata: databindtogrid
            };
            var dataAdapter = new $.jqx.dataAdapter(source,
                { contentType: 'application/json; charset=utf-8' }
            );

            $("#" + id).jqxGrid({
                width: "100%",
                height: "210",
                source: dataAdapter,
            columnsheight: 28,
            altrows: true,
                sortable: true,
                selectionmode: 'singlerow',
                columnsresize: true,
                columnsreorder: true,
                columns:
                [
                    { text: 'Mode', dataField: 'Name', width: '50%' },
                    { text: 'Count', dataField: 'Count', width: '50%' }
                ]
            });
        }
        else { $("#" + id).html('<span style="text-align:center;color:#f00; padding:20px 0px; display:block;">No Data<span>'); }
    }
    catch (e)  {alert(e.toString());}
}
function createdoughnut(divid, total,active,Inactive) {
    try {

        $('#' + divid).highcharts({
            credits: {
                enabled: false
            },
            title: {
                text: 'Total <br/>' + total, align: 'center',
                verticalAlign: 'middle', y: -25
            },
            chart: {

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
                },
                series:
                 {
                     point: {
                         pointer: 'cursor',
                         events: {
                             click: function () {
                                 chartclick(this.name, divid);

                             }
                         }
                     }
                 }
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.point.name + '</b>: ' + this.y + ' ';
                }
            },
            series: [{
                name: divid,
                data: [["Active", active], ["Inactive", Inactive]],
                colors: [colorarrHEX[0], colorarrHEX[1], colorarrHEX[2]],
                size: '100%',
                innerSize: '60%',
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
function createEmailChart(divid, total,Email,Text,Push,IVR) {
    try {

        $('#' + divid).highcharts({
            credits: {
                enabled: false
            },
            title: {
                text: 'Total <br/>' + total, align: 'center',
                verticalAlign: 'middle', y: -25
            },
            chart: {

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
                },
                series:
                    {
                        point: {
                            pointer: 'cursor',
                            events: {
                                click: function () {
                                    chartclick(this.name, divid);

                                }
                            }
                        }
                    }
            },
             tooltip: {
                formatter: function () {
                    return '<b>' + this.point.name + '</b>: ' + this.y + ' ';
                }
             },

            series: [{
                name: divid,
                data: [["Email", Email], ["Text", Text],["Push", Push],["IVR", IVR]],
                colors: [colorarrHEX[0], colorarrHEX[1], colorarrHEX[2], colorarrHEX[3]],
                size: '100%',
                innerSize: '60%',
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
function BindCRMheigh1(type, id, showindecimal, name) {
    try {
        //console.log("processed_json "+processed_json);
        $('#' + id).highcharts({
            credits: {
                enabled: false
            },
            //chart: { zoomType: 'xy' },
            chart: {
                type: type,
                options3d: {
                    enabled: enable3d,
                    alpha: 15,
                    beta: 0
                }, events: {
                    drilldown: function (e) {
                        if (!e.seriesOptions) {
                            var adprocessed_json4 = chartclick(e.point.title, type, e.point.drilldown, 0);
                            if (e.point.drilldown.toLowerCase().indexOf('zipcode') < 0)
                                excludedrillup = false;
                            else {
                                excludedrillup = true;
                            }
                            var chart = this,
                                drilldowns = {
                                    'Paid-Customer': {
                                        name: e.point.name,
                                        data: adprocessed_json4
                                    }

                                },
                                series = drilldowns['Paid-Customer'];
                            series.id = e.point.drilldown;

                            chart.addSeriesAsDrilldown(e.point, series);

                        }

                    },

                    drillup: function (e) {
                        if (e.seriesOptions.id != null && (e.seriesOptions.id.toLowerCase() == 'paid' || e.seriesOptions.id.toLowerCase() == 'unpaid' || e.seriesOptions.id.toLowerCase() == 'city' || e.seriesOptions.id.toLowerCase() == 'unplanned' || e.seriesOptions.id.toLowerCase() == 'planned') || (e.seriesOptions.name != null && e.seriesOptions.name.toLowerCase() == 'zipcode')) {
                            subBackToMain(type, excludedrillup);
                        }
                    }
                }
            },
            title: {
                text: title
                ,
                style: {
                    color: '#F00',
                    font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
                }//,
                //zoomType: 'xy'
            },
            legend: {
                layout: 'horizontal',
                align: 'right',
                verticalAlign: 'top',
                floating: false
                //backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
            }

       ,
            yAxis: {
                min: 0,
                maxPadding: 0.09,
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
            xAxis: {

                labels: {

                    enabled: true,
                    rotation: -25,
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
            plotOptions: {

                series: {
                    dataLabels: {
                        stacking: 'normal',

                        align: 'center',
                        rotation: 0,//#4867
                        // x: 0,//#4867
                        y: -7,//#4867
                        enabled: true,
                        formatter: function () {
                            if (this.y === 0) {
                                return null;
                            }
                            //return this.y;
                            return (showindecimal == true || showindecimal == undefined || showindecimal == null) ? Highcharts.numberFormat(this.y, 0) : Highcharts.numberFormat(this.y, 0);
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
                                if (id != 'Chartbox')
                                    chartclick(this.title, id);
                            }
                        }
                    }
                }
            },

            tooltip: {

                formatter: function () {
                    return this.point.title + ': <b>' + Math.abs(this.y) + '<b>';
                    // + ' ' + this.series.tooltipOptions.valueSuffix + '<b>';
                    //if (this.point.series.yAxis.axisTitle!=null)
                    //return this.point.series.yAxis.axisTitle.textStr + ' : </b>' + ((showindecimal == true || showindecimal == undefined || showindecimal == null) ? Highcharts.numberFormat(this.y, 2) : Highcharts.numberFormat(this.y, 0));
                }
            },
            series: [{
                showInLegend: false,
                type: type,
                name: name,
                data: processed_json,
                color: colorarrHEX[0]
                //colorByPoint: (showcolors && (type == 'column'))


            }
            ],
            drilldown: {
                series: [{
                    id: 'Paid',
                    name: 'Paid',
                    data: processed_json2
                }, {
                    id: 'Unpaid',
                    name: 'Unpaid',
                    data: processed_json3
                }, {
                    id: 'Planned',
                    name: 'Planned',
                    data: processed_json2
                }, {
                    id: 'Unplanned',
                    name: 'Unplanned',
                    data: processed_json3
                }, {
                    id: 'Power',
                    name: 'Power',
                    data: processed_json2
                }, {
                    id: 'Water',
                    name: 'Water',
                    data: processed_json3
                }, {
                    id: 'Gas',
                    name: 'Gas',
                    data: processed_json4
                }]
            }

        });
    }
    catch (e) {
        console.log(e);
    }
}

function chartclick(title, ID)
{
    var QueryID;
  
    ChartTitle = title;
    if (ID == 'Segmentbargraph' || ID == 'Segmentchart')
    {
        QueryID = '2';
        module = 'Segment';
    }
    else if (ID == 'Campaignbargraph' || ID == 'Campaignchart')
    {
        QueryID = '3';
        module = 'Campaign';
    }
    else if (ID == 'NoofNotificationgraph'||ID =='NoofNotificationchart')
    {
        QueryID = '4';
        module = 'Number of Notification'
    }
    var param = { QueryID: QueryID, Mode: getmodeforparameter(title) };
    if (title == 'Active')
    {
        color = 0;
    }
    else if( title == 'Inactive')
    {
        color = 1;
    }
    else
    {
        color = getmodeforparameter(title);
    }
    $('#lblmodule').text(module);
    $('#lblmode').text(title);
    $('#lblmodule').css('color', colorarrHEX[color]);
    $('#lblmode').css('color', colorarrHEX[color]);   
    FilterData(param);
}


function FilterData(param) {
   // var param = { AttributeId: AttId, value: value };
    loader.showloader();
    $.ajax({
        type: "POST",
        url: "Crm-Dashboard.aspx/LoadDashboarddata",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        data:JSON.stringify(param),
        success: function (data) {
            filter_dt = $.parseJSON(data.d);
            console.log(filter_dt);
            //processed_json = new Array();
            //$.map(filter_dt, function (obj, i) {
            //    processed_json.push({
            //        name: obj.Date,
            //        y: obj.TotalCount,
            //        color: colorarrHEX[color],
            //        title: ChartTitle
            //    });
            //});
            document.getElementById('Chartbox').style.display = 'block';
            document.getElementById('gridbox').style.display = 'none';
            Bindbargraph('Chartbox');
           // BindCRMheigh('column', 'Chartbox');
            loader.hideloader();
        },
        error: function (request, status, error) { loader.hideloader(); }
    });
}
function getmodeforparameter(mode)
{
    var status;
    switch(mode)
    {
        case 'Active': status = 1; break;
        case 'Inactive': status = 0; break;
        case 'Email': status = 0; break;
        case 'Text': status = 1; break;
        case 'Push': status = 2; break;
        case 'IVR': status = 3; break;
    }
    return status;
}

function filteGrid(id, databindtogrid) {
    try {
        if (databindtogrid.length > 0) {
            source = {
                datatype: "array",
                datafields: [
                  { name: 'Date' },
                { name: 'TotalCount' },
                ],
                async: false,
                record: 'Table',
                sortable: true,
                localdata: databindtogrid
            };
            var dataAdapter = new $.jqx.dataAdapter(source,
                { contentType: 'application/json; charset=utf-8' }
            );

            $("#" + id).jqxGrid({
                width: "100%",
                source: dataAdapter,
                sortable: true,

                height: GridHeight * .75,
                columnsheight: 38,
                rowsheight: 34,
                altrows: true,

                selectionmode: 'singlerow',
                columnsresize: true,
                columnsreorder: true,
                columns:
                [
                    { text: 'Date', dataField: 'Date', width: '50%' },
                    { text: 'Count', dataField: 'TotalCount', width: '50%' }
                ]
            });
        }
        else { $("#" + id).html('<span style="text-align:center;color:#f00; padding:20px 0px; display:block;">No Data<span>'); }
    }
    catch (e) { alert(e.toString()); }
}



