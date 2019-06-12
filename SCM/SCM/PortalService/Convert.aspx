<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Convert.aspx.cs" Inherits="SCM_Service.ConvertPage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <asp:TextBox ID="txtEncrypt" runat="server" TextMode="MultiLine" Height="128px" Width="1258px"></asp:TextBox>
    <div>
    
        <asp:Button ID="btnEncrypt" runat="server" Text="Encrypt" OnClick="btnEncrypt_Click" />
        <br />
     
        <br />
        <br />
        <asp:TextBox ID="txtDecrypt" runat="server" TextMode="MultiLine" Height="127px" Width="1260px"></asp:TextBox>
        <asp:Button ID="btnDecrypt" runat="server" Text="Decrypt" OnClick="btnDecrypt_Click" />
        <br />
       
    </div>
    </form>
</body>
</html>
