<%@ Page Title="IVR Report" Language="C#" MasterPageFile="~/AdminReports/AdminReport.master" AutoEventWireup="true" CodeBehind="IVR.aspx.cs" Inherits="AdminPanel.AdminReports.IVR" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<%@ Register Src="~/UserControl/ChartControl.ascx" TagPrefix="uc1" TagName="ChartControl" %>
<%@ Register Src="~/Configuration/UserControl/usernameautocomplete.ascx" TagPrefix="uc1" TagName="usernameautocomplete" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <script src="../js/ivr-report.js"></script>
    <script type="text/javascript">
        $("document").ready(function () {
            $("#chartDiv").addClass("HEight");
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
        $(document).ready(function () {
            /* remove the 'title' attribute of all <img /> tags */
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

        /*.HEight {
            height: 355px !important;
        }*/

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



        .top-header-area, .top-header-area h2 {
            padding-bottom: 2px !important;
            border-bottom: 0px !important;
        }

        .filterdrop {
            padding-left: 5px;
            cursor: pointer;
            display: block;
        }

        .outage_graph_img {
            top: -9.5% !important;
        }

        .current_area > ul > li {
            width: 25% !important;
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
    <input type="hidden" class="activeli_list" value="sidebar_ivr" />
    
    </asp:ScriptManager>
    <asp:HiddenField ID="hdnParamValues" runat="server" ClientIDMode="Static" />
    <div class="top-header-area">
        <div style="float: left; width: 35%;">
            <h2>IVR Report</h2>
        </div>
        <div class="right_header_area">
            <ul>
                <li><a href="#" data-toggle="modal" data-target="#export_docs_pop" title="Export"><span class="fa fa-external-link icon_color"></span>Export</a></li>
                <li><a href="#" id="filter_btn_explorer" title="Filter Results"><span class="fa fa-filter icon_color"></span>Filter Results</a></li>
            </ul>
        </div>
        <%--   <div class="filter_area_ui">
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
                    <asp:ImageButton CssClass="icon-cal" ID="btnDateFrom" runat="server" ImageUrl="~/images/icon-calendar.png" ToolTip="From date" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender1" runat="server" TargetControlID="txtDateFrom" PopupPosition="BottomRight"
                        PopupButtonID="btnDateFrom" OnClientDateSelectionChanged="checkDate" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender3" runat="server" TargetControlID="txtDateFrom" PopupPosition="BottomRight"
                        OnClientDateSelectionChanged="checkDate" />
                </div>
                <div class="input-section">
                    <asp:TextBox ID="txtDateTo" runat="server" placeholder="To Date" ClientIDMode="Static" Style="width: 90%;" ReadOnly="true" ToolTip="To date"></asp:TextBox>
                    <asp:ImageButton CssClass="icon-cal" ID="btnDateTo" runat="server" ImageUrl="~/images/icon-calendar.png" ToolTip="To date" />
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
                        <option value="">Account Type</option>
                        <option value="1">Residential</option>
                        <option value="2">C&I</option>
                    </select>
                </div>
                <%--<div class="input-section">
                <asp:DropDownList ID="ddlMessageStatus" runat="server" ClientIDMode="Static" ToolTip="Status">
                    <asp:ListItem Text="--Status--" />
                    <asp:ListItem Value ="0" Text="Pending"/>
                    <asp:ListItem Value ="1" Text="Success"/>
                    <asp:ListItem Value ="2" Text="Failure"/>
                </asp:DropDownList>
            </div>--%>
                <div class="input-section" title="customer name" style="display: none;">
                    <uc1:usernameautocomplete runat="server" ID="usernameautocomplete" />
                    <br />
                    <span class="texttype hide" id="contactnumber"></span>
                    <%--   <asp:TextBox ID="txtMobNo" runat="server" placeholder="Customer Name" ClientIDMode="Static"></asp:TextBox>
            </div>
            <div class="input-section">
             <asp:TextBox ID="txtAccountNo" runat="server" placeholder="Account Number" ClientIDMode="Static"></asp:TextBox>--%>
                </div>
                <div class="input-section" style="width: auto  !important; float: right; margin: 5px 20px;">
                    <asp:Button ID="btnFilter" ToolTip="Search" CssClass="filterBtn" Text="Filter Result" Style="margin: 0px;" runat="server" ClientIDMode="Static" OnClientClick="return false;" />
                </div>
            </div>
        </div>
    </div>

    <%-- <div class="active-sprite" style="width:97%; margin-left:1.4%;margin-bottom:1%;margin-top: -0.6%;border-top:1px solid rgb(203, 203, 203) ;">
        <div class="left-active-sprite" style="width:20%;padding-left:0px;">
            <a href="#">
                <i id="gridView" class="activeGrid"  onclick="javaScript:chartgraphsection(1)"> </i></a>
            <a href="#">
                <i id="pieGraph" class="pie"  onclick="javaScript:chartgraphsection(2)"> </i></a>
        </div>
         <div class="right-active-sprite" style="width:70%;height:20px;">
             <asp:ImageButton runat="server" ID="btnExcelExport" ImageUrl="~/images/Excel-icon.png"  ToolTip="Export to Excel" ClientIDMode="Static"  OnClientClick="return false"/>
            <a href="#">
                <asp:ImageButton runat="server" ID="btnExportPdf" ImageUrl="~/images/pdf-icon.png"
                    ToolTip="Export to Pdf" OnClick="ibbExportPDF_Click" />
            </a>
        </div>
    </div>--%>
    <div style="display: block;" class="current_area" id="GenDiv">
        <ul>
            <li>
                <div class="average_usage_header">
                    <asp:Label ID="lblPending" runat="server" Visible="true" ClientIDMode="Static"></asp:Label>
                </div>
                <i id="pendingtext">Pending Messages</i>
            </li>
            <li>
                <div class="average_usage_header">
                    <asp:Label ID="lblSuccess" runat="server" Visible="true" ClientIDMode="Static"></asp:Label>

                </div>
                <i id="successtext">Delivered Messages</i>
            </li>
            <li>
                <div class="average_usage_header">
                    <asp:Label ID="lblFailure" runat="server" Visible="true" ClientIDMode="Static"></asp:Label>
                </div>
                <i id="failuretext">Failed Messages</i>
            </li>
            <li>
                <div class="average_usage_header">
                    <asp:Label ID="lbltotal" runat="server" Visible="true" ClientIDMode="Static"></asp:Label>
                </div>
                <i id="totaltext">Total Messages</i>
            </li>
        </ul>
    </div>
    <div class="calender_seciton_1">
        <div class="power_graph_heading power_graph_spanish">
            <div class="usage_date_time">
                <b>
                    <label id="From_Date"></label>
                    -
                    <label id="To_Date"></label>
                </b>
            </div>
            <div class="lgnd_box_right">
                <div class="left-active-sprites">
                    <ul>
                        <li class="chart" id="gridVw"><a href="#"></a></li>
                        <%-- onclick="javaScript:chartgraphsection_admin(1)" --%>
                        <li class="graph line_grph_css" id="chartView"><a href="#" class="active"></a></li>
                        <%-- onclick="javaScript:chartgraphsection_admin(2)" --%>
                    </ul>
                </div>
            </div>


        </div>
    </div>
    <div id="graph_heading" style="padding-top: 20px;">
    </div>
    <div id="nodata_div" style="width: 100%; font-size: 13px; text-align: center; color: Red; display: none;">No IVR Data available</div>
    <div class="grid-section">
        <div class="grid_main_box" style="padding: 0 0;">

           <div id="chartDiv" class="Chart-area" style="width: 98%; height: 95%;">
                </div>
        </div>
        <!-- div for table grid layout starts -->
        <div class="grid-section" style="padding-top: 0px; width: 100%;">
            <div id="graphDiv" class="Graph-area" style="display: none;">
                <div class="grid_main_box">
                    <div id="jqxgrid" class="jqgrid">
                    </div>
                    <div id="jqxchildgrid" style="display: none;" class="jqgrid">
                    </div>
                </div>
            </div>


        </div>
    </div>
    <div id="page_loader">
    </div>
    <%--<div class="grid-section" style="padding-top: 0px;width: 99.5%">
        <div id="graphDiv" class="Graph-area">
            <div class="grid_main_box">
                <div id="jqxgrid" class="jqgrid">
                </div>
                <div id="jqxchildgrid" style="display: none;" class="jqgrid">
                </div>
            </div>
        </div>
         <div id="nodata_div" style="width: 100%; text-align: center; color: Red;display: none;" visible="false">No Data</div>
        <div id="chartDiv" class="Chart-area" style="position: relative; float: left; width: 100%;">
            <div class="grid_main_box">
              
                <uc1:ChartControl runat="server" ID="ChartControl" />
                  <div id="usagetitle" style="font-weight:  bold;"></div>
                <div id="div-TextMessagechart" visible="true"  style="width:100%; height:300px;">
                </div>
            </div>
            <div id="nodata_div1" style="width: 100%; text-align: center; vertical-align:top;" visible="false">No Data</div>
        </div>
    </div>--%>


    


    <input type="hidden" class="city" value="" />
    <input type="hidden" class="zipcode" value="" />

    <div class="modal fade popheading" id="export_docs_pop" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" title="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Export Assets</h4>
                </div>
                <div class="modal-body">
                    <div class="pdf_box_wrapper">
                        <b>Please select file type(s) to export</b>
                        <ul>
                            <li><a href="#" class="pdf_icon" id="btnExportPdf" runat="server" onserverclick="pdf_ServerClick">Pdf(.pdf)</a></li>
                            <li><a href="#" class="excel_icon" id="btnExcelExport" runat="server" onserverclick="btnExcelExport_ServerClick">Excel(.xls)</a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <script>

        $('.left-active-sprites ul > li.graph > a').click(function () {
            setTimeout(function () {
                LoadChart();
            }, 300);
        });
    </script>
</asp:Content>
