<%@ Page Title="FAQ" Language="C#" MasterPageFile="~/Administration.Master" AutoEventWireup="true" CodeBehind="configure-FAQ.aspx.cs" Inherits="AdminPanel.configure_FAQ" %>
<%@ Import Namespace="AdminPanel" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit.HTMLEditor" TagPrefix="cc1" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    
    <input type="hidden" class="activeli_list" value="sidebar_FAQ" />
    <uc1:jqxGrid runat="server" ID="jqxGrid1" />
    <link href="../css/font-awesome.css" rel="stylesheet" />
    <script src="../js/configure-FAQ.js"></script>
    <script src="../js/popup.js"></script>

    <style type="text/css">
        .discription_pro {
            padding: 0px 16px 16px 16px;
            font-size: 13px;
            line-height: 23px;
            text-align: justify;
            color: #797979;
            max-height: 300px;
            overflow: auto;
        }

        .mid_scroll {
            height: 470px !important;
            overflow: auto;
        }

        @media (min-width:1550px) and (max-width:3500px) {
            .mid_scroll {
                height: 600px !important;
                overflow: auto;
            }
        }
        .modal-backdrop
        {
            z-index:999;
        }
        .modal
        {
            z-index:9999;
        }
        .note-editor .modal-body {
            padding: 5px 10px;
            position: relative;
        }
          .note-editor.note-frame .note-editing-area .note-editable{
            height: 160px !important;
        }
        .note-resizebar{
            display: none;
        }

    </style>
    <script>
        $(document).ready(function () {
            $('#ClosePopupAddFAQ').click(function () {
                $('.note-editor').removeClass('fullscreen');
                $('.btn-fullscreen').removeClass('active');
            });
        });
    </script>
    <div class="top-header-area">
        
        <asp:HiddenField runat="server" ClientIDMode="Static" ID="hdnReadWrite" Value="0" />

        <div class="Leftheader-Pannel">
            <h2>FAQ<em></em></h2>
        </div>

        <div class="right_header_area">
            <% if (SessionAccessor.IsSuperAdmin)
               { %>
            <ul id="searchpanel">
                <li class="new_btn_style"><a id="lblAddFAQ" style="cursor: pointer; text-decoration: none;"><span class="fa fa-plus-circle icon_color"></span>Add FAQ</a></li>

            </ul>
            <% } %>
        </div>

    </div>

    <div class="grid-section" style="margin-top: 0px;">
        <div id="jqxgrid" class="jqgrid"></div>
    </div>

    <div id="PopupAddFAQ" style="display: none; background-color: White; width: 650px; padding-bottom: 8px; /*height: 440px; */ border: 1px solid #008ddd;">

        <asp:HiddenField ID="hdnDetails" runat="server" Value="0" ClientIDMode="Static" />
        <div class="PopUpTitleBg configure-service-popup" style="margin-bottom: 0px;">
            <div id="popuptitle" class="PopUpTitle">
                Add FAQ
            </div>
            <img src="../images/popup_close.png" id="ClosePopupAddFAQ" class="close_btn_img" alt="Close" title="Close" />
            <div class="clear">
                &nbsp;
            </div>
        </div>
        <div class="clear">
            &nbsp;
        </div>
        <div class="tip_title_wrapper_box" id="divSaveupdatePopup">
            <div class="mid_scroll">
                <label class="AddUserContentLabel" style="width: 15%;">
                    FAQ English</label>
                <div class="AddUserContentData" style="width: 85%;">
                    <asp:TextBox ID="txtQuestionEN" runat="server" title=" English Question" ValidateMessage="Please enter question in English" mandatory="1" class="txtQuestion" ClientIDMode="Static" onkeypress="return IsHtmlTag(event);" Style="width: 96%;"></asp:TextBox>
                </div>
                <div class="clear">
                    &nbsp;
                </div>
                <label class="AddUserContentLabel" style="margin-bottom: 0;">
                    Answer English</label>

                <div class="AddUserContentData" style="width: 100%; position: relative;">
                    <%--<cc1:Editor ID="editorFAQEN" runat="server" TabIndex="0" mandatory="1" ToolTip=" English Answer" ActiveMode="Design" InitialCleanUp="true" />--%>
                    <div id="summernoteFAQEN">
                        <p ></p>
                    </div>

                    <span class="required" style="color: #950202; padding-left: 3px; font-size: 19px; position: absolute; right: 10px; top: 0;">*</span>
                </div>
                <div>
                    <span style="color: red; float: left; margin-left: 10px; font-size: 12px;" class="texttype" id="spanTxt"></span>
                </div>
                <div class="clear">
                    &nbsp;
                </div>


                <label class="AddUserContentLabel" style="width: 15%;">
                    FAQ Spanish</label>
                <div class="AddUserContentData" style="width: 85%;">
                    <asp:TextBox ID="txtQuestionSP" runat="server" title=" Spanish Question" ValidateMessage="Please enter question in Spanish" mandatory="1" class="txtQuestion" ClientIDMode="Static" onkeypress="return IsHtmlTag(event);" Style="width: 96%;"></asp:TextBox>
                </div>
                <div class="clear">
                    &nbsp;
                </div>
                <label class="AddUserContentLabel" style="margin-bottom: 0;">
                    Answer Spanish</label>

                <div class="AddUserContentData" style="width: 100%; position: relative;">
                    <%--<cc1:Editor ID="editorFAQSP" runat="server" TabIndex="0" mandatory="1" ToolTip=" Spanish Answer" ActiveMode="Design" InitialCleanUp="true" />--%>
                    <div id="summernoteFAQSP">
                        <p ></p>
                    </div>
                    <span class="required" style="color: #950202; padding-left: 3px; font-size: 19px; position: absolute; right: 10px; top: 0;">*</span>
                </div>
                <div>
                    <span style="color: red; float: left; margin-left: 10px; font-size: 12px;" class="texttype" id="spanTxt1"></span>
                </div>
                <div class="clear">
                    &nbsp;
                </div>

                <label class="AddUserContentLabel" style="width: 15%;">
                    FAQ French</label>
                <div class="AddUserContentData" style="width: 85%;">
                    <asp:TextBox ID="txtQuestionFR" runat="server" title=" French Question" ValidateMessage="Please enter question in French" mandatory="1" class="txtQuestion" ClientIDMode="Static" onkeypress="return IsHtmlTag(event);" Style="width: 96%;"></asp:TextBox>
                </div>
                <div class="clear">
                    &nbsp;
                </div>
                <label class="AddUserContentLabel" style="margin-bottom: 0;">
                    Answer French</label>

                <div class="AddUserContentData" style="width: 100%; position: relative;">
                    <%--<cc1:Editor ID="editorFAQFR" runat="server" TabIndex="0" mandatory="1" ToolTip=" French Answer" ActiveMode="Design" InitialCleanUp="true" />--%>
                    <div id="summernoteFAQFR">
                        <p></p>
                    </div>

                    <span class="required" style="color: #950202; padding-left: 3px; font-size: 19px; position: absolute; right: 10px; top: 0;">*</span>
                </div>
                <div>
                    <span style="color: red; float: left; margin-left: 10px; font-size: 12px;" class="texttype" id="spanTxt2"></span>
                </div>
                <div class="clear">
                    &nbsp;
                </div>
            </div>
            <div style="text-align: right; margin-top: 0px; border-top: 1px solid #ccc;" align="center">

                <input type="button" id="BtnAdd" title="Add" class="savePassword submitBtn" style="font-weight: normal; padding: 5px 46px; float: none;"
                    clientidmode="Static" />
            </div>
        </div>
    </div>

    <asp:HiddenField ID="hdnFAQ" runat="server" ClientIDMode="Static" />


    <div id="showdetails_effiEnglish" style="display: none; background-color: White; width: 460px; padding-bottom: 8px; /*height: 440px; */ border: 1px solid #008ddd;">
        <div class="PopUpTitleBg configure-service-popup" style="margin-bottom: 0px;">
            <div id="ModalTitleEnglish" class="PopUpTitle" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 410px;">
                English Answer
            </div>
            <img src="../images/popup_close.png" id="ClosePopupAddTopic2" style="float: right;"
                alt="Close" title="Close" />
            <div class="clear">
                &nbsp;
            </div>
        </div>

        <div class="clearfix"></div>
        <div class="discription_pro" id="div_descriptionEnglish"></div>
    </div>

    <div id="showdetails_effiSpanish" style="display: none; background-color: White; width: 460px; padding-bottom: 8px; /*height: 440px; */ border: 1px solid #008ddd;">
        <div class="PopUpTitleBg configure-service-popup" style="margin-bottom: 0px;">
            <div id="ModalTitleSpanish" class="PopUpTitle" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 408px;">
                Spanish Answer
            </div>
            <img src="../images/popup_close.png" id="ClosePopupAddTopic3" class="close_btn_img" alt="Close" title="Close" />
            <div class="clear">
                &nbsp;
            </div>
        </div>

        <div class="clearfix"></div>
        <div class="discription_pro" id="div_descriptionSpanish"></div>
    </div>

    <div id="showdetails_effiFrench" style="display: none; background-color: White; width: 460px; padding-bottom: 8px; /*height: 440px; */ border: 1px solid #008ddd;">
        <div class="PopUpTitleBg configure-service-popup" style="margin-bottom: 0px;">
            <div id="ModalTitleFrench" class="PopUpTitle" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 410px;">
                French Answer
            </div>
            <img src="../images/popup_close.png" id="ClosePopupAddTopic4" style="float: right;"
                alt="Close" title="Close" />
            <div class="clear">
                &nbsp;
            </div>
        </div>

        <div class="clearfix"></div>
        <div class="discription_pro" id="div_descriptionFrench"></div>
    </div>
</asp:Content>
