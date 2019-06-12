<%@ Page Title="Notification Workflow" Language="C#" MasterPageFile="~/Administration.master" AutoEventWireup="true" CodeBehind="configure-notificationtemplate.aspx.cs" Inherits="AdminPanel.configure_notificationtemplate" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <uc1:jqxGrid ID="JqxGrid1" runat="server" />
    <script src="../js/bootstrap-tabs.js"></script>
    <link href="../css/w2ui-1.4.2.min.css" rel="stylesheet" />
    <script src="../js/w2ui-1.4.2.min.js" type="text/javascript"></script>
    <script src="../js/Validate.js"></script>
    <script src="../js/Configure-NotificationTemplate.js"></script>


    <style type="text/css">
        .grid-section table th {
            background: #e8e8e8;
            padding: 5px 7px;
            border: 1px solid #c5c5c5;
        }

        .errorbox {
            border: 1px solid #ffa8a8 !important;
            background-color: #fff4eb !important;
        }

        .grid-section table td {
            padding: 5px 7px;
            border: 1px solid #c5c5c5;
        }
        .grid-section {
            overflow:auto;
                height: 89%;
        }
        .inner-right-section {
            padding-bottom:0px;
        }

        .grid-section table tr:nth-child(odd) {
            background: #F8FAFB;
        }


        .fancybox-skin .fancybox.GridImage {
            width: 420px !important;
        }

        #ClosePopupAddTopic {
            margin: -20px -20px 0 0;
            width: 34px;
            height: 35px;
        }

        .AddUserContentData {
            width: 260px;
        }

        .AddUserContentLabel1 {
            width: 136px;
        }

        .txtemail {
            margin-top: 6px;
            margin-left: 6px;
        }
    </style>
    <input type="hidden" class="activeli_list" value="sidebar_NotificationWorkflow" />
    </asp:ScriptManager>
    <div class="top-header-area">
        <h2>Notification Workflow</h2>

    </div>
    <div class="grid-section">
        <%--  <div id="jqxgrid" class="jqgrid">
                    </div>--%>
        <asp:Repeater ID="rptNotification" runat="server" ClientIDMode="Static">
            <HeaderTemplate>
                <table id="tblDetails" width="100%">
                    <tr>
                        <th>Email Type</th>
                        <th>Status</th>
                        <th>Email</th>
                    </tr>
            </HeaderTemplate>
            <ItemTemplate>

                <tr>
                    <td>
                        <asp:Label ID="lblemailtype" runat="server" CssClass="lblemail" Text='<%# Eval("EmailType")%>' ClientIDMode="Predictable"></asp:Label>
                    </td>
                    <td style="display:none; visibility:hidden;">
                        <asp:Label ID="lblEmailTypeID" runat="server" CssClass="lblemailtypeid" Text='<%# Eval("EmailTypeID")%>' ClientIDMode="Predictable"></asp:Label>
                    </td>
                    <td>
                        <asp:CheckBox ID="chkbxemailstatus" runat="server" CssClass="chkstatus" Checked='<%# Eval("EmailStatus")%>' ClientIDMode="Predictable" />
                    </td>
                    <td>
                        <asp:TextBox ID="txtemailid" CssClass="emailtxt" runat="server" ReadOnly='<%#Convert.ToBoolean(Eval("EmailStatus"))==true? false:true%>' name="txtemailid" Text='<%# Eval("EmailId") %>' ClientIDMode="Predictable" Width="350px"></asp:TextBox>
                    </td>
                </tr>
            </ItemTemplate>
            <FooterTemplate></table></FooterTemplate>
        </asp:Repeater>
    </div>
    <input type="hidden" id="hdnValue" />
    <div class="outage_sbt_box">
        <%-- <input type="button" id="btnUpdate" class="submitBtn"/>--%>
        <input type="button" class="btnUpdate submitBtn" value="Save" id="btnUpdate" />
        <%--<asp:Button ID="btnsave" runat="server" Text="Save"   class="submitBtn" />--%>
    </div>


    <style>
        #jqxgrid td, th {
            padding: 0 8px;
        }
    </style>
</asp:Content>
