<%@ Page Title="Rate Calculator" Language="C#" MasterPageFile="~/BillingMaster.Master" AutoEventWireup="true" CodeBehind="RateCalculator.aspx.cs" Inherits="CustomerPortal.RateCalculator" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
      <input type="hidden" class="activeli_list" value="billing" />
    <div class="red_calculator_tbl">
        <table width="100%" border="0">
            <tr>
                <th colspan="2" width="50%">Jun 2015</th>
                <th colspan="2" width="50%">Comparison</th>
            </tr>
            <tr>
                <td>Current Plan</td>
                <td>
                    <asp:Label ID="lblCurrPlan" runat="server" ClientIDMode="Static"></asp:Label>
                </td>
                <td>New Plan</td>
                <td>
                    <asp:DropDownList ID="ddlCurrPlan" runat="server" ClientIDMode="Static" AutoPostBack="True" OnSelectedIndexChanged="ddlCurrPlan_SelectedIndexChanged">
                        <asp:ListItem Text="Select" Value=""></asp:ListItem>
                        <asp:ListItem Text="Hourly" Value="4"></asp:ListItem>
                    <%--    <asp:ListItem Text="Seasonal" Value="5"></asp:ListItem>--%>
                        <asp:ListItem Text="Tier" Value="6"></asp:ListItem>
                        <asp:ListItem Text="Fixed" Value="7"></asp:ListItem>
                    </asp:DropDownList></td>
            </tr>
            <tr>
                <td>Total Unit consumed</td>
                <td>
                    <asp:Label ID="lblCurrTotalUnits" runat="server" ClientIDMode="Static"></asp:Label></td>
                <td>Total Unit consumed</td>
                <td>
                    <asp:Label ID="lblConsumedUnits" runat="server" Text="" ClientIDMode="Static"></asp:Label></td>
            </tr>
            
            <tr>
                <td>Total bill</td>
                <td>
                    <asp:Label ID="lblCurrBill" runat="server" ClientIDMode="Static"></asp:Label></td>
                <td>Total bill</td>
                <td>
                    <asp:Label ID="lblConsumedBill" Text="" runat="server" ClientIDMode="Static"></asp:Label></td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td><asp:Label ID="lblPotentialSaving" Text="Potential Saving" runat="server" ClientIDMode="Static"></asp:Label></td>
                <td><strong>
                    <asp:Label ID="lblSaving" runat="server" Text="" ClientIDMode="Static"></asp:Label>
                    </strong>
                    <asp:Image ID="imgUrl" runat="server" ClientIDMode="Static"  />

                </td>
            </tr>
            <tr style="display:none">
                <td style="height: 20px">Rate per kWh/hr</td>
                <td style="height: 20px">
                    <asp:Label ID="lblCurrRate" runat="server" Text="" ClientIDMode="Static"></asp:Label></td>
                <td style="height: 20px">
                   Rate per kWh/hr </td>
                <td style="height: 20px"><asp:Label ID="lblConsumedRate" runat="server" Text="" ClientIDMode="Static"></asp:Label></td>
            </tr>
        </table>
    </div>
    <style type="text/css">
        #imgUrl {
        width:15%;
        margin-left:5px;
        }
    </style>
    <script>
        $(document).ready(function () {

            $(".nav_left ul li").removeClass('active');
            $(".icon_rate_calculator").addClass('active')
        })

        
    </script>
</asp:Content>
