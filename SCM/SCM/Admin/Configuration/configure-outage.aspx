<%@ Page Title="Configure Outage" Language="C#" MasterPageFile="~/Configuration/Outage.Master" AutoEventWireup="true" CodeBehind="configure-outage.aspx.cs" Inherits="AdminPanel.configure_outage" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">

    <script src="//www.google.com/jsapi" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" href="//js.arcgis.com/3.10/js/esri/css/esri.css" />
    <script type="text/javascript" src="//js.arcgis.com/3.10/"></script>
    <link rel="stylesheet" href="../include/jquery-ui-1.8.14.custom.css" type="text/css" />
    <link rel="stylesheet" href="../include/jquery.ui.timepicker.css?v=0.3.1" type="text/css" />
    <script type="text/javascript" src="../include/jquery.ui.core.min.js"></script>
    <script type="text/javascript" src="../include/jquery.ui.widget.min.js"></script>
    <script type="text/javascript" src="../include/jquery.ui.tabs.min.js"></script>
    <script type="text/javascript" src="../include/jquery.ui.position.min.js"></script>
    <script src="../include/jquery.ui.timepicker.js"></script>
    <input type="hidden" class="activeli_list" value="sidebar_outage" />
    <script src="../js/Validate.js"></script>
  
    <script src="../js/outage-configure.js"></script>
    <script src="../js/popup.js"></script>
 <%--   <script src="../Scripts/jquery-1.10.2.min.js"></script>--%>
    <style>
        .filter-section {
            margin: -5px 0px 0px 0px;
            padding: 5px 0px 8px 19px;
            width: 100%;
            overflow: visible;
            background: #f4f4f4;
        }

        .input_section_box {
            width: 100%;
        }

        .input-section {
            float: left;
            margin: 0 5px 0 0;
            width: 100%;
        }

        .input_right_box .input-section {
            width: 49%;
        }

        .input_left_box .input-section {
            width: 48%;
        }

        .filter-section input[type="text"], input[type="number"], input[type="password"] {
            background: #ffffff none repeat scroll 0 0;
            border: 1px solid #999999;
            color: #616161;
            font-size: 76.3%;
            height: 25px;
            line-height: 13px;
            margin-bottom: 2px;
            margin-top: 4px;
            padding: 4px;
            width: 90%;
        }

        .filter-section select {
            background: #ffffff none repeat scroll 0 0;
            border: 1px solid #999999;
            color: #616161;
            font-size: 76.3%;
            height: 25px;
            line-height: 13px;
            margin-bottom: 2px;
            margin-top: 4px;
            padding: 0 2px;
            width: 90%;
        }

        .filter-section .icon-cal {
            float: left;
            margin: 7px 0px 0px -23px;
        }

        .filter-section .icon-filter {
            float: left;
            margin: 4px 0px 0px 7px;
        }

        .input_left_box {
            width: 40%;
            float: left;
        }

        .input_right_box {
            width: 60%;
            float: left;
        }

        .outage_sbt_box {
            float: right;
            margin-right: 29px;
            margin-top: 4px;
        }

            .outage_sbt_box .submitBtn {
                margin: 0px 0 0 14px !important;
                float: left !important;
                color: #fff;
                padding: 3px 19px 5px;
                line-height: 21px;
            }

        .inner-right-section {
            height: 100%;
            overflow: hidden;
        }

        .ui-widget-header.ui-widget-header {
            font-size: 10px;
        }

        .ui-state-default, .ui-widget-content .ui-state-default, .ui-widget-header .ui-state-default {
            font-size: 10px;
        }

        .ui-timepicker-table td {          
            font-size: 10px;
        }
        #ui-timepicker-div{
            z-index:999;
        }
    </style>
    
    <input type="hidden" id="PageValues" value="OutagePage" />
    <div style="width: 100%;">
        <div class="top-header-area">
            <div style="float: left; width: 85%;">
                <h2>Outages</h2>
            </div>
            <%--<div style="float: right; padding-right: 20px;">
            <a  href="Outage-Cancellation.aspx" style="text-decoration:none;">
                <i class="fa fa-plus-circle icon_color" ></i>
                Add</a>
            <%--<a href="#" id="addUser"  style="text-decoration:none;"><i class="fa fa-plus-circle icon_color"></i>
                Add User</a>--%>
      <%--  </div>--%>
        </div>
        <div style="width: 100%;">
            <div class="filter-section" id="divFilter">
                <div class="input_left_box">
                    <div class="input-section">
                        <asp:DropDownList ID="ddlCity" runat="server" ClientIDMode="Static" mandatory="1" ToolTip="Location" ValidateMessage="Please select Location"></asp:DropDownList>
                    </div>
                 
                    <div class="input-section" style="position: relative;">
                        <asp:TextBox ID="txtDate" ClientIDMode="Static" runat="server" ToolTip="Date" mandatory="1" placeholder="Date" CssClass="DateInputbox" ValidateMessage="Please enter Date" >
                        </asp:TextBox>
                        <asp:ImageButton CssClass="icon-cal" ID="btnDate" runat="server" ImageUrl="~/images/Icon-calendar.png" />
                        <ajaxToolkit:CalendarExtender ID="CalendarExtender1" runat="server" TargetControlID="txtDate" PopupButtonID="btnDate" CssClass="" Format="MM/dd/yyyy" />
                    </div>
                    <div class="input-section" style="clear: both;">
                        <input id="txtTime" type="text" placeholder="Time in HH:MM AM/PM" mandatory="1" title="Time in HH:MM AM/PM" onchange="return validTime(this)" maxlength="8" ValidateMessage="Please enter Time in HH:MM" />
                    </div>
                    <div class="input-section">
                        <input id="txtRestorationtime" type="text" mandatory="1" placeholder="Restoration Time" title="Restoration Time" onkeypress="return isTime(event)" maxlength="2" ValidateMessage="Please enter Restoration Time" />
                    </div>
                    <div class="input-section" style="display: none;">
                        <input type="text" id="txtCircuitId" mandatory="0" maxlength="10" placeholder="Circuit Id" title="Circuit Id" />
                    </div>
                    <div class="input-section" id="Resolution" style="display: none;">
                        <select id="ddlResolution" title="Resolution">
                            <%--<option value="">--Select--</option>--%>
                            <option value="0">Unresolved</option>
                            <option value="1">Resolved</option>
                        </select>
                    </div>
                </div>
                <%--Start - Increased width of these boxes as they contain more data--%>
                <div class="input_right_box">
                    <div class="input-section">
                        <input type="text" id="txtCause"  mandatory="1" maxlength="50" placeholder="Cause" title="Cause" onkeypress="return IsHtmlTag(event);" ValidateMessage="Please enter Cause" />
                    </div>
                    <div class="input-section">
                        <input type="text" id="txtMessage" mandatory="1" maxlength="100" placeholder="Title" title="Title" onkeypress="return IsHtmlTag(event);" ValidateMessage="Please enter Title" />
                    </div>
                    <div class="input-section" style="width: 100%;">
                        <input type="text" id="txtReportInfo" mandatory="1" maxlength="100" placeholder="Report Information" style="width: 94%;" title="Report Information" onkeypress="return IsHtmlTag(event);" ValidateMessage="Please enter Report Information" />
                    </div>
                </div>
                  
                <%--End - Increased width of these boxes as they contain more data--%>
                <div class="outage_sbt_box">
                    <input type="button" class="submitBtn" id="btnCancel" style="float: left !important; margin-left: 200px;" value="Cancel" title="Cancel" onclick="window.location = 'Outage-Cancellation.aspx';" />
                    <input type="button" class="submitBtn" id="btnClear" value="Clear" title="Clear" onclick="Reset();" />
                    <input type="button" class="submitBtn" id="btnSubmit" value="Save" title="Save" style="margin: -1px -3px 15px 0px; float: none;" />
                     <%-- <asp:Button ID="btnSubmit" Text="Save" class="submitBtn" Style="margin: -1px -3px 15px 0px; float: none;" ToolTip="Save" ClientIDMode="Static" />--%>
                </div>
            </div>
        </div>
        <div class="grid-section" style="float: left; width: 100%; margin: 0px 0px 0px; position: relative; padding-right: 0px;">
            <div id="chartDiv">
                <div style="text-align: left; overflow: auto;">
                    <div style="position: absolute; right: 10px; top: 21px; width: 100px; height: 0px; background: #fff; color: #333; z-index: 9999;">
                        <input id="addPolygon" type="button" value="Draw Polygon" />
                        <input id="addPoint" type="button" value="Add Point" />
                        <input id="btnclear" type="button" value="Clear" />
                        <br />
                        <label id="lblGuide">
                        </label>
                    </div>
                    <div id="div-graph" style="width: 100%">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <span id="lblGeoErrorCode1" style="display: none;" globalize="ML_Outage_error_geoerror1">Please enable your access to Current Location</span>
    
    <asp:HiddenField ID="Latitude" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="Longitude" runat="server" ClientIDMode="Static" />

</asp:Content>
