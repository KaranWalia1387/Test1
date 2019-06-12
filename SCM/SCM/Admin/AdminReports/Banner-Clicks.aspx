<%@ Page Title="Banner Report" Language="C#" MasterPageFile="~/AdminReports/AdminReport.master" AutoEventWireup="true" CodeBehind="Banner-Clicks.aspx.cs" Inherits="AdminPanel.AdminReports.Banner_Clicks" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<%@ Register Src="~/UserControl/ChartControl.ascx" TagPrefix="uc1" TagName="ChartControl" %>


<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">


    <script type="text/javascript">
        $("document").ready(function () {
            $("#chartDiv").addClass("HEight");
        });
        $(document).ready(function () {
            $("img").removeAttr("title");
        });
    </script>
    <style type="text/css">
        #graphdivarea {
            overflow: hidden;
        }

        .ajax__calendar_container {
            width: 190px !important;
        }

        .content gridView {
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

        .popup_left_content_area_home {
            float: left;
            padding-right: 1%;
            width: 30%;
            padding-bottom: 2%;
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
            width: 182px;
        }

        @media screen and (min-width: 768px) and (max-width:1024px) {
            .input-section {
                width: 98px !important;
            }

            .time_date_input {
                width: 78% !important;
            }
        }

        /*.filter-section .icon-cal {
            float: left;
            margin: 4px 0px 0px 1px;
        }*/

        .filter-section .icon-filter {
            float: left;
            margin: 4px 0px 0px 7px;
        }

        .top-header-area, .top-header-area h2 {
            padding-bottom: 2px !important;
            border-bottom: 0px !important;
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


    </style>
    <link href="../css/AdminReport_main.css" rel="stylesheet" />
    <uc1:jqxGrid runat="server" />
    
    </asp:ScriptManager>
    <input type="hidden" class="activeli_list" value="sidebar_configurebanner_inner" />
    <asp:HiddenField ID="hdnParamValues" runat="server" ClientIDMode="Static" />
    <div class="top-header-area">
        <div style="float: left; width: 35%;">
            <h2>Banners</h2>
        </div>
        <div class="filter_area_ui">
            <div class="right_header_area">
                <ul>
                    <li><a href="#" data-toggle="modal" data-target="#export_docs_pop" title="Export"><span class="fa fa-external-link icon_color"></span>Export</a></li>
                    <li><a href="#" id="filter_btn_explorer" title="Filter Results"><span class="fa fa-filter icon_color"></span>Filter Results</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="filter-section" id="divFilter" style="display: none; margin-left: 0px; width: 100%">
        <div class="expand-one">
            <p class="filter_section_link" style="display: none;">
                <img class="imgtoggle" src="..\images\ArrowsMinus.png" />Filter
            </p>
            <div class="content">
                <div class="input-section">
                    <asp:TextBox ID="txtDateFrom" runat="server" placeholder="From Date" ClientIDMode="Static" Style="width: 90%;" ReadOnly="true" ToolTip="From date"></asp:TextBox>
                    <asp:ImageButton CssClass="icon-cal" ID="btnDateFrom" runat="server" ImageUrl="~/images/Icon-calendar.png" ToolTip="From date" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender1" runat="server" TargetControlID="txtDateFrom" PopupPosition="BottomRight"
                        PopupButtonID="btnDateFrom" OnClientDateSelectionChanged="checkDate" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender3" runat="server" TargetControlID="txtDateFrom" PopupPosition="BottomRight"
                        OnClientDateSelectionChanged="checkDate" />
                </div>
                <div class="input-section">
                    <asp:TextBox ID="txtDateTo" runat="server" placeholder="To Date" ClientIDMode="Static" Style="width: 90%;" ReadOnly="true" ToolTip="To date"></asp:TextBox>
                    <asp:ImageButton CssClass="icon-cal" ID="btnDateTo" runat="server" ImageUrl="~/images/Icon-calendar.png" ToolTip="To date" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender2" runat="server" TargetControlID="txtDateTo" PopupPosition="BottomRight"
                        PopupButtonID="btnDateTo" OnClientDateSelectionChanged="checkDate" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender4" runat="server" TargetControlID="txtDateTo" PopupPosition="BottomRight"
                        OnClientDateSelectionChanged="checkDate" />
                </div>              
               
                <div class="input-section" style="width: auto !important; float: right; margin: 5px 20px;">
                    <asp:Button ID="btnFilter" ToolTip="Search" CssClass="filterBtn" runat="server" ClientIDMode="Static" Text="Filter Results" Style="margin: 0px;" OnClientClick="return false;" />
                </div>
            </div>
        </div>
    </div>
    <div style="display: block;" class="current_area" id="GenDiv">
        <ul>
            <li style="width:50%;">
                <div class="average_usage_header">
                    <span id="demandusageval">
                        <label id="Totalbanners"></label>
                    </span>
                    <img src="Usage%20Report_files/arrow_down_img.png" style="display: none">
                </div>
                <i id="demandusagetext">Total No. of Banners</i>
            </li>
            <li style="width:50%;">
                <div class="average_usage_header">
                    <span>
                        <label id="Totalclicks"></label>
                    </span>
                    <img src="Usage%20Report_files/arrow_down_img.png" style="display: none">
                </div>
                <i>Total No. of Clicks</i>
            </li>


        </ul>
    </div>
    <div class="calender_seciton_1">
        <div class="power_graph_heading power_graph_spanish">
            <div class="usage_date_time">
                <b>
                    <label id="From_Date"></label>
                    <label>-</label>
                    <label id="To_Date"></label>
                </b>
            </div>
            <div class="lgnd_box_right">
                <div class="left-active-sprites">
                    <ul>
                        <li class="chart"><a href="#"></a></li>
                        <li class="graph line_grph_css"><a href="#" class="active"></a></li>
                    </ul>
                </div>
            </div>


        </div>
    </div>


    <div id="graph_heading" style="padding-top: 20px;">
    </div>
    <div class="grid-section" style="padding-top: 0px; width: 100%">
        <div class="grid-section_1">

            <div id="chartDiv" class="Chart-area" style="position: relative; float: left; width: 99.8%; display: block;">
                <div id="nodata_div" style="width: 99%; text-align: center" visible="false"></div>
                <asp:HiddenField ID="ghj" runat="server" />
            </div>
        </div>
    </div>
    <!-- div for table grid layout starts -->
    <div id="tabledivarea" class="Chart-area HEight" style="position: relative; float: left; width: 100%;">
        <div class="grid_main_box">
            <div id="jqxgrid" class="jqgrid">
            </div>
            <div id="jqxchildgrid" style="display: none;" class="jqgrid">
            </div>

        </div>
         <div id="nodatadiv" style="width: 99%; text-align: center" visible="false"></div>
    </div>
    <div id="page_loader">
    </div>

    <div class="modal fade popheading" id="export_docs_pop" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" title="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Export Options</h4>
                </div>
                <div class="modal-body">
                    <div class="pdf_box_wrapper">
                        <b>Please select file type(s) to export.</b>
                        <ul>
                            <li><a href="#" class="pdf_icon" id="btnExportPdf" runat="server" onserverclick="btnExportPdf_ServerClick">Pdf(.pdf)</a></li>
                            <li><a href="#" class="excel_icon" id="btnExcelExport" runat="server" onserverclick="btnExcelExport_ServerClick" >Excel(.xls)</a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    </div>
    
    <script src="../js/Banner-report.js"></script>
    <script>

        $('.left-active-sprites ul > li.graph > a').click(function () {
            setTimeout(function () {
                GetDataOnSearch();
            }, 5);
        });


        $('.left-active-sprites ul li').on('click', 'a', function () {
            $('.left-active-sprites ul li a.active').removeClass('active');
            $(this).addClass('active');
            if ($('.left-active-sprites ul li.graph a').hasClass('active')) {
                $('#chartDiv').css('display', 'block');
                $('#tabledivarea').css('display', 'none');
            }
            else {
                $('#chartDiv').css('display', 'none');
                $('#tabledivarea').css('display', 'block');
            }
        });
    </script>
</asp:Content>
