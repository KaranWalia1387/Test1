<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="CompareSpendingMaster.ascx.cs" Inherits="CustomerPortal.UserControls.CompareSpending.CompareSpendingMaster" %>
<%@ Register Src="~/UserControls/CompareSpending/CompareSpendingChart.ascx" TagPrefix="uc1" TagName="CompareSpendingChart" %>
<style type="text/css">
    #disclaimer {        
            border-top: 1px solid #cccccc;
            width:100%;
                  padding-top: 18px;
             padding-bottom: 0px;
        }
    @media (min-width:320px) and (max-width:767px) {
        #disclaimer {
            padding-top: 7px !important;
            margin-top: 12px !important;
            border-top: 1px solid #ccc;
        }

        .top_conte_box_mob {
            height: 85% !important;
        }

        .energy_mid_box .right_content_box {
            height: 96%;
            margin-bottom: 0;
            padding-bottom: 0px;
        }
    }
</style>
<asp:ScriptManager ID="ScriptManager1" runat="server" />
<div class="energy_mid_box">
    <h1>
        <img src="images/icon_cs_sidebar.svg" style="padding-right: 7px; margin-top: -3px; float: left;" />
        <span class="head_icon_flat icon_compare"></span>
        <span globalize="ML_Compare_Spending_Screen_Title_Compare_Spending"><%= CustomerPortal.Translator.T("ML_Compare_Spending_Screen_Title_Compare_Spending") %></span></h1>
    <div class="sidebar_toggle">Sidebar Navigation</div>
    <div class="nav_left">
        <ul>
            <li class="sidebar_power active" cstype="CsP">
                <asp:LinkButton runat="server" ID="CsPower" Visible="false" globalize="ML_Compare_Spending_Seg_Title_Power" OnClick="Common_Click"><%= CustomerPortal.Translator.T("ML_Compare_Spending_Seg_Title_Power") %></asp:LinkButton></li>
            <li class="sidebar_gas" cstype="CsG">
                <asp:LinkButton runat="server" ID="CsGas" Visible="false" globalize="ML_Compare_Spending_Seg_Title_Gas" OnClick="Common_Click"><%= CustomerPortal.Translator.T("ML_Compare_Spending_Seg_Title_Gas") %></asp:LinkButton></li>
            <li class="sidebar_water" cstype="CsW">
                <asp:LinkButton runat="server" ID="CsWater" Visible="false" globalize="ML_Compare_Spending_Seg_Title_Water" OnClick="Common_Click"><%= CustomerPortal.Translator.T("ML_Compare_Spending_Seg_Title_Water") %></asp:LinkButton></li>
        </ul>
        <div class="banner_left_img">
            <span globalize="ML_Compare_Lbl_AdBanner"></span>
            <a href="#">
                <img id="IDBannerCompare" runat="server" clientidmode="Static" alt="" src="" onclick="BannerClick(this.id);" /></a> <%--images/banner_ads/image003.png--%>
        </div>

    </div>
    <div class="right_content_box preLoader">

        <div class="top_conte_box_mob" style="height: 88%; overflow: auto;">

            <div runat="server" id="divCompareSpending" style="height:100%;">
                <uc1:CompareSpendingChart runat="server" ID="CompareSpendingChart" />
            </div>
        </div>
        <div id="disclaimer" style="float: left; margin-bottom: 0px; padding-left: 22px; display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.CompareDisclaimer) %>!important;">
            <b style="float:left;padding-right:2px;"><span globalize="ML_MAKE_PAYMENT_BILL_Lbl_Disclaimer" style="color: red;"><%= CustomerPortal.Translator.T("ML_MAKE_PAYMENT_BILL_Lbl_Disclaimer") %></span><span style="color: red;">:</span> </b>
            <span id="lblDisclaimerMe" globalize="ML_Compare_CompareMe_Disclaimer" style="color: black; display: block"><%= CustomerPortal.Translator.T("ML_Compare_CompareMe_Disclaimer") %></span>
            <span id="lblDisclaimerZip" globalize="ML_Compare_CompareZip_Disclaimer" style="color: black; display: none"><%= CustomerPortal.Translator.T("ML_Compare_CompareZip_Disclaimer") %></span>
            <span id="lblDisclaimerUtility" globalize="ML_Compare_CompareUtility_Disclaimer" style="color: black; display: none"><%= CustomerPortal.Translator.T("ML_Compare_CompareUtility_Disclaimer") %></span>
            <span id="lblDisclaimerAll" globalize="ML_Compare_CompareAll_Disclaimer" style="color: black; display: none"><%= CustomerPortal.Translator.T("ML_Compare_CompareAll_Disclaimer") %></span>
        </div>
    </div>
</div>

<asp:HiddenField runat="server" ClientIDMode="Static" ID="hdnCsType" />
