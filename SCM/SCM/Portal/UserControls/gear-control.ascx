<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="gear-control.ascx.cs"
    Inherits="CustomerPortal.UserControls.gear_control" %>
<div class="login-panel" id="hello">
    <div style="height: 85px; padding: 5px 10px; text-align: left;">
        <div style="padding: 5px 0px 10px;">
            Select Address</div>
        <asp:DropDownList ID="ddlAddress" runat="server" AutoPostBack="true" Style="width: 285px;"
            class="addressDropdown" OnSelectedIndexChanged="ddlAddress_SelectedIndexChanged">
        </asp:DropDownList>
    </div>
    <asp:LinkButton ID="btnLogOff" runat="server" Text="Log Off" CssClass="button greyBttn "
        Style="margin: 5px; float: right;" OnClick="btnLogOff_Click" />
    <a href="Settings.aspx" class="button greyBttn" style="margin: 5px; float: left;">Settings</a>
</div>
