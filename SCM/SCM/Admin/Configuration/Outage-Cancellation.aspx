<%@ Page Title="Outage List" Language="C#" MasterPageFile="~/Configuration/Outage.Master" AutoEventWireup="true" CodeBehind="Outage-Cancellation.aspx.cs" Inherits="AdminPanel.Outage_Cancellation" %>

<%@ Import Namespace="AdminPanel" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit.HTMLEditor" TagPrefix="cc1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <uc1:jqxGrid runat="server" />

    <link rel="stylesheet" href="//js.arcgis.com/3.14/esri/css/esri.css">

    <script src="//js.arcgis.com/3.14/"></script>
    <link href="../css/AdminReport_main.css" rel="stylesheet" />
    <uc1:jqxGrid runat="server" ID="jqxGrid1" />
    
    
    <script src="../js/Outage-Cancellation.js"></script>
    <script src="../js/popup.js"></script>
    <%--<script src="../js/jquery.mask.min.js"></script>--%>
    <input type="hidden" class="activeli_list" value="sidebar_outage" />
    <input type="hidden" style="display:none;" class="" id="tempmasked" />
      <script>
         
          function Count(text, long) {
              var maxlength = new Number(long); // Change number to your max length.
              if (text.value.length > maxlength) {
                  text.value = text.value.substring(0, maxlength);
                  alert(" More than " + long + " characters not allowed");
              }
          }
          function CountCharactersTextArea(text, long) {
              var maxlength = new Number(long); // Change number to your max length.
              if (text.value.length > maxlength) {
                  text.value = text.value.substring(0, maxlength);
                  alert(" More than " + long + " characters not allowed");
              }
          }
   
          $("document").ready(function () {
              $('.left-active-sprite a').on('click', 'i', function () {
                  $('.left-active-sprite a i.active').removeClass('active');
                  $(this).addClass('active');
                  if ($('.left-active-sprite a i').hasClass('activeGrid')) {
                      $('#map').css('display', 'none');
                      $('#graphDiv').css('display', 'block');
                  }
                  else {
                      $('#map').css('display', 'block');
                      $('#graphDiv').css('display', 'none');
                  }
              });
          });
        </script>

    <style type="text/css">
        .jqx-widget-darkblue.jqx-grid-cell.jqx-grid-cell {
            display:none !important;
        }
        .esriPopup esriPopupVisible {
            visibility: visible;
            z-index: 40;
            left: 432px;
            top: 102px;
        }

        .ReplyBtnContainer.email {
            width: 100%;
            float: left;
            margin-top: 10px;
        }

            .ReplyBtnContainer.email > input {
                border: 1px solid #ccc;
                padding: 4px 5px;
                border-radius: 0px;
            }

        .ajax__htmleditor_editor_base + span.required {
            position: absolute;
            right: -9px;
            top: 0;
        }

        .mapLegend_1, .mapLegend_2, .GraphLegend_data_low {
            padding-left: 3px;
            padding-right: 3px;
        }

        .jqx-fill-state-pressed {
            background: #BEC1C1 !important;
        }

        .Graph-area {
            width: 100%;
        }

        a {
            text-decoration: none !important;
            /*//  color:#758386 !important;*/
        }

        .right-content-area .active_new {
            margin-top: 9px !important;
        }

        .Leftheader-Pannel {
            width: 100% !important;
            float: left;
        }

        .ajax__calendar_container {
            width: 190px !important;
        }

        .grid_main_box {
            margin-left: 0px;
            margin-top: 0px;
            text-align: center;
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
            /*cursor: pointer;*/
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

        #outage_map_canvas {
            height: 213px !important;
        }

        @media screen and (min-width: 1500px) and (max-width:3224px) {
            .outage_details_box {
                height: 284px !important;
                overflow: hidden;
            }

            .grid_1, .outage_history_box, .customer_list_box {
                height: 281px !important;
            }

            #outage_map_canvas {
                height: 313px !important;
            }
        }

        @media screen and (min-width: 768px) and (max-width:1024px) {


            .time_date_input {
                width: 78% !important;
            }
        }
        @media screen and (min-width: 1281px) and (max-width:1366px) {
            .inner-right-section {
                height: 96%;
            }
        .grid {
            background: url("../images/usage-graph.svg") no-repeat left 2px;
        }

        .activeGrid {
            background: url("../images/usage-graph-active.svg") no-repeat left 2px;
        }

        .map1 {
            background: url("../images/map-oc.png") no-repeat left 2px;
            background-size: 14px;
        }

        .activeMap {
            background: url("../images/map-oc-active.png") no-repeat left 2px;
            background-size: 14px;
        }


        .outage_graph_img {
            left: 111px !important;
        }

        .top-header-area, .top-header-area h2 {
            border-bottom: 0px !important;
        }




        .left-active-sprite a #mapimg, .left-active-sprite a #mapView {
            margin-top: -3px;
            height: 24px;
        }

        .outage_right_chart_box {
            margin-top: -1.4%;
        }

        #outage_map_canvas, #outage_map_canvas svg {
        }

        #outage_child_map_canvas, #outage_child_map_canvas svg {
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
        /* 19-10-2015 */

        #jqxgrid .filterdrop {
            padding-top: 9px;
        }

        .closeBtn {
            background: #606060;
            border: none;
            color: #f0f0f0;
            cursor: pointer;
            font-size: 14px;
            height: 30px;
            margin: 13px 18px 5px 5px;
            padding: 5px 50px;
            text-align: center;
            border-radius: 5px;
        }

        .user-outbox-area {
            width: 43%;
            float: left;
            margin: 0 0 11px;
        }

        .Text-outbox-area {
            width: 53%;
            float: left;
            margin: 0px;
        }

        .PopUpTitleBg {
            background: #999999;
            padding: 8px 10px;
            color: #fff;
            margin-bottom: 5px;
            float: left;
            width: 100%;
        }

        #PopupAddTopic {
            left: 0% !important;
            top: 0% !important;
            /* transform: translate(-50%,-50%); */
            position: Absolute;
            margin: 0 auto;
            width: 100% !important;
            max-width: 700px;
        }

        .close {
            opacity: 1 !important;
        }

        .heading {
            display: inline;
            font-weight: normal;
            font-family: arial, sans-serif;
            font-size: 16px;
        }

        .grid_1 table {
            width: 100%;
        }

            .grid_1 table tr td {
                padding: 7px 15px;
                font-size: 14px;
                text-align: left;
            }

            .grid_1 table tr:nth-child(even) td {
                background: #f8fafb;
            }

            #dropdownlistContentgridpagerlistjqxchildgrid {
                overflow:visible !important;
            }
            div#gridpagerlistjqxchildgrid {
                width:50px !important;
            }

             .btn-file {
            position: relative;
            overflow: hidden;
        }

            .btn-file input[type=file] {
                position: absolute;
                top: 0;
                right: 0;
                min-width: 100%;
                min-height: 100%;
                font-size: 100px;
                text-align: right;
                filter: alpha(opacity=0);
                opacity: 0;
                background: red;
                cursor: inherit;
                display: block;
            }

        #nofile {
            position: relative;
            top: 6px;
        }

        @media (max-width:478px) {
            #nofile {
                white-space: nowrap;
                top: -5px;
            }
        }

        #btnRemoveFile {
            position: relative;
            top: 6px;
        }
.btn-primary.btn-primary.submit-button {
    background-color: #6dbe6f !important;
        width: 135px !important;
        color:#fff !important;
        border-radius:5px !important;
            font-size: 14px !important;
}

#jqxchildgrid .jqx-grid-column-header-darkblue.jqx-grid-column-header-darkblue div {
         margin-left: 2px !important; 
}

.email_ast.email .required {
        position: absolute;
    right: -10px;
    top: 0;
}
    </style>
  
        <asp:HiddenField ID="hdnParamValues" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnfileOld" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdfile" runat="server" ClientIDMode="Static" />
    <div class="top-header-area">
        <div class="Leftheader-Pannel">
            <h2>Outages             
            </h2>
            <div class="filter_area_ui" style="width: 60% !important;">
                <div class="right_header_area">
                    <ul>
                        <li><a href="#" data-toggle="modal" data-target="#export_docs_pop" title="Export"><span class="fa fa-external-link icon_color"></span>Export</a></li>
                        <li><a href="#" id="filter_btn_explorer" style="display: none;" title="Filter Results"><span class="fa fa-filter icon_color"></span>Filter Results</a></li>
                        <li><a href="configure-outage.aspx" style="text-decoration: none;" id="btnAdd">
                            <i class="fa fa-plus-circle icon_color"></i>
                            Add Outage</a></li>
                    </ul>
                </div>

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
                        <select id="ddlOutageType" title="Outage Type">
                            <option value="">Outage Type</option>
                            <option value="0">Current</option>
                            <option value="1">Planned</option>
                        </select>
                    </div>
                    <div class="input-section" style="width: auto  !important; float: right; margin: 5px 20px;">
                        <asp:Button ID="btnFilter" ToolTip="Search" CssClass="filterBtn" runat="server" Text="Filter Result" ClientIDMode="Static" OnClientClick="return false;" Style="margin: 0px;" />
                    </div>
                </div>
            </div>
        </div>
        <div style="display: block;" class="current_area" id="GenDiv">
            <ul>
                <li style="display: <%=SessionAccessor.IsModuleEnabled(Features.OutagesPlaned) %>">
                    <div class="average_usage_header">
                        <asp:Label ID="lblplanned" runat="server" Visible="true" ClientIDMode="Static"></asp:Label>

                    </div>
                    <i id="demandusagetext">PLANNED OUTAGES</i>
                </li>
                <li style="display: <%=SessionAccessor.IsModuleEnabled(Features.OutagesCurrent) %>">
                    <div class="average_usage_header">
                        <asp:Label ID="lblunplanned" runat="server" Visible="true" ClientIDMode="Static"></asp:Label>

                    </div>
                    <i id="unplannedtext">CURRENT OUTAGES</i>
                </li>

                <li>
                    <div class="average_usage_header">
                        <asp:Label ID="lbltotal" runat="server" Visible="true" ClientIDMode="Static"></asp:Label>

                    </div>
                    <i id="totaltext">TOTAL OUTAGES</i>
                </li>
            </ul>
        </div>

        <div class="calender_seciton_1">
            <div class="power_graph_heading power_graph_spanish">
                <div class="lgnd_box_right">
                <div class="left-active-sprite">
                    <a href="#" title="List view">
                        <i id="gridView" class="activeGrid" onclick="javaScript:chartgraphsection(1)" <%--alt="Chart View"--%>></i></a>
                    <a href="#" title="Map view">
                        <i onclick="javaScript:chartgraphsection(3)" id="mapView" style="margin-top: 0px;" class="map1" <%--alt="Map View"--%>></i></a>

                </div>
                    </div>
                <div class="outage_map_info outage_map_info1" style="float: right; margin: 12px 16px 0px 0px;">
                    <p>
                        <a href="#" id="lnkAll" style="display: none;">
                            <span class="GraphLegend_data_low">|</span>
                            <span class="GraphLegend_data_low" style="float: left;" id="lblView">View All </span>
                        </a>

                        <a href="#" id="lnkPlanned" style="display: <%=SessionAccessor.IsModuleEnabled(Features.OutagesPlaned) %>">
                            <img src="../images/planned_outage_active.png" style="float: left; margin: -1px 5px 0 12px;" />
                            <%--<span class="mapLegend_1"></span>--%>
                            <span class="GraphLegend_data_low" style="float: left;" id="lblPlan">Planned Outages</span>
                        </a>
                        <a href="#" id="lnkCurrent" style="display: <%=SessionAccessor.IsModuleEnabled(Features.OutagesCurrent) %>">
                            <img src="../images/current_outage_active.png" style="float: left; margin: -1px 5px 0 12px;" />
                            <span class="GraphLegend_data_low" style="float: left;" id="lblCurr">Current Outages</span>
                        </a>


                    </p>

                </div>

            </div>
        </div>
        <div class="grid-section map_height1" style="padding: 0px; width: 100%; height: 100% !important; overflow-x: hidden;">
            <div style="display: none;min-height:207px;" id="map">
                <div id="outage_map_canvas" class="radius map_canvas" style="height: 99.8% !important; width: 100%"></div>
            </div>
            
            <div style="display: block; height: 100% !important; width: 100%; padding-bottom: 0;" id="graphDiv" class="Graph-area">
                <div class="grid_main_box">
                    <div id="jqxgrid" class="jqgrid">
                    </div>


                </div>
            </div>
        </div>
        <div class="calender_seciton_1">


            <div id="bs-example-navbar-collapse-1" class="collapse navbar-collapse" style="padding-left: 0;">
                <div class="outage_toggle_box">
                    <ul class="tab_nav_1 navbar-nav">
                        <li class="outage_detls_img active" id="DetailData"><a href="#">Outage Details</a></li>
                        <li class="outage_history_img" id="HistoryData"><a href="#">Outage History</a></li>
                        <li class="customer_list_img" id="CustomerData"><a href="#">Customer List</a></li>

                    </ul>
                </div>
                <div class="right_header_area" style="margin-top: -27px !important; margin-right: 20px;width:30%;" id="Notify">
                    <a href="#" style="text-decoration: none; display: none;float:right;" id="btnEdit">
                        <i class="fa fa-pencil-square-o icon_color" style="font: 20px/1 FontAwesome; padding-right: 3px; padding-top: 0; margin-top: 0px; text-rendering: auto; vertical-align: top;"></i>
                        Update Outage</a>

                    &nbsp;
                    <a href="#" id="btnSend" style="display: none;white-space: nowrap;    float: left;">
                        <i class="fa fa-send icon_color" style="font: 17px/1 FontAwesome; padding-right: 3px; padding-left: 6px; padding-top: 1px; margin-top: 0px; text-rendering: auto; vertical-align: top; display: none;"></i>
                        <span class="flat_ico_admin icon-admin-send-notification"></span>
                         <asp:ImageButton runat="server" ImageUrl="~/images/send-notif.png"  class="hide_for_flat_ico" ToolTip="Send Notification" ClientIDMode="Static" OnClientClick="return false" Style="margin-right: 3px; margin-top: -5px; vertical-align: middle;" />
                        Send Notification</a>
                </div>


            </div>
        </div>
        <div class="outage_details_box">
            <div class="outage_details_box" id="outagedata" style="height: 200px;">
                <div class="grid_1" style="height: 200px; overflow: auto; border-right: 1px solid #ccc;">
                    <table>
                        <tr>
                            <td>Outage Type:
                            </td>
                            <td>
                                <asp:Label ID="lblOutageHeading" runat="server" Visible="true" ClientIDMode="Static"></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td>Community Affected:
                            </td>
                            <td>
                                <asp:Label ID="lblCommunity" runat="server" Visible="true" ClientIDMode="Static"></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td>Customers Affected:
                            </td>
                            <td>
                                <asp:Label ID="lblcusteffected" runat="server" Visible="true" ClientIDMode="Static"></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td>Start Time:
                            </td>
                            <td>
                                <asp:Label ID="lblstartdate" runat="server" Visible="true" ClientIDMode="Static"></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td>Estimated Restoration:
                            </td>
                            <td>
                                <asp:Label ID="lblenddate" runat="server" Visible="true" ClientIDMode="Static"></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td>Outage Status:
                            </td>
                            <td>
                                <asp:Label ID="lblOutageStatus" runat="server" Visible="true" ClientIDMode="Static"></asp:Label>
                            </td>
                        </tr>
                        <tr>
                            <td>Outage Cause:
                            </td>
                            <td>
                                <asp:Label ID="lblOutageCause" runat="server" Visible="true" ClientIDMode="Static"></asp:Label>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="map_1" id="outage_child_map_canvas" style="height: 100%!important;"></div>
            </div>
            <div class="outage_history_box" style="display: none;">
                <div id="nodata_div1" style="width: 100%; text-align: center; color: red; display: none">No data</div>
                <div id="jqxhistorygrid" style="display: none;" class="jqgrid">
                </div>
            </div>
            <div class="customer_list_box" style="display: none;">
                <div id="nodata_div" style="width: 100%; text-align: center; color: red; display: none">No Customers Affected</div>
                <div id="jqxchildgrid" style="display: none;" class="jqgrid">
                </div>
            </div>

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
                                <li><a href="#" class="pdf_icon" id="btnExportPdf" runat="server" onserverclick="btnExportPdf_ServerClick">Pdf(.pdf)</a></li>
                                <li><a href="#" class="excel_icon" id="btnExcelExport" runat="server" onserverclick="btnExcelExport_ServerClick">Excel(.xls)</a></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div id="PopupAddTopic" style="display: none; background-color: White; width: 700px; padding-bottom: 8px; border: 1px solid #008ddd;">
            <asp:HiddenField ID="hdnAccountNos" runat="server" ClientIDMode="Static" />
            <div class="PopUpTitleBg configure-service-popup" style="margin-bottom: 0px;">
                <div id="popuptitle" class="PopUpTitle">Send Notification</div>
                <img src="../images/popup_close.png" id="ClosePopupAddTopic" style="float: right;" alt="Close" title="Close" />
            </div>

            <div class="clear">
                &nbsp;
            </div>

            <div class="table-responsive" id="outboxmsg">
                <table>
                    <tr>
                        <td width="50%">
                            <div class="user-outbox-area">
                                <label>Type of Message: </label>
                            </div>
                            <div class="Text-outbox-area">
                                <asp:DropDownList ID="ddltypeofmessage" runat="server" title="Message Type" ClientIDMode="Static">
                                </asp:DropDownList>
                            </div>
                        </td>
                        <td>
                            <div class="user-outbox-area">
                                <label>Mode Of Message: </label>
                            </div>
                            <div class="Text-outbox-area">
                                <asp:DropDownList ID="ddlMessageMode" runat="server"  title="Mode Of Message" AutoPostBack="false" ClientIDMode="Static">
                                   <asp:ListItem Selected="True" Text="--Mode Of Message--" Value="0"></asp:ListItem>
                                    <asp:ListItem  Value="1">Email</asp:ListItem>
                                    <asp:ListItem Value="2">Push</asp:ListItem>
                                   <%-- <asp:ListItem Value="3">IVR</asp:ListItem>--%>
                                </asp:DropDownList>
                            </div>
                        </td>
                    </tr>
                </table>
                <div class="user-outbox-area email" style="width: 20%;">
                    <label>Subject: </label>
                </div>
                <div class="Text-outbox-area email" style="width: 80%;">
                    <asp:TextBox ID="txtmsgsubject" runat="server" Style="width: 97%;" CssClass="txtmsgsubject" title="Subject" ClientIDMode="Static" ValidateMessage="Please enter Subject"></asp:TextBox>
                </div>
                <div class="clear">
                    &nbsp;
                </div>
                <div class="message-section" id="MessageBody" style="margin-left: 0px;">
                    <div class="LeftFilterPanelHeader" id="msgReply">
                        <div class="email email_ast" style="position: relative; width: 98%;">
                            <%--<cc1:Editor ID="txtEditor" runat="server" />--%>
                            <div id="summernote" class="summernote">
                                <p></p>
                            </div>

                        </div>
                        <div class="clear">
                            &nbsp;
                        </div>
<%--                        <asp:TextBox onkeypress="return CheckLength(event);" onkeydown="return CheckLength(event);" title="Message" ID="txtMessage" Columns="20" Rows="5" Width="99%" runat="server" ClientIDMode="Static" CssClass="texttype hide " TextMode="MultiLine" MaxLength="140" Style="width: 96%; margin-left: 9px; resize: none;" ValidateMessage="Please enter Message"></asp:TextBox>--%>
                                                <asp:TextBox onKeyUp="CountCharactersTextArea(this,140)" onChange="CountCharactersTextArea(this,140)" title="Message" ID="txtMessage" Columns="20" Rows="5" Width="99%" runat="server" ClientIDMode="Static" CssClass="texttype hide mstType" TextMode="MultiLine" MaxLength="140" Style="width: 96%; margin-left: 9px; resize: none;" ValidateMessage="Please enter Message"></asp:TextBox>

                        <div class="clear_both"></div>
                        <span style="color: red; margin-left: 10px;" class="texttype hide" id="spanTxt"></span>

                         <div class="ReplyBtnContainer email" style="float: left; margin-top: 10px; display: none;">
                                <span class="submit-button btn btn-primary btn-file" id="lblFileupload" style="float: left !important; line-height: 22px; font-size: 15px; padding: 3px 11px !important;">Choose File                
                            <asp:FileUpload ID="fileupd" runat="server" onchange="File_OnChange(this)" ClientIDMode="Static" />
                                </span>
                                <i id="nofile">No File Chosen</i>
                                <img id="btnRemoveFile" title="Remove" src="../images/Payment_DeleteIcon.png" onclick="return removeFile();" />
                                <asp:Label ID="lblMessage" runat="server" Enabled="false"></asp:Label>
                            </div>


                    
                        <div class="clear">
                            &nbsp;
                        </div>
                        <div class="ReplyBtnContainer" style="text-align: center;">

                            <input type="button" id="btnSubmitReply" value="Send" class="submitBtn" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
