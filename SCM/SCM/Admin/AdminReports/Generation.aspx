<%@ Page Title="Solar Report" Language="C#" MasterPageFile="~/AdminReports/AdminReport.master" AutoEventWireup="true" CodeBehind="Generation.aspx.cs" Inherits="AdminPanel.AdminReports.Generation" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<%@ Register Src="~/UserControl/ChartControl.ascx" TagPrefix="uc1" TagName="ChartControl" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <script type="text/javascript">
        $("document").ready(function () {
            $("#chartDiv").addClass("HEight");
        });
        $(document).ready(function () {
            /* remove the 'title' attribute of all <img /> tags */
            $("img").removeAttr("title");
        });
    </script>
    <style type="text/css">
        .clsWidthFull {
            width: 99%;
        }


        .content {
            background-color: rgb(203, 203, 203) !important;
        }

        .expand-one {
            /*cursor: pointer;*/
            background-color: rgb(236, 236, 236);
        }

        .imgtoggle {
            padding-left: 10px;
            padding-right: 5px;
        }

        .filterdrop {
            padding-left: 5px;
            cursor: pointer;
            display: block;
        }

        .filter-section {
            float: left;
            margin: 0px 0 11px 12px;
            padding: 0;
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

        .top-header-area, .top-header-area h2 {
            padding-bottom: 2px !important;
            border-bottom: 0px !important;
        }
    </style>
    <uc1:jqxGrid runat="server" />
    <input type="hidden" class="activeli_list" value="sidebar_generation" />
    
    </asp:ScriptManager>
    <asp:HiddenField ID="hdnParamValues" runat="server" ClientIDMode="Static" />
    <input type="hidden" id="custId" />
    <input type="hidden" id="previousCustId" />
    <div class="top-header-area">
        <div style="float: left; width: 85%;">
            <h2>Solar</h2>
        </div>
    </div>
    <div class="filter-section" id="divFilter" style="width: 97%; padding-bottom: 0%; margin-left: 1.4%">
        <div class="expand-one">
            <p class="filter_section_link">
                <img class="imgtoggle" src="..\images\ArrowsMinus.png" />Filter</p>
            <div class="content" style="height: 45px; padding-top: 7px; padding-left: 12px;">
                <div class="input-section">
                    <asp:TextBox ID="txtDateFrom" runat="server" placeholder="From Date" ClientIDMode="Static" Style="width: 80%;" ReadOnly="true" ToolTip="From date"></asp:TextBox>
                    <asp:ImageButton CssClass="icon-cal" ID="btnDateFrom" runat="server" ImageUrl="~/images/icon-cal.png" ToolTip="From date" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender1" runat="server" TargetControlID="txtDateFrom" PopupPosition="BottomRight"
                        PopupButtonID="btnDateFrom" OnClientDateSelectionChanged="checkDate" />
                </div>
                <div class="input-section">
                    <asp:TextBox ID="txtDateTo" runat="server" placeholder="To Date" ClientIDMode="Static" Style="width: 80%;" ReadOnly="true" ToolTip="To date"></asp:TextBox>
                    <asp:ImageButton CssClass="icon-cal" ID="btnDateTo" runat="server" ImageUrl="~/images/icon-cal.png" ToolTip="To date" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender2" runat="server" TargetControlID="txtDateTo" PopupPosition="BottomRight"
                        PopupButtonID="btnDateTo" OnClientDateSelectionChanged="checkDate" />
                </div>
                <div class="input-section">
                    <asp:DropDownList ID="ddlCity" runat="server" ClientIDMode="Static" ToolTip="Location"></asp:DropDownList>
                </div>

                <div class="input-section">
                    <select id="ddlAccountType" title="Account Type">
                        <option value="">Account Type</option>
                        <option value="1">Residential</option>
                        <option value="2">C&I</option>
                    </select>
                </div>
                <div class="input-section" style="width: auto  !important;">
                    <asp:Button ID="btnFilter" ToolTip="Search" CssClass="filterBtn" Style="margin: 0px;" runat="server" ClientIDMode="Static" OnClientClick="return false;" />
                </div>
            </div>
        </div>
    </div>
    <div class="active-sprite" style="width: 97%; margin-left: 1.4%; margin-bottom: 1%; margin-top: -1.3%; border-top: 1px solid rgb(203, 203, 203);">
        <div class="left-active-sprite" style="width: 20%; padding-left: 0px;">
            <a href="#">
                <i id="gridView" class="activeGrid" onclick="javaScript:chartgraphsection(1)" <%--title="Chart View" --%>> </i></a>
            <a href="#">
                <i id="pieGraph" class="pie" onclick="javaScript:chartgraphsection(2)" <%--title="Graph View"--%> > </i></a>
        </div>
        <div class="right-active-sprite" style="width: 70%; height: 20px;">
            <asp:ImageButton runat="server" ID="btnExcelExport" ImageUrl="~/images/Excel-icon.png" ToolTip="Export to Excel" ClientIDMode="Static" OnClientClick="return false" />
            <a href="#">
                <asp:ImageButton runat="server" ID="btnExportPdf" ImageUrl="~/images/pdf-icon.png" ToolTip="Export to Pdf" OnClick="imgExportPDF_Click" />
            </a>
        </div>
    </div>
    <div class="grid-section" style="padding-top: 0px; width: 99.5%">   
        <div id="nodata_div" style="width: 100%; text-align: center; color:red;display:none" >No Data</div>
        <div id="graphDiv" class="Graph-area">
            <div class="grid_main_box">
                <div id="jqxgrid" class="jqgrid">
                </div>
                <div id="jqxchildgrid" style="display: none;" class="jqgrid">
                </div>
                
            </div>
        </div>
        <div id="chartDiv" class="Chart-area" style="position: relative; float: left; width: 98%; height: 350.39px;">
            <div class="grid_main_box" style="float: left; width: 100%; margin-top: 0px;">

                <uc1:ChartControl runat="server" ID="ChartControl" />

                <div id="div-GenerationChart" visible="true" style="width: 100%; height: 400px!important">
                    <div id="notifytitle" style="width: 50%;"></div>
                    <div id="div-mainChart" class="outage_chart"></div>
                    <div class="outage_right_chart">
                        <div id="div-subChart" class="outage_right_chart_box">
                            <div class="outage_right_chart_top">
                                <div id="subChart1" style="text-align: center; background: #ededed; padding: 5px;"><b>City Monthly</b></div>
                                <div id="subChart1-nodata" style="width: 100%; text-align: center; color: red" visible="false">No Data</div>
                                <div id="div-subChart1" style="width: 98%; height: 90%;"></div>
                            </div>
                            <div class="outage_right_chart_bottom">
                                <div id="subChart2" class="outage_chart_heading"><b>Monthly</b></div>
                                <div id="subChart2-nodata" style="width: 100%; text-align: center; color: red" visible="false">No Data</div>
                                <div id="div-subChart2" style="width: 98%; height: 90%;"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="nodata_div1" style="width: 100%; text-align: center" visible="false"></div>
            </div>
        </div>
    </div>
     <link rel="stylesheet" type="text/css" href="//js.arcgis.com/3.10/js/esri/css/esri.css" />
    <script type="text/javascript" src="//js.arcgis.com/3.10/"></script>
    <script type="text/javascript" src="//maps.google.com/maps/api/js?sensor=false"></script>
    
    <script src="../js/generation-report.js"></script>

</asp:Content>
