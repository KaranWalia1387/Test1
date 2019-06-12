<%@ Page Title="Disclaimer Settings" Language="C#" MasterPageFile="~/Administration.Master" AutoEventWireup="true" CodeBehind="DisclaimerSettings.aspx.cs" Inherits="AdminPanel.DisclaimerSettings" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <uc1:jqxGrid ID="JqxGrid1" runat="server" />
    <script src="../js/bootstrap-tabs.js"></script>
    <link href="../css/w2ui-1.4.2.min.css" rel="stylesheet" />
    <script src="../js/w2ui-1.4.2.min.js" type="text/javascript"></script>
    <script src="../js/Validate.js"></script>
    <script src="../js/Configure-DisclaimerSettings.js"></script>

    <style type="text/css">
        .inner-right-section {
            padding-bottom:0px;
        }
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

        .grid-section table tr:nth-child(odd) {
            background: #F8FAFB;
        }
        .grid-section {
            overflow:auto;
                height: 88%;
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
        #tblDetails input[type="text"] {
            border: 1px solid #cfcfcf;
            padding: 0 0 0 4px;
            width: 250px !important;
            transition:border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
            -webkit-transition:border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
            -o-transition:border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
            -ms-transition:border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
            -moz-transition:border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s
        }
            #tblDetails input[type="text"]:focus {
                border-color: #66afe9;
                box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(102, 175, 233, 0.6);
                -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(102, 175, 233, 0.6);
                outline: 0 none;
                color:#000;
            }
    </style>

    <input type="hidden" class="activeli_list" value="sidebar_Disclaimer" />
    </asp:ScriptManager>
    <div class="top-header-area">
        <h2>Disclaimer Settings</h2>
    </div>
    <div class="grid-section">       
        <asp:Repeater ID="rptDisclaimer" runat="server" ClientIDMode="Static">
            <HeaderTemplate>
                <table id="tblDetails" width="100%">
                    <tr>
                        <th>Module</th>
                        <th>English Text</th>
                        <th>Spanish Text</th>
                    </tr>
            </HeaderTemplate>
            <ItemTemplate>
                <tr>
                    <td>
                        <asp:Label ID="lblmodule" runat="server" CssClass="lblemail" Text='<%# Eval("ControlId")%>' ClientIDMode="Predictable"></asp:Label>
                    </td>                   
                    <td>
                        <asp:TextBox ID="txtEnglishText" CssClass="emailtxt" runat="server" name="EnglishText" Text='<%# Eval("EnglishText") %>' ClientIDMode="Predictable" Width="350px"></asp:TextBox>
                    </td>
                     <td>
                        <asp:TextBox ID="txtSpanishText" CssClass="emailtxt" runat="server" name="SpanishText" Text='<%# Eval("SpanishText") %>' ClientIDMode="Predictable" Width="350px"></asp:TextBox>
                    </td>                    
                </tr>
            </ItemTemplate>
            <FooterTemplate></table></FooterTemplate>
        </asp:Repeater>
    </div>
    <input type="hidden" id="hdnValue" />
    <div class="outage_sbt_box">
        <input type="button" class="btnUpdate submitBtn" value="Save" id="btnUpdate" />
    </div>
    <style>
        #jqxgrid td, th {
            padding: 0 8px;
        }
    </style>
</asp:Content>
