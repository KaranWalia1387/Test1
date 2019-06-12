<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/AdminReports/AdminReport.master" CodeBehind="DashboardUserBehaviour.aspx.cs" Inherits="AdminPanel.AdminReports.DashboardUserBehaviour" Title="Report User Behaviour" %>

<%@ Import Namespace="AdminPanel" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<%@ Register Src="~/UserControl/ChartControl.ascx" TagPrefix="uc1" TagName="ChartControl" %>
<asp:Content ContentPlaceHolderID="rightpanel" runat="server">

    <%--<uc1:jqxGrid runat="server" />--%>
    <style type="text/css">
        .jqx-grid-column-header {
            font-weight: bold;
        }
    </style>
    <input type="hidden" class="activeli_list" value="sidebar_admin" />
    <script src="../js/UserBehaviour.js"></script>
    <script type="text/javascript" src="../js/detect-zoom.js"></script>
    <style>

        .inner-dashboard-area .left-active-sprite ul li.chart a {
                background: url("../images/line-chart.png") no-repeat center top;
        }
        .inner-dashboard-area .left-active-sprite ul li.chart a.active {
                background: url("../images/line-chart-active.png") no-repeat center top;
        }
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



        .inner-right-section {
            background: #fff none repeat scroll 0 0;
            box-shadow: 0 0 4px #cfcfcf;
            /*height: auto;*/
            height: 100%;
            margin: 15px 15px 0;
            overflow: auto;
        }

        .right-side {
            float: right;
            height: 96%;
            position: relative;
        }

        .inner-mid-container {
            height: 100%;
        }

        .inner-right-section .right-content-area {
            height: 100%;
            padding: 0;
        }

        .inner-right-section .grid-section {
            height: 100%;
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
            height: 100%;
            position: relative;
        }

        #expand_popup_view {
            background-color: #ffffff;
            display: none;
            z-index: 9999;
        }

        #expand_popup_view {
            float: left;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
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
            height: 450px;
            border: solid 1px #cfcfcf;
            padding: 5px 10px;
        }
        /* Edited by prashant */
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
            refresh();
            $(window).on('resize', refresh);

            /* Edited by prashant */
            $('.expander_btn').click(function () {
                loader.showloader();

                var popup = this.parentElement.parentElement.children;
                var visiblepopup = $('.left-active-sprite').find(popup).find("a.active")[0].parentElement.className;
                if (visiblepopup == "chart") {
                    $('#data-viewer-popup').hide(); $('#grid-viewer-popup').show();
                    $('#popup_views ul.popup_listener li.chart a').addClass("active");
                    $('#popup_views ul.popup_listener li.graph a').removeClass("active");
                    $('#popup_views ul.popup_listener li.pie a').removeClass("active");
                }
                else if (visiblepopup == "graph") {
                    $('#data-viewer-popup').show(); $('#grid-viewer-popup').hide();
                    $('#popup_views ul.popup_listener li.graph a').addClass("active");
                    $('#popup_views ul.popup_listener li.chart a').removeClass("active");
                    $('#popup_views ul.popup_listener li.pie a').removeClass("active");
                }
                else {
                    $('#data-viewer-popup').show(); $('#grid-viewer-popup').hide();
                    $('#popup_views ul.popup_listener li.pie a').addClass("active");
                    $('#popup_views ul.popup_listener li.chart a').removeClass("active");
                    $('#popup_views ul.popup_listener li.graph a').removeClass("active");
                }

                if ($(this).attr('id') == 'expand_outage') {
                    $('#a_expander').attr('href', 'Online-Payment.aspx');
                    $('#a_expander').html("<img src='../images/online-payment.png' class='dash_heading_images' />Online Payment");
                    $('#li_graph').attr('class', 'graph');
                    FillOutageData('popup');

                }
                else if ($(this).attr('id') == 'expand_device') {
                    $('#a_expander').attr('href', 'Device-Used.aspx');
                    $('#a_expander').html("<img src='../images/device-used.png' class='dash_heading_images' />Device Used");
                    $('#li_graph').attr('class', 'graph');
                    FillDeviceData('popup');
                }
                else if ($(this).attr('id') == 'expand_resolution') {
                    $('#a_expander').attr('href', 'resolution.aspx');
                    $('#a_expander').html("<img src='../images/resolution_icon.png' class='dash_heading_images' />Resolution");
                    $('#li_graph').attr('class', 'graph');
                    FillResolutionData('popup');
                }
                else if ($(this).attr('id') == 'expand_browser') {
                    $('#a_expander').attr('href', 'Browser-Used.aspx');
                    $('#a_expander').html("<img src='../images/browser-icon.png' class='dash_heading_images' />Browser Used");
                    $('#li_graph').attr('class', 'graph');
                    FillBrowserData('popup');
                }
                else if ($(this).attr('id') == 'expand_heatmap') {
                    $('#a_expander').attr('href', 'HeatMapSample.aspx');
                    $('#a_expander').html("<img src='../images/heat-icon.png' class='dash_heading_images' />Login Details");
                    FillLoginDetailsData('popup');
                }

                loader.hideloader();
                $('#expand_popup_view').addClass('show');
                $('#altrnte').addClass('hide');
            });
            $('#close_graph').click(function () {
                $('#expand_popup_view').removeClass('show');
                $('#altrnte').removeClass('hide');
            });


            /* Edited by prashant */

        });

    </script>
    <div class="top-header-area">
        <h2>Customer Behavior</h2>
    </div>
    <div class="grid-section">
        <div class="" id="altrnte">
            <div class="inner-dashboard-area pie_ico_dash" id="devices">
                <ul>
                    <%if (SessionAccessor.UserRightList.Contains(UserRights.ReportUserBehaviourAccess))
                      {  %>
                    <li id="Module0" runat="server">
                        <h3><a href="Online-Payment.aspx">
                            <img src="../images/online-payment.png" class="dash_heading_images">Online Payment</a>
                            <div class="left-active-sprite">
                                <ul>
                                    <li class="chart"><a href="#" onclick="switchview('gridoutage','outageschart1');" title="List view"></a></li>
                                    <li class="graph"><a href="#" onclick="switchview('outageschart1','gridoutage');" class="active" title="Chart view"></a></li>
                                    <li>
                                        <img src="../images/expand-icon.png" class="popup_img expander_btn" id="expand_outage" title="Full image view"></li>
                                </ul>
                            </div>
                        </h3>
                        <div id="outageschart1" class="dashboardchart" style="border: 0px none; height: 205px; width: 100%;">
                            <%--<img src="../images/chart_img_1.png" class="img-resp"/>--%>
                        </div>
                        <div role="grid" id="gridoutage" style="display: none; border: 0px none; height: 205px; width: 100%; position: relative;" align="left">
                        </div>
                    </li>
                    <% }%>
                    <li id="Module1" runat="server">
                        <h3><a href="device-used.aspx">
                            <img src="../images/device-used.png" class="dash_heading_images">Device Used</a>
                            <div class="left-active-sprite">
                                <ul>
                                    <li class="chart"><a href="#" onclick="switchview('gridusage','usagechart1');" title="List view"></a></li>
                                    <li class="graph"><a href="#" onclick="switchview('usagechart1','gridusage');" class="active" title="Chart view"></a></li>
                                    <li>
                                        <img src="../images/expand-icon.png" class="popup_img expander_btn" id="expand_device" title="Full image view"></li>
                                </ul>
                            </div>
                        </h3>
                        <div id="usagechart1" class="dashboardchart" style="border: 0px none; height: 205px; width: 100%;">
                            <%--<img src="images/ub-img.png" class="img-resp"/>--%>
                        </div>

                        <div role="grid" id="gridusage" align="left" style="display: none; border: 0px none; height: 205px; width: 100%; position: relative;">
                            <%--<img src="../images/graph-bg.png" class="img-resp"/>--%>
                            <%--<div class="text-editor">
							<h6><span id="totalDevices" ></span></h6>
							<p>Total Devices</p>
							</div>--%>
                        </div>
                    </li>
                    <li id="Module2" runat="server">
                        <h3><a href="resolution.aspx">
                            <img src="../images/resolution_icon.png" class="dash_heading_images">Resolution</a>
                            <div class="left-active-sprite">
                                <ul>
                                    <li class="chart"><a href="#" onclick="switchview('gridgeneration1','generationchart1');" title="List view"></a></li>
                                    <li class="graph"><a href="#" onclick="switchview('generationchart1','gridgeneration1');" class="active" title="Chart view"></a></li>
                                    <li>
                                        <img src="../images/expand-icon.png" class="popup_img expander_btn" id="expand_resolution" title="Full image view"></li>
                                </ul>
                            </div>
                        </h3>
                        <div id="generationchart1" class="dashboardchart" style="border: 0px none; height: 205px; width: 100%;">
                            <%--<img src="images/chart_img_3.png" class="img-resp"/>--%>
                        </div>
                        <div role="grid" id="gridgeneration1" align="left" style="display: none; border: 0px none; height: 205px; width: 100%; position: relative;">
                            <%--<img src="../images/graph-bg.png" class="img-resp"/>--%>
                            <%--<div class="text-editor">
							<h6>1920x1080</h6>
							<p>Top Resolution</p>
							</div>--%>
                        </div>
                    </li>
                    <li id="Module3" runat="server">
                        <h3><a href="browser-used.aspx">
                            <img src="../images/browser-icon.png" class="dash_heading_images">Browser Used</a>
                            <div class="left-active-sprite">
                                <ul>
                                    <li class="chart"><a href="#" onclick="switchview('gridservice','servicechart');" title="List view"></a></li>
                                    <li class="pie"><a href="#" onclick="switchview('servicechart','gridservice');" class="active" title="Chart view"></a></li>
                                    <li>
                                        <img src="../images/expand-icon.png" class="popup_img expander_btn" id="expand_browser" title="Full image view"></li>
                                </ul>

                            </div>
                        </h3>
                        <div id="servicechart" class="dashboardchart" style="border: 0px none; height: 205px; width: 100%;">
                        </div>
                        <div role="grid" id="gridservice" align="left" style="display: none; border: 0px none; height: 205px; width: 100%; position: relative;">
                            <%--<img src="../images/graph-bg.png" class="img-resp"/>--%>
                            <%--<div class="text-editor">
							<h6>Chrome</h6>
							<p>Top Browser</p>
							</div>--%>
                        </div>
                    </li>
                    <div class="clearfix"></div>
                    <li id="Module4" runat="server">
                        <h3><a href="HeatMapSample.aspx">
                            <img src="../images/heat-icon.png" class="dash_heading_images">
                            Login Details </a>
                            <div class="left-active-sprite">
                                <ul>
                                    <li class="chart"><a href="#" onclick="switchview('gridLoginDetails','LoginDetailschart');" title="List view"></a></li>
                                    <li class="graph"><a href="#" onclick="switchview('LoginDetailschart','gridLoginDetails');" class="active" title="Chart view"></a></li>
                                    <li>
                                        <img src="../images/expand-icon.png" class="popup_img expander_btn" id="expand_heatmap" title="Full image view"></li>
                                </ul>
                            </div>
                        </h3>
                        <div id="LoginDetailschart" class="dashboardchart" style="border: 0px none; height: 205px; width: 100%;">
                        </div>
                        <div role="grid" id="gridLoginDetails" align="left" style="display: none; border: 0px none; height: 205px; width: 100%; position: relative;">
                            <img src="../images/graph-bg.png" class="img-resp" />
                        </div>
                        <%--<div class="text-editor">
							<h6>Heat Map Info</h6>
							<p>Heat Map Info</p>
							</div>
						</div>--%>
                    </li>

                </ul>
            </div>
        </div>
        <!-- Edited by prashant -->
        <div class="pop_view inner-dashboard-area pie_ico_dash" id="expand_popup_view">
            <div id="popup_views" class="">
                <ul>
                    <li id="ContentPlaceHolder1_rightpanel_Li1">
                        <h3><a href="#" id="a_expander">
                            <img src="images/online-payment.png" class="dash_heading_images">Online Payment</a>
                            <div class="left-active-sprite">
                                <ul class="popup_listener">
                                    <li class="chart"><a href="#" id="chart_pop" onclick="switchview('grid-viewer-popup','data-viewer-popup','popup');"></a></li>
                                    <li class="graph"><a href="#" id="graph_pop" title="Chart view" onclick="switchview('data-viewer-popup','grid-viewer-popup','popup');" class="active"></a></li>
                                    <li>
                                        <img src="../images/collapse-icon.png" class="popup_img" id="close_graph"></li>
                                </ul>
                            </div>
                        </h3>
                    </li>
                </ul>
                <div id="data-viewer-popup" class="data-viewer-popup" style="width: 860px !important;"></div>
                <div role="grid" id="grid-viewer-popup" class="jqgrid" style="display: none; border: 0; width: 860px !important;">
                </div>
            </div>
        </div>

        <!-- Edited by prashant -->


    </div>
    <div id="myModal" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true" title="Close">×</button>
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
</asp:Content>
