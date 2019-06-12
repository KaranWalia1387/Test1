<%@ Page Title="Configure Notification" Language="C#" MasterPageFile="~/Configuration/Configuration.master" AutoEventWireup="true" CodeBehind="configure-inbox.aspx.cs" Inherits="AdminPanel.configure_inbox" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit.HTMLEditor" TagPrefix="HTMLEditor" %>
<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">

    <style>
        #rgtMail
        {
            
        }

        #ContentPlaceHolder1_rightpanel_editor_ctl02
        {
            border-left: 3px solid #f0f0f0;
            border-top: 3px solid #f0f0f0;
            border-bottom: 3px solid #f0f0f0;
        }
    
    </style>
    
    <link href="../css/Notification.css" rel="stylesheet" />
    <asp:HiddenField ID="hdnType" runat="server" Value="inbox" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnMessageId" runat="server" Value="" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnSort" runat="server" Value="0" ClientIDMode="Static" />
    <asp:HiddenField ID="replyaccno" runat="server" ClientIDMode="Static" />
    <input type="hidden" class="activeli_list" value="sidebar_nitiF" />
    <div class="top-header-area">
        <div class="Leftheader-Pannel" style="width: 35%;">
            <h2>Notification - <label id="lblHeading" style="font-weight:bold !important;" /> </h2>
        </div>
        <div class="Rightheader-Pannel" style="width: 65%; padding: 0 24px 0px 0; margin-bottom:0px;">
            <div class="right-notif-img">
               <%-- <a href="configure-outbox.aspx" style="top: -5px; position: relative; margin-right: 40px;">Notification Outbox</a>--%>
                <input type="button" id="btnBack" class="BacktoInbox" title="back" style="display: none; float: left; border: none;  vertical-align:top;" />
                <input type="image" id="btnPrevious" src="../images/notification_icon/icon-back.png"
                    title="Previous" alt="Previous" style="display: none; vertical-align:top;" />
                <input type="image" id="btnNext" src="../images/notification_icon/icon-forward.png"
                    title="Next" alt="Next" style="display: none; vertical-align:top;" />
                <asp:ImageButton runat="server" ID="btnSave" ImageUrl="~/images/saved-icon.png"
                    ToolTip="Save" CssClass="btnSave" style=" vertical-align:top;" />
                <input type="image" id="btnReply" src="../images/notification_icon/icon-reply.png"
                    title="Reply" alt="Reply" style="display: none; vertical-align:top;" />
                <asp:ImageButton runat="server" ID="btnDelete" ImageUrl="~/images/trash-icon.png"
                    ToolTip="Delete" CssClass="btnDelete" style=" vertical-align:top;" />
                <asp:ImageButton runat="server" ID="btnputback" ImageUrl="../images/notification_icon/poke-messages.png"
                    ToolTip="PutBack" CssClass="btnputback" style=" vertical-align:top;" />
            </div>
        </div>
        <div style="float: right; margin-right: 5px;">
        </div>
    </div>

    <div class="grid-section">

        <%--<div class="inner-right-left-section" id="menu">
            <ul class="tabs-inner">
                <li class="sidebar_outage"><a id="outage" href="configure-inbox.aspx?type=outage">Outage&nbsp;<asp:Label ID="lblOutage" runat="server" Text="" CssClass="lblOutages"></asp:Label></a></li>
                <li class="sidebar_billing"><a id="billing" href="configure-inbox.aspx?type=billing">Billing&nbsp;<asp:Label ID="lblBilling" runat="server" Text="" CssClass="lblBilling"></asp:Label></a></li>
                <li class="sidebar_service"><a id="service" href="configure-inbox.aspx?type=service">Services&nbsp;<asp:Label ID="lblService" runat="server" Text="" CssClass="lblService"></asp:Label></a></li>
                <li class="sidebar_connectme"><a id="connect me" href="configure-inbox.aspx?type=connect me">Connect Me&nbsp;<asp:Label ID="lblConnectme" runat="server" Text="" CssClass="lblConnectme"></asp:Label></a></li>
                <li class="sidebar_demandresponse"><a id="demand response" href="configure-inbox.aspx?type=demand response">Demand Response&nbsp;<asp:Label ID="lbldemandresponse" runat="server" Text="" CssClass="lbldemandresponse"></asp:Label></a></li>
                <li class="sidebar_sentemail"><a id="sent" href="configure-inbox.aspx?type=sent">Sent &nbsp;<asp:Label ID="lblsentitem" runat="server" Text="" CssClass="lblSentitem"></asp:Label></a></li>
                <li class="sidebar_saved"><a id="resolved" href="configure-inbox.aspx?type=resolved">Saved Mail</a></li>
                <li class="sidebar_trash"><a id="trash" href="configure-inbox.aspx?type=trash">Trash</a></li>
                <li class="sidebar_allemail"><a id="allmail" href="configure-inbox.aspx?type=allmail">All Email&nbsp;<asp:Label ID="lblInbox" runat="server" Text="" CssClass="lblOutages"></asp:Label></a></li>
                <li class="sidebar_outbox"><a id="outbox" href="configure-outbox.aspx?type=outbox">Notification Outbox&nbsp;<asp:Label ID="Label1" runat="server" Text="" CssClass="lblOutages"></asp:Label></a></li>
            </ul>
        </div>--%>
        <div class="inner-right-right-section" id="rgtMail">
            <div class="top-notif-inbox-section" style="display: block" id="divHeader">
                <div class="select_chech-box">
                    <input type="checkbox" id="chkall">
                </div>
                <div class="select_from">
                    <span><label  id="lblFromTo"></label></span>
                    <img src="../images/SortIcon.png" class="SortIcon btnFromSort" id="btnSortFrom"/> 
                    <input type="hidden" id="viewFrom" value="ASC"/>
                  <%--  <asp:ImageButton ID="btnFromSort" runat="server" ImageUrl="~/images/SortIcon.png" CssClass="SortIcon btnFromSort" OnClick="btnFromSort_Click" />
              --%>  

                </div>
                <div class="select_subject">
                    <span>Subject</span>
                     <img src="../images/SortIcon.png" class="SortIcon btnFromSort" id="btnSubjectSort"/> 
                     <input type="hidden" id="viewSubject" value="DESC"/>
                    <%--<asp:ImageButton ID="btnSubjectSort" runat="server" ImageUrl="~/images/SortIcon.png"
                        CssClass="SortIcon btnSubjectSort" OnClick="btnSubjectSort_Click" />--%>
                </div>
                <div class="select_date">
                    <span>Date</span>
                     <img src="../images/SortIcon.png" class="SortIcon btnFromSort" id="btnDateSort"/> 
                     <input type="hidden" id="viewDate" value="DESC"/>
                   <%-- <asp:ImageButton ID="btnDateSort" runat="server" ImageUrl="~/images/SortIcon.png"
                        CssClass="SortIcon btnDateSort" OnClick="btnDateSort_Click" />--%>
                </div>
            </div>
            <div class="message-section">
                <ul class="MailListing" id="ulNotificatons" style="height: 415px; " >
                </ul>
                <div id="MessageBody" style="display: none; height: 480px; scroll: auto;">
                    <div id="msgReply" style="display: none;">

                        <HTMLEditor:Editor runat="server" ID="editor" Height="300px" AutoFocus="true" Width="100%"
                            CssClass="htmleditor" Style="padding-top: 4%" />
                        <div style="margin: 5px;">
                            <asp:FileUpload ID="fileupd" runat="server" onchange="File_OnChange(this)" ClientIDMode="Static" />
                            <img id="btnRemoveFile" title="Remove" src="../images/notification_icon/Payment_DeleteIcon.png"
                                onclick="return removeFile();" style="display: none" />
                            <asp:Label ID="lblMessage" runat="server" Enabled="false"></asp:Label>
                        </div>

                        <div class="ReplyBtnContainer">
                            <asp:Button ID="btnSubmitReply" runat="server" Text="Send" CssClass="DefaultbtnsSmall"
                                OnClick="btnSubmitReply_Click" OnClientClick="return GetFileSize('fileupd')" ClientIDMode="Static" />
                            <input id="btnDiscard" type="button" value="Discard" class="DefaultbtnsSmall" />
                        </div>


                    </div>
                    <div class="DetailsMessageContainer message-body-section ">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <input type="hidden" id="hdnText"/>
    <script type="text/javascript">
        function validateeditorcontent() {
          //  try {
               // if ($find("<%= editor.ClientID %>").get_content().toString().replace(/&nbsp;/g, '').replace(/<br\s*[\/]?>/gi, '') == ' ' || $find("<%= editor.ClientID %>").get_content().toString().replace(/&nbsp;/g, '').replace(/<br\s*[\/]?>/gi, '') == '  ') {
                  //  $find("<%= editor.ClientID %>").set_content('');
                   // alert("Please Enter Message");
                   // return false;
               // }
               // else if ($find("<%= editor.ClientID %>").get_content() == '') {
                //    alert("Please Enter Message");
                 //   return false;
                //}
               // else { return true; }
           // }
           // catch (e) { return false; }
        }

        // START NEW UI 12/18/2014
        $(document).ready(function () {
            $('#collapseOne').addClass('in');
           
             
           
        });
        // END NEW UI 12/18/2014
    </script>
    <script src="../js/inbox-configure.js"></script>
    </label>
</asp:Content>
