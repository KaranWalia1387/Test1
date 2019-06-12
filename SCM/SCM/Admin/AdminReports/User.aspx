<%@ Page Title="Customer Report" Language="C#" MasterPageFile="~/AdminReports/AdminReport.master" AutoEventWireup="true" CodeBehind="User.aspx.cs" Inherits="AdminPanel.AdminReports.User" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<%@ Register Src="~/UserControl/ChartControl.ascx" TagPrefix="uc1" TagName="ChartControl" %>


<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <link href="../css/AdminReport_main.css" rel="stylesheet" />
    <script type="text/javascript">
        $("document").ready(function () {
            $("#chartDiv").addClass("HEight");


            // START NEW UI 12/27/2014
            $("#ddlCity").change(function (i, obj) {
                if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
                    var ddlCity = $('#ddlCity option:selected');
                    $('#hdnCity').val($(ddlCity).val());
                }
            });
            // END NEW UI 12/26/2014
        });
        $(document).ready(function () {
            /* remove the 'title' attribute of all <img /> tags */
            $("img").removeAttr("title");


            /* Usage page filter */
            $('#filter_btn_explorer').click(function () {
                $(this).toggleClass('active');
                $('#divFilter').toggle();
            });
            /* Usage page filter */
        });
    </script>
    <style type="text/css">
        #div-mainChart {
            overflow:hidden;
        }
        .inner-right-section .right-content-area {
            padding: 11px 0px 10px;
        }

        .content {
            /*background-color: rgb(203, 203, 203) !important;*/
        }

        .top-header-area {
            padding-top: 0px !important;
        }

        .expand-one {
            /*cursor: pointer;*/
            background-color: rgb(236, 236, 236);
        }

        .imgtoggle {
            padding-left: 10px;
            padding-right: 5px;
        }

        .input-section {
            margin-right: 0px;
        }

        .filterdrop {
            padding-left: 5px;
            cursor: pointer;
            display: block;
        }

        .registerimg {
            padding-top: 3px;
            cursor: pointer;
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
            width: 13%;
        }

        .emailCC {
            margin-left: 30% !important;
        }

        .emailCC1 {
            margin-left: 2% !important;
        }

        @media screen and (min-width: 768px) and (max-width:1024px) {
            .input-section {
                width: 106px !important;
            }
        }


        
        .emailSend {
            background: #606060;
            border: none;
            color: #f0f0f0;
            cursor: pointer;
            font-size: 14px;
            height: 30px;
            margin: 3px 5px 5px 5px;
            padding: 5px 5px;
            text-align: center;
            border-radius: 5px;
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
    <uc1:jqxGrid runat="server" />
    <input type="hidden" class="activeli_list" value="sidebar_myaccount" />
    
    </asp:ScriptManager>
    <asp:HiddenField ID="hdnCity" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnParamValues" runat="server" ClientIDMode="Static" />

    <div class="top-header-area">
        <div style="float: left; width: 35%;">
            <h2>Customers</h2>
        </div>
        <div class="right_header_area">
            <ul>
                <li><a href="#" data-toggle="modal" data-target="#export_docs_pop" title="Export"><span class="fa fa-external-link icon_color"></span> Export</a></li>                                     
                <li><a href="#"  id="filter_btn_explorer" title="Filter Results"><span class="fa fa-filter icon_color"></span>   Filter Results</a></li>
            </ul>
        </div>
       
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
                <div class="input-section" style="width: auto  !important; float: right; margin: 5px 20px;">
                    <asp:Button ID="btnFilter" ToolTip="Search" CssClass="filterBtn" runat="server" Text="Filter Result" ClientIDMode="Static" OnClientClick="return false;" Style="margin: 0px;" />
                </div>
            </div>
        </div>
    </div>

    <div style="display: block; width: 100%;" class="current_area" id="GenDiv">
        <ul>
            <li style="width: 25%;">
                <div class="average_usage_header">
                    <span>
                        <asp:Label ID="lblRegUsr" runat="server" ClientIDMode="Static"></asp:Label>
                    </span>
                </div>
                <i>Registered Customers</i>
            </li>
            <li style="width: 25%;">
                <div class="average_usage_header">
                    <span id="demandusageval">
                        <asp:Label ID="lblActUsr" runat="server" ClientIDMode="Static"></asp:Label>
                    </span>
                </div>
                <i id="demandusagetext">Active Customers</i>
            </li>
              <li style="width: 25%;">
                <div class="average_usage_header">
                    <span id="InactiveCust">
                        <asp:Label ID="lblInActUsr" runat="server" ClientIDMode="Static"></asp:Label>
                    </span>
                </div>
                <i id="demandusageCust">InActive Customers</i>
            </li>
            

            <li style="width: 25%;">
                <div class="average_usage_header">
                    <span>
                        <asp:Label ID="lblTotalUsr" runat="server" ClientIDMode="Static"></asp:Label>
                    </span>
                </div>
                <i>Total Customers</i>
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

    <div class="grid-section" style="padding-top: 0px; width: 100%">
        <div style="display: block;" id="graphdivarea" class="Graph-area">
            <div class="grid_main_box">
                
                <div id="notifytitle" style="display: none;"></div>
             
                <div id="chartDiv" class="Chart-area" style="position: relative; float: left; width: 99.8%; display: block;"></div>
            </div>
        </div>
        <div id="nodata_div2" style="width: 100%; text-align: center;display:none;"></div>
    </div>
    <!-- div for table grid layout starts -->
    <div id="tabledivarea" class="Chart-area HEight" style="position: relative; float: left; width: 100%;">
        <div id="graphDiv" class="Graph-area">
            <div class="grid_main_box">
                <div id="jqxgrid" class="jqgrid">
                </div>
                <div id="jqxchildgrid" style="display: none;" class="jqgrid">
                </div>

            </div>
            <div id="nodata_div" style="width: 100%; text-align: center; vertical-align: top;display:none;"></div>
        </div>

    </div>
    <!-- div for table grid layout starts -->

    <div id="page_loader2" style="display: none">
        Loading....
    </div>

    <div id="page_loader">
    </div>

    <%--START NEW UI 12/26/2014--%>
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
                             <li>
                                  <a class="pdf_icon" id="btnPdf" title="Export to Pdf" runat="server" onserverclick="btnPdf_ServerClick1">Pdf(.pdf)</a>                               
                            </li>
                            <li>
                                 <a id="btnExcelExport" title="Export to Excel" class="excel_icon" runat ="server" onserverclick="btnExcelExport_ServerClick">Excel(.xls)</a>
                               
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    </div>
    

    <script src="../js/user-report.js"></script>
    
    <script src="../js/popup.js"></script>
</asp:Content>
