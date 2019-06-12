<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ConnectMe.ascx.cs" Inherits="CustomerPortal.UserControls.ConnectMe" %>
<div class="TableCellContainer">
    <div class="TableCellContainerHeader">
        <div class="ConnectMeIcon">
            &nbsp;</div>
        <div class="TableCellHeaderTitle">
            <a href="connect-me.aspx">Connect Me</a></div>
    </div>
    <div class="TableCellContainerContent UserControlHeight">
        <div id="MyAccountUsage" class="UserControlLinking">
            <div class="UserControlLink">
                <div class="FacebookIconBig">
                    &nbsp;</div>
                <a href="<%=ConfigurationManager.AppSettings["Facebook"] %>" target="_blank" class="TableCellHeaderTitle">
                    Facebook</a>
                <div class="clear">
                    &nbsp;</div>
            </div>
            <div class="UserControlLink">
                <div class="TwitterIconBig">
                    &nbsp;</div>
               
                    <a href="<%=ConfigurationManager.AppSettings["Twitter"] %>" target="_blank" class="TableCellHeaderTitle">Twitter</a>
                    <div class="clear">
                    &nbsp;</div>
            </div>
            <div class="clear">
                &nbsp;</div>
        </div>
    </div>
    <div class="TableCellContainerFooter">
        &nbsp;</div>
</div>
