<%@ Page Title="Demand Response" Language="C#" MasterPageFile="Master.Master" AutoEventWireup="true" CodeBehind="DResponse.aspx.cs" Inherits="CustomerPortal.DResponse" %>

<%@ Register Src="UserControls/usage-demand-response.ascx" TagName="power" TagPrefix="uc4" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/JsUtility.js" type="text/javascript"></script>
    <script src="js/usage-demand-response.js" type="text/javascript"></script>
    <style type="text/css">
        .GraphLegend_DR {
            background-color: #7cb5ec;
            float: left;
            height: 15px;
            margin-left: 5px;
            text-indent: -9999px;
            width: 15px;
        }

        .TableCellHeaderTitle img {
            height: auto;
        }

        .divam svg {
            width: 100% !important;
        }

        #usageMapType .compare_month {
            float: right;
            margin: 6px 0 0;
            width: 18%;
        }

        .currency ul li {
            height: auto;
        }

        .currency_1 ul {
            margin: 0px !important;
            padding: 0px !important;
            list-style: none;
        }

            .currency_1 ul li {
                margin: 0px !important;
                padding: 0px 3px !important;
                float: left !important;
            }

                .currency_1 ul li a {
                    padding: 33px 0px 8px !important;
                    text-indent: 0px !important;
                }


        .power_rates_popup rect {
            width: 100%;
            height: 150px;
        }

        .all_bill_box {
            width: 100% !important;
        }

        .currency {
            border-bottom: 0px;
        }

        .all_bill_box .white_div {
            border-radius: 6px !important;
        }


        @media (max-width:991px) {
            #usageMapType .compare_month {
                float: right;
                margin: 6px 0 0;
                width: 22.3%;
            }
        }
        /*#5368-start*/
        .ajax__calendar_year, .ajax__calendar_months, .ajax__calendar_days {
            overflow: visible !important;
            line-height: normal !important;
        }

        .ajax__calendar_days, .ajax__calendar_months, .ajax__calendar_years {
            left: -6px !important;
        }

        .ajax__calendar_header {
            height: 27px !important;
        }
        /*#5368-end*/
    </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:ScriptManager runat="server"></asp:ScriptManager>
    <script src="js/highchart_js/highcharts.js"></script>
    <script src="js/highchart_js/usage_dresponse.js"></script>    
    <%--   <uc1:usagemastercontrol runat="server" id="UsageMasterControl" />--%>
    <asp:HiddenField ID="hdnunit" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdntime" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnTitle" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnType" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnMode" runat="server" ClientIDMode="Static" />
    <input type="hidden" class="activeli_list" value="usage" />
    <asp:HiddenField ID="hdnPowerUnitThisMonth" ClientIDMode="Static" runat="server" />
    <asp:HiddenField ID="hdnPowerUnitPrediction" ClientIDMode="Static" runat="server" />
    <asp:HiddenField ID="hdnDollarThisMonth" ClientIDMode="Static" runat="server" />
    <asp:HiddenField ID="hdnDollarPredicted" ClientIDMode="Static" runat="server" />

    <%--start section--%>

    <section class="inner_mid_section" id="TableBill">
    <div class="container inner-mid-container">
        	<div class="energy_mid_box">
            	<h1><img src="images/icon-usage.png" style="padding-right:7px; margin-top: -1px; float: left;" /> 
                     <span globalize="ML_USAGE"><%= CustomerPortal.Translator.T("ML_USAGE") %></span></h1>
                
               	 <div class="sidebar_toggle">Sidebar Navgatation</div>
                 <div class="nav_left"> 
                	<ul>
                       <%-- <li class="sidebar_power"><a href="Usages.aspx?UsageType=PU" globalize="ML_POWERUSAGE_Navigation_Power">Power</a></li>
                        <li class="sidebar_gas"><a href="Usages.aspx?UsageType=GU" globalize="ML_POWERUSAGE_Navigation_Gas">Gas</a></li>
                        <li class="sidebar_water"><a href="Usages.aspx?UsageType=WU" globalize="ML_POWERUSAGE_Navigation_Water">Water</a></li>
                        <li class="sidebar_solar"><a href="Usages.aspx?UsageType=SU" globalize="ML_WU_li_Solar">Solar</a></li> --%>
                        <li class="sidebar_power"><asp:LinkButton ID="PU" runat="server" PostBackUrl="Usages.aspx?UsageType=PU" globalize="ML_POWERUSAGE_Navigation_Power" Visible="true"><%= CustomerPortal.Translator.T("ML_POWERUSAGE_Navigation_Power") %></asp:LinkButton></li>
                        <li class="sidebar_gas"><asp:LinkButton ID="GU" runat="server" PostBackUrl="Usages.aspx?UsageType=GU" globalize="ML_POWERUSAGE_Navigation_Gas" Visible="true"><%= CustomerPortal.Translator.T("ML_POWERUSAGE_Navigation_Gas") %></asp:LinkButton></li>
                        <li class="sidebar_water"><asp:LinkButton ID="WU" runat="server" PostBackUrl="Usages.aspx?UsageType=WU" globalize="ML_POWERUSAGE_Navigation_Water" Visible="true"><%= CustomerPortal.Translator.T("ML_POWERUSAGE_Navigation_Water") %></asp:LinkButton></li>
                        <li class="sidebar_solar"><asp:LinkButton ID="SU" runat="server" PostBackUrl="Usages.aspx?UsageType=SU" globalize="ML_WU_li_Solar" Visible="true"><%= CustomerPortal.Translator.T("ML_WU_li_Solar") %></asp:LinkButton></li> 
                       <%-- <li class="sidebar_dresponse active"><a href="DResponse.aspx" id="IdResponse" globalize="ML_Settings_Span_DemandResp">Demand Response</a></li> --%>                    
                        <li class="sidebar_dresponse active"><a href="DRPastEvents.aspx">Demand Response</a></li> 
                    </ul>                    
    
                   <div class="banner_left_img">
                <a href="programs.aspx"><img src="images/banner_ads/image003.png" /></a>
                <a href="MyAccount.aspx"><img src="images/banner_ads/image001.png" /></a>
            </div>
                </div>
                <div class="right_content_box">
                    <div class="current_area">
                        <ul>
                            <li><span id="averageval" text="N/a"></span>
                               
                               <i><i  id="averagevaltext" ></i> &nbsp;<i id="glbizeAverage">INCENTIVE RATE</i></i> 
                            </li>

                             <li><span  id="highestval" text="N/a"></span>
                                 <i><i >TOTAL CURTAILMENT</i>&nbsp;<i id="ModeText" >
                                </i> </i>
                            </li>

                           <li><span><asp:Label ID="lblCurrentUsage" runat="server" Text="N/a" ClientIDMode="Static"></asp:Label></span>
                            <i >BASELINE AVERAGE</i>
                            </li>

                            <li><span><asp:Label ID="lblEstimatedUsage" runat="server" Text="N/a" ClientIDMode="Static"></asp:Label></span>
                            <i >INTERVAL AVERAGE</i>
                             </li>
                        </ul>
                    </div>
                    <%-- code for multilingual id's --%>
                    <div style="display:none">                      
                        <span globalize="ML_WU_span_Daily" id="glblizeDaily"><%= CustomerPortal.Translator.T("ML_WU_span_Daily") %></span>
                        <span globalize="ML_WU_span_Hourly"  id="glblizeHourly"><%= CustomerPortal.Translator.T("ML_WU_span_Hourly") %></span>
                        <span globalize="Monthly" id="glblizeMonthly"><%= CustomerPortal.Translator.T("Monthly") %></span>
                         <span globalize="ML_WU_span_Yearly" id="glblizeYearly"><%= CustomerPortal.Translator.T("ML_WU_span_Yearly") %> </span>
                         <span globalize="ML_WU_span_glblizeDay"  id="glblizeDay"><%= CustomerPortal.Translator.T("ML_WU_span_glblizeDay") %></span>
                        <span globalize="ML_WU_span_glblizeMonth" id="glblizeMonth"><%= CustomerPortal.Translator.T("ML_WU_span_glblizeMonth") %></span>
                         <span globalize="ML_GASUSAGE_span_glblizeYear" id="glblizeYear"><%= CustomerPortal.Translator.T("ML_GASUSAGE_span_glblizeYear") %></span>
                    </div>
                   	 <div class="currency">
                               <%--<div id="usageMapType">
                    	            <ul style="float: left; width: 33%;" >
                                      <li ><a type="K" href="#">  kWh </a></li> <%--globalize="ML_WU_li_kWh"--%>
                                   <%--   <li><a type="D" href="#"> Currency  </a></li> <%--globalize="ML_WU_li_Currency"--%>
                                    <%--</ul>--%>
                                <%--</div>--%>

                            <div class="power_graph_heading" style="text-align: center; margin: 0px auto; float: left; width:47%; padding:9px 0px 0px;">
                               <asp:Label ID="lblCharttitle" ClientIDMode="Static" runat="server" Text="" 
                                   Style="font-weight: bold;float: left;margin-top: 12px;margin-left:20px;" globalize="ML_POWERUSAGE_LBL_ChartTitle"></asp:Label>
                              <span id="divCalender" style="line-height:43px; visibility:hidden;">
                                   <asp:TextBox runat="server" id="btnCalender" style="width:0px; height:0px;visibility:hidden"></asp:TextBox>
                                   <label><strong><span globalize="ML_WU_Lbl_SelectDate"><%= CustomerPortal.Translator.T("ML_WU_Lbl_SelectDate") %></span></strong></label>
                                    <asp:ImageButton runat="server" id="imgbtnCalender" ImageUrl="images/Icon-Calendar.svg" style="vertical-align:middle;"></asp:ImageButton> <asp:CalendarExtender  ID="Cal_Date" runat="server" TargetControlID="btnCalender" Format="MM/dd/yyyy"
                                        Enabled="True" OnClientDateSelectionChanged="UsageDataHourly" PopupButtonID="imgbtnCalender" ClientIDMode="Static"></asp:CalendarExtender> 
                                </span>

                        </div>
                  <%--  <div class="currency_1">--%>
                       <%-- <ul style="width:19%; float: left;" id="usageMapMode">--%>

                        	<%--<li><a href="#" mode="H"  globalize="<%=CustomerPortal.SessionAccessor.CustomerType=="Commercial"?"ML_WU_Navigation_HourlyCommercial":"ML_Power_Navigation_Hourly"%>">15 Min</a></li>--%>
                          <%--  <li><a href="#" mode="H"  globalize="ML_WU_Navigation_HourlyCommercial">15 Min</a></li>--%>
                           <%-- <li><a href="#" mode="D"  globalize="ML_Power_Navigation_Daily" >Daily</a></li>--%>
                           <%-- <li><a href="#" mode="M"  globalize="ML_Power_Navigation_Monthly" > Monthly</a></li>--%>
                        <%--</ul></div>--%>
                              <%--<div class="add-card" data-toggle="modal" data-target="#divPopup" style="width:65%;text-align: right; padding: 0.9% 0% 0 3.5% !important;"><a href="#" style="color: #fff;background: #3772af;padding: 5px;border-radius: 1px;margin-top: 5px;">Rates</a></div>--%>
                            
                           

                    </div>

                    
                    <%--Added scroll in the chart for more data--%>
                     <div class="compare_graph"  style="width:100%; overflow:auto;">
                     
                      <div id="chart" class="radius"  >
                         </div>

                     </div>

                     <div class="currency compare_nav " style="width:98.6%">
                        <%-- <uc4:power ID="power2" runat="server" />--%>
                     	<div class="curent_usage_line" style="float: right; padding: 10px 0; width: 100% !important;">
 
                                <div class="rates_main_box" style="float: left; width: 50%;">
                                    <div class="add-card" style="display:none;width: 24%; float: left; padding: 0.9% 0% 0 3.5% !important;"><a onclick="openfancyboxrate('usagechartdiv')" href="#" style="color: #fff; background: #3772af; padding: 5px; border-radius: 1px; margin-top: 5px;"><span globalize="ML_WU_Lbl_Rates">Rates</span></a></div>
                                    <div class="compare_month" style="float: left; width: 50%;">
                                         <div style="margin-Right:40%;display:none;">
                                             <asp:ImageButton ID="btnExporttoExcel" runat="server"  ImageUrl="~/images/table-export.png" ClientIDMode="Static" />
                                          </div>
                                        <div style="margin-top: -25px; margin-left: 35px;display:none;">
                                            <asp:LinkButton ID="lnkExporttoExcel" runat="server" globalize="ML_POWERUSAGE_LBL_ExporttoExcel" Text="Export to Excel" OnClick="lnkExporttoExcel_Click" ClientIDMode="Static"><%= CustomerPortal.Translator.T("ML_POWERUSAGE_LBL_ExporttoExcel") %></asp:LinkButton>
                                        </div>
                                    </div>


                                </div>
                                <div class="low_hight_box" style="float: right; width: 50%;">
                                    <p>
                                        <span class="GraphLegend_low" style="display:block;color:ActiveBorder"></span>
                                        <span class="GraphLegend_data_low" style="display:block;" >Curtail</span>
                                        <span class="GraphLegend_Avg"></span>
                                        <span class="GraphLegend_data_low" >Baseline</span>
                                        <span class="GraphLegend_High" style="display:block;background-color:black"></span>
                                        <span class="GraphLegend_data_low" style="display:block;" >Baseline Avg</span>
                                        <span id="drlegend" class="GraphLegend_DR" style="background-color:#FF0000"></span>
                                        <span id="drlegendtext" class="GraphLegend_data_low" >Interval Avg</span>
                                        <span id="dresponse" class="GraphLegend_DR" style="background-color:#7cb5ec"></span>
                                        <span id="dresponsetext" class="GraphLegend_data_low" >DR</span>
                                    </p>
                                </div>

                        </div>
                     </div>
                     <div class="total_bills" style="width:97%">
                             <div class="Left_Bill_area" style="border-right:2px solid #f4f4f4;" id="UsageDiv" runat="server">
                                     <div id="UsageDivHide" runat="server" class="right-area-tabular" style="width:35%; position:absolute; left:70%; top:17%; z-index:99;">
                                		        <p><span class="GraphLegend_Avg"></span>
                                                <span class="GraphLegend_data_low" >Baseline</span>
                                               <span style="background-color: #F8A13F;float: left;height: 15px; margin-left: 5px;text-indent: -9999px;width: 15px;">Internal Avg</span>
                                                     <span style="background-color: #F8A13F;float: left;height: 15px; margin-left: 5px;text-indent: -9999px;width: 15px;">Internal Avg</span>
                                                     <span style="background-color: #F8A13F;float: left;height: 15px; margin-left: 5px;text-indent: -9999px;width: 15px;">Internal Avg</span>
                                                   
                                                </p>
                                        
                                    </div>
                                  <div class="all_bill_box" id="divusagewatericon" runat="server"></div>
                                 <div class="all_bill_box" id="divgasUsage" runat="server"></div>
                                 <div class="all_bill_box" id="divgenerationicon" runat="server"></div>
                             </div>
                     
                        <%--     <div class="right_Bill_area" style="padding-bottom:50px; border:none;">
                                         <uc4:power ID="power2" runat="server" />
                                     </div>--%>
                         </div>
                </div><!-- End .right_content_box -->
                      </div>  
        </div>
  </section>
    <!-- End Section -->

    <script src="js/popup.js" type="text/javascript"></script>
    <script>

        function openfancyboxrate(id) {
            //$("#hdnShowHome").val(showhome);
            $.fancybox({
                //'width': '90%',
                'width': '60%',
                'height': '90%',
                'autoScale': true,
                'transitionIn': 'fade',
                'transitionOut': 'fade',
                content: $("#" + id).show()
            });
            getAMPMData();
            return false;
        }
    </script>
    <asp:HiddenField ID="hdnstrDate" runat="server" ClientIDMode="Static" />

    <div id="usagechartdiv" runat="server" style="width: auto; display: none;" clientidmode="Static">
        <h1 style="font-size: 24px; margin: 0; padding: 0 0 13px;"><span globalize="ML_POWERUSAGE_PowerRates">Power rates</span></h1>
    </div>
    </span>
    </section>
</asp:Content>
