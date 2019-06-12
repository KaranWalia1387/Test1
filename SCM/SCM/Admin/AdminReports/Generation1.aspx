<%@ Page Title="Solar Report" Language="C#" AutoEventWireup="true" CodeBehind="Generation1.aspx.cs" MasterPageFile="~/AdminReports/AdminReport.master" Inherits="AdminPanel.AdminReports.Generation1" %>


<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<%@ Register Src="~/UserControl/ChartControl.ascx" TagPrefix="uc1" TagName="ChartControl" %>


<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    
    <script src="../js/generation-report.js"></script>


    <script type="text/javascript">
        if (typeof (Sys) === 'undefined') throw new Error('ASP.NET Ajax client-side framework failed to load.');


    </script>

    <style>
        .ajax__calendar_container {
            width: 190px !important;
        }

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

        .current_area > ul > li {
            width: 50%;
        }

        .modal::before {
            content: " ";
            display: inline-block;
            height: 100%;
            vertical-align: middle;
        }
    </style>

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

                $("#chartDiv").addClass("HEight");



                $("#ddlCity").change(function (i, obj) {
                    if (!($('#ddlCity').val() == null || $('#ddlCity').val() == '')) {
                        var ddlCity = $('#ddlCity option:selected');
                        $('#hdnCity').val($(ddlCity).val());
                    }
                });


                $('.left-active-sprites ul li').on('click', 'a', function () {

                    //if($('#nodata_div'))

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

                //$('#filter_btn_explorer').click(function () {
                //    $(this).toggleClass('active');
                //    $('#divFilter').toggle();
                //});
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

        <uc1:jqxGrid runat="server" />

        <style type="text/css">
            .jqx-grid-column-header {
                font-weight: bold;
            }
        </style>
        <input class="activeli_list" value="sidebar_generation" type="hidden">

        <script type="text/javascript">
            //<![CDATA[
            Sys.WebForms.PageRequestManager._initialize('ctl00$ctl00$ContentPlaceHolder1$rightpanel$ScriptManager', 'form1', [], [], [], 90, 'ctl00$ctl00');
            //]]>
        </script>
        <!-- Edited by prashant (code added for the heading section and drop down section.) -->
        <asp:HiddenField ID="hdnParamValues" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="hf_dollr_kwh" runat="server" ClientIDMode="Static" />
        <div class="top-header-area">
            <div style="float: left; width: 35%;">
                <h2>Solar</h2>
            </div>
            <div class="filter_area_ui" style="width: auto;">
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
                        <ajaxToolkit:CalendarExtender ID="CalendarExtender1" runat="server" OnClientDateSelectionChanged="checkDate" TargetControlID="txtDateFrom" PopupPosition="BottomRight"
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
                            <option selected="selected" value="">--Account Type--</option>
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
                        <asp:Label ID="lblActualUsage" ClientIDMode="Static" runat="server"></asp:Label><img src="../images/arrow_down_img.png" style="display: none;">
                    </div>
                    <i>Actual Generation</i>
                </li>

                <li>
                    <div class="average_usage_header">
                        <asp:Label ID="lblProjectedUsage" ClientIDMode="Static" runat="server"></asp:Label><%--<span>$89.86</span>--%><img src="../images/arrow_up_img.png" style="display: none;">
                    </div>
                    <i>Projected Generation</i>
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
                    <%--   Bug id 16834--%>
                    <div class="right_unit_box" style="float: left; text-align: right; width: 75%;">
                        <span id="DollarVal"><a href="#" id="dollar">$</a> &nbsp;&nbsp; </span>
                        <div id="power_unit" style="float: right;">
                            <span id="KwhVal"><a href="#" id="Kwh">kWh</a></span>
                        </div>
                    </div>

                    <div class="left-active-sprites">
                        <ul>
                            <li class="chart" id="gridVw"><a href="#"></a></li>
                            <li class="graph line_grph_css" id="chartView"><a href="#" class="active"></a></li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
      

        <div id="nodata_div" style="width: 100%; text-align: center; vertical-align: top; display: none"></div>
        <div class="grid-section" style="padding-top: 0px; width: 100%;">
            <div id="graphDiv" class="Graph-area" style="display: none;">
                <div class="grid_main_box">
                    <div id="jqxgrid" class="jqgrid">
                    </div>
                    <div id="jqxchildgrid" style="display: none;" class="jqgrid">
                    </div>
                </div>
            </div>

            <div class="grid_main_box">
                <div id="notifytitle" visible="true"></div>
              
                <div id="chartDiv" class="Chart-area" style="position: relative; float: left; width: 99.8%; display: block;">
                 
                </div>
        </div>
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
                                <li><a class="pdf_icon" id="pdf" runat="server" onserverclick="pdf_ServerClick">Pdf(.pdf)</a></li>
                                <li><a href="#" class="excel_icon" id="A1" runat="server" onserverclick="btnExcelExport_ServerClick">Excel(.xls)</a></li>
                                <%--<li><a id="btnExcelExport" class="excel_icon">Excel(.xls)</a></li>--%>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <!-- End Popup -->
    </aside>
</asp:Content>
