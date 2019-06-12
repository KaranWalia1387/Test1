<%@ Page Title="Email Report" Language="C#" MasterPageFile="~/AdminReports/AdminReport.master" AutoEventWireup="true" CodeBehind="Email.aspx.cs" Inherits="AdminPanel.AdminReports.Email" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<%@ Register Src="~/UserControl/ChartControl.ascx" TagPrefix="uc1" TagName="ChartControl" %>
<%@ Register Src="~/Configuration/UserControl/usernameautocomplete.ascx" TagPrefix="uc1" TagName="usernameautocomplete" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <link href="../css/AdminReport_main.css" rel="stylesheet" />
    
    <script src="../js/email-report.js"></script>

    <script type="text/javascript">
        $("document").ready(function () {
            $("#chartDiv").addClass("HEight");
        });
        $(document).ready(function () {
            /* remove the 'title' attribute of all <img /> tags */
            $("img").removeAttr("title");
            $('#filter_btn_explorer').click(function () {
                $(this).toggleClass('active');
                $('#divFilter').toggle();
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
            overflow: hidden;
        }

        .ajax__calendar_container {
            width: 190px !important;
        }

        /*.HEight {
            height: 355px !important;
        }*/

        .content {
            /*background-color: rgb(203, 203, 203) !important;*/
        }

        .expand-one {
            cursor: pointer;
            background-color: rgb(236, 236, 236);
        }

        .imgtoggle {
            padding-left: 10px;
            padding-right: 5px;
        }

        .filter-section {
            float: left;
            margin: 0px 0 4px 12px;
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

        @media screen and (min-width: 768px) and (max-width:1024px) {
            .input-section {
                width: 106px !important;
            }
        }

        /*.filter-section input[type="text"], input[type="number"], input[type="password"] {
    background: #fff;
    border: 1px solid #999999;
    color: #616161;
    font-size: 76.3%;
    margin-bottom: 10px;
    margin-top: 4px;
    padding: 0 4px;
    width: 99%;
    line-height:19px;
    padding: 2px 4px ;
	height:19px;
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
    padding-bottom:2px !important;
    border-bottom:0px !important;
}
 .filterdrop {
            padding-left: 5px;
            cursor: pointer;
            display: block;
        }

   .outage_graph_img {
     top: -9.5% !important;}*/
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
    <uc1:jqxGrid runat="server" ID="jqxGrid" />
    <input type="hidden" class="activeli_list" value="sidebar_email" />
    
    </asp:ScriptManager>
    <asp:HiddenField ID="hdnParamValues" runat="server" ClientIDMode="Static" />

    <div class="top-header-area">
        <div style="float: left; width: 35%;">
            <h2>Email</h2>
        </div>
        <div class="right_header_area">
            <ul>
                <li><a href="#" data-toggle="modal" data-target="#export_docs_pop" title="Export"><span class="fa fa-external-link icon_color"></span>Export</a></li>
                <li><a href="#" id="filter_btn_explorer" title="Filter Results"><span class="fa fa-filter icon_color"></span>Filter Results</a></li>
            </ul>
        </div>
        <%--<div class="main">
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

    <div class="filter-section" id="divFilter" style="display: none; width: 100%; padding-bottom: 0%; margin-left: 0%; margin-bottom: 0px;">
        <div class="expand-one">
            <p class="filter_section_link" style="display: none;">
                <img class="imgtoggle" src="..\images\ArrowsMinus.png" />Filter
            </p>
            <div class="content">
                <div class="input-section">
                    <asp:TextBox ID="txtDateFrom" runat="server" placeholder="From Date" ClientIDMode="Static" Style="width: 90%;" ReadOnly="true" ToolTip="From date"></asp:TextBox>
                    <asp:ImageButton CssClass="icon-cal" ID="btnDateFrom" runat="server" ImageUrl="~/images/Icon-calendar.png" ToolTip="From date" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender1" runat="server" TargetControlID="txtDateFrom" PopupPosition="BottomRight"
                        PopupButtonID="btnDateFrom" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender3" runat="server" TargetControlID="txtDateFrom" PopupPosition="BottomRight" />
                </div>
                <div class="input-section">
                    <asp:TextBox ID="txtDateTo" runat="server" placeholder="To Date" ClientIDMode="Static" Style="width: 90%;" ReadOnly="true" ToolTip="To date"></asp:TextBox>
                    <asp:ImageButton CssClass="icon-cal" ID="btnDateTo" runat="server" ImageUrl="~/images/Icon-calendar.png" ToolTip="To date" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender2" runat="server" TargetControlID="txtDateTo" PopupPosition="BottomRight"
                        PopupButtonID="btnDateTo" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender4" runat="server" TargetControlID="txtDateTo" PopupPosition="BottomRight" />
                </div>

                <div class="input-section" style="width: auto  !important; float: right; margin: 5px 20px;">
                    <asp:Button ID="btnFilter" ToolTip="Search" CssClass="filterBtn" runat="server" Text="Filter Result" ClientIDMode="Static" OnClientClick="return false;" Style="margin: 0px;" />
                </div>
            </div>
        </div>
    </div>

    <div style="display: block; width: 100%;" class="current_area" id="GenDiv">
        <ul>            
            <li style="width: 33%;">
                <div class="average_usage_header">
                    <span id="demandusageval">
                        <asp:Label ID="lblRead" runat="server" ClientIDMode="Static"></asp:Label>
                    </span>
                </div>
                <i id="demandusagetext">Read Emails</i>
            </li>
            <li style="width: 33%;">
                <div class="average_usage_header">
                    <span>
                        <asp:Label ID="lblUnread" runat="server" ClientIDMode="Static"></asp:Label>
                    </span>
                </div>
                <i>Unread Emails</i>
            </li>

            <li style="width: 34%;">
                <div class="average_usage_header">
                    <span>
                        <asp:Label ID="lblTotal" runat="server" ClientIDMode="Static"></asp:Label>
                    </span>
                </div>
                <i>Total Emails</i>
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
                <%--  <span id="divCalender">
                        <input name="" id="" src="..\Usage%20Report_files\Icon-Calendar.png" style="vertical-align: middle; margin-top: -4px;" type="image">
                    </span>--%>
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

    <div id="nodata_div" style="width: 100%; text-align: center" visible="false"></div>
    <div class="grid-section" style="padding-top: 0px;">
        <div class="grid_main_box">
            <div id="chartDiv" class="Chart-area" style="position: relative; float: left; width: 99.8%; display: block;">
                <%--<div style="width: 98%; height: 95%;" id="graphdivarea" class="Graph-area" visible="true"></div>--%>
            </div>
    </div>
    <div class="grid-section" style="padding-top: 0px; width: 100%;">
        <div id="graphDiv" class="Graph-area HEight">
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
   

    <div id="page_loader2" style="display: none">
        Loading....
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
                        <b>Please select file type(s) to export</b>
                        <ul>
                            <li><a href="#" class="pdf_icon" id="btnExportPdf" runat="server" onserverclick="btnExportPdf_ServerClick">Pdf(.pdf)</a></li>
                            <li><a href="#" class="excel_icon" id="btnExcelExport" runat="server" onserverclick="btnExcelExport_ServerClick">Excel(.xls)</a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <input type="hidden" class="city" value="" />
    <input type="hidden" class="zipcode" value="" />

</asp:Content>
