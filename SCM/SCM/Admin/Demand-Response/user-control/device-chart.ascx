<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="device-chart.ascx.cs" Inherits="AdminPanel.Demand_Response.user_control.device_chart" %>

<script src="../js/gauge.js"></script>
<script>

    $(document).ready(function () {



        //For redirect page form dashboard with querystring
        sPageURL = window.location.pathname.split('/')[1];
        if (sPageURL == "dashboard.aspx") {
            $('#Title').attr('href', 'device-summary.aspx');
        } else {
            $('#Title').css('text-decoration', 'none');
            $('#Title').css('cursor', 'default');
        }

        json =<%= data%>
        jsonLastlogin =<%=Logindevice%>
        jsonHalf =<%=halfhour%>

           i = 0;

        //online/offline detail and chart detail
        $("#devices").html(json.SummaryRecords.SummaryDataSet.SummaryData.ONLINE + " of " + json.SummaryRecords.SummaryDataSet.SummaryData.TOTAL + " Devices Online");
        //try{ 
        //    chartonlineoffline(json,jsonLastlogin,jsonHalf)
        //}
        //catch (ex) { }

        //$('.overlay').on('click', function () {
        //    var id = $(this).prev().attr('id');
        //    //callMode(id);
        //  //  window.location.href = "device-summary.aspx?id=" + id;
        //});


        dashGaugeData["min"] = 0;
        dashGaugeData["max"] = parseInt(json.SummaryRecords.SummaryDataSet.SummaryData.TOTAL);
        dashGaugeData["cool"] = parseInt(json.SummaryRecords.SummaryDataSet.SummaryData.COOL);
        dashGaugeData["heat"] = parseInt(json.SummaryRecords.SummaryDataSet.SummaryData.HEAT);
        dashGaugeData["auto"] = 0;
        dashGaugeData["off"] = parseInt(json.SummaryRecords.SummaryDataSet.SummaryData.OFF);
        dashGaugeData["offline"] = parseInt(json.SummaryRecords.SummaryDataSet.SummaryData.OFFLINE);
        dashGaugeData["online"] = parseInt(json.SummaryRecords.SummaryDataSet.SummaryData.ONLINE);

        initGaugeOptions('#82CAFA', '#82CAFA', '#82CAFA', 'cool');
       // drawGauge('cool', '#82CAFA');
        initGaugeOptions('#F88017', '#F88017', '#F88017', 'heat');
       // drawGauge('heat', '#F88017');
       // initGaugeOptions('#82CAFA', '#82CAFA', '#82CAFA', 'auto');
       // drawGauge('auto', '#82CAFA');
        initGaugeOptions('#00FF00', '#00FF00', '#00FF00', 'online');
        //drawGauge('online', '#00FF00');
        initGaugeOptions('#FBB117', '#FBB117', '#FBB117', 'off');
       // drawGauge('off', '#FBB117');
        initGaugeOptions('#828285', '#828285', '#828285', 'offline');
       // drawGauge('offline', '#828285');
    });
</script>
<script src="../js/gauge.js"></script>
 <div class="row">
        <!-- row -->
        <div>
            <!-- faltu -->
            <!-- strip -->
            <div class="strip">
                <div class="leftBaro"><a href="#" id="Title" style="color: white;">Device Summary</a></div>
                <div class="rightBaro">
                    <ul class="leftF">
                        <li>
                            <span id="devices"></span>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- End strip -->

            <div class="clear"></div>
            <!-- Content -->
            <div class="content">
                <div class="span5" id="abc">
                    <div id="cool" class="dashgauge">
                    </div>
                    <div class="overlay"><%--Placeholder to provide a high level div to click on--%></div>
                </div>
                <div class="span5">
                    <div id="heat" class="dashgauge">
                    </div>
                    <div class="overlay"><%--Placeholder to provide a high level div to click on--%></div>
                </div>
              <%--  <div class="span5 ">
                    <div id="auto" class="dashgauge">
                    </div>
                </div>--%>
                   <div class="span5 ">
                    <div id="online" class="dashgauge">
                    </div>
                       <div class="overlay"><%--Placeholder to provide a high level div to click on--%></div>
                </div>
                <div class="span5 ">
                    <div id="off" class="dashgauge">
                    </div>
                    <div class="overlay"><%--Placeholder to provide a high level div to click on--%></div>
                </div>
                <div class="span5 ">
                    <div id="offline" class="dashgauge">
                    </div>
                    <div class="overlay"><%--Placeholder to provide a high level div to click on--%></div>
                </div>
            </div>
            <!-- End strip -->
        </div>
        <!-- End faltu -->
    </div>
    <!-- end row -->
