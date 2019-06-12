<%@ Page Title="AutoResponse" Language="C#" MasterPageFile="~/Notification/Notification.master" AutoEventWireup="true" CodeBehind="AutoResponse.aspx.cs" Inherits="AdminPanel.Notification.AutoResponse" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit.HTMLEditor" TagPrefix="cc1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <input type="hidden" class="activeli_list" value="sidebar_autoresponse_inner" />


    <link href="../css/Notification.css" rel="stylesheet" />
    <script src="../js/auto-response.js"></script>
    <script type="text/javascript">
        function clearEditorValue() {
            $('#summernote').summernote('code', '');
            $("form input:checkbox").attr('Checked', false);
        }
    </script>
    <div class="top-header-area">
        <div class="Leftheader-Pannel" style="width: 35%;">
            <h2>Auto Response Settings</h2>
        </div>
    </div>
    <div class="inner-right-right-section" id="rgtMail">
        <br />
        <label id="lblAutoRespone" style="padding-left: 18px !important;    margin-right: 20px;">Enable Auto Response</label>
        <asp:CheckBox ID="AutoResp" runat="server" />
        <br />
         <br />
        <label id="HTMLEditor">HTML Editor</label>
        <br />

        <div id="summernote">
            <p></p>
        </div>
        <br />
        <div class="setting_save_box" style="float: right; text-align: right;">

            <input type="button" class="submitBtn" id="btnClear" value="Clear" title="Clear" onclick="clearEditorValue();" />
            <asp:Button ID="SendResponse" runat="server" Text="Save" CssClass="DefaultBtn" ToolTip="Save Setting" ClientIDMode="Static" />
        </div>
    </div>

    <style>
        #collapseOne {
            display: none !important;
        }

        .checkbox input[type=checkbox], .checkbox-inline input[type=checkbox], .radio input[type=radio], .radio-inline input[type=radio] {
            position: inherit;
        }

        .note-editor {
            width: 96%;
            margin-left: 18px;
                margin-top: 5px;
        }
        #HTMLEditor{
            margin-left: 18px;
        }
        .note-editor .modal-body {
                padding:10px;
                width:100%;
                display:table;
            }
             .note-editor .form-group {
                     float: left;
    width: 100%;
             }
            .note-editor .form-group label {
                    width: 40%;
                     float: left;
            }
               .note-editor .form-group input {
                    width: 55%;
                     float: left;
            }
    </style>
</asp:Content>
