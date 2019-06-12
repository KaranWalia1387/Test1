<%@ Page Title="Notification-Inbox" Language="C#" MasterPageFile="~/Notification/Notification.master" AutoEventWireup="true" CodeBehind="Notification-Inbox.aspx.cs" Inherits="AdminPanel.Notification.Notification_Inbox" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit.HTMLEditor" TagPrefix="HTMLEditor" %>
<%--<%@ Register Src="~/UserControl/CustomerDetailsPopUp.ascx" TagPrefix="uc1" TagName="CustomerDetailsPopUp" %>--%>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<%@ Register Src="~/UserControl/ChartControl.ascx" TagPrefix="uc2" TagName="ChartControl" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit.HTMLEditor" TagPrefix="cc1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <script src="../js/popup.js"></script>
    <script src="../js/ASPSnippets_Pager.min.js"></script>
    <link href="../css/CustomerDetailsPopup.css" rel="stylesheet" />
    <%--<script src="../js/CustomerDetailsPopup.js"></script>--%>
    <%--<script src="../js/CustomerPopUp.js"></script>--%>
    <script src="../js/highchart_js/highcharts.js"></script>
    <script src="../js/highchart_js/common-chart.js"></script>
    <script src="../js/highchart_js/highcharts-3d.js"></script>
    <script src="../js/highchart_js/highcharts-more.js"></script>
    <script src="//code.highcharts.com/modules/drilldown.js"></script>
    <script src="../js/jquery.mask.min.js"></script>

    
    <script type="text/javascript">
      //  $(".csr_header").addClass('active');
    </script>
    <script type="text/javascript">
        $(document).ready(function () {

            $("#menu_navigator").click(function () {

            });
        });
    </script>
    <style>
       .note-image-input form-control{
        width: 86%;
}
        .inner-right-section {
            overflow: hidden;
        }


        #rgtMail {
        }

        #ContentPlaceHolder1_rightpanel_editor_ctl02 {
            border-left: 3px solid #f0f0f0;
            border-top: 3px solid #f0f0f0;
            border-bottom: 3px solid #f0f0f0;
        }

        .from-section, .from-name-section {
            min-height: 20px;
        }

        a {
            outline: none !important;
        }

            a:hover, a:active, a:focus {
                outline: none !important;
            }

        ul#ulNotificatons {
            height: 100%;
        }



        #msgReply .ajax__htmleditor_editor_base .ajax__htmleditor_editor_toptoolbar {
            background: #ececec none repeat scroll 0 0;
            cursor: text;
            padding: 2px 5px;
        }


        #msgReply .ajax__htmleditor_editor_base .ajax__htmleditor_editor_bottomtoolbar {
            background: #ececec none repeat scroll 0 0;
            cursor: text;
            padding: 3px 5px;
        }

        #msgReply .ajax__htmleditor_editor_base .ajax__htmleditor_editor_editpanel {
            border: 1px solid #ececec;
            height: 100%;
        }


        #rgtMail {
            height: 100%;
        }

        ul.MailListing li {
            line-height: 34px !important;
        }

        #ContentPlaceHolder1_rightpanel_editor_ctl02 {
            border-left: 3px solid #f0f0f0;
            border-top: 3px solid #f0f0f0;
            border-bottom: 3px solid #f0f0f0;
        }

        .from-section, .from-name-section {
            min-height: 20px;
        }

        a {
            outline: none !important;
        }

            a:hover, a:active, a:focus {
                outline: none !important;
            }

        ul#ulNotificatons {
            height: 99%;
            overflow: auto;
        }



        .message-section {
            float: left;
            font-size: 12px;
            height: 85%;
            margin: 0;
            width: 100%;
        }

        .inner-right-right-section {
            float: left;
            height: 99%;
            margin: -6px 0 0;
            width: 100%;
        }

        .inner-right-section .grid-section {
            background: #fff none repeat scroll 0 0;
            clear: both;
            height: 92%;
            margin: -4px 0 0;
            padding: 2px 0 0;
        }

        .inner-right-section .right-content-area {
            height: 99%;
            padding: 0;
        }

        #jqxgrid td, th {
            padding: 0 8px;
        }

        .fancybox-skin .fancybox.GridImage {
            width: 420px !important;
        }

        @media (min-width:1500px) and (max-width:3200px) {
            ul#ulNotificatons {
                height: 100% !important;
            }

            .message-section {
                float: left;
                font-size: 12px;
                height: 98%;
                margin: 0;
                width: 100%;
            }

            #MessageBody {
                height: 106% !important;
            }
        }

        .Nodatadiv {
            color: red;
            text-align: center;
            padding-top: 11%;
            font-size: 17px;
        }

        .attachment-files {
            float: left;
            width: auto;
            margin: 0px 0px 10px 15px;
            padding: 15px 0px 0px 0px;
            position: relative;
        }

        .box.attachment-files > span.btn-file {
            background-color: #fcfcfc !important;
            color: #53565a !important;
            padding: 7px 12px 7px 5px;
            border: solid 1px #e7e7e7;
            cursor: pointer;
            position: relative;
        }

        .attachment-files .fa {
            margin: 0px 5px;
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
            height: 20px;
        }

        .attachment_box {
            width: 100%;
            float: left;
            border-bottom: 1px solid #e7e7e7;
            margin-bottom: 10px;
        }

        #DetailCustomer {
            font-size: 14px;
            padding: 10px 10px 6px;
            text-align: center;
            border-bottom: 1px solid #ccc;
            float: left;
            width: 100%;
            margin-bottom: 6px;
            background: #f7f5f5;
        }

            #DetailCustomer b {
                padding: 0px 7px;
            }


        ul.inbox-pagination {
            float: right;
            list-style-type: none;
            padding: 0;
            margin: 0;
        }

            ul.inbox-pagination li {
                float: left;
                padding: 0;
                border: solid 0px #fff;
            }

        .inbox-pagination li span {
            display: inline-block;
            margin-top: 7px;
            margin-right: 5px;
        }

        .inbox-pagination a.np-btn {
            margin-left: 5px;
        }

        .inbox-pagination a.np-btn {
            border: 1px solid #e7e7e7;
            padding: 5px 15px;
            display: inline-block;
            background: #fcfcfc;
            color: #afafaf;
            border-radius: 3px !important;
            -webkit-border-radius: 3px !important;
            cursor: pointer;
        }

        .fa-angle-left.pagination-left {
            font-weight: bold;
            font-size: 17px;
        }

        .fa-angle-right.pagination-right {
            font-weight: bold;
            font-size: 17px;
        }

        .responsive_alignment_pagination {
            position: relative;
            top: 0;
            right: 3px;
            float: right;
            width: 100%;
        }


        ul#ulNotificatons li.unread {
            color: #53565a;
            font-weight: 600;
        }
    </style>
    <uc1:jqxGrid runat="server" />

    <link href="../css/Notification.css" rel="stylesheet" />
    <asp:HiddenField ID="hdnType" runat="server" Value="inbox" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnMessageId" runat="server" Value="" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnMailFrom" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnSort" runat="server" Value="0" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnSubject" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="replyaccno" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="filehandlerpath" runat="server" ClientIDMode="Static" Value='<%#ConfigurationManager.AppSettings["portalfilehandler"]%>' />
    <input type="hidden" class="activeli_list" value="sidebar_nitiF" />
    <div class="top-header-area">
        <div class="Leftheader-Pannel" style="width: 35%;">
            <h2>Notification -
                <label id="lblHeading" style="font-weight: bold !important;"></label>
            </h2>
        </div>
        <div class="Rightheader-Pannel" style="width: 63%; padding: 0 10px 0px 0; margin-bottom: 0px; margin-top: -4px;">
            <div class="right-notif-img">
                <input type="button" id="btnBack" class="BacktoInbox" title="Back" style="display: none; float: left; border: none; vertical-align: top;" />
                <input type="image" id="btnPrevious" src="../images/notification_icon/icon-back.png"
                    title="Previous" alt="Previous" style="display: none; vertical-align: top; margin-top: -3px;" />
                <input type="image" id="btnNext" src="../images/notification_icon/icon-forward.png"
                    title="Next" alt="Next" style="display: none; vertical-align: top; margin-top: -3px;" />
                <asp:ImageButton runat="server" ID="btnSave" ImageUrl="~/images/save-icon.png"
                    ToolTip="Save" CssClass="btnSave" Style="vertical-align: top;" />
                <input type="image" id="btnReply" src="../images/notification_icon/icon-reply.png"
                    title="Reply" alt="Reply" style="display: none; vertical-align: top;" />
                <asp:ImageButton runat="server" ID="btnDelete" ImageUrl="~/images/trash-icon.png"
                    ToolTip="Delete" CssClass="btnDelete" Style="vertical-align: top;" />
                <asp:ImageButton runat="server" ID="btnputback" ImageUrl="../images/notification_icon/poke-messages.png"
                    ToolTip="PutBack" CssClass="btnputback" Style="vertical-align: top; display: none;" />
            </div>
        </div>
        <div style="float: right; margin-right: 5px;">
        </div>
    </div>

    <div class="grid-section">

        <div class="inner-right-right-section" id="rgtMail">
            <div class="top-notif-inbox-section" style="display: block" id="divHeader">
                <div class="select_chech-box" style="margin-left: 2px;">
                    <input type="checkbox" id="chkall">
                </div>
                <div class="select_from">
                    <span>
                        <label id="lblFromTo"></label>
                    </span>
                    <img src="../images/SortIcon.png" class="SortIcon btnFromSort" id="btnSortFrom" />
                    <input type="hidden" id="viewFrom" value="ASC" />

                </div>
                <div class="select_subject">
                    <span>Subject</span>
                    <img src="../images/SortIcon.png" class="SortIcon btnFromSort" id="btnSubjectSort" />
                    <input type="hidden" id="viewSubject" value="DESC" />
                </div>
                <div class="select_date">
                    <span>Date</span>
                    <img src="../images/SortIcon.png" class="SortIcon btnFromSort" id="btnDateSort" />
                    <input type="hidden" id="viewDate" value="DESC" />
                </div>
            </div>
            <div class="message-section">
                <ul class="MailListing" id="ulNotificatons">
                </ul>
                <div id="nodata" class="Nodatadiv" style="display: none;" globalize="ML_Notification_div_nodata" inputtype="" validatemessage="We didn’t find anything to show here" title="We didn’t find anything to show here">We didn’t find anything to show here</div>
                <%--25551 bug id--%>
                <div id="MessageBody" style="display: none; height: 480px; overflow: auto;">
                    <div id="msgReply" style="display: none;">

                        <%-- <HTMLEditor:Editor runat="server" ID="editor" Height="300px" AutoFocus="true" Width="100%"
                            CssClass="htmleditor" Style="padding-top: 4%" />--%>
                        <div id="summernote">
                            <p></p>
                        </div>
                        <div class="attachment_box">
                            <div class="box attachment-files">
                                <span class="file-input btn btn-primary btn-file" globalize="ML_Notification_span_Choose_File"><i class="fa fa-paperclip"></i><span globalize="ML_Notification_span_Choose_File">Choose File</span><asp:FileUpload ID="fileupd" runat="server" onchange="File_OnChange(this)" ClientIDMode="Static" /></span> &nbsp; <i globalize="ML_Notification_span_No_File_Chosen" id="nofile">No File Chosen</i>

                                <img id="btnRemoveFile" title="Remove" src="../images/notification_icon/Payment_DeleteIcon.png"
                                    onclick="return removeFile();" style="display: none" />
                                <asp:Label ID="lblMessage" runat="server" Enabled="false" title=""></asp:Label>
                            </div>

                            <div class="ReplyBtnContainer" style="float: right;">
                                  <input type="button" ID="btnSubmitReply" value="Send" class="submitBtn"/>
                                <input id="btnDiscard" type="button" value="Discard" class="submitBtn" style="float: left;" />
                            </div>
                        </div>

                    </div>
                    <div id="DetailCustomer"></div>
                    <div class="DetailsMessageContainer message-body-section ">
                    </div>
                </div>
            </div>
            <section class="responsive_alignment_pagination">

                <ul class="unstyled inbox-pagination">
                    <li><span id="legends"></span></li>
                    <li>
                        <a class="np-btn" onclick="return false;" id="left" style="display: none"><i class="fa fa-angle-left  pagination-left"></i></a>
                    </li>
                    <li>
                        <a class="np-btn" onclick="return false;" id="right" style="display: none"><i class="fa fa-angle-right pagination-right"></i></a>
                    </li>
                </ul>
                <div class="divPagesize">
                    <asp:DropDownList ID="ddlPagesize" runat="server" ClientIDMode="Static" Style="width: 6%; height: 23px; padding: 0px; float: right; margin: 5px 15px 0px 2px;">
                        <asp:ListItem Value="10" Selected="True">10</asp:ListItem>
                        <asp:ListItem Value="20">20</asp:ListItem>
                        <asp:ListItem Value="30">30</asp:ListItem>
                        <asp:ListItem Value="40">40</asp:ListItem>
                        <asp:ListItem Value="50">50</asp:ListItem>
                    </asp:DropDownList>
                </div>
            </section>
            <div class="Pager" style="float: left; display: none">
            </div>
        </div>

    </div>

    <div class="modal fade advanceSearch" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog popup_area">
            <div class="modal-content" style="width: 100%; margin: auto; padding-bottom: 0px !important;">
                <div class="modal-header">
                    <button type="button" id="btnclosepopup" data-dismiss="modal">
                        <img src="../images/popup_close.png" title="Close" /></button>
                    <h4 class="modal-title" id="myModalLabel">Advance Search</h4>
                </div>
                <div class="modal-body">
                    <div class="popup_area_home">
                        <div style="clear: both;"></div>
                        <div id="advanceSearch">

                            <div class="popup_left_content_area_home">
                                Account Type:
                            </div>
                            <div class="popup_right_content_area_home">
                                <select id="ddlAccountType" title="Account Type">
                                    <option value="">--Account Type--</option>
                                    <option value="1">Residential</option>
                                    <option value="2">Commercial</option>
                                </select>
                            </div>

                            <div style="clear: both;"></div>
                            <div class="popup_left_content_area_home">
                                Status:
                            </div>
                            <div class="popup_right_content_area_home">
                                <select id="ddlStatus" title="Status">
                                    <option value="">--Status--</option>
                                    <option value="0">Registered</option>
                                    <option value="1">Active</option>
                                    <option value="2">Inactive</option>
                                </select>
                            </div>
                            <div style="clear: both;"></div>
                            <div class="popup_left_content_area_home">
                                Paper Bill Status:
                            </div>
                            <div class="popup_right_content_area_home">
                                <select id="ddlPaperBillStatus" title="Paper Bill Status">
                                    <option value="">--Paper Bill Status--</option>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                            </div>
                            <div style="clear: both;"></div>
                            <div class="popup_left_content_area_home">
                                Text Status:
                            </div>
                            <div class="popup_right_content_area_home">
                                <select id="ddlTextMsgStatus" title="Text Status">
                                    <option value="">--Text Status--</option>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                            </div>
                            <div style="clear: both;"></div>
                        </div>
                    </div>
                    <div class="bottom_area_home" style="display: block;">
                        <input id="btnCancel" type="button" class="cancel-button submitBtn" style="padding: 0px 12px; float: none;" value="Reset" onclick="resetAdvanceSearch()" /><%--onclick is added to reset fields bug:9010 --%>
                        <input id="btnSubmit" type="button" class="submit-button submitBtn" style="padding: 0px 12px; float: right;" value="Submit" />
                    </div>

                </div>
            </div>
        </div>
    </div>
   <%-- <div class="modal fade userDetails" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <uc1:CustomerDetailsPopUp runat="server" ID="CustomerDetailsPopUp" />
    </div>--%>

    <div id="TxtMsgSubject" style="display: none"></div>
    <div id="FromAccNum" style="display: none"></div>
    <input type="hidden" id="hdnText" />
    <script type="text/javascript">
        function validateeditorcontent() {
            // START NEW UI 12/18/2014
            $(document).ready(function () {
                $('#collapseOne').addClass('in');
            });
        }
        // END NEW UI 12/18/2014
    </script>
    <script src="../js/Notification-Inbox.js"></script>
</asp:Content>

