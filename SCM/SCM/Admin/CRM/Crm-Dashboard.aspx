<%@ Page Title="CRM Dashboard" Language="C#" MasterPageFile="~/CRM/CRM.master" AutoEventWireup="true" CodeBehind="Crm-Dashboard.aspx.cs" Inherits="AdminPanel.CRM.Crm_Dashboard" %>

<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>


<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <script src="../js/Crm-Dashboard.js"></script>
    <uc1:jqxGrid runat="server" ID="jqxGrid" />
   <%-- <script src="../js/highchart_js/common-chart.js"></script>--%>
    <script src="../js/AdminReport_CommonFunctions.js"></script>
    <script>
        $(document).ready(function () {
            $("ul.tabs li.sidebar_dashboard").addClass("active");

        });
    </script>
    <style type="text/css">
        .chart1_box1, .grid1_box1 {
            width:100%;
               height: 259px;
            overflow: auto;
            border: 1px solid #ddd;
            margin-bottom:10px;
        }
        @media (min-width:1500px) and (max-width:3500px){

                  .chart1_box1, .grid1_box1 {
                           height: 414px !important;
                    }
        }

        .crm_bottom_content_area .usage_date_time {
            width: 39%;
        }
        .crm_bottom_content_area .low_usage_box {
                padding-top: 10px;
        }
            .crm_bottom_content_area .low_usage_box b {
                font-weight:normal;
            }   

        .usage_date_time label {
            font-weight: bold !important;
                         
              padding-right: 11px;
        }


           .lgnd_box_right .left-active-sprites > ul > li.graph > a.active {
            background: rgba(0, 0, 0, 0) url("../images/column-chart-active.png") no-repeat scroll center top !important;
            display: block;
        }

.lgnd_box_right .left-active-sprites ul li.graph a {
    background: rgba(0, 0, 0, 0) url("../images/column-chart.png") no-repeat scroll center top !important;
    display: block;
    height: 18px;
    margin: 0;
    padding: 0;
    width: 18px;
}


         #page_loader {
            background-image: url('../images/ajax-loader.gif');
            background-repeat: no-repeat;
            background-position: center;
            width: 100%;
            height: 100%;
            background-color: white;
            opacity: .7;
            display: none;
            position: absolute;
            top: 0px;
            z-index: 99999999;
        }

           .filter-section .input-section select {
            width: 88%;
        }


        .exprt-filtr {
            float: right;
            width: 129px;
        }

        .filter_button {
            padding-left: 23px;
            width: 107px;
        }

        .add_btn img {
            float: left;
            margin-left: 20px;
            padding-right: 0px;
        }

        .filter_button, .filter_button.active {
            margin-top: 0px !important;
            width: 107px;
        }



            .filter_button.active span {
                display: block;
                font-weight: bold;
                margin-top: -9px;
                color: #758386;
            }

        .add_btn a {
            color: #94d60a !important;
            font-weight: bold;
        }

        a {
            color: #337ab7;
            text-decoration: none;
        }

    </style>
    <div class="top-header-area" style="border-bottom: 6px solid #ededed;">
        <div style="float: left; width: 35%;">
            <h2>CRM Dashboard</h2>
        </div>
        <div class="filter_area_ui">
            <div class="exprt-filtr">

                <div class="fliter_button_area" style="display:none;">
                    <div class="filter_button" id="filter_btn_explorer"><span style="font-weight: bold;">Filter Results</span></div>
                </div>
            </div>
        </div>
    </div>
      <div id="page_loader2" style="display: none">
        Loading....
    </div>

    <div id="page_loader">
    </div>
    <div class="filter-section" id="divFilter" style="display: none;">
        <div class="expand-one">
            <p class="filter_section_link" style="display: none;">
                <img class="imgtoggle" src="Usage%20Report_files/a.png">Filter</p>
            <div class="content">
                <div class="input-section">
                    <input readonly="readonly" id="txtDateFrom" title="From date " placeholder="From Date" style="width: 90%;" type="text">
                    <input id="ContentPlaceHolder1_rightpanel_btnDateFrom" title="From date" class="icon-cal" src="../images/Icon-calendar.png" type="image">
                </div>
                <div class="input-section">
                    <input readonly="readonly" id="txtDateTo" title="To date" placeholder="To Date" style="width: 90%;" type="text">
                    <input id="ContentPlaceHolder1_rightpanel_btnDateTo" title="To date" class="icon-cal" src="../images/Icon-calendar.png" type="image">
                </div>
                <div class="input-section">
                    <select name="ctl00$ctl00$ContentPlaceHolder1$rightpanel$ddlCity" id="ddlCity" title="Location">
                        <option selected="selected" value="">--Location--</option>
                        <option value="1" style="background-color: #E6E6E6; padding-left: 0px; font-weight: bold;" key="CityName">Chino Hills</option>
                        <option value="91709" style="background-color: white; padding-left: 20px !important" key="Zipcode" cityid="1" cityname="Chino Hills">91709</option>
                        <option value="6576" style="background-color: #E6E6E6; padding-left: 0px; font-weight: bold;" key="CityName">Davidson</option>
                        <option value="37214" style="background-color: white; padding-left: 20px !important" key="Zipcode" cityid="6576" cityname="Davidson">37214</option>
                        <option value="37216" style="background-color: white; padding-left: 20px !important" key="Zipcode" cityid="6576" cityname="Davidson">37216</option>
                    </select>
                </div>
                <div class="input-section">
                    <select id="ddlAccountType" title="Account Type">
                        <option selected="selected" value="">Account Type</option>
                        <option value="1">Residential</option>
                        <option value="2">C&amp;I</option>
                    </select>
                </div>
                <div class="input-section" style="width: auto  !important; float: right; margin: 5px 20px;">
                    <input name="ctl00$ctl00$ContentPlaceHolder1$rightpanel$btnFilter" value="Filter Results" onclick="return false;" id="btnFilter" title="Search" class="filterBtn" style="margin: 0px;" type="submit">
                </div>
            </div>
        </div>
    </div>


    <div class="grid-section">
        <div class="" id="altrnte">
            <div class="crm-dashboard-area pie_ico_dash" id="devices">
                <ul>
                    <li id="ContentPlaceHolder1_rightpanel_Module0">
                        <h3><a href="crm-segmentations.aspx">Segment</a>
                            <div class="left-active-sprite">
                                <ul class="nav nav-tabs">
                                    <li class="chart crm_new_event_chart"><a data-toggle="tab" href="#chart" onclick="switchview('gridSegment','Segmentchart','Segmentbargraph');"></a></li>
                                    <li class="graph crm_new_event_graph"><a data-toggle="tab" href="#graph" onclick="switchview('Segmentbargraph','Segmentchart','gridSegment');"></a></li>
                                    <li class="pie active crm_new_event_pie"><a data-toggle="tab" href="#pie" onclick="switchview('Segmentchart','gridSegment','Segmentbargraph');"></a></li>
                                </ul>
                            </div>
                        </h3>
                        <div id="Segmentchart" class="dashboardchart" ></div>
                         <div id="Segmentbargraph" class="dashboardchart" style="display: none;" ></div>
                        <div id="gridSegment" class="jqgrid" style="display: none; border: 0;margin-top:-5px;"></div>
                        <%--<div id="Segmentchart" class="dashboardchart" style="width: 100%;"></div>--%>
                       <%-- <div class="tab-content">
                            
                            <div id="chart" class="tab-pane fade">
                                <img src="../images/chart-crm03.png" />
                            </div>
                            <div id="graph" class="tab-pane fade">
                                <img src="../images/chart-crm02.png" />
                            </div>
                            <div id="pie" class="tab-pane fade in active">
                                <img src="../images/chart-crm01.png" />
                            </div>
                        </div>--%>

                    </li>
                    <li id="ContentPlaceHolder1_rightpanel_Modulez0">
                        <h3><a href="crm-campaign-configuration.aspx">Campaign</a>
                            <div class="left-active-sprite">
                                <ul class="nav nav-tabs">
                                    <li class="chart"><a data-toggle="tab" href="#chart_sec" onclick="switchview('gridCampaign','Campaignchart','Campaignbargraph');"></a></li>
                                    <li class="graph"><a data-toggle="tab" href="#graph_sec" onclick="switchview('Campaignbargraph','Campaignchart','gridCampaign');"></a></li>
                                    <li class="pie active"><a data-toggle="tab" href="#pie_sec" onclick="switchview('Campaignchart','gridCampaign','Campaignbargraph');"></a></li>
                                </ul>
                            </div>
                        </h3>

                        <div id="Campaignchart" class="dashboardchart"></div>
                         <div id="Campaignbargraph" class="dashboardchart" style="display: none;"  ></div>
                        <div id="gridCampaign" class="jqgrid"  style="display: none; border: 0;margin-top:-5px;"></div>
                     <%--   <div class="tab-content">
                            <div id="chart_sec" class="tab-pane fade">
                                <img src="../images/chart-crm01.png" />
                            </div>
                            <div id="graph_sec" class="tab-pane fade">
                                <img src="../images/chart-crm03.png" />
                            </div>
                            <div id="pie_sec" class="tab-pane fade in active">
                                <img src="../images/chart-crm02.png" />
                            </div>
                        </div>--%>

                    </li>


                    <li id="ContentPlaceHolder1_rightpanel_Module0">
                        <h3><a href="#" style="cursor:default;">Number of Notification</a>
                            <div class="left-active-sprite">
                                <ul class="nav nav-tabs">
                                    <li class="chart"><a data-toggle="tab" href="#chart_thr" onclick="switchview('gridNoofNotification','NoofNotificationchart','NoofNotificationgraph');"></a></li>
                                    <li class="graph"><a data-toggle="tab" href="#graph_thr" onclick="switchview('NoofNotificationgraph','NoofNotificationchart','gridNoofNotification');"></a></li>
                                    <li class="pie active"><a data-toggle="tab" href="#pie_thr" onclick="switchview('NoofNotificationchart','gridNoofNotification','NoofNotificationgraph');"></a></li>
                                </ul>
                            </div>
                        </h3>
                        <div id="NoofNotificationchart" class="dashboardchart" ></div>
                        <div id="NoofNotificationgraph" class="dashboardchart" style="display: none;"  ></div>
                        <div id="gridNoofNotification" class="jqgrid" style="display: none; border: 0; margin-top:-5px;"></div>

<%--                        <div class="tab-content">
                            <div id="chart_thr" class="tab-pane fade">
                                <img src="../images/chart-crm01.png" />
                            </div>
                            <div id="graph_thr" class="tab-pane fade">
                                <img src="../images/chart-crm02.png" />
                            </div>
                            <div id="pie_thr" class="tab-pane fade in active">
                                <img src="../images/chart-crm03.png" />
                            </div>
                        </div>--%>

                    </li>


                </ul>
            </div>
            <div class="clearfix"></div>
          <%--   <div class="chart1_box1" id="Craetbox">test   </div>--%>
               
            <div class="crm_bottom_content_area">



                <div class="crm_bottom_content_area_graph">
            <%--        <div class="top_arrow"></div>--%>
                    <div class="calender_seciton_1">
                        <div class="power_graph_heading power_graph_spanish">
                            
                            <div class="usage_date_time">
                                <label id="lblmodule" style="  border-right: 1px solid #DCDCDC;">Segment</label>&nbsp; <label id="lblmode">Active</label>
                                 
                            </div>
                             <%--<div class="low_usage_box legends_area">
                              <b>August 1 - August 18, 2015</b>
                                <span id="divCalender">
                                    <input name="" id="" src="../images/Icon-Calendar.png" style="vertical-align: middle; margin-top: -4px;" type="image">
                                </span>--%>
                                <%--<div>
                                    <span class="GraphLegend_servicerequest"></span>
                                    <span class="GraphLegend_data_low" globalize="ML_Usage_Lbl_LowUsage">Option 1</span>
                                    <span class="GraphLegend_low"></span>
                                    <span class="GraphLegend_data_low" globalize="ML_Usage_Lbl_LowUsage">Option 2</span>
                                    <span class="GraphLegend_Avg"></span>
                                    <span class="GraphLegend_data_low" globalize="ML_Usage_Lbl_AverageUsage">Option 3</span>
                                </div>
                            </div>--%>
                            <div class="lgnd_box_right">
                                <div class="left-active-sprites">
                                    <ul>
                                        <li class="chart"><a href="#" onclick="switchview('gridbox','Chartbox');"></a></li>
                                        <li class="graph"><a href="#" class="active" onclick="switchview('Chartbox','gridbox');"></a></li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                       <div class="grid-section" style="padding-top: 2px; width: 100%;">
                            <div class="chart1_box1" id="Chartbox" style="overflow:hidden;"> </div>
                          <div class="grid1_box1" id="gridbox" style="display:none"></div>
                          </div>
                    <div class="grid-section" style="padding-top: 2px; width: 99.1%; display:none;">

                        <div style="display: block;" id="graphdivarea" class="Graph-area">

                            <div class="grid_main_box">
                                <img src="../images/notification-graph.png" class="img-resp">
                            </div>
                        </div>
                    </div>
                </div>

             
            </div>
        </div>
    </div>
</asp:Content>
