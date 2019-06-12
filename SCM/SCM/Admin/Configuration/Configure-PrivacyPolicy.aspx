<%@ Page Title="Privacy Policy" Language="C#" MasterPageFile="~/Administration.Master" AutoEventWireup="true" CodeBehind="Configure-PrivacyPolicy.aspx.cs" Inherits="AdminPanel.Configure_PrivacyPolicy" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit.HTMLEditor" TagPrefix="cc1" %>


<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <style>
        @media (min-width:1500px) and (max-width:3200px) {
            .inner-right-section .grid-section {
                background: #fff none repeat scroll 0 0;
                clear: both;
                height: 88%;
                margin: -4px 0 0;
                padding: 0;
            }

            .inner-right-section .right-content-area {
                height: 100%;
                padding: 0;
            }
        }

         .note-editor.note-frame .note-editing-area .note-editable {
             overflow-x:hidden !important;
         }

        .inner-right-section .grid-section {
            background: #fff none repeat scroll 0 0;
            clear: both;
            height: 88%;
            margin: -4px 0 0;
            padding: 0;
        }

        .inner-right-section .right-content-area {
            height: 92%;
            padding: 0;
        }
    </style>
    <input type="hidden" class="activeli_list" value="sidebar_PrivacyPolicy" />
    </asp:ScriptManager>
    <script src="../js/Configure-PrivacyPolicy.js"></script>
    <div class="top-header-area">
        <h2>Privacy Policy</h2>
    </div>
    <div class="grid-section">
        <%--<cc1:Editor ID="editordesc" runat="server" TabIndex="0" />--%>
        <div id="summernote">
            <p></p>
        </div>
    </div>
    <div class="outage_sbt_box">
        <button id="btnClear" type="button" class="submitBtn" value="" tabindex="1">Clear</button>

        <button id="btnSave" type="button" class="submitBtn" value="" tabindex="2">Save</button>
    </div>

</asp:Content>

