<%@ Page Title="Services Report" Language="C#" MasterPageFile="~/AdminReports/AdminReport.master" AutoEventWireup="true" CodeBehind="ServiceSample.aspx.cs" Inherits="AdminPanel.AdminReports.ServiceSample" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<%@ Register Src="~/UserControl/ChartControl.ascx" TagPrefix="uc1" TagName="ChartControl" %>



<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <style type="text/css">
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

        .top-header-area, .top-header-area h2 {
            padding-bottom: 2px !important;
            border-bottom: 0px !important;
        }

        .emailCC {
            margin-left: 30% !important;
        }

        .emailCC1 {
            margin-left: 2% !important;
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
    </style>
    <script type="text/javascript" src="/js/bootstrap.js"></script>
    <script src="/js/Validate.js"></script>
    <script src="../js/highchart_js/common-chart.js"></script>

    <script src="../js/service-report_sample.js"></script>
    <script type="text/javascript">
        $("document").ready(function () {
            $("#chartDiv").addClass("HEight");
        });
        $(document).ready(function () {
            /* remove the 'title' attribute of all <img /> tags */
            $("img").removeAttr("title");

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
        });
    </script>

    <script type="text/javascript">

        $(document).ready(function () {
            var open = true;
            $("#menu_navigator").click(function () {
                $('.left-side').toggleClass('lw-width');
                $(".right-side").toggleClass("new-right-side");
                $('.input-section select').toggleClass('zinc');
                //$(".left-side").toggle();
                //$(".right-side").toggleClass("remove_left_margin");
                if (open) {
                    open = false;
                    $("#button-sidebar").css("background", "url('../images/close-arrow.png') no-repeat center center");
                } else {
                    open = true;
                    $("#button-sidebar").css("background", "url('../images/open-arrow.png') no-repeat center center");
                }
                if ($(".jqgrid").jqxGrid != null)
                    $(".jqgrid").jqxGrid('updatebounddata');
                $('.grid_main_box').toggleClass("padleft");
                processed_json = dtOutageChartjs;
                $('#outageschart').empty();
                Bindheigh('column', 'outageschart', false);
                //
                processed_json = dtUsageChartjs;
                $('#usagechart').empty();
                Bindheigh('column', 'usagechart', true);
                //
                processed_json = Generationjs;
                $('#generationchart').empty();
                Bindheigh('column', 'generationchart', true);

            });
            function openfancybox(url, width, showhome) {
                $.fancybox({
                    //'width': '90%',
                    'width': width,
                    'height': '90%',
                    'autoScale': true,
                    'transitionIn': 'fade',
                    'transitionOut': 'fade',
                    'href': url,
                    //'href': '/Default.aspx',
                    'type': 'iframe',

                });
                return false;
            }


            /* Usage page filter */
            $('#filter_btn_explorer').click(function () {
                $(this).toggleClass('active');
                $('#divFilter').toggle();
            });
            /* Usage page filter */
        });

    </script>

    <uc1:jqxGrid runat="server" />
    
    </asp:ScriptManager>
    <input type="hidden" class="activeli_list" value="sidebar_service" />
    <asp:HiddenField ID="hdnParamValues" runat="server" ClientIDMode="Static" />

    <style type="text/css">
        .jqx-grid-column-header {
            font-weight: bold;
        }
    </style>

    <input class="activeli_list" value="sidebar_service" type="hidden">

    <!-- Edited by prashant (code added for the heading section and drop down section.) -->
    <div class="top-header-area">
        <div style="float: left; width: 35%;">
            <h2>Services</h2>
        </div>
        <div class="right_header_area">
            <ul>
                <li><a href="#" data-toggle="modal" data-target="#export_docs_pop" title="Export"><span class="fa fa-external-link icon_color"></span>Export</a></li>
                <li><a href="#" id="filter_btn_explorer" title="Filter Results"><span class="fa fa-filter icon_color"></span>Filter Results</a></li>
            </ul>
        </div>
    
    </div>
    <!-- Edited by prashant (code added for the data show) -->
    <div class="filter-section" id="divFilter" style="display: none;">
        <div class="expand-one">
            <p class="filter_section_link" style="display: none;">
                <img class="imgtoggle" src="..\images\ArrowsMinus.png">Filter
            </p>
            <div class="content container-fluid">
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
                    <asp:DropDownList ID="ddlCity" runat="server" ClientIDMode="Static" Style="width: 90%;" ToolTip="Location"></asp:DropDownList>
                </div>
                <div class="input-section">

                    <select id="ddlAccountType" title="Account Type" style="width: 90%;">
                        <option value="">Account Type</option>
                        <option value="1">Residential</option>
                        <option value="2">C&I</option>
                    </select>
                </div>
                <div class="input-section" style="width: auto  !important; float: right; margin: 5px 20px;">
                    <asp:Button ID="btnFilter" ToolTip="Search" CssClass="filterBtn" Text="Filter Results" Style="margin: 0px;" runat="server" ClientIDMode="Static" OnClientClick="return false;" />

                </div>


            </div>
        </div>
    </div>
    <div style="display: block;" class="current_area" id="GenDiv">
        <ul>
            <li>
                <div class="average_usage_header">
                    <span id="demandusageval"></span>
                </div>
                <i id="demandusagetext">Attended Request</i>
            </li>
            <li>
                <div class="average_usage_header"><span id="orderCompleted"></span></div>
                <i>Pending Request</i>
            </li>

            <li>
                <div class="average_usage_header"><span id="totalOrder"></span></div>
                <i>Total Requests</i>
            </li>
        </ul>
    </div>
    <!-- Edited by prashant (code added for the upper section for data in admin portal.) -->

    <div class="calender_seciton_1">
        <div class="power_graph_heading power_graph_spanish">
            <div class="usage_date_time">
              
                <b><span id="defDate"></span></b>
             
            </div>
            <div class="lgnd_box_right">
                <div class="left-active-sprites">
                    <ul>
                        <li id="chart" class="chart"><a href="#"></a></li>
                        <li id="graph" class="graph line_grph_css"><a href="#" class="active"></a></li>
                    </ul>
                </div>
            </div>

        </div>
    </div>


    <!-- Edited by prashant ends (code edited for graph & grid section here ) -->


    <!-- Edited by prashant ends (code edited for graph & grid section here ) -->
    <div class="grid-section" style="padding-top: 0px; width: 100%;  ">
        <div id="nodata_div" style="width: 100%; text-align: center; color: red; display: none">No data</div>       
         <div class="grid_main_box" style="padding: 0 0;">

                  <div id="chartDiv" class="Chart-area" style="position: relative; float: left; width: 99.8%; display: block;"></div>
                </div>
                
    <!-- div for table grid layout starts -->
    <div id="tabledivarea" class="Chart-area HEight" style="position: relative; float: left; width: 100%;">
        
        <div class="grid_main_box">
            <div id="jqxgrid" class="jqgrid">
            </div>

        </div>
    </div>


    <script type="text/javascript">
        $(".report").addClass('active');
    </script>
    <style>
        #collapseOne li a, .in li a {
            cursor: pointer;
        }

    </style>

 <!-- END footer -->
    <div id="page_loader2" style="display: none">
        Loading....
    </div>


    <div id="page_loader">
    </div>

    <!-- Modal -3  -->
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
                                <a class="pdf_icon" id="btnExportPdf" title="Export to Pdf" runat="server" onserverclick="imgExportPDF_Click">Pdf(.pdf)</a>
                            </li>
                            <li>
                                <a id="btnExcelExport" title="Export to Excel" class="excel_icon" runat="server" onserverclick="btnExcelExport_ServerClick">Excel(.xls)</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>

    <!-- End Popup -->


</asp:Content>
