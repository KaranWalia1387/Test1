<%@ Page Title="Blocked IP" Language="C#" MasterPageFile="~/UserManagement/UserManagement.master" AutoEventWireup="true" CodeBehind="BlockedIP.aspx.cs" Inherits="AdminPanel.BlockedIP" %>

<%@ Import Namespace="AdminPanel" %>
<%@ Import Namespace="Newtonsoft.Json" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <link href="css/main.css" rel="stylesheet" type="text/css">
    <input type="hidden" class="activeli_list" value="sidebar_userreport" />
    
    <script type="text/javascript" src="//maps.google.com/maps/api/js?sensor=false"></script>
    <script src="../js/blockScreen.js"></script>
    <script src="../js/bootstrap-tabs.js"></script>
    <link href="../css/w2ui-1.4.2.min.css" rel="stylesheet" />
    <script src="../js/popup.js"></script>
    <script src="../js/w2ui-1.4.2.min.js" type="text/javascript"></script>

    <style type="text/html">
        #jqxgrid {
            border-radius: 0 !important;
        }

        #jqxgrid {
            border-radius: 0 !important;
        }

        #jqxchildgrid {
            border-radius: 0 !important;
        }

        #gridbox {
            border-radius: 0 !important;
        }

        .jqx-widget .jqx-grid-cell, .jqx-widget .jqx-grid-column-header, .jqx-widget .jqx-grid-group-cell {
            border-color: #ddd !important;
        }

        input:disabled:not([type="button"]), select:disabled, textarea:disabled, input[readonly]:not([type="button"]), select[readonly], textarea[readonly] {
            background-color: #fff !important;
        }

        .jqx-fill-state-hover {
            background: #f8fafb !important;
        }

        .jqx-fill-state-pressed {
            background: #edeeee !important;
        }

        .jqx-grid-column-header {
            padding-left: 10px;
            font-size: 13px !important;
        }

        .jqx-grid-cell-alt {
            background: #f8fafb !important;
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
    </style>

    <script>
        var selectall = 1;
        var userRights = '<%=JsonConvert.SerializeObject(SessionAccessor.UserRightList)%>';
        var userEditRights = userRights.indexOf('<%=UserRights.UserManagementEdit%>', '<%=StringComparer.InvariantCultureIgnoreCase%>') >= 0;
        var UserResetPasswordRights = userRights.indexOf('<%=UserRights.UserManagementResetPassword%>') >= 0;
        var UserStatusRights = userRights.indexOf('<%=UserRights.UserManagementChangeStatus%>') >= 0;
        var UserReportRights = userRights.indexOf('<%=UserRights.UserManagementReport%>') >= 0;

        $(function () {
            $('#myTab a:last').tab('show');
        });

        $(document).ready(function () {
            $("img").removeAttr("title");
        });
    </script>

    <asp:HiddenField ID="hdnParamValues" runat="server" ClientIDMode="Static" />
    <script src="../js/jqxGrid/jqxscrollbar.js"></script>
    <script src="../js/BlockedIP.js"></script>
   
    <uc1:jqxGrid runat="server" />

    
    </asp:ScriptManager>
    <div class="top-header-area">
        <div style="float: left; width: 85%;">
            <h2 style="padding-left: 20px;">Blocked IP Report</h2>
        </div>
    </div>
    <div class="grid-section">
        <div id="jqxgrid" class="jqgrid"></div>
    </div>
    <div id="page_loader">
    </div>
</asp:Content>
