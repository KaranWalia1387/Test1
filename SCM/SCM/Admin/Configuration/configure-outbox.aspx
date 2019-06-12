<%@ Page Title="Configure Send Notification" Language="C#" MasterPageFile="~/Configuration/Configuration.master" AutoEventWireup="true" CodeBehind="configure-outbox.aspx.cs" Inherits="AdminPanel.configure_outbox" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit.HTMLEditor" TagPrefix="cc1" %>
<%@ Register Src="~/Configuration/UserControl/usernameautocomplete.ascx" TagPrefix="uc1" TagName="usernameautocomplete" %>


<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
<script src="../js/configure-outbox.js"></script>
    <input type="hidden" class="activeli_list" value="sidebar_nitiF" />
    <link href="../css/Notification.css" rel="stylesheet" type="text/css" />
    <script src="../js/loader.js"></script>
    <script src="../js/blockScreen.js"></script>
    <asp:HiddenField ID="hdnType" runat="server" Value="inbox" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnMessageId" runat="server" Value="" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnSort" runat="server" Value="0" ClientIDMode="Static" />

     <asp:HiddenField ID="hdnCity" runat="server" ClientIDMode="Static" />
     <asp:HiddenField ID="hdnZip" runat="server"  ClientIDMode="Static" />
    <input type="hidden" id="PageValues" value="NotificationPage" />
    <div class="top-header-area">

        <div class="Leftheader-Pannel">
            <h2>Send Notification <%--NEW UI 12/18/2014--%>
            </h2>
        </div>
        <div style="float: right; margin-right: 5px;">
            <a href="configure-inbox.aspx">Notification Inbox</a>
        </div>
    </div>
    <div class="grid-section">
        <%--<div class="inner-right-left-section">
            <ul class="tabs-inner">
              
                <li class="sidebar_outage"><a id="outage" runat="server" href="configure-inbox.aspx?type=outage">Outage&nbsp;<asp:Label ID="lblOutage" runat="server" Text="" CssClass="lblOutages"></asp:Label></a></li>
                <li class="sidebar_billing"><a id="billing" runat="server" href="configure-inbox.aspx?type=billing">Billing&nbsp;<asp:Label ID="lblBilling" runat="server" Text="" CssClass="lblBilling"></asp:Label></a></li>
                <li class="sidebar_service"><a id="service" runat="server" href="configure-inbox.aspx?type=service">Services&nbsp;<asp:Label ID="lblService" runat="server" Text="" CssClass="lblService"></asp:Label></a></li>
                <li class="sidebar_connectme"><a id="connectme" runat="server" href="configure-inbox.aspx?type=connect me">Connect Me&nbsp;<asp:Label ID="lblConnectme" runat="server" Text="" CssClass="lblConnectme"></asp:Label></a></li>
                <li class="sidebar_demandresponse"><a id="demandresponse" runat="server" href="configure-inbox.aspx?type=demand response">Demand Response&nbsp;<asp:Label ID="lbldemandresponse" runat="server" Text="" CssClass="lbldemandresponse"></asp:Label></a></li>
                <li class="sidebar_sentemail"><a id="sentitem" runat="server" href="configure-inbox.aspx?type=sent">Sent &nbsp;<asp:Label ID="lblsentitem" runat="server" Text="" CssClass="lblSentitem"></asp:Label></a></li>
                <li class="sidebar_saved"><a id="saved" runat="server" href="configure-inbox.aspx?type=resolved">Saved Mail</a></li>
                <li class="sidebar_trash"><a id="trash" runat="server" href="configure-inbox.aspx?type=trash">Trash</a></li>
                <li class="sidebar_allemail"><a id="allmail" runat="server" href="configure-inbox.aspx?type=allmail">All Email&nbsp;<asp:Label ID="lblInbox" runat="server" Text="" CssClass="lblOutages"></asp:Label></a></li>
                <li class="sidebar_outbox"><a id="outbox" href="configure-outbox.aspx?type=outbox">Notification Outbox&nbsp;<asp:Label ID="Label1" runat="server" Text="" CssClass="lblOutages"></asp:Label></a></li>
            </ul>
        </div>--%>
        <div class="inner-right-right-section">
            <div class="table-responsive" id="outboxmsg">
                <table>
                    <tr>
                        <td width="50%">
                            <div class="user-outbox-area">
                                <label>* Type of Message : </label>
                            </div>
                            <div class="Text-outbox-area">
                                <asp:DropDownList ID="ddltypeofmessage" runat="server" mandatory="1" title="Message Type" ClientIDMode="Static">
                                </asp:DropDownList>
                            </div>
                        </td>
                        <td>
                            <div class="user-outbox-area">
                                <label>* Account Type : </label>
                            </div>
                            <div class="Text-outbox-area">
                                <asp:DropDownList ID="radioAccountType" runat="server" AutoPostBack="True" OnSelectedIndexChanged="radioAccountType_SelectedIndexChanged" title="Account Type" RepeatColumns="2" ClientIDMode="Static">
                                    <asp:ListItem Text="--Account Type--" Value=""></asp:ListItem>
                                    <asp:ListItem Selected="True" Value="1">Residential</asp:ListItem>
                                    <asp:ListItem Value="2">Commercial</asp:ListItem>
                                </asp:DropDownList>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="user-outbox-area">
                                <label>* Location: </label>
                            </div>
                            <div class="Text-outbox-area">
                                <asp:DropDownList ID="ddlcity" AutoPostBack="false" runat="server" CssClass="city" mandatory="1" ClientIDMode="Static" title="Location">
                                </asp:DropDownList>
                            </div>
                        </td>
                        <td>
                            <div class="user-outbox-area">
                                <label>* Mode Of Message: </label>
                            </div>
                            <div class="Text-outbox-area">
                                <asp:DropDownList ID="ddlMessageMode" runat="server" title="Mode Of Message" ClientIDMode="Static">
                                     <asp:ListItem Text="--Mode Of Message--" Value=""></asp:ListItem>
                                  <%--  <asp:ListItem Selected="True" Value="0">Text</asp:ListItem>--%>
                                    <asp:ListItem Selected="True" Value="1">Email</asp:ListItem>
                                    <asp:ListItem Value="2">Push</asp:ListItem>
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
                                <uc1:usernameautocomplete runat="server" ID="usernameautocomplete"  />
                                <br />
                                <span class="texttype hide" id="contactnumber"></span>
                                <%--    <ajax:AutoCompleteExtender ID="AutoCompleteExtender1" runat="server" TargetControlID="txtcustomername" MinimumPrefixLength="3" EnableCaching="true" CompletionSetCount="1" CompletionInterval="10" ServiceMethod="GetAutoFillCustNameList"   onclientpopulating="ShowImage" onclientpopulated="HideImage" OnClientItemOut="HideImage"  FirstRowSelected="true"> </ajax:AutoCompleteExtender>--%>
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
                            <%--<div class="user-outbox-area">
                                <label>Zip Code: </label>
                            </div>
                            <div class="Text-outbox-area" >
                                <asp:DropDownList ID="ddlZipCode" runat="server" ClientIDMode="Static" CssClass="zipcode" title="Zip Code">
                                </asp:DropDownList>
                            </div>--%>
                        </td>
                    </tr>
                </table>
                <div class="user-outbox-area email" style="width: 25%;">
                    <label>* Subject : </label>
                </div>
                <div class="Text-outbox-area email" style="width:75%;">
                    <asp:TextBox ID="txtmsgsubject" runat="server" Style="width:95%;" CssClass="txtmsgsubject" title="Subject" ClientIDMode="Static"></asp:TextBox>
                </div>
                <br />
                <div class="clear">
                    &nbsp;
                </div>
                <div class="message-section" id="MessageBody" style="margin-left:0px;">
                    <div class="LeftFilterPanelHeader" id="msgReply">
                        <div class="email" style="position:relative; width:99%;">
                            <div id="summernote"><p></p></div>
                        </div>
                        <div class="clear">
                            &nbsp;
                        </div>
                        <asp:TextBox onkeypress="return CheckLength(event);" onkeydown="return CheckLength(event);" title="Message" ID="txtMessage" Columns="20" Rows="5" Width="99%" runat="server" ClientIDMode="Static" CssClass="texttype hide" TextMode="MultiLine" MaxLength="200" style="resize:none;">

                        </asp:TextBox>
                        <div class="clear_both"></div>
                        <span style="color: red" class="texttype hide" id="spanTxt"></span>
                        <div class="ReplyBtnContainer email">
                            <asp:FileUpload ID="fileupd" runat="server" onchange="File_OnChange(this)"  ClientIDMode="Static"/>
                            <img id="btnRemoveFile" title="Remove" src="../images/Payment_DeleteIcon.png" onclick="return removeFile();" />
                            <asp:Label ID="lblMessage" runat="server" Enabled="false"></asp:Label>
                        </div>
                        <div class="ReplyBtnContainer">
                            <input type="button" id="btnSubmitReply" value="Send" class="submitBtn" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <style>
            #fileupd {
            display:inline;
          width: 165px;
            }
        </style>
        
        <script>
            var selectall = 0;//added for getting only textmsg user
            function CheckLength(e) {
                var keycode = e.keyCode ? e.keyCode : e.which;
                var textbox = document.getElementById("<%=txtMessage.ClientID%>").value;
                var mode = $("#ddlMessageMode").val();
                var txtbxlength = (mode == 0 || mode == 2) ? 200 : 500;
                if (textbox.trim().length >= txtbxlength) {

                    if (keycode == 8 || keycode == 46) {

                        return true;
                    }
                    else {

                        return false;
                    }
                }
                else {

                    return true;
                }
            }
            function validateconfiguration() {
                var isvalid = (ValidatePage('outboxmsg') && GetFileSize('fileupd'))

                var value = $('#summernote').summernote('code'); 
                if (value == "" && ($('#ddlMessageMode').val()) == "1") {
                    alert('Please Enter Message');
                    isvalid = false;
                }
                return isvalid;
            }

            isNotification = 1;
            $(document).on("click", "#outage", function () {
                window.location.href = "configure-inbox.aspx?type=outage&Notification=" + isNotification;

            });
            $(document).on("click", "#billing", function () {
                window.location.href = "configure-inbox.aspx?type=billing&Notification=" + isNotification;

            });
            $(document).on("click", "#service", function () {
                window.location.href = "configure-inbox.aspx?type=service&Notification=" + isNotification;

            });
            $(document).on("click", "#connectme", function () {
                window.location.href = "configure-inbox.aspx?type=connectme&Notification=" + isNotification;

            });
            $(document).on("click", "#demandresponse", function () {
                window.location.href = "configure-inbox.aspx?type=demandresponse&Notification=" + isNotification;

            });
            $(document).on("click", "#sentitem", function () {
                window.location.href = "configure-inbox.aspx?type=sent&Notification=" + isNotification;

            });
            $(document).on("click", "#saved", function () {
                window.location.href = "configure-inbox.aspx?type=resolved&Notification=" + isNotification;

            });
            $(document).on("click", "#trash", function () {
                window.location.href = "configure-inbox.aspx?type=trash&Notification=" + isNotification;

            });
            $(document).on("click", "#allmail", function () {
                window.location.href = "configure-inbox.aspx?type=allmail&Notification=" + isNotification;

            });
            // START NEW UI 12/18/2014
            $(document).ready(function () {
                //  $('#collapseOne').addClass('in');
                $(".sidebar_outbox").addClass('active');
                $('#collapseOne').show();

                // START NEW UI 12/24/2014
                $("#ddlcity").change(function (i, obj) {
                    if (!($('#ddlcity').val() == null || $('#ddlcity').val() == '')) {
                        var ddlcity = $('#ddlcity option:selected');
                        if ($(ddlcity).attr('key') == 'Zipcode') {
                            $('#hdnCity').val($(ddlcity).attr('cityid'));
                            $('#hdnZip').val($(ddlcity).val());
                        }
                        else {
                            $('#hdnCity').val($(ddlcity).val());
                        }
                    }
                });
                var result = configure_inbox.UnreadMessage().value;
                for (var i = 0; i < result.Rows.length; i++) {
                    $('#unReadOutage').text(result.Rows[i].Outage != '0' ? '(' + '' + result.Rows[i].Outage + ' )' : '');
                    $('#unReadInbox').text(result.Rows[i].Inbox != '0' ? '(' + '' + result.Rows[i].Inbox + ' )' : '');
                    $('#unReadConnectMe').text(result.Rows[i].ConnectMe != '0' ? '(' + '' + result.Rows[i].ConnectMe + ' )' : '');
                    $('#unReadService').text(result.Rows[i].Service != '0' ? '(' + '' + result.Rows[i].Service + ' )' : '');
                    $('#unReadBilling').text(result.Rows[i].Billing != '0' ? '(' + '' + result.Rows[i].Billing + ' )' : '');
                    $('#unReadDemandResponse').text(result.Rows[i].DemandResponse != '0' ? '(' + '' + result.Rows[i].DemandResponse + ' )' : '');
                }
                // END NEW UI 12/24/2014
            });
            // END NEW UI 12/18/2014
        </script>
</asp:Content>
