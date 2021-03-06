﻿<%@ Page Title="Solar Usage" Language="C#" AutoEventWireup="true" MasterPageFile="~/AdminReports/AdminReport.master" CodeBehind="GenerationUsageAnalysis.aspx.cs" Inherits="AdminPanel.AdminReports.GenerationUsageAnalysis" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <script type="text/javascript">
        $("document").ready(function () {
            $("#chartDiv").addClass("HEight");
            $('#collapseOne').addClass('in');
            $('.sidebar_generation_analytic').addClass('active');
        });
    </script>
        <style type="text/css">
        .filterdrop
        {
            padding-left: 5px;
            cursor: pointer;
            display: block;
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

        .div_analysisChart1 {
            width: 53%;
            float: left;
            left: 10% !important;
        }

        .div_analysisChart2 {
            width: 47%;
            float: left;
            left: 10% !important;
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
            <h2>Solar Analysis</h2>
            <a href="#" class="chartback" style="display:none;float:right;"> <img src="../images/backbtn.png" style="width:25px;height:25px" /></a>
            <span id="spndata" style="display:none; float:right; padding-right:5px;">Showing data for<label id="lbldata"></label> </span>
        </div>
    </div>
    <div class="SR_new">
    <div class="filter-section" id="divFilter" style="width: 97%; padding-bottom: 0%; margin-left: 1.4%; margin-bottom: 0px;">
        <div class="expand-one">
            <p class="filter_section_link">
                <img class="imgtoggle" src="..\images\ArrowsMinus.png" />Filter</p>
            <div class="content" style="height: 48px; padding-top: 7px; padding-left: 12px;">
                <div class="input-section">
                    <asp:TextBox ID="txtDateFrom" runat="server" placeholder="From Date" ClientIDMode="Static" Style="width: 80%;"  ToolTip="From date"></asp:TextBox>
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
                <select id="ddlUsageTime" title="Outage Type">
                    <option value="">--Outage Type--</option>
                    <option value="0">Peak</option>
                    <option value="1">NonPeak</option>
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
            <a href="#">
                <img id="pieGraph" class="activePie" onclick="javaScript:chartgraphsection(2)" title="Graph View" /></a>
        </div>
        <div class="right-active-sprite" style="display:none;">

        </div>
    </div>
    
    <div class="grid-section" style="width: 98%; padding-bottom: 0%; margin-left: 0.85%; margin-bottom: 0px;">
        <div id="graphDiv" style="display:none;"></div>
        <div id="chartDiv" class="Chart-area" style="position: relative; float: left; width: 98%; height: 350.39px; display:block;">
            <div class="grid_main_box" style="float: left; width: 100%; margin-top: 0px;">
        <div class="dashboard-area-temp">
            <ul>
                <li>
                    <div class="div_analysisChart1">
                        <h3>Total Weekend/Weekday Usage Analysis </h3>
                        <div id="time-WeekendWeekDayChart" style="text-align:left;padding-left:12%;"></div>
                        <div id="div-WeekendWeekDayChart" style="height: 300px !important; margin-bottom: 30px; margin-left: -28%;float:left;">
                        </div>
                    </div>
                    <div class="div_analysisChart2">
                        <h3>Total Peak/Non-Peak Usage Analysis </h3>
                        <div id="time-PeakNonPeakChart" style="text-align:left;padding-left:12%;"></div>
                        <div id="div-PeakNonPeakChart" style="height: 300px !important; margin-bottom: 30px; margin-left: -28%;float:left;">
                        </div>
                    </div>
                </li>
                <li style="overflow-x:auto">
                   <h3 id="h3-GenerationChart">Solar by Time Period</h3>
                    <div id="time-GenerationChart"></div>    
                    <div id="div-GenerationChart" visible="true" style="width:65%; height:400px !important; float:left;"></div>
                </li>
                <li style="overflow-x:auto">
                   <h3 id="h3-TopGenerationChart">Top Customers</h3>
                    <div id="time-TopGenerationChart"></div>    
                    <div id="div-TopGenerationChart" visible="true" style="width:65%; height:400px !important; float:left;"></div>
                </li>
                <li style="overflow-x:auto">
                   <h3 id="h3-GenerationTrendChart">Solar Trend Analysis</h3>
                    <div id="time-GenerationTrendChart"></div>    
                    <div id="div-GenerationTrendChart" visible="true" style="width:65%; height:400px !important; float:left;"></div>
                </li>
            </ul>
         </div>
                   </div>
        </div>
    </div>
        </div>
    <script src="../js/Analysis-Generation.js"></script>
    
</asp:Content>
