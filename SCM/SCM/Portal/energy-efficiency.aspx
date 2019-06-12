<%@ Page Title="Conservation" Language="C#" MasterPageFile="Master.Master" AutoEventWireup="true"
    CodeBehind="energy-efficiency.aspx.cs" Inherits="CustomerPortal.energyefficiency" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style type="text/css">
        .MessageContainer img, .MessageContainerActive img
        {
            width: 200px;
            padding-left: 40px;
        }
        table
        {
            width: 100%;
            margin-top: 20px;
        }
        table tr td
        {
            text-align: center;
            vertical-align: top;
            padding-top: 5px;
        }
        table tr:not(:last-child) td img
        {
            width: 120px;
        }
        table#programTable tr td a img, table#rebateTable tr td a img
        {
            width: 120px;
        }
        .EfficiencyImagesDiv
        {
            float: left;
            padding: 0 50px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="rebatescount" runat="server" Value="0" />
    <asp:HiddenField ID="programcount" runat="server" Value="0" />
    <div class="TableCellContainer">
        <div class="TableCellContainerHeader">
            <div class="EnergyEfficencyIcon">
                &nbsp;</div>
            <div class="TableCellHeaderTitle">
                Efficiency</div>
        </div>
        <div class="TableCellContainerContentBig TableCellContainerContent">
            <div id="RightPanel" class="RightPanel" style="overflow: auto; width: 1280px;">
                <div class="TableCellHeaderTitle">
                    REBATES</div>
                <div class="clear">
                    &nbsp;</div>
                <div id="divRebate" runat="server" style="width: 1280px; overflow-x: scroll; overflow-y: hidden;">
                </div>
                <div class="TableCellHeaderTitle">
                    PROGRAMS</div>
                <div class="clear">
                    &nbsp;</div>
                <div id="divProgram" runat="server" style="width: 1280px; overflow-x: scroll; overflow-y: hidden;">
                </div>
            </div>
        </div>
        <div class="TableCellContainerFooter">
            &nbsp;</div>
    </div>
</asp:Content>
