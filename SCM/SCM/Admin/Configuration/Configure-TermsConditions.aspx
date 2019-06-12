<%@ Page Title="Terms and Conditions" Language="C#" MasterPageFile="~/Administration.Master" AutoEventWireup="true" CodeBehind="Configure-TermsConditions.aspx.cs" Inherits="AdminPanel.Configure_TermsConditions" %>

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
         @media only screen and (min-width : 1900px) and (max-width : 3500px) {
        
           .grid-section .note-editor .note-editable.panel-body
            {
                height:600px !important;
            }
        }
    </style>
    <input type="hidden" class="activeli_list" value="sidebar_TermsConditions" />
    
    </asp:ScriptManager>
    <script src="../js/Configure-TermsConditions.js"></script>
    <div class="top-header-area">
        <h2>Terms and Conditions</h2>
    </div>
    <div class="grid-section">
        <div id="summernote">
            <p></p>
        </div>
        <%--<cc1:Editor ID="editordesc" runat="server" TabIndex="0" />--%>
    </div>
    <div class="outage_sbt_box">
        <button id="btnClear" type="button" class="submitBtn" value="" tabindex="1">Clear</button>

        <button id="btnSave" type="button" class="submitBtn" value="" tabindex="2">Save</button>
    </div>
</asp:Content>
