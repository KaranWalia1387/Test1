<%@ Page Language="C#" Title="Payment Failed" AutoEventWireup="true"  MasterPageFile="BillingMaster.Master" CodeBehind="PageFailed.aspx.cs" Inherits="PayPalDemo.PageFailed" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
    <input type="hidden" class="activeli_list" value="billing" />
  <p style="font-weight:bold;left:25%;top:50%;position:absolute">
   Your transaction has been failed due to some technical reason.
      </p>
</asp:Content>
