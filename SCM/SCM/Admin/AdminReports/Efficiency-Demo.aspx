<%@ Page Title="Efficiency Report" Language="C#" MasterPageFile="~/AdminReports/AdminReport.master" AutoEventWireup="true" CodeBehind="Efficiency.aspx.cs" Inherits="AdminPanel.AdminReports.Efficiency" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<%@ Register Src="~/UserControl/ChartControl.ascx" TagPrefix="uc1" TagName="ChartControl" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <link href="../css/w2ui-1.4.2.min.css" rel="stylesheet" />
    <script src="../js/w2ui-1.4.2.min.js" type="text/javascript"></script>
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
        .HEight
        {
            height: 365px !important;
        }

        .content
        {
            background-color: rgb(203, 203, 203) !important;
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

        .filterdrop
        {
            padding-left: 5px;
            cursor: pointer;
            display: block;
        }

        .filter-section
        {
            float: left;
            margin: 0px 0 11px 12px;
            padding: 0;
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

        .inner-right-section
        {
            background: #fff;
            box-shadow: 0px 0px 4px #cfcfcf;
            overflow: auto;
            margin: 15px 15px 0px;
        }

        .top-header-area, .top-header-area h2
        {
            padding-bottom: 2px !important;
            border-bottom: 0px !important;
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

        .popup_left_content_area_home
        {
            float: left;
            padding-right: 1%;
            width: 35% !important;
            padding-bottom: 2%;
        }

        .outage_graph_img
        {
            top: -9.5% !important;
        }
    </style>


    <uc1:jqxGrid runat="server" />
    <input type="hidden" class="activeli_list" value="sidebar_efficency" />
    
    </asp:ScriptManager>
    <asp:HiddenField ID="hdnParamValues" runat="server" ClientIDMode="Static" />
    <div class="top-header-area">
        <div style="float: left; width: 85%;">
            <h2>Efficiency</h2>
        </div>
    </div>

    <div class="filter-section" id="divFilter" style="width: 97%; padding-bottom: 0%; margin-left: 1.4%">
        <div class="expand-one">
            <p class="filter_section_link">
                <img class="imgtoggle" src="..\images\ArrowsMinus.png" />Filter
            </p>
            <div class="content" style="height: 45px; padding-top: 7px; padding-left: 12px;">
                <div class="input-section">
                    <asp:TextBox ID="txtDateFrom" runat="server" placeholder="From Date" ClientIDMode="Static" Style="width: 90%;" ReadOnly="true" ToolTip="From date"></asp:TextBox>
                    <asp:ImageButton CssClass="icon-cal" ID="btnDateFrom" runat="server" ImageUrl="~/images/icon-cal.png" ToolTip="From date" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender1" runat="server" TargetControlID="txtDateFrom" PopupPosition="BottomRight"
                        PopupButtonID="btnDateFrom" OnClientDateSelectionChanged="checkDate" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender3" runat="server" TargetControlID="txtDateFrom" PopupPosition="BottomRight"
                        OnClientDateSelectionChanged="checkDate" />
                </div>
                <div class="input-section">
                    <asp:TextBox ID="txtDateTo" runat="server" placeholder="To Date" ClientIDMode="Static" Style="width: 90%;" ReadOnly="true" ToolTip="To date"></asp:TextBox>
                    <asp:ImageButton CssClass="icon-cal" ID="btnDateTo" runat="server" ImageUrl="~/images/icon-cal.png" ToolTip="To date" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender2" runat="server" TargetControlID="txtDateTo" PopupPosition="BottomRight"
                        PopupButtonID="btnDateTo" OnClientDateSelectionChanged="checkDate" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender4" runat="server" TargetControlID="txtDateTo" PopupPosition="BottomRight"
                        OnClientDateSelectionChanged="checkDate" />
                </div>
                <div class="input-section">
                    <asp:DropDownList ID="ddlCity" runat="server" ClientIDMode="Static" ToolTip="Select Location"></asp:DropDownList>
                </div>

                <div class="input-section">
                    <select id="ddlAccountType" title="Account Type">
                        <option value="">--Select--</option>
                        <option value="2">Educational Tips</option>
                        <option value="4">Programs</option>
                        <option value="3">Rebates</option>
                        <option value="1">Saving Tips</option>
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
                <img id="gridView" class="activeGrid" onclick="javaScript:chartgraphsection(1)" title="Chart View" /></a>
            <a href="#">
                <img id="pieGraph" class="pie" onclick="javaScript:chartgraphsection(2)" title="Graph View" /></a>
        </div>
        <div class="right-active-sprite" style="width: 70%; height: 20px;">
            <asp:ImageButton runat="server" ID="btnExcelExport" ImageUrl="~/images/Excel-icon.png" ToolTip="Export to Excel" ClientIDMode="Static" OnClientClick="return false" />
            <a href="#">
                <asp:ImageButton runat="server" ID="btnExportPdf" ImageUrl="~/images/pdf-icon.png"
                    ToolTip="Export to Pdf" OnClick="imgExportPDF_Click" />
            </a>
        </div>
    </div>
    <div class="grid-section" style="padding-top: 0px; width: 99.5%">
        <div id="graphDiv" class="Graph-area">
            <div class="grid_main_box">
                <div id="grid" class="jqgrid">
                </div>
                <div id="childgrid" style="display: none;" class="jqgrid">
                </div>
            </div>
        </div>

        <div id="nodata_div" style="width: 100%; text-align: center; color: Red; display: none;" visible="false">No Data</div>
        <div id="chartDiv" class="Chart-area" style="position: relative; width: 100%;">

            <div class="grid_main_box" style="width: 98%;">
                <uc1:ChartControl runat="server" ID="ChartControl" />
                <div id="titleEfficiency" style="font-weight: bold;"></div>
                <div class="div_Efficiencychart">
                    <span id="EfficiencyTitle"></span>
                    <div id="div-Efficiencychart" style="width: 90%;" visible="true">
                    </div>
                </div>
                <div class="div_Efficiencychart2">
                    <span id="EEtitlebyCity"></span>
                    <div id="div-Efficiencychart1" style="width: 90%;">
                    </div>
                </div>
                <div id="nodata_div1" style="width: 100%; text-align: center; display: none;" visible="false"></div>
            </div>
        </div>
    </div>

    <div class="modal fade userDetails" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog popup_area">
            <div class="modal-content" style="width: 75%">
                <div class="modal-header">
                    <button type="button" id="btnClose" data-dismiss="modal">
                        <img src="../images/popup_close.png" title="Close"/></button>
                    <h4 class="modal-title" id="H1">Efficiency Details</h4>
                </div>
                <div class="modal-body">
                    <div class="popup_area_home">
                        <div style="clear: both;"></div>
                        <div id="Div1" class="innerDiv">
                            <%--<div class="popup_left_content_area_home">
                                Customer Name :
                            </div>
                            <div class="popup_right_content_area_home">
                                <label id="lblCustName"></label>
                            </div>
                            <div style="clear: both;"></div>

                            <div class="popup_left_content_area_home">
                                Service Account :
                            </div>
                            <div class="popup_right_content_area_home">
                                <label id="lblServiceAccount"></label>
                            </div>
                            <div style="clear: both;"></div>--%>
                        </div>
                    </div>
                    <div class="bottom_area_home">
                        <input id="clear" type="button" class="cancel submitBtn" value="Close" data-dismiss="modal" style="margin-left: 40%;" />

                    </div>
                    <div style="clear: both;"></div>
                </div>
            </div>
        </div>
    </div>
    
    <script src="../js/efficiency-report-demo.js"></script>
</asp:Content>
