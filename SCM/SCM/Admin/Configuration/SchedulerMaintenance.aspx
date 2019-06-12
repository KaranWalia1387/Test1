<%@ Page Title="Schedule Maintenance" Language="C#" MasterPageFile="~/Administration.master" AutoEventWireup="true" CodeBehind="SchedulerMaintenance.aspx.cs" Inherits="AdminPanel.SchedulerMaintenance" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <link rel="stylesheet" href="../include/jquery-ui-1.8.14.custom.css" type="text/css" />
    <link rel="stylesheet" href="../include/jquery.ui.timepicker.css?v=0.3.1" type="text/css" />
    <script type="text/javascript" src="../include/jquery.ui.core.min.js"></script>
    <script type="text/javascript" src="../include/jquery.ui.widget.min.js"></script>
    <script type="text/javascript" src="../include/jquery.ui.tabs.min.js"></script>
    <script type="text/javascript" src="../include/jquery.ui.position.min.js"></script>
    <script src="../include/jquery.ui.timepicker.js"></script>
  
    <script src="../js/configure-SchedulerMaintenance.js"></script>
    <style>
        .filter-section {
            margin: -5px 0px 0px 0px;
            padding: 5px 0px 8px 0px;
            width: 100%;
            overflow: visible;
            /*background: #f4f4f4;*/
        }



        .input_section_box {
            width: 100%;
        }

        .input-section {
            float: left;
            margin: 0 5px 0 0;
            width: 100%;
        }

        .inpt_box_width {
            width: 30%;
            MARGIN-LEFT: 19px;
            margin-bottom: 15px;
            margin-top: 15px;
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
            overflow: auto;
            overflow-x:hidden !important;
        }


        .ajax__htmleditor_editor_container {
            background: #f3f3f3 !important;
            border: 1px solid #F0F0F0 !important;
        }

        .ajax__htmleditor_editor_toptoolbar, .ajax__htmleditor_editor_bottomtoolbar {
            background-color: #F0F0F0;
            padding: 3px;
        }
    </style>
    
    <input type="hidden" class="activeli_list" value="sidebar_Scheduler_Maintenance" />

    <div class="top-header-area">
        <div style="float: left; width: 85%;">
            <h2>Schedule Maintenance</h2>
        </div>
    </div>
    <div class="filter-section" id="divMaintenance">
        <div class="input-section inpt_box_width" style="position: relative;">
            <asp:TextBox ID="txtDate" ClientIDMode="Static" ReadOnly="true" runat="server" ToolTip="Scheduler Maintenance Date" mandatory="1" placeholder="Scheduler Maintenance Date" CssClass="DateInputbox" Style="background: #fff !important;">
            </asp:TextBox>
            <asp:ImageButton CssClass="icon-cal" ID="btnDate" runat="server" ImageUrl="~/images/Icon-calendar.png" />
            <cc1:CalendarExtender ID="CalendarExtender1" runat="server" TargetControlID="txtDate" PopupButtonID="btnDate" Format="MM/dd/yyyy" />
        </div>
        <div class="input-section inpt_box_width">
            <input id="txtTime" type="text" placeholder="Time in HH:MM" mandatory="1" title="Time in HH:MM" onkeypress="return isTime(event)" maxlength="5" ValidateMessage="Please enter Time in HH:MM format" />
        </div>

        <div class="input-section inpt_box_width">
            <input id="txtDurationtime" type="text" mandatory="1" placeholder="Duration In Min" title="Duration" onkeypress="return isTime(event)" maxlength="3" />
        </div>
        <div class="input-section" style="width: 100%;">
           
            <div id="summernote">
                <p></p>
            </div>


        </div>
        <div class="input-section inpt_box_width" style="width: 100%;">
            <input id="chkbxenable" type="checkbox" /><span> Enable </span>

        </div>
    </div>

    <div class="outage_sbt_box">
        <input type="button" class="submitBtn" id="btnClear" value="Clear" title="Clear" />
        <input type="button" id="btnSave" value="Save" class="submitBtn" style="margin: -1px -3px 15px 0px; float: none;" title="Save" />
    </div>
</asp:Content>
