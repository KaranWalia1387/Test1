<%@ Page Title="Configure Efficiency" Language="C#" MasterPageFile="~/Configuration/Efficiency.Master" AutoEventWireup="true" CodeBehind="configure-saving-tips.aspx.cs" Inherits="AdminPanel.AdminReports.configure_saving_tips" %>

<%@ Import Namespace="AdminPanel" %>

<%@ Import Namespace="Newtonsoft.Json" %>

<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit.HTMLEditor" TagPrefix="cc1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">


    <script type="text/javascript">
        var userRights =<%=JsonConvert.SerializeObject(SessionAccessor.UserRightList)%>;
        var userUsageRights =userRights.indexOf( '<%=UserRights.EfficiencyReadOnly%>')>=0 && userRights.indexOf( '<%=UserRights.EfficiencyAccess%>')<0;
       
        $(".fancybox-effects").fancybox({
            helpers : {
                overlay : {
                    speedOut : 0
                }
            }
        });
    </script>

    <style>
        .Leftheader-Pannel h2 {
            width: 290px !important;
        }

        #jqxgrid {
            border-radius: 0 !important;
        }

        #PopupAddTopic.PopupcontentNew {
            top: 48% !important;
        }

        #jqxgrid td, th {
            padding: 0 8px;
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

        .jqx-widget-content {
            font-family: MyriadPro-Regular !important;
            font-style: normal;
        }

        .jqx-grid-cell-alt {
            background: #f8fafb !important;
        }

        .add_seg_details table tr td, .add_seg_details table tr th {
            padding: 6px 10px;
        }

        .Rightheader-Pannel a {
            color: #758386 !important;
            font-weight: bold;
        }

        .Rightheader-Pannel a {
            text-decoration: none !important;
        }

        label {
            padding-left: 11px !important;
        }

        .ajax__htmleditor_editor_container {
            background: #f3f3f3 !important;
            border: 1px solid #f3f3f3 !important;
        }

        .ajax__htmleditor_editor_toptoolbar, .ajax__htmleditor_editor_bottomtoolbar {
            padding: 3px !important;
        }

        .AddUserContentLabel, .AddUserContentData {
            float: left;
            margin: 3px 0;
            padding: 0;
            width: 70%;
        }

        .AddUserContentLabel {
            width: 30%;
                margin-top: 7px;
        }

        .tip_title_wrapper_box {
            height: 550px;
            overflow: auto;
        }

        @media (max-width:1700px) and (max-width:3500px) {
            .tip_title_wrapper_box {
                height: auto;
                overflow: auto;
            }
        }
    </style>

    <style type="text/css">
        .img_area {
            padding: 8px 16px 0;
        }

            .img_area .img {
                border: 1px solid #ccc;
                float: left;
                overflow: hidden;
                padding: 2px;
                width: 426px;
            }

                .img_area .img img {
                    max-width: 100%;
                    width: 420px;
                    height: 160px;
                }

        .right_efficency {
            background: #f4f4f4 none repeat scroll 0 0;
            float: left;
            margin: 10px 16px 0;
            padding: 7px;
            width: 94.8%;
        }

            .right_efficency ul {
                list-style: outside none none;
                margin: 0;
                padding: 0;
            }

                .right_efficency ul li {
                    margin: 0;
                    padding: 0px 5px;
                    float: left;
                }

                    .right_efficency ul li:first-child {
                        padding-top: 0;
                    }

        .discription_pro {
            padding: 0px 16px 16px 16px;
            font-size: 13px;
            line-height: 23px;
            text-align: justify;
            color: #797979;
            max-height: 300px;
            overflow: auto;
        }


        .submit-button {
            border-radius: 0px !important;
            color: #f0f0f0 !important;
            float: right;
            font-size: 16px;
            height: 30px !important;
            margin-bottom: 15px;
            margin-right: 10px;
            padding: 3px 27px !important;
            text-align: center;
            width: 135px !important;
            font-weight: bold;
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



        #btnRemoveFile {
            position: relative;
            top: 6px;
        }

        .ajax__htmleditor_editor_bottomtoolbar {
            display: none !important;
        }

        .AddUserContentData table tr:last-child {
            display: none !important;
        }

        .AddUserContentData input[type="text"], input[type="password"], textarea {
            padding: 2px 5px;
        }
        .note-editable.panel-body > ol, .note-editable.panel-body > ol > li
        {
            list-style:decimal;
        }
.note-editable.panel-body > ul {
    list-style: disc;
    padding: inherit;
    margin-top: 0;
    margin-bottom: 10px;
    -webkit-padding-start: 40px;
}
         .note-editable.panel-body > ul > li
         {
               list-style: disc;
         }
         .note-image-input form-control{
             width:86%;
         }
    </style>
    <script>
        $(document).ready(function () {
            //$('#ClosePopupAddTopic').click(function () {
            //    $('.note-editor').removeClass('fullscreen');
            //    $('.btn-fullscreen').removeClass('active');
            //});
        });
    </script>
    <input type="hidden" class="activeli_list" value="sidebar_efficency" />
    <uc1:jqxGrid runat="server" ID="jqxGrid1" />
    <link href="../css/font-awesome.css" rel="stylesheet" />
    <script src="../js/configure-saving-tip.js"></script>
    <script src="../js/popup.js"></script>

    <div class="top-header-area">
        <div class="Leftheader-Pannel">
            <h2>Efficiency<em></em></h2>
        </div>
        <% if (SessionAccessor.UserRightList.Contains(UserRights.EfficiencyAccess))
           { %>
        <div class="right_header_area">
            <ul id="searchpanel">
                <li><a id="lblAddTopic" style="cursor: pointer; text-decoration: none;"><span class="fa fa-plus-circle icon_color"></span>Add Efficiency</a></li>

            </ul>
        </div>

        <% } %>
    </div>

    <div class="grid-section" style="margin-top: 0px;">
        <div id="jqxgrid" class="jqgrid"></div>
    </div>

    <div id="PopupAddTopic" style="display: none; background-color: White; width: 650px; padding-bottom: 8px; /*height: 440px; */ border: 1px solid #008ddd;">

        <asp:HiddenField ID="hdnDetails" runat="server" Value="0" ClientIDMode="Static" />
        <div class="PopUpTitleBg configure-service-popup" style="margin-bottom: 0px;">
            <div id="popuptitle" class="PopUpTitle">
                Add Efficiency
            </div>
            <img src="../images/popup_close.png" id="ClosePopupAddTopic" style="float: right;"
                alt="Close" title="Close" />
            <div class="clear">
                &nbsp;
            </div>
        </div>
        <div class="clear">
            &nbsp;
        </div>
        <div class="tip_title_wrapper_box">
            <div style="width: 50%; float: left;">
                <label class="AddUserContentLabel">
                    Category</label>

                <div class="AddUserContentData">
                    <asp:DropDownList ID="ddlCategory" title="Category" mandatory="1" runat="server" ClientIDMode="Static" class="ddlCategory" Style="width: 90.2%;" ValidateMessage="Please select Category">
                        <asp:ListItem Value="">--Select--</asp:ListItem>
                        <asp:ListItem Value="1">Saving Tips</asp:ListItem>
                        <asp:ListItem Value="2">Educational Tips</asp:ListItem>
                        <asp:ListItem Value="4">Programs</asp:ListItem>
                        <asp:ListItem Value="3">Rebates</asp:ListItem>
                    </asp:DropDownList>
                </div>
            </div>
            <div style="width: 50%; float: left;">
                <label class="AddUserContentLabel">Meter Type</label>
                <div class="AddUserContentData">
                    <asp:DropDownList ID="ddlServiceType" title="Meter Type" mandatory="1" runat="server" CssClass="ddlServiceType" ClientIDMode="Static" Style="width: 90.2%;" ValidateMessage="Please select Meter Type">
                        <asp:ListItem Value="">--Select--</asp:ListItem>
                        <asp:ListItem Value="1">Power</asp:ListItem>
                        <asp:ListItem Value="2">Water</asp:ListItem>
                        <asp:ListItem Value="3">Gas</asp:ListItem>
                        <asp:ListItem Value="4">Solar</asp:ListItem>
                    </asp:DropDownList>
                </div>
            </div>
            <div class="clear">
                &nbsp;
            </div>
            <div style="width: 50%; float: left;">
                <label class="AddUserContentLabel">
                    Name</label>
                <div class="AddUserContentData">
                    <asp:TextBox ID="txtSavingTips" runat="server" title="Name" mandatory="1" class="txtSavingTips" MaxLength="100" ClientIDMode="Static" onkeypress="return IsHtmlTag(event);" Style="width: 90.2%;" ValidateMessage="Please enter Name"></asp:TextBox>
                </div>
            </div>
            <div style="width: 50%; float: left;">
                <label class="AddUserContentLabel">Account Type</label>
                <div class="AddUserContentData">
                    <asp:DropDownList ID="ddlAccountType" title="Meter Type" mandatory="1" runat="server" CssClass="ddlAccountType" ClientIDMode="Static" Style="width: 90.2%;" ValidateMessage="Please Select Account Type">
                        <asp:ListItem Value="">--Select--</asp:ListItem>
                        <asp:ListItem Value="1">Residential</asp:ListItem>
                        <asp:ListItem Value="2">Commercial</asp:ListItem>
                    </asp:DropDownList>
                </div>
            </div>
            <div class="clear">
                &nbsp;
            </div>
            <label class="AddUserContentLabel" style="margin-bottom: 0;">
                Description</label>

            <div class="AddUserContentData" style="width: 96.5%; position: relative;padding:0px 0 0 12px;">
                <cc1:Editor ID="editordesc" CssClass="editor" runat="server" ActiveMode="Design" InitialCleanUp="true" Height="130px" Style="width: 95%; margin-left: 12px; display: none" />
                <div id="summernote">
                    <p></p>
                </div>
                <span class="required" style="color: #950202; padding-left: 3px; font-size: 19px; position: absolute; right: -10px; top: 0;">*</span>
            </div>
            <div style="display: none">
                <span style="color: red; float: left; margin-left: 10px; font-size: 12px;" class="texttype" id="spanTxt"></span>
            </div>
            <div class="clear">
                &nbsp;
            </div>
            <label class="AddUserContentLabel" id="lblAmountsaving">
                Annual Savings</label>

            <div class="AddUserContentData">
                <asp:TextBox ID="txtAmount" runat="server" type="text" title="Amount saving listed/Yrs" MaxLength="3" Class="txtAmount" onkeypress="return isNumberKey(event)" ValidateMessage="Please enter Annual Savings"></asp:TextBox>
            </div>
            <div class="clear">
                &nbsp;
            </div>
            <label class="AddUserContentLabel" id="lblRebateprogramDesc">
                Participation</label>

            <div class="AddUserContentData">
                <asp:DropDownList ID="ddlRebateprogram" title="Participation" runat="server" ClientIDMode="Static"
                    class="ddlRebateprogram">
                    <asp:ListItem Value="">--Select--</asp:ListItem>
                    <asp:ListItem Value="Mandatory">Mandatory</asp:ListItem>
                    <asp:ListItem Value="Voluntary">Voluntary</asp:ListItem>
                </asp:DropDownList>
            </div>
            <div style="display: block">
                <div class="clear" style="border-top: 1px solid #f4f4f4; padding-top: 3px;">
                    &nbsp;
                </div>
                <label class="AddUserContentLabel">Image</label>
                <div class="AddUserContentData">
                    <span class="submit-button btn btn-primary btn-file" id="lblFileupload" style="float: left !important; line-height: 22px; font-size: 15px; margin-bottom: 0; padding: 3px 11px !important;">Choose File                
                <asp:FileUpload ID="fileUpload" runat="server" class="blah" onchange="File_OnChange(this);readURL(this);" ClientIDMode="Static" /><br />
                    </span>
                    <div class="file_chosen_box">
                        <i id="nofile">No File Chosen</i>
                        <img id="btnRemoveFile" title="Remove" src="../images/Payment_DeleteIcon.png" onclick="return removeFile();" style="display: none;">
                    </div>
                </div>
                <div>
                    <img id="blahimg" src="../images/noimage.png" width="180px" height="60" style="margin-left: 190px"  class="blahimg" onerror="imgError(this)" />
                </div>
                <div class="clear">
                    &nbsp;
                </div>
            </div>
            <label class="AddUserContentLabel" style="display: none;">
                Status</label>
            <div class="AddUserContentData">
                <asp:RadioButtonList ID="divRadioButtons" runat="server" class="divRadioButtons"
                    RepeatDirection="Horizontal">
                    <asp:ListItem Text="Active" Value="1" Selected="True" style="padding-right: 10px;" />
                    <asp:ListItem Text="Inactive" Value="0" />
                </asp:RadioButtonList>
            </div>
            <div class="clear">
                &nbsp;
            </div>

            <div style="text-align: right; margin-top: 10px; border-top: 1px solid #f4f4f4;" align="center">

                <input type="button" id="BtnAdd" title="Add" class="savePassword submitBtn" style="font-weight: normal; padding: 5px 46px; float: none;"
                    clientidmode="Static" />
            </div>
        </div>
    </div>
     <asp:HiddenField ID="hdnfileOld" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdfile" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnCategory" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnServiceType" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnAccountType" runat="server" ClientIDMode="Static" />
    <div id="showdetails_effi" style="display: none; background-color: White; width: 460px; padding-bottom: 8px; /*height: 440px; */ border: 1px solid #008ddd;">
        <div class="PopUpTitleBg configure-service-popup" style="margin-bottom: 0px;">
            <div id="ModalTitle" class="PopUpTitle" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 410px;">
                Details
            </div>
            <img src="../images/popup_close.png" id="ClosePopupAddTopic2" style="float: right;"
                alt="Close" title="Close" />
            <div class="clear">
                &nbsp;
            </div>
        </div>
        <div class="img_area">
            <div class="img">
                <img id="img_popimage" src=" " onerror="imgError(this);" />
            </div>
        </div>
        <div class="right_efficency">
            <ul>
                <li><span style="font-weight: bold;" globalize="ML_Efficiency_Lbl_Register" id="lblAdd">Registered:</span><span class="addtxt" id="lbl_added"></span></li>
                <li><span style="font-weight: bold;" globalize="ML_ENERGY_EFFICIENCY_Lbl_Viewed" id="lblView">Viewed:</span><span class="viwtxt" id="lbl_viewed"></span></li>
                <li><span globalize="" style="font-weight: bold;" id="lblType">Save Upto: </span><span class="typtxt" id="lbl_type"></span></li>
            </ul>
            <h5>
                <span class="titletxt"></span>
            </h5>
        </div>
        <div class="clearfix"></div>
        <div class="discription_pro" id="div_description"></div>
        <div class="row contact_pop" id="divConnectMe" style="float: left; width: 50%; background: #f4f4f4; margin: 0; display: none;">
        </div>
    </div>
</asp:Content>
