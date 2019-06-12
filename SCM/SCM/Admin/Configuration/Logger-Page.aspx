<%@ Page Title="" Language="C#" MasterPageFile="~/Configuration/Configuration.master" AutoEventWireup="true" CodeBehind="Logger-Page.aspx.cs" Inherits="Configuration.Logger_Page" %>
<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <style>
        .left_logger {
            width:20%; float:left; margin:0; padding:15px;
        }

        .right_logger {
            width:79%; float:left; margin:0 0 0 1%;  padding:15px;
        }

        .left_logger select {
            width: 175px;
    padding: 3px 2px;
    margin: 0px 0px 2px;
        }
        .button-area {
            border-top:1px solid #ccc;
            float:left;
            width:100%;
            text-align:center;
        }
    </style>
    <div class="top-header-area">
        <div class="Leftheader-Pannel">
            <h2>Logger</h2>
        </div>

    </div>

    <asp:Label ID="Label1" runat="server" ForeColor="#FF3300" Text="*"></asp:Label>

    <div class="left_logger">
        <asp:DropDownList ID="DDL_Path" runat="server" AutoPostBack="True" OnSelectedIndexChanged="DDL_Path_SelectedIndexChanged">
        <asp:ListItem Text="SELECT" Value=""></asp:ListItem>

            <%--<%$ AppSettings:PathLogout%>"--%>
         <%--   <asp:ListItem Text="<%$ ConfigurationManager.AppSettings["ADMIN"] %>"></asp:ListItem>
        <asp:ListItem Text="ADMIN" Value="D:\SCMTFS\ADMIN\AdminPanel\New folder\"></asp:ListItem>
        <asp:ListItem Text="ADMIN SERVICE" Value="D:\SCMTFS\ADMINSERVICE\AdminPanel_Service\AdminServicelog\"></asp:ListItem>
        <asp:ListItem Text="CUSTOMER POTAL" Value="D:\SCMTFS\CUSTOMERPOTAL\CustomerPortal\Servicelog\"></asp:ListItem>
        <asp:ListItem Text="CUSTOMER SERVICE" Value="D:\SCMTFS\SERVICE\SCM_Service\Servicelog\"></asp:ListItem>--%>
    </asp:DropDownList>
        <div class="clearfix"></div>
        <asp:ListBox ID="lstbox_textfile" runat="server" Width="175px" Rows="21" AutoPostBack="True" OnSelectedIndexChanged="lstbox_textfile_SelectedIndexChanged"></asp:ListBox>
        

    </div>

    <div class="right_logger">
        <asp:TextBox ID="txtMessage" runat="server" TextMode="MultiLine" Width="100%" Rows="20"></asp:TextBox>
    </div>

    
    
        <div class="clearfix"></div>
       
    <div class="button-area">
        <asp:Button ID="btnUpdate" runat="server" Text="Update" OnClick="btnUpdate_Click" CssClass="DefaultBtn" Visible="False" />
        <asp:Button ID="btnDelete" runat="server" Text="Delete" OnClick="btnDelete_Click" CssClass="DefaultBtn" />
    </div>
   
</asp:Content>
