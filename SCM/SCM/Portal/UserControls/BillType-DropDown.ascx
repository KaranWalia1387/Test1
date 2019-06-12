<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="BillType-DropDown.ascx.cs"
    Inherits="CustomerPortal.UserControls.BillType_DropDown" %>
<asp:DropDownList ID="ddlBillType" runat="server" class="BT">
    <asp:ListItem Text="Power" Value="1"></asp:ListItem>
    <asp:ListItem Text="Water" Value="0"></asp:ListItem>
</asp:DropDownList>
