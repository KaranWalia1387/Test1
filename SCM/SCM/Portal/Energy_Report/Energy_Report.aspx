<%@ Page Language="C#" AutoEventWireup="true" Title="My Home Report" CodeBehind="Energy_Report.aspx.cs" MasterPageFile="~/Efficiency.master" Inherits="CustomerPortal.Energy_Report.Energy_Report" %>

<%@ Register Src="~/UserControls/EnergyRpt.ascx" TagPrefix="uc1" TagName="EnergyRpt" %>


<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderhead" runat="server">
    
    <%--Added reference to bundle js and css files  --%>
    <%: System.Web.Optimization.Styles.Render("~/Content/cssEnergy_Report") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsEnergy_Report")%>
   


    <script type="text/javascript">
        $(document).ready(function () {
             <% if (CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.Power, false) == false)
                { %>
            $('#li_power').attr('style', 'display: none');
            <% }%>
            });
 </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
    

    <div class="top_main_area">
        <ul class="nav nav-tabs fixed_tabs" role="tablist">
            <li id="li_power" class="active2"><a globalize="ML_POWERUSAGE_Navigation_Power" href="#"><%= CustomerPortal.Translator.T("ML_POWERUSAGE_Navigation_Power") %></a></li>
            <li style="display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.Water) %>"><a href="Water_Report.aspx" globalize="ML_POWERUSAGE_Navigation_Water"> <%= CustomerPortal.Translator.T("ML_POWERUSAGE_Navigation_Water") %> </a></li>
        </ul>
    </div>
    <div class="right_content_box">
        <div class="energy_mid_box_2_left">
            <div class="energy_mid_box-2">
                <div class="tab-content">
                    <uc1:EnergyRpt runat="server" ID="EnergyRpt" />
                    <div id="waters" class="tab-pane fade active in">
                        <div class="col-xs-12 col-md-6 col-sm-12">
                            <div class="account_info">
                              <h1 > <span globalize="ML_div_Efficiency_ActSummry"> <%= CustomerPortal.Translator.T("ML_div_Efficiency_ActSummry") %></span></h1>
                                <div class="bill_summary account_summry_main">
                                    <ul>
                                        <li>
                                            <p globalize="ML_BILLDASHBOARD_Lbl_TotalBilling"><%= CustomerPortal.Translator.T("ML_BILLDASHBOARD_Lbl_TotalBilling") %><span></span></p>
                                            <p globalize="ML_BILLING_Lbl_PreviousBalanceDue"><%= CustomerPortal.Translator.T("ML_BILLING_Lbl_PreviousBalanceDue") %><span></span></p>
                                        </li>
                                        <li>
                                            <p globalize="ML_BILLDASHBOARD_Lbl_PenalyCharges"><%= CustomerPortal.Translator.T("ML_BILLDASHBOARD_Lbl_PenalyCharges") %><span></span></p>
                                            <p globalize="ML_div_Efficiency_BillPeriod"><%= CustomerPortal.Translator.T("ML_div_Efficiency_BillPeriod") %> <span></span></p>
                                        </li>
                                        <li>
                                            <p globalize="ML_div_Efficiency_TotAmtOweBy"><%= CustomerPortal.Translator.T("ML_div_Efficiency_TotAmtOweBy") %> <span></span></p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <!-- First Col End Here -->
                        <div class="col-xs-12 col-md-6 col-sm-12">
                            <div class="account_info" style="background: #f3f4f4; margin-top: 11px; padding: 3px 9px 14px; width: 100%;float:left;">
                                <h1 style="padding-bottom: 7px; background: none !important;" ><span globalize="ML_div_Efficiency_HowYouRank"><%= CustomerPortal.Translator.T("ML_div_Efficiency_HowYouRank") %></span>
                                   <ul class="rating_box1">
                                        <li><img src="images/report_rating_star.png" /></li>
                                         <li><img src="images/report_rating_star.png" /></li>
                                         <li><img src="images/report_rating_star.png" /></li>
                                         <li><img src="images/report_rating_star.png" /></li>
                                         <li><img src="images/report_rating_star_hover.png" /></li>
                                    </ul>
                                </h1>

                                <div class="new_rank">
                                    <b id="UsageDate"></b>
                                    <p globalize="ML_div_Efficiency_PwrUsgHigher"><%= CustomerPortal.Translator.T("ML_div_Efficiency_PwrUsgHigher") %></p>
                                </div>
                                <div class="rank_bottom_progress_bar">
                                    <div class="glns_per_day">
                                        <div id="chartDiv" style="width: 99%; height: 150px; float: left;margin-top: 17px;">
                                        </div>
                                       
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                        <!-- Second Col End Here -->
                    </div>
                </div>
                <!-- tab End -->
            </div>
            <!--  First Energy End -->

            <!----Bottom Phase Start-->
            <div class="col-xs-12 col-md-12 col-sm-12">
                <div class="account_info" style="padding-left: 20px;width: 97.8%;">
                    <h1 style="padding-bottom: 7px; background: none !important;" ><span globalize="ML_div_Efficiency_HowYouCmp"></span></h1>
                    <p globalize="ML_div_Efficiency_BelowYouWillPower"><%= CustomerPortal.Translator.T("ML_div_Efficiency_BelowYouWillPower") %></p>
                   <div class="lgnd_box">
                      <ul>
                          <li>
                                <span style="background-color: #c66c6c; border-radius: 50%; float: left; height: 12px; margin-right: 5px; margin-top: 2px; width: 12px;"></span>
                                <asp:Label ID="lblMonthavglabel" runat="server" Style="color:#c66c6c; font-size:12px; font-weight:bold;" ClientIDMode="Static"></asp:Label>&nbsp;
                                <asp:Label ID="lblMonthavg" Style="color: #c66c6c; font-size:12px;" runat="server" ClientIDMode="Static"></asp:Label>
                           </li>                           
                            <li>
                                <span style="background-color: #7bab91; border-radius: 50%; float: left; height: 12px; margin-right: 5px; margin-top: 2px; width: 12px;""></span>
                                <asp:Label ID="lblPreveslabel" runat="server" Style="color: #7bab91; font-size:12px; font-weight:bold;" ClientIDMode="Static"></asp:Label>&nbsp;
                                <asp:Label ID="lblPreves" Style="color: #7bab91; font-size:12px;" runat="server" ClientIDMode="Static"></asp:Label>
                           </li>
  
                               
                       </ul>
                      
                   </div>
                    
                     <div class="EfficiencyGraphContainer" style="width: 100%;padding: 1px 10px;background: #f4f4f4;float: left;margin-bottom: 15px;">
                        <div class="EfficiencyGraphdiv" >
                            <b>
                                <div class="EfficiencyGraphLabel" style="margin: 8px 0 0 25px; display:none;" globalize="ML_Budget_My_Lbl_Less_Efficient">
                                    <%= CustomerPortal.Translator.T("ML_Budget_My_Lbl_Less_Efficient") %>
                                </div>

                            </b>                            
                                                
                            <div class="EfficiencyGraphRedColor">
                                &nbsp;
                            </div>
                            <div class="EfficiencyGraphData">
                            </div>
                        </div>
                        <div class="EfficiencyGraph">
                            <div id="chartNeighboursDiv" style="width: 98%; height: 170px">
                            </div>

                        </div>
                        <div class="EfficiencyGraphdiv" style="display:none;">
                            <b>
                                <div class="EfficiencyGraphLabel" style="margin: 8px 0 0 25px; display:none;" globalize="ML_Budget_My_Lbl_More_Efficient">
                                     <%= CustomerPortal.Translator.T("ML_Budget_My_Lbl_More_Efficient") %>
                                </div>
                            </b>
                            <div class="EfficiencyGraphGreenColor">
                                &nbsp;
                            </div>
                            <div class="EfficiencyGraphData">
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="energy_mid_box-2">
                <div class="tab-content">
                    <div id="waters" class="tab-pane fade active in">
                        <div class="col-xs-12 col-md-6 col-sm-12 teat_styles">
                            <div class="account_info right_text_styles">
                                <h1 ><span globalize="ML_div_Efficiency_HowAmIUsingPower"> <%= CustomerPortal.Translator.T("ML_div_Efficiency_HowAmIUsingPower") %></span></h1>
                                <p globalize="ML_Energyreport_Msg_QuaterlyUse"><%= CustomerPortal.Translator.T("ML_Energyreport_Msg_QuaterlyUse") %></p>
                            </div>
                            <div class="right_chart_area use_power_box">
                                <div id="divPieChart1" style="width: 350px !important; height: 250px !important;"></div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-md-6 col-sm-12">
                            <h1 ><span globalize="ML_div_Efficiency_PowerSavingTips"> <%= CustomerPortal.Translator.T("ML_div_Efficiency_PowerSavingTips") %></span></h1>
                            <div class="water_score_new_tips_area" id="energy_tip1">
                                <p>
                                    <img src="images/use_sunlight.png" align="left" />
                                    <div id="energy_title_1" globalize="ML_Energyreport_Msg_Sunlight"><b><%= CustomerPortal.Translator.T("ML_Energyreport_Msg_Sunlight") %></b></div>
                                    <div id="energy_desc_1" globalize="ML_Energyreport_Heat"><%= CustomerPortal.Translator.T("ML_Energyreport_Heat") %></div>
                                    <div class="water_score_new_gallon">
                                        <ul>
                                            <li>
                                                <img src="images/power-icon.png" align="left" />
                                                <div id="kwhpermonth"></div>
                                            </li>
                                            <li>
                                                <img src="images/saving-icon.png" align="left" /><div id="dollarspermonth"></div>
                                            </li>
                                        </ul>
                                    </div>
                                </p>

                            </div>
                            <div class="clearfix"></div>
                            <div class="water_score_new_tips_area not_points" id="energy_tip2">
                                <p>
                                    <img src="images/energy-star.png" />
                                    <div id="energy_title_2" globalize="ML_Energyreport_Msg_AutomatedSprinklers"><b><%= CustomerPortal.Translator.T("ML_Energyreport_Msg_AutomatedSprinklers") %></b></div>
                                    <div id="energy_desc_2" globalize="ML_Energyreport_Msg_HowMuchWater"><%= CustomerPortal.Translator.T("ML_Energyreport_Msg_HowMuchWater") %> </div>
                                    <div class="water_score_new_gallon">
                                        <ul>

                                            <li>
                                                <img src="images/power-icon.png" align="left" />
                                                <div id="kwhperday"></div>
                                            </li>

                                            <li>
                                                <img src="images/saving-icon.png" align="left" /><div id="dollarsperday"></div>
                                            </li>
                                        </ul>
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!----First Phase End-->

            <div class="energy_mid_box_right">
                <div class="energy_mid_box-2">
                    <div class="tab-content">
                        <div id="waters" class="tab-pane fade active in" style="background: #f3f4f4; padding-bottom: 5px;">

                            <div class="col-xs-10 col-md-7 col-sm-10 teat_styles">
                                <h1 style="background: none;" ><span globalize="ML_div_Efficiency_WantToKnowMore"><%= CustomerPortal.Translator.T("ML_div_Efficiency_WantToKnowMore") %></span></h1>
                                <div class="socail_media_icons">
                                    <p globalize="ML_div_Efficiency_DownloadTheApp"><%--Download the app for free from the Apple App Store or Google Play Store.--%> <%= CustomerPortal.Translator.T("ML_div_Efficiency_DownloadTheApp") %></p>
                                </div>
                               
                            </div>

                            <div class="col-xs-2 col-md-5 col-sm-2 teat_styles">
                                <div class="socail_media_icons" style="float:right;margin-top:5px;">
                                    <ul>
                                          <li><a href="#">
                                             <img src="images/captcha.png" /></a></li>

                                    </ul>


                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
           <asp:HiddenField runat="server" ID="hdnLanguageCode" ClientIDMode="Static"></asp:HiddenField>  
      
     
        <span globalize="ML_Title_Efficiency_Rank" id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_Title_Efficiency_Rank") %></span>
    <span globalize="ML_Budget_My_Lbl_Effecient_Neighbor" id="Efficient" style="display: none"><%= CustomerPortal.Translator.T("ML_Budget_My_Lbl_Effecient_Neighbor") %></span>
    <span globalize="ML_Billing_Span_Inefficient" id="Inefficient" style="display: none"><%= CustomerPortal.Translator.T("ML_Billing_Span_Inefficient") %></span>
    <span globalize="ML_Budget_My_Lbl_You" id="Yourself" style="display: none"><%= CustomerPortal.Translator.T("ML_Budget_My_Lbl_You") %></span>
    <span globalize="ML_YearlyBudget_Span_Msg_YAXIS" id="yAxisMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_YearlyBudget_Span_Msg_YAXIS") %></span>
    <span globalize="ML_Budget_My_Lbl_Rank" id="yAxisRank" style="display: none"><%= CustomerPortal.Translator.T("ML_Budget_My_Lbl_Rank") %></span>       
          
</asp:Content>
