<%@ Page Title="Dashboard : Login Details" Language="C#" MasterPageFile="~/AdminReports/AdminReport.master" AutoEventWireup="true" CodeBehind="HeatMapSample.aspx.cs" Inherits="AdminPanel.HeatMapSample" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<%@ Register Src="~/UserControl/ChartControl.ascx" TagPrefix="uc1" TagName="ChartControl" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <script src="../js/HeatMapSample.js"></script>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="../css/main.css" rel="stylesheet" type="text/css">
    <link href="../css/AdminReport_main.css" rel="stylesheet" />
    <link href="../Usage%20Report_files/bootstrap.css" rel="stylesheet" type="text/css">

    <script src="../js/jqxGrid/jqxcore.js" type="text/javascript"></script>
    <script src="../js/jqxGrid/jqxscrollbar.js" type="text/javascript"></script>
    <script src="../js/jqxGrid/jqxbuttons.js" type="text/javascript"></script>
    <script src="../js/jqxGrid/jqxmenu.js" type="text/javascript"></script>
    <script src="../js/jqxGrid/jqxgrid.js" type="text/javascript"></script>
    <script src="../js/jqxGrid/jqxdata.js" type="text/javascript"></script>
    <script src="../js/jqxGrid/jqxgrid.pager.js" type="text/javascript"></script>
    <script src="../js/jqxGrid/jqxgrid.selection.js" type="text/javascript"></script>
    <script src="../js/jqxGrid/jqxgrid.sort.js" type="text/javascript"></script>
    <script src="../js/jqxGrid/jqxgrid.columnsreorder.js" type="text/javascript"></script>
    <script src="../js/jqxGrid/jqxgrid.columnsresize.js" type="text/javascript"></script>
    <script src="../js/jqxGrid/jqxdata.export.js" type="text/javascript"></script>
    <script src="../js/jqxGrid/jqxgrid.storage.js" type="text/javascript"></script>
    <script src="../js/jqxGrid/jqxgrid.aggregates.js" type="text/javascript"></script>
    <script src="../js/jqxGrid/jqxgrid.edit.js" type="text/javascript"></script>
    <script src="../js/jqxGrid/jqxgrid.export.js" type="text/javascript"></script>
    <script src="../js/jqxGrid/jqxgrid.filter.js" type="text/javascript"></script>
    <script src="../js/jqxGrid/jqxdropdownlist.js" type="text/javascript"></script>
    <script src="../js/jqxGrid/jqxlistbox.js" type="text/javascript"></script>
    <script src="../js/jqxGrid/jqxchart.js" type="text/javascript"></script>
    <link href="../js/jqxGrid/jqx.base.css" rel="stylesheet" type="text/css" />
    <link href="../js/jqxGrid/jqx.darkblue.css" rel="stylesheet" type="text/css" />
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

            /* Usage page filter */
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

    <style type="text/css">
        a.menu-mavigation:hover {
            text-decoration: none;
            outline: 0;
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

        #collapseOne li a, .in li a {
            cursor: pointer;
        }

        footer .copy-right {
            font-size: 10px;
            margin: 7px 0 0;
            padding: 0;
            text-align: left;
        }

        a {
            color: #337ab7;
            text-decoration: none;
        }

        .jqx-grid-column-header {
            font-weight: bold;
        }
    </style>

    <uc1:jqxGrid runat="server" />
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
        <style type="text/css">
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

           

            #divFilter .content {
                margin-bottom:2px;
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

            .filterBtn {
                border: medium none;
                border-radius: 3px;
                color: #ffffff;
                display: block;
                height: auto;
                padding: 7px 25px;
                width: auto;
            }

            .current_area > ul > li {
                width: 25%;
            }

            .jqx-grid-column-header {
                font-weight: bold;
            }
        </style>

        
        </asp:ScriptManager>
        <input class="activeli_list" value="sidebar_heat" type="hidden">
        <asp:HiddenField ID="hdnParamValues" runat="server" ClientIDMode="Static" />
        <!-- Edited by prashant (code added for the heading section and drop down section.) -->
        <div class="top-header-area">
            <div style="float: left; width: 35%;">
                <h2>Login Details</h2>
            </div>
            <div class="right_header_area">
                    <ul>
                        <li><a href="#" data-toggle="modal" data-target="#export_docs_pop" title="Export"><span class="fa fa-external-link icon_color"></span> Export</a></li>                                     
                        <li><a href="#"  id="filter_btn_explorer" title="Filter Results"><span class="fa fa-filter icon_color"></span>   Filter Results</a></li>
                    </ul>
                </div>
           <%-- <div class="main">
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

        <!-- Edited by prashant (code added for the data show) -->
        <div class="filter-section" id="divFilter" style="display: none;">
            <div class="expand-one">
                <p class="filter_section_link" style="display: none;">
                    <img class="imgtoggle" src="Usage%20Report_files/a.png">Filter
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
                            <option selected="selected" value="">Account Type</option>
                            <option value="1">Residential</option>
                            <option value="2">C&amp;I</option>
                        </select>
                    </div>
                    <div class="input-section" style="width: auto  !important; float: right; margin: 5px 20px;">
                        <input name="ctl00$ctl00$ContentPlaceHolder1$rightpanel$btnFilter" value="Filter Results" onclick="return false;" id="btnFilter" title="Search" class="filterBtn" style="margin: 0px;" type="submit">
                    </div>
                </div>
            </div>
        </div>
        <div style= width: 100%;" class="current_area" id="GenDiv">
            <ul>

                <li style="width: 50%;">
                    <div class="average_usage_header">
                        <span>
                              <asp:Label ID="lblLoginUser" runat="server" ClientIDMode="Static"></asp:Label>
                        </span>

                    </div>
                    <i>Number of Logins</i>
                </li>

                <li style="width: 50%;">
                    <div class="average_usage_header">
                        <span>
                          

                            <asp:Label ID="lblTotalUsers" runat="server" ClientIDMode="Static"></asp:Label>
                        </span>
                    </div>
                    <i>Total Users</i>
                </li>
               <%-- <li style="width: 33%;" >
                    <div class="average_usage_header">
                        <span>
                            <asp:Label ID="lblTotal" runat="server" ClientIDMode="Static"></asp:Label>
                        </span>
                    </div>
                    <i>TOTAL REBATES</i>
                </li>--%>
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
                    <%--<span id="divCalender">
                    <input name="" id="" src="..\Usage%20Report_files\Icon-Calendar.png" style="vertical-align: middle; margin-top: -4px;" type="image">
                </span>--%>
                </div>
                <div class="lgnd_box_right">
                    <div class="left-active-sprites">
                        <ul>
                            <li class="chart"><a href="#" id="chart_pop" onclick="switchview('graphDiv','chartDiv');"></a></li>
                            <li class="graph line_grph_css"><a href="#" id="graph_pop" title="Chart view" onclick="switchview('chartDiv','graphDiv');" class="active"></a></li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>

        <!-- Edited by prashant ends (code edited for graph & grid section here ) -->
        <div class="grid-section" style="padding-top: 0px; width: 100%">
            <div style="display: block;" id="graphdivarea" class="Graph-area">
                <div class="low_usage_box legends_area">
                    <div>
                        <%--<span class="GraphLegend_low"></span>
                        <span class="GraphLegend_data_low" globalize="ML_Usage_Lbl_LowUsage">APPROVED ENROLLMENT</span>
                        <span class="GraphLegend_Avg"></span>
                        <span class="GraphLegend_data_low" globalize="ML_Usage_Lbl_AverageUsage">PENDING ENROLLMENT</span>--%>
                    </div>
                </div>

                <div class="grid_main_box" id="">
                    <img src="images/connectme-graph.png" class="img-resp" style="display: none;">
                </div>
                <div id="chartDiv" class="Chart-area" style="width: 98%; height: 95%;">
                </div>

            </div>
        </div>
        <div id="nodata_div" style="width: 100%; text-align: center; color: Red; display: none;" visible="false">No User Login Data available</div>
        <!-- div for table grid layout starts -->
        <!-- div for table grid layout starts -->
     <div class="grid_main_box" style="float: left;width: 100%;">
           <div id="tabledivarea" class="Chart-area HEight" style="position: relative; float: left; width: 100%;">
            <div id="graphDiv" class="Graph-area" style="width: 100%">
                    <div id="jqxgrid" class="jqgrid">
                    </div>
                    <div id="jqxchildgrid" style="display: none;" class="jqgrid">
                    </div>
                </div>
        </div>
    </div>
        <!-- div for table grid layout starts -->
        <!-- div for table grid layout starts -->
        <div id="PopupAddTopic" style="display: none; background-color: White; width: 700px; padding-bottom: 8px; border: 1px solid #008ddd;"></div>
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
        <!-- End Popup -->
    <//div>

      <script>

          $('.left-active-sprites ul > li.graph > a').click(function () {
              setTimeout(function () {
                  FillChartData();
              }, 300);
          });
    </script>
</asp:Content>
