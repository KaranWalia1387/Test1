<%@ Page Title="Banner" Language="C#" MasterPageFile="~/Administration.master" AutoEventWireup="true" CodeBehind="ConfigureBanner.aspx.cs" Inherits="AdminPanel.ConfigureBanner" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <script src="../js/configureBanner.js"></script>
    <script src="../js/blockScreen.js"></script>
    <script src="../js/popup.js"></script>
    <script src="../js/fancybox/jquery.fancybox.js"></script>
    <script src="../js/AjaxFileUpload/ajaxfileupload.js"></script>
    <script src="../js/w2ui-1.4.2.min.js" type="text/javascript"></script>
    <%--<script src="../js/Common-Function.js"></script>--%>
    <link href="../js/fancybox/jquery.fancybox.css" rel="stylesheet" />
    <link href="../css/w2ui-1.4.2.min.css" rel="stylesheet" />
    <link href="../css/font-awesome.css" rel="stylesheet" />
    <style type="text/css">
        .reporty_outage_popup {
            width: 100%;
            float: left;
            padding: 5px 20px 8px;
        }

        button.close {
            background: rgba(0, 0, 0, 0) url("../images/popup_close.png") no-repeat scroll right 2px;
            height: 35px;
            margin-right: -25px;
            margin-top: -22px !important;
            opacity: 0.99;
            text-indent: -99999px;
            width: 31px;
        }

        .reporty_outage_popup span {
            width: 30%;
            float: left;
        }

        .reporty_outage_popup input {
            width: 70%;
            float: left;
        }

        .usage_section_1 {
            border-bottom: 0px solid #ededed;
            display: table;
            padding-bottom: 0px;
            padding-left: 0;
            width: 100%;
        }

        .report_upload_box .choose_file {
            background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
            border: 1px solid #ccc;
            display: block;
            float: left;
            margin-bottom: 35px;
            padding: 4px;
        }

        .report_upload_box {
            margin-top: 0;
            width: 69%;
        }

            .report_upload_box label {
                padding: 4px !important;
                font-size: 15px;
                display: inline-block !important;
            }

        .report_outage_img {
            width: 120px;
            height: 120px;
            float: left;
            border: 1px solid #ccc;
            margin-top: 0px;
            margin-right: 10px;
            background: #f6f6f6;
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

        .right-content-area {
            height: 100%;
        }

        .advanceSearch .modal-header {
            background: #999999;
            border-radius: 5px;
            border-bottom-left-radius: 0px;
            border-bottom-right-radius: 0px;
            padding: 9px 15px;
        }

        .advanceSearch .modal-dialog {
            width: 510px !important;
        }

        .tble-pop tr > td {
            padding: 5px;
        }

        input[type=checkbox], input[type=radio] {
            margin: 11px 0px 15px 5px;
            margin-top: 1px\9;
            line-height: normal;
        }

        /*Deepshikha*/




        .submit-button {
            border-radius: 5px;
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

        #nofile {
            position: relative;
            top: 6px;
            width: 137px;
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        @media (max-width:478px) {
            #nofile {
                white-space: nowrap;
                top: -5px;
            }
        }

        #btnRemoveFile {
            position: absolute;
            top: 8px;
            width: 12px;
            float: left;
            right: 0px;
        }

        .select_module_box {
            width: 100%;
            float: left;
            border-top: 1px solid #F5F5F5;
            margin-top: 12px;
        }

        .select_sch_box {
            width: 100%;
            float: left;
            margin-top: 10px;
        }

        .file_chosen_box {
            float: left;
            width: 148px;
            position: relative;
        }
    </style>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#btnRemoveFile').hide();
        });
    </script>
    <uc1:jqxGrid ID="JqxGrid1" runat="server" />
    <input type="hidden" class="activeli_list" value="sidebar_configurebanner_inner" />
    <div class="top-header-area">
        <div class="Leftheader-Pannel" style="width: 60%; float: left;">
            <h2>Banners</h2>
        </div>
    </div>

    <div class="grid-section">
        <div id="jqxgrid" class="jqgrid">
        </div>
    </div>

    <div id="advanceSearch" class="modal fade advanceSearch" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="position: fixed; overflow: hidden">
        <%--Bug ID: 6315--%>
        <div class="modal-dialog popup_area" style="height: 100%; margin-top: 6%;">
            <div class="modal-content" style="width: 90%; margin: auto; height: auto; padding-bottom: 10px;">
                <div class="modal-header">

                    <button type="button" id="btnClose" data-dismiss="modal" class="close" title="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                    <h4 class="modal-title" id="H2">Edit Banner </h4>
                </div>
                <div class="modal-body" style="padding: 10px">
                    <div class="divDialogElements" id="myid">
                        <div id="my-tab-content" class="tab-content">
                            <div class="grid-section">
                                <div class="usage-section usage_section_1">
                                    <div class="report_outage_img">
                                        <img id="imgbanner1" alt="Banner Preview" src="" onerror="imgError(this)" />
                                    </div>


                                    <div class="report_upload_box">
                                        <div class="choose_file_discardbtn">

                                            <span class="submit-button btn btn-primary btn-file" id="lblFileupload" style="float: left !important; line-height: 22px; font-size: 14px; padding: 3px 11px !important; margin-bottom: -4px; font-family: MyriadPro-Regular !important; border-radius: 5px !important;">Choose File
                                            <asp:FileUpload ClientIDMode="Static" ID="FileUpload2" runat="server" onchange="File_Change('FileUpload2','imgbanner1','btnDiscard1','1',this);" Style="float: left; width: 230px;" />

                                            </span>
                                            <div class="file_chosen_box">
                                                <i id="nofile">No File Chosen</i>
                                                <img id="btnRemoveFile" alt="Remove" src="../images/Payment_DeleteIcon.png"
                                                    onclick="return removeFile();" />
                                            </div>
                                        </div>
                                        <div class="select_module_box">
                                            <label style="margin-top: 10px; float: left;">Select Module:</label>
                                            <label ID="lblModule" style="width:170px; margin-top: 13px; margin-left: 19px; border: 1px solid #ccc;""></label>
                                            <%-- Against Bug ID: 27056 --%>
                                          <%--  <asp:DropDownList ID="ddlModuleid" ClientIDMode="Static"  runat="server" Style="width: 170px; margin-top: 13px; margin-left: 19px; border: 1px solid #ccc;" onchange="openFile(event);"></asp:DropDownList>--%>
                                            <div class="clearfix"></div>

                                            <input type="radio" name="radioName" value="0" checked="checked" />
                                            Current Window
                                            <input type="radio" name="radioName" value="1" style="margin-left: 40px;" />
                                            New Tab                                      
                                        </div>
                                    </div>
                                    <div class="select_sch_box">
                                        <label style="background-color: #cfcfcf; width: 100%; display: block; padding: 5px;">Links: </label>
                                        <div class="clearfix"></div>
                                        <div class="check">
                                            <table class="tble-pop" style="width: 100%;">
                                                <tr>
                                                    <td>
                                                         <input type="radio" name="radiocheck" id="ExternalLink" class="checkButton" value="1"  style="margin-right: 4px"/>External Link</td>
                                                        <%--<input type="checkbox" id="ExternalLink" class="checkButton" name="check" value="1" style="margin-right: 4px" />--%>

                                                    <td>
                                                        <asp:TextBox ID="txtExternalLink" runat="server" ClientIDMode="static" title="External Link" Style="width: 86%; float: left;"></asp:TextBox>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                         <input type="radio" name="radiocheck" id="InternalLink" class="checkButton" value="0" checked="checked"  style="margin-right: 4px"/>Internal Link</td>
                                                        <%--<input type="checkbox" id="InternalLink" value="0" name="check" class="checkButton" checked="checked" style="margin-right: 4px" />--%>

                                                    <td>
                                                        <asp:TextBox ID="txtInternalLink" runat="server" ClientIDMode="static" title="Internal Link" Style="width: 86%; float: left;"></asp:TextBox>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer" style="padding: 15px 0 0 0px;">
                                    <div style="float: left; text-align: right; width: 100%;">
                                        <%--  <asp:Button runat="server" CssClass="submitBtn" ID="btnChangebanner" Text="Change" ToolTip="Change" ClientIDMode="Static" OnClientClick="return IsFileSelected();" Style="margin-top: 0;" />--%>
                                        <input type="button" class="submitBtn" id="btnChangebanner" value="Update" style="margin-top: 0;" onclick="return false;" />
                                        <input id="btnDiscard1" type="button" value="Discard" style="display: none; margin-top: 0px;" class="submitBtn" />
                                        <a class="sdsdsd"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
