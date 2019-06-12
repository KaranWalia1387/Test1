<%@ Page Title="Users" Language="C#" MasterPageFile="~/Administration.Master" AutoEventWireup="true" CodeBehind="User.aspx.cs" Inherits="AdminPanel.User" %>

<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">

    <link href="<%#string.Format("{0}/css/font-awesome.css",AdminPanel.Common.url)%>" rel="stylesheet" />
    <script src="<%#string.Format("{0}/js/popup.js",AdminPanel.Common.url)%>"  ></script>
    <script>
        $(".sidebar_userreport").addClass("active_new");
    </script>
    <style>
        .details, .deleteRole {
            cursor: pointer;
        }

        ul.tabs li:hover, ul.tabs li.active_new {           
            color: #fff !important;
        }

        ul.tabs li:hover, ul.tabs li.active_new a {            
                color: #fff !important;
        }

        /*ul.tabs li.sidebar_userreport a:hover, ul.tabs li.sidebar_userreport.active_new a {
        color: #fff;
        background: url(../images/icon_user_report_sidebar_RO.png) no-repeat 23px 6px;
    }*/


        .userAddDetails .tab-pane {
            background: #fff;
            margin-left:20px;
        }

        .modal-body, .modal-content {
            background: #fff;
        }

        .popup_left_content_area_home {
            float: left;
            padding-bottom: 2%;
            padding-right: 1%;
            width: 40%;
        }

        .legend {
            font-weight: bold !important;
            color: #333;
        }

        #sSec1, #sSec2, #sRole, input[type="text"], input[type="password"], input[type="number"], input[type="email"],
        input[type="tel"], input[type="password"] {
            display: block;
            width: 97%;
            margin: 0 0 20px 0;
            border: 1px solid #ccc;
            font-size: 1em;
            padding: 5px;
            -moz-border-radius: 5px;
            -webkit-border-radius: 5px;
            border-radius: 5px;
            behavior: url(/entreg/assets/scripts/external/PIE.htc);
            position: relative;
            background: #fff;
        }

        .red-border {
            border: 1px solid #ccc !important;
        }

        .text.red-border {
            border: 1px solid #ccc !important;
        }

        .btn-primary {
            color: #fff !important;
            background-color: #758386 !important;
            border-color: #758386 !important;
        }

           #jqxgrid {
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

        /*.jqx-widget-content {
            font-family: "Helvetica Neue",Helvetica,Arial,sans-serif !important;
            font-style: normal;
        }*/

        .jqx-grid-cell-alt {
            background: #f8fafb !important;
        }
    </style>
    <script>
        var databindtogrid;
        var usertable;
        var autoheightbool = false;      
    </script>
    <script src="../js/AdminUser.js"></script>
    <uc1:jqxGrid runat="server" />
   
    <div class="top-header-area" style="float: left;">
        <div style="float: left; width: 85%;">
            <h2 style="padding-left: 20px;">Users</h2>
        </div>
        <div style="float: right; padding-right: 20px;">
            <a id="addUser" href="#" data-backdrop="true" data-keyboard="true" data-toggle="modal" data-target=".userAddDetails" style="text-decoration: none;">
                <i class="fa fa-plus-circle icon_color"></i>
                Add User</a>
       
        </div>
    </div>
    <div class="grid-section">
        <div id="jqxgrid" class="jqgrid"></div>
    </div>
    <input type="hidden" id="hdnValue" />

    <div id="userAddDetails" class="modal fade userAddDetails" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="position: fixed; overflow: hidden">
        <%--Bug ID: 6315--%>
        <div class="modal-dialog popup_area" style="height: 100%; margin-top: 6%;">
            <div class="modal-content" style="width: 80%; margin: auto; height: auto; padding-bottom: 10px;">
                <div class="modal-header">
                    <button type="button" id="btnClose" data-dismiss="modal">
                        <img src="../images/popup_close.png" title="Close" /></button>
                    <h4 class="modal-title" id="H2"></h4>
                </div>
                <div class="modal-body" style="padding-right: 0px !important; float: left;">
                    <div class="divDialogElements">
                        <div id="my-tab-content" class="tab-content">
                            <div class="active tab-pane" id="home">
                                <div class="popup_left_content_area_home">
                                    <%--<span style="color:red">*</span>--%> <%--As per BRD sheet--%>
                                    <label id="for-input-username" class="legend">Enter Username</label><%--Bug ID: 6316--%>
                                </div>
                                <div class="popup_right_content_area_home" style="padding-left: 45%">
                                    <input type="text" name="userName" ValidateMessage="Please enter Username" title="Username" maxlength="30" style="width: 70%; float: left;" value="" tabindex="9" id="input-username" class="text" autocomplete="off" mandatory="1" />
                                    <div id="check-username" style="float: left; margin-left: -9px; margin-right: 8px; margin-top: -3%;">
                                        <a class="submitBtn" href="#" id="a-checkname">Check This Name</a>
                                    </div>
                                </div>
                                <div style="clear: both;"></div>
                                <div class="popup_left_content_area_home" style="padding-top: 2%">
                                    <%--<span style="color:red">*</span>--%><%--As per BRD sheet--%>
                                    <label id="Label3" class="legend">Email</label>

                                </div>
                                <div class="popup_right_content_area_home" style="padding-top: 2%; padding-left: 45%">
                                    <input type="text" name="userName" ValidateMessage="Please enter a valid Email" title="Email" maxlength="50" style="width: 70%; float: left;" value="" tabindex="9" id="input-email" class="text" autocomplete="off" mandatory="1" />

                                </div>
                                <div style="clear: both;"></div>
                                <div class="popup_left_content_area_home">
                                    <%--<span style="color:red">*</span>--%><%--As per BRD sheet--%>
                                    <label id="Label1" class="legend">Enter Password</label>
                                    <br />
                                    <div style="font-size: 10px; padding-left: 2%; font-weight: normal">Passwords must be between 8 to 16 characters long, including an uppercase and lowercase letter, a number, and a special character. They are case-sensitive</div>
                                    <%-- <span style="color:red">*</span>--%><label style="display: block;">Password</label>
                                    <input type="password" id="password" ValidateMessage="Please enter Password" maxlength="16" title="Password" style="height: 12%; width: 87%;" onkeypress="if(event.keyCode==32){return false;}" mandatory="1" />
                                    <br />
                                    <%--<span style="color:red">*</span>--%><%--As per BRD sheet--%>
                                    <%--<label style="display:block; clear:both;">Re-Enter Password</label>--%>
                                    <label style="display: block; clear: both;">Confirm Password</label>
                                    <input type="password" id="retypePassword" ValidateMessage="Please confirm the Password" style="height: 12%; width: 87%;" title="Confirm Password" maxlength="16" onkeypress="if(event.keyCode==32){return false;}" mandatory="1" />
                                  
                                </div>
                              <div class="popup_right_content_area_home" style="margin-left: 45%">
                                  <%--<span style="color:red">*</span>--%><%--As per BRD sheet--%>
                                    <label id="Label4"  class="legend">Pick Role</label>
                                    <br />
                                    <br />
                                        
                                    <select id="sRole" ValidateMessage="Please select Role" multiple="multiple" size="8" title="Role" style="width: 70%; text-align: left;
    padding-left: 10px; display: inline-block; vertical-align: top;" mandatory="1">
                                    </select>
                                    <a class="submitBtn" id="submit" style="display: block; line-height: 19px;">Save</a>

                                
                                </div>
                        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
