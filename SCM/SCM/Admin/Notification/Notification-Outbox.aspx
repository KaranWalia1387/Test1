<%@ Page Title="Notification-Outbox" Language="C#" MasterPageFile="~/Notification/Notification.master" AutoEventWireup="true" CodeBehind="Notification-Outbox.aspx.cs"
    ValidateRequest="false" Inherits="AdminPanel.Notification.Notification_Outbox" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit.HTMLEditor" TagPrefix="cc1" %>
<%@ Register Src="~/Configuration/UserControl/usernameautocomplete.ascx" TagPrefix="uc1" TagName="usernameautocomplete" %>
<%@ Register Src="~/Configuration/UserControl/usernameautocompleteName.ascx" TagPrefix="uc2" TagName="usernameautocompleteName" %>


<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">

    <script src="../js/Notification-Outbox.js"></script>
    <script>
        $(document).ready(function () {
          //  $('#summernote').summernote();
            
            $("li.sidebar_allmail_inner").removeClass("active");
            $("#sidebar-programs").addClass('hide');
        });
        function Count(text, long) {
            var maxlength = new Number(long); // Change number to your max length.
            if (text.value.length > maxlength) {
                text.value = text.value.substring(0, maxlength);
                alert(" More than " + long + " characters not allowed");
            }
        }
    </script>
    <style type="text/css">
        .ui-front {
            z-index: 9999999 !important;
        }

        .ajax__htmleditor_editor_container {
            background: #f3f3f3 !important;
            border: 1px solid #f3f3f3 !important;
        }

        .ajax__htmleditor_editor_toptoolbar, .ajax__htmleditor_editor_bottomtoolbar {
            padding: 3px !important;
        }

        .ajax__htmleditor_editor_editpanel {
            background: #fff;
        }

        .ajax__htmleditor_editor_bottomtoolbar {
            display: none;
        }

        .submit-button {
            border-radius: 5px !important;
            color: #f0f0f0 !important;
            float: right;
            font-size: 14px !important;
            height: 30px !important;
            margin-bottom: 15px;
            margin-right: 10px;
            padding: 3px 27px !important;
            text-align: center;
            width: 135px !important;
            font-weight: normal;
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

        .LeftFilterPanelHeader .texttype, .LeftFilterPanelHeader .required {
            float: left;
        }
    </style>
    <input type="hidden" class="activeli_list" value="sidebar_outbox" />
    <link href="../css/Notification.css" rel="stylesheet" type="text/css" />
    <script src="../js/loader.js"></script>
    <script src="../js/blockScreen.js"></script>
    <asp:HiddenField ID="hdnType" runat="server" Value="inbox" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnMessageId" runat="server" Value="" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnSort" runat="server" Value="0" ClientIDMode="Static" />

    <asp:HiddenField ID="hdnCity" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnZip" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="filehandlerpath" runat="server" ClientIDMode="Static" Value='<%#ConfigurationManager.AppSettings["portalfilehandler"]%>' />
    <input type="hidden" id="PageValues" value="NotificationPage" />
    <div class="top-header-area">

        <div class="Leftheader-Pannel">
            <h2>Send Notification <%--NEW UI 12/18/2014--%>
            </h2>
        </div>
        <div style="float: right; margin-right: 5px;">
            <a href="Notification-Inbox.aspx">Notification Inbox</a>
        </div>
    </div>
    <div class="grid-section">

        <div class="inner-right-right-section">
            <div class="table-responsive" id="outboxmsg" style="overflow: visible;">
                <table>
                    <tr>
                        <td width="50%">
                            <div class="user-outbox-area">
                                <label>Type of Message: </label>
                            </div>
                            <div class="Text-outbox-area">
                                <asp:DropDownList ID="ddltypeofmessage" runat="server" mandatory="1" title="Message Type" ClientIDMode="Static" ValidateMessage="Please select Type of Message">
                                </asp:DropDownList>
                            </div>
                        </td>
                        <td>
                            <div class="user-outbox-area">
                                <label>Account Type: </label>
                            </div>
                            <div class="Text-outbox-area">

                                <asp:DropDownList ID="radioAccountType" mandatory="1" runat="server" title="Account Type" RepeatColumns="2" ClientIDMode="Static" ValidateMessage="Please select Account Type">
                                    <asp:ListItem Text="--Account Type--" Value="" Selected="True"></asp:ListItem>
                                    <asp:ListItem Value="1">Residential</asp:ListItem>
                                    <asp:ListItem Value="2">Commercial</asp:ListItem>
                                </asp:DropDownList>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="user-outbox-area">
                                <label>Location: </label>
                            </div>
                            <div class="Text-outbox-area">
                                <asp:DropDownList ID="ddlcity" AutoPostBack="false" runat="server" CssClass="city" mandatory="1" ClientIDMode="Static" title="Location" ValidateMessage="Please select Location">
                                </asp:DropDownList>
                            </div>
                        </td>
                        <td>
                            <div class="user-outbox-area">
                                <label>Mode Of Message: </label>
                            </div>
                            <div class="Text-outbox-area">
                                <asp:DropDownList ID="ddlMessageMode" runat="server" mandatory="1" title="Mode Of Message" ClientIDMode="Static" ValidateMessage="Please select Mode of Message">
                                    <asp:ListItem Text="--Mode Of Message--" Value=""></asp:ListItem>
                                    <%--<asp:ListItem Value="0">Text</asp:ListItem>--%>
                                    <asp:ListItem Selected="True" Value="1">Email</asp:ListItem>
                                    <asp:ListItem Value="2">Push Notification</asp:ListItem>
                                   <%-- <asp:ListItem Value="3">IVR</asp:ListItem>--%>
                                </asp:DropDownList>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="user-outbox-area">
                                <label>Customer Name: </label>
                            </div>
                            <div class="Text-outbox-area" title="Customer Name">
                                <uc1:usernameautocomplete runat="server" ID="usernameautocomplete" />
                                <br />
                                <span class="texttype hide" id="contactnumber" style="display: none"></span>

                            </div>
                        </td>
                        <td>
                            <div style="display: none">
                                <div class="user-outbox-area">
                                    <label>Account Number: </label>
                                </div>
                                <div class="Text-outbox-area">
                                    <asp:DropDownList ID="ddlaccountnumber" runat="server" title="Account Number">
                                        <asp:ListItem Text="--Select--" Value=""></asp:ListItem>
                                    </asp:DropDownList>
                                </div>
                            </div>
                            &nbsp;
                         
                        </td>
                    </tr>
                </table>
                <div class="user-outbox-area email" style="width: 21.5%;">
                    <label>Subject: </label>
                </div>
                <div class="Text-outbox-area email" style="width: 75%;">
                    <asp:TextBox ID="txtmsgsubject" runat="server" Style="width: 97%;" CssClass="txtmsgsubject" title="Subject" ClientIDMode="Static" placeholder="Subject" ValidateMessage="Please enter Subject"></asp:TextBox>
                    <%--  <span class="required" style="color: rgb(149, 2, 2); padding-left: 3px; font-size: 19px;">*</span>--%>
                </div>
                <br />
                <div class="clear">
                    &nbsp;
                </div>
                <div class="message-section" id="MessageBody" style="margin-left: 0px;">
                    <div class="LeftFilterPanelHeader" id="msgReply">
                        <div class="email" style="position: relative;width: 93%;margin-left: 12px; margin-bottom: 10px;">
                            <%--<cc1:Editor ID="txtEditor"  runat="server" style="width:95%;margin-left:12px;" />--%>
                            <div id="summernote" class="summernote">
                                <p></p>
                            </div>
                            <span class="required" style="color:#950202;padding-left:3px;font-size: 19px;position: absolute;top: 0;right: -10px;">*</span>
                        </div>
                        <div class="clear">
                            &nbsp;
                        </div>
                        <asp:TextBox title="Message" ID="txtMessage" Columns="20" Rows="5" Width="96.5%" runat="server" onKeyUp="Count(this,140)" onChange="Count(this,140)" ClientIDMode="Static" CssClass="texttype hide mstType" TextMode="MultiLine" MaxLength="140" Style="resize: none;">

                        </asp:TextBox>

                        <div class="clear_both"></div>
                        <span style="color: red;" class="texttype hide" id="spanTxt"></span>
                        <div style="width: 100%; float: left;">
                            <div class="ReplyBtnContainer email" style="float: left; margin-top: 10px; display: none;">
                                <span class="submit-button btn btn-primary btn-file" id="lblFileupload" style="float: left !important; line-height: 22px; font-size: 15px; padding: 3px 11px !important;">Choose File                
                            <asp:FileUpload ID="fileupd" runat="server" onchange="File_OnChange(this)" ClientIDMode="Static" />
                                </span>
                                <i id="nofile">No File Chosen</i>
                                <img id="btnRemoveFile" title="Remove" src="../images/Payment_DeleteIcon.png" onclick="return removeFile();" />
                                <asp:Label ID="lblMessage" runat="server" Enabled="false"></asp:Label>
                            </div>
                           
                        </div>
                    </div>
                </div>
                 <div class="ReplyBtnContainer" style="float: right; padding-right: 15px;">
                                <input type="button" id="btnSubmitReply" value="Send" class="submitBtn" />
                            </div>
            </div>
        </div>
        <style>
            #fileupd {
                display: inline;
                width: 165px;
            }
        </style>

        <script>
            var selectall = 0;//added for getting only textmsg user            
            function validateconfiguration() {
                var isvalid = (ValidatePage('outboxmsg') && GetFileSize('fileupd'))

               // var objEditor = $find("ContentPlaceHolder1_rightpanel_txtEditor_ctl02_ctl00");
                var value = $('#summernote').summernote('code'); //objEditor.get_content();
                if (value == "" && ($('#ddlMessageMode').val()) == "1") {
                    alert('Please Enter Message');
                    isvalid = false;
                }
                return isvalid;
            }

            isNotification = 1;
            function CharLimit(input, maxChar) {
                var len = $(input).val().length;
                if (len > maxChar) {
                    $(input).val($(input).val().substring(0, maxChar));
                }
            }
        </script>
</asp:Content>
