<%@ Page Title="Report Dashboard" Language="C#" MasterPageFile="~/AdminReports/AdminReport.master" AutoEventWireup="true" CodeBehind="Dashboard.aspx.cs" Inherits="AdminPanel.Dashboard" %>

<%@ Import Namespace="AdminPanel" %>

<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <uc1:jqxGrid ID="JqxGrid1" runat="server" />
    <input type="hidden" class="activeli_list" value="sidebar_dashboard" />
    <script type="text/javascript" src="../js/detect-zoom.js"></script>
    <style>
        .inner_uni1 {
            height: 96% !important;
        }

        .inner_uni2 {
            height: 94% !important;
        }

        .inner_uni3 {
            height: 92% !important;
        }

        .inner_uni4 {
            height: 95% !important;
        }

        .inner-dashboard-area ul li h3 {
            margin: 0 0 -4px;
        }

        .PreLoader {
            background: url('../images/loader.gif') no-repeat center center;
            background-attachment: inherit;
            top: 0px;
            color: white;
            opacity: 0.7;
            z-index: 99999999;
            /*height:205px;
            width:412px;*/
        }

        .inner-right-section {
            background: #fff none repeat scroll 0 0;
            box-shadow: 0 0 4px #cfcfcf;
            height: auto;
            margin: 15px 15px 0;
            overflow: auto;
        }

        .right-side {
            float: right;
            height: 100%;
            position: relative;
        }

        .inner-mid-container {
            height: 100%;
        }

        .inner-right-section .right-content-area {
            height: 100%;
            padding: 0;
        }



        .modal-header {
            border-bottom: 1px solid #e5e5e5;
            min-height: 16.43px;
            padding: 7px 15px !important;
        }

        .modal-body {
            padding: 0 0px !important;
            position: relative;
        }

        .chart-area-pop {
            border-top: 1px solid #ccc;
            clear: both;
            width: 100%;
            padding: 10px;
        }


        .modal-header .close {
            font-size: 45px;
            font-weight: normal;
            margin-top: -8px;
        }

        .modal {
            text-align: center;
        }

            .modal:before {
                display: inline-block;
                vertical-align: middle;
                content: " ";
                height: 100%;
            }

        .modal-dialog {
            display: inline-block;
            text-align: left;
            vertical-align: middle;
        }

        .modal.fade .modal-dialog {
            -webkit-transform: scale(0.9);
            -moz-transform: scale(0.9);
            -ms-transform: scale(0.9);
            transform: scale(0.9);
            opacity: 0;
            -webkit-transition: all 0.3s ease;
            -moz-transition: all 0.3s ease;
            transition: all 0.3s ease;
        }

        .modal.fade.in .modal-dialog {
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -ms-transform: scale(1);
            transform: scale(1);
            /* -webkit-transform: translate3d(0, -300px, 0);
    transform: translate3d(0, -300px, 0); */
            opacity: 1;
        }



        @media (min-width:1100px) and (max-width:1380px) {
            .inner-right-section {
                background: #fff none repeat scroll 0 0;
                box-shadow: 0 0 4px #cfcfcf;
                height: 98% !important;
                margin: 15px 15px 0;
                overflow: auto;
            }
        }
        /* Edited by prashant */
        .inner-right-section .grid-section {
            float: left;
            height: auto !important;
            position: relative;
            width: 100%;
        }

        #expand_popup_view {
            background-color: #ffffff;
            display: none;
            z-index: 9999999;
        }

        #expand_popup_view {
            float: left;
            left: 15px;
            position: absolute;
            right: 0;
            top: 15px;
            width: 100%;
        }

        .showring {
            display: block !important;
        }

        #popup_views > ul > li {
            border: 0 solid #ffffff;
            height: 32px;
            margin: 0 !important;
            width: 100% !important;
        }

        #popup_views {
            background-color: #ffffff;
            float: left;
            width: 100%;
        }

        .data-viewer-popup {
            float: left;
            width: 100%;
            height: 400px;
            border: solid 0px #cfcfcf;
            padding: 5px 10px;
        }

        .altrnte {
            height: 100%;
        }

        @media (min-width:1100px) and (max-width:1380px) {
            .inner-right-section {
                background: #fff none repeat scroll 0 0;
                box-shadow: 0 0 4px #cfcfcf;
                height: 98% !important;
                margin: 15px 15px 0;
                overflow: auto;
            }
        }

        @media (min-width:1381px) and (max-width:3500px) {
            #devices.inner-right-section {
                height: 98.5% !important;
            }
        }
        /* Edited by prashant */

        .inner-dashboard-area .fa {
            font-size: 20px;
            float: left;
            margin-right: 10px;
            color: #22ADC8;
            margin-top: -2px;
        }

        .select-style.usage_box1 {
            background-color: #fff;
            width: 104px;
            float: right;
            margin-right: 33%;
            padding: 2px 3px;
            margin-top: -3px;
        }

        .dailyusage {
            background-color: #fff;
            width: 104px;
            float: right;
            margin-right: 33%;
            padding: 2px 3px;
            margin-top: -3px;
        }

        text.highcharts-yaxis-title {
            font-family: MyriadPro-Regular;
        }
    </style>
    <script type="text/javascript">
        function refresh() {
            try {
                //var zoom = $('#zoom');
                var device = $('#devices');
                //zoom.text(window.detectZoom.zoom().toFixed(2));
                //device.text(window.detectZoom.device().toFixed(2));
                if ((window.detectZoom.device().toFixed(1) >= 1.09) && (window.detectZoom.device().toFixed(1) < 1.20)) {
                    $("#devices").addClass('inner_uni1');
                    $("#devices").removeClass('inner_uni2');
                    $("#devices").removeClass('inner_uni3');
                    $("#devices").removeClass('inner_uni4');
                }
                else if ((window.detectZoom.device().toFixed(1) >= 1.20) && (window.detectZoom.device().toFixed(1) < 1.30)) {
                    $("#devices").addClass('inner_uni2');
                    $("#devices").removeClass('inner_uni1');
                    $("#devices").removeClass('inner_uni3');
                    $("#devices").removeClass('inner_uni4');
                }
                else if ((window.detectZoom.device().toFixed(1) >= 1.30) && (window.detectZoom.device().toFixed(1) < 1.50)) {
                    $("#devices").addClass('inner_uni3');
                    $("#devices").removeClass('inner_uni1');
                    $("#devices").removeClass('inner_uni2');
                    $("#devices").removeClass('inner_uni4');
                }
                else if ((window.detectZoom.device().toFixed(1) >= 1.50) && (window.detectZoom.device().toFixed(1) < 1.70)) {
                    $("#devices").addClass('inner_uni4');
                    $("#devices").removeClass('inner_uni1');
                    $("#devices").removeClass('inner_uni2');
                    $("#devices").removeClass('inner_uni3');
                }
                else {
                    $("#devices").removeClass('inner_uni1');
                    $("#devices").removeClass('inner_uni2');
                    $("#devices").removeClass('inner_uni3');
                    $("#devices").removeClass('inner_uni4');
                }
            }
            catch (e) {
                console.log(e.message);
            }

        }
        $(document).ready(function () {
            try {
                var list = document.getElementById('usagetype');
                var listinner = document.getElementById('usagetypeinner');
                var newListItem = document.createElement('OPTION');
                newListItem.text = "Power";
                newListItem.value = "P";
                list.add(newListItem);

                newListItem = document.createElement('OPTION');
                newListItem.text = "Gas";
                newListItem.value = "G";
                list.add(newListItem);

                newListItem = document.createElement('OPTION');
                newListItem.text = "Water";
                newListItem.value = "W";
                list.add(newListItem);

                var newListItem1 = document.createElement('OPTION');
                newListItem1.text = "Power";
                newListItem1.value = "P";
                listinner.add(newListItem1);

                newListItem1 = document.createElement('OPTION');
                newListItem1.text = "Gas";
                newListItem1.value = "G";
                listinner.add(newListItem1);

                newListItem1 = document.createElement('OPTION');
                newListItem1.text = "Water";
                newListItem1.value = "W";
                listinner.add(newListItem1);

            <% if (SessionAccessor.IsModuleEnabled(Features.Power, false) == false)
               { %>
                $("#usagetype option[value='P']").remove();
                $("#usagetypeinner option[value='P']").remove();

                <% }%>
            <% if (SessionAccessor.IsModuleEnabled(Features.Gas, false) == false)
               { %>
                $("#usagetype option[value='G']").remove();
                $("#usagetypeinner option[value='G']").remove();

                <% }%>
            <% if (SessionAccessor.IsModuleEnabled(Features.Water, false) == false)
               { %>
                $("#usagetype option[value='W']").remove();
                $("#usagetypeinner option[value='W']").remove();

                <% }%>
            }
            catch (e) {
                loader.hideloader();
                console.log(e.message);
            }
            refresh();
            $(window).on('resize', refresh);



        });

    </script>
    <script src="../js/dashboard.js"></script>
    <div class="top-header-area">
        <h2>Dashboard</h2>
    </div>
    <div class="grid-section">
        <div id="altrnte">
            <div class="inner-dashboard-area pie_ico_dash" id="devices">
                <ul>
                    <% if (SessionAccessor.UserRightList.Contains(UserRights.ReportOutageAccess))
                       { %>
                    <div style="display: <%=SessionAccessor.IsModuleEnabled(Features.Outages) %>">
                        <li runat="server" id="Module0">
                            <h3><a href="outage.aspx">
                                <i class="fa fa-warning"></i>Outages</a>
                                <div class="left-active-sprite">
                                    <ul>
                                        <li class="chart"><a href="#" onclick="switchview('gridoutage','outageschart');" title="List view"></a></li>
                                        <li class="graph"><a href="#" onclick="switchview('outageschart','gridoutage');" title="Chart view" class="active"></a></li>
                                        <li>
                                            <img src="../images/expand-icon.png" class="popup_img expander_btn hide_for_flat_ico" id="expand_outage" title="Full image view" />
                                            <span id="expand_outage" class="popup_img expander_btn flat_ico_admin icon-admin-expand" title="Full image view"></span>
                                        </li>
                                    </ul>
                                </div>
                            </h3>
                            <div class="PreLoader" id="divoutage" style="height: 205px; display: <%=SessionAccessor.IsModuleEnabled(Features.Outages) %>">
                                <div id="outageLoader" style="display: none;">
                                    <div id="outageschart" class="dashboardchart" style="width: 100%;"></div>
                                    <div id="gridoutage" class="jqgrid" style="display: none; border: 0;"></div>
                                </div>
                            </div>
                        </li>
                    </div>
                    <% }
                       if (SessionAccessor.UserRightList.Contains(UserRights.ReportUsageAccess))
                       { %>

                    <div style="display: <%=SessionAccessor.IsModuleEnabled(Features.Usage) %>">
                        <li id="Module1" runat="server">
                            <h3><a href="Usage1.aspx">
                                <i class="fa fa-signal"></i><%-- <img src="../images/icon_usage_sidebar.png" class="dash_heading_img" />--%>Usage</a>

                                <div class="selection_area select-style usage_box1">
                                    <asp:DropDownList ID="usagetype" runat="server" ClientIDMode="Static" Style="margin-top: -2px;">
                                        <%--        <asp:ListItem Text="POWER" Value="power">POWER</asp:ListItem>
                                    <asp:ListItem Text="WATER" Value="water">WATER</asp:ListItem>
                                    <asp:ListItem Text="GAS" Value="gas">GAS</asp:ListItem>--%>
                                    </asp:DropDownList>

                                </div>
                                <div class="left-active-sprite" id="div_usage_expand">
                                    <ul>
                                        <li class="chart"><a href="#" onclick="switchview('gridusage','usagechart');" title="List view"></a></li>
                                        <li class="graph"><a href="#" onclick="switchview('usagechart','gridusage');" title="Chart view" class="active"></a></li>
                                        <li>
                                            <img src="../images/expand-icon.png" class="popup_img expander_btn hide_for_flat_ico" id="expand_usage" title="Full image view" />
                                            <span id="expand_usage" class="popup_img expander_btn flat_ico_admin icon-admin-expand" title="Full image view"></span>
                                        </li>

                                    </ul>
                                </div>
                            </h3>
                            <div class="PreLoader" id="divusage" style="height: 205px;">
                                <div id="usageLoader" style="display: none;">
                                    <div id="usagechart" class="dashboardchart"></div>
                                    <div id="gridusage" class="jqgrid" style="display: none; border: 0;"></div>
                                    <div id="NoDataDiv"><span style="text-align: center; color: #f00; padding: 20px 0px; display: block;">No Data Available</span> </div>

                                </div>
                            </div>
                        </li>
                    </div>
                    <% } if (SessionAccessor.UserRightList.Contains(UserRights.ReportSolarAccess))
                       { %>

                    <div style="display: <%=SessionAccessor.IsModuleEnabled(Features.Solar) %>">
                        <li id="Module2" runat="server" visible="false">
                            <h3><a href="Generation1.aspx">
                                <i class="fa fa-sun-o"></i>Solar</a>
                                <div class="left-active-sprite">
                                    <ul>
                                        <li class="chart"><a href="#" onclick="switchview('gridgeneration','generationchart');" title="List view"></a></li>
                                        <li class="graph"><a href="#" onclick="switchview('generationchart','gridgeneration');" class="active" title="Chart view"></a></li>
                                        <li>
                                            <img src="../images/expand-icon.png" class="popup_img expander_btn hide_for_flat_ico" id="expand_solar" title="Full image view" />
                                            <span id="expand_solar" class="popup_img expander_btn flat_ico_admin icon-admin-expand" title="Full image view"></span>

                                        </li>
                                    </ul>
                                </div>
                            </h3>
                            <div class="PreLoader" id="divsolar" style="height: 205px;">
                                <div id="solarLoader" style="display: none;">
                                    <div id="generationchart" class="dashboardchart"></div>
                                    <div id="gridgeneration" class="jqgrid" style="display: none; border: 0;"></div>
                                </div>
                            </div>
                        </li>
                    </div>

                    <% }
                       if (SessionAccessor.scmexpress != "1")
                       {
                           if (SessionAccessor.UserRightList.Contains(UserRights.ReportServiceAccess))
                           { %>
                    <div style="display: <%=SessionAccessor.IsModuleEnabled(Features.Services) %>">
                        <li id="Module3" runat="server" visible="false">
                            <h3><a href="Servicesample.aspx">
                                <i class="fa fa-wrench"></i><%--<img src="../images/icon_service_sidebar.png" class="dash_heading_img" />--%>Service</a>
                                <div class="left-active-sprite">
                                    <ul>
                                        <li class="chart"><a href="#" onclick="switchview('gridservice','servicechart');" title="List view"></a></li>
                                        <li class="pie"><a href="#" onclick="switchview('servicechart','gridservice');" class="active" title="Chart view"></a></li>
                                        <li>
                                            <img src="../images/expand-icon.png" class="popup_img expander_btn hide_for_flat_ico" id="expand_service" title="Full image view" />
                                            <span id="expand_service" class="popup_img expander_btn flat_ico_admin icon-admin-expand" title="Full image view"></span>
                                        </li>
                                    </ul>

                                </div>
                            </h3>
                            <div class="PreLoader" id="divservice" style="height: 205px;">
                                <div id="serviceLoader" style="display: none;">
                                    <div id="servicechart" class="dashboardchart"></div>
                                    <div id="gridservice" class="jqgrid" style="display: none; border: 0;"></div>
                                </div>
                            </div>
                        </li>
                    </div>
                    <% }
                       } %>
                    <%   if ((SessionAccessor.scmexpress != "1") && (SessionAccessor.UserRightList.Contains(UserRights.ReportElectricVehicleAccess)))
                         {%>
                    <div style="display: <%=SessionAccessor.IsModuleEnabled(Features.EV) %>">
                        <li id="Module4" runat="server" visible="false">
                            <h3><a href="#" style="width: 30%;">
                                <img src="../images/icon-ev-dashboard.png" class="dash_heading_img" />
                                <span class="flat_ico_admin icon-admin-ev"></span>
                                Electric Vehicle </a>
                                <div class="left-active-sprite">
                                    <ul>
                                        <li class="chart"><a href="#" onclick="switchview('gridEV','EVchart');"></a></li>
                                        <li class="pie"><a href="#" onclick="switchview('EVchart','gridEV');" class="active"></a></li>
                                        <li>
                                            <img src="../images/expand-icon.png" class="popup_img expander_btn hide_for_flat_ico" id="expand_electric_vehicle" />
                                            <span id="expand_electric_vehicle" class="popup_img expander_btn flat_ico_admin icon-admin-expand" title="Full image view"></span>

                                        </li>

                                    </ul>
                                </div>
                            </h3>
                            <div class="PreLoader" id="divEV" style="height: 205px;">
                                <div id="EVLoader" style="display: none;">
                                    <div id="EVchart" class="dashboardchart" style="height: 203px;"></div>
                                    <div id="gridEV" class="jqgrid" style="display: none; border: 0;"></div>
                                </div>
                            </div>
                        </li>
                    </div>
                    <%}%>
                    <% if (SessionAccessor.UserRightList.Contains(UserRights.ReportUserAccess))
                       { %>

                    <li id="Module5" runat="server" visible="false">
                        <h3><a href="User.aspx">
                            <i class="fa fa-user"></i>Customers</a>
                            <div class="left-active-sprite">
                                <ul>
                                    <li class="chart"><a href="#" onclick="switchview('griduser','statuschart');" title="List view"></a></li>
                                    <li class="pie"><a href="#" onclick="switchview('statuschart','griduser');" title="Chart view" class="active"></a></li>
                                    <li>
                                        <img src="../images/expand-icon.png" class="popup_img expander_btn hide_for_flat_ico" id="expand_user" />
                                        <span id="expand_user" class="popup_img expander_btn flat_ico_admin icon-admin-expand" title="Full image view"></span>
                                    </li>
                                </ul>
                            </div>
                        </h3>
                        <div class="PreLoader" id="divUser" style="height: 205px;">
                            <div id="UserLoader" style="display: none;">
                                <div id="statuschart" class="dashboardchart"></div>
                                <div id="griduser" class="jqgrid" style="display: none; border: 0;"></div>
                            </div>
                        </div>
                    </li>

                    <% } if (SessionAccessor.UserRightList.Contains(UserRights.ReportEfficiencyAccess))
                       { %>
                    <div style="display: <%=SessionAccessor.IsModuleEnabled(Features.Efficiency) %>">
                        <li id="Module6" runat="server" visible="false">
                            <h3 class="effi_ico1"><a href="Efficiencysample.aspx" style="width: 30%;">
                                <img src="../images/icon_efficiency_sidebar.png" class="dash_heading_img" />
                                <span class="flat_ico_admin icon-admin-efficiency"></span>Efficiency</a>

                                <div class="left-active-sprite">
                                    <ul>
                                        <li class="chart"><a href="#" onclick="switchview('gridEE','energyEffChart');" title="List view"></a></li>
                                        <li class="pie"><a href="#" onclick="switchview('energyEffChart','gridEE');" title="Chart view" class="active"></a></li>
                                        <li>
                                            <img src="../images/expand-icon.png" class="popup_img expander_btn hide_for_flat_ico" id="expand_efficency" />
                                            <span id="expand_efficency" class="popup_img expander_btn flat_ico_admin icon-admin-expand" title="Full image view"></span>
                                        </li>
                                    </ul>
                                </div>
                            </h3>
                            <div class="PreLoader" id="divEfficiency" style="height: 205px;">
                                <div id="EfficiencyLoader" style="display: none;">
                                    <div id="energyEffChart" class="dashboardchart"></div>
                                    <div id="gridEE" class="jqgrid" style="display: none; border: 0;">
                                    </div>
                                </div>
                            </div>
                        </li>
                    </div>
                    <% }
                       if (SessionAccessor.UserRightList.Contains(UserRights.ReportUsageAccess))
                       { %>
                    <li id="Module7" runat="server" visible="false">
                        <h3><a href="Usage1.aspx">
                            <i class="fa fa-signal"></i><%-- <img src="../images/icon_usage_sidebar.png" class="dash_heading_img" />--%>Daily Usage</a>
                            <div class="selection_area dailyusage">
                                POWER

                            </div>
                            <div class="left-active-sprite">
                                <ul>
                                    <li class="chart"><a href="#" onclick="switchview('gridDailyUsage','usageChartDash');" title="List view"></a></li>
                                    <li class="pie"><a href="#" onclick="switchview('usageChartDash','gridDailyUsage');" class="active" title="Chart view"></a></li>
                                    <li>
                                        <img src="../images/expand-icon.png" class="popup_img expander_btn hide_for_flat_ico" id="expand_daily_usage" />
                                        <span id="expand_daily_usage" class="popup_img expander_btn flat_ico_admin icon-admin-expand" title="Full image view"></span>
                                    </li>
                                </ul>
                            </div>
                        </h3>
                        <div class="PreLoader" id="divDailyUsage" style="height: 205px;">
                            <div id="DailyUsageLoader" style="display: none;">
                                <div id="usageChartDash" class="dashboardchart"></div>
                                <div id="gridDailyUsage" class="jqgrid" style="display: none; border: 0;">
                                </div>
                            </div>
                        </div>
                    </li>
                    <% } %>
                </ul>
            </div>
        </div>
        <!-- Edited by prashant -->


        <!-- Edited by prashant -->

        <%--<div id="cloneddiv" style="width: 500px; height: 500px"> </div>--%>
    </div>

    <div class="pop_view inner-dashboard-area pie_ico_dash" id="expand_popup_view" style="width: 96.7% !important; overflow: hidden; height: 95% !important;">
        <div id="popup_views" class="">
            <ul>
                <li runat="server" visible="true" id="Li1">
                    <h3><a href="#" id="a_expander">
                        <i class="fa fa-warning"></i><%--<img src="../images/icon_outage_sidebar.png" class="dash_heading_img" />--%>Outage</a>
                        <div id="divusagetype" class="selection_area select-style usage_box1">
                            <asp:DropDownList ID="usagetypeinner" runat="server" ClientIDMode="Static" Style="margin-top: -2px;">
                            </asp:DropDownList>

                        </div>
                        <div class="left-active-sprite">
                            <ul class="popup_listener">
                                <li class="chart"><a href="#" id="chart_pop" onclick="switchview('grid-viewer-popup','data-viewer-popup','popup');"></a></li>
                                <li class="graph" id="li_graph"><a href="#" id="graph_pop" title="Chart view" onclick="switchview('data-viewer-popup','grid-viewer-popup','popup');" class="active"></a></li>
                                <li>
                                    <img src="../images/collapse-icon.png" class="popup_img" id="close_graph" />
                                    <%-- <span id="close_graph" class="popup_img flat_ico_admin icon-admin-contract"></span>--%>
                                </li>
                            </ul>
                        </div>
                    </h3>
                </li>
            </ul>

            <div id="data-viewer-popup" class="data-viewer-popup" style="width: 860px !important; display: none;"></div>
            <div id="grid-viewer-popup" class="jqgrid" style="display: none; border: 0; width: 860px !important;"></div>
            <div id="NodataDivpopup" style="display: none; border: 0; width: 860px !important;"><span style="text-align: center; color: #f00; padding: 20px 0px; display: block;">No Data Available</span></div>
        </div>
    </div>
    <%-- Popup Charts --%>

    <div id="myModal" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true" title="Close">&times;</button>
                    <h4 class="modal-title">Outage</h4>
                </div>
                <div class="modal-body inner-dashboard-area">
                    <div class="left-active-sprite" style="float: none; margin: 0 auto; padding-left: 9px; position: static; width: 16% !important;">
                        <ul>
                            <li class="chart"><a href="#"></a></li>
                            <li class="graph"><a href="#" class="active"></a></li>
                        </ul>
                    </div>
                    <div class="chart-area-pop">
                        CHART COMES HERE
                    </div>
                </div>
                <div class="modal-footer">
                </div>
            </div>
        </div>
    </div>

    <script>

        //$(window).resize(function () {
        //    setTimeout(function () { 
        //        $('#outageschart').highcharts().setSize($('#outageschart').width(), $('#outageschart').height(), true);
        //    }, 1000);
        //});
    </script>
</asp:Content>
