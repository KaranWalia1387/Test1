<%@ Page Title="Outage Analysis" Language="C#" MasterPageFile="~/AdminReports/AdminReport.master" AutoEventWireup="true" CodeBehind="OutageAnalysis.aspx.cs" Inherits="AdminPanel.AdminReports.OutageAnalysis" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <script src="//www.google.com/jsapi" type="text/javascript"></script>
     <link rel="stylesheet" type="text/css" href="//js.arcgis.com/3.10/js/esri/css/esri.css" />
    <script type="text/javascript" src="//js.arcgis.com/3.10/"></script>
    <script type="text/javascript">
        $("document").ready(function () {
            $("#chartDiv").addClass("HEight");
            $('#collapseOne').addClass('in');
            $('.sidebar_outage_analytic').addClass('active');
            $('#div-OutageTypeChart').addClass('hgt');
        });
    </script>
    <style type="text/css">
        .filterdrop
        {
            padding-left: 5px;
            cursor: pointer;
            display: block;
        }
        .hgt {
            margin-bottom:40px !important;
        }
        .content
        {
            background-color: rgb(203, 203, 203) !important;
        }

        .filterdropzip
        {
            padding-left: 5px;
            cursor: pointer;
            display: block;
        }

        .esriPopup .titlePane
        {
            background-color: #444444;
            border-radius: 5px 5px 0 0;
            color: #ffffff;
            cursor: default;
            height: 24px;
            line-height: 20px;
            padding-left: 6px;
        }

        .titlePane .title
        {
            width: auto;
        }

        .sizer.content
        {
            background: #f7f7f7;
            padding: 0 !important;
        }

        .close
        {
            opacity: 1 !important;
        }

        .expand-one
        {
            cursor: pointer;
            background-color: rgb(236, 236, 236);
        }

        .imgtoggle
        {
            padding-left: 10px;
            padding-right: 5px;
        }

        .input_section_box
        {
            width: 100%;
        }

        .input-section
        {
            float: left;
            margin: 0 5px 0 0;
            width: 114px;
        }

        .filter-section input[type="text"], input[type="number"], input[type="password"]
        {
            background: #fff;
            border: 1px solid #999999;
            color: #616161;
            font-size: 76.3%;
            margin-bottom: 10px;
            margin-top: 4px;
            padding: 0 4px;
            width: 99%;
            line-height: 19px;
            padding: 2px 4px;
            height: 19px;
            line-height: 13px;
        }

        .filter-section select
        {
            background: #fff;
            border: 1px solid #999999;
            color: #616161;
            font-size: 76.3%;
            margin-bottom: 10px;
            margin-top: 4px;
            padding: 0 2px;
            line-height: 16px;
            width: 99%;
            height: 19px;
            line-height: 13px;
        }

        .filter-section .icon-cal
        {
            float: left;
            margin: 4px 0px 0px 1px;
        }

        .filter-section .icon-filter
        {
            float: left;
            margin: 4px 0px 0px 7px;
        }


        .outage_graph_img
        {
            left: 123px !important;
        }

        .top-header-area, .top-header-area h2
        {
            padding-bottom: 2px !important;
            border-bottom: 0px !important;
        }

        .left-active-sprite a #mapView
        {
            margin-top: -4px;
            height: 23px;
        }
        .inner-right-section
        {
            overflow: visible !important;
            height:99.3% !important;
        }

        .SR_new
        {
            background:#fff;
            height:96.3% !important;
            overflow: auto;
        }
    </style>
    
    </asp:ScriptManager>
    <asp:HiddenField ID="hdnParamValues" runat="server" ClientIDMode="Static" />
    <input type="hidden" class="activeli_list" value="sidebar_dashboardanalytic" />
    <div class="top-header-area">
        <div style="float: left; width: 98%;">
            <h2>Outage Analysis</h2>
            <a href="#" class="chartback" style="display: none; float: right;">
                <img src="../images/backbtn.png" style="width: 25px; height: 25px" /></a>
        </div>
    </div>
    <div class="SR_new">
    <div class="filter-section" id="divFilter" style="width: 97%; padding-bottom: 0%; margin-left: 1.4%; margin-bottom: 0px;">
        <div class="expand-one">
            <p class="filter_section_link">
                <img class="imgtoggle" src="..\images\ArrowsMinus.png" />Filter
            </p>
            <div class="content" style="height: 48px; padding-top: 7px; padding-left: 12px;">
                <div class="input-section">
                    <asp:TextBox ID="txtDateFrom" runat="server" placeholder="From Date" ClientIDMode="Static" Style="width: 80%;" ToolTip="From date"></asp:TextBox>
                    <asp:ImageButton CssClass="icon-cal" ID="btnDateFrom" runat="server" ImageUrl="~/images/icon-cal.png" ToolTip="From date" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender1" runat="server" TargetControlID="txtDateFrom" PopupPosition="BottomRight"
                        PopupButtonID="btnDateFrom" OnClientDateSelectionChanged="checkDate" />
                </div>
                <div class="input-section">
                    <asp:TextBox ID="txtDateTo" runat="server" placeholder="To Date" ClientIDMode="Static" Style="width: 80%;" ToolTip="To date"></asp:TextBox>
                    <asp:ImageButton CssClass="icon-cal" ID="btnDateTo" runat="server" ImageUrl="~/images/icon-cal.png" ToolTip="To date" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender2" runat="server" TargetControlID="txtDateTo" PopupPosition="BottomRight"
                        PopupButtonID="btnDateTo" />
                </div>
                <div class="input-section">
                    <asp:DropDownList ID="ddlCity" runat="server" ClientIDMode="Static" ToolTip="Location"></asp:DropDownList>
                </div>
                <div class="input-section">
                    <select id="ddlAccountType" title="Account Type">
                        <option value="">--Account Type--</option>
                        <option value="1">Residential</option>
                        <option value="2">C&I</option>
                    </select>
                </div>
                <div class="input-section">
                    <select id="ddlOutageType" title="Outage Type">
                        <option value="">Outage Type</option>
                        <option value="0">Unplanned</option>
                        <option value="1">Planned</option>
                    </select>
                </div>
                <div class="input-section" style="width: auto  !important;">
                    <asp:Button ID="btnFilter" ToolTip="Search" CssClass="filterBtn" runat="server" ClientIDMode="Static" OnClientClick="return false;" Style="margin: 0px;" />
                </div>
            </div>
        </div>
    </div>
    <div class="active-sprite" style="width: 97%; margin-left: 1.4%; margin-bottom: 1%; margin-top: -0.6%; border-top: 1px solid rgb(203, 203, 203);">
        <div class="left-active-sprite" style="width: 20%; padding-left: 0px;">
            <%--<a href="#">
                <img id="gridView" class="grid" onclick="javaScript:chartgraphsection(1)" title="Chart View" /></a>--%>
            <a href="#">
                <img id="pieGraph" class="activePie" onclick="javaScript:chartgraphsection(2)" title="Graph View" /></a>
            <a href="#">
                <img onclick="javaScript:chartgraphsection(3)" class="map1" id="mapView" title="Map View" /></a>

        </div>
        <%--<div class="right-active-sprite" style="width: 30%; height: 20px;">

            <asp:ImageButton runat="server" ID="excelExportServiceRequest" ImageUrl="~/images/Excel-icon.png" ToolTip="Export to Excel" ClientIDMode="Static" OnClientClick="return false" />
            <a href="#">
                <asp:ImageButton runat="server" ID="imgExportPdf" ImageUrl="~/images/pdf-icon.png"
                    ToolTip="Export to Pdf" OnClick="imgExportPDF_Click" />
            </a>

        </div>--%>
    </div>
    
    <div class="grid-section" style="width: 98%; padding-bottom: 0%; margin-left: 0.85%; margin-bottom: 0px;">
        <div id="graphDiv" style="display:none;">
            </div>
        <div id="chartDiv" class="Chart-area" style="position: relative; float: left; width: 98%; height: 350.39px;">
            <div class="grid_main_box" style="float: left; width: 100%; margin-top: 0px;">
                <div class="dashboard-area-temp">
                    <ul>
                        <li>
                            <div style="overflow-x:auto">
                            <h3 id="h3-OutageTypeChart"><%--Outage Type Analysis--%>
                       Outages By Period/Region/Type
                            </h3>
                            <div id="time-OutageTypeChart"></div>
                            <div id="div-OutageTypeChart" visible="true" style="width: 90%; height: 400px !important; float: left;"></div>
                                </div>
                            <div id="OutageTypeChartID" style="float: left;left: 40%;margin: -35px auto 8px;position: absolute;width: 25%;z-index: 9999;">
                                    <p>
                                        <span class="GraphLegend_Green" id="greenBox" style="display: none"></span>
                                        <span class="GraphLegend_completed_data" id="CompleteID" style="display: none">Planned</span>
                                        <span class="GraphLegend_Orange" id="orangeBox" style="display: none"></span>
                                        <span class="GraphLegend_completed_data" id="ProgessID" style="display: none">Unplanned</span>
                                    </p>
                                </div>
                        </li>
                        <%--<li>
                   <h3>Outage Location Analysis</h3>    
                    <div id="div-LocationMap" visible="true" style="width:100%; height:300px !important; float:left;"></div>
                </li>--%>
                        <li style="overflow-x:auto">
                            <h3 id="h3-RestorationChart"><%--Outage Restoraton Analysis--%>
                       Outage Restoration Time Trend Analysis
                            </h3>
                            <div id="time-RestorationChart"></div>
                            <div id="div-RestorationChart" visible="true" style="width: 90%; height: 400px !important; float: left;"></div>
                        </li>
                        <li style="overflow-x:auto">
                            <h3 id="h3-TopOutagesChart"><%--Top Outages Analysis--%>
                       Top 10 Outage Causes By Period/Region
                            </h3>
                            <div id="time-TopOutagesChart"></div>
                            <div id="div-TopOutagesChart" visible="true" style="width: 90%; height: 400px !important; float: left;"></div>
                              <%--<div id="MeterTypeChartID" style="float: right; width: 70%; margin-bottom: 5%">
                                    <p>
                                        <span class="GraphLegend_Green"></span>
                                        <span class="GraphLegend_completed_data">Maintenance</span>
                                        <span class="GraphLegend_Orange"></span>
                                        <span class="GraphLegend_completed_data">New Installation</span>
                                        <span class="GraphLegend_LBlue"></span>
                                        <span class="GraphLegend_completed_data">Replacement</span>
                                        <span class="GraphLegend_DBlue"></span>
                                        <span class="GraphLegend_completed_data">Service</span>                                        
                                    </p>
                                </div>--%>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div id="mapDiv" class="Map-div" style="display: none;">
        <div style="margin-top: 0px;">
            <div id="div-LocationMap" visible="true" style="height: 100% !important; width: 100% !important;"></div>
        </div>
    </div>
        </div>
    <script src="../js/Analysis-OutageMap.js"></script>
    <script src="../js/Analysis-Outage.js"></script>
    
</asp:Content>
