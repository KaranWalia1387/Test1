<%@ Page Title="Current Outage Analysis" Language="C#" MasterPageFile="~/AdminReports/AdminReport.master" AutoEventWireup="true" CodeBehind="CurrentOutageDetailed.aspx.cs" Inherits="AdminPanel.AdminReports.CurrentOutageDetailed" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <script src="//www.google.com/jsapi" type="text/javascript"></script>
    <script type="text/javascript">
        $("document").ready(function () {
            $("#chartDiv").addClass("HEight");
            $('#collapseOne').addClass('in');
            $('.sidebar_currentoutage').addClass('active');
        });
    </script>
    <style type="text/css">
        .filterdrop {
            padding-left: 5px;
            cursor: pointer;
            display: block;
        }

        .content {
            background-color: rgb(203, 203, 203) !important;
        }

        .filterdropzip {
            padding-left: 5px;
            cursor: pointer;
            display: block;
        }

        .esriPopup .titlePane {
            background-color: #444444;
            border-radius: 5px 5px 0 0;
            color: #ffffff;
            cursor: default;
            height: 24px;
            line-height: 20px;
            padding-left: 6px;
        }

        .titlePane .title {
            width: auto;
        }

        .sizer.content {
            background: #f7f7f7;
            padding: 0 !important;
        }

        .close {
            opacity: 1 !important;
        }

        .expand-one {
            /*cursor: pointer;*/
            background-color: rgb(236, 236, 236);
        }

        .imgtoggle {
            padding-left: 10px;
            padding-right: 5px;
        }

        .input_section_box {
            width: 100%;
        }

        .input-section {
            float: left;
            margin: 0 5px 0 0;
            width: 114px;
        }

        .filter-section input[type="text"], input[type="number"], input[type="password"] {
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

        .filter-section select {
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

        .filter-section .icon-cal {
            float: left;
            margin: 4px 0px 0px 1px;
        }

        .filter-section .icon-filter {
            float: left;
            margin: 4px 0px 0px 7px;
        }


        .outage_graph_img {
            left: 123px !important;
        }

        .top-header-area, .top-header-area h2 {
            padding-bottom: 2px !important;
            border-bottom: 0px !important;
        }

        #div-ServiceRequestmap_layer0{
            width: 100% !important;
            height: 100% !important;
        }
        .left-active-sprite a #mapView
                {
                    margin-top:-4px;
                    height:23px;
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
    <uc1:jqxGrid ID="JqxGrid1" runat="server" />
    
    </asp:ScriptManager>
    <asp:HiddenField ID="hdnParamValues" runat="server" ClientIDMode="Static" />
    <input type="hidden" class="activeli_list" value="sidebar_dashboardanalytic" />
    <div class="top-header-area">
        <div style="float: left; width: 98%;">
            <h2>Current Outage Detailed Analysis</h2>
            <a href="#" class="chartback" style="display:none;float:right;"> <img src="../images/backbtn.png" style="width:25px;height:25px" /></a>
        </div>
    </div>
    <div class="SR_new">
     <div class="filter-section" id="divFilter" style="width: 97%; padding-bottom: 0%; margin-left: 1.4%; margin-bottom: 0px;">
        <div class="expand-one">
            <p class="filter_section_link">
                <img class="imgtoggle" src="..\images\ArrowsMinus.png" />Filter
            </p>
            <div class="content" style="height: 48px; padding-top: 7px; padding-left: 12px;">
                <%--<div class="input-section">
                    <asp:TextBox ID="txtDateFrom" runat="server" placeholder="From Date" ClientIDMode="Static" Style="width: 80%;"></asp:TextBox>
                    <asp:ImageButton CssClass="icon-cal" ID="btnDateFrom" runat="server" ImageUrl="~/images/icon-cal.png" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender1" runat="server" TargetControlID="txtDateFrom" PopupPosition="BottomRight"
                        PopupButtonID="btnDateFrom" OnClientDateSelectionChanged="checkDate" />
                </div>
                <div class="input-section">
                    <asp:TextBox ID="txtDateTo" runat="server" placeholder="To Date" ClientIDMode="Static" Style="width: 80%;"></asp:TextBox>
                    <asp:ImageButton CssClass="icon-cal" ID="btnDateTo" runat="server" ImageUrl="~/images/icon-cal.png" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender2" runat="server" TargetControlID="txtDateTo" PopupPosition="BottomRight"
                        PopupButtonID="btnDateTo" />
                </div>--%>
                <div class="input-section">
                    <asp:DropDownList ID="ddlCity" runat="server" ClientIDMode="Static" ToolTip="Location"></asp:DropDownList>
                </div>
                <%--<div class="input-section">
                    <asp:DropDownList ID="ddlReason" runat="server" ClientIDMode="Static" ToolTip="Reason"></asp:DropDownList>
                </div>--%>
                <div class="input-section">
                    <select id="ddlOutageStatus" title="Outage Status">
                        <option value="">--Outage Status--</option>
                        <option value="1">Restored</option>
                        <option value="2">Unrestored</option>
                    </select>
                </div>
                <div class="input-section">
                    <select id="ddlAccountType" title="Account Type">
                        <option value="">--Account Type--</option>
                        <option value="1">Residential</option>
                        <option value="2">C&I</option>
                    </select>
                </div>
                <div class="input-section">
                    <select id="ddlRestorationTime" title="Restoration Time">
                        <option value="">Restoration Time</option>
                        <option value="2">Next 2 Hours</option>
                        <option value="4">Next 4 Hours</option>
                        <option value="6">Next 6 Hours</option>
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
                <img id="gridView" class="grid" onclick="javaScript:chartgraphsection(1,'analysis')" title="Chart View" /></a>
            <a href="#">
                <img id="pieGraph" class="activePie" onclick="javaScript:chartgraphsection(2)" title="Graph View" /></a>
            <a href="#">
                <img onclick="javaScript:chartgraphsection(3)" class="map1" id="mapView" title="Map View" /></a>

        </div>
        <div class="right-active-sprite" style="width: 30%; height: 20px;">

            <asp:ImageButton runat="server" ID="btnexport" ImageUrl="~/images/Excel-icon.png" ToolTip="Export to Excel" ClientIDMode="Static" OnClientClick="return false" />
            <a href="#">
                <asp:ImageButton runat="server" ID="imgExportPdf" ImageUrl="~/images/pdf-icon.png"
                    ToolTip="Export to Pdf" OnClick="imgExportPDF_Click" />
            </a>

        </div>
    </div>
    <div class="grid-section" style="padding-top: 0px; width: 99.5%">
        <div id="nodata_div" style="width: 100%; text-align: center; color: red; display: none">No data</div>
        <div id="graphDiv" class="Graph-area">
            <div class="grid_main_box">
                <div id="jqxgrid" class="jqgrid" style="height: 100%;">
                </div>
            </div>
        </div>
        <div id="chartDiv" class="Chart-area" style="position: relative; float: left; width: 98%; height: 350.39px;">
            <div class="grid_main_box" style="float: left; width: 100%; margin-top: 0px;">
                <div class="dashboard-area-temp">
                    <ul>
                        <li style="overflow-x:auto">
                        <h3 id="h3-ImpactAnalysis">Customer Impact Analysis By Customer Type</h3>
                            <%--<div id="time-ImpactAnalysis"></div>--%>
                        <div id="div-ImpactAnalysis" visible="true" style="width:65%; height:400px !important; float:left;"></div></li>
                        <li style="overflow-x:auto" >
                        <h3 id="h3-ServiceRequestchart">Service Request for Current Outages by Region/Hour</h3>
                            <%--<div id="time-ServiceRequestchart"></div>--%>    
                        <div id="div-ServiceRequestchart" visible="true" style="width:65%; height:400px !important; float:left;"></div></li>
                    </ul>                
                </div>  
            </div>
        </div>
        <%--<div class="grid_main_box" style="float: left; width: 100%; margin-top: 0px; text-align:left">
        <div class="dashboard-area-temp">
        <div id="mapDiv" class="Map-div" style="display: none;">
            <div id="div-CurrentOutageMap" visible="true" style="width: 100%; height: 250px !important; float: left;"></div>
        </div>
        <div id="mapDiv2" class="Map-div" style="display: none;">
            <div id="div-CurrentUnrestored" visible="true" style="width: 100%; height: 250px !important; float: left;"></div>
            </div>
        <div id="mapDiv3" class="Map-div" style="display: none;">
            <div id="div-RetoreNextDay" visible="true" style="width: 100%; height: 250px !important; float: left;"></div>
            </div>
        <div id="mapDiv4" class="Map-div" style="display: none;">
            <div id="div-RestoreUnrestore" visible="true" style="width: 100%; height: 250px !important; float: left;"></div>
            </div>
            </div>
            </div>--%>
        <div id="mapDiv" class="Map-div" style="display: none;">
            <div class="grid_main_box" style="float: left; width: 98%; margin-top: 0px; text-align:left">
                <div class="dashboard-area-temp">
                    <ul>
                        <li>
                        <h3>Current Outages</h3>    
                        <div id="div-CurrentOutageMap" visible="true" style="width: 100%; height: 250px !important; float: left;"></div></li>
                        <li>
                        <h3>Current Unrestored Outages</h3>    
                        <div id="div-CurrentUnrestored" visible="true" style="width: 100%; height: 250px !important; float: left;"></div></li>
                        <li>
                        <h3>Restorations for next 24 Hours</h3>    
                        <div id="div-RetoreNextDay" visible="true" style="width: 100%; height: 250px !important; float: left;"></div></li>
                        <li>
                        <h3>Restored/Unrestored Customers for Current Outages</h3>    
                        <div id="div-RestoreUnrestore" visible="true" style="width: 100%; height: 250px !important; float: left;"></div></li>
                    </ul>                
                </div>  
            </div>
        </div>
    </div>
        </div>
    <script src="../js/Analysis-CurrentOutage.js"></script>
    <script src="../js/Analysis-CurrentOutageMap.js"></script>
    
</asp:Content>
