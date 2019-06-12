<%@ Page Title="Add Remove Feature" Language="C#" MasterPageFile="~/Administration.master" AutoEventWireup="true" CodeBehind="Configure-feature.aspx.cs" Inherits="AdminPanel.Configure_feature" %>

<%@ Import Namespace="AdminPanel" %>
<%@ Import Namespace="Newtonsoft.Json" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <input type="hidden" class="activeli_list" value="sidebar_Feature" />
    
   
    <style type="text/css">
        .form-control {
            float: left;
        }

        .inner-right-section .right-content-area {
            padding: 0 0 30px 0;
        }

        @-moz-document url-prefix() {
            .outage_sbt_box {
                margin-bottom: 20px;
            }
        }

        @media (min-width:1500px) and (max-width:3500px) {
            .outage_sbt_box {
                margin-bottom: 22px;
            }
        }
    </style>
    <div class="top-header-area">
        <div style="float: left; width: 85%;">
            <h2 style="padding-left: 20px;">Add Remove Feature</h2>
        </div>
    </div>

    <!-- Start Add Remove Feature Table -->
    <div class="con_fea_tbl">
        <table>
            <tr>
                <th>
                    <input type="checkbox" id="3" value="3" isparent="true" />
                    Billing</th>
            </tr>
            <tr>
                <td>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="4" value="4" />
                        Billing.BillingQueries

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="5" value="5" />
                        Billing.BudgetMyBill

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="6" value="6" />
                        Billing.History

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="8" value="8" />
                        Billing.PaymentLocation

                    </div>

                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="11" value="11" />
                        Billing.UtilityBill

                    </div>

                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="7" value="7" />
                        Billing.PayBill

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="9" value="9" />
                        Billing.RecurringBill

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="12" value="12" />
                        Billing.ViewBill
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="154" value="154" />
                        Billing.Disclaimer
                    </div>
                      <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="169" value="169" />
                        Billing.PaymentExtension
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="170" value="170" />
                        Billing.RateAnalysis
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="171" value="171" />
                       Billing.LevelPay
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <!-- End Add Remove Feature Table -->
    <!-- Start Add Remove Feature Table -->
    <div class="con_fea_tbl">
        <table>
            <tr>
                <th>
                    <input type="checkbox" isparent="true" id="24" value="24" />
                    ConnectMe
                </th>
            </tr>
            <tr>
                <td>

                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="103" value="103" />
                        ConnectMe.Facebook

                    </div>

                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="104" value="104" />
                        ConnectMe.Twitter

                    </div>

                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="105" value="105" />
                        ConnectMe.YouTube

                    </div>

                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="108" value="108" />
                        ConnectMe.ContactUs
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="131" value="131" />
                        ConnectMe.ReportWaterWaste
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="160" value="160" />
                        ConnectMe.Disclaimer
                    </div>

                </td>

            </tr>
        </table>
    </div>
    <!-- End Add Remove Feature Table -->
    <!-- Start Add Remove Feature Table -->
    <div class="con_fea_tbl">
        <table>
            <tr>
                <th>
                    <input type="checkbox" id="25" value="25" isparent="true" class="eff_level1" />
                    Efficiency
                </th>
            </tr>
            <tr>
                <td>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="26" value="26" />
                        Efficiency.AboutHome
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="110" value="110" class="eff_level2" />
                        Efficiency.Rebate
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="27" value="27" class="eff_level2" />
                        Efficiency.EducationTips

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="28" value="28" />
                        Efficiency.Goal

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="29" value="29" />
                        Efficiency.HomeReport

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="30" value="30" class="eff_level2" />
                        Efficiency.Like

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="31" value="31" class="eff_level2" />
                        Efficiency.Programs

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="32" value="32" />
                        Efficiency.Rank

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="33" value="33" class="eff_level2" />
                        Efficiency.Register

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="34" value="34" class="eff_level2" />
                        Efficiency.SavingTips
                    </div>

                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="111" value="111" class="eff_level2" />
                        Efficiency.Search
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="123" value="123" />
                        Efficiency.MyApplications
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="158" value="158" />
                        Efficiency.PreLoginRegister
                    </div>
                     <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="172" value="172" />
                        Efficiency.EnergyAssistance
                    </div>
                     <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="173" value="173" />
                        Efficiency.MarketPlace
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <!-- End Add Remove Feature Table -->
    <!-- Start Add Remove Feature Table -->
    <div class="con_fea_tbl">
        <table>
            <tr>
                <th>
                    <input type="checkbox" id="35" value="35" isparent="true" />
                    EV
                </th>
            </tr>
            <tr>
                <td>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="37" value="37" />
                        EV.Vehicle
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="36" value="36" class="cs_level1" />
                        EV.ChargingStations
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="113" value="113" class="cs_level2" />
                        EV.ChargingStations.Refresh
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="114" value="114" class="cs_level2" />
                        EV.ChargingStations.Distance
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="115" value="115" class="cs_level2" />
                        EV.ChargingStations.Search
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="116" value="116" class="cs_level2" />
                        EV.ChargingStations.Rate
                    </div>


                </td>
            </tr>
        </table>
    </div>
    <!-- End Add Remove Feature Table -->
    <!-- Start Add Remove Feature Table -->
    <div class="con_fea_tbl">
        <table>
            <tr>
                <th>
                    <input type="checkbox" id="50" value="50" isparent="true" />
                    MyAccount
                </th>
            </tr>
            <tr>
                <td>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="49" value="49" />
                        MyAccount.Settings.Text

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="120" value="120" />
                        MyAccount.Settings.Language

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="52" value="52" />
                        MyAccount.DefaultPayment

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="53" value="53" />
                        MyAccount.MarketingPreference


                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="54" value="54" />
                        MyAccount.PaymentInfo


                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="55" value="55" />
                        MyAccount.QuiteHours


                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="56" value="56" />
                        MyAccount.Settings.ConfigPayment
    

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="57" value="57" />
                        MyAccount.Settings.ConfigUsage


                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="58" value="58" />
                        MyAccount.Settings.HomeDashboard


                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="59" value="59" />
                        MyAccount.Settings.IVR


                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="99" value="99" />
                        MyAccount.Settings.PushNotification
                       
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="100" value="100" />
                        MyAccount.Settings.Email


                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="101" value="101" />
                        MyAccount.Settings.EV
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="112" value="112" />
                        MyAccount.Settings.Paperless Bill
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="126" value="126" />
                        MyAccount.Setting.PowerPlan
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="127" value="127" />
                        MyAccount.Setting.WaterPlan
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="128" value="128" />
                        MyAccount.Setting.GasPlan
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="129" value="129" />
                        MyAccount.Setting.ElectricVehiclePlan
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="155" value="155" />
                        MyAccount.Setting.Disclaimer
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="161" value="161" />
                        MyAccount.Profile.Disclaimer
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="132" value="132" />
                        MyAccount.AboutMyHome
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="133" value="133" />
                        MyAccount.Profile.AlternateEmailID
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="152" value="152" />
                        MyAccount.Profile.DeleteAccount
                    </div>
                     <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="165" value="165" />
                        MyAccount.Profile.AddAccount
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <!-- End Add Remove Feature Table -->
    <!-- Start Add Remove Feature Table -->
    <div class="con_fea_tbl">
        <table>
            <tr>
                <th>
                    <input type="checkbox" id="60" value="60" isparent="true" />
                    Notification

                </th>
            </tr>
            <tr>
                <td>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="61" value="61" />
                        Notification.All

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="62" value="62" />
                        Notification.Billing


                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="63" value="63" />
                        Notification.ConnectMe
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="64" value="64" />
                        Notification.DR

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="65" value="65" />
                        Notification.Saved

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="66" value="66" />
                        Notification.Sent

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="67" value="67" />
                        Notification.Services

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="68" value="68" />
                        Notification.Trash

                    </div>

                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="102" value="102" />
                        Notification.Outages
                    </div>

                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="119" value="119" />
                        Notification.LeakAlert
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <!-- End Add Remove Feature Table -->
    <!-- Start Add Remove Feature Table -->
    <div class="con_fea_tbl">
        <table>
            <tr>
                <th>
                    <input type="checkbox" isparent="true" class="sh_level1" />
                    Smart Home

                </th>
            </tr>
            <tr>
                <td>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="86" value="86" class="sh_level2" />
                        Smart Home
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="149" value="149" />
                        SmartHome.SprinklerDevice
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="150" value="150" />
                        SmartHome.SprinklerZone
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="151" value="151" />
                        SmartHome.SprinklerSchedule
                    </div>

                </td>
            </tr>
        </table>
    </div>
    <!-- End Add Remove Feature Table -->
    <!-- Start Add Remove Feature Table -->
    <div class="con_fea_tbl">
        <table>
            <tr>
                <th>
                    <input type="checkbox" isparent="true" class="sol_level1" />
                    Solar

                </th>
            </tr>
            <tr>
                <td>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="87" value="87" class="sol_level2" />
                        Solar
                    </div>

                </td>
            </tr>
        </table>
    </div>
    <!-- End Add Remove Feature Table -->
    <!-- Start Add Remove Feature Table -->
    <div class="con_fea_tbl">
        <table>
            <tr>
                <th>
                    <input type="checkbox" id="69" value="69" isparent="true" class="OutageParent" />
                    Outages

                </th>
            </tr>
            <tr>
                <td>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="70" value="70" class="OutageType" />
                        Outages.Current
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="71" value="71" />
                        Outages.CurrentLocation

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="72" value="72" />
                        Outages.Notifications

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="73" value="73" class="OutageType" />
                        Outages.Planed

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="74" value="74" />
                        Outages.ReportOutages

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="75" value="75" />
                        Outages.Search

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="122" value="122" />
                        Outages.Refresh
                    </div>


                </td>
            </tr>
        </table>
    </div>
    <!-- End Add Remove Feature Table -->
    <!-- Start Add Remove Feature Table -->
    <div class="con_fea_tbl">
        <table>
            <tr>
                <th>
                    <input type="checkbox" id="85" value="85" isparent="true" />
                    Services
                </th>
            </tr>
            <tr>
                <td>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="159" value="159" />
                        Service.Disclaimer
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <!-- End Add Remove Feature Table -->
    <!-- Start Add Remove Feature Table -->
    <div class="con_fea_tbl">
        <table>
            <tr>
                <th>
                    <input type="checkbox" id="88" value="88" isparent="true" />
                    SolidWaste

                </th>
            </tr>
            <tr>
                <td>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="10" value="10" />
                        Billing.SolidWasteBill
                    </div>

                </td>
            </tr>
        </table>
    </div>
    <!-- End Add Remove Feature Table -->
    <!-- Start Add Remove Feature Table -->
    <div class="con_fea_tbl">
        <table>
            <tr>
                <th>
                    <input type="checkbox" id="89" value="89" isparent="true" class="metertype watermeter" />
                    Water
                </th>
            </tr>
            <tr>
                <td>

                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="90" value="90" class="Wunit" />
                        Water.$

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="91" value="91" class="Winterval" />
                        Water.Daily

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="92" value="92" class="Wunit" />
                        Water.GAL

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="93" value="93" class="Wunit" />
                        Water.HCF

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="94" value="94" class="Winterval" />
                        Water.Hourly

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="95" value="95" class="Winterval" />
                        Water.Monthly

                    </div>

                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="96" value="96" />
                        Water.Rate

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="97" value="97" class="Winterval" />
                        Water.Seasonal

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="121" value="121" class="Winterval" />
                        Water.BiMonthly

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="130" value="130" />
                        Water.WaterAllocation
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <!-- End Add Remove Feature Table -->
    <!-- Start Add Remove Feature Table -->
    <div class="con_fea_tbl">
        <table>
            <tr>
                <th>
                    <input type="checkbox" id="98" value="98" isparent="true" class="usg_level1" />
                    Usage

                </th>
            </tr>
            <tr>
                <td>

                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="19" value="19" class="usg_level2" />
                        ProjectUsage
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="156" value="156" />
                        Usage.Disclaimer
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="162" value="162" class="usg_level2" />
                        Usage.SoFarThisMonth
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="163" value="163" class="usg_level2" />
                        Usage.MonthlyAverage
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="164" value="164" class="usg_level2" />
                        Usage.HighestThisYear
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="166" value="166" class="usg_level2" />
                        Usage.IsWeatherOverlay
                    </div>
                     <div class="checkbox_wrapper_box" style="display: none">
                        <input type="checkbox" id="167" value="167" class="usg_level2" />
                        Usage.Rate
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <!-- End Add Remove Feature Table -->
    <!-- Start Add Remove Feature Table -->
    <div class="con_fea_tbl">
        <table>
            <tr>
                <th>
                    <input type="checkbox" id="13" value="13" isparent="true" />
                    Compare
                </th>
            </tr>
            <tr>
                <td>

                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="15" value="15" />
                        Compare.All

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="109" value="109" />
                        Compare.Summary

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="17" value="17" />
                        Compare.Me

                    </div>


                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="21" value="21" />
                        Compare.Utility

                    </div>

                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="23" value="23" />
                        Compare.Zip

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="148" value="148" />
                        Compare.Month
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="157" value="157" />
                        Compare.Disclaimer
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <!-- End Add Remove Feature Table -->
    <!-- Start Add Remove Feature Table -->
    <div class="con_fea_tbl">
        <table>
            <tr>
                <th>
                    <input type="checkbox" id="38" value="38" isparent="true" />
                    FootPrint

                </th>
            </tr>
            <tr>
                <td>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="39" value="39" />
                        FootPrint.CurrentLocation

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="40" value="40" />
                        FootPrint.Type
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="124" value="124" />
                        FootPrint.Refresh
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="125" value="125" />
                        FootPrint.Search
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <!-- End Add Remove Feature Table -->
    <!-- Start Add Remove Feature Table -->
    <div class="con_fea_tbl">
        <table>
            <tr>
                <th>
                    <input type="checkbox" id="41" value="41" isparent="true" class="metertype gasmeter" />
                    Gas
                </th>
            </tr>
            <tr>
                <td>

                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="42" value="42" class="Gunit" />
                        Gas.$
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="43" value="43" class="Gunit" />
                        Gas.CCF

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="44" value="44" class="Ginterval" />
                        Gas.Daily

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="45" value="45" class="Ginterval" />
                        Gas.Hourly
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="46" value="46" class="Ginterval" />
                        Gas.Monthly

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="47" value="47" />
                        Gas.Rate

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="48" value="48" class="Ginterval" />
                        Gas.Seasonal
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <!-- End Add Remove Feature Table -->
    <!-- Start Add Remove Feature Table -->
    <div class="con_fea_tbl">
        <table>
            <tr>
                <th>
                    <input type="checkbox" id="76" value="76" isparent="true" class="metertype powermeter" />
                    Power

                </th>
            </tr>
            <tr>
                <td>

                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="77" value="77" class="punit" />
                        Power.$

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="78" value="78" class="pinterval" />
                        Power.15

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="79" value="79" class="pinterval" />
                        Power.Daily

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="80" value="80" class="pinterval" />
                        Power.Hourly

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="81" value="81" class="punit" />
                        Power.kWh

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="82" value="82" class="pinterval" />
                        Power.Monthly

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="83" value="83" />
                        Power.Rate

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="84" value="84" class="pinterval" />
                        Power.Seasonal
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <!-- End Add Remove Feature Table -->
    <!-- Start Add Remove Feature Table -->
    <div class="con_fea_tbl" style="display: none;">
        <table>
            <tr>
                <th>
                    <input type="checkbox" id="117" value="117" isparent="true" />
                    Help
                </th>
            </tr>
            <tr>
                <td></td>
            </tr>
        </table>
    </div>
    <!-- End Add Remove Feature Table -->
    <!-- Start Add Remove Feature Table -->
    <div class="con_fea_tbl">
        <table>
            <tr>
                <th>
                    <input type="checkbox" id="153" value="153" isparent="true" />
                    FAQ
                </th>
            </tr>
            <tr>
                <td></td>
            </tr>
        </table>
    </div>
    <!-- End Add Remove Feature Table -->
    <div class="modal-body" style="display: none;">
        <div class="divDialogElements">
            <div id="my-tab-content" class="tab-content">
                <div class="active tab-pane" id="home">
                    <div class="popup_right_content_area_home">
                    </div>
                    <div style="clear: both;"></div>
                    <div class="popup_left_content_area_home" style="width: 100%">

                        <select class="muilti_select_1" multiple="multiple" size="10" name="duallistbox_demo1[]">
                        </select>
                    </div>
                    <div class="popup_right_content_area_home">
                        <input type="hidden" id="hdnFeature" />
                        <br>
                        <a class="btn btn-primary btn-sm" href="#" style="float: right; width: 30%" id="submit">Save</a>

                    </div>
                    <div style="clear: both;"></div>
                </div>
            </div>

        </div>
    </div>
    <div class="outage_sbt_box">
        <button id="btnSave" type="button" class="submitBtn" value="" onclick="SaveDetailsClick();">Save</button>
        <%--  <button id="btnSave" type="button" class="submitBtn" value="" >Save</button>--%>
    </div>
    <script type="text/javascript">
        var userRights = '<%=JsonConvert.SerializeObject(SessionAccessor.UserRightList)%>';
        var userEditRights = userRights.indexOf('<%=UserRights.RoleAccess%>') >= 0;
        var demo1 = $('[name="duallistbox_demo1[]"]').bootstrapDualListbox();
    </script>
    <script src="../js/Configure-Feature.js"></script>
</asp:Content>
