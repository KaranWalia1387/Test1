<%@ Page Title="Efficiency Report" Language="C#" MasterPageFile="~/AdminReports/AdminReport.master" AutoEventWireup="true" CodeBehind="EfficiencySample.aspx.cs" Inherits="AdminPanel.AdminReports.EfficiencySample" %>

<%@ Import Namespace="AdminPanel" %>
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
        });
    </script>
      <style>
                  .ajax__calendar_container {
width:190px !important;
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
    float: left;
    height: 90%;
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
            height: 400px;
            border: solid 0px #cfcfcf;
            padding: 5px 10px;
 }
        .altrnte {
            height:100%;
        }

@media (min-width:1100px) and (max-width:1380px) {
    .inner-right-section {
    background: #fff none repeat scroll 0 0;
    box-shadow: 0 0 4px #cfcfcf;
    height: 95% !important;
    margin: 15px 15px 0;
    overflow: auto;
    }
}
@media (min-width:1381px) and (max-width:3500px) {
      #devices.inner-right-section {
        height: 96% !important;
      }
        }
.inner-dashboard-area .left-active-sprite ul li.graph a {
    background: url("../images/graph-icon.png") no-repeat center top;
}
.inner-dashboard-area .left-active-sprite ul li.graph a.active {
    background: url("../images/graph-icon-active.png") no-repeat center top;
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
                $('.inner-right-section').css("overflow", "visible");
                loader.showloader();
                if ($(this).attr('id') == 'expand_outage') {
                    $('#a_expander').attr('href', 'programs.aspx');
                    $('#a_expander').html("<img src='../images/sidebar_programs.png' class='dash_heading_img' />Programs");
                    $('#li_graph').attr('class', 'graph');
                    FillOutageData('popup');
                }
                else if ($(this).attr('id') == 'expand_usage') {
                    $('#a_expander').attr('href', 'rebates.aspx');
                    $('#a_expander').html("<img src='../images/sidebar_rebates.png' class='dash_heading_img' />Rebates");
                    $('#li_graph').attr('class', 'graph');
                    FillRebatesData('popup');
                }
                else if ($(this).attr('id') == 'expand_solar') {
                    //$('#a_expander').attr('href', 'Generation.aspx');
                    $('#a_expander').html("<img src='../images/icon_generation_sidebar.png' class='dash_heading_img' />Educational Tips");
                    $('#li_graph').attr('class', 'graph');
                    FillEducationalData('popup');
                }
                else if ($(this).attr('id') == 'expand_service') {
                    //$('#a_expander').attr('href', 'Service.aspx');
                    $('#a_expander').html("<img src='../images/icon_service_sidebar.png' class='dash_heading_img' />Saving Tips");
                    $('#li_graph').attr('class', 'pie');
                    FillSavingData('popup');
                }
               
                loader.hideloader();
                $('#expand_popup_view').addClass('show');
                $('#altrnte').addClass('hide');
            });
            $('#close_graph').click(function () {
                $('.inner-right-section').css("overflow", "auto");
                $('#expand_popup_view').removeClass('show');
                $('#altrnte').removeClass('hide');
            });


            /* Edited by prashant */

        });

    </script>
  
    <uc1:jqxGrid runat="server" />
    <input type="hidden" class="activeli_list" value="sidebar_efficency" />
    
    </asp:ScriptManager>
    <asp:HiddenField ID="hdnParamValues" runat="server" ClientIDMode="Static" />
    <div class="top-header-area">
        <h2>Efficiency</h2>
    </div>

    <div class="grid-section">
        <div id="altrnte">
            <div class="inner-dashboard-area" id="devices">
                <ul>
                    <% if (SessionAccessor.UserRightList.Contains(UserRights.ReportEfficiencyAccess))
                       { %>
                    <li runat="server" visible="true" id="Module0">
                        <h3><a href="Programs.aspx">
                            <img src="../images/sidebar_programs.png" class="dash_heading_img" />Programs</a>
                            <div class="left-active-sprite">
                                <ul>
                                    <li class="chart"><a href="#" onclick="switchview('gridoutage','outageschart');"></a></li>
                                    <li class="graph"><a href="#" onclick="switchview('outageschart','gridoutage');" class="active"></a></li>
                                    <li>
                                        <img src="../images/expand-icon.png" class="popup_img expander_btn" id="expand_outage" title="Full image view" /></li>
                                </ul>
                            </div>
                        </h3>
                        <div id="outageschart" class="dashboardchart" style="width: 100%;"></div>
                        <div id="gridoutage" class="jqgrid" style="display: none; border: 0; width:100% !important; height:205px !important;"></div>
                    </li>
                    <% }
                       if (SessionAccessor.UserRightList.Contains(UserRights.ReportUsageAccess))
                       { %>


                    <li id="Module1" runat="server" visible="true">
                        <h3><a href="Rebates.aspx">
                            <img src="../images/sidebar_rebates.png" class="dash_heading_img" />Rebates</a>
                            <div class="left-active-sprite">
                                <ul>
                                    <li class="chart"><a href="#" onclick="switchview('gridRebates','Rebateschart');"></a></li>
                                    <li class="graph"><a href="#" onclick="switchview('Rebateschart','gridRebates');" class="active"></a></li>
                                    <li>
                                        <img src="../images/expand-icon.png" class="popup_img expander_btn" id="expand_usage" /></li>
                                </ul>
                            </div>
                        </h3>
                        <div id="Rebateschart" class="dashboardchart"></div>
                        <div id="gridRebates" class="jqgrid" style="display: none; border: 0; width:100% !important; height:205px !important;"></div>
                    </li>
                    <% } if (SessionAccessor.UserRightList.Contains(UserRights.ReportSolarAccess))
                       { %>

                    <li id="Module2" runat="server" visible="false">
                        <h3><a href="">
                            <img src="../images/icon_generation_sidebar.png" class="dash_heading_img" />Educational Tips</a>
                            <div class="left-active-sprite">
                                <ul>
                                    <li class="chart"><a href="#" onclick="switchview('gridEducational','Educationalchart');"></a></li>
                                    <li class="graph"><a href="#" onclick="switchview('Educationalchart','gridEducational');" class="active"></a></li>
                                    <li>
                                        <img src="../images/expand-icon.png" class="popup_img expander_btn" id="expand_solar" /></li>
                                </ul>
                            </div>
                        </h3>
                        <div id="Educationalchart" class="dashboardchart"></div>
                        <div id="gridEducational" class="jqgrid" style="display: none; border: 0;height:205px !important;"></div>
                    </li>
                    <% }
                       if (SessionAccessor.UserRightList.Contains(UserRights.ReportServiceAccess))
                       { %>
                    <li id="Module3" runat="server" visible="false">
                        <h3><a href="">
                            <img src="../images/icon_service_sidebar.png" class="dash_heading_img" />Saving Tips</a>
                            <div class="left-active-sprite">
                                <ul>
                                    <li class="chart"><a href="#" onclick="switchview('gridSaving','Savingchart');"></a></li>
                                    <li class="pie"><a href="#" onclick="switchview('Savingchart','gridSaving');" class="active"></a></li>
                                    <li>
                                        <img src="../images/expand-icon.png" class="popup_img expander_btn" id="expand_service" /></li>
                                </ul>

                            </div>
                        </h3>
                        <div id="Savingchart" class="dashboardchart"></div>
                        <div id="gridSaving" class="jqgrid" style="display: none; border: 0;height:205px !important;"></div>
                    </li>
                    <% } %>

                </ul>
            </div>
        </div>
              <div class="pop_view inner-dashboard-area" id="expand_popup_view" style="width: 100% !important; overflow: hidden; height: 95% !important;">
            <div id="popup_views" class="">
                <ul>
                    <li runat="server" visible="true" id="Li1">
                        <h3><a href="#" id="a_expander">
                            <img src="../images/icon_outage_sidebar.png" class="dash_heading_img" />Outage</a>
                            <div class="left-active-sprite">
                                <ul class="popup_listener">
                                    <li class="chart"><a href="#" id="chart_pop" onclick="switchview('grid-viewer-popup','data-viewer-popup','popup');"></a></li>
                                    <li class="graph" id="li_graph"><a href="#" id="graph_pop" title="Chart view" onclick="switchview('data-viewer-popup','grid-viewer-popup','popup');" class="active"></a></li>
                                    <li>
                                        <img src="../images/collapse-icon.png" class="popup_img" id="close_graph" /></li>
                                </ul>
                            </div>
                        </h3>
                    </li>
                </ul>

                <div id="data-viewer-popup" class="data-viewer-popup" style="width: 860px !important;"></div>
                <div id="grid-viewer-popup" class="jqgrid" style="display: none; border: 0; width: 860px !important;"></div>
            </div>
        </div>
        <%--<div id="cloneddiv" style="width: 500px; height: 500px"> </div>--%>
    </div>
    
    <div class="grid-section" style="padding-top: 0px; width: 99.5%; display:none;">
        <div id="graphDiv" class="Graph-area">
            <div class="grid_main_box">
                <div id="jqxgrid" class="jqgrid">
                </div>
                <div id="jqxchildgrid" style="display: none;" class="jqgrid">
                </div>
            </div>
        </div>
       
        <div id="nodata_div" style="width: 100%; text-align: center; color: Red;display: none;" visible="false">No Data</div>
        <div id="chartDiv" class="Chart-area" style="position: relative; width: 100%; ">
            
            <div class="grid_main_box" style="width: 98%;">
                   <uc1:ChartControl runat="server" ID="ChartControl" />
                  <div id="titleEfficiency" style="font-weight: bold;"></div>
                <div class="div_Efficiencychart">
                    <span id="EfficiencyTitle"></span>
                    <div id="div-Efficiencychart" style="width: 90%;" visible="true">
                    </div>
                </div>
                <div class="div_Efficiencychart2">
                    <span id="EEtitlebyCity"></span>
                    <div id="div-Efficiencychart1" style="width: 90%; ">
                    </div>
                </div>
                <div id="nodata_div1" style="width: 100%; text-align: center;display: none;" visible="false"></div>
            </div>
        </div>
    </div>

    <div class="modal fade userDetails" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog popup_area">
            <div class="modal-content" style="width: 75%">
                <div class="modal-header">
                    <button type="button" id="btnClose" data-dismiss="modal">
                        <img src="../images/popup_close.png" title="Close"/></button>
                    <h4 class="modal-title" id="H1">Efficiency Details</h4>
                </div>
                <div class="modal-body">
                    <div class="popup_area_home">
                        <div style="clear: both;"></div>
                        <div id="Div1" class="innerDiv">
                            <%--<div class="popup_left_content_area_home">
                                Customer Name :
                            </div>
                            <div class="popup_right_content_area_home">
                                <label id="lblCustName"></label>
                            </div>
                            <div style="clear: both;"></div>

                            <div class="popup_left_content_area_home">
                                Service Account :
                            </div>
                            <div class="popup_right_content_area_home">
                                <label id="lblServiceAccount"></label>
                            </div>
                            <div style="clear: both;"></div>--%>

                        </div>
                    </div>
                    <div class="bottom_area_home">
                        <input id="clear" type="button" class="cancel submitBtn" value="Close" data-dismiss="modal" style="margin-left: 40%;"/>

                    </div>
                    <div style="clear: both;"></div>
                </div>
            </div>
        </div>
    </div>
    <script src="../js/AdminReport_CommonFunctions.js"></script>
    
    <script src="../js/EfficiencySample.js"></script>
     <script src="//d3js.org/d3.v3.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../js/AdminReport_main.css">
</asp:Content>
