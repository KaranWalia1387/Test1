<%@ Page Title="Notification Report" Language="C#" MasterPageFile="~/AdminReports/AdminReport.master" AutoEventWireup="true" CodeBehind="SampleNotification.aspx.cs" Inherits="AdminPanel.SampleNotification" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<%@ Register Src="~/UserControl/ChartControl.ascx" TagPrefix="uc1" TagName="ChartControl" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    

    <link rel="stylesheet" href="//js.arcgis.com/3.11/esri/css/esri.css">
    <script src="//js.arcgis.com/3.11/"></script>
    <script src="../js/Samplenotification-report.js"></script>
    
    <style type="text/css">
        .ajax__calendar_container {
            width: 190px !important;
        }


        .filterdrop {
            padding-left: 5px;
            cursor: pointer;
            display: block;
        }

        .filterdropzip {
            padding-left: 5px;
            cursor: pointer;
            display: block;
        }

        .esriPopup .titlePane {
            background-color: #444444;
            border-radius: 5px 5px 0 0;
            color: #ffffff;
            cursor: default;
            height: 24px;
            line-height: 20px;
            padding-left: 6px;
        }

        .titlePane .title {
            width: auto;
        }

        .sizer.content {
            background: #f7f7f7;
            padding: 0 !important;
        }

        .close {
            opacity: 1 !important;
        }

        .expand-one {
            background-color: rgb(236, 236, 236);
        }

        .imgtoggle {
            padding-left: 10px;
            padding-right: 5px;
        }

        .input_section_box {
            width: 100%;
        }

        .input-section {
            float: left;
            margin: 0 5px 0 0;
            width: 120px;
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
        #div-NotificationChart {
            overflow:hidden;
        }
    </style>

    <script type="text/javascript">
        $(document).ready(function () {
            var open = true;
            $("#menu_navigator").click(function () {
                $('.left-side').toggleClass('lw-width');
                $(".right-side").toggleClass("new-right-side");
                $('.input-section select').toggleClass('zinc');
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
                    'width': width,
                    'height': '90%',
                    'autoScale': true,
                    'transitionIn': 'fade',
                    'transitionOut': 'fade',
                    'href': url,
                    'type': 'iframe',
                });
                return false;
            }
        });

        $("document").ready(function () {
            $("#chartDiv").addClass("HEight");
        });

        $(document).ready(function () {
            /* remove the 'title' attribute of all <img /> tags */
            $("img").removeAttr("title");
        });

        $(".report").addClass('active');
    </script>




    <div class="right-content-area">
        <script type="text/javascript">
            $("document").ready(function () {
                $("#chartDiv").addClass("HEight");
                $("#ddlCity").change(function (i, obj) {
                    if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
                        var ddlCity = $('#ddlCity option:selected');
                        $('#hdnCity').val($(ddlCity).val());
                    }
                });
            });

            $(document).ready(function () {
                /* remove the 'title' attribute of all <img /> tags */
                $("img").removeAttr("title");
            });
        </script>

        <uc1:jqxGrid runat="server" />
        <input class="activeli_list" value="sidebar_nitiF" type="hidden">
        <asp:HiddenField ID="hdnParamValues" runat="server" ClientIDMode="Static" />
        <!-- Edited by prashant (code added for the heading section and drop down section.) -->
        <div class="top-header-area">
            <div style="float: left; width: 35%;">
                <h2>Notifications</h2>
            </div>
              <div class="right_header_area">
                <ul>
                    <li><a href="#" data-toggle="modal" data-target="#export_docs_pop" title="Export"><span class="fa fa-external-link icon_color"></span> Export</a></li>                                     
                    <li><a href="#"  id="filter_btn_explorer" title="Filter Results"><span class="fa fa-filter icon_color"></span>   Filter Results</a></li>
                </ul>
            </div>
        </div>



        <!-- Edited by prashant (code added for the data show) -->
        <div class="filter-section noti_cal" id="divFilter" style="display: none;">

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
                        <span id="demandusageval">
                            <asp:Label ID="lblServiceReq" runat="server" ClientIDMode="Static"></asp:Label>
                        </span>
                    </div>
                    <i id="demandusagetext">Service Request Notifications</i>
                </li>
                <li style="width: 25%;">
                    <div class="average_usage_header">
                        <span>
                            <asp:Label ID="lblOutageReq" runat="server" ClientIDMode="Static"></asp:Label>
                        </span>
                    </div>
                    <i>Outage Notifications</i>
                </li>

                <li style="width: 25%;">
                    <div class="average_usage_header">
                        <span>
                            <asp:Label ID="lblBillingReq" runat="server" ClientIDMode="Static"></asp:Label>
                        </span>
                    </div>
                    <i>Billing notifications</i>
                </li>
                <li style="width: 25%;">
                    <div class="average_usage_header">
                        <span>
                            <asp:Label ID="lblTotalReq" runat="server" ClientIDMode="Static"></asp:Label>
                        </span>
                    </div>
                    <i>Total Notifications</i>
                </li>
            </ul>
        </div>

        <!-- Edited by prashant (code added for the upper section for data in admin portal.) -->
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
        <div id="nodata_div" style="width: 100%; text-align: center; vertical-align: top;" visible="false"></div>
        <!-- Edited by prashant ends (code edited for graph & grid section here ) -->
        <div class="grid-section" style="padding-top: 0px; width: 100%">
            <div style="display: block;" id="graphdivarea" class="Graph-area">

                <div class="grid_main_box">
                    <!--<img src="images/notification-graph.png" class="img-resp">-->
                    <div id="notifytitle" style="display: none;"></div>
                    <uc1:ChartControl runat="server" ID="ChartControl" />
                   <%-- <div id="div-NotificationChart" visible="true" style="width: 99%;"></div>--%>
                   <div id="chartDiv" class="Chart-area" style="position: relative; float: left; width: 99.8%; display: block;"></div>
                </div>
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

                </div>
            
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
                    <h4 class="modal-title" id="myModalLabel">Export Assets</h4>
                </div>
                <div class="modal-body">
                    <div class="pdf_box_wrapper">
                        <b>Please select file type(s) to export</b>
                        <ul>
                            <li><a href="#" class="pdf_icon" runat="server" onserverclick="btnExportPdf_ServerClick">Pdf(.pdf)</a></li>
                            <li><a href="#" id="btnExcelExport" class="excel_icon" runat="server" onserverclick="btnExcelExport_ServerClick">Excel(.xls)</a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <script>

        $('.left-active-sprites ul > li.graph > a').click(function () {
            setTimeout(function () {
                PiechartCommon();
            }, 50);
        });
    </script>
</asp:Content>
