<%@ Page Title="Billing Report" Language="C#" MasterPageFile="~/AdminReports/AdminReport.master" AutoEventWireup="true" CodeBehind="Billing.aspx.cs" Inherits="AdminPanel.AdminReports.Billing" %>

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
            //$('#filter_btn_explorer').click(function () {
            //    $(this).toggleClass('active');
            //    $('#divFilter').toggle();
            //});
        });
    </script>
    <style type="text/css">
        #graphdivarea {
            overflow:hidden;
        }
                .ajax__calendar_container {
width:190px !important;
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
    <%--<script src="../js/AdminReport_CommonFunctions.js"></script>--%>
    <uc1:jqxGrid runat="server" />
    
    </asp:ScriptManager>
    <input type="hidden" class="activeli_list" value="sidebar_billing" />
    <asp:HiddenField ID="hdnParamValues" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnStatus" runat="server" ClientIDMode="Static" />
    <div class="top-header-area">
        <div style="float: left; width: 35%;">
            <h2>Billing</h2>
        </div>
        <div class="filter_area_ui">
            <!-- <div class="selection_area select-style">
                <select>
                    <option selected="selected">POWER</option>
                    <option>WATER</option>
					<option>GAS</option>
                </select>
            </div> -->
             <div class="right_header_area">
                <ul>
                    <li><a href="#" data-toggle="modal" data-target="#export_docs_pop" title="Export"><span class="fa fa-external-link icon_color"></span> Export</a></li>                                     
                    <li><a href="#"  id="filter_btn_explorer" title="Filter Results"><span class="fa fa-filter icon_color"></span>   Filter Results</a></li>
                </ul>
            </div>
          <%--  <div class="exprt-filtr">
                <div class="export_button_area">
                    <div class="export_button" data-toggle="modal" data-target="#export_docs_pop"></div>
                </div>
                <div class="fliter_button_area">
                    <div class="filter_button" id="filter_btn_explorer"></div>
                </div>
            </div>--%>
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
                <div class="input-section" style="width: 11%; display: none">
                    <select id="statusBill" title="Status">
                        <option value="">Status</option>
                        <option value="1">Paid</option>
                        <option value="2">UnPaid</option>
                    </select>
                </div>
                <div class="input-section" style="display: none">
                    <input id="txtSearch" type="text" placeholder="Search User" title="Search User" onkeypress="return numberOnly(this, event)" maxlength="30" style="width: 80%;" />
                </div>
                <div class="input-section" style="width: auto !important;float:right;margin:5px 20px;">
                    <asp:Button ID="btnFilter" ToolTip="Search" CssClass="filterBtn" runat="server" ClientIDMode="Static" Text="Filter Results" Style="margin: 0px;" OnClientClick="return false;" />
                </div>
            </div>
        </div>
    </div>
    <%--<div class="active-sprite" style="display: none; width: 97%; margin-left: 1.4%; margin-bottom: 1%; margin-top: -1.3%; border-top: 1px solid rgb(203, 203, 203);">
        <div class="left-active-sprite" style="width: 20%; padding-left: 0px;">
            <a href="#">
                <i id="gridView" class="activeGrid" onclick="javaScript:chartgraphsection(1)" title="Chart View" > </i></a>
            <a href="#">
                <i id="pieGraph" class="pie" onclick="javaScript:chartgraphsection(2)" title="Graph View" > </i></a>

        </div>
        <div class="right-active-sprite" style="width: 70%; height: 20px;">

            <%--<asp:ImageButton runat="server" ID="btnExcelExport" ImageUrl="~/images/Excel-icon.png" ToolTip="Export to Excel" ClientIDMode="Static" OnClientClick="return false" />
            <a href="#">
                <asp:ImageButton runat="server" ID="btnExportPdf" ImageUrl="~/images/pdf-icon.png"
                    ToolTip="Export to Pdf" OnClick="imgExportPDF_Click" />
            </a>
        </div>
    </div>--%>
    <div style="display: block;" class="current_area" id="GenDiv">
        <ul>
            <li>
                <div class="average_usage_header">
                    <span id="demandusageval">
                        <label id="PaidBills"></label>
                    </span>
                    <img src="Usage%20Report_files/arrow_down_img.png" style="display: none">
                </div>
                <i id="demandusagetext">Paid Bills</i>
            </li>
            <li>
                <div class="average_usage_header">
                    <span>
                        <label id="PendingBills"></label>
                    </span>
                    <img src="Usage%20Report_files/arrow_down_img.png" style="display: none">
                </div>
                <i>Unpaid Bills</i>
            </li>

            <li>
                <div class="average_usage_header">
                    <span>
                        <label id="TotalBills"></label>
                    </span>
                    <img src="Usage%20Report_files/arrow_up_img.png" style="display: none">
                </div>
                <i>Total Bills</i>
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
                        <%-- onclick="javaScript:chartgraphsection_admin(1)" --%>
                        <li class="graph line_grph_css"><a href="#" class="active"></a></li>
                        <%-- onclick="javaScript:chartgraphsection_admin(2)" --%>
                    </ul>
                </div>
            </div>


        </div>
    </div>
    <%--<div class="grid-section" style="padding-top: 0px; width: 99%;">
        <div id="nodata_div" style="width: 100%; text-align: center; color: red; display: none;" visible="false">No Data</div>
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
                <div id="div-Billingchart" visible="true" style="width: 100%; height: 400px!important">
                    <div id="BillingTitle" style="width: 50%;"></div>
                    <div id="div-mainChart" class="outage_chart" style="width: 60%"></div>
                </div>
                <div id="nodata_div1" style="width: 100%; text-align: center; color: red; display: none;" visible="false">No Data</div>
            </div>
        </div>
    </div>--%>

    <!-- Edited by prashant ends (code edited for graph & grid section here ) -->
    <div id="graph_heading" style="padding-top: 20px;">
    </div>
    <div class="grid-section" style="padding-top: 0px; width: 100%">
        <div class="grid-section_1">

            <div id="chartDiv" class="Chart-area" style="position: relative; float: left; width: 99.8%; display: block;">
                <div id="nodata_div" style="width: 99%; text-align: center" visible="false"></div>
                <%--<div class="low_usage_box legends_area">
				<div>
					<span class="GraphLegend_low"></span>
					<span class="GraphLegend_data_low" globalize="ML_Usage_Lbl_LowUsage">Paid Bills</span>
					<span class="GraphLegend_Avg"></span>
					<span class="GraphLegend_data_low" globalize="ML_Usage_Lbl_AverageUsage">Pending Bills</span>
				</div>
			</div>
            <div class="grid_main_box">
				<img src="images/billing-graph.png" class="img-resp">
			</div>--%>
                <%--		<div class="weather_box_right">
			<ul class="predict-btns">
			<li><a href="" class="btn btn-conditional">Hourly</a></li>
			<li><a href="" class="btn btn-conditional active">Daily</a></li>
			<li><a href="" class="btn btn-conditional">Yearly</a></li>
			<li><a href="" class="btn btn-conditional">Seasonal</a></li>
			</ul>
		</div>
			<div class="col-md-12 col-sm-12 col-xs-12">
				<ul class="down-boxes">
					<li><div> </div></li>
					<li><div> </div></li>
					<li><div> </div></li>
				</ul>
			</div>--%>
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
                               <li><a class="pdf_icon" id="pdf" runat="server" onserverclick="pdf_ServerClick">Pdf(.pdf)</a></li>
                                <li><a id="btnExcelExport" class="excel_icon" runat="server" onserverclick="btnExcelExport_ServerClick">Excel(.xls)</a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    </div>
    
    <script src="../js/billing-report.js"></script>
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
