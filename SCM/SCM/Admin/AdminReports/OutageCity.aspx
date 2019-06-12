<%@ Page Title="Outage City Report" Language="C#" MasterPageFile="~/AdminReports/AdminReport.master" AutoEventWireup="true" CodeBehind="OutageCity.aspx.cs" Inherits="AdminPanel.AdminReports.OutageCity" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<%@ Register Src="~/UserControl/ChartControl.ascx" TagPrefix="uc1" TagName="ChartControl" %>


<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
     <link rel="stylesheet" type="text/css" href="//js.arcgis.com/3.10/js/esri/css/esri.css" />
    <script type="text/javascript" src="//js.arcgis.com/3.10/"></script>
    <script src="../js/outagecitymap.js" type="text/javascript"></script>
   <input type="hidden" class="activeli_list" value="sidebar_outage"/>
    <uc1:jqxGrid runat="server" />
    
    </asp:ScriptManager>
    <asp:HiddenField ID="hdnParamValues" runat="server" ClientIDMode="Static" />
    <div class="top-header-area">
        <h2>Outage City</h2>
        <div class="filter-section" id="divFilter">
            <div class="input-section">
                <asp:TextBox ID="txtDateFrom" runat="server" placeholder="From Date" ClientIDMode="Static"></asp:TextBox>
                <asp:ImageButton CssClass="icon-cal" ID="btnDateFrom" runat="server" ImageUrl="~/images/icon-cal.png" />
                <ajaxToolkit:CalendarExtender ID="CalendarExtender1" runat="server" TargetControlID="txtDateFrom" PopupPosition="BottomRight"
                    PopupButtonID="btnDateFrom" OnClientDateSelectionChanged="checkDate" />
            </div>
            <div class="input-section">
                <asp:TextBox ID="txtDateTo" runat="server" placeholder="To Date" ClientIDMode="Static"></asp:TextBox>
                <asp:ImageButton CssClass="icon-cal" ID="btnDateTo" runat="server" ImageUrl="~/images/icon-cal.png" />
                <ajaxToolkit:CalendarExtender ID="CalendarExtender2" runat="server" TargetControlID="txtDateTo" PopupPosition="BottomRight"
                    PopupButtonID="btnDateTo" OnClientDateSelectionChanged="checkDate" />
            </div>
            <div class="input-section">
                <asp:DropDownList ID="ddlCity" runat="server" ClientIDMode="Static"></asp:DropDownList>
            </div>
            <div class="input-section">
                <select id="ddluserzipcode" title="Zip code" disabled="disabled">
                </select>
            </div>
            <div class="input-section">
                <select id="ddlOutageType" title="Account Type">
                    <option value="">--Select--</option>
                    <option value="0">Unplanned</option>
                    <option value="1">Planned</option>
                </select>
            </div>
            <div class="input-section">
                <input id="txtSearch" type="text" placeholder="Search User" />
            </div>
            <div class="input-section">
                <input id="btnFilter" type="button" value="Search" />
            </div>
        </div>
    </div>
    <div class="active-sprite">
        <div class="left-active-sprite">
            <a href="#">
                <img src="../images/chart-icon.png" onclick="javaScript:chartgraphsection(1)" title="Chart View"/></a>
            <a href="#">
                <img src="../images/graph-icon.png" onclick="javaScript:chartgraphsection(2)" title="Graph View" /></a>
            <a href="#">
                <img src="../images/graph-icon.png" onclick="javaScript:chartgraphsection(3)" title="Map View" /></a>
        </div>
        <div class="right-active-sprite">
            <a href="#">
                <asp:ImageButton runat="server" ID="btnExportPdf" ImageUrl="~/images/pdf-icon.png"
                    ToolTip="Export to Pdf" OnClick="imgExportPDF_Click" />
            </a>
        </div>
    </div>
    <div class="grid-section">
        <div id="graphDiv" class="Graph-area">
            <div style="text-align: center; margin-top: 50px;">
                <div id="jqxgrid" style="height: 370px!important; width: 100%" class="jqgrid">
                </div>
                <div id="jqxchildgrid" style="display: none; height: 390px" class="jqgrid">
                </div>
                <div id="nodata_div" style="width: 100%; text-align: center" visible="false"></div>
            </div>
        </div>
        <div id="chartDiv" class="Chart-area">
            <div style="text-align: center; margin-top: 50px;">
                <div id="OutageCityTitle"></div>
                <uc1:ChartControl runat="server" ID="ChartControl" />
                <div id="div-OutageCitychart" visible="true" style="width: 70%;"></div>
                <div id="nodata_div1" style="width: 100%; text-align: center" visible="false"></div>
            </div>
        </div>
        <div id="mapDiv" class="Map-div">
            <div style="text-align: left; margin-top: 50px;">
                <div id="div-OutageCitymap" visible="true"></div>
                <div id="nodata_div2" style="text-align: center;" visible="false"></div>
            </div>
        </div>
    </div>
    <script src="../js/outagecity-report.js"></script>
    
</asp:Content>
