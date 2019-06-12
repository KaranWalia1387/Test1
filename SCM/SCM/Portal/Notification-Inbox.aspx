<%@ Page Title="Notifications" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true"
    CodeBehind="Notification-Inbox.aspx.cs" Inherits="CustomerPortal.Notification_Inbox" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <%: System.Web.Optimization.Styles.Render("~/Content/cssNotificationInbox") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsNotificationInbox")%>
    <style>
        #btnSubmitReply span{
            text-transform: capitalize !important
        }
        .energy_mid_box {
            overflow: visible !important;
        }

        .nav-alrtmsgs {
               overflow: auto;
    height: 500px;
    overflow-x: hidden;
        }
        .energy_mid_box .right_content_box {
    height: 94%  !important; 
}
        .btnDelete  i, .btnsave i {
      margin-right: 0 !important; 
      cursor:pointer;
}
        .btnsave{
            cursor:pointer;
        }
    </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <asp:HiddenField ID="hdnType" runat="server" Value="inbox" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnMessageId" runat="server" Value="" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnSort" runat="server" Value="" ClientIDMode="Static" />
    <input type="hidden" class="activeli_list" value="nitiF" />
    <section class="inner_mid_section" id="devices">
        <div class="container inner-mid-container">
            <div class="energy_mid_box">
                <h1><img src="images/icon_notif_sidebar.svg" style="padding-right:5px; margin-top: -1px; float: left;" />
                    <span class="head_icon_flat icon_notifications"></span>
                    <span globalize="ML_SETTING_Lbl_Notifications"> <%= CustomerPortal.Translator.T("ML_SETTING_Lbl_Notifications") %> </span>
                    <div class="back_notification_btn" style="float:right; width:82%;  padding-right:10px;">
                     <div class="BacktoInbox_flat_ico" style="float: left; width: 100px;">
                            <input type="button" id="btnBack" runat="server" class="BacktoInbox" value="" clientidmode="Static" globalize="ML_Notification_div_Back" title="" style="display: none;" />
                        </div>
                        <div class="InboxIcons" style="float:right;">
                            <input type="image" id="btnPrevious" src="images/notification_icon/icon-back.png"  runat="server"
                                title="" alt="Previous" style="display: none; vertical-align:top;" globalize="ML_Notification_div_Previous" clientidmode="Static" />
                            <input type="image" id="btnNext" src="images/notification_icon/icon-forward.png"  runat="server" visible="false"
                                title="" alt="Next" style="display: none; vertical-align:top;" globalize="ML_Notification_div_Next" clientidmode="Static"/>
                           <%-- <img  id="btnSave"  runat="server" src="images/notification_icon/saved-icon.png" globalize="ML_Notification_div_Save" visible="true" 
                                title="" class="btnSave"  style="display:none; vertical-align:top;" clientidmode="Static" />--%>
                            <input type="image" id="btnReply" src="images/notification_icon/icon-reply.png"  runat="server" visible="false"
                                title="" alt="Reply" style="display:none; vertical-align:top;" globalize="ML_Notification_div_Reply" clientidmode="Static"/>
                            <img src="images/notification_icon/Trash_Icon.png" runat="server" id="btnDelete" style="display:none; vertical-align:top;" class="btnDelete" title="" globalize="ML_Notification_div_Delete" />
                           <%-- <img runat="server" id="btnputback" src="images/notification_icon/poke-messages.png" runat="server" clientidmode="Static"
                              title="" class="btnputback" style="vertical-align:top;" globalize="ML_Notification_div_PutBack" />--%>
                        </div></div>
                </h1>
               <div class="sidebar_toggle">Sidebar Navigation</div>
               <div class="nav_left">
                    <%--Notification issue--%>
                    <ul class="nav-alrtmsgs">
                                <li class="sidebar_inboxmains" type="7" alt="Page" usagetype="PU" id="inbox" runat="server" clientidmode="Static">
                                <a href="#"> 
                                    <i class="fa fa-inbox"></i>
                                    <span globalize="ML_Notification_Cell_Label_Inbox"><%= CustomerPortal.Translator.T("ML_Notification_Cell_Label_Inbox") %></span> 
                                    <span class="label label-danger pull-right inbox-notification"  id="lblInbox" ></span></a></li>
                                <li id="outage" type="1" alt="Page" class="sidebar_report_outage" runat="server" clientidmode="Static">
					            <a href="#"> 
                                    <i class="fa fa-exclamation-triangle">
                                    </i><span globalize="ML_Notification_Cell_Label_Outage" ><%= CustomerPortal.Translator.T("ML_Notification_Cell_Label_Outage") %></span> 
                                    <span class="label label-danger pull-right inbox-notification"  id="lblOutage" ></span></a></li>
					             <li id="billing" type="4" alt="Page" runat="server" class="sidebar_favourites "  clientidmode="Static">
					             <a href="#"> <i class="fa fa-usd"></i>
                                     <span globalize="ML_Notification_Cell_Label_Billing"><%= CustomerPortal.Translator.T(CustomerPortal.SessionAccessor.PrepaidPayment=="Prepaid"?"ML_MyAccount_Dropdn_Txt_Prepay": "ML_Notification_Cell_Label_Billing") %></span> 
                                     <span class="label label-danger pull-right inbox-notification"  id="lblBilling" runat="server" clientidmode="Static"></span></a></li>
                          <%if (CustomerPortal.SessionAccessor.scmexpress == "0")
                              {%>
					              <li id="service" type="3" alt="Page" class="sidebar_drafts" runat="server" clientidmode="Static">
					              <a href="#"> <i class="fa fa-wrench"></i>
                                      <span globalize="ML_Notification_Cell_Label_Service"><%= CustomerPortal.Translator.T("ML_Notification_Cell_Label_Service") %></span> 
                                      <span class="label label-danger pull-right inbox-notification"  id="lblService" runat="server" clientidmode="Static"></span></a></li>
                          <%} %>
					              <li id="connectme" type="2" alt="Page" class="sidebar_connect " runat="server" clientidmode="Static">
					              <a href="#"> <i class="fa fa-mobile"></i>
                                      <span globalize="ML_Notification_Cell_Label_ConnectMe"><%= CustomerPortal.Translator.T("ML_Notification_Cell_Label_ConnectMe") %></span> 
                                      <span class="label label-danger pull-right inbox-notification"  id="lblConnectme" runat="server" clientidmode="Static"></span></a></li>

                                  <li class="sidebar_inboxmains" type="5" alt="Page" usagetype="PU" id="demandresponse" runat="server" clientidmode="Static">
                                <a href="#"> <i class="fa fa-bar-chart"></i><span globalize="ML_Notification_Navigation_DemandResponse"><%= CustomerPortal.Translator.T("ML_Notification_Navigation_DemandResponse") %></span> 
                                    <span class="label label-danger pull-right inbox-notification"  id="lbldemandresponse" runat="server" clientidmode="Static"></span>
                                 </a>
                                  </li>
                                <li id="leakalert" type="13" runat="server" alt="Page" class="sidebar_leakalert" clientidmode="Static">
					             <a href="#"> <span globalize="ML_Setting_Span_LeakAlert"><%= CustomerPortal.Translator.T("ML_Setting_Span_LeakAlert") %></span>
                                      <span class="label label-danger pull-right inbox-notification"  id="lblleakalert" runat="server" clientidmode="Static"></span></a>
                                  </li>

                                 <li id="loginissue" type="6" runat="server" alt="Page" class="sidebar_loginissue" clientidmode="Static">
					             <a href="#"> <span globalize="ML_Setting_Span_LoginIssue"><%= CustomerPortal.Translator.T("ML_Setting_Span_LoginIssue") %></span>
                                      <span class="label label-danger pull-right inbox-notification"  id="lblloginissue" runat="server" clientidmode="Static"></span></a>
                                  </li>


                                    <li id="sentitem" type="8" alt="Page" class="sidebar_sent" runat="server" clientidmode="Static" >  
					            <a href="#"> <i class="fa fa-paper-plane"></i>
                                    <span globalize="ML_Notification_Cell_Label_Sent"><%= CustomerPortal.Translator.T("ML_Notification_Cell_Label_Sent") %></span></a>

                                    </li>
					             <li id="saved" type="10" alt="Page" class="sidebar_saved-mail" runat="server" clientidmode="Static" >
					             <a href="#"> <i class="fa fa-star"></i>
                                     <span globalize="ML_Notification_Cell_Label_Saved"><%= CustomerPortal.Translator.T("ML_Notification_Cell_Label_Saved") %></span></a>

					             </li>
					              <li  class="sidebar_trash " type="9" alt="Page" id="trash" runat="server" clientidmode="Static" >
					              <a href="#"> 
                                      <i class="fa fa-trash"></i><span globalize="ML_Notification_Cell_Label_Trash"><%= CustomerPortal.Translator.T("ML_Notification_Cell_Label_Trash") %></span></a>
					              </li>
					              <li id="allmail" type="11" alt="Page" class="sidebar_all-mail " runat="server" clientidmode="Static" >
					              <a href="#"> <i class="fa fa-envelope">  
                                 </i><span globalize="ML_Notification_Navigation_All_Mail"><%= CustomerPortal.Translator.T("ML_Notification_Navigation_All_Mail") %></span></a>
					              </li>
                            </ul>
                </div>
               <div class="right_content_box">
                      <section class="panel">

                                <div class="panel-body minimal">

                       <!-- Message header section starts here -->
                                    <div class="mail-option">
						            <section class="col-md-4 col-sm-5 col-xs-12">
                                        <div class="chk-all">
							            <div class="pull-left mail-checkbox ">
                                           <input type="checkbox"  id="chkall" class="mail-checkbox"> 
                                          <label for="chkall"></label>
							            </div>

                                            <div class="btn-group">
                                                <a data-toggle="dropdown" href="" class="btn mini all" aria-expanded="false">
                                                     <span globalize="ML_Notification_Services_All"><%= CustomerPortal.Translator.T("ML_Notification_Services_All") %></span>   <%--bug id 025930--%>
                                                    <i class="fa fa-angle-down "></i>
                                                </a>
                                                <ul class="dropdown-menu sentdropdown">
                                                    <li><a href="" onclick="return false;" globalize="ML_Notification_Services_None" id="none"> <%= CustomerPortal.Translator.T("ML_Notification_Services_None") %></a></li><%--bug id 025930--%>
                                                    <li><a href="" onclick="return false;" globalize="ML_Notification_Services_Read" id="read"> <%= CustomerPortal.Translator.T("ML_Notification_Services_Read") %></a></li><%--bug id 025930--%>
                                                    <li><a href="" onclick="return false;" globalize="ML_Notification_Services_Unread" id="unread"> <%= CustomerPortal.Translator.T("ML_Notification_Services_Unread") %></a></li><%--bug id 025930--%>
                                                </ul>
                                            </div>
                                        </div>

                                        <div class="btn-group">
                                            <a data-original-title="Refresh" id="refsh" data-placement="bottom" globalize="ML_Notification_div_Refresh" data-toggle="dropdown" href="#" class="btn mini tooltips">
                                                <i class="fa fa-refresh"></i>
                                            </a>
                                        </div>
                                        <div class="btn-group">
                       <a data-original-title="Delete" data-placement="bottom" data-toggle="dropdown" href="#" class="btn mini tooltips btnDelete" globalize="ML_Notification_div_Delete" runat="server">
                                                <i class="fa fa-trash-o"></i>
                                            </a>
                                        </div>
                                         <div class="btn-group">
                                                  <a data-original-title="Save" style="display:none;"  data-placement="bottom" id="btnSave" data-toggle="dropdown" href="#" class="btn btnSave" clientidmode="Static" globalize="ML_Notification_div_Save" runat="server">
                                                <i class="fa fa-star"></i>
                                            </a>                                  
                                        </div>
                                         <div class="btn-group">
                                                  <a data-original-title="putback"   data-placement="bottom" id="btnputback" style="padding: 5px 9px;margin-left: -8px; display:none;" data-toggle="dropdown" href="#" class="btn btnputback" clientidmode="Static" globalize="ML_Notification_div_PutBack" runat="server">
                                               <img src="images/notification_icon/noti_put_back_trash.png" />
                                            </a>                                  
                                        </div>
							            </section>
			            <section class="col-md-5 col-sm-4 col-xs-12 hidden-xs hidden-sm">
                             <div class="search-btn-area" style="display:none">
                                  <form action="#" class="search-btns" method="get">
                                    <input type="text" class="form-control" id="search" name="search" placeholder="Search">
                                    <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
                                  </form>
                             </div>
                        </section>
            <section class="col-md-3 col-sm-7 col-xs-7 responsive_alignment_pagination">
                                        <ul class="unstyled inbox-pagination" >
                                            <li><span id="legends"></span></li>
                                            <li>
                                                <a class="np-btn" onclick="return false;" id="left" style="display:none"><i class="fa fa-angle-left  pagination-left"></i></a>
                                            </li>
                                            <li>
                                                <a class="np-btn" onclick="return false;" id="right" style="display:none"><i class="fa fa-angle-right pagination-right"></i></a>
                                            </li>
                                        </ul>
            </section>
                                    </div>
                                    <!-- Message header section ends here -->

                    <div id="messagesheader" class="top-notif-inbox-section" style="display:none !important;">
                            <div class="select_chech-box">
                           <%-- <input type="checkbox" id="chkall" globalize="ML_Notification_Chk_Select" />--%></div>
                        <div class="select_topic">&nbsp;</div>
                        <div class="select_from" ><span globalize="ML_Settings_Lbl_From" runat="server" id="fromHeader" clientidmode="Static"></span>&nbsp;<asp:ImageButton globalize="ML_Notification_SortData" ID="btnFromSort" runat="server" ImageUrl="images/SortIcon.png" CssClass="SortIcon btnFromSort"/></div>
                        <div class="select_message">                
                            <span globalize="ML_Notification_lbl_Subject"><%= CustomerPortal.Translator.T("ML_Notification_lbl_Subject") %></span>
                            <asp:ImageButton globalize="ML_Notification_SortData" ID="ImageButton1" runat="server" ImageUrl="images/SortIcon.png" CssClass="SortData" />
                        </div>

                        <div class="select_subject"><span globalize="ML_Common_spn_Message"><%= CustomerPortal.Translator.T("ML_Common_spn_Message") %></span>&nbsp;<asp:ImageButton globalize="ML_Notification_SortData" ID="btnSubjectSort" runat="server" ImageUrl="images/SortIcon.png" CssClass="SortIcon btnSubjectSort"/></div>
                        <div class="select_date"><span globalize="ML_SrvcRqust_Date"><%= CustomerPortal.Translator.T("ML_SrvcRqust_Date") %></span> <asp:ImageButton globalize="ML_Notification_SortData" ID="btnDateSort" runat="server" ImageUrl="images/SortIcon.png" CssClass="SortIcon btnDateSort" /></div>
                    </div>

                    <div class="table-inbox-wrap">
                        <ul class="MailListing" id="ulNotificatons" runat="server" clientidmode="Static"> 
         
                        </ul>   
                        <div id="nodata" class="Nodatadiv" style="display:none;"  globalize="ML_Msg_NoNotification"
                            <span globalize="ML_Msg_NoNotification"><%= CustomerPortal.Translator.T("ML_Msg_NoNotification") %></span></div>
                    </div>
                        <div class="Pager" style="float:left;display: none">            
                        </div>
                            <div class="divPagesize" style="display: none" >
                            <asp:DropDownList ID="ddlPagesize" runat="server" ClientIDMode="Static" style="     width: 90%;    height: 23px;   padding: 0px;">
                                <asp:ListItem Value="10" Selected="True">10</asp:ListItem>
                                <asp:ListItem Value="20">20</asp:ListItem>
                                <asp:ListItem Value="30">30</asp:ListItem>
                                <asp:ListItem Value="40">40</asp:ListItem>
                                <asp:ListItem Value="50">50</asp:ListItem>
                            </asp:DropDownList>
                        </div>        
            
                        <div id="MessageBody" style="display: none;" class="compose-mail">
                            <header class="panel-heading wht-bg cmpsmail" id="commail">
					             <h4 class="gen-case"> <span globalize="ML_Notification_ComposeMail"><%= CustomerPortal.Translator.T("ML_Notification_ComposeMail") %></span></h4>

                                    <div class="compose-btn pull-right">
                                        <%--<a onclick="return false;" class="btn btn-primary btn-sm"><button class="btn btn-primary btn-sm" id="btnSubmitReply" globalize="ML_Notification_btn_Send" value="Send" onclick="return false;"><i class="fa fa-paper-plane"></i> Send</button></a>--%>
                                        <a id="btnSubmitReply" class="btn btn-sm btn-primary rp-btn" globalize="ML_Notification_btn_Send"><i class="fa fa-paper-plane"></i><span globalize="ML_Notification_div_Reply"> <%= CustomerPortal.Translator.T("ML_Notification_div_Reply") %></span></a>
                                        <button class="btn btn-sm" style="cursor:pointer" id="btnDiscard" globalize="ML_Notification_btn_Discard" onclick="return false;"><i class="fa fa-times"></i><span globalize="ML_Notification_btn_Discard">  <%= CustomerPortal.Translator.T("ML_Notification_btn_Discard") %></span></button>
                                     <%--   <button class="btn btn-sm" style="cursor:pointer" id="btndelonreply1"><i class="fa fa-trash-o"></i></button>--%>
                                        <div class="btn-group">
                       <a data-original-title="Delete" data-placement="bottom" data-toggle="dropdown" href="#" class="btn mini tooltips btnDeleteonreply delete_1" globalize="ML_Notification_div_Delete" runat="server">
                                                <i class="fa fa-trash-o"></i>
                                            </a>
                                        </div>
                            
                                    </div>
				            </header>

                                <div id="replyTo" style="display: none; padding:6px 0px 14px;">
                                    <div class="form-group">
                                         <label for="lblToUser" class="">To:</label>
                                                <input type="text" tabindex="1" id="lblToUser" class="form-control" disabled>
                                        </div>
                                        </div>

                      
                                </div>

                                <div id="msgReply" style="display: none;">
                                    <div id="summernote"><p></p></div>
                           <%--      <div class="compose-editor">
                                     <textarea class="wysihtml5 form-control" id="myeditor" rows="9" style="display: none"></textarea>
                                 </div>--%>

                                <div class="box attachment-files">
                                        <span class="file-input btn btn-primary btn-file" globalize="ML_SrvcRqust_ChooseF"><i class="fa fa-paperclip"></i><span globalize="ML_SrvcRqust_ChooseF"><%= CustomerPortal.Translator.T("ML_SrvcRqust_ChooseF") %></span><asp:FileUpload ID="fileupd" runat="server" onchange="File_OnChange(this)" ClientIDMode="Static" /></span> &nbsp; <i globalize="ML_Notification_span_No_File_Chosen" id="nofile"><%= CustomerPortal.Translator.T("ML_Notification_span_No_File_Chosen") %></i>
                            
                                        <img id="btnRemoveFile" title="Remove" src="images/notification_icon/Payment_DeleteIcon.png"
                                            onclick="return removeFile();" style="display:none" />
                                        <asp:Label ID="lblMessage" runat="server" Enabled="false" globalize="ML_Notification_lbl_Message" title=""></asp:Label>
                                    </div>
                                    <img class="imgPrev" style="max-width:130px;float:left;margin-top:8px;display:none" />
                                        <br />
                                    <div class="buttons_area" style="margin-bottom:20px; padding-bottom:4px;">
                         
                        <%--                 <input id="btnSubmitReply" type="button"  value="Send" class="submit-button" globalize="ML_Notification_btn_Send"  />--%>
                            
                                        <%--<input id="btnDiscard" type="button" value="Discard" class="cancel-button" style="margin-left: 5px" globalize="ML_Notification_btn_Discard" />--%>
                                    </div>
                                </div>
                            <div class="clear_both"></div>
                                <div class="DetailsMessageContainer" id="div_print">
                      
                                </div>
                            </div>
                    </div>
                          </section>
    <%--  --%>
                </div>
            </div>
       </div>
   </section>

    <!-- End .right_content_box -->

    <span globalize="ML_SETTING_Lbl_Notifications" id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_SETTING_Lbl_Notifications") %></span>
    <span globalize="ML_notifications_ErrMsg_Messages" id="IDMessages" style="display: none"><%= CustomerPortal.Translator.T("ML_notifications_ErrMsg_Messages") %></span>
    <span globalize="ML_SERVICES_Txt_ExceedLimit" id="IDfilesize" style="display: none"><%= CustomerPortal.Translator.T("ML_SERVICES_Txt_ExceedLimit") %></span>
    <%--    <span globalize="ML_Connectme_ErrMsg_FileExt" id="IDfileExt" style="display: none"><%= CustomerPortal.Translator.T("ML_Connectme_ErrMsg_FileExt") %></span>--%>
    <span globalize="ML_Connectme_ErrMsg_FileFailed" id="IDFileFailed" style="display: none"><%= CustomerPortal.Translator.T("ML_Connectme_ErrMsg_FileFailed") %></span>
    <span globalize="ML_notifications_ErrMsg_MessagesDel" id="IDMessageDeleted" style="display: none"><%= CustomerPortal.Translator.T("ML_notifications_ErrMsg_MessagesDel") %></span>
    <span globalize="ML_notifications_ErrMsg_MessageSent" id="IDMessageSent" style="display: none"><%= CustomerPortal.Translator.T("ML_notifications_ErrMsg_MessageSent") %></span>
    <span globalize="ML_notifications_ErrMsg_MessageNotSent" id="IDMessageNotSent" style="display: none"><%= CustomerPortal.Translator.T("ML_notifications_ErrMsg_MessageNotSent") %></span>
    <span globalize="ML_Settings_Lbl_From" id="msgInboxFrom" style="display: none"><%= CustomerPortal.Translator.T("ML_Settings_Lbl_From") %></span>
    <span globalize="ML_SrvcRqust_Date" id="msgInboxDate" style="display: none"><%= CustomerPortal.Translator.T("ML_SrvcRqust_Date") %></span>
    <span globalize="ML_Notification_lbl_Subject" id="msgInboxSubject" style="display: none"><%= CustomerPortal.Translator.T("ML_Notification_lbl_Subject") %></span>
    <span globalize="ML_Inbox_Notification_DeleteMsg" id="DelMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Inbox_Notification_DeleteMsg") %></span>
    <!--Bug Id:0009083 Added following code to be used in Inbox.js for multilingual purpose-->
    <span globalize="ML_Common_spn_Message" id="msgInboxMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Common_spn_Message") %></span>
    <span globalize="ML_Settings_Lbl_To" id="msgInboxTo" style="display: none"><%= CustomerPortal.Translator.T("ML_Settings_Lbl_To") %></span>
    <!--End Comment-->
    <span globalize="ML_Notification_Msg_SaveSuccess" id="SaveMsgSuccess" style="display: none"><%= CustomerPortal.Translator.T("ML_Notification_Msg_SaveSuccess") %></span>
    <span globalize="ML_Notification_Msg_MoveSuccess" id="MoveMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_Notification_Msg_MoveSuccess") %></span>
    <span globalize="ML_Notification_Span_ErrMsg_Delete_Message" id="DelMsgCnfrm" style="display: none"><%= CustomerPortal.Translator.T("ML_Notification_Span_ErrMsg_Delete_Message") %></span>
    <span globalize="ML_Notification_div_Reply" id="hdnReply" style="display: none"><%= CustomerPortal.Translator.T("ML_Notification_div_Reply") %></span> <%--bug id 26426--%>
    <span globalize="ML_Notification_div_UnSave" id="msgforUnSave" style="display: none"><%= CustomerPortal.Translator.T("ML_Notification_div_UnSave") %></span><%--//bug id 32335--%>
    <asp:HiddenField ID="hdnNotificationType" runat="server" Value="" ClientIDMode="Static" />
    <script type="text/javascript">
        $('.wysihtml5').wysihtml5();
    </script>

</asp:Content>
