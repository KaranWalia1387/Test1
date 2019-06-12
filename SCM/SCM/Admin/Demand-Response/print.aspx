<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="print.aspx.cs" Inherits="AdminPanel.Demand_Response.print" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body >
    <form id="form1" runat="server">
        <div>
            <asp:Image ID="imgPrint" runat="server" />
           
            <div style="clear: both; font-size: 1px; height: 1px; line-height: 1px;">&nbsp;</div>
            <div style="text-align: center; width: 100%;">
                <h1>
                    <asp:Literal ID="ltrlLabel" runat="server"></asp:Literal></h1>
                
            </div>
             <div style="text-align:center; width:100%;"><h4><asp:Literal ID="ltrSearchCriteria" runat="server"></asp:Literal></h4></div>
            <div style="clear: both; font-size: 1px; height: 1px; line-height: 1px;">&nbsp;</div>
            <asp:GridView runat="server" ID="grdPrint">
            </asp:GridView>
            <p>2014 Copyright <a href="http://smartusys.com" target="_blank">Smart Utility Systems</a> (c) | All rights reserved </p>
        </div>
    </form>

</body>
</html>