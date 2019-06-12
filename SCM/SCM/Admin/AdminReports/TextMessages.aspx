<%@ Page Title="Text Message" Language="C#" MasterPageFile="~/AdminReports/AdminReport.master" AutoEventWireup="true" CodeBehind="TextMessages.aspx.cs" Inherits="AdminPanel.AdminReports.TextMessages" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<%@ Register Src="~/UserControl/ChartControl.ascx" TagPrefix="uc1" TagName="ChartControl" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">

<%--    <link href="../css/main.css" rel="stylesheet" type="text/css">
    <link href="../css/AdminReport_main.css" rel="stylesheet" />--%>
    <link rel="shortcut icon" type="image/x-icon" href="~/images/favicon.ico">
    <script src="../js/Validate.js"></script>
    <script src="../js/loader.js"></script>
    <script src="../js/TextMessages_reports.js"></script>
    
    <uc1:jqxGrid runat="server" />

    <script type="text/javascript">
        $("document").ready(function () {
            $("#chartDiv").addClass("HEight");
            /* remove the 'title' attribute of all <img /> tags */
            $("img").removeAttr("title");

            $("#ddlCity").change(function (i, obj) {
                if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
                    var ddlCity = $('#ddlCity option:selected');
                    $('#hdnCity').val($(ddlCity).val());
                }
            });

            $('.left-active-sprites ul li').on('click', 'a', function () {
                $('.left-active-sprites ul li a.active').removeClass('active');
                $(this).addClass('active');
                if ($('.left-active-sprites ul li.graph a').hasClass('active')) {
                    $('#graphDiv').css('display', 'none');
                    $('#chartDiv').css('display', 'block');
                }
                else {
                    $('#graphDiv').css('display', 'block');
                    $('#chartDiv').css('display', 'none');
                }
            });

        });
    </script>

    <style type="text/css">
        #graphdivarea {
            overflow:hidden;
        }
        .ajax__calendar_container {
            width: 190px !important;
        }

        .jqx-grid-column-header div span {
            height: 40px;
        }

        .expand-one {
            cursor: pointer;
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
            margin: 0 0 11px;
            width: 100%;
        }

        .input_section_box {
            width: 100%;
        }

        .content .input-section {
            float: left;
            margin: 0;
            width: 25%;
        }

        #page_loader {
            background-image: url('images/ajax-loader.gif');
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

        .filter-section .icon-cal {
            float: left;
            margin: 8px 0 0 -23px;
        }

        .filter-section .icon-filter {
            float: left;
            margin: 4px 0px 0px 7px;
        }

        .top-header-area, .top-header-area h2 {
            padding-bottom: 2px !important;
            border-bottom: 0px !important;
        }


        .PopUpTitleBg {
            background: #999999;
            padding: 7px 10px 29px;
            color: #fff;
            line-height: 22px;
        }

        .Text-outbox-area select {
            width: 93%;
            padding: 2px 0;
        }

        #PopupAddTopic {
            left: 0px !important;
        }


        .user-outbox-area {
            width: 40%;
        }

        .Text-outbox-area {
            width: 59%;
        }

        .current_area > ul > li {
            width: 25%;
        }
    </style>


    <style type="text/css">
        .jqx-grid-column-header {
            font-weight: bold;
        }
    </style>
    <script type="text/javascript">
        $(".report").addClass('active');
    </script>
    <style>
        #collapseOne li a, .in li a {
            cursor: pointer;
        }
    </style>
    <input class="activeli_list" value="sidebar_textmessage" type="hidden">
    <asp:HiddenField ID="hdnParamValues" runat="server" ClientIDMode="Static" />
    <div class="top-header-area">
        <div style="float: left; width: 35%;">
            <h2>Text Message</h2>
        </div>
        <div class="right_header_area">
            <ul>
                <li><a href="#" data-toggle="modal" data-target="#export_docs_pop" title="Export"><span class="fa fa-external-link icon_color"></span> Export</a></li>                                     
                <li><a href="#"  id="filter_btn_explorer" title="Filter Results"><span class="fa fa-filter icon_color"></span>   Filter Results</a></li>
            </ul>
        </div>
       <%-- <div class="filter_area_ui">
            <div class="exprt-filtr">
                <div class="export_button_area">
                    <div class="export_button" data-toggle="modal" data-target="#export_docs_pop"></div>
                </div>
                <div class="fliter_button_area">
                    <div class="filter_button" id="filter_btn_explorer"></div>
                </div>
            </div>
        </div>--%>
    </div>
    <div class="filter-section" id="divFilter" style="display: none;">
        <div class="expand-one">
            <p class="filter_section_link" style="display: none;">
                <img class="imgtoggle" src="../Usage%20Report_files/a.png" />Filter</p>
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
                <div class="input-section">
                    <asp:DropDownList ID="ddlCity" runat="server" ClientIDMode="Static" ToolTip="Location"></asp:DropDownList>
                </div>
                <div class="input-section">
                    <select id="ddlAccountType" title="Account Type">
                        <option selected="selected" value="">--Account Type--</option>
                        <option value="1">Residential</option>
                        <option value="2">C&amp;I</option>
                    </select>
                </div>
                <div class="input-section" style="width: auto  !important; float: right; margin: 5px 20px;">
                    <asp:Button ID="btnFilter" ToolTip="Search" CssClass="filterBtn" Text="Filter Result" runat="server" ClientIDMode="Static" Style="margin: 0px;" OnClientClick="return false;" />
                </div>
            </div>
        </div>
    </div>
    <div style="display: block; width: 100% !important;" class="current_area" id="GenDiv">
        <ul>
            <li>
                <div class="average_usage_header">
                    <span id="demandusageval">0</span><%--<img src="../Usage Report_files/arrow_down_img.png">--%>
                </div>
                <i id="demandusagetext">Pending Messages</i>
            </li>
            <li>
                <div class="average_usage_header"><span id="Success">0</span><%--<img src="../Usage Report_files/arrow_down_img.png">--%></div>
                <i id="androidText">Delivered Messages</i>
            </li>
            <li>
                <div class="average_usage_header"><span id="Failure">0</span><%--<img src="../Usage Report_files/arrow_down_img.png">--%></div>
                <i id="androidText">Failed Messages </i>
            </li>
            <li>
                <div class="average_usage_header"><span id="Total">0</span><%--<img src="../Usage Report_files/arrow_up_img.png">--%></div>
                <i id="totalText">Total Messages</i>
            </li>
        </ul>
    </div>

    <div class="calender_seciton_1">
        <div class="power_graph_heading power_graph_spanish">
            <div class="usage_date_time">
                <b>
                    <asp:Label ID="lblBefore" runat="server" Visible="true" ClientIDMode="Static"></asp:Label>
                    - 
                    <asp:Label ID="lblCurrent" runat="server" Visible="true" ClientIDMode="Static"></asp:Label>
                </b>
                <%--   <b><asp:Label ID="lblDateRange" runat="server" ClientIDMode="Static"></asp:Label></b>--%>
            </div>
            <div class="lgnd_box_right">
                <div class="left-active-sprites">
                    <ul>
                        <li class="chart" id="gridVw"><a href="#"></a></li>
                            <li class="graph line_grph_css" id="chartView"><a href="#" class="active"></a></li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
    <div id="nodata_div" style="width: 100%; text-align: center; color: Red; display: none;" visible="false">
        No Text Messages Data Available
    </div>
    <div class="grid-section">
       
            <div class="grid_main_box">
                <div id="chartDiv" class="Chart-area" style="position: relative; float: left; width: 99.8%; display: block;">
            </div>
        </div>
        <div class="grid-section" style="padding-top: 0px; width:100%;">
            <div id="graphDiv" class="Graph-area">
                <div class="grid_main_box">
                    <div id="jqxgrid" class="jqgrid">
                    </div>
                    <div id="jqxchildgrid" style="display: none;" class="jqgrid">
                    </div>

                </div>
                <%--    <div id="nodata_div" style="width: 100%; text-align: center; vertical-align: top;" visible="false"></div>--%>
            </div>

        </div>
    </div>
<%--    <div class="grid-section" style="padding-top: 0px; width: 100%">

        <div class="grid-section">
            <div style="display: block;" id="graphdivarea" class="Graph-area"></div>
        </div>

        <div class="grid_main_box">
        </div>

    </div>--%>
    <!-- div for table grid layout starts -->
<%--<div id="tabledivarea" class="Chart-area HEight" style="position: relative; float: left; width: 100%;">
        <div id="jqxgrid" class="jqgrid">
        </div>
        <div id="jqxchildgrid" style="display: none;" class="jqgrid">
        </div>
    </div>--%>


    <div id="page_loader">
    </div>

    <!-- Modal -3  -->
    <div class="modal fade popheading" id="export_docs_pop" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <%--<div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Export Assets</h4>
                </div>
                <div class="modal-body">
                    <div class="pdf_box_wrapper">
                        <b>Please select file type(s) to export.</b>
                        <ul>
                            <li>
                                <asp:ImageButton runat="server" ID="btnExportPdf" ImageUrl="~/images/PDF_icon.png" ToolTip="Export to Pdf" ClientIDMode="Static" OnClick="imgExportPDF_Click" ImageAlign="Middle" />
                                PDF(.pdf)
                            </li>
                            <li>
                                <asp:ImageButton runat="server" ID="btnExcelExport" ImageUrl="~/images/xls_icon.png" ToolTip="Export to Excel" OnClick="imgExportXLS_click" ClientIDMode="Static" ImageAlign="Middle" />
                                XLS(.xls)
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>--%>
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" title="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Export Options</h4>
                </div>
                <div class="modal-body">
                    <div class="pdf_box_wrapper">
                        <b>Please select file type(s) to export</b>
                        <ul>
                            <li><a href="#" class="pdf_icon" id="btnExportPdf" runat="server" onserverclick="btnExportPdf_ServerClick">Pdf(.pdf)</a></li>
                            <li><a href="#" class="excel_icon" id="btnExcelExport" runat="server" onserverclick="btnExcelExport_ServerClick">Excel(.xls)</a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
        <!-- End Popup -->
        </div>
        

                        
        <script>

            $('.left-active-sprites ul > li.graph > a').click(function () {
                setTimeout(function () {
                    LoadChart();
                }, 300);
            });
        </script>
</asp:Content>
