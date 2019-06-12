<%@ Page Title="Power Generation" Language="C#" MasterPageFile="Master.Master" AutoEventWireup="true"
    CodeBehind="weatherAPI-PowerGeneration.aspx.cs" Inherits="CustomerPortal.weatherAPI_PowerGeneration" %>

<%@ Register Src="UserControls/power-usage.ascx" TagName="power" TagPrefix="uc5" %>
<%@ Register Src="UserControls/water-usage.ascx" TagName="water" TagPrefix="uc6" %>
<%-- <%@ Register Src="UserControls/Power.ascx" TagName="Power" TagPrefix="uc5" %>--%>
<%@ Register Src="UserControls/RatePieChart.ascx" TagName="RatePieChart" TagPrefix="uc1" %>
<%@ Register TagPrefix="uc2" TagName="TitleBar2" Src="UserControls/RatePieChart.ascx" %>
<%@ Register Src="UserControls/BillingUserControl.ascx" TagName="BillingUserControl"
    TagPrefix="uc3" %>
<%@ Register Src="UserControls/Electric_bill_discount.ascx" TagName="Electric_bill_discount"
    TagPrefix="uc4" %>
<%@ Register Src="UserControls/gas-usage.ascx" TagName="gas" TagPrefix="uc7" %>
<%@ Register Src="UserControls/NotificationUserControl.ascx" TagName="Notifications"
    TagPrefix="uc8" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="https://www.google.com/jsapi" type="text/javascript"></script>
    <script src="js/WeatherAPIPowerGenration.js" type="text/javascript"></script>
    <%-- <script src="js/PowerGenration.js" type="text/javascript"></script>--%>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#' + '<%=btnExporttoExcel.ClientID %>').click(function () {
                try {
                    $('#' + '<%=hdnunit.ClientID %>').val(Gtype);
                    $('#' + '<%=hdntime.ClientID %>').val(Gmode);
                    $('#' + '<%=hdnTitle.ClientID %>').val(DateFromTo);
                }
                catch (e) { }
            });

        });
    </script>
    <style type="text/css">
        .GridTableLabel
        {
            width: 199px !important;
        }

        .DayContainer
        {
            text-align: left;
            width: 81px;
            border: 1px solid #B8B4B1;
            padding: 0px;
            float: left;
            margin-right: 3px;
            background-color: #f7fcf8;
        }

        .DayHeader
        {
            width: 81px;
            background-color: #1EA7DB;
            color: #abfbff;
            font-weight: bold;
            font-size: 14px;
            text-align: center;
        }

        .DateHeader
        {
            overflow: hidden;
            text-align: center;
            padding: 2px 0px;
            color: Black;
        }

        .Condition
        {
            height: 30px;
            overflow: hidden;
            text-align: center;
            padding: 2px 0px;
            font-size: 12px;
            color: Black;
        }

        .Temp
        {
            font-weight: normal;
            padding-bottom: 4px;
            color: Black;
        }

        .Lowtemp
        {
            font-weight: normal;
            color: Black;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="hdnunit" runat="server" />
    <asp:HiddenField ID="hdntime" runat="server" />
    <asp:HiddenField ID="hdnTitle" runat="server" ClientIDMode="Static"/>
    <asp:HiddenField ID="hdnType" runat="server" />
    <asp:HiddenField ID="hdnMode" runat="server" />
    <table id="TableBill">
        <tr>
            <td width="25%">
                <uc5:power ID="power1" runat="server" />
            </td>
            <td width="50%" rowspan="2">
                <div class="TableCellContainer">
                    <div class="TableCellContainerHeader">
                        <div class="generationIcon">
                            &nbsp;
                        </div>
                        <div class="TableCellHeaderTitle">
                            Solar
                        </div>
                        <div id="divgasUsage" runat="server" style="float: right; margin-right: 0px;">
                            <span class="gas_icon">
                                <img src="images/usage/gas.png" />
                            </span>
                            <div class="TableCellHeaderTitle">
                                <a href="usage-gas.aspx" style="text-decoration: none;">Gas</a>
                            </div>
                        </div>
                        <%--<div class="TableCellHeaderTitle" style="margin-left:160px;">
                           <a href="SolarGeneration.aspx"> Solar</div>--%>
                        <div id="divpowerUsage" runat="server" style="float: right; margin-right: 10px;">
                            <div class="TableCellHeaderTitle" style="float: right">
                                <a href="power-usage.aspx" style="text-decoration: none;">Power</a>
                            </div>
                            <div class="PowerIcon" style="float: right;">
                                &nbsp;
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
                    <div class="TableCellContainerContent Contentheight CenterConterWidth">
                        <div style="margin-top: 3px;text-align: center;" ><asp:Label runat="server" Text="" id="lblUsageDate" ClientIDMode="Static" style="font-weight: bold;"></asp:Label></div>
                        <div id="chart_div" class="radius" style="height: 225px;">
                        </div>
                        <div class="clear">
                            &nbsp;
                        </div>
                        <div style="width: 601px; overflow-x: scroll; height: 131px; margin: 0 auto;">
                            <div style="width: 870px; overflow-x: auto;" id="divWether">
                            </div>
                        </div>
                        <div class="clear">
                        </div>
                        <div style="width: 620px; margin: 1px auto 0px;">
                            <div style="padding: 0px 0px 0px 12px; float: left; width: 185px;" id="GenrationType">
                                <a href="#" mode="K">
                                    <div class="LeftTabBtns TabBtns" style="width: 30px;">
                                        kWh
                                    </div>
                                </a><a href="#" mode="D">
                                    <div class="RightTabBtns TabBtns_ro" style="width: 30px;text-align:center;">
                                        $
                                    </div>
                                </a>
                            </div>
                            <div style="padding: 0px 0px 0px 0px; float: left; text-align:center; width: 130px;">
                                <asp:ImageButton ID="btnExporttoExcel" runat="server" ImageUrl="images/table-export.png"
                                    OnClick="btnExporttoExcel_Click" ClientIDMode="Static" /><br />
                                <label style="font-weight: bold;">
                                    Export to Excel</label>
                                
                            </div>
                            <div class="TableCellHeaderTitle roImages" style="padding: 0px 0px 0px 0px; float: right; width: 250px;"
                                id="GenrationMode">
                                <a href="#" mode="L">
                                    <div class="LeftTabBtns TabBtns_ro">
                                        Last 10 Days
                                    </div>
                                </a><a href="#" mode="N">
                                    <div class="RightTabBtns TabBtns">
                                        Next 10 Days
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="clear">
                        </div>
                    </div>
                    <div class="TableCellContainerFooter">
                        &nbsp;
                    </div>
                </div>
            </td>
            <td width="25%">
                <div id="RateDiv" runat="server">
                </div>
                <%-- <div class="TableCellContainer">
                    <%--<div class="TableCellContainerHeader">
                        <div class="BillRatesIcon">
                            &nbsp;
                        </div>
                        <div class="TableCellHeaderTitle">
                            Rates
                        </div>
                    </div>--%>
                <%--<div class="TableCellContainerContent UserControlHeight">--%>


                <%-- <div class="GridTableLabel OddColor">
                            Current Time</div>
                        <div class="GridTableColon OddColor ">
                            :</div>
                        <div class="GridTableData OddColor">
                            <asp:Label ID="lblCurrentTime" runat="server" Text="N/a"></asp:Label></div>
                        <div class="GridTableLabel EvenColor">
                            Current Rate</div>
                        <div class="GridTableColon EvenColor ">
                            :</div>
                        <div class="GridTableData EvenColor">
                            <asp:Label ID="lblRate" runat="server" Text="N/a"></asp:Label></div>
                        <div class="GridTableLabel OddColor">
                            &nbsp;</div>
                        <div class="GridTableColon OddColor ">
                            &nbsp;</div>
                        <div class="GridTableData OddColor">
                            &nbsp;</div>
                        <div class="GridTableLabel EvenColor">
                            &nbsp;</div>
                        <div class="GridTableColon EvenColor ">
                            &nbsp;</div>
                        <div class="GridTableData EvenColor">
                            &nbsp;</div>--%>
                <%--  </div>--%>
                <%--  <div class="TableCellContainerFooter">
                        &nbsp;
                    </div>
                </div>--%>
            </td>
        </tr>
        <tr>
            <td width="25%">
                <uc6:water ID="water1" runat="server" />
                <uc7:gas ID="gas1" runat="server" />
                <uc8:Notifications ID="notification1" runat="server" />
            </td>
            <td width="25%">
                <uc3:BillingUserControl ID="BillingUserControl1" runat="server" />
            </td>
        </tr>
    </table>
    <script src="js/popup.js" type="text/javascript"></script>
</asp:Content>
