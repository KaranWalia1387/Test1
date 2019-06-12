<%@ Page Title="Screen Resolution Report" Language="C#" AutoEventWireup="true" CodeBehind="Resolution.aspx.cs" MasterPageFile="~/AdminReports/AdminReport.master" Inherits="AdminPanel.AdminReports.Resolution" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<%@ Register Src="~/UserControl/ChartControl.ascx" TagPrefix="uc1" TagName="ChartControl" %>


<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">

    <script src="../js/Resolution.js"></script>
    <link href="css/main.css" rel="stylesheet" type="text/css">
    <link href="../css/AdminReport_main.css" rel="stylesheet" />
    <script src="../js/loader.js"></script>
    <script type="text/javascript">
        if (typeof (Sys) === 'undefined') throw new Error('ASP.NET Ajax client-side framework failed to load.');
        $(document).ready(function () {
            //var menu='close';
            //$('.sidebar_admin').click(function(){
            //    if(menu=='close')
            //    {
            //        $('resol').show();
            //        //alert('resol show');
            //        menu='open';
            //    }
            //    else
            //    {
            //        $('resol').hide();
            //       // alert('resol hide');
            //        menu='close';
            //    }
            //});
        });
    </script>

    <style>
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

        .jqx-grid-column-header div span {
            height: 40px;
        }

        .export_button {
            background: rgba(0, 0, 0, 0) url("../images/export_icon.png") no-repeat scroll 0 0;
            display: inline-block;
            height: 17px;
            margin-top: 5px;
            width: 20px;
            cursor: pointer;
            margin-left: 0px;
        }



        .filter_button.active {
            background: url(../images/filter_icon_active.png);
            background-repeat: no-repeat;
            height: 16px;
            width: 16px;
            margin-top: 6px;
            display: inline-block;
            cursor: pointer;
        }


        .modal::before {
            content: " ";
            display: inline-block;
            height: 100%;
            vertical-align: middle;
        }

        .current_area > ul > li {
            width: 25% !important;
        }

        .Graph-area {
            float: left;
            width: 100%;
        }

        .grid-section_1 {
            float: left;
            width: 100%;
        }

        .current_area > ul > li > i {
            text-transform: lowercase;
        }
    </style>
    <uc1:jqxGrid runat="server" />
    <script type="text/javascript">
        var attachmentpath = ''
    </script>

    <aside class="">
        
        </asp:ScriptManager>
        <a href="javascript:void(0);" id="button-sidebar" class="button-sidebar ir"></a>

        <script type="text/javascript">

            $(document).ready(function () {

                /* remove the 'title' attribute of all <img /> tags */
                $("img").removeAttr("title");

                // $("#chartDiv").addClass("HEight");

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

            #graphdivarea {
                overflow: hidden;
            }

            .spanheader {
                color: #666666;
                font-size: 12px;
                font-style: normal;
                margin: 0;
                text-align: left;
            }
        </style>

        <style type="text/css">
            .jqx-grid-column-header {
                font-weight: bold;
            }
        </style>

        <input class="activeli_list" value="sidebar_resolution" type="hidden">
        <script type="text/javascript">
            //<![CDATA[
            Sys.WebForms.PageRequestManager._initialize('ctl00$ctl00$ContentPlaceHolder1$rightpanel$ScriptManager', 'form1', [], [], [], 90, 'ctl00$ctl00');
            //]]>t
        </script>
        <!-- Edited by prashant (code added for the heading section and drop down section.) -->
        <asp:HiddenField ID="hdnParamValues" runat="server" ClientIDMode="Static" />
        <div class="top-header-area">
            <div style="float: left; width: 35%;">
                <h2>Screen Resolution</h2>
            </div>
            <div class="filter_area_ui">
                <div class="selection_area select-style" style="display: none;">
                    <asp:DropDownList ID="usagetype" runat="server" ClientIDMode="Static">
                        <asp:ListItem Selected="True" Text="POWER" Value="power">POWER</asp:ListItem>
                        <asp:ListItem Text="WATER" Value="water">WATER</asp:ListItem>
                        <asp:ListItem Text="GAS" Value="gas">GAS</asp:ListItem>
                    </asp:DropDownList>
                </div>
                <div class="right_header_area">
                    <ul>
                        <li><a href="#" data-toggle="modal" data-target="#export_docs_pop" title="Export"><span class="fa fa-external-link icon_color"></span>Export</a></li>
                        <li><a href="#" id="filter_btn_explorer" title="Filter Results"><span class="fa fa-filter icon_color"></span>Filter Results</a></li>
                    </ul>
                </div>
                <%-- <div class="exprt-filtr">
                    <div class="export_button_area">
                        <div class="export_button" data-toggle="modal" data-target="#export_docs_pop"></div>
                    </div>
                    <div class="fliter_button_area">
                        <div class="filter_button" id="filter_btn_explorer"></div>
                    </div>
                </div>--%>
            </div>
        </div>
        <!-- Edited by prashant (code added for the data show) -->
        <div class="filter-section" id="divFilter" style="display: none;">
            <div class="expand-one">
                <p class="filter_section_link" style="display: none;">
                    <img class="imgtoggle" src="../Usage Report_files/a.png">Filter
                </p>
                <div class="content">
                    <div class="input-section">
                        <asp:TextBox ID="txtDateFrom" runat="server" placeholder="From Date" ClientIDMode="Static" Style="width: 90%;" ReadOnly="true" ToolTip="From date "></asp:TextBox>
                        <asp:ImageButton CssClass="icon-cal" ID="btnDateFrom" runat="server" ImageUrl="~/images/Icon-calendar.png" ToolTip="From date" />
                        <ajaxToolkit:CalendarExtender ID="CalendarExtender1" runat="server" TargetControlID="txtDateFrom" PopupPosition="BottomRight"
                            PopupButtonID="btnDateFrom" />
                    </div>
                    <div class="input-section">
                        <asp:TextBox ID="txtDateTo" runat="server" placeholder="To Date" ClientIDMode="Static" Style="width: 90%;" ReadOnly="true" ToolTip="To date"></asp:TextBox>
                        <asp:ImageButton CssClass="icon-cal" ID="btnDateTo" runat="server" ImageUrl="~/images/Icon-calendar.png" ToolTip="To date" />
                        <ajaxToolkit:CalendarExtender ID="CalendarExtender2" runat="server" OnClientDateSelectionChanged="checkDate" TargetControlID="txtDateTo" PopupPosition="BottomRight"
                            PopupButtonID="btnDateTo" />
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
        <div style="display: block;" class="current_area" id="GenDiv">
            <ul>
                <li>
                    <div class="average_usage_header">
                        <asp:Label ID="ResolutionCnt1" ClientIDMode="Static" runat="server"></asp:Label>
                    </div>
                    <span id="Resolution1" class="spanheader"></span>
                </li>
                <li>
                    <div class="average_usage_header">
                        <asp:Label ID="ResolutionCnt2" ClientIDMode="Static" runat="server"></asp:Label>
                    </div>
                    <span id="Resolution2" class="spanheader"></span>
                </li>

                <li>
                    <div class="average_usage_header">
                        <asp:Label ID="ResolutionCnt3" ClientIDMode="Static" runat="server"></asp:Label>
                    </div>
                    <span id="Resolution3" class="spanheader"></span>
                </li>
                <li>
                    <div class="average_usage_header">
                        <asp:Label ID="ResolutionCnt4" ClientIDMode="Static" runat="server"></asp:Label>
                    </div>
                    <span id="Resolution4" class="spanheader"></span>
                </li>
            </ul>
        </div>
        <!-- Edited by prashant (code added for the upper section for data in admin portal.) -->

        <div class="calender_seciton_1">
            <div class="power_graph_heading power_graph_spanish">
                <div class="usage_date_time">
                    <b>
                        <asp:Label ID="lblDateRange" runat="server" ClientIDMode="Static"></asp:Label></b>
                    <span id="divCalender" style="display: none;">
                        <input name="" id="calendericon" src="../images/Icon-Calendar.png" style="vertical-align: middle; margin-top: -4px; display: none;" type="image">
                    </span>
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
        <div id="nodata_div" style="width: 98%; text-align: center; color: Red; display: none;">No Screen Resolution Data available </div>
        <!-- Edited by prashant ends (code edited for graph & grid section here ) -->
        <div class="grid-section" style="padding-top: 0px; width: 100%">


            <%--  <div class="grid_main_box" id="">
                    <img src="images/connectme-graph.png" class="img-resp" style="display: none;">
                </div>
                <div id="div-ConnectMechart" class="outage_chart" style="width: 98%"></div>--%>
            <div class="grid_main_box">
                <div id="chartDiv" class="Chart-area" style="position: relative; float: left; width: 99.8%; display: block;"></div>
            </div>
            <div class="grid-section" style="padding-top: 0px; width: 100%;">
                <div id="graphDiv" class="Graph-area">
                    <div class="grid_main_box">
                        <div id="jqxgrid" class="jqgrid">
                        </div>
                        <%--  <div id="jqxchildgrid" style="display: none;" class="jqgrid">
                        </div>--%>
                    </div>
                </div>
            </div>
        </div>
        <!-- div for table grid layout starts -->

        <!-- div for table grid layout starts -->

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
                                <li><a class="pdf_icon" id="pdf" runat="server" onserverclick="pdf_ServerClick">Pdf(.pdf)</a></li>
                                <li><a id="btnExcelExport" class="excel_icon" runat="server" onserverclick="btnExcelExport_ServerClick">Excel(.xls)</a></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <!-- End Popup -->
    </aside>

    <script>

        $('.left-active-sprites ul > li.graph > a').click(function () {
            setTimeout(function () {
                LoadChart();
            }, 300);
        });
    </script>
</asp:Content>
