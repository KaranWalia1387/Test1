<%@ Page Title="Configure Usage" Language="C#" MasterPageFile="~/Administration.master" AutoEventWireup="true" CodeBehind="configure-usage.aspx.cs" Inherits="AdminPanel.configure_usage" %>

<%@ Import Namespace="AdminPanel" %>
<%@ Import Namespace="Newtonsoft.Json" %>


<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <script src="../js/configure-usage.js"></script>
    <input type="hidden" class="activeli_list" value="sidebar_usage" />
    <script type="text/javascript">
        $(document).ready(function () {
            var userRights =<%=JsonConvert.SerializeObject(SessionAccessor.UserRightList)%>;
            var userUsageRights =userRights.indexOf( '<%=UserRights.UsageReadOnly%>')>=0 && userRights.indexOf( '<%=UserRights.UsageAccess%>')<0;
            if (userUsageRights) {
                $('input[type=checkbox]').attr('disabled','true');
                $('input[type=radio]').attr('disabled','true');
                $('input[type=text]').attr('disabled','true');
                $("input[type=button]").hide();
                $('#'+'<%=btnUsageSetting.ClientID%>').hide();
            }
            $('#' + '<%=chkPowerUsage.ClientID%>').change(function () {
                enbl($(this).is(":checked"));
            });
        });

        function enbl(a) {
            if (a) {
                $('#' + '<%=rdPwYes.ClientID%>').removeAttr("disabled", false);
                  $('#' + '<%=rdPwYes.ClientID%>').attr("checked", "checked");
              }
              else {
                  $('#' + '<%=rdPwNo.ClientID%>').removeAttr("disabled");
                  $('#' + '<%=rdPwYes.ClientID%>').attr("disabled", "disabled");
                  $('#' + '<%=rdPwYes.ClientID%>').attr("checked", false);
                  $('#' + '<%=rdPwNo.ClientID%>').attr("checked", "checked");
              }
          }
    </script>
    <style>
        .FLeft_Area
        {
            float: left;
            padding-right: 10px;
        }

        .usage-area-section ul
        {
            float: left;
            margin: 0px;
        }

        input[type="radio"], input[type="checkbox"]
        {
            line-height: normal;
            margin: 4px 5px 0 0;
        }



        .TierSettingContent select
        {
            height: 31px;
            margin-bottom: 3px;
        }
    </style>
    <div class="top-header-area">
        <div class="Leftheader-Pannel">
            <h2>Usage</h2>
        </div>
    </div>


    <div class="billing_inner_box">
        <h5 style="padding-left: 2%;">Power Usage 
                <asp:CheckBox ID="chkPowerUsage" runat="server" CssClass="usage-select" /></h5>
        <div class="billing_left_box usage_box_1">

            <ul>
                <li><span class="display_power_box">Display Solar Option with power usage</span>
                    <span>
                        <asp:RadioButton ID="rdPwYes" runat="server" Checked="true" Text=" Yes" GroupName="PwGeneration" /></span>
                    <span>
                        <asp:RadioButton ID="rdPwNo" runat="server" Text=" No" GroupName="PwGeneration" /></span>
                </li>
                <li>
                    <span class="display_power_box">Select Rate Option</span>
                    <span>
                        <asp:RadioButton ID="rdRateYes" runat="server" Text=" Fixed" GroupName="generationrt" /></span>
                    <span>
                        <asp:RadioButton ID="rdRateNo" runat="server" Checked="true" Text=" 24hrs" GroupName="generationrt" /></span>
                </li>
            </ul>



        </div>

        <div class="billing_right_box usage_box_1">

            <ul>
                <li id="li_powerunit">
                    <span class="display_power_box_1">Select Unit</span>
                    <span>
                        <asp:CheckBox ID="chkPowerkWh" runat="server" />
                        kWh</span>
                    <span>
                        <asp:CheckBox ID="chkPowerdollor" runat="server" />
                        $ </span>
                </li>
                <li id="li_powermode">
                    <span class="display_power_box_1" style="height:25px;">Select Usage Mode</span>
                    <span>
                        <asp:CheckBox ID="chkPowerHourly" runat="server" />
                        Hourly</span>
                    <span>
                        <asp:CheckBox ID="chkPowerDaily" runat="server" />
                        Daily</span>
                    <span>
                        <asp:CheckBox ID="chkPowerMonthly" runat="server" />
                        Monthly</span>
                    <span style="float:left;">
                        <asp:CheckBox ID="chkPowerSeasonal" runat="server" />
                        Seasonal</span>
                </li>
            </ul>
        </div>

    </div>
    <div class="billing_inner_box">
        <h5 style="padding-left: 2%; padding-top: 8px;"><b>Water Usage </b>
            <asp:CheckBox ID="ChkWater" runat="server" CssClass="usage-select" /><br />
        </h5>
        <ul class="water_usage_main_box">
            <li id="li_waterunit">
                <div class="water_usage_box">Select Unit</div>

                <span>
                    <asp:CheckBox ID="chkWaterHCF" runat="server" />HCF   </span>
                <span>
                    <asp:CheckBox ID="chkWaterdollor" runat="server" />
                    Dollar</span>
                <span>
                    <asp:CheckBox ID="chkWatergallon" runat="server" />
                    Gallon</span>
            </li>
            <li id="li_watermode">
                <div class="water_usage_box">Select Usage Mode</div>

                <span>
                    <asp:CheckBox ID="chkWaterHourly" runat="server" />Hourly</span>
                <span>
                    <asp:CheckBox ID="chkWaterDaily" runat="server" />Daily</span>
                <span>
                    <asp:CheckBox ID="chkWaterMonthly" runat="server" />Monthly</span>
                <span>
                    <asp:CheckBox ID="chkWaterSeasonal" runat="server" />Seasonal</span>
            </li>
            <li>
                <div class="Subpanel">
                    <div class="water_usage_box">Select Rate Option</div>
                    <table id="Table3" class="RadioBtns">
                        <tbody>
                            <tr>
                                <td>
                                    <asp:RadioButton ID="RadioWaterYes" CssClass="GenerationRadio rdowaterratefixed"
                                        Value="1" runat="server" Text=" Fixed" GroupName="wtgeneration" />
                                </td>
                                <td>
                                    <asp:RadioButton ID="RadiowaterNo" runat="server" CssClass="GenerationRadio rdowaterratetier"
                                        Value="2" Text=" Tier Based" GroupName="wtgeneration" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div id="TierSetting" runat="server" style="display: none; margin-left: 317px;" class="TierSetting select_rate_popup">
                        <div class="ArrowTop" style="margin-left: -80px;">
                            &nbsp;
                        </div>
                        <div class="TierSettingHeader">
                            Tier Based Setting
                        </div>
                        <div class="TierSettingContent">
                            <span class="TierSettingContentLabel">Plan Type</span>
                            <asp:DropDownList ID="ddlPlanType" runat="server" CssClass="ddlPlanType">
                            </asp:DropDownList>
                            <div class="clear">
                                &nbsp;
                            </div>
                            <div id="divTiers" runat="server">
                            </div>
                            <div class="clear">
                                &nbsp;
                            </div>
                            <div class="clear">
                                &nbsp;
                            </div>
                            <center>
                            <input id="btnSaveWaterRates" type="button" class="DefaultBtn2 submitBtn" style="padding:0px 9px; float:none;" value="Save" title="Save Tier Rates" /></center>
                        </div>
                    </div>
                    <div id="fixedrate" runat="server" style="display: none; width: 297px; margin-left: 261px;" class="fixedrate">
                        <div class="ArrowTopFixed">
                            &nbsp;
                        </div>
                        <div class="TierSettingHeader">
                            Fixed Rate
                        </div>
                        <div class="TierSettingContent">
                            <span class="TierSettingContentLabel">Rate</span>
                            <asp:TextBox ID="txtFixedRate" runat="server" onkeypress="return IsNumeric1(event,this);"
                                CssClass="txtFixedRate"></asp:TextBox>
                            <div class="clear">
                                &nbsp;
                            </div>
                            <center>
                            <input id="btnSaveFixedrate" type="button" class="DefaultBtn2 submitBtn"  style="padding:0px 9px;  float:none;margin-top: 10px;" value="Save" title="Save Fixed Rates" /></center>
                        </div>
                    </div>
                </div>

            </li>
        </ul>

    </div>
    <div class="billing_inner_box">
        <h5 style="padding-left: 2%; padding-top: 8px;"><b>Gas Usage </b>
            <asp:CheckBox ID="ChkGas" runat="server" CssClass="usage-select" /><br />
        </h5>
        <ul class="gas_usage_main_box">
            <li id="li_gasunit">
                <div class="gas_usage_box">Select Unit</div>

                <span>
                    <asp:CheckBox ID="chkGasCCF" runat="server" />CCF   </span>
                <span>
                    <asp:CheckBox ID="chkGasdollar" runat="server" />
                    Dollar</span>      </li>
            <li id="li_gasmode">
                <div class="gas_usage_box">Select Usage Mode</div>

                <span>
                    <asp:CheckBox ID="chkGasHourly" runat="server" />Hourly</span>
                <span>
                    <asp:CheckBox ID="chkGasDaily" runat="server" />Daily</span>
                <span>
                    <asp:CheckBox ID="chkGasMonthly" runat="server" />Monthly</span>
                <span>
                    <asp:CheckBox ID="chkGasSeasonal" runat="server" />Seasonal</span>
            </li>

            <li>
                <%--<div class="Subpanel">
                   <div class="water_usage_box"> Select Rate Option.</div>
                <table id="Table1" class="RadioBtns">
                    <tbody>
                        <tr>
                            <td>
                                <asp:RadioButton ID="RadioGasYes" CssClass="GenerationRadio rdogasratefixed"
                                    Value="1" runat="server" Text=" Fixed" GroupName="gasgeneration" />
                            </td>
                            <td>
                                <asp:RadioButton ID="RadioGasNo" runat="server" CssClass="GenerationRadio rdogasratetier"
                                    Value="2" Text=" Tier Based" GroupName="gasgeneration" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                    <div id="TierSettingGas" runat="server" style="display: none; margin-left:317px; " class="TierSettingGas select_rate_popup">
                        <div class="ArrowTop" style=" margin-left: -80px;">
                            &nbsp;
                        </div>
                        <div class="TierSettingHeader">
                            Tier Based Setting
                        </div>
                        <div class="TierSettingContent">
                            <span class="TierSettingContentLabel">Plan Type</span>
                            <asp:DropDownList ID="ddlGasPlanType" runat="server" CssClass="ddlGasPlanType">
                            </asp:DropDownList>
                            <div class="clear">
                                &nbsp;
                            </div>
                            <div id="divGasTiers" runat="server">
                            </div>
                            <div class="clear">
                                &nbsp;
                            </div>
                            <div class="clear">
                                &nbsp;
                            </div>
                            <center>
                            <input id="Button1" type="button" class="DefaultBtn2 submitBtn" style="padding:0px 9px; float:none;" value="Save" title="Save Tier Rates" /></center>
                        </div>
                    </div>
                    <div id="fixedrateGas" runat="server" style="display: none; width: 297px; margin-left: 261px; " class="fixedrateGas">
                        <div class="ArrowTopFixed">
                            &nbsp;
                        </div>
                        <div class="TierSettingHeader">
                            Fixed Rate
                        </div>
                        <div class="TierSettingContent">
                            <span class="TierSettingContentLabel">Rate</span>
                            <asp:TextBox ID="txtGasFixedRate" runat="server" onkeypress="return IsNumeric1(event,this);"
                                CssClass="txtGasFixedRate"></asp:TextBox>
                            <div class="clear">
                                &nbsp;
                            </div>
                            <center>
                            <input id="btnSaveGasFixedrate" type="button" class="DefaultBtn2 submitBtn"  style="padding:0px 9px;  float:none;margin-top: 10px;" value="Save" title="Save Fixed Rates" /></center>
                        </div>
                    </div>
                </div>--%>

            </li>
        </ul>

    </div>
    <center style="text-align:right;">
            <asp:Button ID="btnUsageSetting" runat="server" Text="Save" CssClass="DefaultBtn"
                ToolTip="Save Setting" OnClick="btnUsageSetting_Click" /></center>
</asp:Content>
