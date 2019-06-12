<%@ Page Title="Smart Home" Language="C#" MasterPageFile="SmartHomeMaster.Master" AutoEventWireup="true" 
    CodeBehind="SmartHome.aspx.cs" Inherits="CustomerPortal.SmartHome" %>


<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
    <asp:ScriptManager ID="ScriptManager" runat="server">
    </asp:ScriptManager>
     <input type="hidden" class="activeli_list" value="sh"/>
    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
        <ContentTemplate>
            <asp:HiddenField ID="hdnFlag" runat="server" Value="0" />
            <div class="TableCellContainer">
                <div class="TableCellContainerHeader">
                    <div class="SmartHomeIcon">
                        &nbsp;</div>
                    <div class="TableCellHeaderTitle" globalize="ML_SmartHm_div_SH">
                        <%= CustomerPortal.Translator.T("ML_SmartHm_div_SH") %></div>
                    <div style="float: right; margin-right: 30px;" class="TableCellHeaderTitle">
                        <a href="Central-air-system.aspx" globalize="ML_SmartHome_Thermostat"> <%= CustomerPortal.Translator.T("ML_SmartHome_Thermostat") %></a>
                    </div>
                </div>
                <div class="TableCellContainerContent" style="height: 420px;">
                    <table class="SmartHomeImg">
                        <tr>
                            <td width="20%">
                                <div class="Hanimages">
                                    <a href="smart-dishwasher.aspx" title="Dish Washer">
                                        <div class="HanLinkLabel">
                                            <span globalize="ML_SmartHm_div_DW"><%= CustomerPortal.Translator.T("ML_SmartHm_div_DW") %></span></div>
                                        <img src="images/SmartHome/appl_dishwasher.png" alt="dishwasher"/></a>
                                </div>
                                <div class="Hanimagesbutton">
                                    <asp:ImageButton ID="btnDishwasher" runat="server" AlternateText="0" ImageUrl="images/off_button.png" globalize="ML_SmartHm_imgbtn_off"
                                        OnClick="btnDishwasher_Click" />
                                </div>
                            </td>
                            <td width="20%">
                                <div class="Hanimages">
                                    <a href="smart-light.aspx" title="Light">
                                        <div class="HanLinkLabel" globalize="ML_SmartHm_div_Lighting">
                                            <%= CustomerPortal.Translator.T("ML_SmartHm_div_Lighting") %></div>
                                        <img src="images/SmartHome/appl_light.png" globalize="ML_SmartHm_img_Light" /></a>
                                </div>
                                <div class="Hanimagesbutton">
                                    <asp:ImageButton ID="btnLight" runat="server" AlternateText="0" ImageUrl="images/off_button.png"
                                        OnClick="btnDishwasher_Click" globalize="ML_SmartHm_imgbtn_OffL" />
                                </div>
                            </td>
                            <td width="20%">
                                <div class="Hanimages">
                                    <a href="smart-centralairsystem.aspx" title="Central Air System">
                                        <div class="HanLinkLabel" globalize="ML_SmartHm_div_CAS">
                                            <%= CustomerPortal.Translator.T("ML_SmartHm_div_CAS") %></div>
                                        <img src="images/SmartHome/appl_central_air_system.png" /></a>
                                </div>
                                <div class="Hanimagesbutton">
                                    <asp:ImageButton ID="btnCentralAirSystem" runat="server" AlternateText="0" ImageUrl="images/off_button.png"
                                        OnClick="btnDishwasher_Click" />
                                </div>
                            </td>
                            <td width="20%">
                                <div class="Hanimages">
                                    <a href="smart-television.aspx" title="Television">
                                        <div class="HanLinkLabel" globalize="ML_SmartHm_div_TV">
                                            <%= CustomerPortal.Translator.T("ML_SmartHm_div_TV") %></div>
                                        <img src="images/SmartHome/appl_tv.png" /></a>
                                </div>
                                <div class="Hanimagesbutton">
                                    <asp:ImageButton ID="btnTelevision" runat="server" AlternateText="0" ImageUrl="images/off_button.png"
                                        OnClick="btnDishwasher_Click" />
                                </div>
                            </td>
                            <td width="20%">
                                <div class="Hanimages">
                                    <a href="smart-refrigerator.aspx" title="Refrigerator">
                                        <div class="HanLinkLabel" globalize="ML_SmartHm_div_Refrige">
                                            <%= CustomerPortal.Translator.T("ML_SmartHm_div_Refrige") %></div>
                                        <img src="images/SmartHome/appl_refrigerator.png" /></a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td width="20%">
                                <div class="Hanimages">
                                    <a href="smart-washingmachine.aspx" title="Washing Machine">
                                        <div class="HanLinkLabel" globalize="ML_WashingMchn_b_WM">
                                            <%= CustomerPortal.Translator.T("ML_WashingMchn_b_WM") %></div>
                                        <img src="images/SmartHome/appl_washing_machine.png" /></a>
                                </div>
                                <div class="Hanimagesbutton">
                                    <asp:ImageButton ID="btnWashingMachine" runat="server" AlternateText="0" ImageUrl="images/off_button.png"
                                        OnClick="btnDishwasher_Click" />
                                </div>
                            </td>
                            <td width="20%">
                                <div class="Hanimages">
                                    <a href="smart-jacuzzi.aspx" title="Jacuzzi">
                                        <div class="HanLinkLabel" globalize="ML_SL_a_Jacuzzi">
                                            <%= CustomerPortal.Translator.T("ML_SL_a_Jacuzzi") %></div>
                                        <img src="images/SmartHome/appl_jacuzzi.png" /></a>
                                </div>
                                <div class="Hanimagesbutton">
                                    <asp:ImageButton ID="btnJacuzzi" runat="server" AlternateText="0" ImageUrl="images/off_button.png"
                                        OnClick="btnDishwasher_Click" />
                                </div>
                            </td>
                            <td width="20%">
                                <div class="Hanimages">
                                    <a href="smart-dryer.aspx" title="Dryer">
                                        <div class="HanLinkLabel" globalize="ML_SmartHm_div_Dryer">
                                            <%= CustomerPortal.Translator.T("ML_SmartHm_div_Dryer") %></div>
                                        <img src="images/SmartHome/appl_dryer.png" /></a>
                                </div>
                                <div class="Hanimagesbutton">
                                    <asp:ImageButton ID="btnDryer" runat="server" AlternateText="0" ImageUrl="images/off_button.png"
                                        OnClick="btnDishwasher_Click" />
                                </div>
                            </td>
                            <td width="20%">
                                <div class="Hanimages">
                                    <a href="smart-waterheater.aspx" title="Water Heater">
                                        <div class="HanLinkLabel" globalize="ML_SmartHm_div_WH">
                                            <%= CustomerPortal.Translator.T("ML_SmartHm_div_WH") %></div>
                                        <img src="images/SmartHome/appl_water_heater.png" globalize="ML_SmartHm_img_ApplWH" /></a>
                                </div>
                                <%--<div class="Hanimagesbutton">
                                    <asp:ImageButton ID="btnheater" runat="server" AlternateText="0" ImageUrl="images/off_button.png"
                                        OnClick="btnDishwasher_Click" />
                                </div>--%>
                            </td>
                            <td>
                                &nbsp;
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="TableCellContainerFooter">
                    &nbsp;</div>
            </div>
        </ContentTemplate>
    </asp:UpdatePanel>
    
    <script type="text/javascript">
        $(document).ready(function () {
            $('.addressDropdown').change(function () {
                $('#' + '<%=hdnFlag.ClientID%>').val('1');
            });
        });
    </script>
    <script src="js/Translator.js" type="text/javascript"></script>
    <style type="text/css">
        table.SmartHomeImg
        {
            width: 100%;
        }
        table.SmartHomeImg tr td
        {
            padding-top: 12px;
            text-align: center;
        }
        
        .Hanimages img
        {
            width: 117px;
        }
        .Hanimages a
        {
            text-decoration: none;
        }
        .HanLinkLabel
        {
            color: #333;
            margin: 0px 0px 3px;
        }
        /* Testing TFS */
    </style>
    <span globalize="ML_SmartHm_div_SH" id="titletext" style="display: none"></span>

</asp:Content>
