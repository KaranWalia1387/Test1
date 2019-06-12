<%@ Page Title="Thermostat Dashboard" Language="C#" MasterPageFile="~/Demand-Response/Thermostat.Master" AutoEventWireup="true" CodeBehind="dashboard.aspx.cs" Inherits="AdminPanel.Demand_Response.dashboard" %>

<%@ Register Src="~/Demand-Response/user-control/device-chart.ascx" TagPrefix="uc1" TagName="devicechart" %>



<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <meta http-equiv="refresh" content="30" />
    <script src="highcharts/highcharts-more.js"></script>
    <script src="highcharts/solid-gauge.src.js"></script>

    <script src="highcharts/highstock.js"></script>

    <script type="text/javascript">

        var processed_json = [];
        var charttype = '';
        $(document).ready(function () {
            //debugger;
            try {
                     <% if (Session.Count != 0)
                        { %>
                json =<%= PastEventdata%>
            jsonActive =<%= ActiveEventdata%>

                 jsonPending =<%= PendingEventdata%>
                <%}%>
                     charttype = $('.typeText').val();
                      call($('.typeText').val());

             <%--            //Icon for Events
                if (!jsonActive[0].hasOwnProperty('Message')) {
                    $('#<%=imgAEstatus.ClientID%>').attr('src', 'images/past.gif').attr('title','Active DR');
                }
                if (jsonActive[0].hasOwnProperty('Message') && jsonPending[0].hasOwnProperty('Message'))
                {
                    $('#<%=imgAEstatus.ClientID%>').attr('src', 'images/Active.png').attr('title', 'No DR');
                }
                if (jsonActive[0].hasOwnProperty('Message') == true && jsonPending[0].hasOwnProperty('Message') == false) {
                    $('#<%=imgAEstatus.ClientID%>').attr('src', 'images/Pending.png').attr('title', 'Pending DR');
                }--%>



                $("#firstGrid").jqxGrid({ height: 148 });

                $("#firstGrid").bind('cellclick', function (event) {

                    try {

                        var rowindex = event.args.rowindex;
                        var ViewObj = $('#firstGrid').jqxGrid('getrowdata', rowindex);
                        window.location.href = "demand-response.aspx?id=id=" + ViewObj.EVENTID + "&type=active&row=" + rowindex;
                    }
                    catch (error)
                    { }


                });
                $("#secondGrid").bind('cellclick', function (event) {

                    try {

                        var rowindex = event.args.rowindex;
                        var ViewObj = $('#secondGrid').jqxGrid('getrowdata', rowindex);
                        window.location.href = "demand-response.aspx?id=" + ViewObj.EVENTID + "&type=pending&row=" + rowindex;

                    }
                    catch (error)
                    { }


                });
                $("#thirdGrid").bind('cellclick', function (event) {

                    try {

                        var rowindex = event.args.rowindex;
                        var ViewObj = $('#thirdGrid').jqxGrid('getrowdata', rowindex);
                        window.location.href = "demand-response.aspx?id=" + ViewObj.EVENTID + "&type=past&row=" + rowindex;
                    }
                    catch (error)
                    { }


                });
                $('.typeText').change(function () {

                    charttype = $(this).val();
                    call(charttype);

                });

                if ($('#<%=typeText.ClientID%>').val() == "0") {
                     rate = 'HEAT';
                 } else { rate = $('#<%=typeText.ClientID%>').val(); }


                //$("#devices").html(json.Summary.Online + " of " + json.Summary.Total + " Devices Online");
                // chartlast6hours(processed_json, rate);
                // prepare the data

                 if (jsonActive[0].hasOwnProperty('Message')) {
                     jsonActive = [];
                 <%--   $('#<%=imgAEstatus.ClientID%>').attr('src', 'images/Active.png');--%>
             }
                //else { jsonActive = jsonActive.DREventRecords.DREventDataSet.ActiveEvents }
                if (jsonActive == "No Active Event") {
                    $('#divfirstGridError').show();
                    $("#firstGrid").hide();
                }
                else {
                    $('#divfirstGridError').hide();
                    $("#firstGrid").show();
                    var source =
                    {
                        localdata: jsonActive,
                        datatype: "array",
                        datafields:
                        [
                            { name: 'RNUM', type: 'string' },
                        { name: 'EVENTID', type: 'string' },
                        { name: 'COUNT', type: 'string' },
                         { name: 'DT', type: 'date' },
                          { name: 'MIN', type: 'string' }
                        ]
                    };

                    var dataAdapter = new $.jqx.dataAdapter(source);

                    var imagerenderer = function (row, datafield, value) {

                        switch (datafield) {
                            case "RNUM": return Serial(row, value); break;
                            case "EVENTID": return Event(row, value, 'firstGrid', 'active'); break;
                            case "DT": return GetDate(row, value, 'firstGrid'); break;

                            default: break;

                        }


                    }


                    $("#firstGrid").jqxGrid(
                    {
                        width: '100%',
                        source: dataAdapter,
                        columnsresize: true,
                        //pageable: true,
                        //pagesizeoptions: ['10', '20', '35', '50'],
                        //pagesize: 20,

                        columnsheight: 38,
                        theme: 'darkblue',

                        altrows: true,
                        enabletooltips: true,
                        columns: [
                          { text: 'Sr.No.', dataField: 'RNUM', width: '20%', cellsrenderer: imagerenderer },
                      { text: 'Event ID', dataField: 'EVENTID', width: '20%' },
                      { text: 'Event Date', dataField: 'DT', width: '40%', cellsformat: 'MM/dd/yyyy h:mm tt' },

                       { text: 'Duration of Event (in mins)', editable: false, dataField: 'MIN', width: '40%', hidden: false },
                        { text: 'Number of Devices', editable: false, dataField: 'COUNT', width: '40%' },
                        ]
                    });
                    var localizationobj = {};
                    localizationobj.emptydatastring = "No Active Event";
                    localizationobj.pagergotopagestring = "Page no:";
                    localizationobj.pagershowrowsstring = "rows:";
                    $("#firstGrid").jqxGrid('localizestrings', localizationobj);
                }


                function call(type) {
                    processed_json = [];
                    $.ajax({
                        type: "POST",
                        url: "dashboard.aspx/GetChart",
                        data: '{type: "' + type + '" }',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: OnSuccess,
                        async: false,

                        failure: function (response) {
                            //alert(response.d);

                            return response.d;
                        }
                    });
                }
                function OnSuccess(response) {

                    //var xmlDoc = $.parseXML(response.d);
                    // var xml = $(xmlDoc);
                    // var customers = xml.find("Table1");
                    var jsonChartData = [];
                    var item = 1;
                    var ChartType = charttype;

                    jsonChartData = $.parseJSON(response.d);
                    if (response.d == null) {

                    }
                    else {
                        var glblSeriesSourceData = new Array();
                        glblSeriesSourceData["AllData"] = null;
                        if (ChartType == "ALL") {
                            item = 5;
                        } else {
                            item = 1;

                        }
                        glblSeriesSourceData["AllData"] = GetSeries(jsonChartData, item);

                        chartlast6hours(glblSeriesSourceData["AllData"], charttype)
                        return response.d;
                    }
                }
                function GetSeries(jsonChartData, item) {
                    if (jsonChartData == "null") {
                        downloader.hide();
                    }
                    else {
                        var seriesArray = new Array();
                        for (var y = 0; y < item; y++) {
                            ChartType = charttype;
                            if (item > 1) {
                                switch (y) {
                                    case 0: data = jsonChartData.HEAT; ChartType = "HEAT"; color = '#F88017'; break;
                                    case 1: data = jsonChartData.COOL; ChartType = "COOL"; color = '#82CAFA'; break;
                                    case 2: data = jsonChartData.OFF; ChartType = "OFF"; color = '#FBB117'; break;
                                    case 3: data = jsonChartData.OFFLINE; ChartType = "OFFLINE"; color = '#828285'; break;
                                    case 4: data = jsonChartData.ONLINE; ChartType = "ONLINE"; color = '#00FF00'; break;
                                }
                            } else {
                                switch (ChartType) {
                                    case "HEAT": data = jsonChartData.HEAT; color = '#F88017'; break;
                                    case "COOL": data = jsonChartData.COOL; color = '#82CAFA'; break;
                                    case "OFF": data = jsonChartData.OFF; color = '#FBB117'; break;
                                    case "OFFLINE": data = jsonChartData.OFFLINE; color = '#828285'; break;
                                    case "ONLINE": data = jsonChartData.ONLINE; color = '#00FF00'; break;
                                }
                            }

                            $.map(data, function (obj, i) {

                                processed_json.push([obj.TS, parseInt(obj.Count)]);
                            });
                            seriesArray[y] = new Array();
                            seriesArray[y]['name'] = ChartType;
                            seriesArray[y]['data'] = processed_json;
                            seriesArray[y]['color'] = color;
                            processed_json = [];

                        }
                        return seriesArray;
                    }
                }
            }
            catch (ex) { }
        });

        $(document).ready(function () {
            try {
                $("#secondGrid").jqxGrid({ height: 148 });
                // prepare the data

                if (jsonPending[0].hasOwnProperty('Message')) {
                    jsonPending = [];
                <%--  $('#<%=imgPEstatus.ClientID%>').attr('src', 'images/Pending.png');--%>
            }
                //else { jsonPending = jsonPending.DREventRecords.DREventDataSet.PendingEvents }
                if (jsonPending == "No Pending Event")
                {                  
                    $('#divsecondGridError').show();
                    $("#secondGrid").hide();
                }
                else
                {
                    $('#divsecondGridError').hide();
                    $("#secondGrid").show();
                    var source =
                    {
                        localdata: jsonPending,
                        datatype: "array",
                        datafields:
                        [
                              { name: 'RNUM', type: 'string' },
                            { name: 'EVENTID', type: 'string' },
                            { name: 'COUNT', type: 'string' },
                             { name: 'DT', type: 'date' },
                              { name: 'MIN', type: 'string' }
                        ]
                    };
                    var dataAdapter = new $.jqx.dataAdapter(source);
                    var imagerenderer = function (row, datafield, value) {

                        switch (datafield) {
                            case "RNUM": return Serial(row, value); break;
                            case "EVENTID": return Event(row, value, 'secondGrid', 'pending'); break;
                            case "DT": return GetDate(row, value, 'secondGrid'); break;

                            default: break;

                        }


                    }
                    $("#secondGrid").jqxGrid(
                    {
                        width: '100%',
                        source: dataAdapter,
                        columnsresize: true,
                        enabletooltips: true,
                        //pageable: true,
                        //pagesizeoptions: ['10', '20', '35', '50'],
                        //pagesize: 20,

                        columnsheight: 38,
                        theme: 'darkblue',

                        altrows: true,
                        columns: [
                            { text: 'Sr.No.', dataField: 'RNUM', width: '20%', cellsrenderer: imagerenderer },
                          { text: 'Event ID', dataField: 'EVENTID', width: '20%' },
                          { text: 'Event Date', dataField: 'DT', width: '40%', cellsformat: 'MM/dd/yyyy h:mm tt' },

                           { text: 'Duration of Event (in mins)', editable: false, dataField: 'MIN', width: '40%', hidden: false },
                            { text: 'Number of Devices', editable: false, dataField: 'COUNT', width: '40%' },
                        ]
                    });
                    var localizationobj = {};
                    localizationobj.emptydatastring = "No Pending Event";
                    localizationobj.pagergotopagestring = "Page no:";
                    localizationobj.pagershowrowsstring = "rows:";
                    $("#secondGrid").jqxGrid('localizestrings', localizationobj);
                }
            }
            catch (ex) { }
        });

        $(document).ready(function () {
            try{
                $("#thirdGrid").jqxGrid({ height: 148 });
                //loader.show();

                if (json[0].hasOwnProperty('Message')) {
                    json = [];

                }                
                if (json == "No Past Event") {                                     
                    $('#divthirdGridError').show();
                    $("#thirdGrid").hide();                   
                }
                else {
                    $('#divthirdGridError').hide();
                    $("#thirdGrid").show();
                    var source =
                    {
                        localdata: json,
                        datatype: "array",
                        datafields:
                        [
                            { name: 'RNUM', type: 'string' },
                            { name: 'EVENTID', type: 'string' },
                            { name: 'COUNT', type: 'string' },
                             { name: 'DT', type: 'date' },
                              { name: 'MIN', type: 'string' }
                        ]
                    };

                    var dataAdapter = new $.jqx.dataAdapter(source);
                    var imagerenderer = function (row, datafield, value) {

                        switch (datafield) {
                            case "RNUM": return Serial(row, value); break;
                            case "EVENTID": return Event(row, value, 'thirdGrid', 'past'); break;
                            case "DT": return GetDate(row, value, 'thirdGrid'); break;

                            default: break;

                        }


                    }


                    $("#thirdGrid").jqxGrid(
                    {
                        width: '100%',
                        source: dataAdapter,
                        columnsresize: true,
                        enabletooltips: true,

                        columnsheight: 38,
                        theme: 'darkblue',

                        altrows: true,
                        //pageable: true,
                        // pagesizeoptions: ['10', '20', '35', '50'],
                        //pagesize: 20,
                        columns: [
                              { text: 'Sr.No.', dataField: 'RNUM', width: '18%', cellsrenderer: imagerenderer },
                          { text: 'Event ID', dataField: 'EVENTID', width: '20%' },
                          { text: 'Event Date', dataField: 'DT', width: '40%', cellsformat: 'MM/dd/yyyy h:mm tt' },

                           { text: 'Duration of Event (in mins)', editable: false, dataField: 'MIN', width: '40%', hidden: false },
                            { text: 'Number of Devices', editable: false, dataField: 'COUNT', width: '40%' },
                        ]
                    });
                    var localizationobj = {};
                    localizationobj.emptydatastring = "No Past Event";
                    localizationobj.pagergotopagestring = "Page no:";
                    localizationobj.pagershowrowsstring = "rows:";
                    $("#thirdGrid").jqxGrid('localizestrings', localizationobj);
                }
            }
            catch(ex){}
        });
        function Serial(row, value) {

            try {

                var SR = row + 1;
                return '<div style="padding-left:3px;padding-top:2px" >' + SR + '</div>'
            }
            catch (error)
            { }
        }
        function Event(row, value, id, type) {
            try {
                // objID = $('#jqxgridViewUser');
                var id = $('#' + id).jqxGrid('getrowdata', row).EVENTID;

                return '<div style="padding-left:3px;padding-top:2px" ><a href="demand-response.aspx?id=' + id + '&type=' + type + '">' + value + '</a></div>';
            }
            catch (error)
            { }
        }
        function GetDate(row, value, id) {
            try {
                // objID = $('#jqxgridViewUser');
                var datetime = $('#' + id).jqxGrid('getrowdata', row).DT;
                var date = datetime.split(' ')[0];

                return '<div style="padding-left:3px;padding-top:2px" >' + date + '</div>'
            }
            catch (error)
            { }
        }
        //function chartonlineoffline(data,logindata,halfhour)
        //{

        //   $('#onlineDetail').html("Online: "+data.SummaryRecords.SummaryDataSet.SummaryData.ONLINE);
        //   $('#offlineDetail').html("Offline: "+data.SummaryRecords.SummaryDataSet.SummaryData.OFFLINE);

        //    //Online Device Detail
        //   var loginDetail = logindata.SummaryRecords.RECORDS;
        //   var halfHours = halfhour.SummaryRecords.RECORDS;

        //   if (loginDetail == "0" || loginDetail == "1") {
        //       loginDetail = logindata.SummaryRecords.SummaryDataSet.SummaryData;
        //   }
        //   else {
        //       loginDetail=logindata.SummaryRecords.SummaryDataSet.SummaryData[0];
        //   }

        //   if (halfHours == "0" || halfHours == "1") {
        //       halfHours = halfhour.SummaryRecords.SummaryDataSet.SummaryData;
        //   }
        //   else {
        //       halfHours = halfhour.SummaryRecords.SummaryDataSet.SummaryData[0];
        //   }
        //   $('#Onlinelastlogin').html(loginDetail.ONLINE);
        //   $('#OnlineHalfhour').html(halfHours.ONLINE);
        //   $('#OnlineNotconected').html(halfHours.OFF);

        //    //Offline Device detail
        //   $('#Offlinelastlogin').html(loginDetail.OFFLINE);
        //   $('#OfflineHalfhour').html(halfHours.OFFLINE);
        //   $('#OfflineNotconected').html(halfHours.OFF);


        //    $('.rightSmall').highcharts({
        //        chart: {
        //            zoomType: 'xy',
        //            backgroundColor: 'transparent'
        //        },
        //        title: {
        //            text: ''
        //        },

        //        plotOptions: {
        //            series: {
        //                dataLabels: {
        //                    enabled: false,
        //                    format: '<b>{point.name}</b> ({point.y:,.0f})',
        //                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
        //                    softConnector: true
        //                }
        //            }
        //        },

        //        series: [{
        //            type: 'pie',
        //            name: 'Breakdown',
        //            data: [
        //   {
        //       name: 'Online',
        //       y: parseInt(data.SummaryRecords.SummaryDataSet.SummaryData.ONLINE),
        //       color: '#669acb'
        //   },
        //    {
        //        name: 'Offline',
        //        y: parseInt(data.SummaryRecords.SummaryDataSet.SummaryData.OFFLINE),
        //        color: '#eb9643'
        //    }
        //            ]
        //        }]
        //    });


        //}
        function chartlast6hours(chartdata, type) {

            //$('#divlast6hours').highcharts({

            //    rangeSelector: {
            //        inputEnabled: false,
            //        selected: 1
            //    },

            //    chart: {
            //        zoomType: 'xy',
            //        backgroundColor: 'transparent',

            //    },
            //    title: {
            //        text: ''
            //        ,
            //        style: {
            //            color: '#F00',
            //            font: 'bold 15px "Trebuchet MS", Verdana, sans-serif'
            //        },
            //        zoomType: 'xy'
            //    }

            //    ,
            //    yAxis: {
            //        min: 0,
            //        title: {
            //            text: type+" COUNT",
            //            style: {
            //                color: '#333333',
            //                fontSize: '12px',
            //            }
            //        },
            //        stackLabels: {
            //            enabled: true,
            //            style: {
            //                fontWeight: 'bold',
            //                color: (Highcharts.theme && Highcharts.theme.textColor) || 'red'
            //            }
            //        },
            //        labels: {
            //            formatter: function () {
            //                return this.value;
            //            }
            //        }
            //    },
            //    xAxis: {
            //        labels: {
            //            rotation: -25,
            //            style: {
            //                color: '#333333',
            //                margin: "-20px",
            //                fontSize: '8px',
            //            }
            //        },
            //        type: "category",

            //        name: 'Hour',
            //        title: {
            //            style: {
            //                color: '#333',
            //                fontWeight: 'bold',
            //                fontSize: '3px',
            //                fontFamily: 'Trebuchet MS, Verdana, sans-serif'

            //            }
            //        }
            //    },


            //    tooltip: {

            //        enabled: true,
            //        formatter: function () {

            //            return '<b>' + this.series.name + ' : </b>' + this.key + '<br><b>' + this.point.series.yAxis.axisTitle.textStr + ' : </b>' + this.y;
            //        }
            //    },
            //    series: [{
            //        type: 'area',
            //        name: 'HOUR',
            //        data: chartdata,
            //        enabled: false,
            //        colorByPoint: false,
            //        fillColor: {

            //            linearGradient: [0, 0, 0, 300],
            //            stops: [
            //                [0, '#FFFFFF'],
            //              [1, '#669acb']

            //            ]
            //        }

            //    }],
            //    legend: {
            //        enabled: false
            //    },
            //     });
            $('#divlast6hours').highcharts({
                chart: {
                    type: 'line',
                    options3d: { enabled: true }
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                chart: {
                    zoomType: 'xy',
                    backgroundColor: 'transparent',

                },
                xAxis: {
                    labels: {
                        rotation: -25,
                        style: {
                            color: '#333333',
                            margin: "-20px",
                            fontSize: '12px',
                            fontFamily: 'MyriadPro-Regular',
                        }
                    },
                    type: "category",
                    name: 'Role',
                    title: {
                        style: {
                            color: '#333',
                            fontWeight: 'bold',
                            fontSize: '3px',
                            fontFamily: 'Trebuchet MS, Verdana, sans-serif'

                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: "Number of Devices"
                    },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:12px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y} </b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true,

                    //formatter: function () {
                    //    //return '<b>' + legend + ' : </b>' + processed_json[this.x][0] + '<br><b>' + this.point.series.yAxis.axisTitle.textStr + ' : </b>' + this.y;

                    //    return '<b>' + this.point.x + ' : </b>' + this.point.y;
                    //}
                },
                exporting: {
                    enabled: false
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',

                        dataLabels: {
                            enabled: true,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                            style: {
                                textShadow: '0 0 3px black, 0 0 3px black'
                            }
                        }
                    },

                },
                series:
                    chartdata

            });
        }

    </script>
    <%-- <script src="js/gauge.js"></script>--%>
    <style>
        .row
        {
            width:97%;
            margin-left:2%;
        }
        header .row
        {
            margin-left:-15px !important;
             margin-right:-15px !important;
        }

    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" class="activeli_list" value="icon-home-thermo"/>

    <div class="top-header-area">
        <div style="float: left; width: 100%;">
            <h2 style="padding-left: 15px; padding-top:4px;margin-right: 1%;margin-top: 0.3%;">Thermostat Dashboard</h2>
               
        </div>
    </div>

    <uc1:devicechart runat="server" ID="devicechart" />
    <%--<div class="row">
                    <div>
                        <div class="strip">
                            <div class="leftBaro">Device Summary</div>
                            <div class="rightBaro">
                                <ul class="leftF">
                                    <li>
                                        <span id="devices" class="tableCell"></span>
                                        <span class="tableCell"><a href="device-summary.aspx"><img src="images/clickEvent.png" /></a></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="clear"></div>
                        <div class="content">
                            <div class="span5">
                                <div id="cool" class="dashgauge">
                                </div>
                            </div>
                            <div class="span5">
                                <div id="heat" class="dashgauge">
                                </div>
                            </div>
                            <div class="span5 ">
                                <div id="auto" class="dashgauge">
                                </div>
                            </div>
                            <div class="span5 ">
                                <div id="off" class="dashgauge">
                                </div>
                            </div>
                            <div class="span5 ">
                                <div id="offline" class="dashgauge">
                                </div>
                            </div>

                            
                        </div>
                        <div class="clear"></div>
                    </div>
                </div>--%>


    <div class="clear"></div>
     
    <div class="row">
        <div>
            <div class="strip">
                <div class="leftBaro">
                    <asp:HyperLink ID="hplDeviceDetail" runat="server" NavigateUrl="~/Demand-Response/device-summary.aspx" Style="color: white"> Device Detail Summary</asp:HyperLink>
                </div>
                <div class="rightBaro">
                    <ul class="leftF">
                        <li>
                            <span><a href="device-summary.aspx">
                                <img src="images/clickEvent.png" /></a></span>
                        </li>
                    </ul>                    
                </div>
            </div>
            <div class="clear"></div>

            <div class="content" id="tab1">
                <div class="leftBaro boxShadow">
                    <%-- <div class="gHeight">
                                   
                                    <div class="rightSmall" style="height:192px;"></div>
                                </div>--%>
                </div>
                <div class="rightBaro boxShadow" style="width: 100%">
                    <div class="gHeight">
                        <div class="leftBaro">
                            <div class="innerHeading">Last 12 Hours</div>
                        </div>
                        <div class="rightBaro rightText">
                            <%--<select>
                                            <option>Select</option>
                                            <option>One</option>
                                            <option>Two</option>
                                            <option>Three</option>
                                            <option>Four</option>
                                        </select>--%>

                            <asp:DropDownList ID="typeText" runat="server" AutoPostBack="false" CssClass="typeText">
                                <asp:ListItem Text="All" Value="ALL"></asp:ListItem>
                                <asp:ListItem Text="Heat" Value="HEAT"></asp:ListItem>
                                <asp:ListItem Text="Cool" Value="COOL"></asp:ListItem>
                                <asp:ListItem Text="Off" Value="OFF"></asp:ListItem>
                                <asp:ListItem Text="Online" Value="ONLINE"></asp:ListItem>
                                <asp:ListItem Text="Offline" Value="OFFLINE"></asp:ListItem>
                            </asp:DropDownList>
                        </div>
                        <div class="clear"></div>
                        <div style="margin-top: 10px; height: 188px" id="divlast6hours"></div>
                    </div>
                </div>

            </div>
        </div>
    </div>


    <!-- Grid start from Here -->
    <div class="clear"></div>
    <div class="row">
        <div>
            <div class="strip">
                <div class="leftBaro" style="width: 255px;">
                    <asp:HyperLink ID="hprDemandResponse" runat="server" NavigateUrl="~/Demand-Response/demand-response.aspx" Style="color: white">Demand Response Summary</asp:HyperLink>
                </div>
                <div style="float: left">
                    <%--<asp:Image ID="imgAEstatus" runat="server" ImageUrl="images/Active.png" Width="35px"/>--%>
                </div>
                <div class="rightBaro">
                    <ul class="leftF">
                        <li>
                            <span><a href="demand-response.aspx">
                                <img src="images/clickEvent.png" /></a></span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="clear"></div>

            <div class="content">
                <div class="span3">
                    <div class="fixDiv">

                        <div class="innerHeading" style="float: left"><a href="demand-response.aspx" style="color: #656565; text-decoration: none;">Active Events</a></div>
                        <%-- <div style="float:right"><asp:Image ID="imgAEstatus" runat="server" ImageUrl="images/Active.png" /></div>--%>
                    </div>
                    <div id="firstGrid" style="width:100% !important; clear:both;"></div>
                    <div id="divfirstGridError" style="color:red; text-align:center">No Active Event</div>
                </div>
                <div class="span3">
                    <div class="fixDiv">
                        <div class="innerHeading" style="float: left"><a href="demand-response.aspx" style="color: #656565; text-decoration: none;">Pending Events</a> </div>
                        <%-- <div style="float:right"><asp:Image ID="imgPEstatus" runat="server" ImageUrl="images/Pending.png" /></div>--%>
                    </div>
                    <div id="secondGrid" style="width:100% !important; clear:both;"></div>
                     <div id="divsecondGridError" style="color:red; text-align:center">No Pending Event</div>
                </div>
                <div class="span3">
                    <div class="fixDiv">
                        <div class="innerHeading" style="float: left"><a href="demand-response.aspx" style="color: #656565; text-decoration: none;">Past Events</a></div>
                        <%-- <div style="float:right"><asp:Image ID="imgPAEstatus" runat="server" ImageUrl="images/Past.png" /></div>--%>
                    </div>
                    <div id="thirdGrid" style="width:100% !important; clear:both;"></div>
                     <div id="divthirdGridError" style="color:red; text-align:center">No Past Event</div>
                </div>
            </div>
        </div>
    </div>
    <div class="clear"></div>
    <!-- Grid End Here -->
</asp:Content>
