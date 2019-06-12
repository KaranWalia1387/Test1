<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="FooterUsageUI.ascx.cs" Inherits="CustomerPortal.UserControls.Usage.FooterUsageUI" EnableViewState="True" %>


<script>
    $(window).load(function () {
        try {
          
            if ($('#hdnUsageType').val() == 'SU') {
                $('#GenrationMode').show();
                $('#UsagesID').hide();
                $('.rateid').hide();
                $(".currency_1").hide();
                $('#GenrationMode ul li a').removeClass("active");
                var currmode = $('#hdnMode').val();
                if (currmode == 'L')
                    $('#GenrationMode a[mode=L]').addClass("active");
                else
                    $('#GenrationMode a[mode=N]').addClass("active");
            }
            else {
                $('#GenrationMode').hide();
                $('#UsagesID').css('display', 'inline');
                $('.rateid').show();
                $(".currency_1").show();
            }
           
        }
        catch (ex) { }
    });
</script>


<style type="text/css">
    .curent_usage_line {
        text-align: left;
        line-height: 17px;
        padding-left: 10px;
    }

        .curent_usage_line span {
            padding-right: 10px;
        }

    @media (min-width:768px) and (max-width:991px) {
        #UsagesID {
            width: 100% !important;
        }

        .curent_usage_line #UsagesID p {
            float: left;
            margin-bottom: 0;
            text-align: left;
            width: 100%;
        }
    }

    
  .toggle.btn.netusage {
    margin-top: -1px;
    margin-right: 7px;
    min-width: 44px;
    min-height: 24px;
    height: 23px !important;
    width: 44px !important;
    background-color: #246A9F !important;
    border-color: #246A9F !important;
    border-radius: 20px !important;
    color: #246A9F !important;
}
    .toggle.netusage, .toggle-on.netusage, .weather_box_right .toggle-off.netusage {
    border-radius: 20px;
}
    
    .toggle.netusage .toggle-handle {
    padding: 0 24px;
}
.toggle.netusage .toggle-handle {
    border-radius: 20px;
    float: none;
}
</style>


<div class="currency compare_nav ratest_line_box" style="width: 100%; float: left; background: #f5f5f5;">

    <div class="curent_usage_line" style="float: right; padding: 10px 0; width: 100% !important;">
        <div style="display: none;">
        </div>
        <div class="ratest_box_mob" style="float: left; width: 40%;">
            <div id="RatesID" visible="false" runat="server" class="add-card rateid" style="width: 120px; float: left; padding: 5px 0% 0 0px !important;">
                <%if(Session["UsageType"]=="PU"){
                      if (CustomerPortal.SessionAccessor.IsExternalPowerRateLink == "1") { %>
                    <a href="<%= Convert.ToString(CustomerPortal.SessionAccessor.ExternalPowerRateLink) %>" target="_blank" style="color: #4a7eb6; font-weight: normal; padding: 5px; border-radius: 1px; margin-top: 5px;">
                <%} else { %>
                    <a onclick="openfancyboxrate('usagechartdiv')" href="#" style="color: #4a7eb6; font-weight: normal; padding: 5px; border-radius: 1px; margin-top: 5px;">
                <%} } %>

                <%if(Session["UsageType"]=="WU"){
                      if (CustomerPortal.SessionAccessor.IsExternalWaterRateLink == "1") { %>
                    <a href="<%= Convert.ToString(CustomerPortal.SessionAccessor.ExternalWaterRateLink) %>" target="_blank" style="color: #4a7eb6; font-weight: normal; padding: 5px; border-radius: 1px; margin-top: 5px;">
                <%} else { %>
                    <a onclick="openfancyboxrate('usagechartdiv')" href="#" style="color: #4a7eb6; font-weight: normal; padding: 5px; border-radius: 1px; margin-top: 5px;">
                <%} } %>

                <% if(Session["UsageType"]=="GU"){
                    if (CustomerPortal.SessionAccessor.IsExternalGasRateLink == "1") { %>
                    <a href="<%= Convert.ToString(CustomerPortal.SessionAccessor.ExternalGasRateLink) %>" target="_blank" style="color: #4a7eb6; font-weight: normal; padding: 5px; border-radius: 1px; margin-top: 5px;">
                <%} else { %>
                    <a onclick="openfancyboxrate('usagechartdiv')" href="#" style="color: #4a7eb6; font-weight: normal; padding: 5px; border-radius: 1px; margin-top: 5px;">
                <%} } %>

                    <img src="images/view_rates.svg" align="left" style="margin-top: -2px;" /><span globalize="ML_RBC_Rates"><%= CustomerPortal.Translator.T("ML_RBC_Rates") %></span></a>
            </div>
           <div class="compare_month solar_css" style="float: left; padding-left: 0px; width: 50%;">
               <asp:ImageButton ID="btnExporttoExcel" runat="server" ImageUrl="~/images/table-export.svg"   OnClick="lnkExporttoExcel_Click" ClientIDMode="Static" Style=" cursor:auto" />
                <%--<a  href="#" >
                    <img src="images/table-export.svg"   Style="margin-top: -1px; cursor:default" /></a>--%>
                <div style="margin-top: -22px; margin-left: 29px;">
                    <asp:LinkButton ID="lnkExporttoExcel" runat="server" globalize="ML_POWERUSAGE_LBL_ExporttoExcel" Text="" ClientIDMode="Static" OnClick="lnkExporttoExcel_Click" Style="text-decoration: none !important;white-space:nowrap; color: #4a7eb6 !important;"><%= CustomerPortal.Translator.T("ML_POWERUSAGE_LBL_ExporttoExcel") %></asp:LinkButton>
                </div>
            </div>

        </div>
        <div id="UsagesID" style="border-top: 1px solid #f4f4f4; display: none; margin: -8px 0px 0px 0px; padding: 17px 0; text-align: center;">
            <p>
                <span class="GraphLegend_WaterAlloc"></span>
                <span class="GraphLegend_data_WaterAlloc" globalize="ML_Usage_Lbl_WaterAlloc"><%= CustomerPortal.Translator.T("ML_Usage_Lbl_WaterAlloc") %></span>
                <span class="GraphLegend_Usage"></span>
                <span class="GraphLegend_data_low" globalize="ML_USAGE" id="LUsage"><%= CustomerPortal.Translator.T("ML_USAGE") %></span>
                <span class="GraphLegend_low"></span>
                <span class="GraphLegend_data_low" globalize="ML_WU_LowUsage" id="LowUsage"><%= CustomerPortal.Translator.T("ML_WU_LowUsage") %></span>
                <span class="GraphLegend_Avg"></span>
                <span class="GraphLegend_data_low" globalize="ML_WU_AverageUsage1" id="AvgUsage"><%= CustomerPortal.Translator.T("ML_WU_AverageUsage1") %></span>
                <span class="GraphLegend_High"></span>
                <span class="GraphLegend_data_low" globalize="ML_WU_HighUsage1" id="HighUsage"><%= CustomerPortal.Translator.T("ML_WU_HighUsage1") %></span>
                <%-- bug id=6169 --%>
                <span class="GraphLegend_solar"></span>
                <span class="GraphLegend_data_solar" globalize="ML_DASHBOARD_Anchor_SolGen"><%= CustomerPortal.Translator.T("ML_DASHBOARD_Anchor_SolGen") %></span>
            </p>
        </div>
        <div id="divconfigusage" class="wthr_usages" style="display: none; float: left;">
        <span style="float: left;" globalize="ML_Settings_NetUsage"><%= CustomerPortal.Translator.T("ML_Settings_NetUsage") %></span>
           <%-- <input id="imgUsage" name="weatheroverlay" text="On" style="float: left;" type="checkbox" class="on_off_btn on_off_usages" data-toggle="toggle" data-style="netusage">--%>
             <input id="imgUsage" name="weatheroverlay" text="On" style="float: left;" type="checkbox" class="cmn-toggle cmn-toggle-round on_off_btn on_off_usages"   data-style="netusage">
             <label for="imgUsage" class="toggle_lbl_class"></label>
    </div>
    </div>
   
    <div class="TableCellContainer" id="UC_Power_EnergyEfficiency" runat="server" visible="false">
        <div class="TableCellContainerHeader">
            <div class="EnergyEfficencyIcon">
                &nbsp;
            </div>
            <div class="TableCellHeaderTitle">
                <asp:HyperLink ID="lnkEE" runat="server" Text="Power Bill Discounts"></asp:HyperLink>
            </div>
        </div>
        <div class="TableCellContainerContent UserControlHeight">
            <div style="text-align: center; margin-top: 10px; font-size: 1em;">
                <div style="width: 100px; float: left; text-align: left; padding-left: 15px; margin-top: 20px;">
                </div>
                <div style="width: 180px; float: left; text-align: left; padding-right: 15px; line-height: 25px; padding-top: 30px;">
                    Receive monthly power bill discounts on qualified medical equipment.
                </div>
                <div class="clear">
                    &nbsp;
                </div>
            </div>
        </div>
        <div class="TableCellContainerFooter">
            &nbsp;
        </div>
    </div>
</div>
<asp:HiddenField runat="server" ID="hdnMeterValue" ClientIDMode="Static" />
<asp:HiddenField ID="hdnType" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdntime" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnTitle" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnstrDate" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnunit" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnHoulyType" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnWeatherOverlay" runat="server" ClientIDMode="Static" Value="0" />
<asp:HiddenField ID="hdSeason1" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdUsageYear" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnExportUsageType" runat="server" ClientIDMode="Static" />