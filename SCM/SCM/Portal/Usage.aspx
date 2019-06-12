<%@ Page Title="Usage" Language="C#" MasterPageFile="~/Master.master" AutoEventWireup="true"
    CodeBehind="Usage.aspx.cs" Inherits="CustomerPortal.Usage" %>
<%@ Register Src="UserControls/BillingUserControl.ascx" TagName="BillingUserControl"
    TagPrefix="uc3" %>
<%@ Register Src="UserControls/power-usage.ascx" TagName="power" TagPrefix="uc4" %>
<%@ Register Src="UserControls/water-usage.ascx" TagName="water" TagPrefix="uc5" %>
<%@ Register Src="UserControls/gas-usage.ascx" TagName="gas" TagPrefix="uc6" %>
<%@ Register Src="UserControls/NotificationUserControl.ascx" TagName="Notifications"
    TagPrefix="uc7" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="https://www.google.com/jsapi" type="text/javascript"></script>
 
    <style type="text/css">
        .TableCellHeaderTitle img
        {
            height: auto;
        }
    @media (min-width:767px) and (max-width:1024px) {
     #usageMapMode {
           width: 27% !important;
       }
    }
      
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <label style="font-weight: bold;">
    </label>
    <asp:HiddenField ID="hdnunit" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdntime" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnTitle" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnType" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />
    <table id="TableBill">
        <tr>
            <td width="25%">
                <uc4:power ID="power1" runat="server" />
                <uc5:water ID="water1" runat="server" />
                <uc6:gas ID="gas1" runat="server" />
                <uc7:Notifications ID="notification1" runat="server" />
            </td>
            <td width="50.2%" rowspan="2">
                <div class="TableCellContainer">
                    <div class="TableCellContainerHeader">
                        <div id="divpowerUsage" runat="server" style="float: left; margin-right: 10px; width: 180px;">
                            <div class="PowerIcon">
                                &nbsp;
                            </div>
                            <div class="TableCellHeaderTitle">
                                Power 
                            </div>
                        </div>



                        <div id="divgenerationicon" runat="server" style="float: right; margin-right: 10px;">
                            <div class="generationIcon">
                                &nbsp;
                            </div>
                            <div class="TableCellHeaderTitle">
                                <a href="weatherAPI-PowerGeneration.aspx" style="text-decoration: none;">Solar</a>
                            </div>
                        </div>

                        <div id="divgasUsage" runat="server" style="float: right; margin-right: 10px;">
                            <span class="gas_icon">
                                <img src="images/usage/gas.png" />
                            </span>
                            <div class="TableCellHeaderTitle">
                                <a href="usage-gas.aspx" style="text-decoration: none;">Gas</a>
                            </div>
                        </div>

                        <div id="divusagewatericon" runat="server" style="float: right; margin-right: 10px;">
                            <div class="WaterIcon">
                                &nbsp;
                            </div>
                            <div class="TableCellHeaderTitle">
                                <a href="usage-water.aspx" style="text-decoration: none;">Water</a>
                            </div>
                        </div>
                    </div>
                    <div id="dvChartMain" runat="server">
                        <div class="TableCellContainerContent Contentheight CenterConterWidth">
                            <div style="margin-top: 15px; text-align: center;">
                                <asp:Label ID="lblCharttitle" ClientIDMode="Static" runat="server" Text="" Style="font-weight: bold;"></asp:Label>
                            </div>
                            <div id="chart" class="radius" style="height: 230px; margin-top: 18px;">
                            </div>
                            <div style="width: 300px; /* margin: 48px auto 10px; */margin-left: 170px; margin-top: 16px; height: 30px;">
                                <span class="GraphLegend_low">&nbsp;</span>
                                <span class="GraphLegend_data_low">Low Usage</span>
                                <span class="GraphLegend_Avg">&nbsp;</span>
                                <span class="GraphLegend_data_Avg">Average Usage</span>
                                <span class="GraphLegend_High">&nbsp;</span>
                                <span class="GraphLegend_data_High">High Usage</span>
                                <div class="clear">
                                    &nbsp;
                                </div>
                            </div>
                            <div class="clear">
                                &nbsp;
                            </div>
                            <div style="padding: 0px 0px 0px 40px; margin-top: 10px; float: left; width: 155px;"
                                id="usageMapType">
                                <div class="kwh_button">
                                    <a href="#" type="K" title="kWh"></a>
                                </div>
                                <div class="dollar_button">
                                    <a href="#" type="D" title="$"></a>
                                </div>
                            </div>
                            <div style="padding: 0px 0px 0px 0px; margin-top: 10px; margin-left: 25px; float: left; text-align: center; width: 150px;">
                                <asp:ImageButton ID="btnExporttoExcel" runat="server" ImageUrl="images/table-export.png"
                                    OnClick="btnExporttoExcel_Click1" ClientIDMode="Static" /><br />
                                <label style="font-weight: bold;">
                                    Export to Excel</label>

                            </div>
                            <div style="padding: 0px 50px 0px 0px; margin-top: 10px; float: right; width: 230px;"   id="usageMapMode">
                                <div class="15min">
                                    <a href="#" mode="SI" title="15 Min" style="letter-spacing:-1px;">15 Min </a>
                                </div>
                                 <div class="hourly">
                                    <a href="#" mode="H" title="Hourly">Hourly </a>
                                </div>
                                <div class="daily">
                                    <a href="#" mode="D" title="Daily">Daily </a>
                                </div>
                                <div class="monthly">
                                    <a href="#" mode="M" title="Monthly">Monthly </a>
                                </div>
                            </div>
                        </div>
                        <div class="TableCellContainerFooter">
                            &nbsp;
                        </div>
                    </div>
                </div>
            </td>
            <td width="25%">
                <div id="UsageDiv" runat="server">
                </div>
                <uc3:BillingUserControl ID="BillingUserControl1" runat="server" />
                <uc6:gas ID="gas2" runat="server" />
                <%--<uc2:TitleBar2 ID="TitleBar2" runat="server" />--%>
            </td>
        </tr>
        <tr>
            <td width="25%"></td>
            <td width="25%"></td>
        </tr>
    </table>
    <script src="js/popup.js" type="text/javascript"></script>
</asp:Content>
