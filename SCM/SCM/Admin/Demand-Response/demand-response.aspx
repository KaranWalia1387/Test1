<%@ Page Title="Demand Response" Language="C#" MasterPageFile="~/Demand-Response/Thermostat.Master" AutoEventWireup="true" CodeBehind="demand-response.aspx.cs" Inherits="AdminPanel.Demand_Response.demand_response" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <meta http-equiv="refresh" content="30" />
    <link href="../js/nprogress/nprogress.css" rel="stylesheet" />
    <script src="../js/nprogress/nprogress.js"></script>
    <style type="text/css">
        
    </style>
    <script type="text/javascript">
        var id = '';
        var EventType = 'active';
        var jsonRecord = [];
        var rowindex = 0;
        var Eventid = "";
        var charttype = 0;//0 - Yearly,1 - Monthly
        $(document).ready(function () {
            try {
                var sPageURL = '';
                <% if (Session.Count != 0)
                   { %>
                json =<%= PastEventdata%>
            jsonActive =<%= ActiveEventdata%>

              jsonPending =<%= PendingEventdata%>
                     jsonChart =<%= Chartdata%>
                           <%}%>

                 //For Event Chart Data
               // EventChartData();
                EventChart(jsonChart);
                BindAllEvents();


                //Bind all events grid
                function BindAllEvents() {

                    Eventid = "firstGrid";
                    // callEventData("Active", Eventid);
                    Events("Active", jsonActive, Eventid)
                    Eventid = "PendingEventGrid";
                    Events("Pending", jsonPending, Eventid)
                    Eventid = "PastEventGrid";
                    //callEventData("Past", Eventid);
                    Events("Past", json, Eventid)


                    //Bydefault device detail show for event which first event grid contain event data
                    if (!jsonActive[0].hasOwnProperty('Message')) {
                        Eventid = "firstGrid";
                        callEventData("Active", Eventid);
                    } else
                        if (!jsonPending[0].hasOwnProperty('Message')) {
                            Eventid = "PendingEventGrid";
                            callEventData("Pending", Eventid);
                            $("#firstGrid").slideUp();
                            $("#activeData").html("0");
                            $("#div-active").hide();
                        } else {
                            Eventid = "PastEventGrid";
                            callEventData("Past", Eventid);
                            $("#firstGrid").slideUp();
                            $("#PendingEventGrid").slideUp();
                            $("#activeData").html("0");
                            $("#pendingData").html("0");
                            $("#div-active").hide();
                            $("#div-pending").hide();
                        }
                    $("#" + Eventid).jqxGrid('selectrow', rowindex);

                    //For redirect page form dashboard with querystring
                    sPageURL = window.location.search.substring(1).split('&');
                    if (sPageURL[0] != "") {
                        var eventId = sPageURL[0].split('=')[1];
                        EventType = sPageURL[1].split('=')[1];
                        rowindex = sPageURL[2].split('=')[1]
                        switch (EventType) {

                            case "active": Eventid = "firstGrid";
                                callEventData("Active", Eventid);
                                type = "Active"; break;
                            case "past":
                                Eventid = "PastEventGrid";
                                callEventData("Past", Eventid);
                                type = "Past"; break;
                            case "pending":
                                Eventid = "PendingEventGrid";
                                callEventData("Pending", Eventid);
                                type = "Pending"; break;
                            default: Eventid = "firstGrid";
                                callEventData("Active", Eventid);
                                type = "Active"; break;
                        }
                        $("#" + Eventid).jqxGrid('selectrow', rowindex);
                        callDeviveData(eventId, EventType);
                        // $('.ddlCategory option[value=' + type + ']').attr("selected", "selected");
                    }
                }
                //else 

                //   // Show only events which contains data
                //    if (!jsonActive[0].hasOwnProperty('Message'))
                //    {
                //        Eventid = "firstGrid"
                //        EventType = "Active";
                //    }else
                //        if (!jsonPending[0].hasOwnProperty('Message')) {
                //            Eventid = "PendingEventGrid";
                //            EventType = "Pending";
                //        } else {
                //            Eventid = "PastEventGrid";
                //            EventType = "Past";
                //        }

                //     // callEventData(EventType, Eventid);

                //  //  $('.ddlCategory option[value=' + EventType + ']').attr("selected", "selected");
                //}



                <%-- //Icon for Events
            if (!jsonActive[0].hasOwnProperty('Message')) {
                $('#<%=imgAEstatus.ClientID%>').attr('src', 'images/past.gif').attr('title', 'Active DR');
            }
            if (jsonActive[0].hasOwnProperty('Message') && jsonPending[0].hasOwnProperty('Message')) {
                $('#<%=imgAEstatus.ClientID%>').attr('src', 'images/Active.png').attr('title', 'No DR');
            }
            if (jsonActive[0].hasOwnProperty('Message') == true && jsonPending[0].hasOwnProperty('Message') == false) {
                $('#<%=imgAEstatus.ClientID%>').attr('src', 'images/Pending.png').attr('title', 'Pending DR');
            }--%>


                // $("#firstGrid").jqxGrid({ height: 150 });
                //$("#eventId").html("Event ID:" + eventId);

                //collaps div left to right
                $(".img_toggle").click(function () {
                    try {
                        $(".showGrid").toggle();
                        $(".showChart").toggleClass("increas_width");
                        if (charttype == 0) {
                            EventChart(jsonChart);
                        }
                        else { EventMonthlyData(); }
                    }
                    catch (ex) { }
                });
                $('#lnkMonthly').click(function () {
                    try {
                        charttype = 1;
                        EventMonthlyData();
                        $(this).addClass('active');
                        $('#lnkYearly').removeClass('active');
                    }
                    catch (e) { }
                });
                $('#lnkYearly').click(function () {
                    try {
                        charttype = 0; EventChart(jsonChart);
                        $(this).addClass('active');
                        $('#lnkMonthly').removeClass('active');
                    }
                    catch (e) { }
                });
                $(".img_toggle_demand_response").click(function () {

                    $(".showChart").toggle();
                    $(".showGrid").toggleClass("increas_width");
                    EventChart(jsonChart);

                    if ($(".showGrid").css("width") > 1000) {
                        $("#firstGrid").jqxGrid({ width: '49%' });
                        $("#PastEventGrid").jqxGrid({ width: '49%' });
                        $("#PendingEventGrid").jqxGrid({ width: '49%' });
                        $("#jqxgrid").jqxGrid({ width: '49%' });
                    }
                    else {
                        $("#firstGrid").jqxGrid({ width: '100% ' });
                        $("#PastEventGrid").jqxGrid({ width: '100% ' });
                        $("#PendingEventGrid").jqxGrid({ width: '100% ' });
                        $("#jqxgrid").jqxGrid({ width: '100%' });
                    }
                });

                //


                $(".collaps").click(function () {

                    var griddiv = $(this).parent().parent().next();
                    $(griddiv).slideToggle();
                });
                //$("#imgCollapseEvent").click(function () {
                //    
                //    $('#showChart').css('width', '0%');
                //    $('#showGrid').css('width', '100%');

                //});
                //$("#imgCollapse").click(function () {
                //    
                //    $('#showChart').css('width', '100%');
                //    $('#showGrid').css('width', '0%');

                //});

                $("#imgmonthly").click(function () {

                    EventMonthlyData();
                });
                $('.ddlCategory').change(function () {
                    //loader
                    NProgress.start();

                    rowindex = 0;
                    var selectedItem = $('.ddlCategory option:selected');
                    charttype = $(selectedItem).val();
                    titletext = $(selectedItem).text();

                    EventType = charttype.toLowerCase();
                    callEventData(charttype);
                    // GetDevice(jsonRecord); $("#eventId").html("Event ID: No Data ");
                    NProgress.done();//end loading
                });

                //Event Chart data for 12 month
                function EventMonthlyData() {

                    $.ajax({
                        type: "POST",
                        url: "demand-response.aspx/GetMonthlychartDetail",
                        data: '',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: OnSuccess,
                        async: false,

                        failure: function (response) {
                            // alert(response.d);
                            return response.d;
                        }
                    });
                }
                function OnSuccess(response) {

                    var jsonchart = $.parseJSON(response.d);
                    var seriesArray = new Array();
                    for (var y = 0; y < jsonchart.Table1.length; y++) {
                        processed_json = new Array();
                        switch (y) {
                            case 0: data = jsonchart.series1; color = '#1E90FF'; break;
                            case 1: data = jsonchart.series2; color = '#FF9933'; break;
                            case 2: data = jsonchart.series3; color = '#FF0000'; break;
                            default: data = jsonchart.series1; break;
                        }
                        $.map(data, function (obj, i) {

                            processed_json.push([obj.MONTH, parseInt(obj.Count)]);
                        });
                        seriesArray[y] = new Array();
                        seriesArray[y]['name'] = jsonchart.Table1[y].Type;
                        seriesArray[y]['data'] = processed_json;
                        seriesArray[y]['color'] = color;
                        //  processed_json = [];
                    }
                    ShowMonthlyChartData(seriesArray);
                }

                //Get Data for all EVENTS
                function callEventData(Event, Eventid) {

                    EventType = Event;
                    var eventImage = Event + '.png';
                    $('.eventImage').attr('src', 'images/' + eventImage);
                    //$('#heading').html(Event + " Events");

                    $.ajax({
                        type: "POST",
                        url: "demand-response.aspx/GetEventsDetail",
                        data: '{Event: "' + Event + '" }',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: OnSuccessData,
                        async: false,

                        failure: function (response) {
                            // alert(response.d);
                            return response.d;
                        }
                    });
                }
                function OnSuccessData(response) {

                    var json = $.parseJSON(response.d);
                    Events(EventType, json, Eventid);
                    return response.d;
                }
                $("#firstGrid").bind('cellclick', function (event) {

                    //loader
                    NProgress.start();

                    var data = '';
                    try {
                        var column = event.args.column.text;
                        var rowindex = event.args.rowindex;
                        var ViewObj = $('#firstGrid').jqxGrid('getrowdata', rowindex);
                        //    if (column == "Event ID") {

                        EventType = "Active";
                        callDeviveData(ViewObj.EVENTID, EventType)


                        //  }
                    }
                    catch (error)
                    { }

                    NProgress.done();//end loading
                });

                $("#PendingEventGrid").bind('cellclick', function (event) {

                    //loader
                    NProgress.start();

                    var data = '';
                    try {
                        var column = event.args.column.text;
                        var rowindex = event.args.rowindex;
                        var ViewObj = $("#PendingEventGrid").jqxGrid('getrowdata', rowindex);
                        //    if (column == "Event ID") {

                        EventType = "Pending";
                        callDeviveData(ViewObj.EVENTID, EventType)


                        //  }
                    }
                    catch (error)
                    { }

                    NProgress.done();//end loading
                });
                $("#PastEventGrid").bind('cellclick', function (event) {

                    //loader
                    NProgress.start();

                    var data = '';
                    try {
                        var column = event.args.column.text;
                        var rowindex = event.args.rowindex;
                        var ViewObj = $("#PastEventGrid").jqxGrid('getrowdata', rowindex);
                        //    if (column == "Event ID") {

                        EventType = "Past";
                        callDeviveData(ViewObj.EVENTID, EventType)


                        //  }
                    }
                    catch (error)
                    { }

                    NProgress.done();//end loading
                });
            }
            catch (ex) { }
        });

        //Filter Data according to EventID
        function callDeviveData(id, type) {

            $("#eventId").html("Event ID:" + id);
            $.ajax({
                type: "POST",
                url: "demand-response.aspx/GetDeviceDetailById",
                data: '{id: "' + id + '",type:"' + type + '" }',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: OnSuccessByID,
                async: false,

                failure: function (response) {
                    // alert(response.d);
                    return response.d;
                }
            });
        }
        function OnSuccessByID(response) {

            var json = $.parseJSON(response.d);
            GetDevice(json);
            // Events(json);
            return response.d;
        }
        //Bind Events On Grid
        function Events(Event, json, Eventid) {

            if (json[0].hasOwnProperty('Message')) {
                json = [];
                GetDevice(jsonRecord); $("#eventId").html("Event ID: No Data ");
            }
            else { callDeviveData(json[0].EVENTID, EventType); }

            var source =
            {
                localdata: json,
                datatype: "array",
                datafields: [
                { name: 'RNUM', type: 'string' },
                { name: 'EVENTID', type: 'string' },
                { name: 'COUNT', type: 'string' },
                { name: 'NoticeTime', type: 'date' },
                { name: 'StartTime', type: 'date' },
                { name: 'EndTime', type: 'date' },
                { name: 'DT', type: 'date' },
                { name: 'MIN', type: 'string' }
                ]
            };

            var dataAdapter = new $.jqx.dataAdapter(source);
            var imagerenderer = function (row, datafield, value) {

                switch (datafield) {
                    case "RNUM": return Serial(row, value); break;
                    case "EVENTID": return Event(row, value); break;
                    case "DT": return GetDate(row, value); break;

                    default: break;

                }


            }

            $("#" + Eventid).jqxGrid(
            {
                width: '100%',
                height: 150,
                source: dataAdapter,
                columnsresize: true,
                pageable: true,
                pagesizeoptions: ['10', '20', '35', '50'],
                enabletooltips: true,
                pagesize: 20,
                columns: [
                { text: 'Sr.No.', dataField: 'RNUM', width: '9%', cellsrenderer: imagerenderer },
                { text: 'Event ID', dataField: 'EVENTID', width: '13%' },
                { text: 'Event Date', dataField: 'DT', width: '13%', cellsformat: 'MM/dd/yyyy h:mm tt' },
                { text: 'Event Notice Time', dataField: 'NoticeTime', width: '13%', cellsformat: 'MM/dd/yyyy h:mm tt' },
                { text: 'Event Start Time', dataField: 'StartTime', width: '13%', cellsformat: 'MM/dd/yyyy h:mm tt' },
                { text: 'Event End Time', dataField: 'EndTime', width: '13%', cellsformat: 'MM/dd/yyyy h:mm tt' },
                { text: 'Duration of Event (in mins)', editable: false, dataField: 'MIN', width: '13%', hidden: false },
                { text: 'Number of Devices', editable: false, dataField: 'COUNT', width: '13%' },
                ]
            });
            var localizationobj = {};
            localizationobj.emptydatastring = "No " + Event + " Event";
            $("#" + Eventid).jqxGrid('localizestrings', localizationobj);
            //$("#" + Eventid).jqxGrid('selectrow', rowindex);

        }
        function Serial(row, value) {
            try {

                var SR = row + 1;
                return '<div style="padding-left:3px;padding-top:2px" >' + SR + '</div>'
            }
            catch (error)
            { }
        }
        function Event(row, value) {
            try {

                var id = $('#' + Eventid).jqxGrid('getrowdata', row).EVENTID;
                var type = EventType;
                return '<div style="padding-left:3px;padding-top:2px" ><a href="#">' + value + '</a></div>'
            }
            catch (error)
            { }
        }
        function GetDate(row, value) {
            try {
                var datetime = $('#' + Eventid).jqxGrid('getrowdata', row).DT;
                var date = datetime.split(' ')[0];
                return '<div style="padding-left:3px;padding-top:2px" >' + date + '</div>'
            }
            catch (error)
            { }
        }

        $(document).ready(function () {
            try {
                //$("#jqxgrid").jqxGrid({ height: 280 });

                $(".popUp").click(function () {
                    alert("asdasd");
                });
                // prepare the data


                $("#jqxgrid").bind('cellclick', function (event) {

                    var data = '';
                    try {
                        var column = event.args.column.text;
                        var rowindex = event.args.rowindex;
                        var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', rowindex);
                        if (column == "Device ID") {
                            if (ViewObj.TID == undefined) {
                                id = jsonRecord.TID;
                            } else { id = ViewObj.TID; }

                            call(id);


                        }
                    }
                    catch (error)
                    { }
                });
                function call(id) {

                    $.ajax({
                        type: "POST",
                        url: "demand-response.aspx/GetdeviceDetail",
                        data: '{id: "' + id + '" }',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: OnSuccess,
                        async: false,

                        failure: function (response) {
                            // alert(response.d);
                            return response.d;
                        }
                    });
                }
                function OnSuccess(response) {

                    var json = $.parseJSON(response.d);
                    var fanS = '';
                    var LEDS = '';
                    switch (json.TStatRecord.TStatRecord.TR.FAN) {
                        case "0": $('#fan').html('Auto'); $('#imgfan').attr('src', 'images/auto.png'); break;
                        case "1": $('#fan').html('Auto/Circulate'); $('#imgfan').attr('src', 'images/auto.png'); break;
                        case "2": $('#fan').html('On'); $('#imgfan').attr('src', 'images/fan-image.jpg'); break;
                        case "-1": $('#fan').html('Off'); $('#imgfan').attr('src', 'images/fan-Grey.jpg'); break;
                        default: $('#fan').html('Off'); $('#imgfan').attr('src', 'images/fan-Grey.jpg'); break;
                    }
                    switch (json.TStatRecord.TStatRecord.TR.LED) {
                        case "1": $('#LStatus').html('Green'); $('#imgled').attr('src', 'images/LED - Green.png'); break;
                        case "2": $('#LStatus').html('Amber'); $('#imgled').attr('src', 'images/LED - Amber.png'); break;
                        case "4": $('#LStatus').html('Red'); $('#imgled').attr('src', 'images/LED - Red.png'); break;
                        default: $('#LStatus').html('N/A'); $('#imgled').removeAttr('src'); $('#LEDColor').css("background-color", "#FFFFFF"); $('#LEDColor').css("display", "block"); break;
                    }
                    switch (json.TStatRecord.TStatRecord.TR.CURMODE) {
                        case "0": $('#CThermoState').html("Off"); $('#imgCThermoState').attr('src', 'images/LED-Grey.png'); break;
                        case "1": $('#CThermoState').html("Heat"); $('#imgCThermoState').attr('src', 'images/Heating-amber.png'); break;
                        case "2": $('#CThermoState').html("Cool"); $('#imgCThermoState').attr('src', 'images/thermostat-target-mode-image.jpg'); break;
                    }
                    switch (json.TStatRecord.TStatRecord.TR.TARMODE) {
                        case "0": $('#CThermoStateTarget').html("Off"); $('#Thermotarget').attr('src', 'images/LED-Grey.png'); break;
                        case "1": $('#CThermoStateTarget').html("Heat"); $('#Thermotarget').attr('src', 'images/Heating-amber.png'); break;
                        case "2": $('#CThermoStateTarget').html("Cool"); $('#Thermotarget').attr('src', 'images/thermostat-target-mode-image.jpg'); break;
                        case "3": $('#CThermoStateTarget').html("Auto"); $('#Thermotarget').attr('src', 'images/auto.png'); break;
                    }
                    $('#temp').html(json.TStatRecord.TStatRecord.TR.TEMP + "°F");
                    if (json.TStatRecord.TStatRecord.TR.CURMODE == "1") {
                        $('#imgtargetTemp').attr('src', 'images/target-temprature-image.jpg');
                        $('#TTemp').html(json.TStatRecord.TStatRecord.TR.HTR + "°F");
                    } else if (json.TStatRecord.TStatRecord.TR.CURMODE == "2") {
                        $('#imgtargetTemp').attr('src', 'images/target-temprature-image.jpg');
                        $('#TTemp').html(json.TStatRecord.TStatRecord.TR.CTR + "°F");
                    }
                    else { $('#imgtargetTemp').attr('src', 'images/Target Temperature - Grey.png'); $('#TTemp').html("No Data"); }


                    return response.d;

                }
            }
            catch (ex) { }
        });
        function GetDevice(data) {
            $('.deviceDetailHeader').html("Demand Response Details (" + EventType + " Event)");
            $('#jqxgrid').jqxGrid('selectrow', -1);
            jsonRecord = data;
            if (jsonRecord.hasOwnProperty("DREventRecord")) {
                jsonRecord = jsonRecord.DREventRecord.TStatDataSet.TStatRecords;

            } else { jsonRecord = []; }

            var source =
            {
                localdata: jsonRecord,
                datatype: "array",
                datafields:
                [
                    { name: 'TID', type: 'string' },
                    //{ name: 'CommunicationStatus', type: 'string' },
                    //{ name: 'LEDStatus', type: 'string' },
                    //{ name: 'drparticipationstatus', type: 'string' },
                    //{ name: 'DREventStatus', type: 'string' },
                    //{ name: 'DeviceStatus', type: 'string' }
                ]
            };

            var dataAdapter = new $.jqx.dataAdapter(source);
            //var renderer = function (row, column, value) {
            //    var rid = $('#jqxgrid').jqxGrid('getrowdata', row).TID;
            //    if (jsonRecord.TID != undefined) {
            //        rid = jsonRecord.TID;
            //    }

            //    return "<a class='clickButton fancybox' id='" + row + "' rid='" + rid + "' href='#inline1' style='padding-top: 3px;'><img src='images/detailed-view.png' /></a>";
            //}
            var rendererID = function (row, column, value) {
                var rid = $('#jqxgrid').jqxGrid('getrowdata', row).TID;
                if (jsonRecord.TID != undefined) {
                    rid = jsonRecord.TID;
                    return "<div style='padding-left:3px;padding-top:2px;' ><a class='clickButton fancybox' id='" + row + "' rid='" + rid + "' href='#inline1' style='padding-top: 3px;color:blue;text-decoration: underline'>" + rid + "</a></div>";

                }
                else { return "<div style='padding-left:3px;padding-top:2px;color:blue' ><a class='clickButton fancybox' id='" + row + "' rid='" + rid + "' href='#inline1' style='padding-top: 3px;color:blue;text-decoration: underline'>" + rid + "</a></div>" }
            }
            $("#jqxgrid").jqxGrid(
            {
                width: '99.8%',
                height: 150,
                source: dataAdapter,
                columnsresize: true,
                enabletooltips: true,
                pageable: true,
                columns: [
                     // { text: 'Device Detail', dataField: 'View', width: '15%', cellsrenderer: renderer },
                  { text: 'Device ID', dataField: 'TID', width: '30%', cellsrenderer: rendererID },
                  //{ text: 'Communication Status', dataField: 'CommunicationStatus', width: '15%' },
                  //{ text: 'LED Status', editable: false, dataField: 'LEDStatus', width: '15%' },
                  //{ text: 'DR Participation Status', dataField: 'drparticipationstatus', width: '15%', cellsalign: 'left' },
                  //{ text: 'DR Event Status', dataField: 'DREventStatus', width: '15%', cellsalign: 'left', cellsformat: 'c2' },
                  //{ text: ' Device Status Date and Time Stamp', dataField: 'DeviceStatus', cellsalign: 'left', cellsformat: 'c2', width: '30%' }
                ]
            });
        }

        function EventChart(Data) {

            try {
                var charttype = 'column';
                processed_json = [];
                $.map(Data, function (obj, i) {

                    processed_json.push([obj.Type, parseInt(obj.Count)]);
                });
                $('#EventChartdata').highcharts({
                    credits: {
                        enabled: false
                    },
                    chart: {
                        zoomType: 'xy'
                    },
                    title: {
                        text: ''
                    },

                    yAxis: {
                        min: 0,
                        allowDecimals: false,
                        title: {
                            text: 'Count',
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
                        }, labels: {
                            formatter: function () {
                                return this.value;
                            }
                        }

                    },
                    xAxis: {
                        labels: {
                            rotation: -25,
                            style: {
                                color: '#333333',
                                margin: "-20px",
                                fontSize: '10px',
                            }
                        },
                        type: "category",
                        name: "Count",
                        title: {
                            style: {
                                color: '#333',
                                fontWeight: 'bold',
                                fontSize: '3px',
                                fontFamily: 'Trebuchet MS, Verdana, sans-serif'

                            }
                        },

                    },
                    exporting: {
                        enabled: false
                    },
                    tooltip: {

                        formatter: function () {

                            return '<b>' + this.series.name + ' : </b>' + this.key + '<br><b> ' + this.x + ' : </b>' + this.y;
                        }
                    },
                    plotOptions: {
                        series: {
                            dataLabels: {
                                stacking: 'normal',
                                //align: 'top',
                                //inside: true,
                                x: 0,
                                enabled: true,
                                formatter: function () {
                                    if (this.y === 0) {
                                        return null;
                                    }
                                    else
                                        return this.y;
                                }
                            },
                            style: {
                                color: 'black',
                                fontSize: '10px'
                            }
                        }
                    },
                    series: [{
                        type: charttype,
                        name: 'Last 12 Month',
                        data: processed_json,
                        colors: ['#1E90FF', '#FF9933', '#FF0000'],
                        colorByPoint: true,

                    }],


                });

            }
            catch (ex)
            { }
        }
        function ShowMonthlyChartData(chartdata) {
            $('#ChartTitle').html('Demand Response Monthly Summary');
            $('#EventChartdata').highcharts({
                chart: {
                    type: 'column',
                    options3d: { enabled: true }
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    labels: {
                        rotation: -25,
                        style: {
                            color: '#333333',
                            margin: "-20px",
                            fontSize: '12px',
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
                        text: "Count"
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
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true,


                },
                exporting: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            stacking: 'normal',
                            //align: 'top',
                            //inside: true,
                            x: 0,
                            enabled: true,
                            formatter: function () {
                                if (this.y === 0) {
                                    return null;
                                }
                                else
                                    return this.y;
                            }
                        },
                        style: {
                            color: 'black',
                            fontSize: '10px'
                        }
                    }
                },
                series: chartdata
            });

        }
    </script>
    <script>
        $(document).ready(function () {
            var open = true;
            $(".click_me").click(function () {

                $(".span3").slideToggle();
                if (open) {
                    open = false;
                    $("#button-sidebar-2").css({ "background": "url('images/arrow_down.png') no-repeat center center", "margin-left": "7px" });
                } else {
                    open = true;
                    $("#button-sidebar-2").css({ "background": "url('images/arrow_up.png') no-repeat center center", "margin-left": "0px" });
                }

            });
        });

        $(document).ready(function () {
            var open = true;
            $(".click_me_again").click(function () {

                $(".show-hide").slideToggle();
                if (open) {
                    open = false;
                    $("#button-sidebar-new").css({ "background": "url('images/arrow_down.png') no-repeat center center", "margin-left": "-9px" });
                } else {
                    open = true;
                    $("#button-sidebar-new").css({ "background": "url('images/arrow_up.png') no-repeat center center", "margin-left": "-9px" });
                }

            });
        });

    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" class="activeli_list" value="icon-dr-thermo" />
    <div style="padding: 10px 15px;">
        <div class="strip">
            <div class="leftBaro">Demand Response Summary</div>
            <div class="rightBaro">
                <ul class="leftF">
                    <li>
                        <span></span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="clear" style="margin-bottom: 3px;"></div>

        <div class="showGrid">


            <div>
                <div class="Nstrip">
                    <div class="leftBaro" style="padding-bottom: 4px; font-size: 16px;">Demand Response Events</div>
                    <div style="float: right; margin-right: 7px;">
                        <%-- <asp:Image ID="imgAEstatus" runat="server" ImageUrl="images/Active.png" Width="35px" />--%>
                        <a href="javascript:void(0);" id="button-sidebar-2" class="click_me ir"></a>
                        <%--<img id="imgCollapseEvent" src="images/clickEvent.png" style="cursor: pointer;" title="Collapse" class="img_toggle_demand_response" />--%>
                    </div>

                </div>
                <div class="clear"></div>

                <div class="content">
                    <div class="span3" style="width: 100%">
                        <div class="fixDiv" id="div-active">
                            <div id="heading" class="innerHeading" style="float: left">Active Events</div>
                            <%--    <div style="float:right"><asp:Image ID="imgAEstatus" runat="server" class="eventImage" ImageUrl="images/Active.png" /></div>--%>
                            <div id="activeData" style="float: right">
                                <%--<img src="images/clickEvent.png" class="collaps" style="width: 15px;" />--%>
                                <%--<a href="javascript:void(0);" id="A3" class="click_me ir"></a>--%>
                            </div>
                        </div>
                        <div id="firstGrid"></div>
                    </div>
                    <div class="span3" style="width: 100%; margin-left: 0px;">
                        <div id="div-pending" class="fixDiv">
                            <div class="innerHeading" style="float: left">Pending Events</div>
                            <div id="pendingData" style="float: right">
                                <%--<img src="images/clickEvent.png" class="collaps" style="width: 15px;" />--%>
                                <%--<a href="javascript:void(0);" id="A2" class="click_me ir"></a>--%>
                            </div>

                        </div>
                        <div id="PendingEventGrid">
                        </div>
                    </div>
                    <div class="span3" style="width: 100%; margin-left: 0px;">
                        <div class="fixDiv">
                            <div class="innerHeading" style="float: left">Past Events</div>
                            <div id="pastData" style="float: right">
                                <%--<img src="images/clickEvent.png" class="collaps" style="width: 15px;" />--%>
                                <%--<a href="javascript:void(0);" id="A1" class="click_me ir"></a>--%>
                            </div>

                        </div>
                        <div id="PastEventGrid">
                        </div>
                    </div>
                </div>
            </div>


            <!-- strip -->
            <div class="Nstrip" style="margin-top: 10px; margin-bottom: 10px;">
                <div class="leftBaro" style="width: 63%; padding-bottom: 4px; font-size: 16px;">
                    <asp:Label ID="deviceDetailHeader" runat="server" CssClass="deviceDetailHeader" Style="width: 100%"></asp:Label>
                </div>
                <div class="rightBaro" style="text-align: right; width: 3%">
                    <a href="javascript:void(0);" id="button-sidebar-new" class="click_me_again ir"></a>
                </div>
            </div>

            <!-- End strip -->
            <div class="fixDiv">
                <div id="eventId" class="innerHeading"></div>
            </div>
            <div class="content box-shadow show-hide" style="clear: both;">

                <!-- End grid content -->
                <div id="jqxgrid">
                </div>
            </div>
            <!-- End content -->


        </div>

        <div class="showChart">
            <div class="Nstrip_Left" style="margin-top: 10px; padding-top: 2px; padding-bottom: 2px;">
                <div class="leftBaro" style="width: 51%; font-size: 16px; line-height: 30px;" id="ChartTitle">Demand Response Annual Summary</div>
                <div style="float: right">
                    <%--<img id="imgmonthly" src="images/icon-monthly.png" style="width: 30px; cursor: pointer;" title="Monthly" />--%>
                    <a href="#" id="lnkMonthly">Monthly</a>
                    <a href="#" id="lnkYearly" class="active">Yearly</a>
                    <%--<img id="imgCollapse" src="images/collapse.jpg" style="width: 15px; cursor: pointer;" title="Collapse" class="img_toggle" />--%>
                </div>

            </div>
            <div id="EventChartdata" style="height: 200px; float: left; width: 99.8%;"></div>
        </div>
        <div class="clear"></div>
        <!-- Grid End Here -->


        <!-- end row -->
        <div id="inline1" style="display: none;">
            <div class="fancybox-title">Device Details</div>
            <ul>
                <li>
                    <span>Temperature</span>
                    <img src="images/temprature-image.jpg" />
                    <strong id="temp"></strong>
                </li>

                <li>
                    <span>Fan Operation Mode</span>
                    <img id="imgfan" src="images/fan-image.jpg" />
                    <strong id="fan"></strong>
                </li>

                <li>
                    <span>Current Thermostat Mode</span>
                    <img id="imgCThermoState" src="images/current-thermostat-mode-image.jpg" />
                    <strong id="CThermoState"></strong>
                </li>

                <li>
                    <span>Thermostat Target Mode</span>
                    <img id="Thermotarget" src="images/thermostat-target-mode-image.jpg" />
                    <strong id="CThermoStateTarget"></strong>
                </li>

                <li>
                    <span>Target Temperature</span>
                    <img id="imgtargetTemp" src="images/target-temprature-image.jpg" />
                    <strong id="TTemp"></strong>
                </li>

                <li>
                    <span>LED Status</span>
                    <%--<img src="images/led-status-image.jpg" />--%>
                    <img id="imgled" src="images/LED - Green.png" />
                    <div id="LEDColor" style="height: 96px; margin-left: 30px; margin-right: 15px; width: 100px; height: 100px; border-radius: 50px; font-size: 20px; color: #fff; line-height: 100px; text-align: center; display: none; }"></div>
                    <strong id="LStatus"></strong>
                </li>

            </ul>
        </div>
    </div>
</asp:Content>

