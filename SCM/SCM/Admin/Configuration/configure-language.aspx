<%@ Page Title="Configure Settings" Language="C#" MasterPageFile="~/Configuration/Configuration.master" AutoEventWireup="true" CodeBehind="configure-language.aspx.cs" Inherits="AdminPanel.configure_language" %>

<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">

    <input type="hidden" class="activeli_list" value="sidebar_configurelanguage" />
    <script src="../js/configure-language.js"></script>
    <style>
        .FLeft_Area
        {
            float: left;
            padding-right: 10px;
            margin: 0px 0px 0px 0px;
        }

        .usage-area-section ul
        {
            float: left;
            margin: 0px;
        }

        input[type="radio"], input[type="checkbox"]
        {
            line-height: normal;
            margin: 4px 5px 0 0;
        }
    </style>
    <uc1:jqxGrid ID="JqxGrid1" runat="server" />
    <div class="top-header-area">
        <h2>Language Settings</h2>
    </div>
    <div class="grid-section">
        <div class="usage-area-section" style="padding: 14px 0px 0px 14px; display: table; width: 100%; border-bottom: 2px solid #ebebeb;">
            <div id="jqxgrid" class="jqgrid">
            </div>
        </div>
    </div>
    <div class="clear">
        &nbsp;
    </div>
    <center>
            <%--<asp:Button ID="btnAuthentication" runat="server" Text="Save" CssClass="submitBtn"
                ToolTip="Save Setting" />--%>
        <input id="btnSubmit" type="button" class="submitBtn" value="Save" title="Save" />

    </center>
</asp:Content>
